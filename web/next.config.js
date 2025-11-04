/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    appDir: true,
  },
  env: {
    API_URL: process.env.API_URL || 'http://13.221.113.56',
  },
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig 
