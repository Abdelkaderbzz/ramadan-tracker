'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  BookOpen,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  ArrowUpDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRamadanStore } from '@/lib/store';
import type { DailyActivity } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { formatNumber } from '@/lib/arabic-numerals';
import { useTranslations, useLocale } from 'next-intl';
import {
  surahs as quranSurahsData,
  juzs as quranJuzsData,
} from '@/lib/quran-data';
import type { Surah, Juz } from '@/lib/quran-data';

type SurahWithProgress = Surah & {
  isRead: boolean;
  progress: number;
};

type JuzWithProgress = Juz & {
  isRead: boolean;
};

export default function QuranTracker() {
  const t = useTranslations('Quran');
  const tSurahs = useTranslations('Surahs');
  const locale = useLocale();
  const {
    activities,
    updateQuranCount,
    readSurahs,
    toggleSurahRead,
    readJuzs,
    toggleJuzRead,
  } = useRamadanStore();

  const [surahs, setSurahs] = useState<SurahWithProgress[]>([]);
  const [juzs, setJuzs] = useState<JuzWithProgress[]>([]);
  const [viewMode, setViewMode] = useState<'surah' | 'juz'>('surah');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Calculate total read verses based on marked surahs
  const totalVerses = 6236; // Total verses in Quran
  const readVersesCount = useMemo(() => {
    return quranSurahsData
      .filter((s) => readSurahs.includes(s.number))
      .reduce((acc, s) => acc + s.verses, 0);
  }, [readSurahs]);

  const surahProgressPercentage = Math.round(
    (readVersesCount / totalVerses) * 100,
  );

  // Calculate total read juzs
  const totalJuzs = 30;
  const readJuzsCount = readJuzs.length;
  const juzProgressPercentage = Math.round((readJuzsCount / totalJuzs) * 100);

  const currentProgressPercentage =
    viewMode === 'surah' ? surahProgressPercentage : juzProgressPercentage;

  const itemsPerPage = 10;

  // Quran data processing
  useEffect(() => {
    // Process Surahs
    const processedSurahs = quranSurahsData.map((s) => ({
      ...s,
      isRead: readSurahs.includes(s.number),
      progress: readSurahs.includes(s.number) ? 100 : 0,
    }));
    setSurahs(processedSurahs);

    // Process Juzs
    const processedJuzs = quranJuzsData.map((j) => ({
      ...j,
      isRead: readJuzs.includes(j.number),
    }));
    setJuzs(processedJuzs);
  }, [readSurahs, readJuzs]);

  const toggleRead = (id: number) => {
    if (viewMode === 'surah') {
      toggleSurahRead(id);
    } else {
      toggleJuzRead(id);
    }
  };

  const filteredAndSortedItems = useMemo(() => {
    let result: (SurahWithProgress | JuzWithProgress)[] =
      viewMode === 'surah' ? [...surahs] : [...juzs];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (viewMode === 'surah') {
        result = (result as SurahWithProgress[]).filter(
          (s) =>
            s.name.toLowerCase().includes(query) ||
            s.arabicName.includes(query) ||
            tSurahs(s.number.toString()).toLowerCase().includes(query),
        );
      } else {
        result = (result as JuzWithProgress[]).filter(
          (j) =>
            j.name.toLowerCase().includes(query) ||
            j.arabicName.includes(query) ||
            t('juz').toLowerCase().includes(query) ||
            `juz ${j.number}`.includes(query),
        );
      }
    }

    // Sort order
    if (sortOrder === 'desc') {
      result.reverse();
    }

    return result;
  }, [surahs, juzs, searchQuery, sortOrder, tSurahs, viewMode, t]);

  // Reset pagination when view mode or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [viewMode, searchQuery]);

  const totalPages = Math.ceil(filteredAndSortedItems.length / itemsPerPage);
  const currentItems = filteredAndSortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <Card
      className={`mt-6 border-purple-100 dark:border-purple-800 dark:bg-gray-800 ${locale === 'ar' ? 'rtl' : 'ltr'}`}
    >
      <CardContent className='p-6'>
        <div className='flex items-center justify-between mb-6'>
          <h2
            className={`text-2xl font-bold text-purple-800 dark:text-purple-300 ${locale === 'ar' ? 'rtl' : ''}`}
          >
            {t('quran_tracker')}
          </h2>
          <div className='flex items-center gap-2'>
            <BookOpen className='h-6 w-6 text-purple-600' />
          </div>
        </div>

        <div className='mb-8'>
          <div className='flex justify-between items-center mb-2'>
            <span className='text-sm text-gray-600 dark:text-gray-300'>
              {t('progress')}
            </span>
            <span className='text-sm font-medium text-purple-600'>
              {formatNumber(currentProgressPercentage, locale)}%
            </span>
          </div>
          <Progress
            value={currentProgressPercentage}
            className='h-3'
            color='purple-500'
          />
          <p className='text-xs text-center mt-2 text-gray-500'>
            {viewMode === 'surah' ? (
              <>
                {formatNumber(readVersesCount, locale)} /{' '}
                {formatNumber(totalVerses, locale)} {t('verses_read')}
              </>
            ) : (
              <>
                {formatNumber(readJuzsCount, locale)} /{' '}
                {formatNumber(totalJuzs, locale)} {t('juzs')}
              </>
            )}
          </p>
        </div>

        <div className='flex flex-col md:flex-row gap-4 mb-6'>
          <div className='relative flex-1'>
            <Search
              className={`absolute ${locale === 'ar' ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400`}
            />
            <Input
              placeholder={t('search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={locale === 'ar' ? 'pr-9' : 'pl-9'}
            />
          </div>

          <div className='flex bg-gray-100 p-1 rounded-lg dark:bg-gray-700 h-10 items-center'>
            <button
              onClick={() => setViewMode('surah')}
              className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all h-full flex items-center justify-center ${viewMode === 'surah' ? 'bg-white text-purple-600 shadow-sm dark:bg-gray-600 dark:text-purple-300' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
            >
              {t('surah_view')}
            </button>
            <button
              onClick={() => setViewMode('juz')}
              className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all h-full flex items-center justify-center ${viewMode === 'juz' ? 'bg-white text-purple-600 shadow-sm dark:bg-gray-600 dark:text-purple-300' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}`}
            >
              {t('juz_view')}
            </button>
          </div>

          <Select
            value={sortOrder}
            onValueChange={(value: 'asc' | 'desc') => setSortOrder(value)}
          >
            <SelectTrigger className='w-full md:w-[130px]'>
              <ArrowUpDown className='w-4 h-4 mr-2' />
              <SelectValue placeholder={t('sort_order')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='asc'>{t('sort_asc')}</SelectItem>
              <SelectItem value='desc'>{t('sort_desc')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='space-y-4'>
          <AnimatePresence mode='wait'>
            {currentItems.map((item) => {
              const isSurah = viewMode === 'surah';
              // Type guards or casting
              const surahItem = isSurah ? (item as SurahWithProgress) : null;
              const juzItem = !isSurah ? (item as JuzWithProgress) : null;

              const isRead = item.isRead;
              const number = item.number;

              return (
                <motion.div
                  key={`${viewMode}-${number}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                    isRead
                      ? 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800'
                      : 'bg-white border-gray-100 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-750'
                  }`}
                >
                  <div className='flex items-center gap-4'>
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ${
                        isRead
                          ? 'bg-purple-600 text-white'
                          : 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-300'
                      }`}
                    >
                      {formatNumber(number, locale)}
                    </div>
                    <div>
                      <h3 className='font-semibold text-gray-900 dark:text-gray-100'>
                        {isSurah
                          ? tSurahs(number.toString())
                          : locale === 'ar'
                            ? juzItem?.arabicName
                            : juzItem?.name}
                      </h3>
                      <p className='text-sm text-gray-500 dark:text-gray-400'>
                        {isSurah ? (
                          <>
                            {surahItem?.arabicName} •{' '}
                            {formatNumber(surahItem?.verses || 0, locale)}{' '}
                            {t('verses')}
                          </>
                        ) : (
                          <>
                            {tSurahs((juzItem?.startSurah ?? 1).toString())}{' '}
                            {formatNumber(juzItem?.startVerse || 0, locale)} -{' '}
                            {tSurahs((juzItem?.endSurah ?? 1).toString())}{' '}
                            {formatNumber(juzItem?.endVerse || 0, locale)}
                          </>
                        )}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant={isRead ? 'default' : 'outline'}
                    size='sm'
                    onClick={() => toggleRead(number)}
                    className={
                      isRead ? 'bg-purple-600 hover:bg-purple-700' : ''
                    }
                  >
                    {isRead ? (
                      <>
                        <CheckCircle className='w-4 h-4 mr-2' />
                        {t('completed')}
                      </>
                    ) : (
                      t('mark_read')
                    )}
                  </Button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className='flex justify-center mt-8 gap-2'>
            <Button
              variant='outline'
              size='icon'
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft
                className={`h-4 w-4 ${locale === 'ar' ? 'rotate-180' : ''}`}
              />
            </Button>
            <div className='flex items-center gap-2'>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) =>
                    p === 1 ||
                    p === totalPages ||
                    Math.abs(p - currentPage) <= 1,
                )
                .map((p, i, arr) => (
                  <div key={p}>
                    {i > 0 && arr[i - 1] !== p - 1 && (
                      <span className='text-gray-400 mx-1'>...</span>
                    )}
                    <Button
                      variant={currentPage === p ? 'default' : 'outline'}
                      size='sm'
                      onClick={() => setCurrentPage(p)}
                      className={
                        currentPage === p
                          ? 'bg-purple-600 hover:bg-purple-700'
                          : ''
                      }
                    >
                      {formatNumber(p, locale)}
                    </Button>
                  </div>
                ))}
            </div>
            <Button
              variant='outline'
              size='icon'
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight
                className={`h-4 w-4 ${locale === 'ar' ? 'rotate-180' : ''}`}
              />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
