"use client";

import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import action from "../actions/actions";
import FormAdd from "./form-add";

type FormData = {
  data: {
    broughtBy_user_FK: string;
    handedoverDate: string;
    recivedBy_tech_FK: string;
    givenbackDate: string;
    ticketNumber: string;
    hostname: string;
    patrimonyID: string;
    computerType: string;
    serviceTag: string;
    serialNumber: string;
    location: string;
    computerStatus: string;
    othersEquipment: string;
    remarks: string;
  };
};

export function AddButtonOpenModalForm() {
  const [isOpen, setIsOpen] = useState(false);

  async function handleFormData(formData: FormData) {
    try {
      const response = await fetch(
        "http://localhost:3000/api/computermanagement/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        const x = await response.json();
        console.log(x);
        toast.error(`Erro ao salvar:${x.message}`);
        throw new Error("Failed to add computer");
      }

      toast.success("Computer added successfully!");
      setIsOpen(false);
      action();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <Dialog open={isOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-black text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            Add
          </Button>
        </DialogTrigger>
        {/* TODO: btn close X nao fecha, verificar... */}
        <DialogContent className="min-w-[90%] xl:min-w-[50%] h-auto">
          <DialogHeader>
            <DialogTitle>Control Form</DialogTitle>
            <DialogDescription>
              Form to add a machine to the management system
            </DialogDescription>
          </DialogHeader>

          <FormAdd onSubmitData={handleFormData} />

          <DialogFooter>
            <Button
              onClick={() => setIsOpen(!isOpen)}
              variant={"secondary"}
              className="w-full"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
