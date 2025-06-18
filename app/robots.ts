import { siteConfig } from "@/lib/site/config";

export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/private/" }],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
