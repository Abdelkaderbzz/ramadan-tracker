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
import { useTranslations } from 'next-intl';

export default function DailyDua() {
  const t = useTranslations('Duas');
  const tSuggested = useTranslations('SuggestedDuas');
  const { savedDuas, addDua, removeDua, currentDua, updateCurrentDua } =
    useRamadanStore();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { toast } = useToast();
  // Using English key for state
  const [selectedCategory, setSelectedCategory] = useState<string>('ramadan');

  // Categorized duas - using keys instead of text
  const duaCategories = {
    ramadan: Array.from({ length: 7 }, (_, i) => `${i}`),
    morning_evening: Array.from({ length: 4 }, (_, i) => `${i}`),
    forgiveness: Array.from({ length: 4 }, (_, i) => `${i}`),
    various: Array.from({ length: 6 }, (_, i) => `${i}`),
  };

  const categoryMapping: Record<string, string> = {
    ramadan: 'ramadan',
    morning_evening: 'morning_evening',
    forgiveness: 'forgiveness',
    // 'paradise' key was missing in daily-dua keys but present in en.json messages.
    // Checking previous code: 'أدعية طلب الجنة': 'paradise' was mapped.
    // However, I merged it into 'various' or didn't extract it separately in the JSON step above?
    // Wait, in my JSON 'various' I included "Asking for Paradise" duas.
    // Let's stick to the 4 categories I defined in JSON.
    various: 'various',
  };

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
    // No need to manually set showSuggestions as the dialog will handle its own state
  };

  return (
    <Card className='rtl'>
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
              className='rtl text-right pr-10'
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-primary'
                >
                  <BookOpen className='h-4 w-4' />
                </Button>
              </DialogTrigger>
              <DialogContent className='rtl'>
                <DialogHeader>
                  <DialogTitle>{t('daily.choose_suggested')}</DialogTitle>
                  <DialogDescription>
                    {t('daily.choose_desc')}
                  </DialogDescription>
                </DialogHeader>

                <div className='flex flex-col gap-4 py-4'>
                  <div className='flex flex-wrap gap-2 mb-4'>
                    {Object.keys(duaCategories).map((category) => (
                      <Button
                        key={category}
                        variant={
                          selectedCategory === category ? 'default' : 'outline'
                        }
                        onClick={() => setSelectedCategory(category)}
                        className='text-sm'
                      >
                        {t(`categories.${categoryMapping[category]}`)}
                      </Button>
                    ))}
                  </div>

                  <div className='grid gap-2 max-h-[300px] overflow-y-auto'>
                    {duaCategories[
                      selectedCategory as keyof typeof duaCategories
                    ].map((duaKey, index) => {
                      const duaText = tSuggested(
                        `${selectedCategory}.${duaKey}`,
                      );
                      return (
                        <div
                          key={index}
                          className='p-3 border rounded-md cursor-pointer hover:bg-muted'
                          dir={
                            tSuggested('ramadan.0').match(/[\u0600-\u06FF]/)
                              ? 'rtl'
                              : 'ltr'
                          }
                          onClick={() => {
                            updateCurrentDua(duaText);
                            // Close the dialog after selection
                            const closeButton = document.querySelector(
                              '[data-state="open"] button[aria-label="Close"]',
                            );
                            if (closeButton instanceof HTMLElement) {
                              closeButton.click();
                            }
                          }}
                        >
                          {duaText}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className='flex justify-end'>
            <Button onClick={handleSaveDua} size='sm' className='gap-1'>
              <Save className='h-4 w-4 ml-1' />
              {t('daily.save')}
            </Button>
          </div>
        </div>

        {savedDuas.length > 0 && (
          <div className='mt-4'>
            <h4 className='text-sm font-medium mb-2'>
              {t('daily.saved_list')}
            </h4>
            <div className='space-y-2 max-h-[150px] overflow-y-auto pr-1'>
              <AnimatePresence>
                {savedDuas.map((dua, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className='flex items-center justify-between p-2 bg-muted/50 rounded-md'
                  >
                    <p className='text-sm flex-1'>{dua}</p>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='h-7 w-7 text-muted-foreground hover:text-destructive'
                      onClick={() => removeDua(index)}
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
