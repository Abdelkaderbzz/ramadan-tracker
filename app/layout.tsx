import type React from 'react';
import type { Metadata } from 'next';
import { Tajawal } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';

// Load Tajawal font - great for Arabic text
const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700'],
  variable: '--font-tajawal',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ramadhan-tracker.netlify.app'),
  title: {
    default: 'Ramadhan Tracker - تتبع عباداتك في رمضان',
    template: '%s | Ramadhan Tracker',
  },
  description:
    'تطبيق متكامل لتتبع العبادات والأعمال الصالحة خلال شهر رمضان المبارك. يتضمن تتبع الصلاة، الصيام، قراءة القرآن، والأدعية اليومية مع واجهة سهلة الاستخدام',
  keywords: [
    'Ramadhan Tracker',
    'رمضان',
    'تتبع العبادات',
    'تطبيق إسلامي',
    'الصلاة',
    'الصيام',
    'القرآن',
    'الأدعية',
    'التقويم الهجري',
    'مواقيت الصلاة',
    'تطبيق رمضاني',
    'Islamic App',
    'Ramadan App',
    'Prayer Times',
    'Quran Tracker',
    'Islamic Calendar',
  ],
  authors: [{ name: 'Ramadhan Tracker Team' }],
  creator: 'Ramadhan Tracker Team',
  publisher: 'Ramadhan Tracker',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: 'https://ramadhan-tracker.netlify.app',
    siteName: 'Ramadhan Tracker',
    title: 'Ramadhan Tracker - تتبع عباداتك في رمضان',
    description:
      'تطبيق متكامل لتتبع العبادات والأعمال الصالحة خلال شهر رمضان المبارك',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ramadhan Tracker - تتبع عباداتك في رمضان',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ramadhan Tracker - تتبع عباداتك في رمضان',
    description:
      'تطبيق متكامل لتتبع العبادات والأعمال الصالحة خلال شهر رمضان المبارك',
    images: ['/images/twitter-image.jpg'],
    creator: '@ramadhantracker',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
  },
  alternates: {
    canonical: 'https://ramadhan-tracker.netlify.app',
  },
  category: 'religion',
  classification: 'religious',
  referrer: 'origin-when-cross-origin',
  generator: 'Next.js',
  applicationName: 'Ramadhan Tracker',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ar' dir='rtl'>
      <head>
        <link rel='icon' href='/images/logo.svg' />
        <link rel='apple-touch-icon' href='/images/apple-touch-icon.png' />
        <link rel='manifest' href='/manifest.json' />
        <meta name='theme-color' content='#ffffff' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='Ramadhan Tracker' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='application-name' content='Ramadhan Tracker' />
      </head>
      <body className={`${tajawal.variable} font-sans`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

import './globals.css';
