'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface DuaSuggestionsProps {
  onSelect: (dua: string) => void;
}

export function DuaSuggestions({ onSelect }: DuaSuggestionsProps) {
  const t = useTranslations('Duas');
  const tSuggested = useTranslations('SuggestedDuas');
  const [selectedCategory, setSelectedCategory] = useState<string>('ramadan');

  const duaCategories = {
    ramadan: Array.from({ length: 7 }, (_, i) => `${i}`),
    morning_evening: Array.from({ length: 4 }, (_, i) => `${i}`),
    forgiveness: Array.from({ length: 4 }, (_, i) => `${i}`),
    various: Array.from({ length: 6 }, (_, i) => `${i}`),
  };

  return (
    <div className='rtl'>
      <DialogHeader>
        <DialogTitle>{t('daily.choose_suggested')}</DialogTitle>
        <DialogDescription>{t('daily.choose_desc')}</DialogDescription>
      </DialogHeader>

      <div className='flex flex-col gap-4 py-4'>
        <div className='flex flex-wrap gap-2 mb-4'>
          {Object.keys(duaCategories).map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className='text-sm'
            >
              {t(`categories.${category}`)}
            </Button>
          ))}
        </div>

        <div className='grid gap-2 max-h-[300px] overflow-y-auto'>
          {duaCategories[selectedCategory as keyof typeof duaCategories].map(
            (duaKey, index) => {
              const duaText = tSuggested(`${selectedCategory}.${duaKey}`);
              return (
                <div
                  key={index}
                  className='p-3 border rounded-md cursor-pointer hover:bg-muted text-right'
                  onClick={() => onSelect(duaText)}
                >
                  {duaText}
                </div>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
}
