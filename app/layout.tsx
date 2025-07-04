import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

import { ShowScrollProgress } from "@/components/show-scroll-progress";
import { unstable_ViewTransition as ViewTransition } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { SplashScreen } from "@/components/splash-screen";
import { Particles } from "@/components/ui/particles";
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
          <ShowScrollProgress />
          <Particles quantity={500} />
          <ViewTransition name="page">
            <SplashScreen>
              <Header />
              <section className="max-w-2xl mx-auto">
                <main>{children}</main>
              </section>
            </SplashScreen>
          </ViewTransition>
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
