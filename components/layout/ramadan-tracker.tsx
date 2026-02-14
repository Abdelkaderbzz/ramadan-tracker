'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Calendar, BookOpen, BarChart3, Award } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  WorshipStats,
  DailyTrackingTable,
} from '@/components/features/dashboard';
import { PrayerTimes, DailyDua } from '@/components/features/prayer';
import { QuranTracker } from '@/components/features/quran';
import { IslamicCalendar } from '@/components/features/calendar';
import { AchievementBadges } from '@/components/features/achievements';
import { getCurrentHijriDate } from '@/lib/date-utils';
import { useRamadanStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { RAMADAN_DUAS, DUA_ROTATION_INTERVAL } from '@/lib/constants/duas';

import LanguageSwitcher from '@/components/language-switcher';

export default function RamadanTracker() {
  const t = useTranslations('Index');
  const [date, setDate] = useState('');
  const [hijriDate, setHijriDate] = useState('');
  const [currentDuaIndex, setCurrentDuaIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { initializeData } = useRamadanStore();

  const currentDua = useMemo(
    () => RAMADAN_DUAS[currentDuaIndex],
    [currentDuaIndex],
  );

  // Initialize on mount
  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    setDate(now.toLocaleDateString('ar-SA', options));
    setHijriDate(getCurrentHijriDate());
    initializeData();
  }, [initializeData]);

  // Rotate duas
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDuaIndex((prev) => (prev + 1) % RAMADAN_DUAS.length);
    }, DUA_ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  return (
    <div className='container mx-auto px-4 py-8 max-w-6xl'>
      <div className='flex justify-end mb-4'>
        <LanguageSwitcher />
      </div>
      <div className='text-center mb-8 relative'>
        <div className='absolute right-0 top-0 opacity-10'>
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
          {t('my_day')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='text-purple-600 text-center rtl'
        >
          {t('track_worship')}
        </motion.p>

        <Card className='mt-6 max-w-2xl mx-auto p-4 rtl shadow-md border-purple-100'>
          <div className='flex justify-between items-center'>
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
              className='text-sm mt-4 text-purple-900 transition-opacity duration-500'
            >
              {currentDua}
            </motion.p>
          </AnimatePresence>
        </Card>
      </div>

      <Tabs
        defaultValue='dashboard'
        className='w-full'
        onValueChange={handleTabChange}
      >
        <TabsList className='grid grid-cols-2 md:grid-cols-4 mb-8 h-auto'>
          <TabsTrigger value='dashboard' className='rtl'>
            <BarChart3 className='h-4 w-4 ml-2' />
            {t('dashboard')}
          </TabsTrigger>
          <TabsTrigger value='quran' className='rtl'>
            <BookOpen className='h-4 w-4 ml-2' />
            {t('quran')}
          </TabsTrigger>
          <TabsTrigger value='calendar' className='rtl'>
            <Calendar className='h-4 w-4 ml-2' />
            {t('calendar')}
          </TabsTrigger>
          <TabsTrigger value='achievements' className='rtl'>
            <Award className='h-4 w-4 ml-2' />
            {t('achievements')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value='dashboard' className='space-y-8'>
          <WorshipStats />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <DailyDua />
            <PrayerTimes />
          </div>
          <DailyTrackingTable />
        </TabsContent>

        <TabsContent value='quran'>
          <QuranTracker />
        </TabsContent>

        <TabsContent value='calendar'>
          <IslamicCalendar />
        </TabsContent>

        <TabsContent value='achievements'>
          <AchievementBadges />
        </TabsContent>
      </Tabs>
    </div>
  );
}
