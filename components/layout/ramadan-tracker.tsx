'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Calendar, BookOpen, BarChart3, Award, Printer } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  WorshipStats,
  DailyTrackingTable,
} from '@/components/features/dashboard';
import { PrayerTimes, DailyDua } from '@/components/features/prayer';
import { QuranTracker } from '@/components/features/quran';
import { RamadanJourney } from '@/components/features/journey/ramadan-journey';
import { AchievementBadges } from '@/components/features/achievements';
import { getCurrentHijriDate } from '@/lib/date-utils';
import { useRamadanStore } from '@/lib/store';
import { RAMADAN_DUAS, DUA_ROTATION_INTERVAL } from '@/lib/constants/duas';
import { Header } from '@/components/layout/header';
import { useLocale } from 'next-intl';

export default function RamadanTracker() {
  const t = useTranslations('Index');
  const tDash = useTranslations('Dashboard');
  const tDuas = useTranslations('HeaderDuas');
  const locale = useLocale();
  const [date, setDate] = useState('');
  const [hijriDate, setHijriDate] = useState('');
  const [currentDuaIndex, setCurrentDuaIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { initializeData } = useRamadanStore();

  const currentDua = useMemo(
    () => tDuas(`${currentDuaIndex}`),
    [currentDuaIndex, tDuas],
  );

  useEffect(() => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    setDate(
      now.toLocaleDateString(
        locale === 'ar' ? 'ar-u-nu-latn' : locale,
        options,
      ),
    );
    setHijriDate(getCurrentHijriDate(locale));
    initializeData();
  }, [initializeData, locale]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDuaIndex((prev) => (prev + 1) % RAMADAN_DUAS.length);
    }, DUA_ROTATION_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  const handlePrintDashboard = () => {
    if (typeof window === 'undefined') return;
    window.print();
  };

  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className='flex w-screen max-w-none no-print'>
        <Header
          title={t('my_day')}
          subtitle={t('track_worship')}
          date={date}
          hijriDate={hijriDate}
          currentDua={currentDua}
          currentDuaIndex={currentDuaIndex}
          handlePrintDashboard={handlePrintDashboard}
        />
      </div>

      <div className='container mx-auto px-4 py-8 max-w-6xl'>
        <Tabs
        defaultValue='dashboard'
        className='w-full no-print'
        onValueChange={handleTabChange}
      >
        <div className='sticky top-0 z-20 bg-background/80 dark:bg-gray-950/80 backdrop-blur-md mb-6 py-2 -mx-4 px-4 border-b dark:border-gray-800 md:relative md:top-auto md:bg-transparent md:dark:bg-transparent md:backdrop-blur-none md:border-none md:p-0 md:m-0'>
          <TabsList className='grid grid-cols-4 md:grid-cols-4 h-auto bg-transparent md:bg-muted dark:md:bg-gray-800 p-0 md:p-1 gap-1 md:gap-2'>
            <TabsTrigger
              value='dashboard'
              className='flex-col md:flex-row gap-1 py-3 md:py-1.5
                text-gray-600 dark:text-gray-400
                data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700
                dark:data-[state=active]:bg-purple-900/40 dark:data-[state=active]:text-purple-300
                md:data-[state=active]:bg-background md:data-[state=active]:text-foreground
                dark:md:data-[state=active]:bg-gray-700 dark:md:data-[state=active]:text-gray-100'
            >
              <BarChart3 className='h-5 w-5 md:h-4 md:w-4' />
              <span className='text-[10px] sm:text-xs md:text-sm'>
                {t('dashboard')}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value='quran'
              className='flex-col md:flex-row gap-1 py-3 md:py-1.5
                text-gray-600 dark:text-gray-400
                data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700
                dark:data-[state=active]:bg-purple-900/40 dark:data-[state=active]:text-purple-300
                md:data-[state=active]:bg-background md:data-[state=active]:text-foreground
                dark:md:data-[state=active]:bg-gray-700 dark:md:data-[state=active]:text-gray-100'
            >
              <BookOpen className='h-5 w-5 md:h-4 md:w-4' />
              <span className='text-[10px] sm:text-xs md:text-sm'>
                {t('quran')}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value='journey'
              className='flex-col md:flex-row gap-1 py-3 md:py-1.5
                text-gray-600 dark:text-gray-400
                data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700
                dark:data-[state=active]:bg-purple-900/40 dark:data-[state=active]:text-purple-300
                md:data-[state=active]:bg-background md:data-[state=active]:text-foreground
                dark:md:data-[state=active]:bg-gray-700 dark:md:data-[state=active]:text-gray-100'
            >
              <Calendar className='h-5 w-5 md:h-4 md:w-4' />
              <span className='text-[10px] sm:text-xs md:text-sm'>
                {t('journey')}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value='achievements'
              className='flex-col md:flex-row gap-1 py-3 md:py-1.5
                text-gray-600 dark:text-gray-400
                data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700
                dark:data-[state=active]:bg-purple-900/40 dark:data-[state=active]:text-purple-300
                md:data-[state=active]:bg-background md:data-[state=active]:text-foreground
                dark:md:data-[state=active]:bg-gray-700 dark:md:data-[state=active]:text-gray-100'
            >
              <Award className='h-5 w-5 md:h-4 md:w-4' />
              <span className='text-[10px] sm:text-xs md:text-sm'>
                {t('achievements')}
              </span>
            </TabsTrigger>
          </TabsList>
        </div>

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

        <TabsContent value='journey'>
          <div className='bg-white dark:bg-gray-900 rounded-lg'>
            <RamadanJourney />
          </div>
        </TabsContent>

          <TabsContent value='achievements'>
            <AchievementBadges />
          </TabsContent>
        </Tabs>

        <div
          className={`print-only ${locale === 'ar' ? 'rtl' : 'ltr'}`}
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
        >
        {[
          { startDay: 1, endDay: 15, isLast: false },
          { startDay: 16, endDay: 30, isLast: true },
        ].map(({ startDay, endDay, isLast }, pageIndex) => {
          const duas = [
            locale === 'ar'
              ? 'اللهم إنك عفو تحب العفو فاعف عني'
              : 'O Allah, You are Forgiving and love forgiveness, so forgive me',
            locale === 'ar'
              ? 'اللهم بارك لنا في رمضان وبلغنا ليلة القدر'
              : 'O Allah, bless us in Ramadan and let us reach Laylat al-Qadr',
          ];
          return (
            <div key={pageIndex} className={!isLast ? 'print-page-break' : ''}>
              <div className='print-header'>
                <div className='print-title'>
                  {locale === 'ar'
                    ? '🌙 يومي في رمضان 🌙'
                    : '🌙 My Day in Ramadan 🌙'}
                </div>
                <div className='print-dua'>{duas[pageIndex]}</div>
              </div>

              <div className='print-page-label'>
                {locale === 'ar'
                  ? `الأيام ${startDay} – ${endDay}`
                  : `Days ${startDay} – ${endDay}`}
              </div>

              <table className='print-table'>
                <thead>
                  <tr>
                    <th>{tDash('table.day')}</th>
                    <th>{tDash('table.fard')}</th>
                    <th>{tDash('table.qiyam')}</th>
                    <th>{tDash('table.duha')}</th>
                    <th>{tDash('table.rawatib')}</th>
                    <th>{tDash('table.quran')}</th>
                    <th>{tDash('table.dhikr_morning')}</th>
                    <th>{tDash('table.dhikr_evening')}</th>
                    <th>{tDash('table.charity')}</th>
                    <th>{tDash('table.family')}</th>
                    <th>{tDash('table.happiness')}</th>
                    <th>{tDash('table.feeding')}</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from(
                    { length: endDay - startDay + 1 },
                    (_, i) => startDay + i
                  ).map((day) => (
                    <tr key={day}>
                      <td style={{ fontWeight: 600 }}>
                        {tDash('table.day')} {day}
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className='print-footer'>ramadantracker.tech</div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
