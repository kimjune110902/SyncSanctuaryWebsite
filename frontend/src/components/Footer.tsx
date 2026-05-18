"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


const FOOTER_LINKS = {
  Product: [
    { label: 'Features', href: '/en/features' },
    { label: 'Download', href: '/en/download' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/en/privacy' },
    { label: 'Terms of Service', href: '/en/terms' },
    { label: 'Cookie Policy', href: '/en/cookies' },
  ],
};

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, transparent, rgba(5, 10, 24, 0.98) 20%, #050A18 100%)',
        paddingTop: '4rem',
      }}
    >
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(79, 110, 247, 0.3), transparent)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <Link href="/en" className="flex items-center gap-3 mb-4 group w-fit">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="SyncSanctuary logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span
                className="font-semibold text-lg tracking-tight"
                style={{ color: '#F0F4FF' }}
              >
                SyncSanctuary
              </span>
            </Link>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: '#4A5578' }}
            >
              The professional production suite for modern worship.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h3
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: '#4A5578' }}
              >
                {heading}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200"
                      style={{ color: '#4A5578' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#8B9CC8'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#4A5578'; }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(79, 110, 247, 0.08)' }}
        >
          <p className="text-xs" style={{ color: '#2E3A5C' }}>
            © 2026 SyncSanctuary. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: '#2E3A5C' }}>
            Built for the church community
          </p>
        </div>
      </div>
    </footer>
  );
}
