/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // Allow development origins for browser preview
  compress: true,
  allowedDevOrigins: ['http://localhost:*', 'http://127.0.0.1:*'],
};

export default nextConfig;
