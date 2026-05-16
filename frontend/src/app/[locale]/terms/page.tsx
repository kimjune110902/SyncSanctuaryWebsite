import React from 'react';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      <Navigation />
      <main className="flex-1 max-w-4xl mx-auto w-full p-6 md:p-12">
        <h1 className="text-4xl font-display mb-8">Terms of Service</h1>
        <div className="prose prose-invert max-w-none text-text-secondary">
          <p className="mb-4">Last updated: January 15, 2024</p>
          <p className="mb-4">Welcome to SyncSanctuary. By accessing our web platform or using our desktop application, you agree to be bound by these Terms of Service.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-text-primary">1. Acceptable Use</h2>
          <p className="mb-4">You agree to use SyncSanctuary only for lawful purposes. You must not use the platform to distribute illicit, offensive, or harmful material.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-text-primary">2. User Accounts</h2>
          <p className="mb-4">You are responsible for maintaining the security of your account and password. SyncSanctuary cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-text-primary">3. Intellectual Property</h2>
          <p className="mb-4">The SyncSanctuary name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of SyncSanctuary. You must not use such marks without our prior written permission.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-text-primary">4. Termination</h2>
          <p className="mb-4">We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
