import type { PropsWithChildren } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type SnippetWrapperProps = PropsWithChildren & {
  title: string;
  description: string;
  tags: string[];
  className?: string;
};

export const SnippetWrapper = (props: SnippetWrapperProps) => {
  return (
    <Card className={cn("flex flex-col gap-2 my-4 px-4 rounded-sm shadow-none", props.className)}>
      <h1 className="text-2xl font-bold">{props.title}</h1>
      <p className="text-muted-foreground text-sm">{props.description}</p>
      <div className="flex gap-2 items-center text-sm">
        <span className="text-muted-foreground text-sm font-medium">Tags:</span>
        {props.tags.map((tag) => (
          <Badge className="rounded-sm" variant="secondary" key={tag}>
            {tag}
          </Badge>
        ))}
      </div>
      {props.children}
    </Card>
  );
};
