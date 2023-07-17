import million from "million/compiler";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {

    domains: ['raw.githubusercontent.com', 'icon-library.com', 'www.vectorlogo.zone', 'nodejs.org', 'www.rlogical.com', 'github.com', 'cdn.worldvectorlogo.com'],
  },
};
export default million.next(nextConfig);
