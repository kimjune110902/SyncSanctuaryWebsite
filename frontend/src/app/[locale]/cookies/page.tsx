import React from 'react';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      <Navigation />
      <main className="flex-1 max-w-4xl mx-auto w-full p-6 md:p-12">
        <h1 className="text-4xl font-display mb-8">Cookie Policy</h1>
        <div className="prose prose-invert max-w-none text-text-secondary">
          <p className="mb-4">Last updated: January 15, 2024</p>
          <p className="mb-4">SyncSanctuary uses cookies to ensure our platform functions correctly, securely, and seamlessly for our users. This policy outlines our use of these technologies.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-text-primary">1. Strictly Necessary Cookies</h2>
          <p className="mb-4">These cookies are required for the platform to function and cannot be disabled. They include session management, security checks (CSRF tokens), and retaining your consent preferences.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-text-primary">2. Preferences Cookies</h2>
          <p className="mb-4">These cookies allow our platform to remember your UI settings, such as your preferred language or theme (Dark/Light mode).</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-text-primary">3. Analytics Cookies</h2>
          <p className="mb-4">We use anonymous usage tracking to help us understand how features are used so we can improve the platform. You may opt out of these at any time via your cookie preferences.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
