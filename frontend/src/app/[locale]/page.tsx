"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  Cpu, Radio, FileText, Zap, Shield, Globe,
  Play, Download, ChevronRight, Sparkles
} from 'lucide-react';

/* ─── Animation Helpers ─── */
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
  const inView = useInView(ref, { once: true, margin: '-80px' });
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

/* ─── Dashboard Mockup ─── */
function DashboardMockup() {
  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(10, 17, 40, 0.8)',
        border: '1px solid rgba(79, 110, 247, 0.25)',
        boxShadow:
          '0 0 60px rgba(79, 110, 247, 0.2), 0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
        transform: 'perspective(1200px) rotateX(4deg) rotateY(-4deg)',
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: '1px solid rgba(79, 110, 247, 0.12)', background: 'rgba(5, 10, 24, 0.6)' }}
      >
        <div className="w-3 h-3 rounded-full" style={{ background: '#EF4444' }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#F59E0B' }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#10B981' }} />
        <span className="ml-3 text-xs font-medium" style={{ color: '#4A5578' }}>
          SyncSanctuary — Live Production
        </span>
      </div>

      {/* Content area */}
      <div className="p-4 grid grid-cols-3 gap-3">
        {/* Left panel - slides */}
        <div className="col-span-1 space-y-2">
          <div
            className="text-xs font-semibold uppercase tracking-wider mb-3"
            style={{ color: '#4A5578' }}
          >
            Slides
          </div>
          {[
            { label: 'Welcome', active: true },
            { label: 'Worship Set', active: false },
            { label: 'Sermon', active: false },
            { label: 'Offering', active: false },
          ].map((slide) => (
            <div
              key={slide.label}
              className="px-3 py-2 rounded-lg text-xs font-medium transition-all"
              style={{
                background: slide.active ? 'rgba(79, 110, 247, 0.2)' : 'rgba(13, 21, 48, 0.5)',
                border: slide.active ? '1px solid rgba(79, 110, 247, 0.4)' : '1px solid rgba(79, 110, 247, 0.08)',
                color: slide.active ? '#93C5FD' : '#4A5578',
              }}
            >
              {slide.label}
            </div>
          ))}
        </div>

        {/* Center - preview */}
        <div className="col-span-2 space-y-3">
          <div
            className="w-full aspect-video rounded-xl flex flex-col items-center justify-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #0A1128 0%, #0D1530 100%)',
              border: '1px solid rgba(79, 110, 247, 0.2)',
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(79, 110, 247, 0.08) 0%, transparent 70%)',
              }}
            />
            <p className="text-lg font-bold relative z-10" style={{ color: '#F0F4FF' }}>
              Welcome to
            </p>
            <p className="text-2xl font-black relative z-10 gradient-text-brand" style={{
              background: 'linear-gradient(135deg, #6C8EFF 0%, #4F6EF7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Sunday Service
            </p>
            <div
              className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full"
              style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.3)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#10B981' }} />
              <span className="text-xs font-medium" style={{ color: '#34D399' }}>LIVE</span>
            </div>
          </div>

          {/* Transcription bar */}
          <div
            className="px-3 py-2 rounded-lg text-xs"
            style={{
              background: 'rgba(13, 21, 48, 0.6)',
              border: '1px solid rgba(79, 110, 247, 0.1)',
              color: '#8B9CC8',
            }}
          >
            <span style={{ color: '#4A5578' }}>Transcription: </span>
            &ldquo;...and as we gather together this morning...&rdquo;
            <span className="inline-block w-0.5 h-3 ml-1 animate-pulse" style={{ background: '#4F6EF7', verticalAlign: 'middle' }} />
          </div>
        </div>
      </div>

      {/* Bottom status bar */}
      <div
        className="flex items-center justify-between px-4 py-2 text-xs"
        style={{
          borderTop: '1px solid rgba(79, 110, 247, 0.08)',
          background: 'rgba(5, 10, 24, 0.4)',
          color: '#4A5578',
        }}
      >
        <span>CPU: 12% · GPU: 8%</span>
        <span style={{ color: '#10B981' }}>● All systems nominal</span>
        <span>Streaming: 1080p60</span>
      </div>
    </div>
  );
}

/* ─── Feature Card ─── */
function FeatureCard({
  icon: Icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl p-6 cursor-default"
      style={{
        background: 'rgba(10, 17, 40, 0.6)',
        border: '1px solid rgba(79, 110, 247, 0.12)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'all 0.3s ease',
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.2 },
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(79, 110, 247, 0.35)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 32px rgba(79, 110, 247, 0.15), 0 20px 40px rgba(0,0,0,0.3)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(79, 110, 247, 0.12)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
        style={{
          background: 'rgba(79, 110, 247, 0.12)',
          border: '1px solid rgba(79, 110, 247, 0.2)',
        }}
      >
        <Icon size={22} style={{ color: '#4F6EF7' }} />
      </div>

      <h3 className="text-base font-semibold mb-2" style={{ color: '#F0F4FF' }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: '#4A5578' }}>
        {description}
      </p>
    </motion.div>
  );
}

