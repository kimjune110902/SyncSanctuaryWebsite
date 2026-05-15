"use client";
import CookieConsent from "../components/CookieConsent";
import './globals.css';
import { useEffect } from 'react';
import { useAuthStore } from '../store/auth';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { login, logout, setLoading } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const res = await fetch('/api/v1/auth/refresh', { method: 'POST' });
        if (res.ok) {
          const data = await res.json();
          login(data.user, data.access_token);
        } else {
          logout();
        }
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, [login, logout, setLoading]);

  return (
    <html lang="en">
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
