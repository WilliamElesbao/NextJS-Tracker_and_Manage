import { Suspense } from "react";
import { fetchAllRecords } from "../lib/data";
import { Records } from "../lib/types/RecordsTypes";
import { columns } from "../ui/computer-management/columns";
import { DataTable } from "../ui/computer-management/data-table";

export default async function Page() {
  // TODO:
  // only test
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const records: Records[] = await fetchAllRecords();

  return (
    <main className="flex justify-center items-center">
      <div className="container mx-auto py-10">
        <Suspense
          fallback={
            <div className="container flex justify-center items-center ">
              Loading...
            </div>
          }
        >
          <DataTable columns={columns} data={records} />
        </Suspense>
      </div>
    </main>
  );
}
