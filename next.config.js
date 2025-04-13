/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['localhost']
    },
    i18n: {
      locales: ['ko', 'en', 'la'],
      defaultLocale: 'ko'
    },
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: `${process.env.BACKEND_API_URL}/api/:path*`
        }
      ]
    }
  }
  
  module.exports = nextConfig