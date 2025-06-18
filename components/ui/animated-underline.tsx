import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

interface Props extends PropsWithChildren {
  as?: React.ElementType;
  className?: string;
  href?: string;
}

export const AnimatedUnderline = ({
  as: Comp = "div",
  className,
  ...props
}: Props) => {
  return (
    <Comp
      className={cn(
        "relative after:absolute after:bg-primary after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300",
        className
      )}
      {...props}
    />
  );
};
