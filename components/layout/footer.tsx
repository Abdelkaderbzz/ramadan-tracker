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
            <span>
              © {new Date().getFullYear()} {t('made_by')}
            </span>
            <a
              href='https://www.abdelkader.pro/'
              target='_blank'
              rel='noopener noreferrer'
              className='hover:underline hover:text-gray-600 dark:hover:text-gray-300'
            >
              abdelkaderbzz
            </a>
          </div>

          <div className='flex items-center gap-4'>
            <a
              href='https://github.com/Abdelkaderbzz/ramadan-tracker'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 text-sm font-medium transition-all'
            >
              <Github className='h-4 w-4' />
              <span>{t('contribution')}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
