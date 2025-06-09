import type { Post, PostMetadata } from "@/types";
import type { SearchParams } from "nuqs/server";

import { loadPaginationParams } from "@/components/search-params";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/app/post/postcard";
import { getPostSlugs } from "@/lib/post";
import { FilePlus } from "lucide-react";

import {
  PaginationContent,
  PaginationLink,
  Pagination,
} from "@/components/ui/pagination";

import path from "node:path";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function PostsPage({ searchParams }: PageProps) {
  const posts: Post[] = await getPost();

  const { page: currentPage, limit } = await loadPaginationParams(searchParams);

  const totalPages = Math.ceil(posts.length / limit);
  const offset = Math.max(currentPage - 1, 0) * limit;

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
          posts
            .slice(offset, offset + limit)
            .map((post) => <PostCard key={post.slug} post={post} />)
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-15 flex flex-col items-center gap-y-6">
          <Separator />

          <Pagination className="px-4">
            <PaginationContent className="w-full justify-between gap-3 pl-4 pr-1">
              <PaginationLink
                href={
                  currentPage === 1
                    ? "#"
                    : `/post?page=${Math.max(currentPage - 1, 1)}`
                }
              >
                <Button
                  variant="outline"
                  className="group aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                  role={currentPage === 1 ? "link" : undefined}
                  aria-disabled={currentPage === 1}
                  disabled={currentPage === 1}
                >
                  <ArrowLeftIcon
                    className="-ms-1 opacity-60 transition-transform group-hover:-translate-x-0.5"
                    size={16}
                    aria-hidden="true"
                  />
                  Previous
                </Button>
              </PaginationLink>
              <PaginationLink
                href={
                  currentPage === totalPages
                    ? "#"
                    : `/post?page=${Math.min(currentPage + 1, totalPages)}`
                }
              >
                <Button
                  variant="outline"
                  className="group aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                  role={currentPage === totalPages ? "link" : undefined}
                  aria-disabled={currentPage === totalPages}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ArrowRightIcon
                    className="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
                    size={16}
                    aria-hidden="true"
                  />
                </Button>
              </PaginationLink>
            </PaginationContent>
          </Pagination>
        </div>
      )}
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
