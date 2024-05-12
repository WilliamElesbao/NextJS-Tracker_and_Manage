"use client";

import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { DeleteRecord, EditRecord } from "@/app/ui/computer-management/buttons";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Records } from "../../lib/types/RecordsTypes";

export const columns: ColumnDef<Records>[] = [
  {
    accessorKey: "ticketNumber",
    header: "Número SATI",
  },
  {
    accessorKey: "hostname",
    header: "Hostname",
  },
  {
    accessorKey: "user.email",
    header: "Entregue pelo User",
  },
  {
    accessorKey: "technician.username",
    header: "Entregue ao técnico",
  },
  {
    accessorKey: "computerType",
    header: "Modelo máquina",
  },
  {
    accessorKey: "location",
    header: "Localização",
  },
  {
    accessorKey: "checkInDate",
    header: "Data entrada",
  },
  {
    accessorKey: "checkoutStatus",
    header: "Status de saída",
  },
  {
    accessorKey: "createdAt",
    header: "Aberto em",
  },
  {
    accessorKey: "updatedAt",
    header: "Atualiz. em",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const rowData: Records = row.original;
      const checkoutStatus = row.getValue("checkoutStatus");

      if (checkoutStatus) {
        return;
      } else {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white flex flex-col gap-1"
            >
              <DropdownMenuLabel className="text-black">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuItem>
                <EditRecord id={rowData.id} />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DeleteRecord rowData={rowData} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    },
  },
];
