import { NavBreadcrumb } from "@/ui/computer-management/dashboard/breadcrumb";
import CardWrapper from "@/ui/computer-management/dashboard/cards";
import { DataTable } from "@/ui/computer-management/dashboard/data-table";
import LatestCheckInOut from "@/ui/computer-management/dashboard/latest-check-in-out";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Page() {
  return (
    <main className="container mt-10 lg:mt-32 flex flex-col gap-6">
      <NavBreadcrumb />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardWrapper />
      </div>
      <div className="grid gap-6 sm:grid-cols-4 lg:grid-cols-2">
        <div className="border rounded-xl p-5">
          <DataTable />
        </div>
        <LatestCheckInOut />
      </div>
    </main>
  );
}
