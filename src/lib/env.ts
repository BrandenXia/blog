import { type } from "arktype";

import { createEnv } from "@t3-oss/env-nextjs";

const env = createEnv({
  server: {
    GH_TOKEN: type("string"),
  },
  runtimeEnv: {
    GH_TOKEN: process.env.GH_TOKEN,
  },
});

export default env;
