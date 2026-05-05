/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  // Se movió fuera de 'experimental' y cambió el nombre
  serverExternalPackages: ['sharp'], 
}

export default nextConfig
