import type { PropsWithChildren } from "react";

export default function PostLayout({ children }: PropsWithChildren) {
  return <div className="mt-14">{children}</div>;
}
