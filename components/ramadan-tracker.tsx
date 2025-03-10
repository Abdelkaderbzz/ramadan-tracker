'use client';

import { useState, useEffect } from 'react';
import {
  Calendar,
  BookOpen,
  BarChart3,
  Award,
  Compass,
  Sun,
  Moon,
  Bot,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WorshipStats from '@/components/worship-stats';
import PrayerTimes from '@/components/prayer-times';
import WaterTracker from '@/components/water-tracker';
import DailyDua from '@/components/daily-dua';
import DailyTrackingTable from '@/components/daily-tracking-table';
import { getCurrentHijriDate } from '@/lib/date-utils';
import { useRamadanStore } from '@/lib/store';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import QiblaFinder from '@/components/qibla-finder';
import AchievementBadges from '@/components/achievement-badges';
import QuranTracker from '@/components/quran-tracker';
import IslamicCalendar from '@/components/islamic-calendar';
import AISimpleDashboard from '@/components/ai-simple-dashboard';

export default function RamadanTracker() {
  const [date, setDate] = useState('');
  const [hijriDate, setHijriDate] = useState('');
  const [currentDua, setCurrentDua] = useState(
    'رب اغفر وارحم وأنت خير الراحمين'
  );
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { initializeData } = useRamadanStore();
  const { theme, setTheme } = useTheme();

  // Array of duas to rotate
  const duas = [
    'رب اغفر وارحم وأنت خير الراحمين',
    'اللهم إني أسألك الجنة وأعوذ بك من النار',
    'اللهم اغفر لي ذنبي كله دقه وجله وأوله وآخره وعلانيته وسره',
    'اللهم إني أسألك العفو والعافية في الدنيا والآخرة',
    'اللهم إني صائم فتقبل مني إنك أنت السميع العليم',
    'اللهم لك صمت وعلى رزقك أفطرت وبك آمنت وعليك توكلت',
    'اللهم إنك عفو تحب العفو فاعف عني',
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Set current Gregorian date
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    setDate(now.toLocaleDateString('ar-SA', options));

    // Get Hijri date
    setHijriDate(getCurrentHijriDate());

    // Initialize store with 30 days of Ramadan
    initializeData();
  }, [initializeData]);

  // Rotate duas every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDua((prev) => {
        const currentIndex = duas.indexOf(prev);
        const nextIndex = (currentIndex + 1) % duas.length;
        return duas[nextIndex];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='container mx-auto px-4 py-8 max-w-6xl'>
      <div className='text-center mb-8 relative'>
        <div className='absolute right-0 top-0 opacity-10'>
          <div
            className='w-full h-72 bg-contain bg-no-repeat bg-right'
            style={{ backgroundImage: "url('/images/islamic-pattern.svg')" }}
          ></div>
        </div>

        <div className='absolute left-4 top-4'>
          {mounted && (
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className='rounded-full'
            >
              {theme === 'dark' ? (
                <Sun className='h-5 w-5' />
              ) : (
                <Moon className='h-5 w-5' />
              )}
            </Button>
          )}
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center text-3xl md:text-4xl font-bold text-purple-800 mb-2 rtl'
        >
          يومي في رمضان
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='text-purple-600 text-center rtl'
        >
          تتبع عباداتك وأعمالك الصالحة
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
              key={currentDua}
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
        onValueChange={setActiveTab}
      >
        <TabsList className='grid grid-cols-5 mb-8'>
          <TabsTrigger value='dashboard' className='rtl'>
            <BarChart3 className='h-4 w-4 ml-2' />
            لوحة المعلومات
          </TabsTrigger>
          <TabsTrigger value='quran' className='rtl'>
            <BookOpen className='h-4 w-4 ml-2' />
            القرآن
          </TabsTrigger>
          <TabsTrigger value='tools' className='rtl'>
            <Compass className='h-4 w-4 ml-2' />
            أدوات
          </TabsTrigger>
          <TabsTrigger value='achievements' className='rtl'>
            <Award className='h-4 w-4 ml-2' />
            الإنجازات
          </TabsTrigger>
          <TabsTrigger value='assistant' className='rtl'>
            <Bot className='h-4 w-4 ml-2' />
            المساعد
          </TabsTrigger>
        </TabsList>

        <TabsContent value='dashboard' className='space-y-8'>
          <WorshipStats />

          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            <DailyDua />
            <PrayerTimes />
            <WaterTracker />
          </div>

          <DailyTrackingTable />
        </TabsContent>

        <TabsContent value='quran'>
          <QuranTracker />
        </TabsContent>

        <TabsContent value='tools'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <QiblaFinder />
            <IslamicCalendar />
          </div>
        </TabsContent>

        <TabsContent value='achievements'>
          <AchievementBadges />
        </TabsContent>

        <TabsContent value='assistant'>
          <AISimpleDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
}
