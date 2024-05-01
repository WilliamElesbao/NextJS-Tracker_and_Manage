"use client";

import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";
import { useContext } from "react";
import { AuthContext } from "../../contexts/authDataProvider";
import { Sidebar } from "../sidebar/sidebar";

export function NavHeader() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  // TODO: separar em action ou separar
  // login e logout em funcoes vindas do provider de auth...

  async function logout() {
    destroyCookie(null, "tracker_and_manage");
    router.push("/auth");
  }

  return (
    <>
      <nav className="bg-[#000000c9] shadow-md shadow-black/20">
        <div className="mx-auto  px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <Sidebar />
            <div className="flex flex-1 items-center justify-center">
              <div className="flex flex-shrink-0 items-center">
                <Link href={"#"}>
                  <Image
                    className="h-8 w-auto"
                    src="/img/tmsa_logo_2.png"
                    width={150}
                    height={150}
                    quality={100}
                    alt="WillTube Tech"
                  />
                </Link>
              </div>
            </div>

            {/* username Btn */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="relative ml-3">
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-white border border-white rounded-md p-1 px-3 mr-5 hover:bg-[#27272A] ease-out duration-200">
                      {user?.username}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-black">
                      <DropdownMenuLabel className="text-white opacity-60">
                        {user?.email}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Button
                          className="min-w-full"
                          variant={"secondary"}
                          onClick={() => logout()}
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
    </>
  );
}
