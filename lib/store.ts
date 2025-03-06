import { create } from "zustand"
import { persist } from "zustand/middleware"

export type DailyActivity = {
  day: number
  fasting: boolean
  qiyam: boolean
  duha: boolean
  rawatib: boolean
  quran: string
  dhikrMorning: string
  dhikrEvening: string
  charity: boolean
  familyVisit: boolean
  happiness: boolean
  feeding: boolean
}

export type StatsType = {
  quran: number
  prayers: number
  dhikr: number
  goodDeeds: number
  overall: number
}

interface RamadanState {
  activities: DailyActivity[]
  stats: StatsType
  waterGlasses: number
  waterGoal: number
  currentDua: string
  savedDuas: string[]
  initializeData: () => void
  updateActivity: (day: number, field: keyof DailyActivity, value: any) => void
  updateQuranCount: (day: number, value: string) => void
  updateDhikr: (day: number, field: "dhikrMorning" | "dhikrEvening", value: string) => void
  updateWaterCount: (count: number) => void
  updateCurrentDua: (dua: string) => void
  addDua: (dua: string) => void
  removeDua: (index: number) => void
  calculateStats: () => void
}

export const useRamadanStore = create<RamadanState>()(
  persist(
    (set, get) => ({
      activities: [],
      stats: {
        quran: 0,
        prayers: 0,
        dhikr: 0,
        goodDeeds: 0,
        overall: 0,
      },
      waterGlasses: 0,
      waterGoal: 8,
      currentDua: "",
      savedDuas: [],

      initializeData: () => {
        const { activities } = get()

        // Only initialize if no data exists
        if (activities.length === 0) {
          const initialActivities: DailyActivity[] = []

          // Create 30 days of Ramadan
          for (let i = 1; i <= 30; i++) {
            initialActivities.push({
              day: i,
              fasting: false,
              qiyam: false,
              duha: false,
              rawatib: false,
              quran: "0",
              dhikrMorning: "0",
              dhikrEvening: "0",
              charity: false,
              familyVisit: false,
              happiness: false,
              feeding: false,
            })
          }

          set({ activities: initialActivities })
        }
      },

      updateActivity: (day, field, value) => {
        set((state) => {
          const updatedActivities = state.activities.map((activity) =>
            activity.day === day ? { ...activity, [field]: value } : activity,
          )

          return { activities: updatedActivities }
        })

        // Recalculate stats after update
        get().calculateStats()
      },

      updateQuranCount: (day, value) => {
        set((state) => {
          const updatedActivities = state.activities.map((activity) =>
            activity.day === day ? { ...activity, quran: value } : activity,
          )

          return { activities: updatedActivities }
        })

        // Recalculate stats after update
        get().calculateStats()
      },

      updateDhikr: (day, field, value) => {
        set((state) => {
          const updatedActivities = state.activities.map((activity) =>
            activity.day === day ? { ...activity, [field]: value } : activity,
          )

          return { activities: updatedActivities }
        })

        // Recalculate stats after update
        get().calculateStats()
      },

      updateWaterCount: (count) => {
        set({ waterGlasses: count })
      },

      updateCurrentDua: (dua) => {
        set({ currentDua: dua })
      },

      addDua: (dua) => {
        if (dua.trim() === "") return

        set((state) => ({
          savedDuas: [...state.savedDuas, dua],
        }))
      },

      removeDua: (index) => {
        set((state) => ({
          savedDuas: state.savedDuas.filter((_, i) => i !== index),
        }))
      },

      calculateStats: () => {
        const { activities } = get()

        // Calculate Quran progress (based on verses read)
        const totalQuranVerses = activities.reduce((sum, day) => {
          return sum + (Number.parseInt(day.quran) || 0)
        }, 0)
        // Target: ~20 pages per day (400 verses) for 30 days = 12000 verses total
        const quranPercentage = Math.min(Math.round((totalQuranVerses / 6236) * 100), 100)

        // Calculate Prayer progress
        const prayerFields = ["fasting", "qiyam", "duha", "rawatib"]
        const totalPrayerChecks = activities.reduce((sum, day) => {
          return sum + prayerFields.filter((field) => day[field as keyof DailyActivity] === true).length
        }, 0)
        // Target: 4 prayer types for 30 days = 120 total checks
        const prayerPercentage = Math.min(Math.round((totalPrayerChecks / 120) * 100), 100)

        // Calculate Dhikr progress - count days with any dhikr
        const hasDhikrMorning = activities.filter((day) => day.dhikrMorning !== "0" && day.dhikrMorning !== "").length
        const hasDhikrEvening = activities.filter((day) => day.dhikrEvening !== "0" && day.dhikrEvening !== "").length
        // Target: 2 dhikr sessions for 30 days = 60 total
        const dhikrPercentage = Math.min(Math.round(((hasDhikrMorning + hasDhikrEvening) / 60) * 100), 100)

        // Calculate Good Deeds progress
        const goodDeedFields = ["charity", "familyVisit", "happiness", "feeding"]
        const totalGoodDeedChecks = activities.reduce((sum, day) => {
          return sum + goodDeedFields.filter((field) => day[field as keyof DailyActivity] === true).length
        }, 0)
        // Target: 4 good deed types for 30 days = 120 total checks
        const goodDeedsPercentage = Math.min(Math.round((totalGoodDeedChecks / 120) * 100), 100)

        // Calculate overall progress (average of all categories)
        const overallPercentage = Math.round(
          (quranPercentage + prayerPercentage + dhikrPercentage + goodDeedsPercentage) / 4,
        )

        set({
          stats: {
            quran: quranPercentage,
            prayers: prayerPercentage,
            dhikr: dhikrPercentage,
            goodDeeds: goodDeedsPercentage,
            overall: overallPercentage,
          },
        })
      },
    }),
    {
      name: "ramadan-tracker-storage",
    },
  ),
)

