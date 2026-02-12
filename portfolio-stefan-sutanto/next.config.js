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
  basePath: '/portfolio-stefan-sutanto',
  assetPrefix: '/portfolio-stefan-sutanto',
  trailingSlash: true,
}

module.exports = nextConfig
