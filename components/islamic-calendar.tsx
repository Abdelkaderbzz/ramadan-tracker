'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

type IslamicDate = {
  day: number;
  month: string;
  year: number;
  gregorian: string;
  isToday: boolean;
  isSpecialDay: boolean;
  specialDayName?: string;
  weekday: number;
};

// Helper function to convert numbers to French numerals
const toFrenchNumerals = (num: number): string => {
  return num.toString();
};

export default function IslamicCalendar() {
  const [currentMonth, setCurrentMonth] = useState<number>(0); // 0-based month (0 = Muharram)
  const [currentYear, setCurrentYear] = useState<number>(1445); // Current Hijri year
  const [calendarDays, setCalendarDays] = useState<IslamicDate[]>([]);
  const [firstDayOfMonth, setFirstDayOfMonth] = useState<number>(0); // Day of week (0 = Sunday)
  const [daysInMonth, setDaysInMonth] = useState<number>(30);
  const [todayHijri, setTodayHijri] = useState<{
    day: number;
    month: number;
    year: number;
  }>({
    day: 1,
    month: 0,
    year: 1445,
  });

  const islamicMonths = [
    'محرم',
    'صفر',
    'ربيع الأول',
    'ربيع الثاني',
    'جمادى الأولى',
    'جمادى الآخرة',
    'رجب',
    'شعبان',
    'رمضان',
    'شوال',
    'ذو القعدة',
    'ذو الحجة',
  ];

  // Special Islamic days
  const specialDays = [
    { month: 8, day: 1, name: 'بداية رمضان' }, // Ramadan 1
    { month: 8, day: 27, name: 'ليلة القدر (المحتملة)' }, // Laylat al-Qadr (estimated)
    { month: 9, day: 1, name: 'عيد الفطر' }, // Eid al-Fitr
    { month: 11, day: 10, name: 'عيد الأضحى' }, // Eid al-Adha
    { month: 0, day: 10, name: 'يوم عاشوراء' }, // Ashura
    { month: 2, day: 12, name: 'المولد النبوي' }, // Mawlid al-Nabi
    { month: 6, day: 27, name: 'ليلة الإسراء والمعراج' }, // Isra and Mi'raj
    { month: 7, day: 15, name: 'ليلة النصف من شعبان' }, // Mid-Sha'ban
  ];

  // Get current Hijri date on component mount
  useEffect(() => {
    getCurrentHijriDate();
  }, []);

  // Function to get current Hijri date using Intl API with better error handling
  const getCurrentHijriDate = () => {
    try {
      const today = new Date();
      const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      });

      const parts = formatter.formatToParts(today);
      const hijriDay = Number.parseInt(
        parts.find((part) => part.type === 'day')?.value || '1'
      );
      const hijriMonth =
        Number.parseInt(
          parts.find((part) => part.type === 'month')?.value || '1'
        ) - 1; // 0-based
      const hijriYear = Number.parseInt(
        parts.find((part) => part.type === 'year')?.value || '1445'
      );

      setTodayHijri({
        day: hijriDay,
        month: hijriMonth,
        year: hijriYear,
      });

      // Initialize calendar with current date
      setCurrentMonth(hijriMonth);
      setCurrentYear(hijriYear);
    } catch (error) {
      console.error('Error getting Hijri date:', error);
      // Fallback to estimated date
      setTodayHijri({ day: 15, month: 8, year: 1445 });
      setCurrentMonth(8);
      setCurrentYear(1445);
    }
  };

  // Calculate days in Islamic month - more accurate than fixed 30
  const calculateDaysInIslamicMonth = (year: number, month: number): number => {
    // Islamic calendar months alternate between 29 and 30 days
    // with adjustments for leap years
    // This is a simplified calculation - for more accuracy, use astronomical calculations
    const isLeapYear = year % 30 in [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29];

    // Odd months have 30 days, even months have 29 days
    // Except in leap years where the 12th month (Dhu al-Hijjah) has 30 days
    if (month % 2 === 0) {
      return 30;
    } else if (month === 11 && isLeapYear) {
      return 30;
    } else {
      return 29;
    }
  };

  // Convert Hijri date to Gregorian
  const hijriToGregorian = (
    hijriYear: number,
    hijriMonth: number,
    hijriDay: number
  ): string => {
    try {
      // Create a date in the Islamic calendar
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = {
        calendar: 'islamic-umalqura',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      };

      // Find approximate Gregorian date
      // This is an estimation - start with current date and adjust
      const estimatedDate = new Date();

      // Adjust the date until we get close to the target Hijri date
      for (let i = 0; i < 365 * 2; i++) {
        // Try up to 2 years worth of days
        const formatter = new Intl.DateTimeFormat(
          'en-u-ca-islamic-umalqura',
          options
        );
        const parts = formatter.formatToParts(estimatedDate);

        const currentHijriDay = Number.parseInt(
          parts.find((part) => part.type === 'day')?.value || '1'
        );
        const currentHijriMonth =
          Number.parseInt(
            parts.find((part) => part.type === 'month')?.value || '1'
          ) - 1;
        const currentHijriYear = Number.parseInt(
          parts.find((part) => part.type === 'year')?.value || '1445'
        );

        if (
          currentHijriDay === hijriDay &&
          currentHijriMonth === hijriMonth &&
          currentHijriYear === hijriYear
        ) {
          break;
        }

        // Move to next day
        estimatedDate.setDate(estimatedDate.getDate() + 1);
      }

      // Format the Gregorian date
      return estimatedDate.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
      });
    } catch (error) {
      console.error('Error converting date:', error);
      return '';
    }
  };

  // Calculate first day of month
  const calculateFirstDayOfMonth = (year: number, month: number): number => {
    try {
      // Create a date for the first day of the specified Hijri month
      const today = new Date();
      const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        weekday: 'long',
      });

      // Find approximate date for first day of month
      const estimatedDate = new Date();

      // Adjust the date until we find the first day of the target month
      for (let i = 0; i < 365 * 2; i++) {
        const parts = formatter.formatToParts(estimatedDate);

        const currentHijriDay = Number.parseInt(
          parts.find((part) => part.type === 'day')?.value || '1'
        );
        const currentHijriMonth =
          Number.parseInt(
            parts.find((part) => part.type === 'month')?.value || '1'
          ) - 1;
        const currentHijriYear = Number.parseInt(
          parts.find((part) => part.type === 'year')?.value || '1445'
        );

        if (
          currentHijriDay === 1 &&
          currentHijriMonth === month &&
          currentHijriYear === year
        ) {
          break;
        }

        // Move to next day
        estimatedDate.setDate(estimatedDate.getDate() + 1);
      }

      // Get the day of week (0 = Sunday, 1 = Monday, etc.)
      return estimatedDate.getDay();
    } catch (error) {
      console.error('Error calculating first day of month:', error);
      return 0; // Default to Sunday
    }
  };

  // Generate calendar days for the current month
  useEffect(() => {
    // Calculate days in month and first day of month
    const days = calculateDaysInIslamicMonth(currentYear, currentMonth);
    setDaysInMonth(days);

    const firstDay = calculateFirstDayOfMonth(currentYear, currentMonth);
    setFirstDayOfMonth(firstDay);

    const calendarDays: IslamicDate[] = [];

    // Generate calendar days
    for (let i = 1; i <= days; i++) {
      // Calculate weekday (0 = Sunday, 6 = Saturday)
      const weekday = (firstDay + i - 1) % 7;

      // Check if this is a special day
      const isSpecialDay = specialDays.some(
        (d) => d.month === currentMonth && d.day === i
      );
      const specialDay = specialDays.find(
        (d) => d.month === currentMonth && d.day === i
      );

      // Convert to Gregorian
      const gregorianDate = hijriToGregorian(currentYear, currentMonth, i);

      calendarDays.push({
        day: i,
        month: islamicMonths[currentMonth],
        year: currentYear,
        gregorian: gregorianDate,
        isToday:
          todayHijri.day === i &&
          todayHijri.month === currentMonth &&
          todayHijri.year === currentYear,
        isSpecialDay,
        specialDayName: specialDay?.name,
        weekday,
      });
    }

    setCalendarDays(calendarDays);
  }, [currentMonth, currentYear, todayHijri]);

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

  return (
    <Card className='rtl w-full max-w-md mx-auto'>
      <CardHeader className='flex flex-row items-center justify-between pb-2 px-4'>
        <CardTitle className='text-md font-medium'>التقويم الإسلامي</CardTitle>
        <CalendarIcon className='h-5 w-5 text-purple-500' />
      </CardHeader>
      <CardContent className='px-4 pb-4'>
        <div className='flex items-center justify-between mb-4'>
          <Button variant='outline' size='icon' onClick={prevMonth}>
            <ChevronRight className='h-4 w-4' />
          </Button>

          <h3 className='text-lg font-bold'>
            {islamicMonths[currentMonth]} {toFrenchNumerals(currentYear)}هـ
          </h3>

          <Button variant='outline' size='icon' onClick={nextMonth}>
            <ChevronLeft className='h-4 w-4' />
          </Button>
        </div>

        <div className='grid grid-cols-7 gap-1 text-center mb-2'>
          {[
            'الأحد',
            'الإثنين',
            'الثلاثاء',
            'الأربعاء',
            'الخميس',
            'الجمعة',
            'السبت',
          ].map((day, i) => (
            <div
              key={i}
              className='text-xs font-medium text-muted-foreground py-1'
            >
              {day}
            </div>
          ))}
        </div>

        <div className='grid grid-cols-7 gap-1'>
          {/* Add empty cells for proper day alignment based on first day of month */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className='h-12'></div>
          ))}

          {calendarDays.map((date, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`h-12 flex flex-col items-center justify-center rounded-md text-sm p-1 ${
                date.isToday
                  ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 font-bold'
                  : date.isSpecialDay
                  ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              title={date.gregorian}
            >
              <span className='text-base'>{toFrenchNumerals(date.day)}</span>
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
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
