'use client';

import type React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  BookOpen,
  Clock,
  Heart,
  AlignJustify,
  Star,
  Trophy,
} from 'lucide-react';
import { useRamadanStore } from '@/lib/store';
import type { DailyActivity } from '@/lib/store';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { frenchNumerals } from '@/lib/arabic-numerals';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  unlocked: boolean;
  progress: number;
  target: number;
}

export default function AchievementBadges() {
  const { activities, stats } = useRamadanStore();
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const quranPages = activities.reduce(
      (sum: number, day: DailyActivity) =>
        sum + (Number.parseInt(day.quran) || 0),
      0,
    );
    const prayerDays = activities.filter(
      (day: DailyActivity) => day.fasting,
    ).length;
    const dhikrDays = activities.filter(
      (day: DailyActivity) =>
        day.dhikrMorning !== '0' || day.dhikrEvening !== '0',
    ).length;
    const goodDeedsDays = activities.filter(
      (day: DailyActivity) =>
        day.charity || day.familyVisit || day.happiness || day.feeding,
    ).length;

    const updatedAchievements: Achievement[] = [
      {
        id: 'quran-starter',
        title: 'قارئ مبتدئ',
        description: 'قراءة 100 آية من القرآن الكريم',
        icon: <BookOpen className='h-6 w-6' />,
        color: 'emerald-500',
        unlocked: quranPages >= 100,
        progress: Math.min(quranPages, 100),
        target: 100,
      },
      {
        id: 'quran-advanced',
        title: 'قارئ متقدم',
        description: 'قراءة 1000 آية من القرآن الكريم',
        icon: <BookOpen className='h-6 w-6' />,
        color: 'emerald-500',
        unlocked: quranPages >= 1000,
        progress: Math.min(quranPages, 1000),
        target: 1000,
      },
      {
        id: 'prayer-streak',
        title: 'مواظب على الصلاة',
        description: 'الصلاة لمدة 7 أيام متتالية',
        icon: <Clock className='h-6 w-6' />,
        color: 'blue-500',
        unlocked: prayerDays >= 7,
        progress: Math.min(prayerDays, 7),
        target: 7,
      },
      {
        id: 'dhikr-master',
        title: 'ذاكر لله',
        description: 'قراءة الأذكار لمدة 10 أيام',
        icon: <AlignJustify className='h-6 w-6' />,
        color: 'orange-500',
        unlocked: dhikrDays >= 10,
        progress: Math.min(dhikrDays, 10),
        target: 10,
      },
      {
        id: 'good-deeds',
        title: 'محسن',
        description: 'القيام بـ 15 عمل صالح',
        icon: <Heart className='h-6 w-6' />,
        color: 'rose-500',
        unlocked: goodDeedsDays >= 15,
        progress: Math.min(goodDeedsDays, 15),
        target: 15,
      },
      {
        id: 'ramadan-half',
        title: 'منتصف الطريق',
        description: 'إكمال 15 يوم من رمضان بنجاح',
        icon: <Star className='h-6 w-6' />,
        color: 'amber-500',
        unlocked: stats.overall >= 50,
        progress: Math.min(stats.overall, 50),
        target: 50,
      },
      {
        id: 'ramadan-champion',
        title: 'بطل رمضان',
        description: 'إكمال شهر رمضان بنسبة إنجاز 80%',
        icon: <Trophy className='h-6 w-6' />,
        color: 'purple-500',
        unlocked: stats.overall >= 80,
        progress: Math.min(stats.overall, 80),
        target: 80,
      },
    ];

    setAchievements(updatedAchievements);
  }, [activities, stats]);

  return (
    <div className='rtl'>
      <h2 className='text-2xl font-bold mb-6 text-center'>
        الإنجازات والشارات
      </h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className={`${achievement.unlocked ? 'border-2 border-purple-300' : 'opacity-80'}`}
            >
              <CardContent className='pt-6 pb-4 px-4'>
                <div className='flex flex-col items-center text-center'>
                  <div
                    className={`w-16 h-16 rounded-full bg-${achievement.color.split('-')[0]}-100 flex items-center justify-center mb-3 ${
                      achievement.unlocked ? 'animate-pulse-slow' : 'opacity-50'
                    }`}
                  >
                    {achievement.icon}
                  </div>

                  <h3 className='font-bold text-lg mb-1'>
                    {achievement.title}
                  </h3>
                  <p className='text-sm text-muted-foreground mb-3'>
                    {achievement.description}
                  </p>

                  <Progress
                    value={(achievement.progress / achievement.target) * 100}
                    color={achievement.color}
                    className='h-2.5 mb-2'
                  />

                  <p className='text-xs text-muted-foreground'>
                    {frenchNumerals(achievement.progress)} /{' '}
                    {frenchNumerals(achievement.target)}
                    {achievement.unlocked && (
                      <span className='text-green-500 mr-2'>✓ مكتمل</span>
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
