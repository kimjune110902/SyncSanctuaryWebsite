"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../../../store/auth';
import Link from 'next/link';

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
    <div className="min-h-screen bg-bg-muted flex justify-center items-center p-4">
      <div className="bg-bg-surface w-full max-w-md rounded-2xl shadow-xl border border-border-default overflow-hidden flex flex-col">
        <div className="bg-brand-900 p-8 text-center text-white">
           <h1 className="text-3xl font-display font-medium mb-2">Welcome back.</h1>
           <p className="text-brand-200 text-sm">Log in to your SyncSanctuary account.</p>
        </div>
        <div className="p-8">
          {error && <div className="bg-status-danger-bg text-status-danger-text p-3 rounded-md mb-6 text-sm border border-status-danger-border flex items-center"><span className="mr-2">⚠️</span>{error}</div>}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-text-primary">Phone number or email</label>
              <input {...register('identifier')} className="border-1.5 border-border-default focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 rounded-md w-full p-2.5 text-text-primary bg-bg-surface outline-none transition" placeholder="user@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 text-text-primary">Password</label>
              <input type="password" {...register('password')} className="border-1.5 border-border-default focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 rounded-md w-full p-2.5 text-text-primary bg-bg-surface outline-none transition" placeholder="••••••••" />
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" {...register('remember_device')} className="rounded border-border-default text-brand-600 focus:ring-brand-500 cursor-pointer" />
                <span className="text-text-secondary">Remember this device</span>
              </label>
              <Link href="/en/auth/reset-password" className="text-brand-600 hover:text-brand-800 font-medium">Forgot password?</Link>
            </div>
            <button type="submit" className="w-full mt-6 px-4 py-3 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-md shadow-sm transition">
              Log in
            </button>
          </form>

          <div className="mt-8 text-center border-t border-border-default pt-6">
             <p className="text-sm text-text-secondary">
               Don&apos;t have an account? <Link href="/en/auth/signup" className="text-brand-600 hover:text-brand-800 font-medium ml-1">Sign up</Link>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
