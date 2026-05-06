/** @type {import('next').NextConfig} */
const nextConfig = {
  // Esta línea le dice a Turbopack que no se meta con Webpack
  turbopack: {}, 
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

export default nextConfig;