import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Snippets",
  description: "Snippets of code I've written.",
};

export default async function SnippetsPage() {
  return (
    <section>
      <h1 className="font-bold text-2xl mb-8 tracking-tighter">
        snippets
      </h1>
    </section>
  );
}
