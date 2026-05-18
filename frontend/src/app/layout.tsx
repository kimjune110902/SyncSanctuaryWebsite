import './globals.css';
import React from 'react';
import localFont from 'next/font/local';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: 'SyncSanctuary — Professional Church Media Production Suite',
  description: 'AI-powered video editing, live presentation, and transcription for church media teams.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body style={{ backgroundColor: '#050A18', color: '#F0F4FF', fontFamily: 'var(--font-geist-sans), system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
