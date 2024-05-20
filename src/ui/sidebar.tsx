"use client";

import { ModeToggle } from "@/components/theme-switcher";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DividerHorizontalIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  // TODO: add icons
  // { name: "Home", href: "/" },
  { name: "Dashboard", href: "/computer-management/dashboard" },
  { name: "Device Control", href: "/computer-management" },
  // { name: "Empréstimo de itens", href: "#" },
  // { name: "Rastreamento de aquisições", href: "#" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger className="inset-y-0 left-0 flex text-lg">
        <FontAwesomeIcon icon={faBars} className="text-accent" />
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="flex flex-col bg-background border-0"
      >
        <SheetHeader className="">
          <SheetTitle className="flex justify-center">
            Tracker & Manage
          </SheetTitle>
          <DividerHorizontalIcon className="flex flex-col w-full"></DividerHorizontalIcon>
        </SheetHeader>
        <div className="flex flex-col relative h-screen">
          {links.map((link) => {
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "p-2 hover:opacity-80 rounded-md ease-out duration-300",
                  {
                    "bg-primary border text-foreground": pathname === link.href,
                  },
                )}
              >
                <span>{link.name}</span>
              </Link>
            );
          })}
          <div className="absolute bottom-0 right-0">
            <ModeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
