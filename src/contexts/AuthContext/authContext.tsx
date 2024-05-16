"use client";

import { authSignIn } from "@/contexts/AuthContext/actions/sign-in";
import { UserInfo } from "@/lib/types/tech-details";
import { createContext, useEffect, useState } from "react";
import { LoginData } from "@/lib/types/LoginData";
import { decodeToken } from "@/utils/decodeToken";
import {
  createSessionCookie,
  deleteCookie,
  hasCookie,
} from "./actions/cookie-actions";

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
      const authToken: any = await authSignIn(signInData);
      if (authToken) {
        createSessionCookie(authToken);
        return true;
      } else {
        return { error: "Credenciais inválidas!" };
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
