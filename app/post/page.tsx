import type { Post, PostMetadata } from "@/types";

import { PostCard } from "@/app/post/postcard";
import { getPostSlugs } from "@/lib/post";
import { FilePlus } from "lucide-react";

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
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <FilePlus className="size-12 mx-auto stroke-1 text-gray-600 dark:text-gray-400 mb-4" />
            <h4 className="font-semibold text-gray-800 dark:text-gray-100">
              No posts available
            </h4>
            <p className="text-gray-500 text-sm my-2 dark:text-gray-400">
              Please check back later.
            </p>
          </div>
        ) : (
          posts.map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>
    </div>
  );
}

async function getPost() {
  const postsDirectory = path.join(process.cwd(), "content", "post");

  let postsSlugs: string[] = [];

  try {
    postsSlugs = await getPostSlugs(postsDirectory);
    if (!postsSlugs || postsSlugs.length === 0) return [];
  } catch (error) {
    console.error(
      "Failed to get post slugs from directory:",
      postsDirectory,
      error
    );
    return [];
  }

  const posts = await Promise.all(
    postsSlugs.map(async (slug: string) => {
      try {
        const { metadata } = await import(`@/content/post/${slug}.mdx`);

        if (!validatePostMetadata(metadata, slug)) return null;

        return { ...metadata, slug } as Post;
      } catch (error) {
        console.error(error);
        return null;
      }
    })
  );

  return posts.filter(Boolean) as Post[];
}

function validatePostMetadata(
  metadata: PostMetadata,
  slug: string
): metadata is Post {
  const required = ["title", "summary", "publishedAt", "readTime"];
  const missing = required.filter((field) => !(field in metadata));
  if (missing.length > 0) {
    console.warn(`Post ${slug} missing required fields:`, missing);
    return false;
  }
  return true;
}
