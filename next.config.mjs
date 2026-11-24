/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static site: works on Vercel, Netlify, GitHub Pages or any plain web host.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
