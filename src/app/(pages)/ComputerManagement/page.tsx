import { Records } from "@/app/(pages)/ComputerManagement/components/interface/RecordsTypes";
import { columns } from "@/app/(pages)/ComputerManagement/components/ui/columns";
import { DataTable } from "@/app/(pages)/ComputerManagement/components/ui/data-table";
import { AuthProvider } from "@/app/shared/contexts/authDataProvider";
import { NavHeader } from "@/app/shared/header/navHeader";

export default async function ComputerManagementPage() {
  const response = await fetch(
    "http://localhost:3000/api/computermanagement/",
    {
      next: {
        tags: ["get-records"],
      },
    },
  );

  const records: Records[] = await response.json();

  return (
    <>
      <AuthProvider>
        <NavHeader />
        <div className="flex justify-center items-center">
          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={records} />
          </div>
        </div>
      </AuthProvider>
    </>
  );
}

// TODO:
// C - done
// R - done
// U - done
// D - done
// validacao do form ADD e EDIT pelo lado do frontend
