/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      root: __dirname, // Set turbopack root to current directory
    },
  },
};

module.exports = nextConfig;