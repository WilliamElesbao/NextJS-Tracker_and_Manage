"use client";

import { Badge } from "@/components/ui/badge";
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

        <Label className="border rounded-md cursor-pointer flex space-x-3 items-center p-3">
          <input
            type="checkbox"
            checked={showCheckOutTrue}
            onChange={() => {
              setShowCheckOutTrue(!showCheckOutTrue);
            }}
          />
          <span>Check-outs realizados</span>
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
      <div className="rounded-md border w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center">
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
                              <Badge className="w-full flex flex-col items-center">
                                <span>Check-out em:</span>
                                <span>
                                  {(row.original as RowData).checkOutDate}
                                </span>
                              </Badge>
                            </>
                          ) : (
                            <Button
                              className="border rounded-md w-full h-8"
                              onClick={() =>
                                handleCheckoutClick(
                                  (row.original as RowData).id,
                                )
                              }
                              variant={"secondary"}
                            >
                              Realizar Check-out
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
                              <div className="flex items-center">
                                <Button
                                  className="border rounded-md mr-2"
                                  onClick={() => {
                                    openDetails((row.original as RowData).id);
                                  }}
                                >
                                  Detalhes
                                </Button>
                                {/* <Button
                                  className="border rounded-md"
                                  onClick={() => {
                                    // Adicione a lógica para o segundo botão extra aqui
                                    // Ex: handleSecondExtraButtonClick(row.original.id)
                                  }}
                                >
                                  Enviar e-mail
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
