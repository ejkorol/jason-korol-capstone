/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['knex', 'bcrypt', 'jsonwebtoken'],
  },
};

export default nextConfig;
