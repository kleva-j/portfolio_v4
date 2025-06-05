import type { PropsWithChildren } from "react";
import type { Metadata } from "next";

import { siteConfig } from "@/lib/site/config";
import { graphik } from "@/lib/fonts";

import Navbar from "@/components/navbar";
import clsx from "clsx";

import "@/app/global.css";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      className={clsx(
        "text-black bg-white dark:text-white dark:bg-[#111010] font-[var(--font-graphik)]",
        graphik.variable
      )}
    >
      <body className="antialiased max-w-2xl mb-40 flex flex-col md:flex-row mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
        </main>
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
