import { DeploymentUrl } from "../utils";

export const siteConfig = {
  name: "Michael Obasi",
  description: "Developer, writer, and creator.",
  url: DeploymentUrl,
  author: "Michael Obasi",
  github: "https://github.com/kleva-j",
  github_username: "kleva-j",
  version: "1.0.0",
  navigation: {
    "/": { name: "Home" },
    "/post": { name: "Post" },
    "/snippets": { name: "Snippets" },
  },
  openGraph: {
    title: "Michael Obasi",
    description: "Developer, writer, and creator.",
    url: DeploymentUrl,
    siteName: "Michael Obasi",
    locale: "en-US",
    type: "website",
  },
  twitter: {
    title: "kasmickleva",
    card: "summary_large_image",
  },
};
