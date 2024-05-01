"use client";

import { ReactNode, createContext, useEffect, useState } from "react";
import { UserInfo, decodeToken } from "../utils/decodeToken";

type AuthContextType = {
  user: UserInfo | null;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
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
