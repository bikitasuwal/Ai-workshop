import type { NextConfig } from "next";

// The API lives in ../backend. The browser only ever talks to this site; requests to /api/* are
// forwarded to the backend, so login cookies stay same-origin and no CORS setup is needed.
const BACKEND_URL = (process.env.BACKEND_URL ?? "http://localhost:4000").replace(/\/$/, "");

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next", // lets a second copy run for testing without clashing
  cacheComponents: true,
  partialPrefetching: true,
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${BACKEND_URL}/api/:path*` }];
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
