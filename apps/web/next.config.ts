// NPM Modules
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Compile the shared workspace package from source so its types and runtime
  // enums resolve cleanly during dev and build.
  transpilePackages: ['@redclayradio/utils']
};

export default nextConfig;
