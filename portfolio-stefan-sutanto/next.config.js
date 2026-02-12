/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio-stefan-sutanto' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio-stefan-sutanto' : '',
}

module.exports = nextConfig
