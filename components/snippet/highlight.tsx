import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

interface HighlightTextProps extends PropsWithChildren {
  className?: string;
}

export const HighlightText = ({ children, className }: HighlightTextProps) => {
  return (
    <strong className={cn("font-semibold text-sky-600", className)}>
      {children}
    </strong>
  );
};
