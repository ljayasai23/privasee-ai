import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent webpack from bundling these modules to fix Vercel deployment size/binary issues
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium"],
};

export default nextConfig;
