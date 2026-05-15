"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../../../store/auth';

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
        window.location.href = '/en/dashboard';
      }
    } catch {
      setError('An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-bg-muted flex justify-center items-center p-4">
      <div className="bg-bg-surface w-full max-w-md rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-display mb-4">Log in to SyncSanctuary</h1>
        {error && <div className="bg-status-danger-bg text-status-danger-text p-2 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm">Phone number or email</label>
            <input {...register('identifier')} className="border rounded w-full p-2 text-text-primary bg-bg-surface" />
          </div>
          <div>
            <label className="block text-sm">Password</label>
            <input type="password" {...register('password')} className="border rounded w-full p-2 text-text-primary bg-bg-surface" />
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <input type="checkbox" {...register('remember_device')} />
            <label>Remember this device</label>
          </div>
          <button type="submit" className="w-full px-4 py-2 bg-brand-600 text-white rounded">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
