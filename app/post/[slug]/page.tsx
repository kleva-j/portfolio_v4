import { PostHeader } from "@/app/post/[slug]/post-header";
import { notFound } from "next/navigation";
import { getPostSlugs } from "@/lib/post";

import path from "node:path";

export interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  try {
    const { slug } = await params;
    const { default: Post, metadata } = await import(
      `@/content/post/${slug}.mdx`
    );
    return (
      <div className="flex flex-col gap-2 mt-16">
        <PostHeader metadata={metadata} />
        <div data-slot="post-content">
          <Post />
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return notFound();
  }
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "content", "post");

  const postsSlugs = await getPostSlugs(postsDirectory);

  return postsSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;
