import type { PropsWithChildren } from "react";

import { unstable_ViewTransition as ViewTransition } from "react";

export default function PostLayout({ children }: PropsWithChildren) {
  return <ViewTransition>{children}</ViewTransition>;
}
