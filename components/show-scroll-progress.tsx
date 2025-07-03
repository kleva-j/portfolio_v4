"use client";

import { ScrollProgress } from "@/components/animate-ui/components/scroll-progress";
import { usePathname } from "next/navigation";

const ALLOWED_PATHS = ["post", "snippets"];

export const ShowScrollProgress = () => {
  const [, currentPath, slug] = usePathname().split("/");

  const includePath = ALLOWED_PATHS.includes(currentPath);

  if (!includePath || !slug) return null;

  return <ScrollProgress />;
};
