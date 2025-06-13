import type { Snippet, SnippetMetadata } from "@/types";
import type { Metadata } from "next";

import { getPostSlugs, validateMetadata } from "@/lib/post";
import { Card } from "@/app/snippets/card";

import nodePath from "node:path";

const snippetsDirectory = nodePath.join(process.cwd(), "content", "snippets");

export const metadata: Metadata = {
  title: "Snippets",
  description: "Show a curated collection of many useful code snippets",
};

const requiredMetadata: string[] = [
  "title",
  "snippetCount",
  "subtitle",
  "image",
];

export default async function SnippetsPage() {
  const snippets = await getSnippets();

  if (!snippets || snippets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-md bg-neutral-50 dark:bg-neutral-900/10">
        <h4 className="text-gray-700 dark:text-gray-200 font-bold text-2xl mb-4 tracking-tighter text-center">
          No Snippets available
        </h4>
        <p className="text-lg text-muted-foreground">
          Please check back later.
        </p>
      </div>
    );
  }

  return (
    <section className="mt-20">
      <h1 className="font-bold text-3xl mb-4 tracking-tighter text-center">
        Snippets Collection
      </h1>
      <p className="text-center mb-10 text-muted-foreground">
        Here are a curated collection of the most useful code snippets I've
        written.
      </p>

      <SnippetList snippets={snippets} />
    </section>
  );
}

async function getSnippets() {
  let snippetsSlugs: string[] = [];

  try {
    snippetsSlugs = await getPostSlugs(snippetsDirectory);
    if (!snippetsSlugs || snippetsSlugs.length === 0) return [];
  } catch (error) {
    console.error(
      "Failed to get snippet slugs from directory:",
      snippetsDirectory,
      error
    );
    return [];
  }

  const snippets = await Promise.all(
    snippetsSlugs.map(async (slug: string) => {
      try {
        const { metadata } = (await import(
          `@/content/snippets/${slug}.mdx`
        )) as { metadata: SnippetMetadata };

        if (!validateMetadata(metadata, requiredMetadata, slug)) return null;

        return { ...metadata, href: `/snippets/${slug}` } as Snippet;
      } catch (error) {
        console.error(error);
        return null;
      }
    })
  );

  return snippets.filter(Boolean) as Snippet[];
}

interface SnippetListProps {
  snippets: Snippet[];
}

function SnippetList({ snippets }: SnippetListProps) {
  if (!snippets || snippets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-md bg-neutral-50 dark:bg-neutral-900/10">
        <h4 className="text-gray-700 dark:text-gray-200 font-bold text-2xl mb-4 tracking-tighter text-center">
          No Snippets available
        </h4>
        <p className="text-lg text-muted-foreground">
          Please check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 place-items-center">
      {snippets.map((snippet) => (
        <Card key={snippet.title} {...snippet} />
      ))}
    </div>
  );
}
