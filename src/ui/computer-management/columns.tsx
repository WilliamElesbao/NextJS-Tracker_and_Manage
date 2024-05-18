"use client";

import { EditBtn } from "@/ui/computer-management/buttons";
import { ColumnDef } from "@tanstack/react-table";
import { Records } from "../../lib/types/RecordsTypes";
import { DeleteBtn } from "./dialog-delete";

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
          <div className="flex justify-center gap-2 items-center">
            <EditBtn id={rowData.id} />
            {/* <DeleteRecord rowData={rowData} /> */}
            <DeleteBtn rowData={rowData} />
          </div>
        );
      }
    },
  },
];
