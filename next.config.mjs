/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'mosaic.scdn.co',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'image-cdn-ak.spotifycdn.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'image-cdn-fa.spotifycdn.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'assets.aceternity.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
