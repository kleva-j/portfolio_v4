import type { PropsWithChildren } from "react";

import { Button } from "@/components/ui/button";

import Link from "next/link";

export interface LinkAsButtonProps extends PropsWithChildren {
  href: string;
  className?: string;
}

export function LinkAsButton({ href, children, className }: LinkAsButtonProps) {
  return (
    <Button asChild className={className}>
      <Link href={href}>{children}</Link>
    </Button>
  );
}
