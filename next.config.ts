import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
 /* config options here */
 // for docker build, we need to enable standalone mode
 // output: 'standalone',
 eslint: {
  ignoreDuringBuilds: true,
 },
 images: {
  remotePatterns: [
   {
    protocol: 'https',
    hostname: '**',
   },
   {
    protocol: 'http',
    hostname: '**',
   },
  ],
 },
};

export default nextConfig;
