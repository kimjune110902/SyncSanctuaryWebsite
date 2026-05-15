"use client";
import React, { useState, useEffect } from 'react';
import Navigation from '../../../components/Navigation';
import { useAuthStore } from '../../../store/auth';
import AvatarUploadModal from '../../../components/AvatarUploadModal';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const { user, login } = useAuthStore();

  const [username, setUsername] = useState(user?.username || '');
  const [emailForm, setEmailForm] = useState(user?.email || '');
  const [passwordForm, setPasswordForm] = useState({ current_password: '', new_password: '', confirm_password: '' });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sessions, setSessions] = useState<any[]>([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmailForm(user.email || '');
    }
  }, [user]);

  useEffect(() => {
    if (activeTab === 'security') {
      fetch('/api/v1/account/sessions', {
        headers: { 'Authorization': `Bearer ${useAuthStore.getState().accessToken}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.sessions) setSessions(data.sessions);
      });
    }
  }, [activeTab]);

  const handleUpdateUsername = async () => {
    try {
      const res = await fetch('/api/v1/account/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${useAuthStore.getState().accessToken}`
        },
        body: JSON.stringify({ username })
      });
      const data = await res.json();
      if (res.ok) {
        login(data.user, useAuthStore.getState().accessToken!);
        setMessage({ type: 'success', text: 'Username updated successfully.' });
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error' });
    }
  };

  const handleAddOrChangeEmail = async () => {
    try {
      const res = await fetch('/api/v1/account/email/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${useAuthStore.getState().accessToken}`
        },
        body: JSON.stringify({ email: emailForm })
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: 'success', text: 'Verification email sent. Please check your inbox.' });
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error' });
    }
  };

  const handleRemoveEmail = async () => {
    try {
      const res = await fetch('/api/v1/account/email/remove', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${useAuthStore.getState().accessToken}`
        }
      });
      if (res.ok) {
        setEmailForm('');
        setMessage({ type: 'success', text: 'Email removed successfully.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error' });
    }
  };

  const handleDataExport = async () => {
    try {
      const res = await fetch('/api/v1/account/data-export', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${useAuthStore.getState().accessToken}` }
      });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Export requested — check your email within 5 minutes.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error' });
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.new_password !== passwordForm.confirm_password) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    try {
      const res = await fetch('/api/v1/account/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${useAuthStore.getState().accessToken}`
        },
        body: JSON.stringify({
          current_password: passwordForm.current_password,
          new_password: passwordForm.new_password
        })
      });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Password changed successfully.' });
        setPasswordForm({ current_password: '', new_password: '', confirm_password: '' });
      } else {
        const data = await res.json();
        setMessage({ type: 'error', text: data.error });
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error' });
    }
  };

  const handleRevokeSession = async (id: string) => {
    try {
      const res = await fetch(`/api/v1/account/sessions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${useAuthStore.getState().accessToken}`
        }
      });
      if (res.ok) {
        setSessions(sessions.filter(s => s.id !== id));
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error' });
    }
  };

  const handleDeleteAccount = async () => {
    const pwd = prompt("Enter your current password to confirm");
    if (!pwd) return;
    const phrase = prompt("Type DELETE MY ACCOUNT to confirm");
    if (phrase !== 'DELETE MY ACCOUNT') return;

    try {
      const res = await fetch('/api/v1/account/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${useAuthStore.getState().accessToken}`
        },
        body: JSON.stringify({ password: pwd })
      });
      if (res.ok) {
        window.location.href = '/';
      } else {
        const data = await res.json();
        setMessage({ type: 'error', text: data.error });
      }
    } catch {
      setMessage({ type: 'error', text: 'Network error' });
    }
  };

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
                  onClick={() => { setActiveTab(tabKey); setMessage({ type: '', text: '' }); }}
                  className={`w-full text-left px-3 py-2 rounded text-sm font-medium ${isActive ? 'bg-brand-50 text-brand-600' : 'text-text-secondary hover:bg-bg-muted'}`}
                >
                  {tab}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 border border-border-default bg-bg-surface rounded-xl p-8">
          {message.text && (
            <div className={`mb-6 p-4 rounded ${message.type === 'error' ? 'bg-status-danger-bg text-status-danger-text' : 'bg-status-success-bg text-status-success-text'}`}>
              {message.text}
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <h3 className="text-xl font-bold mb-6">Profile</h3>

              <div className="mb-8">
                <label className="block text-sm font-medium mb-2">Avatar</label>
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-brand-200 rounded-full flex items-center justify-center text-brand-800 text-xl font-bold overflow-hidden">
                    {user?.avatar_url ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={user.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      user?.username?.charAt(0).toUpperCase() || 'U'
                    )}
                  </div>
                  <button onClick={() => setIsAvatarModalOpen(true)} className="px-4 py-2 border border-border-default rounded text-sm font-medium hover:bg-bg-muted">Change avatar</button>
                </div>
              </div>

              <div className="mb-6 max-w-md">
                <label className="block text-sm font-medium mb-2">Username</label>
                <input type="text" className="w-full border border-border-default p-2 rounded text-text-primary bg-bg-surface" value={username} onChange={e => setUsername(e.target.value)} />
                <button onClick={handleUpdateUsername} className="mt-2 px-4 py-2 bg-brand-600 text-white rounded text-sm font-medium">Save username</button>
              </div>

              <div className="mb-6 max-w-md">
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <div className="flex justify-between items-center border border-border-default p-2 rounded bg-bg-muted">
                  <span className="text-text-secondary">{user?.phone_number || 'No phone number'}</span>
                  <button className="text-brand-600 text-sm font-medium hover:underline">Change</button>
                </div>
              </div>

              <div className="mb-6 max-w-md">
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <div className="flex flex-col space-y-2">
                   <input type="email" className="w-full border border-border-default p-2 rounded text-text-primary bg-bg-surface" value={emailForm} onChange={e => setEmailForm(e.target.value)} placeholder="Email address" />
                   <div className="flex space-x-2">
                     <button onClick={handleAddOrChangeEmail} className="px-4 py-2 bg-brand-600 text-white rounded text-sm font-medium">{user?.email ? 'Change Email' : 'Add Email'}</button>
                     {user?.email && <button onClick={handleRemoveEmail} className="px-4 py-2 text-status-danger-text border border-status-danger-border rounded text-sm font-medium hover:bg-status-danger-bg">Remove Email</button>}
                   </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'security' && (
             <div>
               <h3 className="text-xl font-bold mb-6">Security</h3>
               <form onSubmit={handleChangePassword} className="mb-8 max-w-md">
                 <h4 className="text-sm font-medium mb-4">Change Password</h4>
                 <div className="space-y-4">
                   <input type="password" placeholder="Current password" required value={passwordForm.current_password} onChange={e => setPasswordForm({...passwordForm, current_password: e.target.value})} className="w-full border border-border-default p-2 rounded text-text-primary bg-bg-surface" />
                   <input type="password" placeholder="New password" required value={passwordForm.new_password} onChange={e => setPasswordForm({...passwordForm, new_password: e.target.value})} className="w-full border border-border-default p-2 rounded text-text-primary bg-bg-surface" />
                   <input type="password" placeholder="Confirm new password" required value={passwordForm.confirm_password} onChange={e => setPasswordForm({...passwordForm, confirm_password: e.target.value})} className="w-full border border-border-default p-2 rounded text-text-primary bg-bg-surface" />
                   <button type="submit" className="px-4 py-2 bg-brand-600 text-white rounded text-sm font-medium">Update password</button>
                 </div>
               </form>

               <div className="mb-8 border-t border-border-default pt-8">
                 <h4 className="text-sm font-medium mb-4">Active Sessions</h4>
                 <div className="space-y-4">
                    {sessions.map(s => (
                      <div key={s.id} className="border border-border-default rounded p-4 flex justify-between items-center">
                         <div>
                           <p className="font-medium">{s.device_name || 'Unknown Device'} {s.is_current && <span className="ml-2 text-xs bg-status-success-bg text-status-success-text px-2 py-0.5 rounded">This device</span>}</p>
                           <p className="text-xs text-text-secondary mt-1">{s.ip_address || 'Unknown IP'} • Last active {new Date(s.last_used_at).toLocaleString()}</p>
                         </div>
                         <button onClick={() => handleRevokeSession(s.id)} className="text-sm text-brand-600 font-medium hover:underline">Revoke</button>
                      </div>
                    ))}
                 </div>
               </div>
             </div>
          )}

          {activeTab === 'your_data' && (
            <div>
               <h3 className="text-xl font-bold mb-6">Your Data</h3>
               <p className="text-text-secondary mb-6">You have the right to receive a copy of all personal data we hold about you.</p>
               <button onClick={handleDataExport} className="px-4 py-2 bg-brand-600 text-white rounded text-sm font-medium">Request data export</button>
            </div>
          )}

          {activeTab === 'danger_zone' && (
             <div>
                <h3 className="text-xl font-bold mb-6 text-status-danger-text">Danger Zone</h3>
                <p className="text-sm text-text-secondary mb-6">Permanently deleting your account will immediately suspend access. Your data will be retained for 30 days.</p>
                <button onClick={handleDeleteAccount} className="px-4 py-2 bg-status-danger-bg text-status-danger-text border border-status-danger-border rounded font-medium hover:bg-status-danger-border">Delete my account</button>
             </div>
          )}

          {/* Placeholders for remaining tabs */}
          {(activeTab === 'preferences') && (
            <div>
               <h3 className="text-xl font-bold mb-6 capitalize">{activeTab.replace('_', ' ')}</h3>
               <p className="text-text-secondary mb-4">Feature not implemented in this milestone.</p>
               <button onClick={() => setMessage({ type: 'success', text: `Mock Action for ${activeTab} completed.` })} className="px-4 py-2 bg-brand-600 text-white rounded text-sm font-medium">Perform Action</button>
            </div>
          )}

        </main>
      </div>

      <AvatarUploadModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        onUploadSuccess={(url) => {
            if(user) login({...user, avatar_url: url}, useAuthStore.getState().accessToken!);
            setMessage({ type: 'success', text: 'Avatar updated successfully!' });
        }}
      />
    </div>
  );
}
