/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drupal-lerd.test',
      },
      {
        protocol: 'http',
        hostname: 'drupal-lerd.test',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    const drupalBaseUrl =
      process.env.DRUPAL_BASE_URL ||
      process.env.NEXT_PUBLIC_DRUPAL_BASE_URL ||
      'https://drupal-lerd.test';

    return [
      {
        source: '/sites/default/files/:path*',
        destination: `${drupalBaseUrl}/sites/default/files/:path*`,
      },
      {
        source: '/core/:path*',
        destination: `${drupalBaseUrl}/core/:path*`,
      },
    ];
  },
};

export default nextConfig;
