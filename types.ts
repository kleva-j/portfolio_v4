export interface AnimatedIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

export interface Post {
  title: string;
  summary: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt: string;
  readTime: number;
  image?: string;
}
