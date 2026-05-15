"use client";
import React from 'react';
import Navigation from '../../../components/Navigation';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      <Navigation />
      <div className="flex flex-1">
        <aside className="w-64 border-r border-border-default bg-bg-surface p-6 hidden md:block">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-brand-200 rounded-full"></div>
            <div>
              <div className="text-sm font-bold">PastorKim</div>
              <div className="text-xs text-text-tertiary">user@example.com</div>
            </div>
          </div>
          <nav className="space-y-2">
            <a href="/dashboard" className="block px-3 py-2 bg-brand-50 text-brand-600 rounded text-sm font-medium">Dashboard</a>
            <a href="/download" className="block px-3 py-2 text-text-secondary hover:bg-bg-muted rounded text-sm font-medium">Download</a>
            <a href="/account" className="block px-3 py-2 text-text-secondary hover:bg-bg-muted rounded text-sm font-medium">Account Settings</a>
          </nav>
        </aside>

        <main className="flex-1 p-6 md:p-12">
          <h1 className="text-3xl font-bold mb-2">Welcome back, PastorKim! 👋</h1>
          <p className="text-text-secondary mb-10">Here&apos;s what&apos;s happening with your SyncSanctuary account.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {['Download SyncSanctuary', 'Account Settings', 'Active Sessions', 'Help & Support'].map((title, i) => (
              <div key={i} className="bg-bg-surface p-6 rounded-xl border border-border-default shadow-sm hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="w-8 h-8 bg-brand-100 rounded mb-4"></div>
                <h3 className="font-semibold text-sm mb-1">{title}</h3>
                <p className="text-xs text-text-secondary">Quick action description goes here.</p>
              </div>
            ))}
          </div>

          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="bg-bg-surface border border-border-default rounded-lg">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border-default bg-bg-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Event</th>
                  <th className="px-4 py-3 font-medium">Date/Time</th>
                  <th className="px-4 py-3 font-medium">Device</th>
                  <th className="px-4 py-3 font-medium">IP Address</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border-default">
                  <td className="px-4 py-3 flex items-center space-x-2">
                    <div className="w-4 h-4 bg-status-success-bg rounded-full"></div>
                    <span>Login Successful</span>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">Just now</td>
                  <td className="px-4 py-3 text-text-secondary">Chrome on macOS</td>
                  <td className="px-4 py-3 text-text-secondary">192.168.*.*</td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
