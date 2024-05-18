"use client";

import { EditFormProvider } from "@/contexts/EditFormContext.tsx/editFormContext";
import EditForm from "@/ui/computer-management/edit-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="container mt-14 flex flex-col gap-12">
      <div className="relative flex justify-center items-center">
        <Link
          href={"/computer-management"}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 border rounded-full w-32 h-10 flex items-center justify-center text-sm hover:bg-primary hover:text-accent duration-200 mb-5"
        >
          <ArrowLeft className="mr-2 size-4" />
          Voltar
        </Link>
        <h2 className="text-xl">Editar Registro</h2>
      </div>

      <EditFormProvider>
        <div className="p-[0.04rem] rounded-lg bg-gradient-to-b from-foreground from-10% via-foreground via-30% to-background to-80%">
          <div className="rounded-lg m-[0.04rem] bg-background p-8">
            <EditForm />
          </div>
        </div>
      </EditFormProvider>
    </div>
  );
}
