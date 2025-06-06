import { siteConfig } from "@/lib/site/config";
import { promises as fs } from "node:fs";

import path from "node:path";

export interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const { default: Post } = await import(`@/content/post/${slug}.mdx`);

  return <Post />;
}

async function getPostSlugs(dir: string) {
  const entries = await fs.readdir(dir, {
    recursive: true,
    withFileTypes: true,
  });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => {
      const joinedPath = path.join(entry.path, entry.name);
      const relativePath = path.relative(dir, joinedPath);
      return path.dirname(relativePath);
    })
    .map((slug) => slug.replace(/\\/g, "/"));
}

async function generateStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "content", "post");

  const postsSlugs = await getPostSlugs(postsDirectory);

  const posts = postsSlugs.map((slug) => ({
    url: `${siteConfig.openGraph.siteUrl}/post/${slug}`,
    lastModified: new Date().toISOString(),
  }));

  return posts;
}

export function generateStaticParams() {
  return generateStaticPaths();
}

export const dynamicParams = false;
