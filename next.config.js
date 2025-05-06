/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
       // If placeholder-user.jpg is served from a remote host, add its pattern here.
       // Example for a generic placeholder service:
      // {
      //   protocol: 'https',
      //   hostname: 'via.placeholder.com',
      //   port: '',
      //   pathname: '/**',
      // },
    ],
     // Allow serving local images if placeholder-user.jpg is local (though remotePatterns is generally preferred)
    // domains: ['localhost'], // Example if served locally during dev
  },
};

module.exports = nextConfig;