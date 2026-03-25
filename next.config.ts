import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent webpack from bundling these modules
  serverExternalPackages: ["puppeteer-core", "@sparticuz/chromium"],
  
  // Force Vercel to include the Chromium binaries which are usually ignored during the build
  outputFileTracingIncludes: {
    "/**/*": ["./node_modules/@sparticuz/chromium/bin/**/*"],
  },
};

export default nextConfig;
