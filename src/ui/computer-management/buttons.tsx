import { Button } from "@/components/ui/button";
import { deleteRecord } from "@/lib/actions";
import { Records } from "@/lib/types/Records";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { toast } from "react-toastify";

export function EditBtn({ id }: { id: string }) {
  return (
    <Link
      href={`/computer-management/edit-record/?id=${id}`}
      className="border rounded-full bg-transparent flex justify-center items-center w-5 h-5 p-3 opacity-80 hover:opacity-100 duration-200"
    >
      <FontAwesomeIcon icon={faPencil} />
      <span className="sr-only">Editar</span>
    </Link>
  );
}

type DeleteRecordType = {
  rowData: Pick<Records, "id" | "hostname">;
  closeDeleteDialog: () => void;
};

export function DeleteRecord({ rowData, closeDeleteDialog }: DeleteRecordType) {
  //   const deleteRecordWithId = deleteRecord.bind(null, id);

  const deleteRecordWithId = async () => {
    try {
      if (await deleteRecord(rowData.id)) {
        toast.success(`Excluído computador: ${rowData.hostname}`);
        closeDeleteDialog();
      } else {
        toast.error(`Erro ao excluir computador: ${rowData.hostname}`);
        closeDeleteDialog();
      }
    } catch (error) {
      console.error(error);
      toast.error(`Erro Deleted Computer`);
    }
  };

  return (
    <form action={deleteRecordWithId} className="">
      <Button className="border border-destructive/50 bg-transparent text-accent-foreground flex justify-center items-center opacity-80 hover:opacity-100 hover:bg-destructive duration-200">
        <span className="">Excluir</span>
      </Button>
    </form>
  );
}
