/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost:3000/app',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost:3000/dashboard', 
        port: '',
        pathname: '/**',
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
