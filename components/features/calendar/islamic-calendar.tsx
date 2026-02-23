'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations, useLocale } from 'next-intl';

type IslamicDate = {
  day: number;
  month: string;
  year: number;
  gregorian: string;
  isToday: boolean;
  isSpecialDay: boolean;
  specialDayName?: string;
};


const islamicMonthKeys = [
  'Muharram',
  'Safar',
  "Rabi' al-Awwal",
  "Rabi' al-Thani",
  'Jumada al-Awwal',
  'Jumada al-Thani',
  'Rajab',
  "Sha'ban",
  'Ramadan',
  'Shawwal',
  "Dhu al-Qi'dah",
  'Dhu al-Hijjah',
];


const specialDaysMap = [
  { month: 8, day: 1, key: 'ramadan_start' }, 
  { month: 8, day: 27, key: 'laylat_al_qadr' }, 
  { month: 9, day: 1, key: 'eid_fitr' }, 
  { month: 11, day: 10, key: 'eid_adha' }, 
  { month: 0, day: 10, key: 'ashura' }, 
  { month: 2, day: 12, key: 'mawlid' }, 
  { month: 6, day: 27, key: 'isra_miraj' }, 
  { month: 7, day: 15, key: 'mid_shaban' }, 
];



const daysInIslamicMonth = (month: number) => {
  
  
  return month % 2 === 0 ? 30 : 29;
};

export default function IslamicCalendar() {
  const t = useTranslations('Calendar');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  
  const today = useMemo(() => new Date(), []);

  
  
  const [currentMonth, setCurrentMonth] = useState<number>(8); 
  const [currentYear, setCurrentYear] = useState<number>(1445);
  const [todayHijri, setTodayHijri] = useState<{
    day: number;
    month: number;
    year: number;
  }>({
    day: 15,
    month: 8,
    year: 1445,
  });

  
  useEffect(() => {
    try {
      
      const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      });

      const parts = formatter.formatToParts(today);
      const day = Number.parseInt(
        parts.find((part) => part.type === 'day')?.value || '15',
      );
      const month =
        Number.parseInt(
          parts.find((part) => part.type === 'month')?.value || '9',
        ) - 1; 
      const year = Number.parseInt(
        parts.find((part) => part.type === 'year')?.value || '1445',
      );

      setTodayHijri({ day, month, year });
      setCurrentMonth(month);
      setCurrentYear(year);
    } catch (error) {
      console.error('Error getting Hijri date:', error);
      
    }
  }, [today]);

  
  const calendarData = useMemo(() => {
    
    const daysCount = daysInIslamicMonth(currentMonth);

    
    
    const firstDayOfMonth = (currentMonth * 2 + currentYear) % 7;

    
    const days: IslamicDate[] = [];

    
    const translatedMonths = [
      t('months.0'),
      t('months.1'),
      t('months.2'),
      t('months.3'),
      t('months.4'),
      t('months.5'),
      t('months.6'),
      t('months.7'),
      t('months.8'),
      t('months.9'),
      t('months.10'),
      t('months.11'),
    ];

    for (let i = 1; i <= daysCount; i++) {
      
      const specialDayConfig = specialDaysMap.find(
        (d) => d.month === currentMonth && d.day === i,
      );
      const isSpecialDay = !!specialDayConfig;
      const specialDayName = specialDayConfig
        ? t(`special_days.${specialDayConfig.key}`)
        : undefined;

      
      
      const gregorianMonth = ((currentMonth + 3) % 12) + 1;
      const gregorianDay = ((i + 15) % 30) + 1;
      const gregorianDate = `${gregorianMonth}/${gregorianDay}`;

      days.push({
        day: i,
        month: translatedMonths[currentMonth],
        year: currentYear,
        gregorian: gregorianDate,
        isToday:
          todayHijri.day === i &&
          todayHijri.month === currentMonth &&
          todayHijri.year === currentYear,
        isSpecialDay,
        specialDayName,
      });
    }

    return {
      days,
      firstDayOfMonth,
    };
  }, [currentMonth, currentYear, todayHijri, t]);

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const translatedDays = [
    t('days.0'),
    t('days.1'),
    t('days.2'),
    t('days.3'),
    t('days.4'),
    t('days.5'),
    t('days.6'),
  ];

  const currentMonthName = t(`months.${currentMonth}`);

  return (
    <Card className={`${isRtl ? 'rtl' : 'ltr'} w-full max-w-md mx-auto`}>
      <CardHeader className='flex flex-row items-center justify-between pb-2 px-4'>
        <CardTitle className='text-md font-medium'>{t('title')}</CardTitle>
        <CalendarIcon className='h-5 w-5 text-purple-500' />
      </CardHeader>
      <CardContent className='px-4 pb-4'>
        <div className='flex items-center justify-between mb-4'>
          <Button
            variant='outline'
            size='icon'
            onClick={isRtl ? nextMonth : prevMonth}
          >
            {isRtl ? (
              <ChevronLeft className='h-4 w-4' />
            ) : (
              <ChevronLeft className='h-4 w-4' />
            )}
          </Button>

          <h3 className='text-lg font-bold'>
            {currentMonthName} {currentYear}
            {t('hijri_suffix')}
          </h3>

          <Button
            variant='outline'
            size='icon'
            onClick={isRtl ? prevMonth : nextMonth}
          >
            {isRtl ? (
              <ChevronRight className='h-4 w-4' />
            ) : (
              <ChevronRight className='h-4 w-4' />
            )}
          </Button>
        </div>

        <div className='grid grid-cols-7 gap-1 text-center mb-2'>
          {translatedDays.map((day, i) => (
            <div
              key={i}
              className='text-xs font-medium text-muted-foreground py-1'
            >
              {day}
            </div>
          ))}
        </div>

        <div className='grid grid-cols-7 gap-1'>
          {}
          {Array.from({ length: calendarData.firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className='h-12'></div>
          ))}

          {calendarData.days.map((date, i) => (
            <div
              key={i}
              className={`h-12 flex flex-col items-center justify-center rounded-md text-sm p-1 ${
                date.isToday
                  ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 font-bold'
                  : date.isSpecialDay
                    ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              title={date.gregorian}
            >
              <span className='text-base'>{date.day}</span>
              {date.gregorian && (
                <span className='text-[8px] leading-tight text-gray-500 dark:text-gray-400'>
                  {date.gregorian}
                </span>
              )}
              {date.isSpecialDay && (
                <span className='text-[8px] leading-tight text-amber-600 dark:text-amber-400 mt-0.5'>
                  {date.specialDayName}
                </span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
