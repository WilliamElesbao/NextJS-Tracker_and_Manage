"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { createRecord } from "@/lib/actions";
import { formSchema } from "@/lib/addFormSchema";
import {
  computerTypes,
  defaultStatus,
  locations,
} from "@/lib/types/RecordsTypes";
import { AddFormTypes } from "@/lib/types/add-form-types";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

type FormAddProps = {
  onCloseModal: () => void;
};

export default function CreateForm({ onCloseModal }: FormAddProps) {
  const { user } = useContext(AuthContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recivedBy_tech_FK: user?.id,
      othersEquipment: "",
      remarks: "",
      hostname: "",
      patrimonyID: 0,
      ticketNumber: 0,
      serialNumber: "",
      serviceTag: "",
    },
  });

  async function handleOnSubmit(formData: z.infer<typeof formSchema>) {
    const data: AddFormTypes = {
      ...formData,
      serviceTag:
        formData.serviceTag === "" || formData.serviceTag === undefined
          ? null
          : formData.serviceTag,
      serialNumber:
        formData.serialNumber === "" || formData.serialNumber === undefined
          ? null
          : formData.serialNumber,
      othersEquipment: formData.othersEquipment ?? "",
      remarks: formData.remarks ?? "",
    };

    try {
      // TODO: Tratar erro ao salvar quando ocorrer conflito com ST, ST, HOSTNAME, PATRIMONIO
      if (await createRecord(data)) {
        toast.success("Registro criado com sucesso!");
      } else {
        toast.error(`Erro ao salvar`);
        throw new Error("Failed to add computer");
      }
      onCloseModal();
    } catch (error) {
      console.error(error);
    }
  }

  const closeModal = () => {
    onCloseModal();
  };

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
                  <span className="ml-2 text-destructive">*</span>
                  <FormControl>
                    <Input type="number" placeholder="Número SATI" {...field} />
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
                  <span className="ml-2 text-destructive">*</span>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an employee" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Users</SelectLabel>
                          <SelectItem value="1">William Elesbão</SelectItem>
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
                  <span className="ml-2 text-destructive">*</span>
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
                  <span className="ml-2 text-destructive">*</span>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Tipo / Modelo..." />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(computerTypes).map(([key, value]) => (
                          <SelectItem key={key} value={key}>
                            {value}
                          </SelectItem>
                        ))}
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
                    <Select onValueChange={field.onChange}>
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
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          {Object.entries(defaultStatus).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
                              {value}
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
                    <Textarea placeholder="Ex.: Any comments..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex relative">
            <Button
              type="submit"
              className="absolute right-0 bg-primary hover:scale-110 hover:bg-primary"
            >
              Salvar
            </Button>
            <Button onClick={closeModal} className="absolute right-20">
              Fechar
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}