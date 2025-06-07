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
