/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't bundle html2pdf.js on the server side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        stream: false,
        canvas: false,
      };
    }
    return config;
  },
};

export default nextConfig;
