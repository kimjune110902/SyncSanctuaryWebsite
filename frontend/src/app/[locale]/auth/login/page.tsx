"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../../../store/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, CheckCircle, Radio, FileText, Cpu } from 'lucide-react';

/* ─── Styled Input ─── */
function AuthInput({
  label,
  type = 'text',
  placeholder,
  error,
  rightElement,
  ...props
}: {
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
  rightElement?: React.ReactNode;
  [key: string]: unknown;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase tracking-wider" style={{ color: '#4A5578' }}>
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
          style={{
            background: 'rgba(5, 10, 24, 0.6)',
            border: error ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid rgba(79, 110, 247, 0.2)',
            color: '#F0F4FF',
            caretColor: '#4F6EF7',
          }}
          onFocus={(e) => {
            (e.currentTarget as HTMLInputElement).style.border = '1px solid rgba(79, 110, 247, 0.6)';
            (e.currentTarget as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(79, 110, 247, 0.1)';
          }}
          onBlur={(e) => {
            (e.currentTarget as HTMLInputElement).style.border = error ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid rgba(79, 110, 247, 0.2)';
            (e.currentTarget as HTMLInputElement).style.boxShadow = 'none';
          }}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</div>
        )}
      </div>
      {error && (
        <p className="text-xs" style={{ color: '#FCA5A5' }}>{error}</p>
      )}
    </div>
  );
}

/* ─── Value Prop Item ─── */
function ValueProp({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
      >
        <Icon size={14} style={{ color: 'rgba(255,255,255,0.7)' }} />
      </div>
      <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{text}</span>
    </div>
  );
}

/* ─── Main Page ─── */
export default function LoginPage() {
  // ── Backend logic preserved exactly ──
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit } = useForm();
  const { login } = useAuthStore();

  const onSubmit = async (data: Record<string, unknown>) => {
    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const resData = await response.json();
      if (resData.error) {
        setError(resData.error);
      } else {
        login(resData.user, resData.access_token);
        window.location.href = '/en/dashboard';
      }
    } catch {
      setError('An error occurred');
    }
  };

  // ── UI-only state ──
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="min-h-screen flex"
      style={{ backgroundColor: '#050A18' }}
    >
      {/* ── Left Column (40%) — Branding Panel ── */}
      <motion.div
        initial={{ opacity: 0, x: -32 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:flex lg:w-2/5 flex-col justify-between p-12 relative overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #0D1530 0%, #050A18 60%, #0A1128 100%)',
          borderRight: '1px solid rgba(79, 110, 247, 0.12)',
        }}
      >
        {/* Background decorative glows */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(79, 110, 247, 0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(79, 110, 247, 0.06) 0%, transparent 50%)',
          }}
        />

        {/* Decorative grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'linear-gradient(rgba(79, 110, 247, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(79, 110, 247, 0.08) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        {/* Top: Logo */}
        <div className="relative z-10">
          <Link href="/en" className="flex items-center gap-3 w-fit">
            <div className="relative w-9 h-9">
              <Image src="/logo.png" alt="SyncSanctuary" fill className="object-contain" />
            </div>
            <span className="font-semibold text-lg" style={{ color: '#F0F4FF' }}>
              SyncSanctuary
            </span>
          </Link>
        </div>

        {/* Middle: Headline + Value props */}
        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-3xl font-bold leading-tight mb-3" style={{ color: '#F0F4FF' }}>
              Welcome back to
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #93C5FD 0%, #4F6EF7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                your sanctuary.
              </span>
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#4A5578' }}>
              Sign in to access your media suite, sermon archives, and live production tools.
            </p>
          </div>

          <div className="space-y-4">
            <ValueProp icon={Cpu} text="Hardware-accelerated production suite" />
            <ValueProp icon={Radio} text="Live slide control & streaming" />
            <ValueProp icon={FileText} text="Real-time transcription & archives" />
            <ValueProp icon={CheckCircle} text="Trusted by 2,400+ churches worldwide" />
          </div>
        </div>

        {/* Bottom: Testimonial */}
        <div
          className="relative z-10 rounded-2xl p-5"
          style={{
            background: 'rgba(79, 110, 247, 0.08)',
            border: '1px solid rgba(79, 110, 247, 0.15)',
          }}
        >
          <p className="text-sm leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.6)' }}>
            &quot;SyncSanctuary transformed our Sunday production. What used to take a team of 4 now runs smoothly with 2 people.&quot;
          </p>
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: 'rgba(79, 110, 247, 0.3)', color: '#93C5FD' }}
            >
              JK
            </div>
            <div>
              <p className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>James Kim</p>
              <p className="text-xs" style={{ color: '#4A5578' }}>Media Director, Grace Community Church</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Right Column (60%) — Form Area ── */}
      <motion.div
        initial={{ opacity: 0, x: 32 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 lg:w-3/5 flex flex-col items-center justify-center p-8 md:p-12"
      >
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="relative w-8 h-8">
              <Image src="/logo.png" alt="SyncSanctuary" fill className="object-contain" />
            </div>
            <span className="font-semibold text-base" style={{ color: '#F0F4FF' }}>SyncSanctuary</span>
          </div>

          {/* Form header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold mb-2" style={{ color: '#F0F4FF' }}>
              Log in to your account
            </h1>
            <p className="text-sm" style={{ color: '#4A5578' }}>
              Don&apos;t have an account?{' '}
              <Link
                href="/en/auth/signup"
                className="font-semibold transition-colors duration-200"
                style={{ color: '#4F6EF7' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#93C5FD'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#4F6EF7'; }}
              >
                Sign up free
              </Link>
            </p>
          </motion.div>

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                className="mb-6 px-4 py-3 rounded-xl text-sm"
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  color: '#FCA5A5',
                }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Form — backend logic untouched ── */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <AuthInput
              label="Phone number or email"
              type="text"
              placeholder="you@example.com or +1 555 000 0000"
              {...register('identifier')}
            />

            <AuthInput
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Your password"
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="transition-colors duration-200"
                  style={{ color: '#4A5578' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#8B9CC8'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = '#4A5578'; }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              }
              {...register('password')}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    {...register('remember_device')}
                    className="sr-only peer"
                  />
                  <div
                    className="w-4 h-4 rounded peer-checked:border-indigo-500 transition-all duration-200 flex items-center justify-center"
                    style={{
                      background: 'rgba(5, 10, 24, 0.6)',
                      border: '1px solid rgba(79, 110, 247, 0.3)',
                    }}
                  />
                </div>
                <span className="text-xs" style={{ color: '#4A5578' }}>Remember this device</span>
              </label>
              <Link
                href="/en/auth/reset"
                className="text-xs transition-colors duration-200"
                style={{ color: '#4A5578' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#4F6EF7'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#4A5578'; }}
              >
                Forgot password?
              </Link>
            </div>

            <motion.button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 mt-2"
              style={{
                background: 'linear-gradient(135deg, #4F6EF7 0%, #6C8EFF 100%)',
                color: '#FFFFFF',
                boxShadow: '0 0 24px rgba(79, 110, 247, 0.4)',
              }}
              whileHover={{
                boxShadow: '0 0 40px rgba(79, 110, 247, 0.6)',
                y: -1,
              }}
              whileTap={{ scale: 0.98 }}
            >
              Log in
              <ArrowRight size={16} />
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
