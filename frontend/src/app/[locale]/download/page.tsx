"use client";
import React, { useEffect, useState, useRef } from 'react';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import { motion, useInView } from 'framer-motion';
import { Download, Monitor, Apple, Terminal, Shield, CheckCircle, ChevronRight } from 'lucide-react';

/* ─── Animation Helper ─── */
function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Platform Card ─── */
function PlatformCard({
  icon: Icon,
  platform,
  version,
  releaseDate,
  size,
  format,
  isRecommended,
  children,
  delay = 0,
  onDownload,
}: {
  icon: React.ElementType;
  platform: string;
  version: string;
  releaseDate: string;
  size: string;
  format: string;
  isRecommended: boolean;
  children?: React.ReactNode;
  delay?: number;
  onDownload?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: isRecommended
          ? 'linear-gradient(160deg, rgba(79, 110, 247, 0.18) 0%, rgba(10, 17, 40, 0.85) 60%)'
          : 'rgba(10, 17, 40, 0.7)',
        border: isRecommended
          ? '1px solid rgba(79, 110, 247, 0.45)'
          : '1px solid rgba(79, 110, 247, 0.12)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: isRecommended
          ? '0 0 48px rgba(79, 110, 247, 0.2), 0 24px 60px rgba(0,0,0,0.5)'
          : '0 4px 24px rgba(0,0,0,0.3)',
        transform: isRecommended ? 'scale(1.02)' : 'scale(1)',
        transition: 'all 0.3s ease',
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(79, 110, 247, 0.5)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 60px rgba(79, 110, 247, 0.25), 0 32px 80px rgba(0,0,0,0.6)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = isRecommended ? 'rgba(79, 110, 247, 0.45)' : 'rgba(79, 110, 247, 0.12)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = isRecommended ? '0 0 48px rgba(79, 110, 247, 0.2), 0 24px 60px rgba(0,0,0,0.5)' : '0 4px 24px rgba(0,0,0,0.3)';
      }}
    >
      {/* Recommended badge */}
      {isRecommended && (
        <div
          className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#34D399',
          }}
        >
          <CheckCircle size={11} />
          Recommended for you
        </div>
      )}

      <div className="p-8 flex flex-col flex-1">
        {/* Icon + Platform name */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{
              background: isRecommended ? 'rgba(79, 110, 247, 0.2)' : 'rgba(79, 110, 247, 0.1)',
              border: '1px solid rgba(79, 110, 247, 0.25)',
            }}
          >
            <Icon size={26} style={{ color: '#4F6EF7' }} />
          </div>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: '#F0F4FF' }}>
              {platform}
            </h2>
            <p className="text-xs font-mono" style={{ color: '#4A5578' }}>
              {version} · {releaseDate}
            </p>
          </div>
        </div>

        {/* Optional variant selector (macOS/Linux) */}
        {children && <div className="mb-6">{children}</div>}

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { label: 'Size', value: size },
            { label: 'Format', value: format },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="px-3 py-2 rounded-xl"
              style={{
                background: 'rgba(5, 10, 24, 0.5)',
                border: '1px solid rgba(79, 110, 247, 0.08)',
              }}
            >
              <div className="text-xs" style={{ color: '#2E3A5C' }}>{label}</div>
              <div className="text-sm font-semibold font-mono" style={{ color: '#8B9CC8' }}>
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Download CTA */}
        <div className="mt-auto">
          <button
            onClick={onDownload}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300"
            style={{
              background: isRecommended
                ? 'linear-gradient(135deg, #4F6EF7 0%, #6C8EFF 100%)'
                : 'rgba(79, 110, 247, 0.12)',
              color: isRecommended ? '#FFFFFF' : '#8B9CC8',
              border: isRecommended ? 'none' : '1px solid rgba(79, 110, 247, 0.2)',
              boxShadow: isRecommended ? '0 0 24px rgba(79, 110, 247, 0.4)' : 'none',
            }}
            onMouseEnter={(e) => {
              if (isRecommended) {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 40px rgba(79, 110, 247, 0.6)';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
              } else {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(79, 110, 247, 0.2)';
                (e.currentTarget as HTMLButtonElement).style.color = '#F0F4FF';
              }
            }}
            onMouseLeave={(e) => {
              if (isRecommended) {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 24px rgba(79, 110, 247, 0.4)';
                (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
              } else {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(79, 110, 247, 0.12)';
                (e.currentTarget as HTMLButtonElement).style.color = '#8B9CC8';
              }
            }}
          >
            <Download size={16} />
            Download for {platform}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Variant Selector ─── */
function VariantSelector({
  options,
  selected,
  onChange,
}: {
  options: string[];
  selected: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      className="flex rounded-xl p-1 gap-1"
      style={{ background: 'rgba(5, 10, 24, 0.6)', border: '1px solid rgba(79, 110, 247, 0.1)' }}
    >
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className="flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-200"
          style={{
            background: selected === opt ? 'rgba(79, 110, 247, 0.2)' : 'transparent',
            color: selected === opt ? '#93C5FD' : '#4A5578',
            border: selected === opt ? '1px solid rgba(79, 110, 247, 0.3)' : '1px solid transparent',
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

/* ─── Main Page ─── */
export default function DownloadPage() {
  // ── Backend logic preserved exactly ──
  const [os, setOs] = useState<'windows' | 'macos' | 'linux' | 'unknown'>('unknown');
  const [macVariant, setMacVariant] = useState('Apple Silicon');
  const [linuxVariant, setLinuxVariant] = useState('AppImage');

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    if (userAgent.indexOf("Win") !== -1) setOs("windows");
    else if (userAgent.indexOf("Mac") !== -1) setOs("macos");
    else if (userAgent.indexOf("Linux") !== -1) setOs("linux");
  }, []);

  const linuxFormats: Record<string, string> = {
    AppImage: '.AppImage',
    '.deb': '.deb',
    '.rpm': '.rpm',
  };

  return (
    <div style={{ backgroundColor: '#050A18', minHeight: '100vh' }}>
      <Navigation />

      <main className="pt-24 pb-20">
        {/* Background glow */}
        <div
          className="absolute top-0 left-0 right-0 h-96 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(79, 110, 247, 0.1) 0%, transparent 70%)',
          }}
        />

        {/* ── Header ── */}
        <FadeUp className="max-w-7xl mx-auto px-6 text-center mb-16 relative z-10">
          <span
            className="text-xs font-semibold uppercase tracking-widest block mb-4"
            style={{ color: '#4F6EF7' }}
          >
            Free Download
          </span>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
            style={{ color: '#F0F4FF' }}
          >
            Download{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #93C5FD 0%, #4F6EF7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              SyncSanctuary
            </span>
          </h1>
          <p className="text-lg" style={{ color: '#4A5578' }}>
            Available for Windows, macOS, and Linux. Free to start.
          </p>
        </FadeUp>

        {/* ── Platform Cards ── */}
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

            {/* Windows */}
            <PlatformCard
              icon={Monitor}
              platform="Windows"
              version="Version 1.2.3"
              releaseDate="Jan 15, 2024"
              size="124 MB"
              format=".exe installer"
              isRecommended={os === 'windows'}
              delay={0.05}
            />

            {/* macOS */}
            <PlatformCard
              icon={Apple}
              platform="macOS"
              version="Version 1.2.3"
              releaseDate="Jan 15, 2024"
              size={macVariant === 'Apple Silicon' ? '145 MB' : '152 MB'}
              format=".dmg disk image"
              isRecommended={os === 'macos'}
              delay={0.12}
            >
              <VariantSelector
                options={['Apple Silicon', 'Intel']}
                selected={macVariant}
                onChange={setMacVariant}
              />
            </PlatformCard>

            {/* Linux */}
            <PlatformCard
              icon={Terminal}
              platform="Linux"
              version="Version 1.2.3"
              releaseDate="Jan 15, 2024"
              size="98 MB"
              format={linuxFormats[linuxVariant] || '.AppImage'}
              isRecommended={os === 'linux'}
              delay={0.19}
            >
              <VariantSelector
                options={['AppImage', '.deb', '.rpm']}
                selected={linuxVariant}
                onChange={setLinuxVariant}
              />
            </PlatformCard>
          </div>

          {/* ── Trust Indicators ── */}
          <FadeUp delay={0.1} className="mt-16">
            <div
              className="rounded-2xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8"
              style={{
                background: 'rgba(10, 17, 40, 0.6)',
                border: '1px solid rgba(79, 110, 247, 0.1)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {[
                {
                  icon: Shield,
                  title: 'Verified & Signed',
                  desc: 'All binaries are code-signed and notarized. SHA-256 checksums available for integrity verification.',
                },
                {
                  icon: Download,
                  title: 'Always Up to Date',
                  desc: 'Auto-update built in. SyncSanctuary silently updates in the background between services.',
                },
                {
                  icon: CheckCircle,
                  title: 'Free to Start',
                  desc: 'Core features are completely free. No credit card required. Upgrade when your team is ready.',
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: 'rgba(79, 110, 247, 0.12)', border: '1px solid rgba(79, 110, 247, 0.2)' }}
                  >
                    <Icon size={18} style={{ color: '#4F6EF7' }} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-1" style={{ color: '#F0F4FF' }}>
                      {title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: '#4A5578' }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* ── System Requirements ── */}
          <FadeUp delay={0.15} className="mt-8">
            <div
              className="rounded-2xl p-8"
              style={{
                background: 'rgba(10, 17, 40, 0.5)',
                border: '1px solid rgba(79, 110, 247, 0.08)',
              }}
            >
              <h3
                className="text-sm font-semibold uppercase tracking-widest mb-6"
                style={{ color: '#4A5578' }}
              >
                System Requirements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    platform: 'Windows',
                    reqs: ['Windows 10 (64-bit) or later', '8 GB RAM minimum', 'DirectX 11 compatible GPU', '2 GB free disk space'],
                  },
                  {
                    platform: 'macOS',
                    reqs: ['macOS 12 Monterey or later', '8 GB RAM minimum', 'Apple Silicon or Intel Core i5+', '2 GB free disk space'],
                  },
                  {
                    platform: 'Linux',
                    reqs: ['Ubuntu 22.04 / Fedora 38+', '8 GB RAM minimum', 'OpenGL 3.3+ GPU', 'GLIBC 2.35 or later'],
                  },
                ].map(({ platform, reqs }) => (
                  <div key={platform}>
                    <h4 className="text-xs font-semibold mb-3" style={{ color: '#8B9CC8' }}>
                      {platform}
                    </h4>
                    <ul className="space-y-1.5">
                      {reqs.map((req) => (
                        <li key={req} className="flex items-center gap-2 text-xs" style={{ color: '#4A5578' }}>
                          <ChevronRight size={10} style={{ color: '#2E3A5C', flexShrink: 0 }} />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </main>

      <Footer />
    </div>
  );
}
