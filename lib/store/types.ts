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

export interface RamadanState {
  activities: DailyActivity[];
  stats: StatsType;
  currentDua: string;
  savedDuas: string[];
  initializeData: () => void;
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
}
