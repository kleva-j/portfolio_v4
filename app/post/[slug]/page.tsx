import { PostHeader } from "@/app/post/[slug]/post-header";
import { notFound } from "next/navigation";
import { getPostSlugs } from "@/lib/post";
import { Fragment } from "react";

import path from "node:path";

export interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  try {
    const { default: Post, metadata } = await import(
      `@/content/post/${slug}.mdx`
    );
    return (
      <Fragment>
        <PostHeader metadata={metadata} />
        <Post />
      </Fragment>
    );
  } catch (error) {
    console.error(error);
    return notFound();
  }
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "content", "post");

  const postsSlugs = await getPostSlugs(postsDirectory);

  return postsSlugs.map((slug) => ({ params: { slug } }));
}

export const dynamicParams = false;
