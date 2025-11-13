import type { Metadata } from "next";
import "../lib/fontawesome"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout";
import { ThemeProvider } from "next-themes";
import { Advent_Pro } from "next/font/google";


const adventPro = Advent_Pro({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"], // tous les poids dispo
  variable: "--font-advent-pro",
});

export const metadata: Metadata = {
  title: "CodeLLenge",
  description: "Dev challenges platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={adventPro.variable}>
        {/* ✅ ThemeProvider peut rester ici mais tu dois le configurer proprement */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
