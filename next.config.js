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
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Accept'
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src * 'unsafe-inline' 'unsafe-eval'; frame-ancestors *; img-src * data:; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src *;"
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig 