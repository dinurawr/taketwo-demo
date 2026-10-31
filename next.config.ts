import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.asos-media.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        // Shopify CDN — real product photography for the catalogue.
        // Public CDN, server-side hotlinking allowed. The self-host script
        // (scripts/self-host-images.mjs) can mirror these into /public later.
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
  },
};

export default nextConfig;
