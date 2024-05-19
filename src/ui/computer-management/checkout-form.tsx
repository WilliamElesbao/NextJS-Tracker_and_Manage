"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AuthContext } from "@/contexts/AuthContext/authContext";
import { updateRecord } from "@/lib/actions";
import { formSchema } from "@/lib/addFormSchema";
import { sendCheckOutMail } from "@/lib/mailer";
import {
  Records,
  computerTypes,
  defaultStatus,
  locations,
} from "@/lib/types/RecordsTypes";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Pencil1Icon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import clsx from "clsx";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

type CheckOutFormProps = {
  onCloseModal: () => void;
  data?: Records;
};

export function CheckOutForm({ onCloseModal, data }: CheckOutFormProps) {
  const { user } = useContext(AuthContext);
  const [chkBoxIsActive, setChkBoxIsActive] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ticketNumber: Number(data?.ticketNumber),
      checkInDate: new Date(data!.checkInDate),
      recivedBy_tech_FK: data?.technician.username,
      broughtBy_user_FK: data?.user.id,
      hostname: data?.hostname,
      patrimonyID: Number(data?.patrimonyID),
      serviceTag: data?.serviceTag! ?? "",
      serialNumber: data?.serialNumber! ?? "",
      computerType: data?.computerType,
      location: data?.location,
      computerStatus: data?.computerStatus,
      WhoReceived_user_FK: data?.user.id!,
      othersEquipment: data?.othersEquipment!,
      remarks: data?.remarks!,
    },
  });

  const handleCheckboxChange = () => {
    setChkBoxIsActive(!chkBoxIsActive);
  };

  async function checkoutConfirmed(
    dataFromFormCheckout: z.infer<typeof formSchema>,
  ) {
    const checkoutData = {
      ...dataFromFormCheckout,
      recivedBy_tech_FK: data?.technician.id,
      givenBackBy_tech_FK: user?.id,
      WhoReceived_user_FK: Number(dataFromFormCheckout.WhoReceived_user_FK),
      serviceTag:
        dataFromFormCheckout.serviceTag === "" ||
        dataFromFormCheckout.serviceTag === undefined
          ? null
          : dataFromFormCheckout.serviceTag,
      serialNumber:
        dataFromFormCheckout.serialNumber === "" ||
        dataFromFormCheckout.serialNumber === undefined
          ? null
          : dataFromFormCheckout.serialNumber,
      othersEquipment: dataFromFormCheckout.othersEquipment ?? "",
      remarks: dataFromFormCheckout.remarks ?? "",
      checkOutDate: new Date(),
      checkoutStatus: true,
    };

    try {
      if (await updateRecord(data!.id, checkoutData)) {
        toast.success(
          `Check-out realizado para: ${dataFromFormCheckout.hostname}`,
        );
        onCloseModal();
        sendCheckOutMail(data!.id);
      } else {
        console.error("Erro ao realizar check-out");
        toast.error(`Erro ao realizar check-out`);
      }
    } catch (error) {
      console.error("Check-out error: ", error);
    }
  }

  const closeModal = () => {
    onCloseModal();
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="relative bg-card xl:w-[65%] rounded shadow-lg p-6 pb-16">
          <div className="flex flex-col gap-3">
            <div className="header-content">
              <h2 className="">Confirmar Check-Out</h2>
              <Label
                className={clsx(
                  "flex gap-2 absolute right-6 top-6 border rounded-full p-2 cursor-pointer",
                  {
                    "bg-primary": chkBoxIsActive,
                  },
                )}
              >
                <input
                  type="checkbox"
                  checked={chkBoxIsActive}
                  onChange={handleCheckboxChange}
                  className="sr-only"
                />
                <Pencil1Icon />
                {!chkBoxIsActive ? (
                  <span>Habilitar edição</span>
                ) : (
                  <span>Desabilitar edição</span>
                )}
              </Label>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(checkoutConfirmed)}
                className="w-full h-full flex flex-col gap-5"
              >
                <div className="grid grid-cols-2 gap-2 ">
                  <FormField
                    control={form.control}
                    name="ticketNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número SATI</FormLabel>
                        <span className="ml-2 text-destructive">*</span>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Número SATI"
                            {...field}
                            disabled={!chkBoxIsActive}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="checkInDate"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Entrada em</FormLabel>
                        <span className="ml-2 text-destructive">*</span>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                disabled
                                variant={"outline"}
                                className={cn(
                                  "w-full text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Selecione uma data</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="recivedBy_tech_FK"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Entregue ao técnico</FormLabel>
                        <FormControl>
                          <Input type="text" {...field} disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="broughtBy_user_FK"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Entregue pelo usuário</FormLabel>
                        <span className="ml-2 text-destructive">*</span>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value.toString()}
                            disabled
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select an employee" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Users</SelectLabel>
                                <SelectItem value="1">
                                  William Elesbão
                                </SelectItem>
                                <SelectItem value="2">willtubetech</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hostname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hostname</FormLabel>
                        <span className="ml-2 text-destructive">*</span>
                        <FormControl>
                          <Input
                            placeholder="Hostname"
                            {...field}
                            disabled={!chkBoxIsActive}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="patrimonyID"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Patrimônio</FormLabel>
                        <span className="ml-2 text-destructive">*</span>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Patrimony"
                            {...field}
                            disabled={!chkBoxIsActive}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="serviceTag"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Tag</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            disabled={!chkBoxIsActive}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="serialNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Serial Number</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            disabled={!chkBoxIsActive}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="computerType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo / Modelo</FormLabel>
                        <span className="ml-2 text-destructive">*</span>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            {...field}
                            disabled={!chkBoxIsActive}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Tipo / Modelo..." />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(computerTypes).map(
                                ([key, value]) => (
                                  <SelectItem key={key} value={key}>
                                    {value}
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Localização</FormLabel>
                        <span className="ml-2 text-destructive">*</span>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            {...field}
                            disabled={!chkBoxIsActive}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Locations</SelectLabel>
                                {locations.map((location) => (
                                  <SelectItem key={location} value={location}>
                                    {location}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="computerStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status da máquina</FormLabel>
                        <span className="ml-2 text-destructive">*</span>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            {...field}
                            disabled={!chkBoxIsActive}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                {Object.entries(defaultStatus).map(
                                  ([key, value]) => (
                                    <SelectItem key={key} value={key}>
                                      {value}
                                    </SelectItem>
                                  ),
                                )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="givenBackBy_tech_FK"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Entregue pelo técnico</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            defaultValue={user?.username}
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="WhoReceived_user_FK"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Entregue ao usuário</FormLabel>
                        <span className="ml-2 text-destructive">*</span>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value.toString()}
                            disabled={!chkBoxIsActive}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select an employee" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Users</SelectLabel>
                                <SelectItem value="1">
                                  William Elesbão
                                </SelectItem>
                                <SelectItem value="2">willtubetech</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div></div>

                  <FormField
                    control={form.control}
                    name="othersEquipment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Outros periféricos</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Ex.:  Mouse, Teclado, ..."
                            {...field}
                            disabled={!chkBoxIsActive}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="remarks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Observações:</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Ex.: Any comments..."
                            {...field}
                            disabled={!chkBoxIsActive}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  type="submit"
                  className="absolute right-6 bottom-3 bg-primary hover:scale-110 hover:bg-primary"
                >
                  Concluir Check-out
                </Button>
                <Button
                  onClick={closeModal}
                  className="absolute left-6 bottom-3"
                >
                  Fechar
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
