"use client";
import React from 'react';
import { Link } from '../navigation';

export default function Navigation() {
  return (
    <nav className="h-16 bg-bg-surface border-b border-border-default sticky top-0 z-50 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/" className="font-display font-medium text-xl text-text-primary">
          SyncSanctuary
        </Link>
      </div>
      <div className="hidden lg:flex items-center space-x-6">
        <Link href="/features" className="text-sm font-medium text-text-secondary hover:text-text-primary">Features</Link>
        <Link href="/download" className="text-sm font-medium text-text-secondary hover:text-text-primary">Download</Link>
        <Link href="/pricing" className="text-sm font-medium text-text-secondary hover:text-text-primary">Pricing</Link>
        <Link href="/support" className="text-sm font-medium text-text-secondary hover:text-text-primary">Support</Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/auth/login" className="text-sm font-medium text-text-secondary hover:text-text-primary">Log in</Link>
        <Link href="/auth/signup" className="text-sm font-medium bg-brand-600 text-white px-4 py-2 rounded hover:bg-brand-700 transition">Get started</Link>
      </div>
    </nav>
  );
}
