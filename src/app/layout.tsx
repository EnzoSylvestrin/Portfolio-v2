import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { cookies } from "next/headers";

import { Header } from "@/components/main/utils/header";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";
import { Footer } from "@/components/main/utils/footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
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
  const locale = await getLocale();
  const messages = await getMessages();
  
  const cookieStore = await cookies();
  const themeHue = cookieStore.get("theme-hue")?.value;
  const hue = themeHue ? parseInt(themeHue, 10) : 290; // Default purple

  return (
    <html lang={locale} suppressHydrationWarning style={{
      '--theme-hue': hue,
    } as React.CSSProperties}>
      <head />
      <body
        className={`${spaceGrotesk.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
