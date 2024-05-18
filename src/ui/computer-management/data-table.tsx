"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchRecordById, fetchTechById } from "@/lib/data";
import { Records } from "@/lib/types/RecordsTypes";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CheckCircledIcon, ExitIcon, ReaderIcon } from "@radix-ui/react-icons";
import {
  ColumnDefBase,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import { useState } from "react";
import { DataTableProps } from "../../lib/types/DataTableProps";
import { AddBtn } from "./add-button";
import { CheckOutForm } from "./checkout-form";
import { DetailsForm } from "./details-form";
import clsx from "clsx";

interface RowData {
  checkOutDate?: string;
  id: string;
}

interface ColumnDefinition extends ColumnDefBase<RowData, unknown> {
  accessorKey: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const [showCheckOutTrue, setShowCheckOutTrue] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isOpenDetails, setIsOpenDetails] = useState(false);

  const [dataById, setDataById] = useState<Records>();

  const filteredRows = table.getRowModel().rows.filter((row) => {
    // Se o checkbox estiver selecionado, filtra as linhas com checkoutStatus === true
    if (showCheckOutTrue) {
      return row.getValue("checkoutStatus") === true;
    }
    // Caso contrário, exibe todas as linhas
    return true;
    // return row.getValue("checkoutStatus") !== true;
  });

  const handleCheckoutClick = async (rowId: string) => {
    try {
      const data: any = await fetchRecordById(rowId);
      setDataById(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Erro ao buscar registro por id: ", error);
    }
  };

  const openDetails = async (id: string) => {
    try {
      const dataById: any = await fetchRecordById(id);
      const tech = await fetchTechById(dataById.givenBackBy_tech_FK);
      const data = {
        ...dataById,
        givenBackBy_tech_FK: tech,
      };
      setDataById(data);
      setIsOpenDetails(true);
    } catch (error) {
      console.error("Erro ao buscar registro por id: ", error);
    }
  };

  return (
    <>
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filter hostnames..."
          value={
            (table.getColumn("hostname")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("hostname")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <Label
          className={clsx(
            "border rounded-md cursor-pointer flex gap-2 items-center p-3 hover:bg-primary duration-300",
            {
              "bg-primary": showCheckOutTrue,
            },
          )}
        >
          <input
            type="checkbox"
            checked={showCheckOutTrue}
            onChange={() => {
              setShowCheckOutTrue(!showCheckOutTrue);
            }}
            className="sr-only"
          />
          <FontAwesomeIcon icon={faFilter} />
          <span className="hidden md:block">Check-outs realizados</span>
        </Label>

        <div className="flex gap-2">
          <AddBtn />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="relative p-1 rounded-lg bg-gradient-to-b from-foreground from-10% via-foreground via-30% to-background to-80%">
        <div className="absolute inset-0 rounded-lg m-[0.04rem] bg-background"></div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-center text-accent-foreground"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {filteredRows.length ? (
              filteredRows.map((row) => (
                <TableRow
                  className="text-center"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {(cell.column.columnDef as ColumnDefinition)
                        .accessorKey === "checkoutStatus" ? (
                        row.getValue("checkInDate") ? (
                          // Verifica se checkoutStatus é verdadeiro
                          row.getValue("checkoutStatus") ? (
                            <>
                              <div className="w-auto flex justify-center items-center gap-3">
                                <CheckCircledIcon className="text-green-600" />
                                <span>
                                  {(row.original as RowData).checkOutDate}
                                </span>
                              </div>
                            </>
                          ) : (
                            <Button
                              className="border rounded-md flex items-center gap-2 w-full h-8 bg-background text-accent-foreground hover:bg-primary hover:opacity-100 duration-200"
                              onClick={() =>
                                handleCheckoutClick(
                                  (row.original as RowData).id,
                                )
                              }
                            >
                              Realizar Check-out <ExitIcon />
                            </Button>
                          )
                        ) : (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )
                        )
                      ) : (
                        flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )
                      )}
                      <>
                        {(cell.column.columnDef as ColumnDefinition)
                          .accessorKey === "actions" &&
                          row.getValue("checkoutStatus") && (
                            <>
                              <div className="flex justify-center gap-2 items-center">
                                <Button
                                  className="border border-primary rounded-full bg-transparent text-destructive flex justify-center items-center w-6 h-6 p-1 opacity-80 hover:bg-transparent hover:opacity-100 duration-200"
                                  onClick={() => {
                                    openDetails((row.original as RowData).id);
                                  }}
                                >
                                  <ReaderIcon className="w-4 h-4" />
                                </Button>
                                {/* <Button
                                  className="border border-primary rounded-full text-destructive flex justify-center items-center w-6 h-6 p-1 opacity-50 hover:opacity-100 duration-200"
                                  onClick={() => {
                                    // Adicione a lógica para o segundo botão extra aqui
                                    // Ex: handleSecondExtraButtonClick(row.original.id)
                                  }}
                                >
                                  <EnvelopeClosedIcon />
                                </Button> */}
                              </div>
                            </>
                          )}
                      </>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próximo
        </Button>
      </div>

      {isModalOpen && (
        <CheckOutForm
          onCloseModal={() => setIsModalOpen(false)}
          data={dataById}
        />
      )}

      {isOpenDetails && (
        <DetailsForm
          onCloseModal={() => setIsOpenDetails(false)}
          data={dataById}
        />
      )}
    </>
  );
}
