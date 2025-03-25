import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // This ensures assets are served correctly when deployed
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
