/** @type {import('next').NextConfig} */
const nextConfig = {
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
    // Optional: Add Turbopack-specific configurations here
    rules: {
      // Example: Configure specific loaders if needed
      "*.md": {
        loaders: ["raw-loader"],
      },
    },
  },
  // Add output configuration for Vercel deployment
  output: 'standalone',
};

export default nextConfig;