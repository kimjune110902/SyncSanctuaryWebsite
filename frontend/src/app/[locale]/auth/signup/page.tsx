"use client";
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAuthStore } from '../../../../store/auth';
import { Link } from '../../../../navigation';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [phoneVerifiedToken, setPhoneVerifiedToken] = useState<string | null>(null);
  const [identifierType, setIdentifierType] = useState<'phone' | 'email'>('phone');
  const [timer, setTimer] = useState(0);
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');

  const { register, handleSubmit, watch, setValue, control } = useForm({ shouldUnregister: false });
  const { login } = useAuthStore();

  const username = watch('username');

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  useEffect(() => {
     if(timer > 0) {
        const int = setInterval(() => setTimer(t => t - 1), 1000);
        return () => clearInterval(int);
     }
  }, [timer]);

  useEffect(() => {
    if (step === 3 && username && username.length >= 3) {
      setUsernameStatus('checking');
      const timerId = setTimeout(async () => {
        try {
          const res = await fetch(`/api/v1/auth/signup/check-username?username=${encodeURIComponent(username)}`);
          const data = await res.json();
          setUsernameStatus(data.available ? 'available' : 'taken');
        } catch {
          setUsernameStatus('idle');
        }
      }, 500);
      return () => clearTimeout(timerId);
    } else {
      setUsernameStatus('idle');
    }
  }, [username, step]);

  const onSubmit = async (data: Record<string, unknown>) => {
    if (step === 1) {
      try {
        let payloadIdentifier = data.email;
        if(identifierType === 'phone') {
           payloadIdentifier = data.phone_number;
        }

        const res = await fetch('/api/v1/auth/signup/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier: payloadIdentifier })
        });
        if (res.ok) {
          setError(null);
          setTimer(60);
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
        let payloadIdentifier = data.email;
        if(identifierType === 'phone') {
           payloadIdentifier = data.phone_number;
        }

        const res = await fetch('/api/v1/auth/signup/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier: payloadIdentifier, otp: data.otp })
        });
        if (res.ok) {
          const body = await res.json();
          setPhoneVerifiedToken(body.verified_token);
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

    if (step === 3) {
      if(data.use_email_as_id && identifierType === 'email') {
         setValue('username', data.email);
      }
      if (usernameStatus !== 'available' && !(data.use_email_as_id && identifierType === 'email')) {
         setError("Please choose an available username.");
         return;
      }
      setError(null);
      nextStep();
      return;
    }

    if (step === 4) {
      if(data.password !== data.confirm_password) {
         setError("Passwords do not match");
         return;
      }
      setError(null);
      nextStep();
      return;
    }

    if (step < 5) return;

    try {
      const res = await fetch('/api/v1/auth/signup/create-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          verified_token: phoneVerifiedToken,
          client_type: 'web'
        })
      });
      const resData = await res.json();
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
      <div className="lg:w-[40%] bg-brand-900 text-white p-12 lg:p-20 flex flex-col justify-center relative overflow-hidden hidden lg:flex">
         <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
         <div className="relative z-10">
            <Link href="/" className="font-display font-medium text-2xl text-white mb-16 block">
              SyncSanctuary
            </Link>
            <h2 className="text-4xl font-display font-medium mb-6">Join SyncSanctuary</h2>
            <p className="text-brand-200 text-lg mb-12 max-w-sm">The professional production suite for modern worship. Create your free account today.</p>

            <ul className="space-y-6 text-brand-100">
               <li className="flex items-start"><span className="text-status-success-text bg-status-success-bg/20 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">✓</span> AI-powered video editing</li>
               <li className="flex items-start"><span className="text-status-success-text bg-status-success-bg/20 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">✓</span> Multi-display presentation control</li>
               <li className="flex items-start"><span className="text-status-success-text bg-status-success-bg/20 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">✓</span> Real-time transcription</li>
               <li className="flex items-start"><span className="text-status-success-text bg-status-success-bg/20 rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">✓</span> Multi-platform live streaming</li>
            </ul>
         </div>
      </div>

      {/* Right Column (60%) */}
      <div className="lg:w-[60%] flex-1 flex flex-col justify-center items-center p-6 lg:p-16 bg-bg-surface">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="font-display font-medium text-2xl text-brand-600 block">
              SyncSanctuary
            </Link>
          </div>

          <div className="mb-10">
             <div className="flex items-center space-x-2 mb-4">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`flex-1 h-1.5 rounded-full transition-colors ${i < step ? 'bg-status-success-bg border border-status-success-border' : i === step ? 'bg-brand-600' : 'bg-border-default'}`}></div>
                ))}
             </div>
             <p className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">Step {step} of 5</p>
             <h1 className="text-3xl font-display font-medium mt-2 text-text-primary">
                {step === 1 && 'Create your account'}
                {step === 2 && 'Verify your contact'}
                {step === 3 && 'Choose your username'}
                {step === 4 && 'Create a password'}
                {step === 5 && 'Almost done!'}
             </h1>
          </div>

          {error && <div className="bg-status-danger-bg text-status-danger-text p-4 rounded-md mb-6 text-sm border border-status-danger-border flex items-center"><span className="mr-2">⚠️</span>{error}</div>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex p-1 bg-bg-muted rounded-md mb-6">
                  <button type="button" onClick={() => setIdentifierType('phone')} className={`flex-1 py-2 text-sm font-medium rounded ${identifierType === 'phone' ? 'bg-white shadow-sm text-text-primary' : 'text-text-secondary'}`}>Phone Number</button>
                  <button type="button" onClick={() => setIdentifierType('email')} className={`flex-1 py-2 text-sm font-medium rounded ${identifierType === 'email' ? 'bg-white shadow-sm text-text-primary' : 'text-text-secondary'}`}>Email Address</button>
                </div>

                {identifierType === 'phone' ? (
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-primary">Phone Number</label>
                    <div className="flex">
                      <Controller
                        name="phone_number"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <PhoneInput
                            {...field}
                            international
                            defaultCountry="KR"
                            className="border-1.5 border-border-default focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 rounded-md w-full p-3 text-text-primary bg-bg-surface outline-none transition"
                          />
                        )}
                      />
                    </div>
                    <p className="text-xs text-text-secondary mt-3">We&apos;ll send you a verification code to ensure you&apos;re a real human.</p>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium mb-2 text-text-primary">Email Address</label>
                    <input type="email" {...register('email')} className="border-1.5 border-border-default focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 rounded-md w-full p-3 text-text-primary bg-bg-surface outline-none transition" placeholder="hello@church.com" />
                    <p className="text-xs text-text-secondary mt-3">We&apos;ll send a verification code to this email.</p>
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div>
                <label className="block text-sm font-medium mb-2 text-text-primary">Enter 6-digit code</label>
                <p className="text-sm text-text-secondary mb-6">Sent to {identifierType === 'phone' ? watch('phone_number') : watch('email')}</p>
                <input {...register('otp')} className="border-1.5 border-border-default focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 rounded-md w-full p-4 text-text-primary bg-bg-surface outline-none transition text-center tracking-[1em] font-mono text-3xl" placeholder="••••••" maxLength={6} />

                <div className="mt-6 text-center">
                  <button type="button" disabled={timer > 0} onClick={() => onSubmit({ ...watch(), resend: true })} className="text-sm text-brand-600 hover:text-brand-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                    {timer > 0 ? `Resend code in ${timer}s` : 'Resend code'}
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-primary">Username</label>
                  <div className="relative">
                    <input {...register('username')} className={`border-1.5 focus:ring-4 focus:ring-brand-500/15 rounded-md w-full p-3 text-text-primary bg-bg-surface outline-none transition ${usernameStatus === 'taken' ? 'border-status-danger-border focus:border-status-danger-border' : 'border-border-default focus:border-brand-500'}`} placeholder="PastorKim" />
                    <div className="absolute right-3 top-3.5">
                      {usernameStatus === 'checking' && <span className="text-text-tertiary">...</span>}
                      {usernameStatus === 'available' && <span className="text-status-success-text">✓</span>}
                      {usernameStatus === 'taken' && <span className="text-status-danger-text">✗</span>}
                    </div>
                  </div>
                  <p className="text-xs text-text-secondary mt-3">Your unique display name. 3–32 characters.</p>
                </div>

                {identifierType === 'email' && (
                  <label className="flex items-center space-x-3 text-sm p-4 border border-border-default rounded-lg bg-bg-muted cursor-pointer hover:bg-bg-surface-raised transition">
                    <input type="checkbox" {...register('use_email_as_id')} className="rounded border-border-default text-brand-600 focus:ring-brand-500 w-4 h-4" />
                    <span className="text-text-primary font-medium">Use my email as my username</span>
                  </label>
                )}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-primary">Password</label>
                  <input type="password" {...register('password')} className="border-1.5 border-border-default focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 rounded-md w-full p-3 text-text-primary bg-bg-surface outline-none transition" placeholder="••••••••" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-primary">Confirm Password</label>
                  <input type="password" {...register('confirm_password')} className="border-1.5 border-border-default focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 rounded-md w-full p-3 text-text-primary bg-bg-surface outline-none transition" placeholder="••••••••" />
                </div>
                <div className="bg-bg-muted p-4 rounded-lg border border-border-default mt-6">
                  <h4 className="text-xs font-bold text-text-primary mb-3 uppercase tracking-wider">Password Requirements</h4>
                  <ul className="text-xs text-text-secondary space-y-2">
                     <li className="flex items-center">✓ At least 10 characters</li>
                     <li className="flex items-center">✓ 1 uppercase, 1 lowercase</li>
                     <li className="flex items-center">✓ 1 number, 1 special character</li>
                  </ul>
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <label className="flex items-start space-x-3 text-sm p-4 border border-border-default rounded-lg bg-bg-muted cursor-pointer hover:bg-bg-surface-raised transition">
                  <input type="checkbox" {...register('consent')} className="mt-1 rounded border-border-default text-brand-600 focus:ring-brand-500 cursor-pointer w-4 h-4" />
                  <span className="text-text-primary leading-relaxed">I agree to the <Link href="/terms" target="_blank" className="text-brand-600 hover:underline">Terms of Service</Link> and <Link href="/privacy" target="_blank" className="text-brand-600 hover:underline">Privacy Policy</Link>.</span>
                </label>
              </div>
            )}

            <div className="flex justify-between pt-6 mt-8">
              {step > 1 ? (
                <button type="button" onClick={prevStep} className="px-6 py-3 border border-border-strong hover:bg-bg-muted rounded-md text-text-primary font-medium transition">Back</button>
              ) : <div></div>}

              <button
                type="submit"
                disabled={(step === 5 && !watch('consent')) || (step === 3 && usernameStatus === 'taken' && !(watch('use_email_as_id') && identifierType === 'email'))}
                className="px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-md font-medium shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {step === 1 ? 'Send code' : step === 2 ? 'Verify' : step === 5 ? 'Create Account' : 'Continue'}
              </button>
            </div>
          </form>

          <div className="mt-10 text-center border-t border-border-default pt-6">
             <p className="text-sm text-text-secondary">
               Already have an account? <Link href="/auth/login" className="text-brand-600 hover:text-brand-800 font-medium ml-1">Log in</Link>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
