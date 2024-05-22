// components/TableBodyRows.tsx
import { TableCell, TableRow } from "@/components/ui/table";
import { Records } from "@/lib/types/Records";
import clsx from "clsx";

interface TableBodyRowsProps {
  records: Pick<
    Records,
    | "id"
    | "ticketNumber"
    | "hostname"
    | "computerStatus"
    | "user"
    | "technician"
    | "checkoutStatus"
  >[];
}

export function TableBodyRows({ records }: TableBodyRowsProps) {
  return (
    <>
      {records.map((record) => (
        <TableRow key={record.id} className="truncate text-center">
          <TableCell>{record.ticketNumber}</TableCell>
          <TableCell>{record.hostname}</TableCell>
          <TableCell className="flex justify-center items-center mt-1">
            <span
              className={clsx("h-2 w-2 rounded-full", {
                "bg-lime-600": record.computerStatus === "available",
                "bg-amber-400": record.computerStatus === "underMaintenance",
                "bg-destructive": record.computerStatus === "obsolete",
              })}
            />
          </TableCell>
          <TableCell>{record.user.name}</TableCell>
          <TableCell>{record.technician.username}</TableCell>
        </TableRow>
      ))}
    </>
  );
}
