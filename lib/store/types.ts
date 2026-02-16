// Store types
export interface DailyActivity {
  day: number;
  fasting: boolean;
  qiyam: boolean;
  duha: boolean;
  rawatib: boolean;
  quran: string;
  dhikrMorning: string;
  dhikrEvening: string;
  charity: boolean;
  familyVisit: boolean;
  happiness: boolean;
  feeding: boolean;
}

export interface StatsType {
  quran: number;
  prayers: number;
  dhikr: number;
  goodDeeds: number;
  overall: number;
}

export interface RamadanGoal {
  id: string;
  text: string;
  completed: boolean;
  category: 'quran' | 'prayer' | 'charity' | 'personal' | 'other';
}

export interface JournalEntry {
  day: number;
  achievements: string;
  memories: string;
  mood: string;
}

export interface RamadanState {
  activities: DailyActivity[];
  stats: StatsType;
  currentDua: string;
  savedDuas: string[];
  readSurahs: number[];
  goals: RamadanGoal[];
  journalEntries: Record<number, JournalEntry>;
  initializeData: () => void;
  toggleSurahRead: (surahNumber: number) => void;
  updateActivity: (
    day: number,
    field: keyof DailyActivity,
    value: boolean | string,
  ) => void;
  updateQuranCount: (day: number, value: string) => void;
  updateDhikr: (
    day: number,
    field: 'dhikrMorning' | 'dhikrEvening',
    value: string,
  ) => void;
  updateCurrentDua: (dua: string) => void;
  addDua: (dua: string) => void;
  removeDua: (index: number) => void;
  calculateStats: () => void;
  // Goals actions
  addGoal: (text: string, category: RamadanGoal['category']) => void;
  toggleGoal: (id: string) => void;
  removeGoal: (id: string) => void;
  // Journal actions
  updateJournalEntry: (day: number, entry: Partial<JournalEntry>) => void;
}
