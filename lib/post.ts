import type { PostMetadata } from "@/types";

import { promises as fs } from "node:fs";

import path from "node:path";

export async function getPostSlugs(dir: string) {
  try {
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
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function generatePageParams(...args: string[]) {
  const directory = path.join(process.cwd(), ...args);
  const slugs = await getPostSlugs(directory);
  return slugs.map((slug) => ({ params: { slug } }));
}

export function validateMetadata<
  M extends object,
  ReqA extends string[],
  RT extends PostMetadata
>(metadata: M, required: ReqA, slug: string): metadata is M & RT {
  const missing = required.filter((field) => !(field in metadata));
  if (missing.length > 0) {
    console.warn(`Post ${slug} missing required fields:`, missing);
    return false;
  }
  return true;
}
