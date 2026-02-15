'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
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
  const { activities, updateQuranCount } = useRamadanStore();
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalVerses, setTotalVerses] = useState(0);
  const [readVerses, setReadVerses] = useState(0);
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

    // Calculate total verses in Quran
    const total = quranSurahs.reduce((sum, surah) => sum + surah.verses, 0);
    setTotalVerses(total);

    // Calculate read verses from user's activities
    const read = activities.reduce(
      (sum: number, day: DailyActivity) =>
        sum + (Number.parseInt(day.quran) || 0),
      0,
    );
    setReadVerses(read);

    // Update progress for each surah (simplified approach)
    let versesLeft = read;
    const updatedSurahs = quranSurahs.map((surah) => {
      if (versesLeft >= surah.verses) {
        // This surah is completely read
        versesLeft -= surah.verses;
        return { ...surah, isRead: true, progress: 100 };
      } else if (versesLeft > 0) {
        // This surah is partially read
        const progress = Math.round((versesLeft / surah.verses) * 100);
        versesLeft = 0;
        return { ...surah, isRead: false, progress };
      }
      // This surah is not read yet
      return surah;
    });

    setSurahs(updatedSurahs);
  }, [activities]);

  // Calculate total pages
  const totalPages = Math.ceil(surahs.length / itemsPerPage);

  // Get current page items
  const currentSurahs = surahs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const markSurahAsRead = (surahNumber: number) => {
    const surah = surahs.find((s) => s.number === surahNumber);
    if (surah) {
      // Calculate the verses to add (only the remaining unread verses)
      const remainingVerses =
        surah.verses - Math.floor((surah.progress / 100) * surah.verses);

      // Get the current day (or default to day 1)
      const today = new Date().getDate();
      const dayIndex = Math.min(today - 1, activities.length - 1);
      const day = activities[dayIndex >= 0 ? dayIndex : 0].day;

      // Get current Quran count for the day
      const currentCount =
        Number.parseInt(activities[dayIndex >= 0 ? dayIndex : 0].quran) || 0;

      // Update the day's record with the new total
      updateQuranCount(day, (currentCount + remainingVerses).toString());
    }
  };

  return (
    <div className='rtl'>
      <Card className='mb-6'>
        <CardContent className='pt-6'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            <div className='flex items-center gap-3'>
              <div className='w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center'>
                <BookOpen className='h-8 w-8 text-purple-600 dark:text-purple-400' />
              </div>
              <div>
                <h2 className='text-xl font-bold'>{t('title')}</h2>
                <p className='text-sm text-muted-foreground'>
                  {t('description')}
                </p>
              </div>
            </div>

            <div className='w-full md:w-1/2'>
              <div className='flex justify-between text-sm mb-1'>
                <span>
                  {t('read_verses')} {formatNumber(readVerses, locale)}
                </span>
                <span>
                  {t('total_verses')} {formatNumber(totalVerses, locale)}
                </span>
              </div>
              <Progress
                value={(readVerses / totalVerses) * 100}
                color='purple-500'
                className='h-3'
              />
              <p className='text-xs text-center mt-1 text-muted-foreground'>
                {formatNumber(
                  Math.round((readVerses / totalVerses) * 100),
                  locale,
                )}
                %{t('of_quran')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='grid grid-cols-1 gap-3'>
        {currentSurahs.map((surah) => (
          <motion.div
            key={surah.number}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: surah.number * 0.03 }}
          >
            <Card className={`${surah.isRead ? 'border-green-300' : ''}`}>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-sm font-bold'>
                      {formatNumber(surah.number, locale)}
                    </div>
                    <div>
                      <h3 className='font-bold'>
                        {tSurahs(`${surah.number}`)}
                      </h3>
                      <p className='text-xs text-muted-foreground'>
                        {formatNumber(surah.verses, locale)} {t('verse')}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center gap-3'>
                    <div className='w-24'>
                      <Progress
                        value={surah.progress}
                        color='purple-500'
                        className='h-2'
                      />
                      <p className='text-xs text-center mt-1'>
                        {formatNumber(surah.progress, locale)}%
                      </p>
                    </div>

                    {surah.isRead ? (
                      <CheckCircle className='h-6 w-6 text-green-500' />
                    ) : (
                      <Button
                        variant='outline'
                        size='sm'
                        className='text-xs'
                        onClick={() => markSurahAsRead(surah.number)}
                      >
                        {t('mark_read')}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex justify-center items-center gap-2 p-4 mt-4'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronRight className='h-4 w-4' />
          </Button>

          <span className='mx-2'>
            {t('page_info', {
              current: formatNumber(currentPage, locale),
              total: formatNumber(totalPages, locale),
            })}
          </span>

          <Button
            variant='outline'
            size='sm'
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronLeft className='h-4 w-4' />
          </Button>
        </div>
      )}
    </div>
  );
}
