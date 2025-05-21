import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "raw.githubusercontent.com" },
      { hostname: "github.com" },
      { hostname: "wekwttnnowtwqzntesch.supabase.co" },
      { hostname: "cdn.hashnode.com" },
      { hostname: "private-user-images.githubusercontent.com" },
      { hostname: "script.google.com" },
      { hostname: "fonts.gstatic.com" },
      { hostname: "fonts.googleapis.com" },
    ],
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
    resolveAlias: {
      underscore: 'lodash',
    },
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  experimental: {
    serverActions: {},
    typedRoutes: true,
  },
};

export default nextConfig;
