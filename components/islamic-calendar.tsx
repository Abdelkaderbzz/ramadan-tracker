'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type IslamicDate = {
  day: number;
  month: string;
  year: number;
  gregorian: string;
  isToday: boolean;
  isSpecialDay: boolean;
  specialDayName?: string;
};

// Simple mapping for Islamic months
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

// Simplified Islamic calendar calculation
// This uses a fixed pattern for month lengths which is a reasonable approximation
const daysInIslamicMonth = (month: number) => {
  // Even-numbered months have 30 days, odd-numbered months have 29 days
  // (with occasional adjustments for leap years, simplified here)
  return month % 2 === 0 ? 30 : 29;
};

export default function IslamicCalendar() {
  // Get current date once on component mount
  const today = useMemo(() => new Date(), []);

  // Initialize with estimated current Hijri date
  // For a real app, you might want to use a proper Hijri calendar library
  const [currentMonth, setCurrentMonth] = useState<number>(8); // Default to Ramadan
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

  // Get current Hijri date on component mount
  useEffect(() => {
    try {
      // Try to get current Hijri date using Intl API
      const formatter = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      });

      const parts = formatter.formatToParts(today);
      const day = Number.parseInt(
        parts.find((part) => part.type === 'day')?.value || '15'
      );
      const month =
        Number.parseInt(
          parts.find((part) => part.type === 'month')?.value || '9'
        ) - 1; // 0-based
      const year = Number.parseInt(
        parts.find((part) => part.type === 'year')?.value || '1445'
      );

      setTodayHijri({ day, month, year });
      setCurrentMonth(month);
      setCurrentYear(year);
    } catch (error) {
      console.error('Error getting Hijri date:', error);
      // Keep default values if there's an error
    }
  }, [today]);

  // Calculate calendar grid data
  const calendarData = useMemo(() => {
    // Number of days in the current month
    const daysCount = daysInIslamicMonth(currentMonth);

    // Approximate first day of month (0 = Sunday, 6 = Saturday)
    // This is simplified - in a real app, use a proper Hijri calendar library
    const firstDayOfMonth = (currentMonth * 2 + currentYear) % 7;

    // Generate calendar days
    const days: IslamicDate[] = [];

    for (let i = 1; i <= daysCount; i++) {
      // Check if this is a special day
      const isSpecialDay = specialDays.some(
        (d) => d.month === currentMonth && d.day === i
      );
      const specialDay = specialDays.find(
        (d) => d.month === currentMonth && d.day === i
      );

      // Simple Gregorian date approximation
      // In a real app, use a proper conversion library
      const gregorianMonth = ((currentMonth + 3) % 12) + 1;
      const gregorianDay = ((i + 15) % 30) + 1;
      const gregorianDate = `${gregorianMonth}/${gregorianDay}`;

      days.push({
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
      });
    }

    return {
      days,
      firstDayOfMonth,
    };
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
            {islamicMonths[currentMonth]} {currentYear}هـ
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
