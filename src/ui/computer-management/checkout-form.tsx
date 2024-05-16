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
import { AuthContext } from "@/contexts/AuthContext/authContext";
import { updateRecord } from "@/lib/actions";
import {
  ComputerStatus,
  ComputerType,
  Records,
  defaultStatus,
} from "@/lib/types/RecordsTypes";
import { useContext, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { DatePicker } from "./date-picker";

type CheckOutFormProps = {
  onCloseModal: () => void;
  data?: Records;
};

export function CheckOutForm({ onCloseModal, data }: CheckOutFormProps) {
  const [selectedRowId, setSelectedRowId] = useState<string>();
  const [recivedBy_tech_FK, setRecivedBy_tech_FK] = useState<string>();
  const [computerType, setComputerType] = useState<ComputerType | string>();
  const [location, setLocation] = useState<Location | string>();
  const [computerStatus, setComputerStatus] = useState<
    ComputerStatus | string
  >();
  const [broughtBy_user_FK, setBroughtBy_user_FK] = useState<string | number>();
  const [whoReceived_user_FK, setWhoReceived_user_FK] = useState<
    string | number | null | undefined
  >();
  const [checkInDate, setCheckInDate] = useState<string | Date>();
  const { user } = useContext(AuthContext);
  const [chkBoxIsActive, setChkBoxIsActive] = useState(false);
  const { handleSubmit, register, setValue } = useForm();

  useEffect(() => {
    setValue("ticketNumber", data?.ticketNumber);
    setValue("hostname", data?.hostname || "");
    setValue("patrimonyID", data?.patrimonyID);
    setValue("serviceTag", data?.serviceTag);
    setValue("serialNumber", data?.serialNumber);
    setValue("othersEquipment", data?.othersEquipment);
    setValue("remarks", data?.remarks);

    setRecivedBy_tech_FK(data?.technician.id);
    setComputerType(data?.computerType);
    setLocation(data?.location);
    setComputerStatus(data?.computerStatus);
    setBroughtBy_user_FK(data?.broughtBy_user_FK);
    setWhoReceived_user_FK(data?.broughtBy_user_FK);
    setCheckInDate(data?.checkInDate);
    setSelectedRowId(data?.id);
  }, [data]);

  const handleCheckboxChange = () => {
    setChkBoxIsActive(!chkBoxIsActive);
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
      if (await updateRecord(selectedRowId, data)) {
        toast.success(
          `Check-out realizado para: ${dataFromFormCheckout.hostname}`,
        );
        onCloseModal();
      } else {
        console.error("Erro ao realizar check-out");
        toast.error(`Erro ao realizar check-out`);
      }
    } catch (error) {
      console.error("Check-out error: ", error);
    }
  };

  const closeModal = () => {
    onCloseModal();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="relative bg-white xl:w-[65%] rounded shadow-lg p-6 pb-12">
          <div className="flex flex-col gap-3">
            <div className="header-content">
              <h2 className="">Confirmar Check-Out</h2>
              <label className="border   border-neutral-800   bg-black   text-white   hover:bg-opacity-80   duration-200   absolute   right-6   top-6   p-1   px-2   rounded-lg   flex gap-3 cursor-pointer">
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
                    defaultValue={data?.ticketNumber}
                    {...register("ticketNumber")}
                  ></Input>
                </div>

                <div>
                  <Label className="content-center">Entrada em</Label>
                  <DatePicker
                    defaultValue={
                      data?.checkInDate ? new Date(data?.checkInDate) : null
                    }
                    disabled={true}
                  />
                </div>

                <div className="technician">
                  <Label className="content-center">Entregue ao técnico</Label>
                  <Input
                    defaultValue={data?.technician.username}
                    disabled
                  ></Input>
                </div>

                <div>
                  <Label className="content-center">
                    Entregue pelo usuário
                  </Label>
                  <Select
                    defaultValue={data?.broughtBy_user_FK.toString()}
                    onValueChange={setBroughtBy_user_FK}
                    required
                    disabled
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
                    defaultValue={data?.hostname}
                    {...register("hostname")}
                    disabled={!chkBoxIsActive}
                  ></Input>
                </div>

                <div>
                  <Label className="content-center">Patrimônio</Label>
                  <Input
                    defaultValue={data?.patrimonyID}
                    {...register("patrimonyID")}
                    disabled={!chkBoxIsActive}
                  ></Input>
                </div>

                <div>
                  <Label className="content-center">Service Tag</Label>
                  {data?.serviceTag ? (
                    <Input
                      defaultValue={data?.serviceTag}
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
                  {data?.serialNumber ? (
                    <Input
                      defaultValue={data.serialNumber}
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
                    defaultValue={data?.computerType}
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
                    defaultValue={data?.location}
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
                    defaultValue={data?.computerStatus}
                    onValueChange={setComputerStatus}
                    required
                    disabled={!chkBoxIsActive}
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
                  <Label className="content-center">
                    Entregue pelo técnico
                  </Label>
                  <Input defaultValue={user?.username} disabled></Input>
                </div>

                <div>
                  <Label className="content-center">Entregue ao usuário</Label>
                  <Select
                    defaultValue={data?.broughtBy_user_FK.toString()}
                    onValueChange={setWhoReceived_user_FK}
                    required
                    disabled={!chkBoxIsActive}
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
                <div></div>

                <div>
                  <Label className="content-center">Outros periféricos</Label>
                  <Textarea
                    defaultValue={data?.othersEquipment || ""}
                    {...register("othersEquipment")}
                    className="resize-none w-full h-40"
                    disabled={!chkBoxIsActive}
                  />
                </div>

                <div>
                  <Label className="content-center">Observações</Label>
                  <Textarea
                    defaultValue={data?.remarks || ""}
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
        </div>
      </div>
    </>
  );
}
