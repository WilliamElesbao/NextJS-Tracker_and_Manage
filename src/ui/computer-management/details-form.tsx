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
import { Records, Technician, User, defaultStatus } from "@/lib/types/Records";
import { DatePicker } from "./date-picker";

type ModifiedRecords = Omit<
  Records,
  "givenBackBy_tech_FK" | "WhoReceived_user_FK"
> & {
  givenBackBy_tech_FK: Technician;
  WhoReceived_user_FK: User;
};

type CheckOutFormProps = {
  onCloseModal: () => void;
  data?: ModifiedRecords;
};

export function DetailsForm({ onCloseModal, data }: CheckOutFormProps) {
  const closeModal = () => {
    onCloseModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-card xl:w-[65%] rounded shadow-lg p-6 pb-12">
        <div className="flex flex-col gap-3">
          <div className="header-content">
            <h2 className="">Detalhes - Check-out</h2>
          </div>

          <form method="PUT" className="flex flex-col gap-5 w-full p-6">
            <div className="grid grid-cols-2 gap-4">
              <div id="ticketNumber">
                <Label className="content-center">Numero SATI</Label>
                <Input disabled defaultValue={data?.ticketNumber}></Input>
              </div>

              <div>
                <Label className="content-center">Entrada em</Label>
                <DatePicker
                  defaultValue={
                    data?.checkInDate ? new Date(data.checkInDate) : null
                  }
                  disabled
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
                <Label className="content-center">Entregue pelo usuário</Label>
                <Select
                  defaultValue={data?.broughtBy_user_FK.toString()}
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
                <Input defaultValue={data?.hostname} disabled></Input>
              </div>

              <div>
                <Label className="content-center">Patrimônio</Label>
                <Input defaultValue={data?.patrimonyID} disabled></Input>
              </div>

              <div>
                <Label className="content-center">Service Tag</Label>
                {data?.serviceTag ? (
                  <Input defaultValue={data?.serviceTag} disabled></Input>
                ) : (
                  <Input disabled></Input>
                )}
              </div>

              <div>
                <Label className="content-center">Serial Number</Label>
                {data?.serialNumber ? (
                  <Input defaultValue={data.serialNumber} disabled></Input>
                ) : (
                  <Input disabled></Input>
                )}
              </div>

              <div>
                <Label className="content-center">Tipo / Modelo</Label>
                <Select defaultValue={data?.computerType} disabled>
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
                <Select defaultValue={data?.location} disabled>
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
                <Select defaultValue={data?.computerStatus} disabled>
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
                <Label className="content-center">Entregue pelo técnico</Label>
                <Input
                  defaultValue={data?.givenBackBy_tech_FK?.username}
                  disabled
                ></Input>
              </div>

              <div>
                <Label className="content-center">Entregue ao usuário</Label>
                <Select
                  defaultValue={
                    data?.WhoReceived_user_FK
                      ? data.WhoReceived_user_FK.toString()
                      : ""
                  }
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
              <div></div>

              <div>
                <Label className="content-center">Outros periféricos</Label>
                <Textarea
                  defaultValue={data?.othersEquipment || ""}
                  className="resize-none w-full h-40"
                  disabled
                />
              </div>

              <div>
                <Label className="content-center">Observações</Label>
                <Textarea
                  defaultValue={data?.remarks || ""}
                  className="resize-none w-full h-40"
                  disabled
                />
              </div>
            </div>
            <Button
              onClick={closeModal}
              className="absolute left-6 bottom-3 bg-primary"
            >
              Fechar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
