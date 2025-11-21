import type { Metadata } from "next";
import "../lib/fontawesome"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout";
import { ThemeProvider } from "next-themes";
import { Advent_Pro } from "next/font/google";
import { Space_Grotesk , JetBrains_Mono } from "next/font/google";
import { Toaster } from 'react-hot-toast'; // ← AJOUTÉ

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
    <html lang="fr" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          
          {/* ✅ TOASTER POUR LES NOTIFICATIONS */}
          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              // Style par défaut
              duration: 4000,
              style: {
                background: '#000',
                color: '#fff',
                border: '2px solid #fff',
                borderRadius: '1rem',
                padding: '16px 20px',
                fontSize: '15px',
                fontWeight: '600',
                fontFamily: 'var(--font-space-grotesk)',
              },
              // Style pour les succès
              success: {
                duration: 5000,
                iconTheme: {
                  primary: '#22c55e', // Vert
                  secondary: '#fff',
                },
              },
              // Style pour les erreurs
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444', // Rouge
                  secondary: '#fff',
                },
              },
              // Style pour les loading
              loading: {
                iconTheme: {
                  primary: '#3b82f6', // Bleu
                  secondary: '#fff',
                },
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}