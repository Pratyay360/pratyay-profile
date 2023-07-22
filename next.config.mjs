import million from "million/compiler";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {

    domains: ['raw.githubusercontent.com','github.com'],
  },
};
export default million.next(nextConfig);
