import { Config } from "@/config";

const config: Config = {
  githubUsername: "BrandenXia",
  siteUrl: "https://xia-x.org",
  headerLinks: [
    { text: "Home", href: "/" },
    [
      { text: "Posts", href: "/posts" },
      { text: "Frontend", href: "/posts?category=frontend" },
      { text: "Notes", href: "/posts?tags=notes" },
    ],
    { text: "About", href: "/about" },
  ],
  layout: {
    headerHeight: 72,
  },
  avatar: {
    source: "github",
    userId: 63844776,
    alt: "BrandenXia",
  },
  metadata: {
    title: {
      template: "%s | BrandenXia's Blog",
      default: "BrandenXia's Blog",
    },
    description: "BrandenXia's Blog",
  },
};

export default config;
