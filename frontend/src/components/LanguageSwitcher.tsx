"use client";
import React from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '../navigation';
import { locales } from '../navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm">🌐</span>
      <select
        value={locale}
        onChange={handleLanguageChange}
        className="bg-transparent text-sm border border-border-default rounded p-1 outline-none focus:border-brand-500"
      >
        {locales.map((l) => (
          <option key={l} value={l} className="text-text-primary bg-bg-surface">{l.toUpperCase()}</option>
        ))}
      </select>
    </div>
  );
}
