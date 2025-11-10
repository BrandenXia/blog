import { metadata } from "@/config";

import type { MetadataRoute } from "next";

const manifest = (): MetadataRoute.Manifest => ({
  name: metadata.title.default,
  short_name: metadata.title.default,
  description: metadata.description,
  start_url: "/",
  display: "standalone",
  icons: [{ src: "/icon", sizes: "64x64", type: "image/png" }],
});

export default manifest;
