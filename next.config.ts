import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],

  },
    experimental: {
    serverActions: {
      bodySizeLimit: '1000mb' // ⬅️ Augmente à 10MB
    }
  }
};

export default nextConfig;
