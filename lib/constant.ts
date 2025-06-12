import type { Snippet } from "@/types";

import typescript from "../public/images/snippets/typescript.svg";
import python from "../public/images/snippets/python.svg";
import nextjs from "../public/images/snippets/nextjs.svg";
import dart from "../public/images/snippets/dart.svg";
import css from "../public/images/snippets/css.svg";

export const snippets = [
  {
    title: "Typescript",
    subtitle: "",
    image: typescript,
    href: "/snippets/typescript",
    snippetCount: 14,
  },
  {
    image: css,
    title: "CSS",
    subtitle: "",
    href: "/snippets/css",
    snippetCount: 3,
  },
  {
    image: dart,
    title: "Flutter / Dart",
    subtitle: "",
    href: "/snippets/dart",
    snippetCount: 2,
  },
  {
    image: nextjs,
    title: "Next.js",
    subtitle: "",
    href: "/snippets/nextjs",
    snippetCount: 2,
  },
  {
    image: python,
    title: "Python",
    subtitle: "",
    href: "/snippets/python",
    snippetCount: 1,
  },
] as Snippet[];
