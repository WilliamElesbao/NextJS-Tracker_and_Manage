"use server";

import { Records } from "../types/RecordsTypes";
import { columns } from "./data-table/columns";
import { DataTable } from "./data-table/data-table";

export async function ComputerRecordsTable() {
  const response = await fetch(
    "http://localhost:3000/api/computermanagement/",
    {
      next: {
        tags: ["get-records"],
      },
    },
  );

  // TODO:
  // only test
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const records: Records[] = await response.json();

  return (
    <>
      <DataTable columns={columns} data={records}/>
    </>
  );
}
