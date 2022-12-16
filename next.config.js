/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  swcMinify: true,
  // experimental: { appDir: true },
  images: {
    domains: ["images.unsplash.com", "upload.wikimedia.org", "localhost"],
  },
};

module.exports = nextConfig;
