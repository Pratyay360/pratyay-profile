import million from "million/compiler";
import nextMDX from '@next/mdx'
import withPWA from 'next-pwa'
import runtimeCaching from 'next-pwa/cache.js'

const isProduction = process.env.NODE_ENV === 'production'


const withMDX = nextMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com','github.com', 'wekwttnnowtwqzntesch.supabase.co', 'cdn.hashnode.com'],
  },
};
const nextMdxConfig = withMDX(
  withPWA({
    dest: 'public',
    disable: !isProduction,
    runtimeCaching,
  })(nextConfig)
)
const supabase = {
  client: {
      auth: {
          persistSession: false
      }
  }
};
const millionConfig = {
  auto: true,
  
}

export default million.next(nextMdxConfig, supabase, millionConfig);
