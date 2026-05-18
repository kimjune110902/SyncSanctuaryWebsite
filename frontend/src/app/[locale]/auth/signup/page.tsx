"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../../../store/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, ArrowLeft, CheckCircle, Radio, FileText, Cpu, Phone, Shield, User, Lock } from 'lucide-react';

/* ─── Step Config ─── */
const STEPS = [
  { id: 1, label: 'Phone', icon: Phone, title: 'Enter your phone number', desc: "We'll send you a verification code." },
  { id: 2, label: 'Verify', icon: Shield, title: 'Verify your phone', desc: 'Enter the 6-digit code we sent you.' },
  { id: 3, label: 'Username', icon: User, title: 'Choose your username', desc: 'Your unique display name. 3–32 characters.' },
  { id: 4, label: 'Password', icon: Lock, title: 'Create your password', desc: 'Use a strong, unique password.' },
  { id: 5, label: 'Finish', icon: CheckCircle, title: 'Almost done!', desc: 'Review and accept our terms.' },
];

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

/* ─── Progress Stepper ─── */
function StepProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => {
        const stepNum = i + 1;
        const isComplete = stepNum < current;
        const isActive = stepNum === current;
        return (
          <React.Fragment key={stepNum}>
            <div
              className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all duration-300"
              style={{
                background: isComplete
                  ? 'rgba(16, 185, 129, 0.2)'
                  : isActive
                  ? 'rgba(79, 110, 247, 0.25)'
                  : 'rgba(5, 10, 24, 0.6)',
                border: isComplete
                  ? '1px solid rgba(16, 185, 129, 0.4)'
                  : isActive
                  ? '1px solid rgba(79, 110, 247, 0.5)'
                  : '1px solid rgba(79, 110, 247, 0.1)',
                color: isComplete ? '#34D399' : isActive ? '#93C5FD' : '#2E3A5C',
              }}
            >
              {isComplete ? <CheckCircle size={13} /> : stepNum}
            </div>
            {i < total - 1 && (
              <div
                className="flex-1 h-px transition-all duration-500"
                style={{
                  background: stepNum < current
                    ? 'rgba(16, 185, 129, 0.4)'
                    : 'rgba(79, 110, 247, 0.1)',
                }}
              />
            )}
          </React.Fragment>
        );
      })}
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
export default function SignupPage() {
  // ── Backend logic preserved exactly ──
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [phoneVerifiedToken, setPhoneVerifiedToken] = useState<string | null>(null);
  const { register, handleSubmit } = useForm();
  const { login } = useAuthStore();

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const onSubmit = async (data: Record<string, unknown>) => {
    if (step === 1) {
      try {
        const res = await fetch('/api/v1/auth/signup/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone_number: data.phone_number })
        });
        if (res.ok) {
          setError(null);
          nextStep();
        } else {
          const body = await res.json();
          setError(body.error || 'Error sending OTP');
        }
      } catch {
        setError('Network error');
      }
      return;
    }

    if (step === 2) {
      try {
        const res = await fetch('/api/v1/auth/signup/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone_number: data.phone_number, otp: data.otp })
        });
        if (res.ok) {
          const body = await res.json();
          setPhoneVerifiedToken(body.phone_verified_token);
          setError(null);
          nextStep();
        } else {
          const body = await res.json();
          setError(body.error || 'Invalid OTP');
        }
      } catch {
        setError('Network error');
      }
      return;
    }

    if (step < 5) {
      nextStep();
      return;
    }

    try {
      const response = await fetch('/api/v1/auth/signup/create-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          phone_verified_token: phoneVerifiedToken,
          client_type: 'web'
        })
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
  const currentStepConfig = STEPS[step - 1];

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
              Join 2,400+ churches
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #93C5FD 0%, #4F6EF7 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                already using Sync.
              </span>
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#4A5578' }}>
              Create your free account and transform your church&apos;s media production in minutes.
            </p>
          </div>

          <div className="space-y-4">
            <ValueProp icon={Cpu} text="Hardware-accelerated production suite" />
            <ValueProp icon={Radio} text="Live slide control & streaming" />
            <ValueProp icon={FileText} text="Real-time transcription & archives" />
            <ValueProp icon={CheckCircle} text="Free to start — no credit card needed" />
          </div>
        </div>

        {/* Bottom: Step indicator on left panel */}
        <div className="relative z-10">
          <div
            className="rounded-2xl p-5"
            style={{
              background: 'rgba(79, 110, 247, 0.08)',
              border: '1px solid rgba(79, 110, 247, 0.15)',
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#4A5578' }}>
              Setup progress
            </p>
            <div className="space-y-2">
              {STEPS.map((s) => (
                <div key={s.id} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      background: s.id < step
                        ? 'rgba(16, 185, 129, 0.2)'
                        : s.id === step
                        ? 'rgba(79, 110, 247, 0.25)'
                        : 'transparent',
                      border: s.id < step
                        ? '1px solid rgba(16, 185, 129, 0.4)'
                        : s.id === step
                        ? '1px solid rgba(79, 110, 247, 0.5)'
                        : '1px solid rgba(79, 110, 247, 0.1)',
                    }}
                  >
                    {s.id < step ? (
                      <CheckCircle size={10} style={{ color: '#34D399' }} />
                    ) : (
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: s.id === step ? '#4F6EF7' : 'rgba(79, 110, 247, 0.2)',
                        }}
                      />
                    )}
                  </div>
                  <span
                    className="text-xs font-medium transition-colors duration-300"
                    style={{
                      color: s.id < step ? '#34D399' : s.id === step ? '#93C5FD' : '#2E3A5C',
                    }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
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

          {/* Progress stepper */}
          <StepProgress current={step} total={5} />

          {/* Step header */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`header-${step}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#4F6EF7' }}>
                  Step {step} of 5
                </span>
              </div>
              <h1 className="text-2xl font-bold mb-1" style={{ color: '#F0F4FF' }}>
                {currentStepConfig.title}
              </h1>
              <p className="text-sm" style={{ color: '#4A5578' }}>
                {currentStepConfig.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                className="mb-5 px-4 py-3 rounded-xl text-sm"
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
            <AnimatePresence mode="wait">
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {step === 1 && (
                  <AuthInput
                    label="Phone Number"
                    type="tel"
                    placeholder="+82 10 1234 5678"
                    {...register('phone_number')}
                  />
                )}

                {step === 2 && (
                  <AuthInput
                    label="Verification Code"
                    type="text"
                    placeholder="123456"
                    {...register('otp')}
                  />
                )}

                {step === 3 && (
                  <AuthInput
                    label="Username"
                    type="text"
                    placeholder="your_username"
                    {...register('username')}
                  />
                )}

                {step === 4 && (
                  <AuthInput
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    rightElement={
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
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
                )}

                {step === 5 && (
                  <div
                    className="rounded-2xl p-5"
                    style={{
                      background: 'rgba(10, 17, 40, 0.6)',
                      border: '1px solid rgba(79, 110, 247, 0.15)',
                    }}
                  >
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative mt-0.5">
                        <input
                          type="checkbox"
                          {...register('consent')}
                          className="sr-only peer"
                        />
                        <div
                          className="w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200"
                          style={{
                            background: 'rgba(5, 10, 24, 0.6)',
                            border: '1px solid rgba(79, 110, 247, 0.3)',
                          }}
                        />
                      </div>
                      <span className="text-sm leading-relaxed" style={{ color: '#8B9CC8' }}>
                        I agree to the{' '}
                        <Link href="/en/terms" className="transition-colors duration-200" style={{ color: '#4F6EF7' }}>
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/en/privacy" className="transition-colors duration-200" style={{ color: '#4F6EF7' }}>
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="flex items-center gap-3 pt-2">
              {step > 1 && (
                <motion.button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{
                    background: 'rgba(79, 110, 247, 0.08)',
                    border: '1px solid rgba(79, 110, 247, 0.2)',
                    color: '#8B9CC8',
                  }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(79, 110, 247, 0.15)';
                    (e.currentTarget as HTMLButtonElement).style.color = '#F0F4FF';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'rgba(79, 110, 247, 0.08)';
                    (e.currentTarget as HTMLButtonElement).style.color = '#8B9CC8';
                  }}
                >
                  <ArrowLeft size={15} />
                  Back
                </motion.button>
              )}

              <motion.button
                type="submit"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
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
                {step === 5 ? 'Create Account' : 'Continue'}
                <ArrowRight size={15} />
              </motion.button>
            </div>
          </form>

          {/* Sign in link */}
          <p className="text-center text-sm mt-6" style={{ color: '#4A5578' }}>
            Already have an account?{' '}
            <Link
              href="/en/auth/login"
              className="font-semibold transition-colors duration-200"
              style={{ color: '#4F6EF7' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#93C5FD'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#4F6EF7'; }}
            >
              Log in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
