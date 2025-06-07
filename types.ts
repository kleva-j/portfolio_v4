export interface AnimatedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

export interface Post {
  title: string;
  summary: string;
  description: string;
  slug: string;
  publishedAt: Date | string;
  updatedAt: Date | string;
  readTime: number; // minutes
  image?: string;
}

export type ExcludeFromArray<K extends unknown[], ToExclude> = Exclude<
  K[number],
  ToExclude
>[];
