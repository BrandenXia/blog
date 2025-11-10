export const owner = "BrandenXia";

export const siteUrl = "https://xia-x.org";

export const metadata = {
  title: {
    default: "BrandenXia's Blog",
    template: "%s | BrandenXia's Blog",
  },
  description: "BrandenXia's Blog",
};

export const githubPostsRepo = {
  owner,
  repo: "blog-posts",
};

export type Avatar = {
  alt: string;
} & (
  | {
      source: "local";
      // local image path, should be relative to public folder
      src: string;
    }
  | {
      source: "github";
      // GitHub user id
      userId: number;
    }
);

export const avatar: Avatar = {
  source: "github",
  userId: 63844776,
  alt: "BrandenXia avatar",
};
