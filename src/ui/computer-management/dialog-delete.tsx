"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Records } from "@/lib/types/RecordsTypes";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { DeleteRecord } from "./buttons";
import { faL } from "@fortawesome/free-solid-svg-icons";

export function DeleteBtn({
  rowData,
}: {
  rowData: Pick<Records, "id" | "hostname">;
}) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(rowData);

  return (
    <>
      <AlertDialog open={isOpen}>
        <AlertDialogTrigger asChild>
          <Button
            className="border border-destructive rounded-full bg-transparent text-destructive flex justify-center items-center w-6 h-6 p-1 opacity-80 hover:opacity-100 hover:bg-transparent duration-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Trash2 className="text-red-500" />
            <span className="sr-only">Delete</span>
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <h1>
                Tem certeza que desejas excluir o registro referente à máquina{" "}
                {rowData.hostname} ?
              </h1>{" "}
            </AlertDialogTitle>
            <AlertDialogDescription>
              <p>Essa ação não poderá ser desfeita.</p>O registro será excluído
              permanentemente.
              <p></p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <DeleteRecord
              rowData={rowData}
              closeDeleteDialog={() => setIsOpen(false)}
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
