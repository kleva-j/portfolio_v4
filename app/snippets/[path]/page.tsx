import { getPostSlugs, validateMetadata } from "@/lib/post";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";

import nodePath from "node:path";

export interface SnippetPageProps {
  params: Promise<{ path: string }>;
}

const directory = nodePath.join(process.cwd(), "content", "snippets");

const requiredMetadata: string[] = [
  "title",
  "snippetCount",
  "subtitle",
  "image",
];

export default async function SnippetPage({ params }: SnippetPageProps) {
  const slugs = await getPostSlugs(directory);

  const { path } = await params;

  if (!slugs.includes(path)) return notFound();

  try {
    const { default: Snippet, metadata } = await import(
      `@/content/snippets/${path}.mdx`
    );

    if (!validateMetadata(metadata, requiredMetadata, path)) {
      throw new Error("Invalid metadata");
    }

    return (
      <div className="flex flex-col gap-2 mt-16 max-w-xl mx-auto">
        <h1 className="font-bold text-3xl tracking-tighter text-center">
          {metadata.title}
        </h1>
        <p className="text-center text-sm my-2 text-muted-foreground">
          {metadata.subtitle}
        </p>
        <Badge className="mx-auto rounded-full">{metadata.snippetCount} Snippets</Badge>
        <Snippet />
      </div>
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs(directory);
  return slugs.map((slug) => ({ params: { slug } }));
}

export const dynamicParams = false;
