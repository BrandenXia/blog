"use cache";

import { getPosts } from "@/lib/posts";

const Page = async () => {
  const posts = await getPosts();

  return <>{JSON.stringify(posts)}</>;
};

export default Page;