/* ─── Narrative Row ─── */
function NarrativeRow({
  eyebrow,
  title,
  description,
  reverse = false,
  delay = 0,
}: {
  eyebrow: string;
  title: string;
  description: string;
  reverse?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:flex-row-reverse' : ''}`}
    >
      {/* Text side */}
      <div className={reverse ? 'lg:order-2' : ''}>
        <span
          className="text-xs font-semibold uppercase tracking-widest block mb-3"
          style={{ color: '#4F6EF7' }}
        >
          {eyebrow}
        </span>
        <h3
          className="text-2xl md:text-3xl font-bold mb-4 leading-tight"
          style={{ color: '#F0F4FF' }}
        >
          {title}
        </h3>
        <p className="text-base leading-relaxed" style={{ color: '#4A5578' }}>
          {description}
        </p>
      </div>

      {/* Visual side */}
      <div className={reverse ? 'lg:order-1' : ''}>
        <div
          className="w-full aspect-video rounded-2xl flex items-center justify-center relative overflow-hidden"
          style={{
            background: 'rgba(10, 17, 40, 0.7)',
            border: '1px solid rgba(79, 110, 247, 0.18)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(79, 110, 247, 0.06) 0%, transparent 70%)',
            }}
          />
          <div className="relative z-10 text-center px-8">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{
                background: 'rgba(79, 110, 247, 0.15)',
                border: '1px solid rgba(79, 110, 247, 0.3)',
              }}
            >
              <Sparkles size={28} style={{ color: '#4F6EF7' }} />
            </div>
            <p className="text-sm font-medium" style={{ color: '#4A5578' }}>
              Visual preview coming soon
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Page ─── */
const FEATURES = [
  {
    icon: Cpu,
    title: 'AI-Powered Media',
    description:
      'Intelligent auto-editing, scene detection, and highlight generation powered by on-device AI. No cloud required.',
  },
  {
    icon: Radio,
    title: 'Live Slide Control',
    description:
      'Seamlessly control ProPresenter, EasyWorship, and custom slide decks in real time from a single unified interface.',
  },
  {
    icon: FileText,
    title: 'Real-Time Transcription',
    description:
      'Whisper-powered live transcription with speaker diarization, timestamps, and one-click export to multiple formats.',
  },
  {
    icon: Zap,
    title: 'Hardware Accelerated',
    description:
      'Built on Rust and Tauri for native performance. GPU-accelerated rendering with zero-copy video pipelines.',
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    description:
      'Credentials stored in OS Keychain. All data stays on your hardware. No third-party analytics or tracking.',
  },
  {
    icon: Globe,
    title: 'Multi-Platform',
    description:
      'Native binaries for Windows, macOS (Apple Silicon & Intel), and Linux. One license, every machine.',
  },
];

const NARRATIVE = [
  {
    eyebrow: 'Intelligent Workflow',
    title: 'From rehearsal to broadcast in minutes.',
    description:
      'SyncSanctuary unifies your entire media workflow. Import your worship order, sync your slides, and go live — all from one window. The AI handles the rest, so your team can focus on the message.',
  },
  {
    eyebrow: 'Live Production',
    title: 'Every word, perfectly captured.',
    description:
      'Our real-time transcription engine runs entirely on your hardware using a fine-tuned Whisper model. Get accurate captions, searchable archives, and automated sermon notes — without sending a single byte to the cloud.',
    reverse: true,
  },
  {
    eyebrow: 'Built to Last',
    title: 'Professional-grade reliability for Sunday morning.',
    description:
      'A Rust core means zero garbage collection pauses and deterministic latency. SQLite-backed asset management survives power outages. Your Sunday service never misses a beat.',
  },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div style={{ backgroundColor: '#050A18', minHeight: '100vh' }}>
      <Navigation />

      <main>
        {/* ── Hero ── */}
        <section
          ref={heroRef}
          className="relative min-h-screen flex items-center overflow-hidden pt-16"
        >
          {/* Background radial glows */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(79, 110, 247, 0.14) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 70%, rgba(79, 110, 247, 0.07) 0%, transparent 50%)',
            }}
          />

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            {/* Left: Copy */}
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6"
                  style={{
                    background: 'rgba(79, 110, 247, 0.1)',
                    border: '1px solid rgba(79, 110, 247, 0.25)',
                    color: '#4F6EF7',
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: '#4F6EF7' }}
                  />
                  Church Media Production Platform
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-6"
                style={{ color: '#F0F4FF' }}
              >
                Every sermon,{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #93C5FD 0%, #4F6EF7 60%, #818CF8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  every song.
                </span>
                <br />
                <em className="not-italic" style={{ color: '#8B9CC8' }}>
                  Perfectly captured.
                </em>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="text-lg leading-relaxed mb-8 max-w-lg"
                style={{ color: '#4A5578' }}
              >
                The professional production suite for modern worship. AI-powered editing, live
                slide control, real-time transcription, and professional streaming — unified in
                one hardware-accelerated desktop app.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/en/download"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #4F6EF7 0%, #6C8EFF 100%)',
                    color: '#FFFFFF',
                    boxShadow: '0 0 24px rgba(79, 110, 247, 0.45), 0 4px 16px rgba(0,0,0,0.3)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 40px rgba(79, 110, 247, 0.65), 0 8px 24px rgba(0,0,0,0.4)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 24px rgba(79, 110, 247, 0.45), 0 4px 16px rgba(0,0,0,0.3)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                  }}
                >
                  <Download size={16} />
                  Download Free
                </Link>
                <button
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                  style={{
                    background: 'rgba(79, 110, 247, 0.08)',
                    border: '1px solid rgba(79, 110, 247, 0.25)',
                    color: '#8B9CC8',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(79, 110, 247, 0.15)';
                    (e.currentTarget as HTMLButtonElement).style.color = '#F0F4FF';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(79, 110, 247, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(79, 110, 247, 0.08)';
                    (e.currentTarget as HTMLButtonElement).style.color = '#8B9CC8';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(79, 110, 247, 0.25)';
                  }}
                >
                  <Play size={16} />
                  Watch Demo
                </button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-6 text-xs"
                style={{ color: '#2E3A5C' }}
              >
                Trusted by 2,400+ churches in 48 countries · Free to start
              </motion.p>
            </div>

            {/* Right: Dashboard Mockup */}
            <motion.div
              className="lg:col-span-6"
              initial={{ opacity: 0, y: 48, rotateX: 8 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <DashboardMockup />
            </motion.div>
          </motion.div>
        </section>

        {/* ── Feature Grid ── */}
        <section className="relative py-28 px-6">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(79, 110, 247, 0.05) 0%, transparent 70%)',
            }}
          />
          <div className="max-w-7xl mx-auto relative z-10">
            <FadeUp className="text-center mb-16">
              <span
                className="text-xs font-semibold uppercase tracking-widest block mb-4"
                style={{ color: '#4F6EF7' }}
              >
                Capabilities
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
                style={{ color: '#F0F4FF' }}
              >
                Built for Sunday morning.
                <br />
                <span style={{ color: '#4A5578' }}>Designed for every day.</span>
              </h2>
              <p className="text-base max-w-xl mx-auto" style={{ color: '#4A5578' }}>
                From Wednesday rehearsal to Sunday livestream, SyncSanctuary handles every step
                of your church&apos;s media production workflow.
              </p>
            </FadeUp>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES.map((feat, i) => (
                <FeatureCard key={feat.title} {...feat} delay={i * 0.08} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Narrative Section ── */}
        <section className="relative py-28 px-6">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, transparent, rgba(10, 17, 40, 0.4) 30%, rgba(10, 17, 40, 0.4) 70%, transparent)',
            }}
          />
          <div className="max-w-7xl mx-auto relative z-10 space-y-28">
            <FadeUp className="text-center mb-4">
              <span
                className="text-xs font-semibold uppercase tracking-widest block mb-4"
                style={{ color: '#4F6EF7' }}
              >
                How It Works
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold leading-tight"
                style={{ color: '#F0F4FF' }}
              >
                Scroll-driven storytelling.
              </h2>
            </FadeUp>

            {NARRATIVE.map((item, i) => (
              <NarrativeRow key={item.title} {...item} delay={0.1 * i} />
            ))}
          </div>
        </section>

        {/* ── CTA Section ── */}
        <section className="relative py-28 px-6 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(79, 110, 247, 0.12) 0%, transparent 70%)',
            }}
          />
          <FadeUp className="max-w-3xl mx-auto text-center relative z-10">
            <span
              className="text-xs font-semibold uppercase tracking-widest block mb-4"
              style={{ color: '#4F6EF7' }}
            >
              Get Started
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
              style={{ color: '#F0F4FF' }}
            >
              Ready to transform your
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #93C5FD 0%, #4F6EF7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                church&apos;s media production?
              </span>
            </h2>
            <p className="text-base mb-10" style={{ color: '#4A5578' }}>
              Join thousands of church media teams who trust SyncSanctuary every Sunday.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/en/download"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #4F6EF7 0%, #6C8EFF 100%)',
                  color: '#FFFFFF',
                  boxShadow: '0 0 32px rgba(79, 110, 247, 0.5), 0 8px 24px rgba(0,0,0,0.4)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 48px rgba(79, 110, 247, 0.7), 0 12px 32px rgba(0,0,0,0.5)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 32px rgba(79, 110, 247, 0.5), 0 8px 24px rgba(0,0,0,0.4)';
                }}
              >
                <Download size={16} />
                Download free — it&apos;s free to start
              </Link>
              <button
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300"
                style={{
                  background: 'rgba(79, 110, 247, 0.08)',
                  border: '1px solid rgba(79, 110, 247, 0.25)',
                  color: '#8B9CC8',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(79, 110, 247, 0.15)';
                  (e.currentTarget as HTMLButtonElement).style.color = '#F0F4FF';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'rgba(79, 110, 247, 0.08)';
                  (e.currentTarget as HTMLButtonElement).style.color = '#8B9CC8';
                }}
              >
                <ChevronRight size={16} />
                Talk to our team
              </button>
            </div>
          </FadeUp>
        </section>
      </main>

      <Footer />
    </div>
  );
}
