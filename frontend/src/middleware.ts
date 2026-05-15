import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'ko', 'de', 'es', 'fr', 'zh-CN', 'zh-TW', 'ja', 'pt-BR', 'pt-PT', 'it', 'ar'],
  defaultLocale: 'en'
});

export const config = {
  matcher: ['/', '/(en|ko|de|es|fr|zh-CN|zh-TW|ja|pt-BR|pt-PT|it|ar)/:path*']
};
