import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const cookie = cookies().get("tracker_and_manage");

  if (request.nextUrl.pathname === "/auth") {
    // !cookie, redireciona → "/auth"
    if (!cookie) {
      return NextResponse.next();
    }
    // cookie, redireciona → "/"
    return NextResponse.redirect(new URL("/", request.url));
  }

  // cookie, segue normalmente
  if (cookie) {
    return NextResponse.next();
  }

  // !cookie e não é "/auth" → "/auth"
  return NextResponse.redirect(new URL("/auth", request.url));
}

export const config = {
  matcher: [
    "/",
    // "/api/computermanagement",
    "/auth",
  ],
};
