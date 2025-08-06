/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  allowedDevOrigins: ["*.preview.same-app.com"],
  // ESLint configuration for production build
  eslint: {
    // Позволяет продолжить сборку даже с ESLint ошибками
    ignoreDuringBuilds: true,
  },
  // TypeScript configuration for production build
  typescript: {
    // Позволяет продолжить сборку даже с TypeScript ошибками
    ignoreBuildErrors: true,
  },
  images: {
    // unoptimized отключено для динамического развертывания
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
      "wildernessawareness.org",
      "falconfresh.com",
      "www.kroger.com",
      "www.grandiose.ae",
      "bf1af2.akinoncloudcdn.com",
      "m.media-amazon.com",
      "cdn.mafrservices.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wildernessawareness.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "falconfresh.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.kroger.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.grandiose.ae",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "bf1af2.akinoncloudcdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.mafrservices.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
