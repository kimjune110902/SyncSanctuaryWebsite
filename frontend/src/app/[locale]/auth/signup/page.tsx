"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../../../store/auth';

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
        window.location.href = '/en/dashboard';
      }
    } catch {
      setError('An error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-bg-muted flex justify-center items-center p-4">
      <div className="bg-bg-surface w-full max-w-md rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-display mb-4">Signup - Step {step}</h1>
        {error && <div className="bg-status-danger-bg text-status-danger-text p-2 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {step === 1 && (
            <div>
              <label className="block text-sm">Phone Number</label>
              <input {...register('phone_number')} className="border rounded w-full p-2 text-text-primary bg-bg-surface" placeholder="+82 10 1234 5678" />
            </div>
          )}
          {step === 2 && (
            <div>
              <label className="block text-sm">Enter OTP sent to your phone</label>
              <input {...register('otp')} className="border rounded w-full p-2 text-text-primary bg-bg-surface" placeholder="123456" />
            </div>
          )}
          {step === 3 && (
            <div>
              <label className="block text-sm">Username</label>
              <input {...register('username')} className="border rounded w-full p-2 text-text-primary bg-bg-surface" />
            </div>
          )}
          {step === 4 && (
            <div>
              <label className="block text-sm">Password</label>
              <input type="password" {...register('password')} className="border rounded w-full p-2 text-text-primary bg-bg-surface" />
            </div>
          )}
          {step === 5 && (
            <div>
              <label className="flex items-center space-x-2 text-sm">
                <input type="checkbox" {...register('consent')} />
                <span>I agree to the Terms of Service and Privacy Policy</span>
              </label>
            </div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 && <button type="button" onClick={prevStep} className="px-4 py-2 border rounded text-text-primary">Back</button>}
            <button type="submit" className="px-4 py-2 bg-brand-600 text-white rounded ml-auto">
              {step === 5 ? 'Create Account' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
