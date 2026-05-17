import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'ko', 'de', 'es', 'fr', 'zh-CN', 'zh-TW', 'ja', 'pt-BR', 'pt-PT', 'it', 'ar'] as const;

export const routing = defineRouting({
  locales: locales,
  defaultLocale: 'en'
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
