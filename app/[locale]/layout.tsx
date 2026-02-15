import type React from 'react';
import type { Metadata, Viewport } from 'next';
import { Tajawal } from 'next/font/google';
import '@/app/globals.css';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { PwaInstallPrompt } from '@/components/pwa-install-prompt';
import { Footer } from '@/components/layout/footer';

// Load Tajawal font - great for Arabic text
const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700'],
  variable: '--font-tajawal',
});

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://ramadhan-tracker.netlify.app'),
  title: {
    default: 'Ramadan Tracker - Track Your Worship in Ramadan',
    template: '%s | Ramadan Tracker',
  },
  description:
    'The ultimate Ramadan Tracker app for 2026. Track your prayers, fasts, Quran recitation, and daily adhkar with our intuitive, multilingual interface. Available in Arabic, English, and French.',
  keywords: [
    'Ramadan Tracker',
    'Ramadan 2026 tracker',
    'رمضان',
    'تتبع العبادات',
    'رمضان 2026',
    'تطبيق إسلامي',
    'Prayer tracking app',
    'Quran progress tracker',
    'Islamic daily planner',
    'Ramadan goals app',
    'Hijri calendar 1447',
    'Muslim worship app',
  ],
  authors: [{ name: 'Ramadan Tracker' }],
  creator: 'Ramadan Tracker',
  publisher: 'Ramadan Tracker',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: 'https://ramadhan-tracker.netlify.app',
    siteName: 'Ramadan Tracker',
    title: 'Ramadan Tracker - The Best Way to Track Your Worship in Ramadan',
    description:
      'Monitor your spiritual progress this Ramadan with our comprehensive tracking app. Prayers, Quran, Duas, and more!',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ramadan Tracker - Track your spiritual journey',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ramadan Tracker - Stay Consistent This Ramadan',
    description:
      'A beautiful and intuitive app to help you reach your worship goals during the holy month.',
    images: ['/images/twitter-image.jpg'],
    creator: '@ramadantracker',
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
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const currentLocale = locale || 'en';
  const messages = await getMessages({ locale: currentLocale });

  return (
    <html
      lang={currentLocale}
      dir={currentLocale === 'ar' ? 'rtl' : 'ltr'}
      suppressHydrationWarning
    >
      <head>
        <link rel='icon' href='/images/logo.svg' />
        <link rel='apple-touch-icon' href='/images/apple-touch-icon.png' />
        <link rel='manifest' href='/manifest.json' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='Ramadan Tracker' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='application-name' content='Ramadan Tracker' />
      </head>
      <body className={`${tajawal.variable} font-sans`}>
        {/* Google Analytics */}
        <Script
          src='https://www.googletagmanager.com/gtag/js?id=G-WR56K4TNMK'
          strategy='afterInteractive'
        />
        <Script id='google-analytics' strategy='afterInteractive'>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WR56K4TNMK');
          `}
        </Script>

        <Script
          id='feeduser-widget'
          src='https://widget.feeduser.me/widget/v1.js'
          strategy='afterInteractive'
        />

        <Script id='feeduser-config' strategy='afterInteractive'>
          {`
            window.Fu = window.Fu || {};
            window.Fu.account_id = "679fce8444a7f340866087b2";
          `}
        </Script>

        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute='class'
            defaultTheme='light'
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Footer />
            <PwaInstallPrompt />
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
