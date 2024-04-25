"use client";

import { UserInfo } from "@/app/components/interface/UserInfo";
import { ReactNode, createContext, useEffect, useState } from "react";
import { decodeToken } from "./decodeToken";

type AuthContextType = {
  user: UserInfo | null;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
  user: null, // Define um valor inicial para o contexto
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    decodeToken().then((response) => {
      setUser(response);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
