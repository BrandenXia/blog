"use server";

import { evaluate } from "next-mdx-remote-client/rsc";
import { cacheLife } from "next/cache";

import { getAllPosts, getPostSource } from "./github/posts";

type Metadata = {
  title: string;
  date: string;
  tags: string[];
};

type Filter = {
  [key in keyof Metadata]?: Metadata[key];
};

type Post = {
  slug: string;
  metadata: Metadata;
};

type GetPostsOpts = {
  sort?: [keyof Metadata, "asc" | "desc"];
  filter?: Filter;
  limit?: number | "all";
  page?: number;
};

const checkFilter = (metadata: Metadata, filter: Filter) => {
  for (const key in filter) {
    const objKey = key as keyof Metadata; // Type assertion

    if (
      (typeof filter[objKey] === "string" && metadata[objKey] !== filter[objKey]) ||
      (Array.isArray(filter[objKey]) &&
        filter[objKey].some((value) => !metadata[objKey].includes(value)))
    )
      return false;
  }
  return true;
};

const getPostMeta = async (title: string) => {
  "use cache";
  cacheLife("days");

  const source = await getPostSource(title);
  const { mod } = await evaluate({ source });

  return {
    title: title,
    ...(mod.metadata as Omit<Metadata, "title">),
  } as Metadata;
};

type Cmp = <T>(a: T, b: T) => boolean;
const ge: Cmp = (a, b) => a > b;
const le: Cmp = (a, b) => a < b;

const getPosts = async ({
  sort = ["date", "desc"],
  filter = {},
  limit = 20,
  page = 1,
}: GetPostsOpts = {}) => {
  "use cache";

  const posts = await getAllPosts();
  const metas = await Promise.all(posts.map(getPostMeta));
  return metas
    .filter((meta) => checkFilter(meta, filter))
    .sort((a, b) => {
      const [key, order] = sort;
      return (order === "asc" ? ge : le)(a[key], b[key]) ? 1 : -1;
    })
    .slice(limit === "all" ? 0 : (page - 1) * limit, limit === "all" ? undefined : page * limit);
};

export type { Metadata, Post, Filter, GetPostsOpts };
export { getPostMeta, getPosts };
