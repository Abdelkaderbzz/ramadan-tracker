'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AlarmClock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

type PrayerTime = {
  name: string;
  nameAr: string;
  time: string;
  colorClass: string;
};

export default function PrayerTimes() {
  const t = useTranslations('PrayerTimes');
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        setLoading(true);

        // Get user's location (or use default)
        let latitude = 21.3891; // Default to Mecca
        let longitude = 39.8579;

        try {
          // Use a promise with a timeout to prevent hanging
          const position = await Promise.race([
            new Promise<GeolocationPosition>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: false,
                timeout: 5000,
                maximumAge: 3600000,
              });
            }),
            new Promise<null>((_, reject) =>
              setTimeout(() => reject(new Error('Geolocation timeout')), 5000),
            ),
          ]);

          if (position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
          }
        } catch (locationError) {
          console.warn(
            'Geolocation failed or timed out, using default location (Mecca):',
            locationError,
          );
        }

        // Get current date
        const date = new Date();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();

        // Fetch prayer times from API
        const response = await fetch(
          `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${latitude}&longitude=${longitude}&method=2`,
        );

        if (!response.ok) {
          throw new Error('Failed to fetch prayer times');
        }

        const data = await response.json();
        const timings = data.data.timings;

        // Format prayer times
        const formattedTimes: PrayerTime[] = [
          {
            name: 'Fajr',
            nameAr: t('fajr'),
            time: timings.Fajr,
            colorClass: 'bg-orange-50 text-orange-600 border-orange-200',
          },
          {
            name: 'Dhuhr',
            nameAr: t('dhuhr'),
            time: timings.Dhuhr,
            colorClass: 'bg-blue-50 text-blue-600 border-blue-200',
          },
          {
            name: 'Asr',
            nameAr: t('asr'),
            time: timings.Asr,
            colorClass: 'bg-teal-50 text-teal-600 border-teal-200',
          },
          {
            name: 'Maghrib',
            nameAr: t('maghrib'),
            time: timings.Maghrib,
            colorClass: 'bg-amber-50 text-amber-600 border-amber-200',
          },
          {
            name: 'Isha',
            nameAr: t('isha'),
            time: timings.Isha,
            colorClass: 'bg-indigo-50 text-indigo-600 border-indigo-200',
          },
        ];

        setPrayerTimes(formattedTimes);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching prayer times:', err);
        setError(t('error'));
        setLoading(false);

        // Fallback to default times
        setPrayerTimes([
          {
            name: 'Fajr',
            nameAr: t('fajr'),
            time: '04:30',
            colorClass: 'bg-orange-50 text-orange-600 border-orange-200',
          },
          {
            name: 'Dhuhr',
            nameAr: t('dhuhr'),
            time: '12:15',
            colorClass: 'bg-blue-50 text-blue-600 border-blue-200',
          },
          {
            name: 'Asr',
            nameAr: t('asr'),
            time: '15:45',
            colorClass: 'bg-teal-50 text-teal-600 border-teal-200',
          },
          {
            name: 'Maghrib',
            nameAr: t('maghrib'),
            time: '18:45',
            colorClass: 'bg-amber-50 text-amber-600 border-amber-200',
          },
          {
            name: 'Isha',
            nameAr: t('isha'),
            time: '20:15',
            colorClass: 'bg-indigo-50 text-indigo-600 border-indigo-200',
          },
        ]);
      }
    };

    fetchPrayerTimes();
  }, [t]);

  // Check if a prayer time is the next upcoming prayer
  const isNextPrayer = (prayerTime: string): boolean => {
    const now = currentTime;
    const [hours, minutes] = prayerTime.split(':').map(Number);
    const prayerDate = new Date();
    prayerDate.setHours(hours, minutes, 0);

    return (
      prayerDate > now &&
      prayerDate.getTime() - now.getTime() < 5 * 60 * 60 * 1000
    ); // Within next 5 hours
  };

  return (
    <Card className='rtl'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-md font-medium'>{t('title')}</CardTitle>
        <motion.div
          animate={{ rotate: [0, 10, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            repeatDelay: 5,
          }}
        >
          <AlarmClock className='h-5 w-5 text-orange-500' />
        </motion.div>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-muted-foreground'>{t('description')}</p>

        {loading ? (
          <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mt-4'>
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className='h-20 rounded-lg' />
            ))}
          </div>
        ) : error ? (
          <div className='text-center text-red-500 mt-4'>{error}</div>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-3 gap-3 mt-4'>
            {prayerTimes.map((prayer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`${prayer.colorClass} p-3 rounded-lg text-center border shadow-sm ${
                  isNextPrayer(prayer.time)
                    ? 'ring-2 ring-offset-2 ring-purple-500'
                    : ''
                }`}
              >
                <div className='font-medium'>{prayer.nameAr}</div>
                <div className='text-lg font-bold'>{prayer.time}</div>
                {isNextPrayer(prayer.time) && (
                  <div className='text-xs mt-1 text-purple-600 font-medium'>
                    {t('next_prayer')}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
