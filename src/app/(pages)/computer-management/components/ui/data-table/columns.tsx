"use client";

import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import action from "../../actions/actions";
import { Records } from "../../types/RecordsTypes";

export const columns: ColumnDef<Records>[] = [
  {
    accessorKey: "hostname",
    header: "Hostname",
  },
  {
    accessorKey: "ticketNumber",
    header: "Ticket Number",
  },
  {
    accessorKey: "handedoverDate",
    header: "handedoverDate",
  },
  {
    accessorKey: "user.email",
    header: "user",
  },
  {
    accessorKey: "technician.username",
    header: "technician",
  },
  {
    accessorKey: "givenbackDate",
    header: "givenbackDate",
  },
  {
    accessorKey: "computerType",
    header: "Comp. Type",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "CreatedAt",
    header: "CreatedAt",
  },
  {
    accessorKey: "UpdatedAt",
    header: "UpdatedAt",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const rowData: Records = row.original;
      const router = useRouter();

      function redirectToEditPage(rowData: Records) {
        router.push(`/computer-management/edit-record/?id=${rowData.id}`);
      }

      async function actionToDeleteRecord(rowData: Records) {
        try {
          const url = `/api/computermanagement/?id=${rowData.id}`;
          const response = await fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            toast.success(`Deleted Computer: ${rowData.hostname}`);
          } else {
            console.error("Falha ao excluir registro.");
            toast.error("Error deleting record!");
          }
          action();
        } catch (error) {
          toast.error("Puts se cai aqui deu ruim!");
          console.error("Erro ao realizar o Try:", error);
        }
      }

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-black flex flex-col gap-1"
            >
              <DropdownMenuLabel className="text-white">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuItem>
                <Button
                  variant={"secondary"}
                  className="w-full"
                  onClick={() => {
                    redirectToEditPage(rowData);
                  }}
                >
                  Edit
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  variant={"destructive"}
                  className="w-full hover:opacity-60"
                  onClick={() => {
                    actionToDeleteRecord(rowData);
                  }}
                >
                  Delete
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
