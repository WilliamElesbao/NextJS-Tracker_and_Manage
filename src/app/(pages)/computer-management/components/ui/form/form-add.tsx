"use client";

import { Button } from "@/app/components/ui/button";
import { Calendar } from "@/app/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { AuthContext } from "@/app/contexts/AuthContext/authContext";
import { cn } from "@/app/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "../../lib/addFormSchema";
import { formDataObject } from "../data-table/addBtnOpenModal";

type FormAddProps = {
  onSubmitData: (data: formDataObject) => Promise<void>;
};

export default function FormAdd({ onSubmitData }: FormAddProps) {
  const { user } = useContext(AuthContext);
  const [checkInDate, setCheckInDate] = useState<string | null>(null);
  const [givenBackDate, setGivenBackDate] = useState<string | null>(null);
  const [computerType, setComputerType] = useState("");
  const [location, setLocation] = useState("");
  const [computerStatus, setComputerStatus] = useState("");
  const [employee, setEmployee] = useState("");
  const [test, setTest] = useState("");

  // TODO: isso poderia ser açoes

  const handleDateChange = (
    setDateFn: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    return (newDate: string | null) => {
      setDateFn(newDate);
      console.log(newDate);
      return Promise.resolve(newDate);
    };
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   hostname: "",
    //   patrimonyID: 0,
    //   ticketNumber: "",
    //   computerType: "",
    //   serviceTag: "",
    //   serialNumber: "",
    //   location: "",
    //   computerStatus: "",
    //   othersEquipment: "",
    //   remarks: "",
    //   broughtBy_user_FK: 0,
    // checkInDate: "",
    // givenbackDate: "",
    // },
  });

  async function handleOnSubmit(formData: z.infer<typeof formSchema>) {
    const data = {
      ticketNumber: Number(formData.ticketNumber),
      recivedBy_tech_FK: user?.id,
      hostname: formData.hostname,
      patrimonyID: Number(formData.patrimonyID),
      serviceTag: formData.serviceTag === "" ? null : formData.serviceTag,
      serialNumber: formData.serialNumber === "" ? null : formData.serialNumber,
      location: location,
      computerStatus: computerStatus,
      broughtBy_user_FK: Number(employee),
      computerType: computerType,
      othersEquipment: formData.othersEquipment,
      remarks: formData.remarks,
      checkInDate: formData.checkInDate,
    };
    console.log(formData);
    console.log(data);

    onSubmitData(data);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="w-full h-full flex flex-col gap-5"
        >
          <div className="grid grid-cols-2 gap-2 ">
            <FormField
              control={form.control}
              name="ticketNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número SATI</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Número SATI" {...field} />
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
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
                        initialFocus
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
                    <Input
                      type="text"
                      name="recivedBy_tech_FK"
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
              name="broughtBy_user_FK"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Entregue pelo usuário</FormLabel>
                  <FormControl>
                    <Select onValueChange={setEmployee} required>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder="Select an employee"
                          {...field}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Users</SelectLabel>
                          <SelectItem value="1">Fulano</SelectItem>
                          <SelectItem value="2">Beutrano</SelectItem>
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
                  <FormControl>
                    <Input placeholder="Hostname" {...field} />
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
                  <FormControl>
                    <Input type="number" placeholder="Patrimony" {...field} />
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
                    <Input type="text" {...field} />
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
                    <Input type="text" {...field} />
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
                  <FormControl>
                    <Select onValueChange={setComputerType} required>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Type..." {...field} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NTB">Notebook</SelectItem>
                        <SelectItem value="DSK">Desktop</SelectItem>
                        <SelectItem value="WKS">Workstation</SelectItem>
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
                  <FormControl>
                    <Select onValueChange={setLocation} required>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder="Select a location"
                          {...field}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Locations</SelectLabel>
                          <SelectItem value="Matriz">Matriz</SelectItem>
                          <SelectItem value="SP">São Paulo</SelectItem>
                          <SelectItem value="BH">Belo Horizonte</SelectItem>
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
                  <FormControl>
                    <Select onValueChange={setComputerStatus} required>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a status" {...field} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          <SelectItem value="Under Maintenance">
                            Under Maintenance
                          </SelectItem>
                          <SelectItem value="Available for use">
                            Available for use
                          </SelectItem>
                          <SelectItem value="Obsolete">Obsolete</SelectItem>
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
              name="othersEquipment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Outros periféricos</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex.:  Mouse, Teclado, ..."
                      type="text"
                      {...field}
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
                    <Input
                      placeholder="Ex.: Any comments..."
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col">
            <Button type="submit">Add</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
