'use client';

import { Github, Coffee, Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className='mt-12 py-6 border-t border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-4 text-sm'>
          <div className='flex items-center gap-1'>
            <span>© {new Date().getFullYear()}</span>
            <a
              href='https://www.abdelkader.pro/'
              target='_blank'
              rel='noopener noreferrer'
              className='font-medium hover:text-purple-600 transition-colors'
            >
              abdelkaderbzz
            </a>
          </div>

          <div className='flex items-center gap-6'>
            <a
              href='https://github.com/Abdelkaderbzz/ramadan-tracker'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-105 active:scale-95 shadow-sm'
            >
              <Github className='h-3.5 w-3.5' />
              <span>{t('contribution')}</span>
            </a>

            <a
              href='https://www.abdelkader.pro/'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 px-3 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 hover:bg-purple-200 dark:hover:bg-purple-900/60 transition-all hover:scale-105 active:scale-95 shadow-sm'
            >
              <Globe className='h-3.5 w-3.5' />
              <span>{t('portfolio')}</span>
            </a>

            <a
              href='https://buymeacoffee.com/jhe1ep04xt'
              target='_blank'
              rel='noopener noreferrer'
              className='bg-[#FFDD00] text-black px-3 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 hover:bg-[#FFDD00]/90 transition-all hover:scale-105 active:scale-95 shadow-sm'
            >
              <Coffee className='h-3.5 w-3.5 fill-black' />
              <span>{t('buy_me_coffee')}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
