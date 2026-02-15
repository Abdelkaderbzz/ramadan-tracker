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
import { formatNumber } from '@/lib/arabic-numerals';
import { useTranslations, useLocale } from 'next-intl';

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

import { BadgeCard } from './badge-card';

export default function AchievementBadges() {
  const t = useTranslations('Achievements');
  const locale = useLocale();
  const { activities, stats } = useRamadanStore();

  const achievements = useMemo(() => {
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

    return [
      {
        id: 'quran-starter',
        title: t('badges.quran_starter.title'),
        description: t('badges.quran_starter.description'),
        icon: <BookOpen className='h-6 w-6' />,
        color: 'emerald-500',
        unlocked: quranPages >= 100,
        progress: Math.min(quranPages, 100),
        target: 100,
      },
      {
        id: 'quran-advanced',
        title: t('badges.quran_advanced.title'),
        description: t('badges.quran_advanced.description'),
        icon: <BookOpen className='h-6 w-6' />,
        color: 'emerald-500',
        unlocked: quranPages >= 1000,
        progress: Math.min(quranPages, 1000),
        target: 1000,
      },
      {
        id: 'prayer-streak',
        title: t('badges.prayer_streak.title'),
        description: t('badges.prayer_streak.description'),
        icon: <Clock className='h-6 w-6' />,
        color: 'blue-500',
        unlocked: prayerDays >= 7,
        progress: Math.min(prayerDays, 7),
        target: 7,
      },
      {
        id: 'dhikr-master',
        title: t('badges.dhikr_master.title'),
        description: t('badges.dhikr_master.description'),
        icon: <AlignJustify className='h-6 w-6' />,
        color: 'orange-500',
        unlocked: dhikrDays >= 10,
        progress: Math.min(dhikrDays, 10),
        target: 10,
      },
      {
        id: 'good-deeds',
        title: t('badges.good_deeds.title'),
        description: t('badges.good_deeds.description'),
        icon: <Heart className='h-6 w-6' />,
        color: 'rose-500',
        unlocked: goodDeedsDays >= 15,
        progress: Math.min(goodDeedsDays, 15),
        target: 15,
      },
      {
        id: 'ramadan-half',
        title: t('badges.ramadan_half.title'),
        description: t('badges.ramadan_half.description'),
        icon: <Star className='h-6 w-6' />,
        color: 'amber-500',
        unlocked: stats.overall >= 50,
        progress: Math.min(stats.overall, 50),
        target: 50,
      },
      {
        id: 'ramadan-champion',
        title: t('badges.ramadan_champion.title'),
        description: t('badges.ramadan_champion.description'),
        icon: <Trophy className='h-6 w-6' />,
        color: 'purple-500',
        unlocked: stats.overall >= 80,
        progress: Math.min(stats.overall, 80),
        target: 80,
      },
    ];
  }, [activities, stats, t]);

  return (
    <div className='rtl'>
      <h2 className='text-2xl font-bold mb-6 text-center'>{t('title')}</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
        {achievements.map((achievement, index) => (
          <BadgeCard
            key={achievement.id}
            achievement={achievement}
            index={index}
            locale={locale}
            completedText={t('completed')}
          />
        ))}
      </div>
    </div>
  );
}
