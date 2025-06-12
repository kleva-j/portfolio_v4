import type { Snippet } from "@/types";
import type { Metadata } from "next";

import { Card } from "@/app/snippets/card";
import { snippets } from "@/lib/constant";

export const metadata: Metadata = {
  title: "Snippets",
  description: "Show a curated collection of many useful code snippets",
};

export default async function SnippetsPage() {
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
