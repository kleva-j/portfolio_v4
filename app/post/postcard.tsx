import type { Post } from "@/types";

import format from "date-fns/format";

import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Card,
} from "@/components/ui/card";

import Link from "next/link";

export interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const { title, summary, slug, publishedAt, readTime } = post;

  return (
    <Link href={`/post/${slug}`}>
      <Card className="group border relative overflow-hidden rounded-sm p-6 gap-2 shadow-none hover:shadow-xs transition-all hover:bg-blue-50 dark:hover:bg-blue-950/80 cursor-pointer">
        <CardHeader className="p-0">
          <CardTitle className="text-blue-600 dark:text-blue-400">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <p className="text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
            {summary}
          </p>
        </CardContent>
        <CardFooter className="p-0 divide-x-2 divide-gray-100 dark:divide-gray-700 flex items-center gap-2">
          <p className="text-sm text-black/70 dark:text-white/70 pr-2">
            {publishedAt ? format(new Date(publishedAt), "PP") : ""}
          </p>
          <p className="text-sm text-black/70 dark:text-white/70">
            {readTime} min read
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
};
