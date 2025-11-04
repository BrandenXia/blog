"use cache";

import * as runtime from "react/jsx-runtime";
import RSS from "rss";

import { metadata, owner, siteUrl } from "@/config";
import { getPostSource } from "@/lib/github/posts";
import { getPosts } from "@/lib/posts";
import { evaluate } from "@mdx-js/mdx";

const GET = async () => {
  const { renderToString } = await import("react-dom/server");

  const metas = await getPosts({ limit: "all" });

  const rss = new RSS({
    title: metadata.title.default,
    description: metadata.description,
    site_url: siteUrl,
    feed_url: `${siteUrl}/feed.xml`,
    image_url: `${siteUrl}/icon`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, ${owner}`,
  });

  await Promise.all(
    metas.map(async (meta) => {
      const source = await getPostSource(meta.title);
      const { default: Content } = await evaluate(source, { ...runtime, baseUrl: siteUrl });

      rss.item({
        date: meta.date,
        description: renderToString(<Content />),
        title: meta.title,
        url: `${siteUrl}/posts/${encodeURIComponent(meta.title)}`,
      });
    }),
  );

  return new Response(rss.xml(), {
    headers: { "Content-Type": "application/xml" },
  });
};

export { GET };
