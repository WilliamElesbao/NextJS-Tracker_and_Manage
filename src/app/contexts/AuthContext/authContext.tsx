"use client";

import { createContext, useEffect, useState } from "react";
import { ResponseTokenWithData } from "../../(pages)/auth/components/types/responseTokenWithData";
import { LoginData } from "../../api/auth/types/LoginData";
import { UserInfo, decodeToken } from "../../utils/decodeToken";
import {
  createSessionCookie,
  deleteCookie,
  hasCookie,
} from "./actions/actions";

type AuthContextType = {
  user: UserInfo | null;
  signIn: (signInData: LoginData) => Promise<true | { error: string }>;
  logout: () => void;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);

  const signIn = async (signInData: LoginData) => {
    try {
      const response: Response = await fetch("http://localhost:3000/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInData),
      });

      if (response.ok) {
        const responseData: ResponseTokenWithData = await response.json();
        const { tokenJWTWithSessionData } = responseData;
        createSessionCookie(tokenJWTWithSessionData);
        return true;
      } else {
        return { error: "Invalid Credentials!" };
      }
    } catch (error) {
      console.error("Erro durante a autenticação:", error);
      return { error: "Erro durante a autenticação" };
    }
  };

  const logout = async () => {
    try {
      const cookieName = await hasCookie();
      cookieName
        ? await deleteCookie(cookieName.name)
        : console.log("No cookies...");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    decodeToken().then((response) => {
      setUser(response);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
