import type { Metadata } from "next";

import { notFound } from "next/navigation";
import { Mdx } from "app/components/mdx";
import { formatDate } from "@/lib/utils";
import { allPost } from "lib/constant";

import Balancer from "react-wrap-balancer";

export type BlogMetadata = { params: Promise<{ slug: string }> };

async function generateMetadata(
  props: BlogMetadata
): Promise<Metadata | undefined> {
  const params = await props.params;
  const post = allPost.find((post) => post.slug === params.slug);

  if (!post) return;

  const { title, publishedAt, summary: description, image, slug } = post;

  const ogImage = image
    ? `https://leerob.io${image}`
    : `https://leerob.io/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: publishedAt,
      images: [{ url: ogImage }],
      url: `https://leerob.io/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

function generateStaticParams() {
  return [{ slug: "welcome" }, { slug: "about" }];
}

export { generateMetadata, generateStaticParams };

formatDate;

export default async function Blog(props: BlogMetadata) {
  const params = await props.params;

  const post = allPost.find((post) => post.slug === params.slug);

  if (!post) return notFound();

  const __html = JSON.stringify(post.structuredData);

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html }}
      />
      <h1 className="font-bold text-2xl tracking-tighter max-w-[650px]">
        <Balancer>{post.title}</Balancer>
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.publishedAt)}
        </p>
      </div>
      <Mdx code={post.body.code} />
    </section>
  );
}
