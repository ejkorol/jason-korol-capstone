/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['knex', 'bcrypt', 'jsonwebtoken', 'uuid'],
  },
};

export default nextConfig;
