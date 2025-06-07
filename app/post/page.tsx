import type { Post } from "@/types";

import { PostCard } from "@/app/post/postcard";
import { getPostSlugs } from "@/lib/post";

import path from "node:path";

export default async function PostsPage() {
  const posts: Post[] = await getPost();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <p className="text-base font-normal text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore my latest thoughts and insights on various topics.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}

async function getPost() {
  const postsDirectory = path.join(process.cwd(), "content", "post");

  const postsSlugs = await getPostSlugs(postsDirectory);

  const posts = await Promise.all(
    postsSlugs.map(async (slug: string) => {
      const { metadata } = await import(`@/content/post/${slug}.mdx`);
      return { ...metadata, slug } as Post;
    })
  );

  return posts;
}
