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

export default function DailyTrackingTable() {
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

  // Calculate total pages
  const totalPages = Math.ceil(activities.length / itemsPerPage);

  // Get current page items
  const currentItems = activities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleCheckboxChange = (day: number, field: keyof DailyActivity) => {
    const activity = activities.find((a: DailyActivity) => a.day === day);
    if (activity) {
      const newValue = !activity[field];
      updateActivity(day, field, newValue);

      // Show toast notification
      if (newValue) {
        toast({
          title: 'تم تحديث النشاط',
          description: `تم تسجيل ${getFieldName(field)} ليوم ${day} من رمضان`,
        });
      }
    }
  };

  const getFieldName = (field: keyof DailyActivity): string => {
    const fieldNames: Record<string, string> = {
      fasting: 'الصيام',
      qiyam: 'قيام الليل',
      duha: 'صلاة الضحى',
      rawatib: 'السنن الرواتب',
      charity: 'الصدقة',
      familyVisit: 'صلة الرحم',
      happiness: 'إدخال السرور',
      feeding: 'الإطعام',
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
    // Get current Hijri day
    const today = new Date();
    const dayOfMonth = today.getDate();

    // Reset today's activities
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
        title: 'تم إعادة تعيين اليوم',
        description: `تم إعادة تعيين جميع الأنشطة ليوم ${day} من رمضان`,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className='mt-10 overflow-x-auto rtl shadow-lg border-purple-100 dark:border-purple-900'>
        <CardHeader className='bg-purple-700 text-white flex flex-row items-center justify-between py-4'>
          <CardTitle className='text-lg'>سجل المتابعة اليومي</CardTitle>
          <Button
            variant='outline'
            size='sm'
            className='bg-purple-600 text-white border-purple-500 hover:bg-purple-800'
            onClick={resetDay}
          >
            <RefreshCw className='mr-2 h-4 w-4' />
            إعادة تعيين
          </Button>
        </CardHeader>
        <CardContent className='p-0'>
          <div className='overflow-x-auto'>
            <table className='w-full border-collapse'>
              <thead>
                <tr className='bg-purple-50 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300'>
                  <th className='p-3 text-right'>اليوم</th>
                  <th className='p-3 text-center'>الفروض</th>
                  <th className='p-3 text-center'>قيام الليل</th>
                  <th className='p-3 text-center'>الضحى</th>
                  <th className='p-3 text-center'>السنن الرواتب</th>
                  <th className='p-3 text-center'>القرآن</th>
                  <th className='p-3 text-center'>أذكار الصباح</th>
                  <th className='p-3 text-center'>أذكار المساء</th>
                  <th className='p-3 text-center'>صدقة</th>
                  <th className='p-3 text-center'>صلة رحم</th>
                  <th className='p-3 text-center'>إدخال سرور</th>
                  <th className='p-3 text-center'>إطعام</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((activity: DailyActivity) => (
                  <motion.tr
                    key={activity.day}
                    className='border-b border-gray-100 dark:border-gray-800 hover:bg-purple-50/50 dark:hover:bg-purple-900/20'
                    whileHover={{ backgroundColor: 'rgba(124, 58, 237, 0.1)' }}
                  >
                    <td className='p-3 text-right font-medium'>
                      {activity.day} رمضان
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className='flex justify-center items-center gap-2 p-4'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className='border-purple-200 hover:bg-purple-50 hover:text-purple-700'
              >
                السابق
              </Button>

              <span className='mx-2'>
                صفحة {currentPage} من {totalPages}
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
                التالي
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
