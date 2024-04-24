"use client";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DividerHorizontalIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";

export function Sidebar() {
  return (
    <Sheet>
      <SheetTrigger className="text-white inset-y-0 left-0 flex">
        <FontAwesomeIcon icon={faBars} />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="flex flex-col bg-black text-white border-0"
      >
        <SheetHeader className="">
          <SheetTitle className="flex justify-center text-white">
            Tracker & Manage
          </SheetTitle>
          <DividerHorizontalIcon className="flex flex-col w-full"></DividerHorizontalIcon>
        </SheetHeader>
        <Link
          href={"/"}
          className="p-2 hover:bg-[#27272A] rounded-md ease-out duration-300"
        >
          Controle de máquinas
        </Link>
        {/* <Link
          href={"#"}
          className="p-2 hover:bg-[#27272A] rounded-md ease-out duration-300"
        >
          Empréstimo de itens
        </Link>
        <Link
          href={"#"}
          className="p-2 hover:bg-[#27272A] rounded-md ease-out duration-300"
        >
          Rastreamento de aquisições
        </Link> */}
      </SheetContent>
    </Sheet>
  );
}
