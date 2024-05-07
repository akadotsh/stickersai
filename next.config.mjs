/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "replicate.delivery",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack: (config) => {
    config.externals.push({
      "node:crypto": "commonjs crypto",
    });
    return config;
  },
};

export default nextConfig;
