"use cache";

import Link from "next/link";

import { getPosts } from "@/lib/posts";

const Page = async () => {
  const posts = await getPosts();

  return (
    <>
      {posts.map((p) => (
        <Link key={p.title} href={`/posts/${encodeURIComponent(p.title)}`}>
          {p.title}
        </Link>
      ))}
    </>
  );
};

export default Page;
