import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/site/config";
import { Header } from "@/layout/header";
import { graphik } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import "@/app/global.css";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("bg-background antialiased", graphik.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <section className="max-w-2xl mb-40 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto">
            <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
              <Header />
              <div className="mt-30">{children}</div>
            </main>
          </section>
        </ThemeProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.name,
    template: "%s | Michael Obasi",
  },

  description: siteConfig.description,

  openGraph: {
    ...siteConfig.openGraph,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  twitter: {
    ...siteConfig.twitter,
  },
};
