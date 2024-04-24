"use server";

import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { UserInfo } from "./authDataProvider";

export async function decodeToken() {
  const token: any = cookies().get("tracker_and_manage")?.value;

  const decodedToken = jwt.decode(token, { complete: true }) as {
    payload: JwtPayload;
  } | null;

  const userFromCookie: UserInfo = {
    username: decodedToken?.payload?.username,
    email: decodedToken?.payload?.email,
  };

  return userFromCookie;
}
