import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Add alias for messages directory to help webpack resolve dynamic imports
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/messages': path.resolve(__dirname, './src/messages'),
    };
    return config;
  },
};

export default withNextIntl(nextConfig);

