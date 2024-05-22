import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Tracker & Manage",
    default: "Tracker & Manage",
  },
  description: "Entry and Exit Control and Traceability System",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <html lang="en">
        <head>
          <link rel="icon" href="/img/logo.ico" sizes="any" />
        </head>
        <body
          className={cn(
            "min-h-screen font-sans antialiased",
            fontSans.variable,
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
