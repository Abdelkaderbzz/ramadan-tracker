'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { RotateCcw, Plus, MousePointer2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export function TasbeehCounter() {
  const t = useTranslations('Tasbeeh');
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);

  const increment = useCallback(() => {
    setCount((prev) => {
      const next = prev + 1;
      if (next === target && vibrationEnabled && 'vibrate' in navigator) {
        navigator.vibrate(200);
      } else if (vibrationEnabled && 'vibrate' in navigator) {
        navigator.vibrate(50);
      }
      return next;
    });
  }, [target, vibrationEnabled]);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  const toggleTarget = useCallback(() => {
    setTarget((prev) => (prev === 33 ? 99 : prev === 99 ? 100 : 33));
    setCount(0);
  }, []);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        increment();
      } else if (e.code === 'KeyR') {
        reset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [increment, reset]);

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-xl font-medium'>{t('title')}</CardTitle>
        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            size='sm'
            onClick={toggleTarget}
            className='text-xs font-bold text-purple-600'
          >
            {target}
          </Button>
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8'
            onClick={reset}
          >
            <RotateCcw className='h-4 w-4' />
          </Button>
        </div>
      </CardHeader>
      <CardContent className='flex flex-col items-center gap-6 py-8'>
        <div className='relative group'>
          <motion.div
            key={count}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className='text-7xl font-bold text-purple-600 tabular-nums'
          >
            {count}
          </motion.div>
          <div className='absolute -top-4 -right-4 text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full'>
            / {target}
          </div>
        </div>

        <div className='grid grid-cols-1 w-full gap-4'>
          <Button
            size='lg'
            className='h-32 rounded-3xl bg-purple-600 hover:bg-purple-700 text-white shadow-lg active:scale-95 transition-all text-2xl flex flex-col gap-2'
            onClick={increment}
          >
            <Plus className='h-8 w-8' />
            <span>{t('tap_to_count')}</span>
          </Button>
        </div>

        <div className='flex justify-center gap-4 text-xs text-muted-foreground'>
          <div className='flex items-center gap-1.5'>
            <MousePointer2 className='h-3 w-3' />
            <span>{t('space_to_count')}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
