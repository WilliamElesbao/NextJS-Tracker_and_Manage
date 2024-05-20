"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchAllRecords } from "@/lib/data";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { EnterIcon } from "@radix-ui/react-icons";

// Componente de Paginação
function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [...Array(totalPages).keys()].map((num) => num + 1);

  return (
    <div className="flex justify-center mt-4">
      {pages.map((page) => (
        <button
          key={page}
          className={clsx("mx-1 px-3 py-1 rounded", {
            "bg-primary text-white": page === currentPage,
            "bg-background border": page !== currentPage,
          })}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export function DataTable() {
  const [allRecords, setAllRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  useEffect(() => {
    async function fetchData() {
      const records = await fetchAllRecords();
      // Filtrar registros onde checkOutStatus é true
      const filteredRecords = records.filter(
        (record) => record.checkoutStatus !== true,
      );
      setAllRecords(filteredRecords);
    }
    fetchData();
  }, []);

  // Calcular o número total de páginas
  const totalPages = Math.ceil(allRecords.length / recordsPerPage);

  // Calcular os registros para a página atual
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentRecords = allRecords.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
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
          <TableRow>
            <TableHead className="truncate text-center">Número SATI</TableHead>
            <TableHead className="truncate text-center">Hostname</TableHead>
            <TableHead className="truncate text-center">Status</TableHead>
            <TableHead className="truncate text-center">Entregue por</TableHead>
            <TableHead className="truncate text-center">Recebido por</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentRecords.map((record) => (
            <TableRow key={record.id} className="truncate text-center">
              <TableCell>{record.ticketNumber}</TableCell>
              <TableCell>{record.hostname}</TableCell>
              <TableCell className="flex justify-center items-center mt-1">
                <span
                  className={clsx("h-2 w-2 rounded-full", {
                    "bg-lime-600": record.computerStatus === "available",
                    "bg-amber-400":
                      record.computerStatus === "underMaintenance",
                    "bg-destructive": record.computerStatus === "obsolete",
                  })}
                />
              </TableCell>
              <TableCell>{record.user.name}</TableCell>
              <TableCell>{record.technician.username}</TableCell>
            </TableRow>
          ))}
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
