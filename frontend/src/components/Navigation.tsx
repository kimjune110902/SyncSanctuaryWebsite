"use client";
import React from 'react';
import { useLocale } from 'next-intl';

export default function Navigation() {
  const locale = useLocale() || 'en';
  return (
    <nav className="h-16 bg-bg-surface border-b border-border-default sticky top-0 z-50 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <a href={`/${locale}`} className="font-display font-medium text-xl text-text-primary">
          SyncSanctuary
        </a>
      </div>
      <div className="hidden lg:flex items-center space-x-6">
        <a href={`/${locale}/features`} className="text-sm font-medium text-text-secondary hover:text-text-primary">Features</a>
        <a href={`/${locale}/download`} className="text-sm font-medium text-text-secondary hover:text-text-primary">Download</a>
        <a href={`/${locale}/pricing`} className="text-sm font-medium text-text-secondary hover:text-text-primary">Pricing</a>
        <a href={`/${locale}/support`} className="text-sm font-medium text-text-secondary hover:text-text-primary">Support</a>
      </div>
      <div className="flex items-center space-x-4">
        <a href={`/${locale}/auth/login`} className="text-sm font-medium text-text-secondary hover:text-text-primary">Log in</a>
        <a href={`/${locale}/auth/signup`} className="text-sm font-medium bg-brand-600 text-white px-4 py-2 rounded hover:bg-brand-700 transition">Get started</a>
      </div>
    </nav>
  );
}
