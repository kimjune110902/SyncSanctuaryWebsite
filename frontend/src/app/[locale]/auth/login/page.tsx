"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../../../store/auth';
import { Link } from '../../../../navigation';

export default function LoginPage() {
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
        window.location.href = '/dashboard';
      }
    } catch {
      setError('An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-bg-base flex flex-col lg:flex-row">
      {/* Left Column (40%) */}
      <div className="lg:w-[40%] bg-brand-900 text-white p-12 lg:p-20 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="relative z-10">
          <Link href="/" className="font-display font-medium text-2xl text-white mb-16 block">
            SyncSanctuary
          </Link>
          <h2 className="text-4xl lg:text-5xl font-display font-medium mb-6">Welcome back.</h2>
          <p className="text-brand-200 text-lg mb-12 max-w-sm">The professional production suite for modern worship. Log in to continue managing your services.</p>

          <div className="bg-brand-800/50 border border-brand-700 p-6 rounded-xl mt-8 backdrop-blur-sm">
            <div className="flex text-brand-300 text-lg mb-4">★★★★★</div>
            <p className="italic text-sm text-brand-100 mb-4">&quot;SyncSanctuary completely transformed our Sunday mornings. It&apos;s the only platform we need.&quot;</p>
            <p className="text-xs font-semibold tracking-wider text-brand-200 uppercase">— David R., Media Director</p>
          </div>
        </div>
      </div>

      {/* Right Column (60%) */}
      <div className="lg:w-[60%] flex-1 flex justify-center items-center p-6 lg:p-16 bg-bg-surface">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-display font-medium mb-2 text-text-primary">Log in to your account</h1>
          <p className="text-text-secondary mb-8">Enter your phone number or email and password.</p>

          {error && <div className="bg-status-danger-bg text-status-danger-text p-4 rounded-md mb-6 text-sm border border-status-danger-border flex items-center"><span className="mr-2">⚠️</span>{error}</div>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-text-primary">Phone number or email</label>
              <div className="relative">
                <input {...register('identifier')} className="border-1.5 border-border-default focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 rounded-md w-full p-3 text-text-primary bg-bg-surface outline-none transition" placeholder="user@example.com" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-text-primary">Password</label>
                <Link href="/auth/reset-password" className="text-sm text-brand-600 hover:text-brand-800 font-medium transition">Forgot password?</Link>
              </div>
              <div className="relative">
                <input type="password" {...register('password')} className="border-1.5 border-border-default focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 rounded-md w-full p-3 text-text-primary bg-bg-surface outline-none transition" placeholder="••••••••" />
              </div>
            </div>

            <div className="flex items-center space-x-3 text-sm mt-4">
              <input type="checkbox" {...register('remember_device')} className="w-4 h-4 rounded border-border-default text-brand-600 focus:ring-brand-500 cursor-pointer" id="remember" />
              <label htmlFor="remember" className="text-text-secondary cursor-pointer">Remember this device</label>
            </div>

            <button type="submit" className="w-full mt-8 px-4 py-3 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-md shadow-sm transition">
              Log in
            </button>
          </form>

          <div className="mt-8 relative flex items-center py-5">
            <div className="flex-grow border-t border-border-default"></div>
            <span className="flex-shrink-0 mx-4 text-text-tertiary text-sm">or continue with</span>
            <div className="flex-grow border-t border-border-default"></div>
          </div>

          <button className="w-full flex items-center justify-center space-x-3 border border-border-strong hover:bg-bg-muted text-text-primary py-3 rounded-md font-medium transition">
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 41.939 C -8.804 40.009 -11.514 38.989 -14.754 38.989 C -19.444 38.989 -23.494 41.689 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
              </g>
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="mt-10 text-center">
             <p className="text-sm text-text-secondary">
               Don&apos;t have an account? <Link href="/auth/signup" className="text-brand-600 hover:text-brand-800 font-medium ml-1">Sign up</Link>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
