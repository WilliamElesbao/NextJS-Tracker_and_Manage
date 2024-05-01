"use client";

import { NavHeader } from "@/app/components/header/navHeader";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { AuthProvider } from "@/app/contexts/authDataProvider";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import action from "../components/actions/actions";
import { Records } from "../components/types/RecordsTypes";
import { DatePickerDemo } from "../components/ui/form/date-picker";

export default function EditRecord() {
  const idFromSearchParams = useSearchParams().get("id");
  const [record, setRecord] = useState<Records | null>(null);
  const [computerType, setComputerType] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [computerStatus, setComputerStatus] = useState<string>("");
  const [broughtBy_user, setBroughtBy_user] = useState<string | number>(0);
  const [handedoverDate, setHandedoverDate] = useState<Date | any>();
  const [givenbackDate, setGivenbackDate] = useState<Date | any>();
  const { handleSubmit, register } = useForm();
  const router = useRouter();

  // TODO: isso poderia ser açoes
  const handleHandedOverDate = (newDate: Date) => {
    setHandedoverDate(newDate);
  };
  const handleGivenBackDate = (newDate: Date) => {
    setGivenbackDate(newDate);
  };

  useEffect(() => {
    const recordForEdit = async () => {
      const response = await fetch(
        `http://localhost:3000/api/computermanagement/?id=${idFromSearchParams}`,
      );

      if (response.ok) {
        const reqDataFromAPI: Records = await response.json();
        setRecord(reqDataFromAPI);
        setComputerType(reqDataFromAPI.computerType);
        setLocation(reqDataFromAPI.location);
        setComputerStatus(reqDataFromAPI.computerStatus);
        setBroughtBy_user(reqDataFromAPI.broughtBy_user_FK);
        setHandedoverDate(reqDataFromAPI.handedoverDate);
        setGivenbackDate(reqDataFromAPI.givenbackDate);
      }
    };

    recordForEdit();
  }, [idFromSearchParams]);

  const onSubmit: SubmitHandler<FieldValues> = async (
    dataFromForm: Records | FieldValues,
  ) => {
    console.log(idFromSearchParams);
    const data: {} | Records = {
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
      handedoverDate: handedoverDate,
      givenbackDate: givenbackDate,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/computermanagement/?id=${idFromSearchParams}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
        },
      );

      if (response.ok) {
        toast.info(`Edited Computer: ${dataFromForm.hostname}`);
        action();
        router.back();
      } else {
        const result = await response.json();
        console.error("Erro ao editar os dados");
        toast.error(`Erro ao editar os dados ${result.error.meta.target}`);
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <>
      <AuthProvider>
        <NavHeader />
        <main className="container flex flex-col mt-5 gap-5">
          <Link href={"/"}>
            <Button>Go back</Button>
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
                    <Label className="content-center">Ticket Number</Label>
                    <Input
                      defaultValue={record.ticketNumber}
                      {...register("ticketNumber")}
                    ></Input>
                  </div>

                  <div className="technician">
                    <Label className="content-center">
                      Recived By (Technician)
                    </Label>
                    <Input
                      defaultValue={record.technician.username}
                      disabled
                    ></Input>
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
                    <Label className="content-center">Type</Label>
                    <Select
                      onValueChange={setComputerType}
                      required
                      defaultValue={record.computerType}
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
                    <Label className="content-center">Location</Label>
                    <Select
                      defaultValue={record.location}
                      onValueChange={setLocation}
                      required
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
                    <Label className="content-center">Computer Status</Label>
                    <Select
                      defaultValue={record.computerStatus}
                      onValueChange={setComputerStatus}
                      required
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Under Maintenance">
                          Under Maintenance
                        </SelectItem>
                        <SelectItem value="Available for use">
                          Available for use
                        </SelectItem>
                        <SelectItem value="Obsolete">Obsolete</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="content-center">Brought by (User)</Label>
                    <Select
                      defaultValue={record.broughtBy_user_FK.toString()}
                      onValueChange={setBroughtBy_user}
                      required
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
                    <Label className="content-center">Other Equipaments</Label>
                    <Textarea
                      defaultValue={record.othersEquipment}
                      {...register("othersEquipment")}
                      className="resize-none w-full h-20 md:h-40"
                    />
                  </div>

                  <div>
                    <Label className="content-center">Remarks (Obs.)</Label>
                    <Textarea
                      defaultValue={record.remarks}
                      {...register("remarks")}
                      className="resize-none w-full h-20 md:h-40"
                    />
                  </div>

                  <div>
                    <Label className="content-center">
                      Handed Over at (From User)
                    </Label>
                    <DatePickerDemo
                      onDateChange={handleHandedOverDate}
                      defaultValueTest={record.handedoverDate}
                    />
                  </div>

                  <div>
                    <Label className="content-center">
                      Given back at (To User)
                    </Label>
                    <DatePickerDemo
                      onDateChange={handleGivenBackDate}
                      defaultValueTest={record.givenbackDate}
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
            // <div>Loading...</div>
          )}
        </main>
      </AuthProvider>
    </>
  );
}