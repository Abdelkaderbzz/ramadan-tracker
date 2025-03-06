"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface SuggestedQuestionsProps {
  onSelectQuestion: (question: string) => void
}

export default function SuggestedQuestions({ onSelectQuestion }: SuggestedQuestionsProps) {
  const questions = [
    "كيف أحافظ على صلواتي في رمضان؟",
    "ما هي أفضل الأدعية في رمضان؟",
    "كيف أختم القرآن في رمضان؟",
    "ما هي فضائل الصيام؟",
    "كيف أحافظ على صحتي في رمضان؟",
    "ما هي أفضل الأعمال في العشر الأواخر؟",
  ]

  return (
    <div className="mt-4">
      <p className="text-xs text-muted-foreground mb-2">أسئلة مقترحة:</p>
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <Button
              variant="outline"
              size="sm"
              className="text-xs bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-800/30"
              onClick={() => onSelectQuestion(question)}
            >
              {question}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

