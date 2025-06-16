/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'better-melody-a764e21132.media.strapiapp.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig 