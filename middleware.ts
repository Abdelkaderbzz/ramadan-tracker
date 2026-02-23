import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  
  locales: ['en', 'fr', 'ar'],

  
  defaultLocale: 'en',
});

export const config = {
  
  matcher: ['/', '/(ar|en|fr)/:path*'],
};
