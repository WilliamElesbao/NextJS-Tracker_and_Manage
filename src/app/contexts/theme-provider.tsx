"use client";

import { createContext } from "react";

type ThemeType = "dark" | "light";

export const ThemeContext = createContext<ThemeType | undefined>(undefined);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>;
}
