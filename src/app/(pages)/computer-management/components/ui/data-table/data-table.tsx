"use client";

import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Textarea } from "@/app/components/ui/textarea";
import { AuthContext } from "@/app/contexts/AuthContext/authContext";
import {
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
import { useContext, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import action from "../../actions/actions";
import { DataTableProps } from "../../types/DataTableProps";
import { Records } from "../../types/RecordsTypes";
import { DatePicker } from "../form/date-picker";
import { AddButtonOpenModalForm } from "./addBtnOpenModal";

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

  const [selectedRowId, setSelectedRowId] = useState<number>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isOpenDetails, setIsOpenDetails] = useState(false);

  const [dataById, setDataById] = useState<Records>();

  const [recivedBy_tech_FK, setRecivedBy_tech_FK] = useState<string>();
  const [computerType, setComputerType] = useState<string>();
  const [location, setLocation] = useState<string>();
  const [computerStatus, setComputerStatus] = useState<string>();
  const [broughtBy_user_FK, setBroughtBy_user_FK] = useState<string | number>();
  const [whoReceived_user_FK, setWhoReceived_user_FK] = useState<
    string | number
  >();
  const [checkInDate, setCheckInDate] = useState<string | Date>();

  const [techDetails, setTechDetails] = useState<string | null>();

  const { user } = useContext(AuthContext);
  const [chkBoxIsActive, setChkBoxIsActive] = useState(false);
  const { handleSubmit, register, setValue } = useForm();

  const handleCheckboxFilter = () => {
    setShowCheckOutTrue(!showCheckOutTrue);
    console.log(showCheckOutTrue);
  };
  const filteredRows = table.getRowModel().rows.filter((row) => {
    // Se o checkbox estiver selecionado, filtra as linhas com checkoutStatus === true
    if (showCheckOutTrue) {
      return row.getValue("checkoutStatus") === true;
    }
    // Caso contrário, exibe todas as linhas
    // return true;
    return row.getValue("checkoutStatus") !== true;
  });

  const handleCheckoutClick = async (rowId: number) => {
    // TODO: acho que posso remover setSelectedRowId
    setSelectedRowId(rowId);

    const response = await fetch(`/api/computermanagement/?id=${rowId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result: Records = await response.json();
    console.log(result);

    setIsModalOpen(true);

    setDataById(result);

    if (result) {
      setValue("ticketNumber", result.ticketNumber);
      setValue("hostname", result.hostname || "");
      setValue("patrimonyID", result.patrimonyID);
      setValue("serviceTag", result?.serviceTag);
      setValue("serialNumber", result?.serialNumber);
      setValue("othersEquipment", result?.othersEquipment);
      setValue("remarks", result?.remarks);

      setRecivedBy_tech_FK(result.technician.id);
      setComputerType(result.computerType);
      setLocation(result.location);
      setComputerStatus(result.computerStatus);
      setBroughtBy_user_FK(result.broughtBy_user_FK);
      setWhoReceived_user_FK(result.broughtBy_user_FK);
      setCheckInDate(result.checkInDate);
    } else {
      console.warn("Nenhum dado retornado para o ID fornecido.");
    }
  };

  const handleCheckboxChange = () => {
    setChkBoxIsActive(!chkBoxIsActive);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsOpenDetails(false);
  };

  const checkoutConfirmed: SubmitHandler<FieldValues> = async (
    dataFromFormCheckout: Records | FieldValues,
  ) => {
    const data = {
      ticketNumber: Number(dataFromFormCheckout.ticketNumber),
      recivedBy_tech_FK: recivedBy_tech_FK,
      hostname: dataFromFormCheckout.hostname,
      patrimonyID: Number(dataFromFormCheckout.patrimonyID),
      serviceTag:
        dataFromFormCheckout.serviceTag === ""
          ? null
          : dataFromFormCheckout.serviceTag,
      serialNumber:
        dataFromFormCheckout.serialNumber === ""
          ? null
          : dataFromFormCheckout.serialNumber,
      computerType: computerType,
      location: location,
      computerStatus: computerStatus,
      broughtBy_user_FK: Number(broughtBy_user_FK),
      othersEquipment: dataFromFormCheckout.othersEquipment,
      remarks: dataFromFormCheckout.remarks,
      checkInDate: checkInDate,
      givenBackBy_tech_FK: user?.id,
      WhoReceived_user_FK: Number(whoReceived_user_FK),
      checkOutDate: new Date(),
      checkoutStatus: true,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/computermanagement/?id=${dataById?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
        },
      );

      if (response.ok) {
        toast.success(
          `Check-out realizado para: ${dataFromFormCheckout.hostname}`,
        );
        action();
        setIsModalOpen(!isModalOpen);
        // router.back();
      } else {
        const result = await response.json();
        console.error("Erro ao editar os dados");
        toast.error(`Erro ao editar os dados ${result.error.meta.target}`);
      }
    } catch (error) {
      console.error("Erro:", error);
    }

    console.log(data);
  };

  const openDetails = async (id: string) => {
    // TODO: acho que posso remover setSelectedRowId

    const response = await fetch(`/api/computermanagement/?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result: Records = await response.json();

    console.log(result);

    const fetchTechByID = await fetch(
      `/api/tech/?techID=${result.givenBackBy_tech_FK}`,
    );

    const techDetails = await fetchTechByID.json();

    console.log(techDetails);

    setTechDetails(techDetails);

    setDataById(result);

    setIsOpenDetails(true);

    // if (result) {
    //   setValue("ticketNumber", result.ticketNumber);
    //   setValue("hostname", result.hostname || "");
    //   setValue("patrimonyID", result.patrimonyID);
    //   setValue("serviceTag", result?.serviceTag);
    //   setValue("serialNumber", result?.serialNumber);
    //   setValue("othersEquipment", result?.othersEquipment);
    //   setValue("remarks", result?.remarks);

    //   setRecivedBy_tech_FK(result.technician.id);
    //   setComputerType(result.computerType);
    //   setLocation(result.location);
    //   setComputerStatus(result.computerStatus);
    //   setBroughtBy_user_FK(result.broughtBy_user_FK);
    //   setWhoReceived_user_FK(result.broughtBy_user_FK);
    //   setCheckInDate(result.checkInDate);
    // } else {
    //   console.warn("Nenhum dado retornado para o ID fornecido.");
    // }
    console.log(isOpenDetails);
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
            onChange={handleCheckboxFilter}
          />
          <span>Check-outs realizados</span>
        </Label>

        <div className="flex gap-2">
          <AddButtonOpenModalForm />

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
                      {cell.column.columnDef.accessorKey ===
                      "checkoutStatus" ? (
                        row.getValue("checkInDate") ? (
                          // Verifica se checkoutStatus é verdadeiro
                          row.getValue("checkoutStatus") ? (
                            <>
                              <Badge className="w-full flex flex-col items-center">
                                <span>Check-out em:</span>
                                <span>{row.original.checkOutDate}</span>
                              </Badge>
                            </>
                          ) : (
                            <Button
                              className="border rounded-md w-full h-8"
                              onClick={() =>
                                handleCheckoutClick(row.original.id)
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
                        {cell.column.columnDef.accessorKey === "actions" &&
                          row.getValue("checkoutStatus") && (
                            <>
                              <div className="flex items-center">
                                <Button
                                  className="border rounded-md mr-2"
                                  onClick={() => {
                                    openDetails(row.original.id);
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
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      {/* TODO: creaet a component */}
      {/* Modal form: checkout */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white xl:w-[65%] rounded shadow-lg p-6 pb-12">
            <div className="flex flex-col gap-3">
              <div className="header-content">
                <h2 className="">Confirmar Check-Out</h2>
                <label
                  className="border 
                  border-neutral-800 
                  bg-black 
                  text-white 
                  hover:bg-opacity-80 
                  duration-200 
                  absolute 
                  right-6 
                  top-6 
                  p-1 
                  px-2 
                  rounded-lg
                flex gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={chkBoxIsActive}
                    onChange={handleCheckboxChange}
                  />
                  Habilitar edição
                </label>
              </div>

              <form
                onSubmit={handleSubmit(checkoutConfirmed)}
                method="PUT"
                className="flex flex-col gap-5 w-full p-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div id="ticketNumber">
                    <Label className="content-center">Numero SATI</Label>
                    <Input
                      disabled={!chkBoxIsActive}
                      defaultValue={dataById?.ticketNumber}
                      {...register("ticketNumber")}
                    ></Input>
                  </div>

                  <div>
                    <Label className="content-center">Entrada em</Label>
                    <DatePicker
                      // onDateChange={handleDateChange(setHandedoverDate)}
                      defaultValue={checkInDate ? new Date(checkInDate) : null}
                      disabled={true}
                    />
                  </div>

                  <div className="technician">
                    <Label className="content-center">
                      Entregue ao técnico
                    </Label>
                    <Input
                      defaultValue={dataById?.technician.username}
                      disabled
                    ></Input>
                  </div>

                  <div>
                    <Label className="content-center">
                      Entregue pelo usuário
                    </Label>
                    <Select
                      defaultValue={dataById?.broughtBy_user_FK.toString()}
                      onValueChange={setBroughtBy_user_FK}
                      required
                      disabled
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an employee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Fulano</SelectItem>
                        <SelectItem value="2">Beutrano</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="content-center">Hostname</Label>
                    <Input
                      defaultValue={dataById?.hostname}
                      {...register("hostname")}
                      disabled={!chkBoxIsActive}
                    ></Input>
                  </div>

                  <div>
                    <Label className="content-center">Patrimônio</Label>
                    <Input
                      defaultValue={dataById?.patrimonyID}
                      {...register("patrimonyID")}
                      disabled={!chkBoxIsActive}
                    ></Input>
                  </div>

                  <div>
                    <Label className="content-center">Service Tag</Label>
                    {dataById?.serviceTag ? (
                      <Input
                        defaultValue={dataById?.serviceTag}
                        {...register("serviceTag")}
                        disabled={!chkBoxIsActive}
                      ></Input>
                    ) : (
                      <Input
                        {...register("serviceTag")}
                        disabled={!chkBoxIsActive}
                      ></Input>
                    )}
                  </div>

                  <div>
                    <Label className="content-center">Serial Number</Label>
                    {dataById?.serialNumber ? (
                      <Input
                        defaultValue={dataById.serialNumber}
                        {...register("serialNumber")}
                        disabled={!chkBoxIsActive}
                      ></Input>
                    ) : (
                      <Input
                        {...register("serialNumber")}
                        disabled={!chkBoxIsActive}
                      ></Input>
                    )}
                  </div>

                  <div>
                    <Label className="content-center">Tipo / Modelo</Label>
                    <Select
                      onValueChange={setComputerType}
                      required
                      defaultValue={dataById?.computerType}
                      disabled={!chkBoxIsActive}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NTB">Notebook</SelectItem>
                        <SelectItem value="DSK">Desktop</SelectItem>
                        <SelectItem value="WKS">Workstation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="content-center">Localização</Label>
                    <Select
                      defaultValue={dataById?.location}
                      onValueChange={setLocation}
                      required
                      disabled={!chkBoxIsActive}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Matriz">Matriz</SelectItem>
                        <SelectItem value="SP">São Paulo</SelectItem>
                        <SelectItem value="BH">Belo Horizonte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="content-center">Status da máquina</Label>
                    <Select
                      defaultValue={dataById?.computerStatus}
                      onValueChange={setComputerStatus}
                      required
                      disabled={!chkBoxIsActive}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Available">Disponível</SelectItem>
                        <SelectItem value="Under Maintenance">
                          Em manutenção
                        </SelectItem>
                        <SelectItem value="Obsolete">Obsoleto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* TODO: adicionar esse campo */}
                  <div>
                    <Label className="content-center">
                      Entregue pelo técnico
                    </Label>
                    <Input defaultValue={user?.username} disabled></Input>
                  </div>

                  <div>
                    <Label className="content-center">
                      Entregue ao usuário
                    </Label>
                    <Select
                      defaultValue={dataById?.broughtBy_user_FK.toString()}
                      onValueChange={setWhoReceived_user_FK}
                      required
                      disabled={!chkBoxIsActive}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an employee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Fulano</SelectItem>
                        <SelectItem value="2">Beutrano</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div></div>

                  {/* <div>
                    <Label className="content-center">
                      Handed Over at (From User)
                    </Label>
                    <DatePicker
                      onDateChange={handleDateChange(setHandedoverDate)}
                      defaultValue={
                        handedoverDate ? new Date(handedoverDate) : null
                      }
                      disabled={true}
                    />
                  </div> */}

                  <div>
                    <Label className="content-center">Outros periféricos</Label>
                    <Textarea
                      defaultValue={dataById?.othersEquipment}
                      {...register("othersEquipment")}
                      className="resize-none w-full h-40"
                      disabled={!chkBoxIsActive}
                    />
                  </div>

                  <div>
                    <Label className="content-center">Observações</Label>
                    <Textarea
                      defaultValue={dataById?.remarks}
                      {...register("remarks")}
                      className="resize-none w-full h-40"
                      disabled={!chkBoxIsActive}
                    />
                  </div>
                </div>
                <Button type="submit" className="absolute right-6 bottom-3">
                  Concluir Check-out
                </Button>
                <Button
                  onClick={closeModal}
                  variant={"destructive"}
                  className="absolute left-6 bottom-3"
                >
                  Fechar
                </Button>
              </form>
            </div>

            {/* Botão para fechar o modal */}
          </div>
        </div>
      )}

      {/* Modal details*/}
      {isOpenDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white xl:w-[65%] rounded shadow-lg p-6 pb-12">
            <div className="flex flex-col gap-3">
              <div className="header-content">
                <h2 className="">Detalhes - Check-out</h2>
              </div>

              <form
                onSubmit={handleSubmit(checkoutConfirmed)}
                method="PUT"
                className="flex flex-col gap-5 w-full p-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div id="ticketNumber">
                    <Label className="content-center">Numero SATI</Label>
                    <Input
                      disabled={!chkBoxIsActive}
                      defaultValue={dataById?.ticketNumber}
                      {...register("ticketNumber")}
                    ></Input>
                  </div>

                  <div>
                    <Label className="content-center">Entrada em</Label>
                    <DatePicker
                      // onDateChange={handleDateChange(setHandedoverDate)}
                      defaultValue={dataById?.checkInDate}
                      disabled={true}
                    />
                  </div>

                  <div className="technician">
                    <Label className="content-center">
                      Entregue ao técnico
                    </Label>
                    <Input
                      defaultValue={dataById?.technician.username}
                      disabled
                    ></Input>
                  </div>

                  <div>
                    <Label className="content-center">
                      Entregue pelo usuário
                    </Label>
                    <Select
                      defaultValue={dataById?.broughtBy_user_FK.toString()}
                      onValueChange={setBroughtBy_user_FK}
                      required
                      disabled
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an employee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Fulano</SelectItem>
                        <SelectItem value="2">Beutrano</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="content-center">Hostname</Label>
                    <Input
                      defaultValue={dataById?.hostname}
                      {...register("hostname")}
                      disabled
                    ></Input>
                  </div>

                  <div>
                    <Label className="content-center">Patrimônio</Label>
                    <Input
                      defaultValue={dataById?.patrimonyID}
                      {...register("patrimonyID")}
                      disabled
                    ></Input>
                  </div>

                  <div>
                    <Label className="content-center">Service Tag</Label>
                    {dataById?.serviceTag ? (
                      <Input
                        defaultValue={dataById?.serviceTag}
                        {...register("serviceTag")}
                        disabled
                      ></Input>
                    ) : (
                      <Input {...register("serviceTag")} disabled></Input>
                    )}
                  </div>

                  <div>
                    <Label className="content-center">Serial Number</Label>
                    {dataById?.serialNumber ? (
                      <Input
                        defaultValue={dataById.serialNumber}
                        {...register("serialNumber")}
                        disabled
                      ></Input>
                    ) : (
                      <Input {...register("serialNumber")} disabled></Input>
                    )}
                  </div>

                  <div>
                    <Label className="content-center">Tipo / Modelo</Label>
                    <Select
                      onValueChange={setComputerType}
                      required
                      defaultValue={dataById?.computerType}
                      disabled
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NTB">Notebook</SelectItem>
                        <SelectItem value="DSK">Desktop</SelectItem>
                        <SelectItem value="WKS">Workstation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="content-center">Localização</Label>
                    <Select
                      defaultValue={dataById?.location}
                      onValueChange={setLocation}
                      required
                      disabled
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Matriz">Matriz</SelectItem>
                        <SelectItem value="SP">São Paulo</SelectItem>
                        <SelectItem value="BH">Belo Horizonte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="content-center">Status da máquina</Label>
                    <Select
                      defaultValue={dataById?.computerStatus}
                      onValueChange={setComputerStatus}
                      required
                      disabled
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Available">Disponível</SelectItem>
                        <SelectItem value="Under Maintenance">
                          Em manutenção
                        </SelectItem>
                        <SelectItem value="Obsolete">Obsoleto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* TODO: adicionar esse campo */}
                  <div>
                    <Label className="content-center">
                      Entregue pelo técnico
                    </Label>
                    <Input
                      defaultValue={techDetails?.username}
                      disabled
                    ></Input>
                  </div>

                  <div>
                    <Label className="content-center">
                      Entregue ao usuário
                    </Label>
                    <Select
                      defaultValue={dataById?.WhoReceived_user_FK.toString()}
                      onValueChange={setWhoReceived_user_FK}
                      required
                      disabled
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an employee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Fulano</SelectItem>
                        <SelectItem value="2">Beutrano</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div></div>

                  <div>
                    <Label className="content-center">Outros periféricos</Label>
                    <Textarea
                      defaultValue={dataById?.othersEquipment}
                      {...register("othersEquipment")}
                      className="resize-none w-full h-40"
                      disabled
                    />
                  </div>

                  <div>
                    <Label className="content-center">Observações</Label>
                    <Textarea
                      defaultValue={dataById?.remarks}
                      {...register("remarks")}
                      className="resize-none w-full h-40"
                      disabled
                    />
                  </div>
                </div>
                <Button
                  onClick={closeModal}
                  variant={"destructive"}
                  className="absolute left-6 bottom-3"
                >
                  Fechar
                </Button>
              </form>
            </div>

            {/* Botão para fechar o modal */}
          </div>
        </div>
      )}
    </>
  );
}
