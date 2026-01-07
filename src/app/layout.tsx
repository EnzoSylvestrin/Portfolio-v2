import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";

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
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var savedHue = localStorage.getItem('theme-hue');
                  if (savedHue) {
                    var hue = parseInt(savedHue, 10);
                    var root = document.documentElement;
                    
                    // Apply colors immediately
                    root.style.setProperty('--primary', 'oklch(0.55 0.22 ' + hue + ')');
                    root.style.setProperty('--primary-light', 'oklch(0.75 0.15 ' + hue + ')');
                    root.style.setProperty('--primary-dark', 'oklch(0.40 0.25 ' + hue + ')');
                    root.style.setProperty('--accent', 'oklch(0.96 0.02 ' + hue + ')');
                    root.style.setProperty('--ring', 'oklch(0.55 0.22 ' + hue + ')');
                    
                    // Check if dark mode will be applied
                    var isDark = root.classList.contains('dark') || 
                      (localStorage.getItem('theme') === 'dark') ||
                      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
                    
                    if (isDark) {
                      root.style.setProperty('--primary', 'oklch(0.70 0.20 ' + hue + ')');
                      root.style.setProperty('--primary-light', 'oklch(0.80 0.15 ' + hue + ')');
                      root.style.setProperty('--primary-dark', 'oklch(0.50 0.22 ' + hue + ')');
                    }
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
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
