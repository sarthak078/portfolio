/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  }
  // COMPLETELY REMOVE these lines:
  // basePath: "/portfolio",
  // assetPrefix: "/portfolio/",
};

export default nextConfig;