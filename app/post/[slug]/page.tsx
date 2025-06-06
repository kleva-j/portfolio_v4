import { notFound } from "next/navigation";
import { promises as fs } from "node:fs";

import path from "node:path";

export interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;

  try {
    const { default: Post } = await import(`@/content/post/${slug}.mdx`);
    return <Post />;
  } catch (error) {
    console.error(error);
    return notFound();
  }
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
      return path.basename(relativePath, ".mdx");
    })
    .map((slug) => slug.replace(/\\/g, "/"));
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "content", "post");

  const postsSlugs = await getPostSlugs(postsDirectory);

  return postsSlugs.map((slug) => ({ params: { slug } }));
}

export const dynamicParams = false;
