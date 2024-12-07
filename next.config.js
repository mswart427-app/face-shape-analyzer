/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'myhairmail.com',
        port: '',
        pathname: '/cdn/shop/**',
      }
    ],
  }
}

module.exports = nextConfig 