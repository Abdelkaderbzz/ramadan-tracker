import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DailyActivity, RamadanState, StatsType } from './types';

const DEFAULT_STATS: StatsType = {
  quran: 0,
  prayers: 0,
  dhikr: 0,
  goodDeeds: 0,
  overall: 0,
};

const createInitialActivity = (day: number): DailyActivity => ({
  day,
  fasting: false,
  qiyam: false,
  duha: false,
  rawatib: false,
  quran: '0',
  dhikrMorning: '0',
  dhikrEvening: '0',
  charity: false,
  familyVisit: false,
  happiness: false,
  feeding: false,
});

export const useRamadanStore = create<RamadanState>()(
  persist(
    (set, get) => ({
      activities: [],
      stats: DEFAULT_STATS,
      currentDua: '',
      savedDuas: [],
      readSurahs: [],
      goals: [],
      journalEntries: {},

      initializeData: () => {
        const { activities } = get();

        if (activities.length === 0) {
          const initialActivities: DailyActivity[] = Array.from(
            { length: 30 },
            (_, i) => createInitialActivity(i + 1),
          );
          set({ activities: initialActivities });
        }
      },

      updateActivity: (day, field, value) => {
        set((state) => ({
          activities: state.activities.map((activity) =>
            activity.day === day ? { ...activity, [field]: value } : activity,
          ),
        }));
        get().calculateStats();
      },

      updateQuranCount: (day, value) => {
        set((state) => ({
          activities: state.activities.map((activity) =>
            activity.day === day ? { ...activity, quran: value } : activity,
          ),
        }));
        get().calculateStats();
      },

      updateDhikr: (day, field, value) => {
        set((state) => ({
          activities: state.activities.map((activity) =>
            activity.day === day ? { ...activity, [field]: value } : activity,
          ),
        }));
        get().calculateStats();
      },

      updateCurrentDua: (dua) => {
        set({ currentDua: dua });
      },

      addDua: (dua) => {
        if (dua.trim() === '') return;
        set((state) => ({
          savedDuas: [...state.savedDuas, dua],
        }));
      },

      removeDua: (index) => {
        set((state) => ({
          savedDuas: state.savedDuas.filter((_, i) => i !== index),
        }));
      },

      toggleSurahRead: (surahNumber) => {
        set((state) => {
          const isRead = state.readSurahs.includes(surahNumber);
          return {
            readSurahs: isRead
              ? state.readSurahs.filter((id) => id !== surahNumber)
              : [...state.readSurahs, surahNumber],
          };
        });
      },

      addGoal: (text, category) => {
        const newGoal = {
          id: Math.random().toString(36).substring(2, 9),
          text,
          category,
          completed: false,
        };
        set((state) => ({
          goals: [...state.goals, newGoal],
        }));
      },

      toggleGoal: (id) => {
        set((state) => ({
          goals: state.goals.map((goal) =>
            goal.id === id ? { ...goal, completed: !goal.completed } : goal,
          ),
        }));
      },

      removeGoal: (id) => {
        set((state) => ({
          goals: state.goals.filter((goal) => goal.id !== id),
        }));
      },

      updateJournalEntry: (day, entry) => {
        set((state) => ({
          journalEntries: {
            ...state.journalEntries,
            [day]: {
              ...(state.journalEntries[day] || {
                day,
                achievements: '',
                memories: '',
                mood: '',
              }),
              ...entry,
            },
          },
        }));
      },

      calculateStats: () => {
        const { activities } = get();

        // Quran progress (target: 6236 verses = full Quran)
        const totalQuranVerses = activities.reduce(
          (sum, day) => sum + (Number.parseInt(day.quran) || 0),
          0,
        );
        const quranPercentage = Math.min(
          Math.round((totalQuranVerses / 6236) * 100),
          100,
        );

        // Prayer progress (4 types × 30 days = 120 checks)
        const prayerFields: (keyof DailyActivity)[] = [
          'fasting',
          'qiyam',
          'duha',
          'rawatib',
        ];
        const totalPrayerChecks = activities.reduce(
          (sum, day) =>
            sum + prayerFields.filter((field) => day[field] === true).length,
          0,
        );
        const prayerPercentage = Math.min(
          Math.round((totalPrayerChecks / 120) * 100),
          100,
        );

        // Dhikr progress (2 sessions × 30 days = 60)
        const morningDhikrDays = activities.filter(
          (day) => day.dhikrMorning !== '0' && day.dhikrMorning !== '',
        ).length;
        const eveningDhikrDays = activities.filter(
          (day) => day.dhikrEvening !== '0' && day.dhikrEvening !== '',
        ).length;
        const dhikrPercentage = Math.min(
          Math.round(((morningDhikrDays + eveningDhikrDays) / 60) * 100),
          100,
        );

        // Good deeds progress (4 types × 30 days = 120)
        const goodDeedFields: (keyof DailyActivity)[] = [
          'charity',
          'familyVisit',
          'happiness',
          'feeding',
        ];
        const totalGoodDeedChecks = activities.reduce(
          (sum, day) =>
            sum + goodDeedFields.filter((field) => day[field] === true).length,
          0,
        );
        const goodDeedsPercentage = Math.min(
          Math.round((totalGoodDeedChecks / 120) * 100),
          100,
        );

        // Overall average
        const overallPercentage = Math.round(
          (quranPercentage +
            prayerPercentage +
            dhikrPercentage +
            goodDeedsPercentage) /
            4,
        );

        set({
          stats: {
            quran: quranPercentage,
            prayers: prayerPercentage,
            dhikr: dhikrPercentage,
            goodDeeds: goodDeedsPercentage,
            overall: overallPercentage,
          },
        });
      },
    }),
    {
      name: 'ramadan-tracker-storage',
    },
  ),
);

// Re-export types
export type { DailyActivity, StatsType, RamadanState } from './types';
