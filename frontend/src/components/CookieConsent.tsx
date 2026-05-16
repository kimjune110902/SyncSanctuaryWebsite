"use client";
import React, { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('ss_consent_v1');
    if (!consent) setIsVisible(true);
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('ss_consent_v1', JSON.stringify({ necessary: true, analytics: true, preferences: true }));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('ss_consent_v1', JSON.stringify({ necessary: true, analytics: false, preferences: false }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-bg-surface border-t border-border-default shadow-2xl z-[9999] p-4 md:p-6 transition-transform duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h4 className="font-bold text-sm mb-1">We use cookies</h4>
          <p className="text-xs text-text-secondary">SyncSanctuary uses cookies to keep you logged in and improve your experience. Read our <a href="/privacy" className="underline hover:text-text-primary">Privacy Policy</a> for details.</p>
        </div>
        <div className="flex-shrink-0 flex gap-2 w-full md:w-auto">
          <button onClick={() => setExpanded(!expanded)} className="flex-1 md:flex-none px-4 py-2 border border-border-default rounded text-sm font-medium hover:bg-bg-muted">Manage preferences</button>
          <button onClick={handleAcceptAll} className="flex-1 md:flex-none px-4 py-2 bg-brand-600 text-white rounded text-sm font-medium">Accept all</button>
        </div>
      </div>

      {expanded && (
        <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-border-default">
           <div className="space-y-4 max-w-2xl">
              <div className="flex justify-between items-center">
                 <div>
                    <h5 className="text-sm font-bold">Strictly Necessary</h5>
                    <p className="text-xs text-text-secondary">Required for the website to function. Cannot be disabled.</p>
                 </div>
                 <div className="text-status-success-text text-sm font-medium">Always Active</div>
              </div>
              <div className="flex justify-between items-center">
                 <div>
                    <h5 className="text-sm font-bold">Analytics</h5>
                    <p className="text-xs text-text-secondary">Anonymous usage data to help us improve the product.</p>
                 </div>
                 <input type="checkbox" className="w-4 h-4" />
              </div>
           </div>
           <div className="mt-6 flex justify-end">
              <button onClick={handleSavePreferences} className="px-4 py-2 bg-brand-600 text-white rounded text-sm font-medium">Save preferences</button>
           </div>
        </div>
      )}
    </div>
  );
}
