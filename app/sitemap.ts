import { allPost } from "@/lib/constant";

export default async function sitemap() {
  const blogs = allPost.map((post) => ({
    url: `https://leerob.io/blog/${post.slug}`,
    lastModified: post.publishedAt,
  }));

  const routes = ["", "/blog", "/snippets"].map((route) => ({
    url: `https://leerob.io${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
