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
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import action from "../../actions/actions";
import FormAdd from "../form/form-add";

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
        const result = await response.json();
        toast.error(`Erro ao salvar:${result.message}`);
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

        <DialogContent className="min-w-[90%] xl:min-w-[50%] h-auto">
          <div className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <Cross2Icon
              className="h-4 w-4 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>
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
