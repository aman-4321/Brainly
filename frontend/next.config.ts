import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ["www.usefindr.com", "app.usefindr.com"],
  },
};

export default nextConfig;
