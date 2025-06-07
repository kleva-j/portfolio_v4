import type { ExcludeFromArray } from "@/types";

import { DeploymentUrl } from "@/lib/utils";
import { getPostSlugs } from "@/lib/post";

import path from "node:path";

export default async function sitemap() {
  const postsDirectory = path.join(process.cwd(), "content", "post");

  const postsSlugs = await getPostSlugs(postsDirectory);

  const posts = await Promise.all(
    postsSlugs.map(async (slug: string) => {
      try {
        const { metadata } = await import(`@/content/post/${slug}.mdx`);
        if (!metadata?.updatedAt) {
          console.warn(`Missing updatedAt in metadata for post: ${slug}`);
          return null;
        }
        return {
          url: `${DeploymentUrl}/post/${slug}`,
          lastModified: new Date(metadata.updatedAt)
            .toISOString()
            .split("T")[0],
        };
      } catch (error) {
        console.error(error);
        return null;
      }
    })
  );

  const validPosts = posts.filter(Boolean);

  const routes = ["", "/post", "/snippets"].map((route) => ({
    url: `${DeploymentUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  type Post = ExcludeFromArray<typeof posts, null>;

  return [...routes, ...(validPosts as Post)];
}
