import { NavHeader } from "@/app/components/header/navHeader";
import { AuthProvider } from "@/app/contexts/AuthContext/authContext";
import { Suspense } from "react";
import { ComputerRecordsTable } from "./components/ui/computerRecordsTable";

export default function ComputerManagementPage() {
  return (
    <>
      <AuthProvider>
        <NavHeader />
        <div className="flex justify-center items-center">
          <div className="container mx-auto py-10">
            <Suspense
              fallback={
                <div className="container flex justify-center items-center ">
                  Loading...
                </div>
              }
            >
              <ComputerRecordsTable />
            </Suspense>
          </div>
        </div>
      </AuthProvider>
    </>
  );
}
