import million from "million/compiler";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com','github.com', 'wekwttnnowtwqzntesch.supabase.co'],
  },
};
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


export default million.next(nextConfig, supabase, millionConfig);
