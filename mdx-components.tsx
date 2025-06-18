import type { ComponentPropsWithoutRef, ReactNode, ReactElement } from "react";
import type { ImageProps } from "next/image";

import { AnimatedUnderline } from "@/components/ui/animated-underline";
import { cn, extractValidChildren, generateKey } from "@/lib/utils";
import { Callout, ProsCard, ConsCard } from "@/components/snippet";
import { Separator } from "@/components/ui/separator";
import { highlight } from "sugar-high";

import {
  TableHeader,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
} from "@/components/ui/table";

import Image from "next/image";
import Link from "next/link";

type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;
type StrongProps = ComponentPropsWithoutRef<"strong">;
type SeparatorProps = ComponentPropsWithoutRef<"hr">;
type SmallProps = ComponentPropsWithoutRef<"small">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type HeadingProps = ComponentPropsWithoutRef<"h1">;
type CodeProps = ComponentPropsWithoutRef<"code">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type EmProps = ComponentPropsWithoutRef<"em">;

type TableHeaderProps = ComponentPropsWithoutRef<typeof TableHeader>;
type TableBodyProps = ComponentPropsWithoutRef<typeof TableBody>;

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
        <AnimatedUnderline
          className={cn(
            className,
            "after:bg-blue-500 dark:after:bg-blue-400 -after:bottom-4"
          )}
          href={href}
          as={Link}
          {...props}
        >
          {children}
        </AnimatedUnderline>
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
  table: ({ children }: { children: ReactNode }) => {
    if (!children) return null;

    // Extract table parts
    const tableParts = extractValidChildren(children) as ReactElement[];
    const [THead, TBody] = tableParts;
    if (!THead || !TBody) return null;

    // Type assertions for table parts
    const typedTHead = THead as ReactElement<TableHeaderProps>;
    const typedTBody = TBody as ReactElement<TableBodyProps>;

    // Extract header content
    const headerContent = extractValidChildren(typedTHead.props.children) as ReactElement[];
    const bodyContent = extractValidChildren(typedTBody.props.children) as ReactElement[];

    const [TH] = headerContent;
    if (!TH || !bodyContent) return null;

    // Extract cell content
    const TCell = bodyContent.map((row: ReactElement) => {
      const rowProps = row.props as { children?: ReactNode };
      return extractValidChildren(rowProps.children) as ReactElement[];
    });
    if (!TCell) return null;

    const thChildren = extractValidChildren(
      (TH.props as { children?: ReactNode }).children
    ) as ReactElement[];

    return (
      <Table className="table-auto mx-auto max-w-full w-full border border-blue-100 dark:border-blue-50/30 rounded-sm">
        <TableHeader>
          <TableRow className="*:border-blue-100 dark:*:border-blue-100/30 hover:bg-blue-50 dark:bg-blue-300/45 [&>:not(:last-child)]:border-r px-2 bg-blue-50">
            {thChildren.map((th: ReactElement, index: number) => {
              const thProps = th.props as { children?: ReactNode };
              return (
                <TableHead key={generateKey(thProps.children, index)}>
                  {thProps.children}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody className="[&_td:first-child]:rounded-l-lg [&_td:last-child]:rounded-r-lg">
          {TCell.map((row: ReactElement[], rowIndex: number) => {
            const firstCell = row[0] as ReactElement;
            const firstCellProps = firstCell?.props as { children?: ReactNode };

            return (
              <TableRow
                key={generateKey(firstCellProps?.children, rowIndex)}
                className="*:border-blue-50 dark:*:border-blue-50/30 hover:bg-transparent [&>:not(:last-child)]:border-r px-2"
              >
                {row.map((cell: ReactElement, cellIndex: number) => {
                  const cellProps = cell.props as { children?: ReactNode };
                  return (
                    <TableCell key={generateKey(cellProps.children, cellIndex)}>
                      {cellProps.children}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
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
  Image: ({ className, ...props }: ImageProps) => (
    <Image
      {...props}
      className={cn(
        "rounded-sm border border-blue-100 dark:border-blue-50/30 p-1",
        className
      )}
    />
  ),
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
