import type { PropsWithChildren } from "react";

import { Button } from "@/components/ui/button";

import Link from "next/link";

export interface LinkAsButtonProps extends PropsWithChildren {
  href: string;
}

export function LinkAsButton({ href, children }: LinkAsButtonProps) {
  return (
    <Button asChild>
      <Link href={href}>{children}</Link>
    </Button>
  );
}
