import React from 'react';
import Navigation from '../../../components/Navigation';
import Footer from '../../../components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      <Navigation />
      <main className="flex-1 max-w-4xl mx-auto w-full p-6 md:p-12">
        <h1 className="text-4xl font-display mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none text-text-secondary">
          <p className="mb-4">Last updated: January 15, 2024</p>
          <p className="mb-4">At SyncSanctuary, we take your privacy seriously. This Privacy Policy describes how we collect, use, and handle your personal data when you use our web platform and desktop application.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-text-primary">1. What data we collect</h2>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Account Data:</strong> Phone number, email address (optional), password hash, and username.</li>
            <li><strong>Authentication Logs:</strong> IP addresses, User-Agent strings, and login timestamps to secure your account.</li>
            <li><strong>Analytics:</strong> Anonymous usage data (if you explicitly opt-in).</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-text-primary">2. Why we collect this data</h2>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Account Data:</strong> Necessary for the performance of our contract with you (GDPR Art. 6(1)(b)).</li>
            <li><strong>Authentication Logs:</strong> Legitimate interests for securing your account against unauthorized access (GDPR Art. 6(1)(f)).</li>
            <li><strong>Analytics & Marketing:</strong> Based on your explicit consent (GDPR Art. 6(1)(a)).</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-text-primary">3. Data Retention</h2>
          <p className="mb-4">We retain your active account data for as long as your account is active. If you request account deletion, your data enters a 30-day grace period, after which all PII is permanently hard-deleted. Authentication logs are retained for 2 years for security auditing purposes.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-text-primary">4. Third-Party Processors</h2>
          <p className="mb-4">We share limited data with trusted third-party processors under strict Data Processing Agreements (DPAs). These include:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>AWS (Hosting, Database, Storage)</li>
            <li>Twilio & Coolsms (SMS delivery)</li>
            <li>Sentry (Error tracking)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4 text-text-primary">5. Your Rights</h2>
          <p className="mb-4">Under GDPR, CCPA, and PDPA, you have the right to access, rectify, or erase your personal data. You can exercise these rights directly from the &quot;Your Data&quot; and &quot;Danger Zone&quot; sections of your Account Settings.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
