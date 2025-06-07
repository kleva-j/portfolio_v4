import { DeploymentUrl } from "@/lib/utils";
import { getPostSlugs } from "@/lib/post";

import path from "node:path";

export default async function sitemap() {
  const postsDirectory = path.join(process.cwd(), "content", "post");

  const postsSlugs = await getPostSlugs(postsDirectory);

  const posts = await Promise.all(
    postsSlugs.map(async (slug: string) => {
      const { metadata } = await import(`@/content/post/${slug}.mdx`);
      return {
        url: `${DeploymentUrl}/post/${slug}`,
        lastModified: new Date(metadata.updatedAt).toISOString().split("T")[0],
      };
    })
  );

  const routes = ["", "/post", "/snippets"].map((route) => ({
    url: `${DeploymentUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...posts];
}
