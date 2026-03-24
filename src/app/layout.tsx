import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { StoresHydrator } from "@/components/stores-hydrator";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DEV — Offres tech",
  description: "Projet pour le suivis d'offres - Next",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <AppRouterCacheProvider>
          <StoresHydrator />
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
