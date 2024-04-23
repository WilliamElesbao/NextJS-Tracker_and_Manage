"use server";

import { ResponseTokenWithData } from "../types/responseTokenWithData";
import { SignInData } from "../types/signInData";

export async function signin(loginData: SignInData) {
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
