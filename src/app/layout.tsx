import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { MotionConfig } from "framer-motion";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { cookies } from "next/headers";

import { Header } from "@/components/main/utils/header";
import { ThemeProvider } from "@/components/theme-provider";
import { getPersonSchema, getWebSiteSchema } from "@/lib/schema";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BackToTop } from "@/components/ui/back-to-top";
import { ConsoleArt } from "@/components/ui/console-art";
import { Footer } from "@/components/main/utils/footer";

import "../styles/reduced-motion.css";
import "../styles/globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://enzopavani.dev'),
  title: {
    default: 'Enzo Sylvestrin | Full Stack Software Engineer',
    template: '%s | Enzo Sylvestrin'
  },
  description: 'Full-stack & Mobile Software Engineer specialized in TypeScript, React, and Nest.js. Passionate about building high-quality, scalable web applications.',
  keywords: [
    'Full Stack Developer',
    'Software Engineer',
    'React Developer',
    'TypeScript',
    'Next.js',
    'Nest.js',
    'Node.js',
    'Web Development',
    'Portfolio',
    'Enzo Sylvestrin',
  ],
  authors: [{ name: 'Enzo Sylvestrin', url: 'https://enzopavani.dev' }],
  creator: 'Enzo Sylvestrin',
  publisher: 'Enzo Sylvestrin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    alternateLocale: ['en_US'],
    url: 'https://enzopavani.dev',
    siteName: 'Enzo Sylvestrin - Portfolio',
    title: 'Enzo Sylvestrin | Full Stack Software Engineer',
    description: 'Full-stack & Mobile Software Engineer specialized in TypeScript, React, and Nest.js. Building high-quality web applications.',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Enzo Sylvestrin - Full Stack Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enzo Sylvestrin | Full Stack Software Engineer',
    description: 'Full-stack & Mobile Software Engineer specialized in TypeScript, React, and Nest.js.',
    images: ['/opengraph-image.png'],
    creator: '@enzosylvestrin',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getPersonSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebSiteSchema()),
          }}
        />
      </head>
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
            <MotionConfig reducedMotion="user">
              <ConsoleArt />
              <ScrollProgress />
              <Header />
              {children}
              <Footer />
              <BackToTop />
            </MotionConfig>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
