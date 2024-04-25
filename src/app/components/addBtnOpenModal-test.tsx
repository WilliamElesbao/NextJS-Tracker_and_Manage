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
    console.log(formData);

    // try {
    //   const response = await fetch("/api/computermanagement/", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed to add computer");
    //   }

    //   console.log("Computer added successfully");
    //   setIsOpen(false);
    //   window.location.reload();
    // } catch (error) {
    //   console.error(error);
    // }
  }

  return (
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
      <DialogContent className="min-w-max">
        <DialogHeader>
          <DialogTitle>Control Form</DialogTitle>
          <DialogDescription>
            Form to add a machine to the management system
          </DialogDescription>
        </DialogHeader>

        <h1>FORM HERE</h1>
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
  );
}
