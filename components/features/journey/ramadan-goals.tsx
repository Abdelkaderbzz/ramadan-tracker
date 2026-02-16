'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  Target,
  Book,
  Heart,
  Star,
  Sparkles,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRamadanStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import type { RamadanGoal } from '@/lib/store/types';

const categoryIcons = {
  quran: <Book className='h-4 w-4' />,
  prayer: <Star className='h-4 w-4' />,
  charity: <Heart className='h-4 w-4' />,
  personal: <Sparkles className='h-4 w-4' />,
  other: <Target className='h-4 w-4' />,
};

export function RamadanGoals() {
  const t = useTranslations('Journey.Goals');
  const { goals, addGoal, toggleGoal, removeGoal } = useRamadanStore();
  const [newGoalText, setNewGoalText] = useState('');
  const [category, setCategory] = useState<RamadanGoal['category']>('personal');

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoalText.trim()) {
      addGoal(newGoalText.trim(), category);
      setNewGoalText('');
    }
  };

  return (
    <Card className='border-none shadow-lg bg-white/50 backdrop-blur-sm'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2 text-purple-700'>
          <Target className='h-5 w-5' />
          {t('title')}
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <form onSubmit={handleAddGoal} className='flex flex-col gap-3'>
          <div className='flex gap-2'>
            <Input
              placeholder={t('placeholder')}
              value={newGoalText}
              onChange={(e) => setNewGoalText(e.target.value)}
              className='flex-1 border-purple-100 focus-visible:ring-purple-400'
            />
            <Button type='submit' className='bg-purple-600 hover:bg-purple-700'>
              <Plus className='h-4 w-4' />
            </Button>
          </div>
          <div className='flex flex-wrap gap-2'>
            {(['quran', 'prayer', 'charity', 'personal', 'other'] as const).map(
              (cat) => (
                <Button
                  key={cat}
                  type='button'
                  variant={category === cat ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => setCategory(cat)}
                  className={`flex gap-1.5 items-center transition-all ${
                    category === cat
                      ? 'bg-purple-600 text-white'
                      : 'border-purple-100 text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  {categoryIcons[cat]}
                  <span className='text-xs capitalize'>
                    {t(`categories.${cat}`)}
                  </span>
                </Button>
              ),
            )}
          </div>
        </form>

        <div className='space-y-3'>
          <AnimatePresence mode='popLayout'>
            {goals.map((goal) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  goal.completed
                    ? 'bg-green-50/50 border-green-100'
                    : 'bg-white border-purple-50 shadow-sm'
                }`}
              >
                <div className='flex items-center gap-3'>
                  <button
                    onClick={() => toggleGoal(goal.id)}
                    className={`transition-colors ${
                      goal.completed
                        ? 'text-green-500'
                        : 'text-purple-300 hover:text-purple-500'
                    }`}
                  >
                    {goal.completed ? (
                      <CheckCircle2 className='h-6 w-6' />
                    ) : (
                      <Circle className='h-6 w-6' />
                    )}
                  </button>
                  <div className='flex flex-col'>
                    <span
                      className={`text-sm md:text-base ${goal.completed ? 'line-through text-gray-400' : 'text-gray-700 font-medium'}`}
                    >
                      {goal.text}
                    </span>
                    <Badge
                      variant='outline'
                      className='w-fit text-[10px] h-4 mt-1 bg-purple-50/50 border-purple-100 text-purple-600'
                    >
                      {t(`categories.${goal.category}`)}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => removeGoal(goal.id)}
                  className='text-gray-300 hover:text-red-500 hover:bg-red-50'
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
          {goals.length === 0 && (
            <div className='text-center py-8 text-gray-400 italic text-sm'>
              {t('no_goals')}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
