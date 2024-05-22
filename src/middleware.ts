import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const cookie = cookies().get("tracker_and_manage");

  if (cookie) {
    if (request.nextUrl.pathname === "/auth") {
      return NextResponse.redirect(
        new URL("/computer-management", request.url),
      );
    }
  }

  if (!cookie) {
    if (request.nextUrl.pathname !== "/auth") {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }
}

export const config = {
  matcher: [
    // "/",
    "/computer-management/",
    "/computer-management/dashboard",
    "/computer-management/edit-record/:id",
    "/auth",
  ],
};
