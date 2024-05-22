// components/TableHeaderRow.tsx
import { TableHead, TableRow } from "@/components/ui/table";

export function TableHeaderRow() {
  return (
    <TableRow>
      <TableHead className="truncate text-center">Número SATI</TableHead>
      <TableHead className="truncate text-center">Hostname</TableHead>
      <TableHead className="truncate text-center">Status</TableHead>
      <TableHead className="truncate text-center">Entregue por</TableHead>
      <TableHead className="truncate text-center">Recebido por</TableHead>
    </TableRow>
  );
}
