"use client";

import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import action from "../../actions/actions";
import { Records } from "../../types/RecordsTypes";

export const columns: ColumnDef<Records>[] = [
  {
    accessorKey: "ticketNumber",
    header: "Número SATI",
  },
  {
    accessorKey: "hostname",
    header: "Hostname",
  },
  {
    accessorKey: "user.email",
    header: "Entregue pelo User",
  },
  {
    accessorKey: "technician.username",
    header: "Entregue ao técnico",
  },
  {
    accessorKey: "computerType",
    header: "Modelo máquina",
  },
  {
    accessorKey: "location",
    header: "Localização",
  },
  {
    accessorKey: "checkInDate",
    header: "Data entrada",
  },
  {
    accessorKey: "checkoutStatus",
    header: "Status de saída",
  },
  {
    accessorKey: "createdAt",
    header: "Aberto em",
  },
  {
    accessorKey: "updatedAt",
    header: "Atualiz. em",
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const rowData: Records = row.original;
      const router = useRouter();
      const checkoutStatus = row.getValue("checkoutStatus");

      function redirectToEditPage(rowData: Records) {
        router.push(`/computer-management/edit-record/?id=${rowData.id}`);
      }

      async function actionToDeleteRecord(rowData: Records) {
        try {
          const url = `/api/computermanagement/?id=${rowData.id}`;
          const response = await fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            toast.success(`Deleted Computer: ${rowData.hostname}`);
          } else {
            console.error("Falha ao excluir registro.");
            toast.error("Error deleting record!");
          }
          action();
        } catch (error) {
          toast.error("Puts se cai aqui deu ruim!");
          console.error("Erro ao realizar o Try:", error);
        }
      }

      // return (
      //   <>
      //     <DropdownMenu>
      //       <DropdownMenuTrigger asChild>
      //         <Button variant="ghost" className="h-8 w-8 p-0">
      //           <span className="sr-only">Open menu</span>
      //           <MoreHorizontal className="h-4 w-4" />
      //         </Button>
      //       </DropdownMenuTrigger>
      //       <DropdownMenuContent
      //         align="end"
      //         className="bg-black flex flex-col gap-1"
      //       >
      //         <DropdownMenuLabel className="text-white">
      //           Actions
      //         </DropdownMenuLabel>
      //         <DropdownMenuItem>
      //           <Button
      //             variant={"secondary"}
      //             className="w-full"
      //             // TODO: View page
      //             disabled
      //           >
      //             Visualizar
      //           </Button>
      //         </DropdownMenuItem>
      //         <DropdownMenuItem>
      //           <Button
      //             variant={"secondary"}
      //             className="w-full"
      //             onClick={() => {
      //               redirectToEditPage(rowData);
      //             }}
      //           >
      //             Editar
      //           </Button>
      //         </DropdownMenuItem>
      //         <DropdownMenuItem>
      //           <Button
      //             variant={"destructive"}
      //             className="w-full hover:opacity-60"
      //             onClick={() => {
      //               actionToDeleteRecord(rowData);
      //             }}
      //           >
      //             Excluir
      //           </Button>
      //         </DropdownMenuItem>
      //       </DropdownMenuContent>
      //     </DropdownMenu>
      //   </>
      // );

      if (checkoutStatus) {
        // Se checkoutStatus for true, renderize ações específicas para checkoutStatus true
        return (
          <div className="flex gap-2">
            <Button
              className=""
              // onClick={() => handleSpecificAction1(rowData.id)}
            >
              Detalhes
            </Button>
            <Button
              // onClick={() => handleSpecificAction2(rowData.id)}
              disabled
            >
              Enviar e-mail
            </Button>
          </div>
        );
      } else {
        // Se checkoutStatus for falso, renderize botões padrão
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-black flex flex-col gap-1"
            >
              <DropdownMenuLabel className="text-white">
                Actions
              </DropdownMenuLabel>
              {/* <DropdownMenuItem>
                <Button variant={"secondary"} className="w-full" disabled>
                  Visualizar
                </Button>
              </DropdownMenuItem> */}
              <DropdownMenuItem>
                <Button
                  variant={"secondary"}
                  className="w-full"
                  onClick={() => redirectToEditPage(rowData)}
                >
                  Editar
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  variant={"destructive"}
                  className="w-full hover:opacity-60"
                  onClick={() => actionToDeleteRecord(rowData)}
                >
                  Excluir
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    },
  },
];
