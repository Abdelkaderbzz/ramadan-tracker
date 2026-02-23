'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { RefreshCw } from 'lucide-react';
import { useRamadanStore } from '@/lib/store';
import type { DailyActivity } from '@/lib/store';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';
import { useTranslations, useLocale } from 'next-intl';

export default function DailyTrackingTable() {
  const t = useTranslations('Dashboard');
  const tIndex = useTranslations('Index'); 
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const {
    activities,
    updateActivity,
    updateQuranCount,
    updateDhikr,
    calculateStats,
  } = useRamadanStore();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { toast } = useToast();

  
  const totalPages = Math.ceil(activities.length / itemsPerPage);

  
  const currentItems = activities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleCheckboxChange = (day: number, field: keyof DailyActivity) => {
    const activity = activities.find((a: DailyActivity) => a.day === day);
    if (activity) {
      const newValue = !activity[field];
      updateActivity(day, field, newValue);

      
      if (newValue) {
        toast({
          title: t('activity_updated'),
          description: t('activity_desc', {
            activity: getFieldName(field),
            day,
          }),
        });
      }
    }
  };

  const getFieldName = (field: keyof DailyActivity): string => {
    const fieldNames: Record<string, string> = {
      fasting: t('activities.fasting'),
      qiyam: t('activities.qiyam'),
      duha: t('activities.duha'),
      rawatib: t('activities.rawatib'),
      charity: t('activities.charity'),
      familyVisit: t('activities.familyVisit'),
      happiness: t('activities.happiness'),
      feeding: t('activities.feeding'),
    };

    return fieldNames[field] || field;
  };

  const handleInputChange = (
    day: number,
    field: 'quran' | 'dhikrMorning' | 'dhikrEvening',
    value: string,
  ) => {
    if (field === 'quran') {
      updateQuranCount(day, value);
    } else {
      updateDhikr(day, field, value);
    }
  };

  const resetDay = () => {
    
    const today = new Date();
    const dayOfMonth = today.getDate();

    
    if (activities[dayOfMonth - 1]) {
      const day = activities[dayOfMonth - 1].day;

      updateActivity(day, 'fasting', false);
      updateActivity(day, 'qiyam', false);
      updateActivity(day, 'duha', false);
      updateActivity(day, 'rawatib', false);
      updateQuranCount(day, '0');
      updateDhikr(day, 'dhikrMorning', '0');
      updateDhikr(day, 'dhikrEvening', '0');
      updateActivity(day, 'charity', false);
      updateActivity(day, 'familyVisit', false);
      updateActivity(day, 'happiness', false);
      updateActivity(day, 'feeding', false);

      calculateStats();

      toast({
        title: t('reset_success'),
        description: t('reset_desc', { day }),
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card
        className={`mt-10 overflow-x-auto ${isRtl ? 'rtl' : 'ltr'} shadow-lg border-purple-100 dark:border-purple-900`}
      >
        <CardHeader className='bg-purple-700 text-white flex flex-row items-center justify-between py-4'>
          <CardTitle className='text-lg'>{t('title')}</CardTitle>
          <Button
            variant='outline'
            size='sm'
            className='bg-purple-600 text-white border-purple-500 hover:bg-purple-800'
            onClick={resetDay}
          >
            <RefreshCw className='mr-2 h-4 w-4' />
            {t('reset')}
          </Button>
        </CardHeader>
        <CardContent className='p-0'>
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse'>
              <thead>
                <tr className='bg-purple-50 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300'>
                  <th
                    className={`p-3 ${isRtl ? 'text-right right-0' : 'text-left left-0'} sticky bg-purple-50 dark:bg-purple-900 z-10 min-w-[100px]`}
                  >
                    {t('table.day')}
                  </th>
                  <th className='p-2 text-center text-xs md:text-sm min-w-[60px]'>
                    {t('table.fard')}
                  </th>
                  <th className='p-2 text-center text-xs md:text-sm min-w-[60px]'>
                    {t('table.qiyam')}
                  </th>
                  <th className='p-2 text-center text-xs md:text-sm min-w-[60px]'>
                    {t('table.duha')}
                  </th>
                  <th className='p-2 text-center text-xs md:text-sm min-w-[60px]'>
                    {t('table.rawatib')}
                  </th>
                  <th className='p-2 text-center text-xs md:text-sm min-w-[80px]'>
                    {t('table.quran')}
                  </th>
                  <th className='p-2 text-center text-xs md:text-sm min-w-[60px]'>
                    <span className='md:hidden'>
                      {t('table.dhikr_morning').slice(0, 4)}..
                    </span>
                    <span className='hidden md:inline'>
                      {t('table.dhikr_morning')}
                    </span>
                  </th>
                  <th className='p-2 text-center text-xs md:text-sm min-w-[60px]'>
                    <span className='md:hidden'>
                      {t('table.dhikr_evening').slice(0, 4)}..
                    </span>
                    <span className='hidden md:inline'>
                      {t('table.dhikr_evening')}
                    </span>
                  </th>
                  <th className='p-2 text-center text-xs md:text-sm min-w-[60px]'>
                    {t('table.charity')}
                  </th>
                  <th className='p-2 text-center text-xs md:text-sm min-w-[60px]'>
                    {t('table.family')}
                  </th>
                  <th className='p-2 text-center text-xs md:text-sm min-w-[60px]'>
                    {t('table.happiness')}
                  </th>
                  <th className='p-2 text-center text-xs md:text-sm min-w-[60px]'>
                    {t('table.feeding')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((activity: DailyActivity) => (
                  <motion.tr
                    key={activity.day}
                    className='border-b border-gray-100 dark:border-gray-800 hover:bg-purple-50/50 dark:hover:bg-purple-900/20'
                    whileHover={{ backgroundColor: 'rgba(124, 58, 237, 0.1)' }}
                  >
                    <td
                      className={`p-3 ${isRtl ? 'text-right right-0' : 'text-left left-0'} font-medium sticky bg-white/95 dark:bg-gray-950/95 z-10 shadow-sm`}
                    >
                      {t('table.day')} {activity.day}
                    </td>
                    <td className='p-3 text-center'>
                      <Checkbox
                        checked={activity.fasting}
                        onCheckedChange={() =>
                          handleCheckboxChange(activity.day, 'fasting')
                        }
                        className='mx-auto data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600'
                      />
                    </td>
                    <td className='p-3 text-center'>
                      <Checkbox
                        checked={activity.qiyam}
                        onCheckedChange={() =>
                          handleCheckboxChange(activity.day, 'qiyam')
                        }
                        className='mx-auto data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600'
                      />
                    </td>
                    <td className='p-3 text-center'>
                      <Checkbox
                        checked={activity.duha}
                        onCheckedChange={() =>
                          handleCheckboxChange(activity.day, 'duha')
                        }
                        className='mx-auto data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600'
                      />
                    </td>
                    <td className='p-3 text-center'>
                      <Checkbox
                        checked={activity.rawatib}
                        onCheckedChange={() =>
                          handleCheckboxChange(activity.day, 'rawatib')
                        }
                        className='mx-auto data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600'
                      />
                    </td>
                    <td className='p-3 text-center'>
                      <Input
                        type='text'
                        value={activity.quran}
                        onChange={(e) =>
                          handleInputChange(
                            activity.day,
                            'quran',
                            e.target.value,
                          )
                        }
                        className='max-w-20 mx-auto text-center border-purple-200 focus:border-purple-400'
                      />
                    </td>
                    <td className='p-3 text-center'>
                      <Checkbox
                        checked={
                          activity.dhikrMorning !== '0' &&
                          activity.dhikrMorning !== ''
                        }
                        onCheckedChange={(checked) =>
                          handleInputChange(
                            activity.day,
                            'dhikrMorning',
                            checked ? '1' : '0',
                          )
                        }
                        className='mx-auto data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600'
                      />
                    </td>
                    <td className='p-3 text-center'>
                      <Checkbox
                        checked={
                          activity.dhikrEvening !== '0' &&
                          activity.dhikrEvening !== ''
                        }
                        onCheckedChange={(checked) =>
                          handleInputChange(
                            activity.day,
                            'dhikrEvening',
                            checked ? '1' : '0',
                          )
                        }
                        className='mx-auto data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600'
                      />
                    </td>
                    <td className='p-3 text-center'>
                      <Checkbox
                        checked={activity.charity}
                        onCheckedChange={() =>
                          handleCheckboxChange(activity.day, 'charity')
                        }
                        className='mx-auto data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600'
                      />
                    </td>
                    <td className='p-3 text-center'>
                      <Checkbox
                        checked={activity.familyVisit}
                        onCheckedChange={() =>
                          handleCheckboxChange(activity.day, 'familyVisit')
                        }
                        className='mx-auto data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600'
                      />
                    </td>
                    <td className='p-3 text-center'>
                      <Checkbox
                        checked={activity.happiness}
                        onCheckedChange={() =>
                          handleCheckboxChange(activity.day, 'happiness')
                        }
                        className='mx-auto data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600'
                      />
                    </td>
                    <td className='p-3 text-center'>
                      <Checkbox
                        checked={activity.feeding}
                        onCheckedChange={() =>
                          handleCheckboxChange(activity.day, 'feeding')
                        }
                        className='mx-auto data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600'
                      />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {}
          {totalPages > 1 && (
            <div className='flex justify-center items-center gap-2 p-4'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className='border-purple-200 hover:bg-purple-50 hover:text-purple-700'
              >
                {t('previous')}
              </Button>

              <span className='mx-2'>
                {t('page_info', { current: currentPage, total: totalPages })}
              </span>

              <Button
                variant='outline'
                size='sm'
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className='border-purple-200 hover:bg-purple-50 hover:text-purple-700'
              >
                {t('next')}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
