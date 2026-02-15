'use client';

import { Github, Coffee } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className='mt-12 py-6 border-t border-gray-100 dark:border-gray-800 text-gray-400 dark:text-gray-500'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-4 text-xs'>
          <div className='flex items-center gap-1'>
            <span>© {new Date().getFullYear()}</span>
            <a
              href='https://www.abdelkader.pro/'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:underline'
            >
              abdelkaderbzz
            </a>
          </div>

          <div className='flex items-center gap-4'>
            <a
              href='https://github.com/Abdelkaderbzz/ramadan-tracker'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 transition-all font-medium text-gray-500'
            >
              <Github className='h-3.5 w-3.5' />
              <span>{t('contribution')}</span>
            </a>

            <a
              href='https://buymeacoffee.com/jhe1ep04xt'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 dark:bg-gray-800/50 hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:text-orange-600 transition-all font-medium text-gray-500'
            >
              <Coffee className='h-3.5 w-3.5' />
              <span>{t('buy_me_coffee')}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
