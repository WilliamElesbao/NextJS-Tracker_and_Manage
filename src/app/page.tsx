import { NavHeader } from "@/app/shared/header/navHeader";
import { AuthProvider } from "@/app/shared/test/authDataProvider";
import { columns } from "./components/columns-test";
import { DataTable } from "./components/data-table";
import { Records } from "./components/interface/RecordsTypes";

export default async function Home() {
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
// C
// R - done
// U
// D - done
// validacao do form ADD e EDIT pelo lado do frontend
