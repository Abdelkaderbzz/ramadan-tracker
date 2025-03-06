"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { frenchNumerals } from "@/lib/arabic-numerals"

type IslamicDate = {
  day: number
  month: string
  year: number
  gregorian: string
  isToday: boolean
  isSpecialDay: boolean
  specialDayName?: string
}

export default function IslamicCalendar() {
  const [currentMonth, setCurrentMonth] = useState<number>(0) // 0-based month (0 = Muharram)
  const [currentYear, setCurrentYear] = useState<number>(1445) // Current Hijri year
  const [calendarDays, setCalendarDays] = useState<IslamicDate[]>([])

  const islamicMonths = [
    "محرم",
    "صفر",
    "ربيع الأول",
    "ربيع الثاني",
    "جمادى الأولى",
    "جمادى الآخرة",
    "رجب",
    "شعبان",
    "رمضان",
    "شوال",
    "ذو القعدة",
    "ذو الحجة",
  ]

  // Special Islamic days
  const specialDays = [
    { month: 8, day: 1, name: "بداية رمضان" }, // Ramadan 1
    { month: 8, day: 27, name: "ليلة القدر (المحتملة)" }, // Laylat al-Qadr (estimated)
    { month: 9, day: 1, name: "عيد الفطر" }, // Eid al-Fitr
    { month: 11, day: 10, name: "عيد الأضحى" }, // Eid al-Adha
    { month: 0, day: 10, name: "يوم عاشوراء" }, // Ashura
    { month: 2, day: 12, name: "المولد النبوي" }, // Mawlid al-Nabi
    { month: 6, day: 27, name: "ليلة الإسراء والمعراج" }, // Isra and Mi'raj
    { month: 7, day: 15, name: "ليلة النصف من شعبان" }, // Mid-Sha'ban
  ]

  // Generate calendar days for the current month
  useEffect(() => {
    const days: IslamicDate[] = []
    const daysInMonth = 30 // Simplified - actual Islamic months vary between 29-30 days

    // Get current Hijri date
    const today = new Date()
    const options: Intl.DateTimeFormatOptions = {
      calendar: "islamic",
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }

    let currentHijriDate
    try {
      const hijriDateStr = new Intl.DateTimeFormat("ar-SA-u-ca-islamic", options).format(today)
      const parts = hijriDateStr.split("/")
      currentHijriDate = {
        day: Number.parseInt(parts[0]),
        month: Number.parseInt(parts[1]) - 1, // 0-based
        year: Number.parseInt(parts[2]),
      }
    } catch (error) {
      // Fallback if Islamic calendar not supported
      currentHijriDate = { day: 15, month: 8, year: 1445 } // Ramadan 15, 1445
    }

    for (let i = 1; i <= daysInMonth; i++) {
      // Check if this is a special day
      const isSpecialDay = specialDays.some((d) => d.month === currentMonth && d.day === i)
      const specialDay = specialDays.find((d) => d.month === currentMonth && d.day === i)

      days.push({
        day: i,
        month: islamicMonths[currentMonth],
        year: currentYear,
        gregorian: "", // Would need conversion logic
        isToday:
          currentHijriDate.day === i &&
          currentHijriDate.month === currentMonth &&
          currentHijriDate.year === currentYear,
        isSpecialDay,
        specialDayName: specialDay?.name,
      })
    }

    setCalendarDays(days)
  }, [currentMonth, currentYear])

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  return (
    <Card className="rtl">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">التقويم الإسلامي</CardTitle>
        <CalendarIcon className="h-5 w-5 text-purple-500" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>

          <h3 className="text-lg font-bold">
            {islamicMonths[currentMonth]} {frenchNumerals(currentYear)}هـ
          </h3>

          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"].map((day, i) => (
            <div key={i} className="text-xs font-medium text-muted-foreground py-1">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {/* Add empty cells for proper day alignment (simplified) */}
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={`empty-${i}`} className="h-10"></div>
          ))}

          {calendarDays.map((date, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`h-10 flex flex-col items-center justify-center rounded-md text-sm ${
                date.isToday
                  ? "bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 font-bold"
                  : date.isSpecialDay
                    ? "bg-amber-50 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <span>{frenchNumerals(date.day)}</span>
              {date.isSpecialDay && (
                <span className="text-[8px] leading-tight text-amber-600 dark:text-amber-400">
                  {date.specialDayName}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

