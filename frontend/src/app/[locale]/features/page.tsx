"use client";
import React, { useRef } from 'react';
import Link from 'next/link';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';
import { motion, useInView } from 'framer-motion';
import {
  Cpu, Database, Lock, Zap, Radio, FileText,
  Activity, Layers, Terminal, GitBranch, Download
} from 'lucide-react';

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

/* ─── Bento Card ─── */
function BentoCard({
  children,
  className = '',
  delay = 0,
  accent = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  accent?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-2xl p-6 overflow-hidden group ${className}`}
      style={{
        background: accent
          ? 'linear-gradient(135deg, rgba(79, 110, 247, 0.18) 0%, rgba(13, 21, 48, 0.8) 100%)'
          : 'rgba(10, 17, 40, 0.7)',
        border: accent
          ? '1px solid rgba(79, 110, 247, 0.35)'
          : '1px solid rgba(79, 110, 247, 0.12)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: accent
          ? '0 0 40px rgba(79, 110, 247, 0.12), 0 20px 40px rgba(0,0,0,0.4)'
          : '0 4px 24px rgba(0,0,0,0.3)',
        transition: 'all 0.3s ease',
      }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(79, 110, 247, 0.4)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 40px rgba(79, 110, 247, 0.18), 0 20px 48px rgba(0,0,0,0.5)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = accent ? 'rgba(79, 110, 247, 0.35)' : 'rgba(79, 110, 247, 0.12)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = accent ? '0 0 40px rgba(79, 110, 247, 0.12), 0 20px 40px rgba(0,0,0,0.4)' : '0 4px 24px rgba(0,0,0,0.3)';
      }}
    >
      {/* Subtle inner glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at top left, rgba(79, 110, 247, 0.05) 0%, transparent 60%)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

/* ─── Tech Pill ─── */
function TechPill({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
      style={{
        background: 'rgba(79, 110, 247, 0.1)',
        border: '1px solid rgba(79, 110, 247, 0.2)',
        color: '#93C5FD',
      }}
    >
      {label}
    </span>
  );
}

/* ─── Metric Block ─── */
function MetricBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div
        className="text-3xl font-black mb-1"
        style={{
          background: 'linear-gradient(135deg, #93C5FD 0%, #4F6EF7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {value}
      </div>
      <div className="text-xs font-medium" style={{ color: '#4A5578' }}>
        {label}
      </div>
    </div>
  );
}

/* ─── Code Snippet ─── */
function CodeSnippet({ lines }: { lines: { indent?: number; keyword?: string; text: string; comment?: string }[] }) {
  return (
    <div
      className="rounded-xl p-4 font-mono text-xs leading-relaxed overflow-hidden"
      style={{
        background: 'rgba(5, 10, 24, 0.8)',
        border: '1px solid rgba(79, 110, 247, 0.12)',
      }}
    >
      {lines.map((line, i) => (
        <div key={i} style={{ paddingLeft: `${(line.indent || 0) * 16}px` }}>
          {line.keyword && (
            <span style={{ color: '#818CF8' }}>{line.keyword} </span>
          )}
          <span style={{ color: '#8B9CC8' }}>{line.text}</span>
          {line.comment && (
            <span style={{ color: '#2E3A5C' }}>{' // '}{line.comment}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default function FeaturesPage() {
  return (
    <div style={{ backgroundColor: '#050A18', minHeight: '100vh' }}>
      <Navigation />

      <main className="pt-24 pb-20">
        {/* ── Page Header ── */}
        <FadeUp className="max-w-7xl mx-auto px-6 text-center mb-20">
          <span
            className="text-xs font-semibold uppercase tracking-widest block mb-4"
            style={{ color: '#4F6EF7' }}
          >
            Technical Architecture
          </span>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            style={{ color: '#F0F4FF' }}
          >
            Engineered for
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #93C5FD 0%, #4F6EF7 60%, #818CF8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              peak performance.
            </span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#4A5578' }}>
            Four technical pillars that make SyncSanctuary the most reliable, performant, and
            secure church media platform ever built.
          </p>
        </FadeUp>

        {/* ── Bento Grid ── */}
        <div className="max-w-7xl mx-auto px-6">

          {/* Row 1: Rust/Tauri Core (large) + Metrics (small) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

            {/* Pillar 1: Rust/Tauri Core — large card */}
            <BentoCard className="lg:col-span-2" delay={0.05} accent>
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(79, 110, 247, 0.2)',
                    border: '1px solid rgba(79, 110, 247, 0.35)',
                  }}
                >
                  <Cpu size={22} style={{ color: '#4F6EF7' }} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold" style={{ color: '#F0F4FF' }}>
                      Rust / Tauri Core
                    </h2>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34D399', border: '1px solid rgba(16, 185, 129, 0.25)' }}
                    >
                      Pillar I
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: '#4A5578' }}>
                    Hardware-accelerated native desktop application
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-6" style={{ color: '#8B9CC8' }}>
                The entire processing pipeline is written in Rust — zero garbage collection, deterministic latency,
                and memory safety without a runtime. Tauri provides a minimal WebView shell that consumes{' '}
                <span style={{ color: '#93C5FD' }}>10× less RAM</span> than Electron while delivering native OS
                integration, hardware GPU access, and sub-millisecond IPC.
              </p>

              <CodeSnippet
                lines={[
                  { keyword: 'fn', text: 'process_video_frame(frame: &VideoFrame) -> Result<()> {', comment: 'zero-copy' },
                  { indent: 1, keyword: 'let', text: 'gpu = GpuContext::acquire()?;' },
                  { indent: 1, keyword: 'let', text: 'encoded = gpu.encode_h264(frame, Preset::UltraFast)?;' },
                  { indent: 1, text: 'pipeline.push(encoded);', comment: 'lock-free SPSC queue' },
                  { indent: 1, keyword: 'Ok', text: '(())' },
                  { text: '}' },
                ]}
              />

              <div className="flex flex-wrap gap-2 mt-5">
                {['Rust 1.78', 'Tauri v2', 'WGPU', 'H.264/HEVC', 'NVENC / VideoToolbox'].map((t) => (
                  <TechPill key={t} label={t} />
                ))}
              </div>
            </BentoCard>

            {/* Performance Metrics */}
            <BentoCard delay={0.1}>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(79, 110, 247, 0.12)', border: '1px solid rgba(79, 110, 247, 0.2)' }}
                >
                  <Activity size={18} style={{ color: '#4F6EF7' }} />
                </div>
                <div>
                  <h3 className="text-sm font-bold" style={{ color: '#F0F4FF' }}>Performance</h3>
                  <p className="text-xs" style={{ color: '#4A5578' }}>Benchmarked on M2 Pro</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <MetricBlock value="&lt;2ms" label="Frame latency" />
                <MetricBlock value="12%" label="CPU at 1080p60" />
                <MetricBlock value="10×" label="Less RAM vs Electron" />
                <MetricBlock value="0" label="GC pauses" />
              </div>

              <div
                className="rounded-xl p-3 text-xs"
                style={{
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.15)',
                  color: '#34D399',
                }}
              >
                <span style={{ color: '#4A5578' }}>Status: </span>
                All systems nominal · 99.97% uptime
              </div>
            </BentoCard>
          </div>

          {/* Row 2: Real-Time UI + SQLite Assets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

            {/* Pillar 2: Real-Time UI */}
            <BentoCard delay={0.15}>
              <div className="flex items-start gap-4 mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(79, 110, 247, 0.12)',
                    border: '1px solid rgba(79, 110, 247, 0.2)',
                  }}
                >
                  <Radio size={22} style={{ color: '#4F6EF7' }} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-bold" style={{ color: '#F0F4FF' }}>
                      Real-Time UI
                    </h2>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: 'rgba(79, 110, 247, 0.15)', color: '#93C5FD', border: '1px solid rgba(79, 110, 247, 0.25)' }}
                    >
                      Pillar II
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: '#4A5578' }}>
                    60fps reactive interface with zero-jank rendering
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-5" style={{ color: '#8B9CC8' }}>
                The UI layer runs on a dedicated thread with a lock-free event bus connecting Rust
                backend signals to React components. Slide transitions, live waveforms, and
                transcription overlays all update at 60fps without blocking the media pipeline.
              </p>

              {/* Live waveform visualization */}
              <div
                className="rounded-xl p-4 flex items-end gap-1 h-20 overflow-hidden"
                style={{
                  background: 'rgba(5, 10, 24, 0.6)',
                  border: '1px solid rgba(79, 110, 247, 0.1)',
                }}
              >
                {Array.from({ length: 32 }).map((_, i) => {
                  const h = 20 + Math.sin(i * 0.8) * 15 + Math.cos(i * 0.4) * 10 + Math.random() * 8;
                  return (
                    <div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{
                        height: `${Math.max(8, h)}%`,
                        background: i % 3 === 0
                          ? 'rgba(79, 110, 247, 0.7)'
                          : i % 3 === 1
                          ? 'rgba(79, 110, 247, 0.4)'
                          : 'rgba(79, 110, 247, 0.2)',
                      }}
                    />
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {['React 18', 'Framer Motion', 'WebSocket', 'Tauri IPC'].map((t) => (
                  <TechPill key={t} label={t} />
                ))}
              </div>
            </BentoCard>

            {/* Pillar 3: SQLite Assets */}
            <BentoCard delay={0.2}>
              <div className="flex items-start gap-4 mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(79, 110, 247, 0.12)',
                    border: '1px solid rgba(79, 110, 247, 0.2)',
                  }}
                >
                  <Database size={22} style={{ color: '#4F6EF7' }} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-bold" style={{ color: '#F0F4FF' }}>
                      SQLite Asset Store
                    </h2>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: 'rgba(79, 110, 247, 0.15)', color: '#93C5FD', border: '1px solid rgba(79, 110, 247, 0.25)' }}
                    >
                      Pillar III
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: '#4A5578' }}>
                    Crash-resilient local-first storage
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-5" style={{ color: '#8B9CC8' }}>
                All media assets, sermon archives, and configuration are stored in a WAL-mode
                SQLite database. Atomic transactions survive power outages. Full-text search
                across years of transcriptions in under 50ms.
              </p>

              {/* Schema visualization */}
              <div className="space-y-2">
                {[
                  { table: 'sermons', cols: ['id', 'title', 'date', 'transcript_id'], color: '#4F6EF7' },
                  { table: 'media_assets', cols: ['id', 'path', 'checksum', 'sermon_id'], color: '#818CF8' },
                  { table: 'slides', cols: ['id', 'content', 'order', 'sermon_id'], color: '#6C8EFF' },
                ].map((t) => (
                  <div
                    key={t.table}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg"
                    style={{ background: 'rgba(5, 10, 24, 0.5)', border: '1px solid rgba(79, 110, 247, 0.08)' }}
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: t.color }}
                    />
                    <span className="text-xs font-mono font-semibold" style={{ color: '#93C5FD', minWidth: '100px' }}>
                      {t.table}
                    </span>
                    <span className="text-xs font-mono" style={{ color: '#4A5578' }}>
                      {t.cols.join(', ')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {['SQLite WAL', 'Full-Text Search', 'ACID', 'rusqlite'].map((t) => (
                  <TechPill key={t} label={t} />
                ))}
              </div>
            </BentoCard>
          </div>

          {/* Row 3: OS Keychain (large) + Additional features */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

            {/* Pillar 4: OS Keychain */}
            <BentoCard delay={0.25} accent>
              <div className="flex items-start gap-4 mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(79, 110, 247, 0.2)',
                    border: '1px solid rgba(79, 110, 247, 0.35)',
                  }}
                >
                  <Lock size={22} style={{ color: '#4F6EF7' }} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-lg font-bold" style={{ color: '#F0F4FF' }}>
                      OS Keychain Security
                    </h2>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34D399', border: '1px solid rgba(16, 185, 129, 0.25)' }}
                    >
                      Pillar IV
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: '#4A5578' }}>
                    Zero plaintext credentials, ever
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-5" style={{ color: '#8B9CC8' }}>
                All credentials are stored exclusively in the OS-native secure enclave — macOS
                Keychain, Windows Credential Manager, and libsecret on Linux. No plaintext
                config files. No third-party password vaults. Your keys never leave your hardware.
              </p>

              <div className="space-y-3">
                {[
                  { os: 'macOS', store: 'Keychain Services', icon: '🍎' },
                  { os: 'Windows', store: 'Credential Manager', icon: '🪟' },
                  { os: 'Linux', store: 'libsecret / GNOME Keyring', icon: '🐧' },
                ].map((item) => (
                  <div
                    key={item.os}
                    className="flex items-center justify-between px-4 py-3 rounded-xl"
                    style={{
                      background: 'rgba(5, 10, 24, 0.5)',
                      border: '1px solid rgba(79, 110, 247, 0.1)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-base">{item.icon}</span>
                      <span className="text-sm font-semibold" style={{ color: '#F0F4FF' }}>
                        {item.os}
                      </span>
                    </div>
                    <span className="text-xs font-mono" style={{ color: '#4A5578' }}>
                      {item.store}
                    </span>
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: '#10B981', boxShadow: '0 0 6px rgba(16, 185, 129, 0.5)' }}
                    />
                  </div>
                ))}
              </div>
            </BentoCard>

            {/* Transcription Feature */}
            <BentoCard delay={0.3}>
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(79, 110, 247, 0.12)', border: '1px solid rgba(79, 110, 247, 0.2)' }}
                >
                  <FileText size={18} style={{ color: '#4F6EF7' }} />
                </div>
                <div>
                  <h3 className="text-sm font-bold" style={{ color: '#F0F4FF' }}>Real-Time Transcription</h3>
                  <p className="text-xs" style={{ color: '#4A5578' }}>Whisper on-device · No cloud</p>
                </div>
              </div>

              <div
                className="rounded-xl p-4 mb-4 text-xs leading-relaxed font-mono"
                style={{
                  background: 'rgba(5, 10, 24, 0.6)',
                  border: '1px solid rgba(79, 110, 247, 0.1)',
                  color: '#8B9CC8',
                }}
              >
                <div style={{ color: '#4A5578' }} className="mb-2">00:12:34 → 00:12:41</div>
                <div>
                  &quot;...and as we gather together this morning, let us remember that{' '}
                  <span style={{ color: '#93C5FD' }}>faith</span> is not the absence of doubt...&quot;
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: '#10B981' }}
                  />
                  <span style={{ color: '#34D399' }}>Transcribing live...</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {['Whisper v3', '98.4% accuracy', '40+ languages'].map((t) => (
                  <TechPill key={t} label={t} />
                ))}
              </div>
            </BentoCard>

            {/* Open Source / Extensibility */}
            <BentoCard delay={0.35}>
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(79, 110, 247, 0.12)', border: '1px solid rgba(79, 110, 247, 0.2)' }}
                >
                  <GitBranch size={18} style={{ color: '#4F6EF7' }} />
                </div>
                <div>
                  <h3 className="text-sm font-bold" style={{ color: '#F0F4FF' }}>Plugin Architecture</h3>
                  <p className="text-xs" style={{ color: '#4A5578' }}>Extend with Lua or WASM</p>
                </div>
              </div>

              <p className="text-sm leading-relaxed mb-4" style={{ color: '#8B9CC8' }}>
                A sandboxed plugin runtime lets your team build custom integrations — from
                ProPresenter bridges to custom AI models — without touching the core.
              </p>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: Layers, label: 'Plugins' },
                  { icon: Terminal, label: 'CLI API' },
                  { icon: Zap, label: 'Webhooks' },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl"
                    style={{
                      background: 'rgba(5, 10, 24, 0.5)',
                      border: '1px solid rgba(79, 110, 247, 0.08)',
                    }}
                  >
                    <Icon size={16} style={{ color: '#4F6EF7' }} />
                    <span className="text-xs font-medium" style={{ color: '#4A5578' }}>{label}</span>
                  </div>
                ))}
              </div>
            </BentoCard>
          </div>

          {/* CTA Row */}
          <FadeUp delay={0.1}>
            <div
              className="rounded-2xl p-8 text-center relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(79, 110, 247, 0.12) 0%, rgba(13, 21, 48, 0.8) 100%)',
                border: '1px solid rgba(79, 110, 247, 0.25)',
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(79, 110, 247, 0.08) 0%, transparent 70%)',
                }}
              />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#F0F4FF' }}>
                  Ready to experience the difference?
                </h3>
                <p className="text-sm mb-6" style={{ color: '#4A5578' }}>
                  Download SyncSanctuary free and see why 2,400+ churches trust it every Sunday.
                </p>
                <Link
                  href="/en/download"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #4F6EF7 0%, #6C8EFF 100%)',
                    color: '#FFFFFF',
                    boxShadow: '0 0 24px rgba(79, 110, 247, 0.4)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 40px rgba(79, 110, 247, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 24px rgba(79, 110, 247, 0.4)';
                  }}
                >
                  <Download size={16} />
                  Download Free
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </main>

      <Footer />
    </div>
  );
}
