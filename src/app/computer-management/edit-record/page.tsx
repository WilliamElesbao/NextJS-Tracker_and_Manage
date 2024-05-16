"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { updateRecord } from "@/lib/actions";
import {
  computerTypes,
  defaultStatus,
  locations,
} from "@/lib/types/RecordsTypes";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Records } from "@/lib/types/RecordsTypes";
import { DatePicker } from "@/ui/computer-management/date-picker";
import { fetchRecordById } from "@/lib/data";

export default function EditRecord() {
  const idFromSearchParams = useSearchParams().get("id")!!;
  const [record, setRecord] = useState<any>();
  const [computerType, setComputerType] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [computerStatus, setComputerStatus] = useState<string>("");
  const [broughtBy_user, setBroughtBy_user] = useState<string | number>(0);
  const [handedoverDate, setHandedoverDate] = useState<any>(null);
  const { handleSubmit, register } = useForm();
  const router = useRouter();

  const handleDateChange = (
    setDateFn: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    return (newDate: string | null) => {
      setDateFn(newDate);
      return Promise.resolve(newDate);
    };
  };

  useEffect(() => {
    const recordForEdit = async () => {
      try {
        const reqDataFromAPI = await fetchRecordById(idFromSearchParams);
        setRecord(reqDataFromAPI);
        setComputerType(reqDataFromAPI!.computerType);
        setLocation(reqDataFromAPI!.location);
        setComputerStatus(reqDataFromAPI!.computerStatus);
        setBroughtBy_user(reqDataFromAPI!.broughtBy_user_FK);
        setHandedoverDate(reqDataFromAPI!.checkInDate);
      } catch (error) {
        console.error("Erro ao buscar o registro pelo id: ", error);
      }
    };

    recordForEdit();
  }, [idFromSearchParams]);

  const onSubmit: SubmitHandler<FieldValues> = async (
    dataFromForm: Records | FieldValues,
  ) => {
    const data = {
      ticketNumber: Number(dataFromForm.ticketNumber),
      recivedBy_tech_FK: record?.technician.id,
      hostname: dataFromForm.hostname,
      patrimonyID: Number(dataFromForm.patrimonyID),
      serviceTag:
        dataFromForm.serviceTag === "" ? null : dataFromForm.serviceTag,
      serialNumber:
        dataFromForm.serialNumber === "" ? null : dataFromForm.serialNumber,
      computerType: computerType,
      location: location,
      computerStatus: computerStatus,
      broughtBy_user_FK: Number(broughtBy_user),
      othersEquipment: dataFromForm.othersEquipment,
      remarks: dataFromForm.remarks,
      checkInDate: handedoverDate,
    };

    try {
      // TODO: Tratar erro ao salvar quando ocorrer conflito com ST, ST, HOSTNAME, PATRIMONIO
      if (await updateRecord(idFromSearchParams, data)) {
        toast.success("Registro atualizado!");
        router.back();
      } else {
        toast.error(`Erro ao atualizar`);
        throw new Error("Erro ao atualizar");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <main className="container flex flex-col mt-5 gap-5">
        <Link
          href={"/computer-management"}
          className="border w-32 h-10 flex items-center justify-center rounded-md "
        >
          <ArrowLeft className="mr-2 size-4" />
          Voltar
        </Link>
        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="text-xl text-black">Edit Record</h2>
          <hr className="w-full h-1" />
          <h3 className="text-xl text-black">{record?.hostname}</h3>
        </div>
        {record ? (
          <>
            <form
              onSubmit={handleSubmit(onSubmit)}
              method="PUT"
              className="flex flex-col gap-5  md:w-[70%] md:mx-auto mb-5"
            >
              <div className="grid grid-cols-2 gap-2">
                <div id="ticketNumber">
                  <Label className="content-center">Número SATI</Label>
                  <Input
                    defaultValue={record.ticketNumber}
                    {...register("ticketNumber")}
                  ></Input>
                </div>

                <div>
                  <Label className="content-center">Entrada em</Label>
                  <DatePicker
                    onDateChange={handleDateChange(setHandedoverDate)}
                    defaultValue={
                      handedoverDate ? new Date(handedoverDate) : null
                    }
                  />
                </div>

                <div className="technician">
                  <Label className="content-center">Entregue ao técnico</Label>
                  <Input
                    defaultValue={record.technician.username}
                    disabled
                  ></Input>
                </div>

                <div>
                  <Label className="content-center">
                    Entregue pelo usuário
                  </Label>
                  <Select
                    defaultValue={record.broughtBy_user_FK.toString()}
                    onValueChange={setBroughtBy_user}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an employee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">William Elesbão</SelectItem>
                      <SelectItem value="2">willtubetech</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="content-center">Hostname</Label>
                  <Input
                    defaultValue={record.hostname}
                    {...register("hostname")}
                  ></Input>
                </div>

                <div>
                  <Label className="content-center">Patrimony</Label>
                  <Input
                    defaultValue={record.patrimonyID}
                    {...register("patrimonyID")}
                  ></Input>
                </div>

                <div>
                  <Label className="content-center">Service Tag</Label>
                  {record.serviceTag ? (
                    <Input
                      defaultValue={record.serviceTag}
                      {...register("serviceTag")}
                    ></Input>
                  ) : (
                    <Input {...register("serviceTag")}></Input>
                  )}
                </div>

                <div>
                  <Label className="content-center">Serial Number</Label>
                  {record.serialNumber ? (
                    <Input
                      defaultValue={record.serialNumber}
                      {...register("serialNumber")}
                    ></Input>
                  ) : (
                    <Input {...register("serialNumber")}></Input>
                  )}
                </div>

                <div>
                  <Label className="content-center">Tipo / Modelo</Label>
                  <Select
                    onValueChange={setComputerType}
                    required
                    defaultValue={record.computerType}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(computerTypes).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="content-center">Localização</Label>
                  <Select
                    defaultValue={record.location}
                    onValueChange={setLocation}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="content-center">Status da máquina</Label>
                  <Select
                    defaultValue={record.computerStatus}
                    onValueChange={setComputerStatus}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(defaultStatus).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="content-center">Outros periféricos</Label>
                  <Textarea
                    defaultValue={record?.othersEquipment || ""}
                    {...register("othersEquipment")}
                    className="resize-none w-full h-20 md:h-40"
                  />
                </div>

                <div>
                  <Label className="content-center">Observações</Label>
                  <Textarea
                    defaultValue={record?.remarks || ""}
                    {...register("remarks")}
                    className="resize-none w-full h-20 md:h-40"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <Button type="submit">Save</Button>
              </div>
            </form>
          </>
        ) : (
          ``
          // TODO: Skeleton
          // <div>Loading...</div>
        )}
      </main>
    </>
  );
}
