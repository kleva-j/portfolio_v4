"use client";

import { ScrollProgress } from "@/components/animate-ui/components/scroll-progress";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const PATHS = ["post", "snippets"];

export const ShowScrollProgress = () => {
  const [, currentPath, slug] = usePathname().split("/");

  const includePath = useMemo(() => PATHS.includes(currentPath), [currentPath]);

  if (!includePath || !slug) return null;

  return <ScrollProgress />;
};
