import { MDXContent } from "mdx/types";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

import PostCategory from "@/components/ui/post/post-category";
import PostDate from "@/components/ui/post/post-date";
import PostTags from "@/components/ui/post/post-tags";
import { getFileFromSlug, getPostMetadata, getPostsBy } from "@/lib/posts";

import MdxStyle from "./_components/mdx-style";
import Toc from "./_components/toc";

type Params = { slug: string };

const generateStaticParams = async () => {
  const posts = await getPostsBy();
  return posts.map(({ slug }) => ({ params: { slug } }));
};

const generateMetadata = async ({ params: { slug } }: { params: Params }) => {
  const metadata = await getPostMetadata(slug);
  if (!metadata) return {};

  return {
    title: metadata.title,
    description: metadata.summary,
  } satisfies Metadata;
};

const Page = async ({ params: { slug } }: { params: Params }) => {
  const metadata = await getPostMetadata(slug);
  if (!metadata) return notFound();
  const file = await getFileFromSlug(slug);
  const Content = dynamic(() => import(`@data/posts/${file}`)) as MDXContent;

  return (
    <>
      <main className="mx-auto flex max-w-screen-lg grow flex-col space-y-8 px-12">
        <div className="flex flex-col space-y-4">
          <h1 className="text-center text-4xl font-bold">{metadata.title}</h1>
          <div className="flex justify-center space-x-2.5 text-neutral">
            <PostDate date={metadata.date} />
            <PostCategory category={metadata.category} withLink />
            <PostTags tags={metadata.tags} withLink />
          </div>
        </div>
        <article className="space-y-4 text-pretty text-[1.05rem]" id="post-content">
          <Content components={MdxStyle} />
        </article>
      </main>
      <aside className="sticky top-48 hidden h-max w-52 xl:block">
        <Toc htmlFor="post-content" />
      </aside>
    </>
  );
};

export default Page;
export { generateStaticParams, generateMetadata };
