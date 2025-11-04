"use cache";

import { MDXRemote, MDXRemoteOptions } from "next-mdx-remote-client/rsc";

import { siteUrl } from "@/config";
import { getPostSource } from "@/lib/github/posts";

const opts: MDXRemoteOptions = {
  mdxOptions: {
    baseUrl: siteUrl,
  },
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const src = await getPostSource(decodeURIComponent(slug));

  return <MDXRemote source={src} options={opts} />;
};

export default Page;
