"use client"

import { BookOpen, Clock, AlignJustify, Heart, Award } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useRamadanStore } from "@/lib/store"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function WorshipStats() {
  const { stats } = useRamadanStore()
  const [animatedStats, setAnimatedStats] = useState({
    quran: 0,
    prayers: 0,
    dhikr: 0,
    goodDeeds: 0,
    overall: 0,
  })

  // Animate stats when they change
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats(stats)
    }, 200)

    return () => clearTimeout(timer)
  }, [stats])

  const statsConfig = [
    {
      name: "القرآن",
      icon: <BookOpen className="h-5 w-5 text-emerald-600" />,
      color: "emerald-500",
      textColor: "text-emerald-500",
      value: animatedStats.quran,
      actualValue: stats.quran,
    },
    {
      name: "الصلاة",
      icon: <Clock className="h-5 w-5 text-blue-600" />,
      color: "blue-500",
      textColor: "text-blue-500",
      value: animatedStats.prayers,
      actualValue: stats.prayers,
    },
    {
      name: "الاذكار",
      icon: <AlignJustify className="h-5 w-5 text-orange-600" />,
      color: "orange-500",
      textColor: "text-orange-500",
      value: animatedStats.dhikr,
      actualValue: stats.dhikr,
    },
    {
      name: "أعمال صالحة",
      icon: <Heart className="h-5 w-5 text-rose-600" />,
      color: "rose-500",
      textColor: "text-rose-500",
      value: animatedStats.goodDeeds,
      actualValue: stats.goodDeeds,
    },
    {
      name: "التقييم الكلي",
      icon: <Award className="h-5 w-5 text-purple-600" />,
      color: "purple-500",
      textColor: "text-purple-500",
      value: animatedStats.overall,
      actualValue: stats.overall,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
      {statsConfig.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-4 flex flex-col items-center rtl hover:shadow-md transition-all duration-300 border-2 hover:border-purple-200">
            <div className="flex justify-between w-full mb-2">
              <span className="text-sm font-medium rtl">{stat.name}</span>
              <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                {stat.icon}
              </motion.div>
            </div>

            <Progress value={stat.value} color={stat.color} className="h-3 mb-3" />

            <div className="flex items-center mt-2">
              <motion.span
                key={stat.actualValue}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`text-xl font-bold ${stat.textColor}`}
              >
                {stat.value}%
              </motion.span>
              {stat.value < stat.actualValue && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-green-500 text-xs mr-2"
                >
                  ↑
                </motion.span>
              )}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

