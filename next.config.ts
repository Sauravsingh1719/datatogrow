/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  staticPageGenerationTimeout: 240,
};

export default nextConfig;
