export interface Post {
  slug: string;
  title: string;
  publishedAt: string;
  summary: string;
  image: string;
  body: { code: string };
  structuredData: Record<string, unknown>;
}
