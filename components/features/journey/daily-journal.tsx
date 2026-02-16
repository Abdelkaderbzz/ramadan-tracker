'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  BookText,
  Sparkles,
  Smile,
  MessageSquare,
  Save,
  History,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRamadanStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const moods = [
  { icon: '😊', label: 'happy', color: 'bg-yellow-100 text-yellow-700' },
  { icon: '😇', label: 'spiritual', color: 'bg-purple-100 text-purple-700' },
  { icon: '😌', label: 'peaceful', color: 'bg-blue-100 text-blue-700' },
  { icon: '💪', label: 'determined', color: 'bg-orange-100 text-orange-700' },
  { icon: '😴', label: 'tired', color: 'bg-gray-100 text-gray-700' },
];

export function DailyJournal({
  day,
  isReadOnly = false,
}: {
  day: number;
  isReadOnly?: boolean;
}) {
  const t = useTranslations('Journey.Journal');
  const { journalEntries, updateJournalEntry } = useRamadanStore();
  const entry = journalEntries[day] || {
    achievements: '',
    memories: '',
    mood: '',
  };

  const [achievements, setAchievements] = useState(entry.achievements);
  const [memories, setMemories] = useState(entry.memories);
  const [mood, setMood] = useState(entry.mood);

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setAchievements(entry.achievements);
    setMemories(entry.memories);
    setMood(entry.mood);
  }, [day, entry.achievements, entry.memories, entry.mood]);

  const handleSave = () => {
    if (isReadOnly) return;
    setIsSaving(true);
    updateJournalEntry(day, { achievements, memories, mood });

    setTimeout(() => {
      setIsSaving(false);
      toast.success(t('saved_success'), {
        icon: <Sparkles className='h-4 w-4 text-yellow-500' />,
      });
    }, 600);
  };

  const currentMood = moods.find((m) => m.label === mood);

  return (
    <Card className='border-none shadow-lg bg-white/50 backdrop-blur-sm relative overflow-hidden'>
      {isReadOnly && (
        <div className='absolute top-0 right-0 bg-amber-500 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest z-20 rounded-bl-lg shadow-sm'>
          {t('preview_mode')}
        </div>
      )}
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='flex items-center gap-2 text-purple-700'>
          <BookText className='h-5 w-5' />
          <span>{t('title', { day })}</span>
          {currentMood && <span className='text-lg'>{currentMood.icon}</span>}
        </CardTitle>
        <div className='flex gap-2'>
          {moods.map((m) => (
            <button
              key={m.label}
              onClick={() => !isReadOnly && setMood(m.label)}
              disabled={isReadOnly}
              className={`p-1.5 rounded-full transition-all hover:scale-110 ${
                mood === m.label
                  ? m.color + ' ring-2 ring-offset-1 ring-purple-200'
                  : 'bg-transparent grayscale opacity-50'
              } ${isReadOnly ? 'cursor-default' : ''}`}
              title={t(`moods.${m.label}`)}
            >
              <span className='text-xl'>{m.icon}</span>
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <label className='text-sm font-medium text-gray-600 flex items-center gap-2'>
            <Sparkles className='h-4 w-4 text-amber-500' />
            {t('achievements_label')}
          </label>
          <Textarea
            placeholder={isReadOnly ? '' : t('achievements_placeholder')}
            value={achievements}
            onChange={(e) => !isReadOnly && setAchievements(e.target.value)}
            disabled={isReadOnly}
            className={`min-h-[100px] border-purple-50 focus-visible:ring-purple-400 bg-white/80 ${isReadOnly ? 'opacity-90 resize-none' : ''}`}
          />
        </div>

        <div className='space-y-2'>
          <label className='text-sm font-medium text-gray-600 flex items-center gap-2'>
            <MessageSquare className='h-4 w-4 text-blue-500' />
            {t('memories_label')}
          </label>
          <Textarea
            placeholder={isReadOnly ? '' : t('memories_placeholder')}
            value={memories}
            onChange={(e) => !isReadOnly && setMemories(e.target.value)}
            disabled={isReadOnly}
            className={`min-h-[100px] border-purple-50 focus-visible:ring-purple-400 bg-white/80 ${isReadOnly ? 'opacity-90 resize-none' : ''}`}
          />
        </div>

        {!isReadOnly && (
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className='w-full bg-purple-600 hover:bg-purple-700 shadow-md transition-all active:scale-[0.98] font-medium'
          >
            {isSaving ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                className='mr-2'
              >
                <Sparkles className='h-4 w-4' />
              </motion.div>
            ) : (
              <Save className='me-2 h-4 w-4' />
            )}
            {isSaving ? 'Saving...' : t('save_button')}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
