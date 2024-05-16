"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/contexts/AuthContext/authContext";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

export function NavHeader() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className={`bg-[#ad680e] shadow-md shadow-black/20`}>
      <div className="mx-auto px-2 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center">
            <div className="flex flex-shrink-0 items-center">
              <Link href={"#"}>
                <Image
                  className="h-8 w-auto"
                  src="/img/tmsa_logo_2.png"
                  width={150}
                  height={150}
                  quality={100}
                  priority={true}
                  alt="TMSA logo"
                />
              </Link>
            </div>
          </div>

          {/* username Btn */}
          <div className="absolute inset-y-0 right-0 flex ">
            <div className="relative">
              <div className="item-center">
                <DropdownMenu>
                  <DropdownMenuTrigger className="absolute w-8 h-8 right-3 top-[25%] text-white border border-white rounded-full  hover:bg-[#27272A] ease-out duration-200">
                    {user?.username?.charAt(0).toUpperCase()}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-black">
                    <DropdownMenuLabel className="text-white opacity-60">
                      {user?.email}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      {/* TODO: Logout usando server action */}
                      <Button
                        className="min-w-full"
                        variant={"secondary"}
                        onClick={logout}
                      >
                        Sign out
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
