'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { InstallAppButton } from '@/components/install-app-button';
import LanguageSwitcher from '@/components/language-switcher';

interface HeaderProps {
  title: string;
  subtitle: string;
  date: string;
  hijriDate: string;
  currentDua: string;
  currentDuaIndex: number;
}

export function Header({
  title,
  subtitle,
  date,
  hijriDate,
  currentDua,
  currentDuaIndex,
}: HeaderProps) {
  return (
    <header className='mb-8 relative'>
      <div className='flex justify-between items-center mb-6'>
        <div className='flex items-center gap-2'>
          <InstallAppButton />
        </div>
        <LanguageSwitcher />
      </div>

      <div className='text-center relative'>
        <div className='absolute right-0 top-0 opacity-10 pointer-events-none'>
          <div
            className='w-full h-72 bg-contain bg-no-repeat bg-right'
            style={{ backgroundImage: "url('/images/islamic-pattern.svg')" }}
          />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center text-3xl md:text-4xl font-bold text-purple-800 mb-2 rtl'
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='text-purple-600 text-center rtl px-4'
        >
          {subtitle}
        </motion.p>

        <Card className='mt-6 max-w-2xl mx-4 md:mx-auto p-4 rtl shadow-md border-purple-100 dark:border-purple-900'>
          <div className='flex justify-between items-center text-sm md:text-base'>
            <div className='flex items-center gap-2'>
              <Calendar className='h-5 w-5 text-purple-600' />
              <span>{date}</span>
            </div>
            <span>{hijriDate}</span>
          </div>
          <AnimatePresence mode='wait'>
            <motion.p
              key={currentDuaIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className='text-sm mt-4 text-purple-900 dark:text-purple-200 transition-opacity duration-500 min-h-[40px] flex items-center justify-center'
            >
              {currentDua}
            </motion.p>
          </AnimatePresence>
        </Card>
      </div>
    </header>
  );
}
