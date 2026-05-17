"use client";
import React from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { Link } from '../../navigation';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
          {/* Subtle Blob */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

          <div className="lg:col-span-7">
            <span className="text-sm uppercase tracking-widest text-brand-600 font-semibold mb-4 block">Church Media Production Platform</span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-normal leading-tight tracking-tight text-text-primary mb-6">
              Every sermon, every song.<br/> <span className="italic">Perfectly</span> captured.
            </h1>
            <p className="text-xl text-text-secondary max-w-lg leading-relaxed mb-8">
              SyncSanctuary brings AI-powered video editing, live slide control, real-time transcription, and professional streaming together in one suite — built specifically for church media teams.
            </p>
            <div className="flex space-x-4 items-center">
              <Link href="/download" className="bg-brand-600 text-white px-8 py-4 rounded-md text-lg font-medium hover:bg-brand-700 transition shadow-lg shadow-brand-500/25">Download free</Link>
              <Link href="/features" className="border-2 border-border-strong text-text-primary hover:border-brand-600 hover:text-brand-600 px-8 py-4 rounded-md text-lg font-medium transition">Watch demo</Link>
            </div>
            <p className="text-sm text-text-tertiary mt-8 flex items-center">
              <span className="flex mr-3">
                 {[1,2,3,4,5].map(i => (
                    <span key={i} className="w-8 h-8 rounded-full bg-brand-100 border-2 border-bg-base -ml-2 first:ml-0"></span>
                 ))}
              </span>
              Trusted by 2,400+ churches in 48 countries
            </p>
          </div>
          <div className="lg:col-span-5 relative perspective-1200">
            <div className="w-full aspect-[4/3] bg-bg-surface-raised rounded-xl shadow-2xl border border-border-default flex items-center justify-center transform rotate-y-[-15deg] rotate-x-[5deg] transition-transform hover:rotate-0 duration-500">
               <div className="absolute top-4 right-4 bg-status-danger-bg border border-status-danger-border text-status-danger-text px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-sm">
                 <span className="w-2 h-2 rounded-full bg-status-danger-text mr-2 animate-pulse"></span>
                 LIVE
               </div>
               <span className="text-text-tertiary font-medium">Platform Dashboard Mockup</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-bg-surface border-t border-border-default py-24 px-6 relative z-10">
          <div className="max-w-7xl mx-auto text-center">
             <span className="text-sm uppercase tracking-widest text-brand-600 font-semibold mb-4 block">Everything you need</span>
             <h2 className="font-display text-4xl lg:text-5xl mb-6">Built for Sunday morning.<br/>Designed for <span className="italic">every day</span>.</h2>
             <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-16 leading-relaxed">From Wednesday rehearsal to Sunday livestream, SyncSanctuary handles every step of your church&apos;s media production workflow seamlessly.</p>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                {[
                  { title: "AI-Powered Video Editor", desc: "Whisper-based transcription automatically segments your recordings into sermon, worship, prayer, and announcements." },
                  { title: "Professional Presentation Control", desc: "Control up to 16 simultaneous displays with sub-16ms slide switching latency. Import PowerPoint, PDF, ProPresenter." },
                  { title: "Live Captioning & Transcription", desc: "Real-time speech-to-text runs locally on your machine. Display captions on your stage monitor and stream." },
                  { title: "Professional Audio Mixer", desc: "Full parametric EQ, compression, noise gate, and 8-band EQ on every channel. Sub-5ms round-trip latency." },
                  { title: "Multi-Platform Live Streaming", desc: "Stream to YouTube, Twitch, Facebook Live, and custom RTMP endpoints simultaneously. Adaptive bitrate built in." },
                  { title: "AI Slide Automator", desc: "The AI listens to the speaker and automatically advances slides to match what's being said. No button press needed." }
                ].map((feature, i) => (
                  <div key={i} className="bg-bg-base p-8 rounded-2xl border border-border-default shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-lg mb-6 flex items-center justify-center font-bold text-xl">{i+1}</div>
                    <h3 className="font-semibold text-xl mb-3 text-text-primary">{feature.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-6">{feature.desc}</p>
                    <Link href="/features" className="text-brand-600 text-sm font-medium hover:text-brand-800 hover:underline inline-flex items-center">Learn more <span className="ml-1">→</span></Link>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* CTA Banner Section */}
        <section className="bg-brand-800 py-32 px-6 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="font-display text-4xl md:text-5xl mb-6 leading-tight">Ready to transform your church&apos;s media production?</h2>
            <p className="text-brand-100 mb-10 text-lg leading-relaxed">Join thousands of church media teams who trust SyncSanctuary every Sunday.</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link href="/download" className="bg-white text-brand-800 px-8 py-4 rounded-md font-medium text-lg hover:bg-brand-50 transition shadow-lg w-full sm:w-auto">Download free — it&apos;s free to start</Link>
              <Link href="/contact" className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-md font-medium text-lg transition w-full sm:w-auto">Talk to our team</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
