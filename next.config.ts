import type { NextConfig } from "next";
import { HERO_ONLY, HERO_ONLY_REDIRECTS } from "./src/lib/site";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Hero-only mode (see src/lib/site.ts): every other page goes to the home
  // page. Temporary (307) redirects, so search engines keep the real pages.
  async redirects() {
    if (!HERO_ONLY) return [];
    return HERO_ONLY_REDIRECTS.map((source) => ({
      source,
      destination: "/",
      permanent: false,
    }));
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
