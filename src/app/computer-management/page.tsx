import { fetchAllRecords } from "@/lib/data";
import { Records } from "@/lib/types/Records";
import { NavBreadcrumb } from "@/ui/computer-management/breadcrumb";
import { columns } from "@/ui/computer-management/columns";
import { DataTable } from "@/ui/computer-management/data-table";
import { Suspense } from "react";

export default async function Page() {
  // TODO:
  // only test
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const records: Records[] = await fetchAllRecords();

  return (
    <main className="container mt-14">
      <NavBreadcrumb />
      <Suspense
        fallback={
          <div className="container flex justify-center items-center ">
            Loading...
          </div>
        }
      >
        <DataTable columns={columns} data={records} />
      </Suspense>
    </main>
  );
}
