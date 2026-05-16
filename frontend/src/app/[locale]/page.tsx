"use client";
import React from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-widest text-brand-500 font-semibold mb-4 block">Church Media Production Platform</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-normal leading-tight tracking-tight text-text-primary mb-6">
              Every sermon, every song. <span className="italic">Perfectly</span> captured.
            </h1>
            <p className="text-lg text-text-secondary max-w-md leading-relaxed mb-8">
              SyncSanctuary brings AI-powered video editing, live slide control, real-time transcription, and professional streaming together in one suite — built specifically for church media teams.
            </p>
            <div className="flex space-x-4">
              <button className="bg-brand-600 text-white px-6 py-3 rounded-md text-lg">Download free</button>
              <button className="border border-brand-600 text-brand-600 px-6 py-3 rounded-md text-lg">Watch demo</button>
            </div>
            <p className="text-sm text-text-tertiary mt-8">Trusted by 2,400+ churches in 48 countries</p>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="w-full h-96 bg-bg-surface-raised rounded-xl shadow-2xl border border-border-default flex items-center justify-center">
               <span className="text-text-tertiary">Mockup Illustration</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-bg-muted py-24 px-6">
          <div className="max-w-7xl mx-auto text-center">
             <h2 className="font-display text-4xl mb-4">Built for Sunday morning. Designed for every day.</h2>
             <p className="text-text-secondary max-w-2xl mx-auto mb-16">From Wednesday rehearsal to Sunday livestream, SyncSanctuary handles every step of your church&apos;s media production workflow.</p>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="bg-bg-surface p-8 rounded-xl border border-border-default shadow-sm hover:shadow-xl transition-shadow">
                    <div className="w-12 h-12 bg-brand-100 rounded-md mb-6"></div>
                    <h3 className="font-semibold text-xl mb-2">Feature {i}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">Description for feature {i}. Handles workflows perfectly.</p>
                    <a href="#" className="text-brand-600 text-sm hover:underline">Learn more →</a>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* CTA Banner Section */}
        <section className="bg-brand-800 py-24 px-6 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl mb-6">Ready to transform your church&apos;s media production?</h2>
            <p className="text-white/60 mb-10 text-lg">Join thousands of church media teams who trust SyncSanctuary every Sunday.</p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-brand-800 px-6 py-3 rounded-md font-medium">Download free — it&apos;s free to start</button>
              <button className="border border-white text-white px-6 py-3 rounded-md font-medium">Talk to our team</button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
