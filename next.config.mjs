/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**",
          },
          {
            protocol: "https",
            hostname: "*.googleusercontent.com",
            port: "",
            pathname: "**",
          },
          {
            protocol: "https",
            hostname: "*.githubusercontent.com",
            port: "",
            pathname: "**",
          },
        ],
      },
};

export default nextConfig;
