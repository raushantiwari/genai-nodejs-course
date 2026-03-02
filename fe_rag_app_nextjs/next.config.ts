import bundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

// $ pnpm analyze : to generate bundle analysis report
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false, // set to true if you want it to auto-open the report
});

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true, // helps catch potential issues
  // remove swcMinify — it's no longer needed
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['info', 'warn'] } : false,
    styledComponents: true, // if using styled-components
  },
  poweredByHeader: false,
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  compress: true, // ✅ enable gzip & brotli (default true in prod) => static assets (HTML, JSON, JS, CSS, etc.)
  // distDir – Change the build output directory (default is .next).
  // Enable standalone output for Docker production builds
  output: 'standalone',
};

export default withBundleAnalyzer(nextConfig);
