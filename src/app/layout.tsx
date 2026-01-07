import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { cookies } from "next/headers";

import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Enzo Sylvestrin | Software Engineer",
  description: "Engenheiro de Software FullStack.\nEspecializado em Typescript, React e Nest.js.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeHue = cookieStore.get("theme-hue")?.value;
  const hue = themeHue ? parseInt(themeHue, 10) : 290; // Default purple

  return (
    <html lang="pt-BR" suppressHydrationWarning style={{
      '--theme-hue': hue,
    } as React.CSSProperties}>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
