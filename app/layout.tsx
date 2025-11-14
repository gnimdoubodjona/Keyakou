import type { Metadata } from "next";
import "../lib/fontawesome"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout";
import { ThemeProvider } from "next-themes";
import { Advent_Pro } from "next/font/google";
import { Space_Grotesk , JetBrains_Mono } from "next/font/google";


// police par titres/textes
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

// Police monospace pour le code/chiffres
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains',
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
      <body lang="fr" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
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
