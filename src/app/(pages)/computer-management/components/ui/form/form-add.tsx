"use client";

import { Button } from "@/app/components/ui/button";
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { AuthContext } from "@/app/contexts/AuthContext/authContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "../../lib/addFormSchema";
import { formDataObject } from "../data-table/addBtnOpenModal";
import { DatePicker } from "./date-picker";

type FormAddProps = {
  onSubmitData: (data: formDataObject) => Promise<void>;
};

export default function FormAdd({ onSubmitData }: FormAddProps) {
  const { user } = useContext(AuthContext);
  const [handedOverDate, setHandedOverDate] = useState<string | null>(null);
  const [givenBackDate, setGivenBackDate] = useState<string | null>(null);
  const [computerType, setComputerType] = useState("");
  const [location, setLocation] = useState("");
  const [computerStatus, setComputerStatus] = useState("");
  const [employee, setEmployee] = useState("");

  // TODO: isso poderia ser açoes

  const handleDateChange = (
    setDateFn: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    return (newDate: string | null) => {
      setDateFn(newDate);
      return Promise.resolve(newDate);
    };
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hostname: "",
      patrimonyID: 0,
      ticketNumber: "",
      computerType: "",
      serviceTag: "",
      serialNumber: "",
      location: "",
      computerStatus: "",
      othersEquipment: "",
      remarks: "",
      broughtBy_user_FK: 0,
      handedoverDate: "",
      givenbackDate: "",
    },
  });

  async function handleOnSubmit(formData: z.infer<typeof formSchema>) {
    const data = {
      ...formData,
      ticketNumber: Number(formData.ticketNumber),
      patrimonyID: Number(formData.patrimonyID),
      serviceTag: formData.serviceTag === "" ? null : formData.serviceTag,
      serialNumber: formData.serialNumber === "" ? null : formData.serialNumber,
      broughtBy_user_FK: Number(employee),
      computerStatus: computerStatus,
      location: location,
      computerType: computerType,
      handedoverDate: handedOverDate,
      givenbackDate: givenBackDate,
      recivedBy_tech_FK: user?.id,
    };

    onSubmitData({ data });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleOnSubmit)}
          className="w-full h-full flex flex-col gap-5"
        >
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="ticketNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ticket Number</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Ticket Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="recivedBy_tech_FK"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recived by (Technician)</FormLabel>
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
                  <FormLabel>Patrimony</FormLabel>
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
                  <FormLabel>Type</FormLabel>
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
                  <FormLabel>Location</FormLabel>
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
                  <FormLabel>Computer Status</FormLabel>
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
              name="broughtBy_user_FK"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brought by (User)</FormLabel>
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
              name="othersEquipment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Others Equipaments</FormLabel>
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
                  <FormLabel>Remarks (Obs.)</FormLabel>
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

            <FormField
              control={form.control}
              name="handedoverDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Handed Over at (From User)</FormLabel>
                  <FormControl>
                    <DatePicker
                      onDateChange={handleDateChange(setHandedOverDate)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="givenbackDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Given back at (To User)</FormLabel>
                  <FormControl>
                    <DatePicker
                      onDateChange={handleDateChange(setGivenBackDate)}
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
