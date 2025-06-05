import type { Metadata } from "next";

import { allPost } from "@/lib/constant";

import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, design, and more.",
};

export default async function BlogPage() {
  const sortedPosts = allPost.sort((a, b) =>
    new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1
  );

  return (
    <section>
      <h1 className="font-bold text-2xl mb-8 tracking-tighter">read my blog</h1>
      {sortedPosts.map((post) => (
        <Link
          key={post.slug}
          className="flex flex-col space-y-1 mb-4"
          href={`/post/${post.slug}`}
        >
          <div className="w-full flex flex-col">
            <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
              {post.title}
            </p>
          </div>
        </Link>
      ))}
    </section>
  );
}
