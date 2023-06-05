/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/apps',
        permanent: false,
      }, {
        source: '/apps/:app',
        destination: '/apps/:app/overview',
        permanent: false,
      }
    ];
  },
}

export default nextConfig
