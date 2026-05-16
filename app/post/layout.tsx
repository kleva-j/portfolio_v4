import type { PropsWithChildren } from "react";

export default function PostLayout({ children }: PropsWithChildren) {
  return <div className="mt-10">{children}</div>;
}
