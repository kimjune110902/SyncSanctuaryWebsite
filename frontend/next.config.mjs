/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { instrumentationHook: true },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8080/api/:path*'
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'X-XSS-Protection',
            value: '0'
          },
          {
             key: 'Content-Security-Policy',
             value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://accounts.google.com https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https://cdn.syncsanctuary.app https://*.googleusercontent.com; connect-src 'self' https://api.syncsanctuary.app https://api.pwnedpasswords.com http://127.0.0.1:8080 http://localhost:8080; frame-src https://accounts.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;"
          }
        ]
      }
    ];
  }
};

import { withSentryConfig } from '@sentry/nextjs';

export default withSentryConfig(nextConfig, { authToken: process.env.SENTRY_AUTH_TOKEN || "dummy",
  silent: true,
  org: "syncsanctuary",
  project: "frontend"
});
