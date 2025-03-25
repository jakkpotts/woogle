import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out',
  basePath: '/woogle',
  assetPrefix: '/woogle/',
};

export default nextConfig;
