"use client";
import React from 'react';
import { useLocale } from 'next-intl';

export default function Footer() {
  const locale = useLocale() || 'en';
  return (
    <footer className="bg-bg-inverse text-text-inverse pt-20 px-6 pb-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h2 className="font-display font-medium text-xl text-white mb-2">SyncSanctuary</h2>
          <p className="text-sm opacity-60">The professional production suite for modern worship.</p>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-wider opacity-40 mb-4">Product</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li><a href={`/${locale}/features`}>Features</a></li>
            <li><a href={`/${locale}/download`}>Download</a></li>
            <li><a href={`/${locale}/changelog`}>Changelog</a></li>
            <li><a href={`/${locale}/pricing`}>Pricing</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-wider opacity-40 mb-4">Company</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li><a href={`/${locale}/about`}>About</a></li>
            <li><a href={`/${locale}/blog`}>Blog</a></li>
            <li><a href={`/${locale}/careers`}>Careers</a></li>
            <li><a href={`/${locale}/contact`}>Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-wider opacity-40 mb-4">Legal</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li><a href={`/${locale}/privacy`}>Privacy Policy</a></li>
            <li><a href={`/${locale}/terms`}>Terms of Service</a></li>
            <li><a href={`/${locale}/cookies`}>Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs opacity-40">
        <p>© 2024 SyncSanctuary. All rights reserved.</p>
        <p>Made with ♥ for the church community</p>
      </div>
    </footer>
  );
}
