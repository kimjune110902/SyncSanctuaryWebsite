"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../../../store/auth';
import Link from 'next/link';

export default function SignupPage() {
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
        window.location.href = '/dashboard';
      }
    } catch {
      setError('An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-bg-muted flex lg:flex-row flex-col">
      <div className="lg:w-2/5 bg-brand-900 text-white p-12 lg:p-20 flex flex-col justify-center">
         <div className="mb-12">
            <h2 className="text-4xl font-display font-medium mb-4">Join SyncSanctuary</h2>
            <p className="text-brand-200 text-lg">The professional production suite for modern worship.</p>
         </div>
         <ul className="space-y-6 text-brand-100 mb-12">
            <li className="flex items-start"><span className="text-status-success-text bg-status-success-bg/20 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">✓</span> AI-powered video editing</li>
            <li className="flex items-start"><span className="text-status-success-text bg-status-success-bg/20 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">✓</span> Multi-display presentation control</li>
            <li className="flex items-start"><span className="text-status-success-text bg-status-success-bg/20 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">✓</span> Real-time transcription</li>
            <li className="flex items-start"><span className="text-status-success-text bg-status-success-bg/20 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">✓</span> Multi-platform live streaming</li>
         </ul>
      </div>

      <div className="flex-1 flex justify-center items-center p-6 lg:p-12">
        <div className="w-full max-w-lg">
          <div className="mb-8">
             <div className="flex items-center space-x-2 mb-2">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`flex-1 h-2 rounded-full transition-colors ${i < step ? 'bg-status-success-bg border border-status-success-border' : i === step ? 'bg-brand-600' : 'bg-border-default'}`}></div>
                ))}
             </div>
             <p className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">Step {step} of 5</p>
          </div>

          <h1 className="text-3xl font-display font-medium mb-8 text-text-primary">
             {step === 1 && 'Enter your phone number'}
             {step === 2 && 'Verify your phone'}
             {step === 3 && 'Choose your username'}
             {step === 4 && 'Create a password'}
             {step === 5 && 'Almost done!'}
          </h1>

          {error && <div className="bg-status-danger-bg text-status-danger-text p-3 rounded-md mb-6 text-sm border border-status-danger-border flex items-center"><span className="mr-2">⚠️</span>{error}</div>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <div>
                <label className="block text-sm font-medium mb-1.5 text-text-primary">Phone Number</label>
                <input {...register('phone_number')} className="border-1.5 border-border-default focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 rounded-md w-full p-3 text-text-primary bg-bg-surface outline-none transition text-lg" placeholder="+82 10 1234 5678" />
                <p className="text-xs text-text-secondary mt-2">We&apos;ll send you a verification code to ensure you&apos;re a real human.</p>
              </div>
            )}
            {step === 2 && (
              <div>
                <label className="block text-sm font-medium mb-1.5 text-text-primary">Enter 6-digit OTP</label>
                <input {...register('otp')} className="border-1.5 border-border-default focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 rounded-md w-full p-3 text-text-primary bg-bg-surface outline-none transition text-center tracking-[0.5em] font-mono text-2xl" placeholder="••••••" maxLength={6} />
              </div>
            )}
            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-text-primary">Username</label>
                  <input {...register('username')} className="border-1.5 border-border-default focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 rounded-md w-full p-3 text-text-primary bg-bg-surface outline-none transition" placeholder="PastorKim" />
                  <p className="text-xs text-text-secondary mt-2">Your unique display name. 3–32 characters.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-text-primary">Email <span className="text-text-tertiary font-normal">(optional)</span></label>
                  <input type="email" {...register('email')} className="border-1.5 border-border-default focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 rounded-md w-full p-3 text-text-primary bg-bg-surface outline-none transition" placeholder="hello@church.com" />
                </div>
              </div>
            )}
            {step === 4 && (
              <div>
                <label className="block text-sm font-medium mb-1.5 text-text-primary">Password</label>
                <input type="password" {...register('password')} className="border-1.5 border-border-default focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 rounded-md w-full p-3 text-text-primary bg-bg-surface outline-none transition" placeholder="••••••••" />
                <ul className="text-xs text-text-secondary mt-3 space-y-1">
                   <li>✓ At least 10 characters</li>
                   <li>✓ 1 uppercase, 1 lowercase</li>
                   <li>✓ 1 number, 1 special character</li>
                </ul>
              </div>
            )}
            {step === 5 && (
              <div>
                <label className="flex items-start space-x-3 text-sm p-4 border border-border-default rounded-lg bg-bg-muted cursor-pointer">
                  <input type="checkbox" {...register('consent')} className="mt-0.5 rounded border-border-default text-brand-600 focus:ring-brand-500 cursor-pointer w-4 h-4" />
                  <span className="text-text-primary">I agree to the <Link href="/en/terms" target="_blank" className="text-brand-600 hover:underline">Terms of Service</Link> and <Link href="/en/privacy" target="_blank" className="text-brand-600 hover:underline">Privacy Policy</Link>.</span>
                </label>
              </div>
            )}

            <div className="flex justify-between pt-6 border-t border-border-default mt-8">
              {step > 1 ? (
                <button type="button" onClick={prevStep} className="px-6 py-3 border border-border-strong hover:bg-bg-muted rounded-md text-text-primary font-medium transition">Back</button>
              ) : <div></div>}
              <button type="submit" className="px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-md font-medium shadow-sm transition">
                {step === 1 ? 'Send code' : step === 5 ? 'Create Account' : 'Continue'}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
             <p className="text-sm text-text-secondary">
               Already have an account? <Link href="/en/auth/login" className="text-brand-600 hover:text-brand-800 font-medium ml-1">Log in</Link>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
