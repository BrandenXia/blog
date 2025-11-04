import { Octokit } from "octokit";

import env from "@/lib/env";

const octokit = new Octokit({
  auth: env.GH_TOKEN,
});

export default octokit;
