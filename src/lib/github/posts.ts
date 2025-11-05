"use server";

import assert from "assert";
import { type } from "arktype";
import { cacheLife } from "next/cache";

import { githubPostsRepo } from "@/config";

import octokit from "./client";

const HEADERS = {
  "X-GitHub-Api-Version": "2022-11-28",
};
const GET_ROUTE = "GET /repos/{owner}/{repo}/contents/{path}";

const GitHubPostsType = type({ name: "string" }, "[]");
const GitHubPostType = type({ type: "'file'", content: "string" });

const getPostSource = async (title: string) => {
  "use cache";
  cacheLife("days");

  const post = await octokit.request(GET_ROUTE, {
    ...githubPostsRepo,
    path: `${title}/index.mdx`,
    mediaType: { format: "application/vnd.github.raw+json" },
    headers: HEADERS,
  });

  const out = GitHubPostType(post.data);
  assert(out instanceof type.errors == false);
  return Buffer.from(out.content, "base64").toString("utf-8");
};

const getAllPosts = async () => {
  "use cache";
  cacheLife("minutes");

  const posts = await octokit.request(GET_ROUTE, {
    ...githubPostsRepo,
    path: "",
    headers: HEADERS,
  });

  const out = GitHubPostsType(posts.data);
  assert(out instanceof type.errors == false);
  return out.map(({ name }) => name);
};

export { getPostSource, getAllPosts };
