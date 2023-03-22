/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    // forceSwcTransforms: true,
    serverComponentsExternalPackages: ['bcrypt'],
  },
}

module.exports = nextConfig
