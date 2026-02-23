import { useMemo, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { RamadanGoals } from './ramadan-goals';
import { DailyJournal } from './daily-journal';
import { DailyMotivation } from './daily-motivation';
import { getRamadanDay } from '@/lib/date-utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export function RamadanJourney() {
  const t = useTranslations('Journey');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  
  const currentDay = useMemo(() => {
    return getRamadanDay();
  }, []);

  const isPreRamadan = currentDay === -1;
  const [selectedDay, setSelectedDay] = useState(isPreRamadan ? 1 : currentDay);

  return (
    <div
      className='space-y-8 animate-in fade-in duration-700'
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {}
      {isPreRamadan ? (
        <div className='bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-6 shadow-lg text-white relative overflow-hidden'>
          <div className='relative z-10'>
            <h3 className='text-xl font-bold mb-2 flex items-center gap-2'>
              <span className='p-1.5 bg-white/20 rounded-lg'>🌙</span>
              {isRtl ? 'استعد لرمضان' : 'Get Ready for Ramadan'}
            </h3>
            <p className='text-amber-50 text-sm max-w-md'>
              {isRtl
                ? 'رمضان لم يبدأ بعد. يمكنك البدء بتحديد أهدافك وتحضير نفسك للرحلة القادمة.'
                : "Ramadan hasn't started yet. You can start by setting your goals and preparing yourself for the journey ahead."}
            </p>
          </div>
          <div className='absolute top-0 right-0 p-4 opacity-10 pointer-events-none'>
            <span className='text-8xl font-black'>1447</span>
          </div>
        </div>
      ) : (
        <div className='bg-white/50 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-purple-50'>
          <h3 className='text-sm font-semibold text-purple-800 mb-3 px-2 flex items-center justify-between'>
            <span>{isRtl ? 'اختر اليوم' : 'Select Day'}</span>
            <span className='text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full'>
              {isRtl
                ? `اليوم الحالي: ${currentDay}`
                : `Today: Day ${currentDay}`}
            </span>
          </h3>
          <ScrollArea className='w-full whitespace-nowrap pb-4'>
            <div className='flex gap-2 px-2'>
              {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    'flex flex-col items-center justify-center min-w-[50px] h-[60px] rounded-xl transition-all border',
                    selectedDay === day
                      ? 'bg-purple-600 text-white border-purple-600 shadow-md transform scale-105'
                      : 'bg-white text-purple-600 border-purple-100 hover:bg-purple-50 hover:border-purple-200',
                    day > currentDay &&
                      'opacity-50 cursor-not-allowed grayscale',
                  )}
                  disabled={day > currentDay}
                >
                  <span className='text-[10px] opacity-70 uppercase font-bold tracking-tighter'>
                    {isRtl ? 'يوم' : 'Day'}
                  </span>
                  <span className='text-lg font-black'>{day}</span>
                </button>
              ))}
            </div>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
        {}
        <div className='md:col-span-12 lg:col-span-5 space-y-6'>
          <DailyMotivation day={selectedDay} />
          <RamadanGoals />
        </div>

        {}
        <div className='md:col-span-12 lg:col-span-7'>
          <DailyJournal
            day={selectedDay}
            isReadOnly={isPreRamadan || selectedDay !== currentDay}
          />
        </div>
      </div>
    </div>
  );
}
