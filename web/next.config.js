/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    appDir: true,
  },
  env: {
    API_URL: process.env.API_URL || 'http://localhost:5000',
  },
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig 