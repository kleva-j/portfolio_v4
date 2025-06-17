"use client";

import type { PropsWithChildren } from "react";

import { AppleHelloEnglishEffect } from "@/components/apple-hello-effect";
import { AnimatePresence, motion } from "motion/react";
import { Fragment, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function SplashScreen({ children }: PropsWithChildren) {
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(pathname === "/");

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => setIsLoading(false), 4200);
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.section
          key="splash-screen"
          className="grid place-items-center min-h-[calc(100vh-_theme(spacing.32))] fade-in-up"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <AppleHelloEnglishEffect className="flex items-center justify-center" />
        </motion.section>
      ) : (
        <Fragment key="content">
          {children}
        </Fragment>
      )}
    </AnimatePresence>
  );
}
