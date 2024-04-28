"use server";

import { UserInfo } from "@/app/(pages)/ComputerManagement/components/interface/UserInfo";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function decodeToken(): Promise<UserInfo | null> {
  const token: string | undefined = cookies().get("tracker_and_manage")?.value;

  let decodedToken: { payload: JwtPayload } | null = null;

  if (token) {
    decodedToken = jwt.decode(token, { complete: true }) as {
      payload: JwtPayload;
    } | null;
  }

  if (decodedToken && decodedToken.payload) {
    const userFromCookie: UserInfo = {
      id: decodedToken.payload.id,
      username: decodedToken.payload.username,
      email: decodedToken.payload.email,
    };

    return userFromCookie;
  }

  return null;
}
