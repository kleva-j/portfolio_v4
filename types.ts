export interface AnimatedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

export type Post = {
  title: string;
  summary: string;
  description: string;
  slug: string;
  publishedAt: Date | string;
  updatedAt: Date | string;
  readTime: number; // minutes
  image?: string;
};

export type Snippet = {
  title: string;
  subtitle?: string;
  snippetCount: number;
  image?: string;
  href?: string;
};

export type PostMetadata = Omit<Post, "slug">;

export type SnippetMetadata = Omit<Snippet, "href">;

export type ExcludeFromArray<K extends unknown[], ToExclude> = Exclude<
  K[number],
  ToExclude
>[];

export type ValidMetadata<M, ReqA extends string[], RT extends PostMetadata> = (
  metadata: M,
  required: ReqA,
  slug: string
) => metadata is M & RT;
