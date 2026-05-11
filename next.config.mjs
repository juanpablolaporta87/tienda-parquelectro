/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "parquelectro.com",
      },
      {
        protocol: "https",
        hostname: "*.hostingersite.com",
      },
    ],
  },
};

export default nextConfig;