"use cache";

import { evaluate } from "next-mdx-remote-client/rsc";
import Link from "next/link";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkFlexibleToc from "remark-flexible-toc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { siteUrl } from "@/config";
import { getPostMeta, getPostSource } from "@/lib/posts";

import MdxStyles from "./_components/mdx";
import Toc from "./_components/toc";

import type { Metadata } from "next";
import type { MDXRemoteOptions } from "next-mdx-remote-client/rsc";
import type { Options as RehypePrettyCodeOptions } from "rehype-pretty-code";
import type { TocItem } from "remark-flexible-toc";

import "./style.css";

type Params = Promise<{ slug: string }>;

export const generateMetadata = async ({ params }: { params: Params }): Promise<Metadata> => {
  const { slug } = await params;
  const title = decodeURIComponent(slug);

  return {
    title,
    description: title,
  };
};

type Frontmatter = Record<string, unknown>;
type Scope = {
  toc?: TocItem[];
};

const options: MDXRemoteOptions = {
  mdxOptions: {
    baseUrl: siteUrl,
    remarkPlugins: [remarkMath, remarkGfm, remarkFlexibleToc],
    rehypePlugins: [
      rehypeSlug,
      rehypeKatex,
      [
        rehypePrettyCode,
        {
          theme: { light: "catppuccin-latte", dark: "catppuccin-macchiato" },
          keepBackground: false,
        } satisfies RehypePrettyCodeOptions,
      ],
    ],
  },
  vfileDataIntoScope: "toc",
};

const Time = ({ date }: { date: string }) => (
  <time dateTime={date} className="inline-flex items-center">
    <span className="i-ph-clock mr-1 size-4" />
    {date}
  </time>
);

const Tags = ({ tags }: { tags: string[] }) => (
  <div className="text-secondary inline-flex space-x-2 font-mono underline">
    {tags.map((tag) => (
      <span className="before:content-['#']" key={tag}>
        <Link href={`/posts?tags=${tag}`}>{tag}</Link>
      </span>
    ))}
  </div>
);

const Page = async ({ params }: { params: Params }) => {
  const { slug } = await params;
  const title = decodeURIComponent(slug);
  const meta = await getPostMeta(title);
  const source = await getPostSource(title);
  const {
    content,
    scope: { toc },
  } = await evaluate<Frontmatter, Scope>({ source, options, components: MdxStyles });

  return (
    <>
      <main className="mx-auto flex max-w-(--breakpoint-md) grow flex-col space-y-8 px-12 xl:mx-10 xl:pr-8 xl:pl-0">
        <div className="mb-6 flex flex-col space-y-4">
          <h1 className="text-4xl font-bold">{meta.title}</h1>
          <div className="flex flex-wrap items-center space-x-2.5 text-[0.95rem]">
            <Time date={meta.date} />
            <Tags tags={meta.tags} />
          </div>
        </div>
        <article className="mx-0.5 text-[1.025rem] text-pretty">{content}</article>
      </main>
      <div className="relative hidden xl:block">
        <div className="sticky top-0 h-screen shrink-0 pt-28">
          <Toc toc={toc!} />
        </div>
      </div>
    </>
  );
};

export default Page;
