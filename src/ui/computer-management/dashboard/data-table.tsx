"use client";

import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { fetchAllRecords } from "@/lib/data";
import { Records } from "@/lib/types/Records";
import { EnterIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Pagination } from "./pagination";
import { TableBodyRows } from "./table-body-rows";
import { TableHeaderRow } from "./table-header-row";

export function DataTable() {
  const [allRecords, setAllRecords] = useState<
    Pick<
      Records,
      | "id"
      | "ticketNumber"
      | "hostname"
      | "computerStatus"
      | "user"
      | "technician"
      | "checkoutStatus"
    >[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    async function fetchData() {
      const records = await fetchAllRecords();
      const filteredRecords = records.filter(
        (record) => record.checkoutStatus !== true,
      );
      setAllRecords(filteredRecords);
    }
    fetchData();
  }, []);

  const totalPages = Math.ceil(allRecords.length / recordsPerPage);

  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = allRecords.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="flex items-center gap-3 font-medium">
        <EnterIcon className="h-5 w-5" />
        <h1>Check-ins</h1>
      </div>
      <Table>
        <TableHeader>
          <TableHeaderRow />
        </TableHeader>
        <TableBody>
          <TableBodyRows records={currentRecords} />
        </TableBody>
      </Table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
