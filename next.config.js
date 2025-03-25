/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow development origins for browser preview
  compress: true,
  allowedDevOrigins: ['http://localhost:*', 'http://127.0.0.1:*'],
};

module.exports = nextConfig;
