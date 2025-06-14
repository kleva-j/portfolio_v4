import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { Callout, ProsCard, ConsCard } from "@/components/snippet";
import { Separator } from "@/components/ui/separator";
import { extractValidChildren } from "@/lib/utils";
import { highlight } from "sugar-high";

import {
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  Table,
  TableCell,
} from "@/components/ui/table";

import Image from "next/image";
import Link from "next/link";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;
type SeparatorProps = ComponentPropsWithoutRef<"hr">;
type EmProps = ComponentPropsWithoutRef<"em">;
type StrongProps = ComponentPropsWithoutRef<"strong">;
type CodeProps = ComponentPropsWithoutRef<"code">;
type SmallProps = ComponentPropsWithoutRef<"small">;

const components = {
  h1: (props: HeadingProps) => (
    <h1 className="font-semibold pt-12 mb-0" {...props} />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="text-gray-900 dark:text-zinc-100 font-semibold mt-8 mb-3"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className="text-gray-900 dark:text-zinc-100 font-semibold mt-8 mb-3"
      {...props}
    />
  ),
  h4: (props: HeadingProps) => <h4 className="font-medium" {...props} />,
  p: (props: ParagraphProps) => (
    <p
      className="text-gray-700 dark:text-zinc-400 leading-relaxed mt-4 mb-6"
      {...props}
    />
  ),
  ol: (props: ListProps) => (
    <ol
      className="text-gray-800 dark:text-zinc-300 list-decimal marker:text-blue-500 pl-5 space-y-2 my-6"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="text-gray-800 dark:text-zinc-300 list-none pl-5 space-y-1 my-6 [&_li]:relative [&_li]:before:content-['➾'] [&_li]:before:absolute [&_li]:before:-left-4 [&_li]:before:top-[1.5px] [&_li]:before:text-blue-500 [&_li]:pl-3"
      {...props}
    />
  ),
  li: (props: ListItemProps) => <li className="pl-1" {...props} />,
  em: (props: EmProps) => <em className="font-medium" {...props} />,
  strong: (props: StrongProps) => <strong className="font-medium" {...props} />,
  small: (props: SmallProps) => <small {...props} />,
  a: ({ href, children, ...props }: AnchorProps) => {
    const className =
      "text-blue-500 hover:text-blue-700 dark:text-sky-400 hover:dark:text-sky-300 dark:underline dark:underline-offset-2 dark:decoration-gray-800";
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith("#")) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: CodeProps) => {
    const codeHTML = highlight(children as string);
    // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  },
  table: (props: { children: ReactNode }) => {
    const [THead, TBody] = extractValidChildren(props.children);
    const [TH] = extractValidChildren(THead?.props?.children);
    const TRow = extractValidChildren(TBody?.props?.children);
    const TCell = TRow.map((tree) =>
      extractValidChildren(tree?.props?.children)
    );

    return (
      <Table className="table-auto mx-auto max-w-full w-full border border-blue-100 dark:border-blue-50/30 rounded-sm">
        <TableHeader>
          <TableRow className="*:border-blue-100 dark:*:border-blue-100/30 hover:bg-blue-50 dark:bg-blue-300/45 [&>:not(:last-child)]:border-r px-2 bg-blue-50">
            {extractValidChildren(TH?.props?.children).map((th) => (
              <TableHead key={th.key}>{th?.props?.children}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
          {TCell.map((row, rowIndex) => (
            <TableRow
              key={`${rowIndex + 1}-${"row"}`}
              className="*:border-blue-50 dark:*:border-blue-50/30 hover:bg-transparent [&>:not(:last-child)]:border-r px-2"
            >
              {row.map((cell) => (
                <TableCell key={`${rowIndex + 1}-${cell.key}-${"cell"}`}>
                  {cell?.props?.children}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="ml-[0.075em] border-l-3 border-blue-300 pl-4 text-gray-700 dark:border-blue-600 dark:text-zinc-300"
      {...props}
    />
  ),
  hr: (props: SeparatorProps) => <Separator {...props} />,
  Callout,
  ProsCard,
  ConsCard,
  Image,
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(
  otherComponents?: MDXProvidedComponents
): MDXProvidedComponents {
  return {
    ...components,
    ...otherComponents,
  };
}
