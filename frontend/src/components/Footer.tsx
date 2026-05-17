"use client";
import React from 'react';
import { Link } from '../navigation';

export default function Footer() {
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
            <li><Link href="/features">Features</Link></li>
            <li><Link href="/download">Download</Link></li>
            <li><Link href="/changelog">Changelog</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-wider opacity-40 mb-4">Company</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/careers">Careers</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-wider opacity-40 mb-4">Legal</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Service</Link></li>
            <li><Link href="/cookies">Cookie Policy</Link></li>
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
