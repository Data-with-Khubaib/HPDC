/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  output: 'export', // Forces Next.js to build static files into an 'out' folder
  basePath: '/HPDC', // Case-sensitive. Matches your repository name exactly
  images: {
    unoptimized: true, // Prevents image optimization errors during export
  },
};

export default nextConfig;
