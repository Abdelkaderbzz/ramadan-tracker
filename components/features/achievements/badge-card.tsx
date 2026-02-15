'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { formatNumber } from '@/lib/arabic-numerals';

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

interface BadgeCardProps {
  achievement: Achievement;
  index: number;
  locale: string;
  completedText: string;
}

export function BadgeCard({
  achievement,
  index,
  locale,
  completedText,
}: BadgeCardProps) {
  return (
    <motion.div
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

            <h3 className='font-bold text-lg mb-1'>{achievement.title}</h3>
            <p className='text-sm text-muted-foreground mb-3'>
              {achievement.description}
            </p>

            <Progress
              value={(achievement.progress / achievement.target) * 100}
              color={achievement.color}
              className='h-2.5 mb-2'
            />

            <p className='text-xs text-muted-foreground'>
              {formatNumber(achievement.progress, locale)} /{' '}
              {formatNumber(achievement.target, locale)}
              {achievement.unlocked && (
                <span className='text-green-500 mr-2'>✓ {completedText}</span>
              )}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
