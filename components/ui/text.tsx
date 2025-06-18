import type { HTMLAttributes } from "react";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("font-semibold tracking-tight font-heading", {
  variants: {
    variant: {
      h1: "text-4xl font-extrabold lg:text-5xl",
      h2: "text-3xl first:mt-0",
      h3: "text-2xl",
      h4: "text-xl",
      p: "scroll-m-0 font-normal leading-7 [&:not(:first-child)]:mt-4 font-sans",
      blockquote: "mt-6 border-l-2 pl-6 italic font-sans",
    },
  },
  defaultVariants: {
    variant: "p",
  },
});

interface TypographyProps
  extends HTMLAttributes<
      | HTMLParagraphElement
      | HTMLHeadingElement
      | HTMLQuoteElement
      | HTMLDivElement
    >,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
}

export function Text(props: TypographyProps) {
  const { className, as: Comp = "div", variant, ...rest } = props;
  return (
    <Comp
      className={cn(typographyVariants({ variant }), className)}
      {...rest}
    />
  );
}
