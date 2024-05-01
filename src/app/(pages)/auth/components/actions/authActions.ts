"use server";

import { LoginData } from "@/app/api/auth/types/LoginData";
import { ResponseTokenWithData } from "../types/responseTokenWithData";

export async function signin(loginData: LoginData) {
  try {
    const response: Response = await fetch("http://localhost:3000/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (response.ok) {
      const responseData: ResponseTokenWithData = await response.json();
      const { tokenJWTWithSessionData } = responseData;
      return { token: tokenJWTWithSessionData };
    } else {
      console.error("Invalid Credentials!");
      return { error: "Invalid Credentials!" };
    }
  } catch (error) {
    console.error("Erro durante a autenticação:", error);
    return { error: "Erro durante a autenticação" };
  }
}
