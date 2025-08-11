import type { Post } from "@/types";

import { ImageZoom } from "@/components/image-zoom";
import { format } from "date-fns";

import Image from "next/image";

export const PostHeader = ({ metadata }: { metadata: Post }) => {
  return (
    <div data-slot="post-header" className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
        {metadata.title}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mt-4 mb-2 max-w-lg mx-auto">
        {metadata.description}
      </p>

      <div className="flex items-center justify-center gap-2 mb-4 divide-x-2 divide-gray-300 dark:divide-gray-700">
        <p className="text-[13px] text-gray-600 dark:text-gray-400 pr-2">
          {(() => {
            try {
              return format(new Date(metadata.publishedAt), "PP");
            } catch {
              return metadata.publishedAt?.toString() ?? "";
            }
          })()}
        </p>
        <p className="text-[13px] text-gray-600 dark:text-gray-400 font-medium">
          {metadata.readTime} min read
        </p>
      </div>
      {metadata.image && (
        <ImageZoom>
          <Image
            src={metadata.image}
            alt={metadata.title}
            width={1200}
            height={630}
            className="mx-auto my-4"
          />
        </ImageZoom>
      )}
    </div>
  );
};
