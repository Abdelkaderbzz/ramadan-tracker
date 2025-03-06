"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Droplets, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRamadanStore } from "@/lib/store"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"

export default function WaterTracker() {
  const { waterGlasses, waterGoal, updateWaterCount } = useRamadanStore()

  const addGlass = () => {
    if (waterGlasses < waterGoal) {
      updateWaterCount(waterGlasses + 1)
    }
  }

  const removeGlass = () => {
    if (waterGlasses > 0) {
      updateWaterCount(waterGlasses - 1)
    }
  }

  // Calculate percentage for water progress
  const percentage = Math.min((waterGlasses / waterGoal) * 100, 100)

  return (
    <Card className="rtl">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">متابعة شرب الماء</CardTitle>
        <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}>
          <Droplets className="h-5 w-5 text-blue-500" />
        </motion.div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">تتبع كمية الماء النقية خلال اليوم</p>

        <div className="mt-6 flex flex-col items-center">
          <div className="w-full mb-4">
            <Progress value={percentage} color="blue-500" className="h-4" />
            <div className="flex justify-between mt-1 text-sm">
              <span>0</span>
              <span>{waterGoal}</span>
            </div>
          </div>

          <motion.div
            key={waterGlasses}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-2xl font-bold text-blue-600 mb-4"
          >
            {waterGlasses}/{waterGoal}
          </motion.div>

          <div className="flex items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                size="icon"
                variant="outline"
                onClick={removeGlass}
                className="h-10 w-10 rounded-full border-2 border-blue-200"
              >
                <Minus className="h-5 w-5" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                size="icon"
                variant="outline"
                onClick={addGlass}
                className="h-10 w-10 rounded-full border-2 border-blue-200"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

