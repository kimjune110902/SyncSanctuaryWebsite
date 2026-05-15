"use client";
import React, { useState } from 'react';
import Navigation from '../../../components/Navigation';
import { useAuthStore } from '../../../store/auth';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      <Navigation />
      <div className="flex flex-1 max-w-7xl mx-auto w-full p-6 md:p-12">
        <aside className="w-64 pr-8 hidden md:block">
          <h2 className="text-xl font-bold mb-6">Account Settings</h2>
          <nav className="space-y-1">
            {['Profile', 'Security', 'Preferences', 'Your Data', 'Danger Zone'].map((tab) => {
              const tabKey = tab.toLowerCase().replace(' ', '_');
              const isActive = activeTab === tabKey;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tabKey)}
                  className={`w-full text-left px-3 py-2 rounded text-sm font-medium ${isActive ? 'bg-brand-50 text-brand-600' : 'text-text-secondary hover:bg-bg-muted'}`}
                >
                  {tab}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 border border-border-default bg-bg-surface rounded-xl p-8">
          {activeTab === 'profile' && (
            <div>
              <h3 className="text-xl font-bold mb-6">Profile</h3>

              <div className="mb-8">
                <label className="block text-sm font-medium mb-2">Avatar</label>
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-brand-200 rounded-full flex items-center justify-center text-brand-800 text-xl font-bold">
                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <button className="px-4 py-2 border border-border-default rounded text-sm font-medium hover:bg-bg-muted">Change avatar</button>
                </div>
              </div>

              <div className="mb-6 max-w-md">
                <label className="block text-sm font-medium mb-2">Username</label>
                <input type="text" className="w-full border border-border-default p-2 rounded" defaultValue={user?.username || ''} />
                <button className="mt-2 px-4 py-2 bg-brand-600 text-white rounded text-sm font-medium">Save username</button>
              </div>

              <div className="mb-6 max-w-md">
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <div className="flex justify-between items-center border border-border-default p-2 rounded bg-bg-muted">
                  <span className="text-text-secondary">{user?.phone_number || 'No phone number'}</span>
                  <button className="text-brand-600 text-sm font-medium hover:underline">Change</button>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'security' && (
             <div>
               <h3 className="text-xl font-bold mb-6">Security</h3>
               {/* Password change form */}
               <div className="mb-8 max-w-md">
                 <h4 className="text-sm font-medium mb-4">Change Password</h4>
                 <div className="space-y-4">
                   <input type="password" placeholder="Current password" className="w-full border border-border-default p-2 rounded" />
                   <input type="password" placeholder="New password" className="w-full border border-border-default p-2 rounded" />
                   <input type="password" placeholder="Confirm new password" className="w-full border border-border-default p-2 rounded" />
                   <button className="px-4 py-2 bg-brand-600 text-white rounded text-sm font-medium">Update password</button>
                 </div>
               </div>

               <div className="mb-8 border-t border-border-default pt-8">
                 <h4 className="text-sm font-medium mb-4">Active Sessions</h4>
                 <div className="space-y-4">
                    <div className="border border-border-default rounded p-4 flex justify-between items-center">
                       <div>
                         <p className="font-medium">Chrome on macOS <span className="ml-2 text-xs bg-status-success-bg text-status-success-text px-2 py-0.5 rounded">This device</span></p>
                         <p className="text-xs text-text-secondary mt-1">192.168.*.* • Last active just now</p>
                       </div>
                       <button className="text-sm text-brand-600 font-medium hover:underline">Log out of this device</button>
                    </div>
                 </div>
               </div>
             </div>
          )}

          {activeTab === 'danger_zone' && (
             <div>
                <h3 className="text-xl font-bold mb-6 text-status-danger-text">Danger Zone</h3>
                <p className="text-sm text-text-secondary mb-6">Permanently deleting your account will immediately suspend access. Your data will be retained for 30 days.</p>
                <button className="px-4 py-2 bg-status-danger-bg text-status-danger-text border border-status-danger-border rounded font-medium">Delete my account</button>
             </div>
          )}
        </main>
      </div>
    </div>
  );
}
