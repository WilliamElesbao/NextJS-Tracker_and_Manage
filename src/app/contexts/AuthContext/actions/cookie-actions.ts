"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createSessionCookie(token: string) {
  cookies().set("tracker_and_manage", token, { path: "/", maxAge: 60 * 60 });
  redirect("/computer-management");
}

export async function hasCookie() {
  const hasCookie = cookies().get("tracker_and_manage");
  return hasCookie;
}

export async function deleteCookie(cookieName: string) {
  cookies().delete(cookieName);
  redirect("/auth");
}
