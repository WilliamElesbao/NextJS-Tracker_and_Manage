"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import CreateForm from "./create-form";

export function AddBtn() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Dialog open={isOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-black text-white flex gap-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FontAwesomeIcon icon={faPlus} />
            Criar Registro
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
            <DialogTitle>Formulário de controle</DialogTitle>
            <DialogDescription>
              Crie um registro de entrada de um equipamento.
            </DialogDescription>
          </DialogHeader>

          <CreateForm onCloseModal={() => setIsOpen(false)} />

          <DialogFooter>{/* Dialog Footer */}</DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
