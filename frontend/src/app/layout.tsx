import './globals.css';
import React from 'react';

export const metadata = {
  title: 'SyncSanctuary',
  description: 'AI-powered video editing, live presentation control...',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
