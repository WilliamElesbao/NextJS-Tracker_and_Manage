"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DividerHorizontalIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  // TODO: add icons
  { name: "Device Control", href: "/computer-management" },
  // { name: "Empréstimo de itens", href: "#" },
  // { name: "Rastreamento de aquisições", href: "#" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger className="text-white inset-y-0 left-0 flex text-lg">
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
        <>
          {links.map((link) => {
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "p-2 hover:bg-[#27272A] rounded-md ease-out duration-300",
                  {
                    "bg-[#27272A]": pathname === link.href,
                  },
                )}
              >
                <span>{link.name}</span>
              </Link>
            );
          })}
        </>
      </SheetContent>
    </Sheet>
  );
}
