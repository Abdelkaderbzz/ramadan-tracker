'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FileText, Save, Trash2, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRamadanStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useTranslations, useLocale } from 'next-intl';

import { SavedDuaList } from './saved-dua-list';
import { DuaSuggestions } from './dua-suggestions';

export default function DailyDua() {
  const t = useTranslations('Duas');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const { savedDuas, addDua, removeDua, currentDua, updateCurrentDua } =
    useRamadanStore();
  const { toast } = useToast();

  const handleSaveDua = () => {
    if (!currentDua.trim()) {
      toast({
        title: t('daily.toast_empty_title'),
        description: t('daily.toast_empty_desc'),
        variant: 'destructive',
      });
      return;
    }

    addDua(currentDua);
    updateCurrentDua('');

    toast({
      title: t('daily.toast_saved_title'),
      description: t('daily.toast_saved_desc'),
    });
  };

  const handleSelectSuggestion = (dua: string) => {
    updateCurrentDua(dua);
    
    
  };

  return (
    <Card className={isRtl ? 'rtl' : 'ltr'}>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-md font-medium'>
          {t('daily.title_today')}
        </CardTitle>
        <motion.div whileHover={{ rotate: 15 }} whileTap={{ scale: 0.9 }}>
          <FileText className='h-5 w-5 text-teal-500' />
        </motion.div>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-muted-foreground mb-4'>
          {t('daily.subtitle')}
        </p>

        <div className='space-y-4'>
          <div className='relative'>
            <Input
              value={currentDua}
              onChange={(e) => updateCurrentDua(e.target.value)}
              placeholder={t('daily.placeholder')}
              className={`${isRtl ? 'rtl text-right pr-10' : 'ltr text-left pl-10'}`}
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className={`absolute ${isRtl ? 'left-2' : 'right-2'} top-1/2 transform -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-primary`}
                >
                  <BookOpen className='h-4 w-4' />
                </Button>
              </DialogTrigger>
              <DialogContent
                className={`${isRtl ? 'rtl' : 'ltr'} sm:max-w-[425px]`}
              >
                <DuaSuggestions
                  onSelect={(dua) => {
                    handleSelectSuggestion(dua);
                    
                    
                  }}
                />
              </DialogContent>
            </Dialog>
          </div>

          <div className='flex justify-end'>
            <Button onClick={handleSaveDua} size='sm' className='gap-1'>
              <Save className={`h-4 w-4 ${isRtl ? 'ml-1' : 'mr-1'}`} />
              {t('daily.save')}
            </Button>
          </div>
        </div>

        <SavedDuaList
          savedDuas={savedDuas}
          removeDua={removeDua}
          title={t('daily.saved_list')}
        />
      </CardContent>
    </Card>
  );
}
