"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { decodeToken } from "./decodeToken";

export type UserInfo = {
  username: string;
  email: string;
};

type AuthContextType = {
  user: any;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

//TODO: Arrumar a busca dos dados da sessao do usuário logado,
//  talvez usar middleware...

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
