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
import { motion } from 'framer-motion';
import { formatNumber } from '@/lib/arabic-numerals';
import { useTranslations, useLocale } from 'next-intl';

type Surah = {
  number: number;
  name: string;
  arabicName: string;
  verses: number;
  isRead: boolean;
  progress: number;
};

export default function QuranTracker() {
  const t = useTranslations('Quran');
  const tSurahs = useTranslations('Surahs');
  const locale = useLocale();
  const { activities, updateQuranCount, readSurahs, toggleSurahRead } =
    useRamadanStore();
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Calculate total read verses based on marked surahs
  const totalVerses = 6236; // Total verses in Quran
  const readVersesCount = useMemo(() => {
    return surahs
      .filter((s) => readSurahs.includes(s.number))
      .reduce((acc, s) => acc + s.verses, 0);
  }, [surahs, readSurahs]);

  const progressPercentage = Math.round((readVersesCount / totalVerses) * 100);

  const itemsPerPage = 10;

  // Quran surahs data
  useEffect(() => {
    const quranSurahs: Surah[] = [
      {
        number: 1,
        name: 'Al-Fatihah',
        arabicName: 'الفاتحة',
        verses: 7,
        isRead: false,
        progress: 0,
      },
      {
        number: 2,
        name: 'Al-Baqarah',
        arabicName: 'البقرة',
        verses: 286,
        isRead: false,
        progress: 0,
      },
      {
        number: 3,
        name: 'Aal-Imran',
        arabicName: 'آل عمران',
        verses: 200,
        isRead: false,
        progress: 0,
      },
      {
        number: 4,
        name: 'An-Nisa',
        arabicName: 'النساء',
        verses: 176,
        isRead: false,
        progress: 0,
      },
      {
        number: 5,
        name: "Al-Ma'idah",
        arabicName: 'المائدة',
        verses: 120,
        isRead: false,
        progress: 0,
      },
      {
        number: 6,
        name: "Al-An'am",
        arabicName: 'الأنعام',
        verses: 165,
        isRead: false,
        progress: 0,
      },
      {
        number: 7,
        name: "Al-A'raf",
        arabicName: 'الأعراف',
        verses: 206,
        isRead: false,
        progress: 0,
      },
      {
        number: 8,
        name: 'Al-Anfal',
        arabicName: 'الأنفال',
        verses: 75,
        isRead: false,
        progress: 0,
      },
      {
        number: 9,
        name: 'At-Tawbah',
        arabicName: 'التوبة',
        verses: 129,
        isRead: false,
        progress: 0,
      },
      {
        number: 10,
        name: 'Yunus',
        arabicName: 'يونس',
        verses: 109,
        isRead: false,
        progress: 0,
      },
      {
        number: 11,
        name: 'Hud',
        arabicName: 'هود',
        verses: 123,
        isRead: false,
        progress: 0,
      },
      {
        number: 12,
        name: 'Yusuf',
        arabicName: 'يوسف',
        verses: 111,
        isRead: false,
        progress: 0,
      },
      {
        number: 13,
        name: "Ar-Ra'd",
        arabicName: 'الرعد',
        verses: 43,
        isRead: false,
        progress: 0,
      },
      {
        number: 14,
        name: 'Ibrahim',
        arabicName: 'إبراهيم',
        verses: 52,
        isRead: false,
        progress: 0,
      },
      {
        number: 15,
        name: 'Al-Hijr',
        arabicName: 'الحجر',
        verses: 99,
        isRead: false,
        progress: 0,
      },
      {
        number: 16,
        name: 'An-Nahl',
        arabicName: 'النحل',
        verses: 128,
        isRead: false,
        progress: 0,
      },
      {
        number: 17,
        name: 'Al-Isra',
        arabicName: 'الإسراء',
        verses: 111,
        isRead: false,
        progress: 0,
      },
      {
        number: 18,
        name: 'Al-Kahf',
        arabicName: 'الكهف',
        verses: 110,
        isRead: false,
        progress: 0,
      },
      {
        number: 19,
        name: 'Maryam',
        arabicName: 'مريم',
        verses: 98,
        isRead: false,
        progress: 0,
      },
      {
        number: 20,
        name: 'Ta-Ha',
        arabicName: 'طه',
        verses: 135,
        isRead: false,
        progress: 0,
      },
      {
        number: 21,
        name: 'Al-Anbiya',
        arabicName: 'الأنبياء',
        verses: 112,
        isRead: false,
        progress: 0,
      },
      {
        number: 22,
        name: 'Al-Hajj',
        arabicName: 'الحج',
        verses: 78,
        isRead: false,
        progress: 0,
      },
      {
        number: 23,
        name: "Al-Mu'minun",
        arabicName: 'المؤمنون',
        verses: 118,
        isRead: false,
        progress: 0,
      },
      {
        number: 24,
        name: 'An-Nur',
        arabicName: 'النور',
        verses: 64,
        isRead: false,
        progress: 0,
      },
      {
        number: 25,
        name: 'Al-Furqan',
        arabicName: 'الفرقان',
        verses: 77,
        isRead: false,
        progress: 0,
      },
      {
        number: 26,
        name: "Ash-Shu'ara",
        arabicName: 'الشعراء',
        verses: 227,
        isRead: false,
        progress: 0,
      },
      {
        number: 27,
        name: 'An-Naml',
        arabicName: 'النمل',
        verses: 93,
        isRead: false,
        progress: 0,
      },
      {
        number: 28,
        name: 'Al-Qasas',
        arabicName: 'القصص',
        verses: 88,
        isRead: false,
        progress: 0,
      },
      {
        number: 29,
        name: 'Al-Ankabut',
        arabicName: 'العنكبوت',
        verses: 69,
        isRead: false,
        progress: 0,
      },
      {
        number: 30,
        name: 'Ar-Rum',
        arabicName: 'الروم',
        verses: 60,
        isRead: false,
        progress: 0,
      },
      {
        number: 31,
        name: 'Luqman',
        arabicName: 'لقمان',
        verses: 34,
        isRead: false,
        progress: 0,
      },
      {
        number: 32,
        name: 'As-Sajdah',
        arabicName: 'السجدة',
        verses: 30,
        isRead: false,
        progress: 0,
      },
      {
        number: 33,
        name: 'Al-Ahzab',
        arabicName: 'الأحزاب',
        verses: 73,
        isRead: false,
        progress: 0,
      },
      {
        number: 34,
        name: 'Saba',
        arabicName: 'سبأ',
        verses: 54,
        isRead: false,
        progress: 0,
      },
      {
        number: 35,
        name: 'Fatir',
        arabicName: 'فاطر',
        verses: 45,
        isRead: false,
        progress: 0,
      },
      {
        number: 36,
        name: 'Ya-Sin',
        arabicName: 'يس',
        verses: 83,
        isRead: false,
        progress: 0,
      },
      {
        number: 37,
        name: 'As-Saffat',
        arabicName: 'الصافات',
        verses: 182,
        isRead: false,
        progress: 0,
      },
      {
        number: 38,
        name: 'Sad',
        arabicName: 'ص',
        verses: 88,
        isRead: false,
        progress: 0,
      },
      {
        number: 39,
        name: 'Az-Zumar',
        arabicName: 'الزمر',
        verses: 75,
        isRead: false,
        progress: 0,
      },
      {
        number: 40,
        name: 'Ghafir',
        arabicName: 'غافر',
        verses: 85,
        isRead: false,
        progress: 0,
      },
      {
        number: 41,
        name: 'Fussilat',
        arabicName: 'فصلت',
        verses: 54,
        isRead: false,
        progress: 0,
      },
      {
        number: 42,
        name: 'Ash-Shura',
        arabicName: 'الشورى',
        verses: 53,
        isRead: false,
        progress: 0,
      },
      {
        number: 43,
        name: 'Az-Zukhruf',
        arabicName: 'الزخرف',
        verses: 89,
        isRead: false,
        progress: 0,
      },
      {
        number: 44,
        name: 'Ad-Dukhan',
        arabicName: 'الدخان',
        verses: 59,
        isRead: false,
        progress: 0,
      },
      {
        number: 45,
        name: 'Al-Jathiyah',
        arabicName: 'الجاثية',
        verses: 37,
        isRead: false,
        progress: 0,
      },
      {
        number: 46,
        name: 'Al-Ahqaf',
        arabicName: 'الأحقاف',
        verses: 35,
        isRead: false,
        progress: 0,
      },
      {
        number: 47,
        name: 'Muhammad',
        arabicName: 'محمد',
        verses: 38,
        isRead: false,
        progress: 0,
      },
      {
        number: 48,
        name: 'Al-Fath',
        arabicName: 'الفتح',
        verses: 29,
        isRead: false,
        progress: 0,
      },
      {
        number: 49,
        name: 'Al-Hujurat',
        arabicName: 'الحجرات',
        verses: 18,
        isRead: false,
        progress: 0,
      },
      {
        number: 50,
        name: 'Qaf',
        arabicName: 'ق',
        verses: 45,
        isRead: false,
        progress: 0,
      },
      {
        number: 51,
        name: 'Adh-Dhariyat',
        arabicName: 'الذاريات',
        verses: 60,
        isRead: false,
        progress: 0,
      },
      {
        number: 52,
        name: 'At-Tur',
        arabicName: 'الطور',
        verses: 49,
        isRead: false,
        progress: 0,
      },
      {
        number: 53,
        name: 'An-Najm',
        arabicName: 'النجم',
        verses: 62,
        isRead: false,
        progress: 0,
      },
      {
        number: 54,
        name: 'Al-Qamar',
        arabicName: 'القمر',
        verses: 55,
        isRead: false,
        progress: 0,
      },
      {
        number: 55,
        name: 'Ar-Rahman',
        arabicName: 'الرحمن',
        verses: 78,
        isRead: false,
        progress: 0,
      },
      {
        number: 56,
        name: "Al-Waqi'ah",
        arabicName: 'الواقعة',
        verses: 96,
        isRead: false,
        progress: 0,
      },
      {
        number: 57,
        name: 'Al-Hadid',
        arabicName: 'الحديد',
        verses: 29,
        isRead: false,
        progress: 0,
      },
      {
        number: 58,
        name: 'Al-Mujadilah',
        arabicName: 'المجادلة',
        verses: 22,
        isRead: false,
        progress: 0,
      },
      {
        number: 59,
        name: 'Al-Hashr',
        arabicName: 'الحشر',
        verses: 24,
        isRead: false,
        progress: 0,
      },
      {
        number: 60,
        name: 'Al-Mumtahanah',
        arabicName: 'الممتحنة',
        verses: 13,
        isRead: false,
        progress: 0,
      },
      {
        number: 61,
        name: 'As-Saff',
        arabicName: 'الصف',
        verses: 14,
        isRead: false,
        progress: 0,
      },
      {
        number: 62,
        name: "Al-Jumu'ah",
        arabicName: 'الجمعة',
        verses: 11,
        isRead: false,
        progress: 0,
      },
      {
        number: 63,
        name: 'Al-Munafiqun',
        arabicName: 'المنافقون',
        verses: 11,
        isRead: false,
        progress: 0,
      },
      {
        number: 64,
        name: 'At-Taghabun',
        arabicName: 'التغابن',
        verses: 18,
        isRead: false,
        progress: 0,
      },
      {
        number: 65,
        name: 'At-Talaq',
        arabicName: 'الطلاق',
        verses: 12,
        isRead: false,
        progress: 0,
      },
      {
        number: 66,
        name: 'At-Tahrim',
        arabicName: 'التحريم',
        verses: 12,
        isRead: false,
        progress: 0,
      },
      {
        number: 67,
        name: 'Al-Mulk',
        arabicName: 'الملك',
        verses: 30,
        isRead: false,
        progress: 0,
      },
      {
        number: 68,
        name: 'Al-Qalam',
        arabicName: 'القلم',
        verses: 52,
        isRead: false,
        progress: 0,
      },
      {
        number: 69,
        name: 'Al-Haqqah',
        arabicName: 'الحاقة',
        verses: 52,
        isRead: false,
        progress: 0,
      },
      {
        number: 70,
        name: "Al-Ma'arij",
        arabicName: 'المعارج',
        verses: 44,
        isRead: false,
        progress: 0,
      },
      {
        number: 71,
        name: 'Nuh',
        arabicName: 'نوح',
        verses: 28,
        isRead: false,
        progress: 0,
      },
      {
        number: 72,
        name: 'Al-Jinn',
        arabicName: 'الجن',
        verses: 28,
        isRead: false,
        progress: 0,
      },
      {
        number: 73,
        name: 'Al-Muzzammil',
        arabicName: 'المزمل',
        verses: 20,
        isRead: false,
        progress: 0,
      },
      {
        number: 74,
        name: 'Al-Muddathir',
        arabicName: 'المدثر',
        verses: 56,
        isRead: false,
        progress: 0,
      },
      {
        number: 75,
        name: 'Al-Qiyamah',
        arabicName: 'القيامة',
        verses: 40,
        isRead: false,
        progress: 0,
      },
      {
        number: 76,
        name: 'Al-Insan',
        arabicName: 'الإنسان',
        verses: 31,
        isRead: false,
        progress: 0,
      },
      {
        number: 77,
        name: 'Al-Mursalat',
        arabicName: 'المرسلات',
        verses: 50,
        isRead: false,
        progress: 0,
      },
      {
        number: 78,
        name: 'An-Naba',
        arabicName: 'النبأ',
        verses: 40,
        isRead: false,
        progress: 0,
      },
      {
        number: 79,
        name: "An-Nazi'at",
        arabicName: 'النازعات',
        verses: 46,
        isRead: false,
        progress: 0,
      },
      {
        number: 80,
        name: 'Abasa',
        arabicName: 'عبس',
        verses: 42,
        isRead: false,
        progress: 0,
      },
      {
        number: 81,
        name: 'At-Takwir',
        arabicName: 'التكوير',
        verses: 29,
        isRead: false,
        progress: 0,
      },
      {
        number: 82,
        name: 'Al-Infitar',
        arabicName: 'الانفطار',
        verses: 19,
        isRead: false,
        progress: 0,
      },
      {
        number: 83,
        name: 'Al-Mutaffifin',
        arabicName: 'المطففين',
        verses: 36,
        isRead: false,
        progress: 0,
      },
      {
        number: 84,
        name: 'Al-Inshiqaq',
        arabicName: 'الانشقاق',
        verses: 25,
        isRead: false,
        progress: 0,
      },
      {
        number: 85,
        name: 'Al-Buruj',
        arabicName: 'البروج',
        verses: 22,
        isRead: false,
        progress: 0,
      },
      {
        number: 86,
        name: 'At-Tariq',
        arabicName: 'الطارق',
        verses: 17,
        isRead: false,
        progress: 0,
      },
      {
        number: 87,
        name: "Al-A'la",
        arabicName: 'الأعلى',
        verses: 19,
        isRead: false,
        progress: 0,
      },
      {
        number: 88,
        name: 'Al-Ghashiyah',
        arabicName: 'الغاشية',
        verses: 26,
        isRead: false,
        progress: 0,
      },
      {
        number: 89,
        name: 'Al-Fajr',
        arabicName: 'الفجر',
        verses: 30,
        isRead: false,
        progress: 0,
      },
      {
        number: 90,
        name: 'Al-Balad',
        arabicName: 'البلد',
        verses: 20,
        isRead: false,
        progress: 0,
      },
      {
        number: 91,
        name: 'Ash-Shams',
        arabicName: 'الشمس',
        verses: 15,
        isRead: false,
        progress: 0,
      },
      {
        number: 92,
        name: 'Al-Layl',
        arabicName: 'الليل',
        verses: 21,
        isRead: false,
        progress: 0,
      },
      {
        number: 93,
        name: 'Ad-Duha',
        arabicName: 'الضحى',
        verses: 11,
        isRead: false,
        progress: 0,
      },
      {
        number: 94,
        name: 'Ash-Sharh',
        arabicName: 'الشرح',
        verses: 8,
        isRead: false,
        progress: 0,
      },
      {
        number: 95,
        name: 'At-Tin',
        arabicName: 'التين',
        verses: 8,
        isRead: false,
        progress: 0,
      },
      {
        number: 96,
        name: 'Al-Alaq',
        arabicName: 'العلق',

        verses: 19,
        isRead: false,
        progress: 0,
      },
      {
        number: 97,
        name: 'Al-Qadr',
        arabicName: 'القدر',
        verses: 5,
        isRead: false,
        progress: 0,
      },
      {
        number: 98,
        name: 'Al-Bayyinah',
        arabicName: 'البينة',
        verses: 8,
        isRead: false,
        progress: 0,
      },
      {
        number: 99,
        name: 'Az-Zalzalah',
        arabicName: 'الزلزلة',
        verses: 8,
        isRead: false,
        progress: 0,
      },
      {
        number: 100,
        name: 'Al-Adiyat',
        arabicName: 'العاديات',
        verses: 11,
        isRead: false,
        progress: 0,
      },
      {
        number: 101,
        name: "Al-Qari'ah",
        arabicName: 'القارعة',
        verses: 11,
        isRead: false,
        progress: 0,
      },
      {
        number: 102,
        name: 'At-Takathur',
        arabicName: 'التكاثر',
        verses: 8,
        isRead: false,
        progress: 0,
      },
      {
        number: 103,
        name: 'Al-Asr',
        arabicName: 'العصر',
        verses: 3,
        isRead: false,
        progress: 0,
      },
      {
        number: 104,
        name: 'Al-Humazah',
        arabicName: 'الهمزة',
        verses: 9,
        isRead: false,
        progress: 0,
      },
      {
        number: 105,
        name: 'Al-Fil',
        arabicName: 'الفيل',
        verses: 5,
        isRead: false,
        progress: 0,
      },
      {
        number: 106,
        name: 'Quraysh',
        arabicName: 'قريش',
        verses: 4,
        isRead: false,
        progress: 0,
      },
      {
        number: 107,
        name: "Al-Ma'un",
        arabicName: 'الماعون',
        verses: 7,
        isRead: false,
        progress: 0,
      },
      {
        number: 108,
        name: 'Al-Kawthar',
        arabicName: 'الكوثر',
        verses: 3,
        isRead: false,
        progress: 0,
      },
      {
        number: 109,
        name: 'Al-Kafirun',
        arabicName: 'الكافرون',
        verses: 6,
        isRead: false,
        progress: 0,
      },
      {
        number: 110,
        name: 'An-Nasr',
        arabicName: 'النصر',
        verses: 3,
        isRead: false,
        progress: 0,
      },
      {
        number: 111,
        name: 'Al-Masad',
        arabicName: 'المسد',
        verses: 5,
        isRead: false,
        progress: 0,
      },
      {
        number: 112,
        name: 'Al-Ikhlas',
        arabicName: 'الإخلاص',
        verses: 4,
        isRead: false,
        progress: 0,
      },
      {
        number: 113,
        name: 'Al-Falaq',
        arabicName: 'الفلق',
        verses: 5,
        isRead: false,
        progress: 0,
      },
      {
        number: 114,
        name: 'An-Nas',
        arabicName: 'الناس',
        verses: 6,
        isRead: false,
        progress: 0,
      },
    ];
    setSurahs(quranSurahs);
  }, []);

  const toggleRead = (surahNumber: number) => {
    toggleSurahRead(surahNumber);
  };

  const filteredAndSortedSurahs = useMemo(() => {
    let result = [...surahs];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.arabicName.includes(query) ||
          tSurahs(s.number.toString()).toLowerCase().includes(query),
      );
    }

    // Sort order
    if (sortOrder === 'desc') {
      result.reverse();
    }

    return result;
  }, [surahs, searchQuery, sortOrder, tSurahs]);

  const totalPages = Math.ceil(filteredAndSortedSurahs.length / itemsPerPage);
  const currentSurahs = filteredAndSortedSurahs.slice(
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
              {formatNumber(progressPercentage, locale)}%
            </span>
          </div>
          <Progress
            value={progressPercentage}
            className='h-3'
            color='purple-500'
          />
          <p className='text-xs text-center mt-2 text-gray-500'>
            {formatNumber(readVersesCount, locale)} /{' '}
            {formatNumber(totalVerses, locale)} {t('verses_read')}
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
          <Select
            value={sortOrder}
            onValueChange={(value: 'asc' | 'desc') => setSortOrder(value)}
          >
            <SelectTrigger className='w-full md:w-[180px]'>
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
          {currentSurahs.map((surah) => {
            const isRead = readSurahs.includes(surah.number);
            return (
              <motion.div
                key={surah.number}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: surah.number * 0.01 }}
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
                    {formatNumber(surah.number, locale)}
                  </div>
                  <div>
                    <h3 className='font-semibold text-gray-900 dark:text-gray-100'>
                      {tSurahs(surah.number.toString())}
                    </h3>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      {surah.arabicName} • {formatNumber(surah.verses, locale)}{' '}
                      {t('verses')}
                    </p>
                  </div>
                </div>

                <Button
                  variant={isRead ? 'default' : 'outline'}
                  size='sm'
                  onClick={() => toggleRead(surah.number)}
                  className={isRead ? 'bg-purple-600 hover:bg-purple-700' : ''}
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
                  <>
                    {i > 0 && arr[i - 1] !== p - 1 && (
                      <span key={`dots-${p}`} className='text-gray-400'>
                        ...
                      </span>
                    )}
                    <Button
                      key={p}
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
                  </>
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
