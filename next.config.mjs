/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/portfolio",       // your repo name
  assetPrefix: "/portfolio/",   // ensures CSS/JS assets load
};

export default nextConfig;
