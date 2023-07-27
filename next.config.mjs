import million from "million/compiler";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {

    domains: ['raw.githubusercontent.com','github.com', 'wekwttnnowtwqzntesch.supabase.co'],
  },
};
export default million.next(nextConfig);
