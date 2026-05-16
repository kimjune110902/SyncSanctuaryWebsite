"use client";
import React, { useEffect, useState } from 'react';
import Navigation from '../../../components/Navigation';

export default function DownloadPage() {
  const [os, setOs] = useState<'windows' | 'macos' | 'linux' | 'unknown'>('unknown');

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    if (userAgent.indexOf("Win") !== -1) setOs("windows");
    else if (userAgent.indexOf("Mac") !== -1) setOs("macos");
    else if (userAgent.indexOf("Linux") !== -1) setOs("linux");
  }, []);

  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      <Navigation />
      <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display mb-4">Download SyncSanctuary</h1>
          <p className="text-text-secondary text-lg">Available for Windows, macOS, and Linux. Free to start.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Windows */}
          <div className={`bg-bg-surface border-2 rounded-xl p-8 shadow-sm flex flex-col ${os === 'windows' ? 'border-brand-500 shadow-xl scale-105' : 'border-border-default'}`}>
             {os === 'windows' && <span className="text-xs bg-status-success-bg text-status-success-text px-2 py-1 rounded self-start mb-4">Recommended for you</span>}
             <h2 className="text-2xl font-bold mb-2">Windows</h2>
             <span className="text-xs text-text-tertiary mb-6 block">Version 1.2.3 • Released Jan 15, 2024</span>
             <button className="bg-brand-600 text-white w-full py-3 rounded-md mb-4 mt-auto">Download for Windows</button>
             <p className="text-xs text-text-tertiary text-center">Download size: 124 MB • .exe installer</p>
          </div>

          {/* macOS */}
          <div className={`bg-bg-surface border-2 rounded-xl p-8 shadow-sm flex flex-col ${os === 'macos' ? 'border-brand-500 shadow-xl scale-105' : 'border-border-default'}`}>
             {os === 'macos' && <span className="text-xs bg-status-success-bg text-status-success-text px-2 py-1 rounded self-start mb-4">Recommended for you</span>}
             <h2 className="text-2xl font-bold mb-2">macOS</h2>
             <span className="text-xs text-text-tertiary mb-6 block">Version 1.2.3 • Released Jan 15, 2024</span>
             <div className="flex bg-bg-muted rounded p-1 mb-6">
                <button className="flex-1 text-sm py-1 bg-white shadow-sm rounded">Apple Silicon</button>
                <button className="flex-1 text-sm py-1 text-text-secondary">Intel</button>
             </div>
             <button className="bg-brand-600 text-white w-full py-3 rounded-md mb-4 mt-auto">Download for macOS</button>
             <p className="text-xs text-text-tertiary text-center">Download size: 145 MB • .dmg disk image</p>
          </div>

          {/* Linux */}
          <div className={`bg-bg-surface border-2 rounded-xl p-8 shadow-sm flex flex-col ${os === 'linux' ? 'border-brand-500 shadow-xl scale-105' : 'border-border-default'}`}>
             {os === 'linux' && <span className="text-xs bg-status-success-bg text-status-success-text px-2 py-1 rounded self-start mb-4">Recommended for you</span>}
             <h2 className="text-2xl font-bold mb-2">Linux</h2>
             <span className="text-xs text-text-tertiary mb-6 block">Version 1.2.3 • Released Jan 15, 2024</span>
             <div className="flex bg-bg-muted rounded p-1 mb-6 space-x-1">
                <button className="flex-1 text-xs py-1 bg-white shadow-sm rounded">AppImage</button>
                <button className="flex-1 text-xs py-1 text-text-secondary">.deb</button>
                <button className="flex-1 text-xs py-1 text-text-secondary">.rpm</button>
             </div>
             <button className="bg-brand-600 text-white w-full py-3 rounded-md mb-4 mt-auto">Download for Linux</button>
             <p className="text-xs text-text-tertiary text-center">Download size: 98 MB • AppImage</p>
          </div>
        </div>
      </main>
    </div>
  );
}
