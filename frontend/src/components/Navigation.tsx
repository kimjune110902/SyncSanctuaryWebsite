"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Product', href: '/en' },
  { label: 'Features', href: '/en/features' },
  { label: 'Download', href: '/en/download' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div
          className="transition-all duration-500"
          style={{
            background: scrolled
              ? 'rgba(5, 10, 24, 0.85)'
              : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
            borderBottom: scrolled
              ? '1px solid rgba(79, 110, 247, 0.12)'
              : '1px solid transparent',
            boxShadow: scrolled
              ? '0 4px 24px rgba(0,0,0,0.3)'
              : 'none',
          }}
        >
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/en"
              className="flex items-center gap-3 group"
              aria-label="SyncSanctuary Home"
            >
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="SyncSanctuary logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span
                className="font-semibold text-lg tracking-tight"
                style={{ color: '#F0F4FF' }}
              >
                SyncSanctuary
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/en' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group"
                    style={{
                      color: isActive ? '#F0F4FF' : '#8B9CC8',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = '#F0F4FF';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = '#8B9CC8';
                    }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: 'rgba(79, 110, 247, 0.12)' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/en/auth/login"
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
                style={{ color: '#8B9CC8' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#F0F4FF'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#8B9CC8'; }}
              >
                Log In
              </Link>
              <Link
                href="/en/auth/signup"
                className="relative px-5 py-2 text-sm font-semibold rounded-lg overflow-hidden transition-all duration-300 group"
                style={{
                  background: 'linear-gradient(135deg, #4F6EF7 0%, #6C8EFF 100%)',
                  color: '#FFFFFF',
                  boxShadow: '0 0 20px rgba(79, 110, 247, 0.4), 0 4px 12px rgba(0,0,0,0.3)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 32px rgba(79, 110, 247, 0.6), 0 4px 16px rgba(0,0,0,0.4)';
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 20px rgba(79, 110, 247, 0.4), 0 4px 12px rgba(0,0,0,0.3)';
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                }}
              >
                <span className="relative z-10">Get Started</span>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 rounded-lg transition-colors duration-200"
              style={{ color: '#8B9CC8' }}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-16 left-0 right-0 z-40 lg:hidden"
            style={{
              background: 'rgba(5, 10, 24, 0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(79, 110, 247, 0.15)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            }}
          >
            <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className="block px-4 py-3 text-base font-medium rounded-xl transition-all duration-200"
                    style={{
                      color: pathname.startsWith(link.href) ? '#F0F4FF' : '#8B9CC8',
                      background: pathname.startsWith(link.href) ? 'rgba(79, 110, 247, 0.12)' : 'transparent',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-4 pt-4 flex flex-col gap-3" style={{ borderTop: '1px solid rgba(79, 110, 247, 0.12)' }}>
                <Link
                  href="/en/auth/login"
                  className="block px-4 py-3 text-base font-medium rounded-xl text-center transition-all duration-200"
                  style={{ color: '#8B9CC8', border: '1px solid rgba(79, 110, 247, 0.2)' }}
                >
                  Log In
                </Link>
                <Link
                  href="/en/auth/signup"
                  className="block px-4 py-3 text-base font-semibold rounded-xl text-center transition-all duration-200"
                  style={{
                    background: 'linear-gradient(135deg, #4F6EF7 0%, #6C8EFF 100%)',
                    color: '#FFFFFF',
                    boxShadow: '0 0 20px rgba(79, 110, 247, 0.3)',
                  }}
                >
                  Get Started
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
