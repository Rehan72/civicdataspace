/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.datakeep.civicdays.in',
      },
    ],
  },
};

module.exports = nextConfig;
