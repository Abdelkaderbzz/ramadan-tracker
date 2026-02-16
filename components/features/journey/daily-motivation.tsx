'use client';

import { useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Quote, Sparkles, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { RAMADAN_MOTIVATIONS } from '@/lib/constants/motivations';
import { motion } from 'framer-motion';

export function DailyMotivation({ day }: { day: number }) {
  const t = useTranslations('Journey.Motivation');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  // Deterministically select a motivation based on the day of Ramadan
  const motivation = useMemo(() => {
    const index = (day - 1) % RAMADAN_MOTIVATIONS.length;
    return RAMADAN_MOTIVATIONS[index];
  }, [day]);

  const content = isRtl ? motivation.contentAr : motivation.content;
  const source = isRtl ? motivation.sourceAr : motivation.source;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <Card className='border-none bg-gradient-to-br from-purple-600 to-indigo-700 text-white overflow-hidden shadow-xl'>
        <div
          className={`absolute top-0 ${isRtl ? 'left-0' : 'right-0'} p-4 opacity-10`}
        >
          <Quote
            className={`h-24 w-24 ${isRtl ? '-rotate-12' : 'rotate-12'}`}
          />
        </div>
        <CardContent className='p-6 relative z-10'>
          <div className='flex items-center gap-2 mb-4'>
            <div className='bg-white/20 p-2 rounded-lg'>
              <Sparkles className='h-5 w-5 text-yellow-300' />
            </div>
            <span className='text-xs font-bold tracking-widest uppercase text-purple-100'>
              {t(`types.${motivation.type}`)}
            </span>
          </div>

          <blockquote
            className={`text-lg md:text-xl font-medium leading-relaxed mb-4 italic ${isRtl ? 'font-arabic' : ''}`}
          >
            &quot;{content}&quot;
          </blockquote>

          {source && (
            <div className='flex items-center gap-2 text-purple-200'>
              <Star className='h-4 w-4 fill-current' />
              <cite className='text-sm not-italic opacity-80'>
                {isRtl ? source : `— ${source}`}
              </cite>
            </div>
          )}

          <div
            className={`mt-6 flex ${isRtl ? 'justify-start' : 'justify-end'}`}
          >
            <div className='inline-flex items-center px-3 py-1 bg-white/10 rounded-full text-[10px] font-semibold text-white backdrop-blur-sm border border-white/10'>
              {t('keep_going')}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
