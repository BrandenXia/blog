import { getPosts } from "@/lib/posts";

import Posts from "./_components/posts";

import type { Filter } from "@/lib/posts";
import type { FC } from "react";

type SearchParams = Promise<{ tags?: string }>;

const parseFilter = (params: Awaited<SearchParams>): Filter => {
  return {
    tags: params.tags ? params.tags.split(",") : undefined,
  };
};

const Page: FC<{ searchParams: SearchParams }> = async ({ searchParams }) => {
  const params = await searchParams;
  const posts = await getPosts({
    filter: parseFilter(params),
  });

  return (
    <div>
      <div className="mx-auto max-w-(--breakpoint-md)">
        <Posts posts={posts} />
      </div>
    </div>
  );
};

export default Page;
