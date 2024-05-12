import { Button } from "@/app/components/ui/button";
import { deleteRecord } from "@/app/lib/actions";
import { Records } from "@/app/lib/types/RecordsTypes";
import { faPencil, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { toast } from "react-toastify";

export function EditRecord({ id }: { id: string }) {
  return (
    <Link
      href={`/computer-management/edit-record/?id=${id}`}
      className="border border-zinc-600 bg-transparent rounded-md w-full h-8 p-4 flex justify-evenly items-center text-zinc-600 hover:opacity-75 hover:bg-transparent duration-200"
    >
      <FontAwesomeIcon icon={faPencil} />
      <span>Editar</span>
    </Link>
  );
}

export function DeleteRecord({
  rowData,
}: {
  rowData: Pick<Records, "id" | "hostname">;
}) {
  //   const deleteRecordWithId = deleteRecord.bind(null, id);

  const deleteRecordWithId = async () => {
    try {
      if (await deleteRecord(rowData.id)) {
        toast.success(`Excluído computador: ${rowData.hostname}`);
      } else {
        toast.error(`Erro ao excluir computador: ${rowData.hostname}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(`Erro Deleted Computer`);
    }
  };

  return (
    <form action={deleteRecordWithId} className="w-full">
      <Button className="border border-red-400 bg-transparent rounded-md w-full h-8 p-4 flex justify-evenly items-center gap-2 text-red-400 hover:opacity-75 hover:bg-transparent duration-200">
        <FontAwesomeIcon icon={faTrashAlt} />
        <span className="">Excluir</span>
      </Button>
    </form>
  );
}
