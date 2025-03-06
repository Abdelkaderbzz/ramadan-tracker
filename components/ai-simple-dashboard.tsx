"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Bot, Send, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { useRamadanStore } from "@/lib/store"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function AISimpleDashboard() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "مرحباً! أنا مساعدك الرمضاني. كيف يمكنني مساعدتك في رحلتك الروحانية خلال شهر رمضان المبارك؟",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { stats, activities } = useRamadanStore()

  const handleSend = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response with predefined answers based on keywords
    setTimeout(() => {
      const response = generateResponse(input, stats, activities)
      setMessages((prev) => [...prev, { role: "assistant", content: response }])
      setIsLoading(false)
    }, 1000)
  }

  // Suggested questions
  const suggestedQuestions = [
    "كيف أحافظ على صلواتي في رمضان؟",
    "ما هي أفضل الأدعية في رمضان؟",
    "كيف أختم القرآن في رمضان؟",
    "ما هي فضائل الصيام؟",
    "كيف أحافظ على صحتي في رمضان؟",
    "ما هي أفضل الأعمال في العشر الأواخر؟",
  ]

  return (
    <div className="rtl">
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between pb-2 bg-purple-600 text-white rounded-t-lg">
          <CardTitle className="text-xl font-bold">المساعد الذكي الرمضاني</CardTitle>
          <Bot className="h-6 w-6 text-white" />
        </CardHeader>
        <CardContent className="p-4">
          <div className="h-[400px] overflow-y-auto mb-4 p-2 border rounded-lg bg-background">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex mb-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`px-3 py-2 rounded-lg max-w-[80%] ${
                      message.role === "user" ? "bg-purple-500 text-white" : "bg-gray-100 dark:bg-gray-800"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                      <span className="text-xs font-medium">{message.role === "assistant" ? "المساعد" : "أنت"}</span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start mb-3">
                  <div className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4" />
                      <div className="flex gap-1">
                        <span className="animate-bounce">.</span>
                        <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
                          .
                        </span>
                        <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
                          .
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اكتب سؤالك هنا..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="rtl"
            />
            <Button onClick={handleSend} disabled={isLoading} className="bg-purple-600 hover:bg-purple-700">
              <Send className="h-4 w-4 ml-2" />
              إرسال
            </Button>
          </div>

          {messages.length < 3 && (
            <div className="mt-4">
              <p className="text-xs text-muted-foreground mb-2">أسئلة مقترحة:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
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
                      onClick={() => {
                        setInput(question)
                        setTimeout(() => handleSend(), 100)
                      }}
                    >
                      {question}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function generateResponse(query: string, stats: any, activities: any): string {
  // Convert query to lowercase for easier matching
  const q = query.toLowerCase()

  // Check for prayer times related questions
  if (q.includes("صلاة") || q.includes("الصلوات") || q.includes("مواقيت")) {
    return "يمكنك الاطلاع على مواقيت الصلاة في قسم 'مواقيت الصلاة'. تأكد من أداء الصلوات في وقتها، فهي من أهم العبادات في رمضان وغيره."
  }

  // Check for fasting related questions
  if (q.includes("صيام") || q.includes("إفطار") || q.includes("سحور")) {
    return "الصيام هو ركن من أركان الإسلام ويكون من الفجر حتى المغرب. يُنصح بتناول وجبة السحور قبل الفجر لأنها تساعد على تحمل الصيام خلال النهار. عند الإفطار، يُستحب البدء بالتمر والماء."
  }

  // Check for Quran related questions
  if (q.includes("قرآن") || q.includes("تلاوة") || q.includes("سورة") || q.includes("ختم")) {
    const quranPages = activities.reduce((sum, day) => sum + (Number.parseInt(day.quran) || 0), 0)
    const quranProgress = stats.quran || 0
    return `قراءة القرآن من أفضل العبادات في رمضان. لقد قرأت حوالي ${quranPages} آية وأكملت ${quranProgress}% من هدفك في قراءة القرآن. لختم القرآن في رمضان، يمكنك قراءة حوالي 20 صفحة يومياً (حوالي جزء واحد). استمر في القراءة اليومية واجعل لك ورداً ثابتاً.`
  }

  // Check for dua related questions
  if (q.includes("دعاء") || q.includes("أدعية")) {
    return "من الأدعية المستحبة في رمضان: 'اللهم إنك عفو تحب العفو فاعف عني'، و'اللهم إني أسألك الجنة وأعوذ بك من النار'. أفضل أوقات الدعاء هي: عند الإفطار، في الثلث الأخير من الليل، بين الأذان والإقامة، وفي السجود. يمكنك إضافة أدعيتك المفضلة في قسم 'دعاء اليوم'."
  }

  // Check for general Ramadan questions
  if (q.includes("رمضان") || q.includes("فضل") || q.includes("شهر")) {
    return "رمضان هو شهر الرحمة والمغفرة والعتق من النار. فيه ليلة القدر التي هي خير من ألف شهر. من فضائل رمضان: مضاعفة الأجر، فتح أبواب الجنة وغلق أبواب النار، تصفيد الشياطين، ومغفرة الذنوب. اغتنم هذا الشهر الكريم بالعبادة والذكر وقراءة القرآن وفعل الخيرات."
  }

  // Default response if no specific match
  return "شكراً على سؤالك. رمضان فرصة عظيمة للتقرب إلى الله بالعبادات المختلفة. هل هناك جانب معين من العبادة ترغب في معرفة المزيد عنه؟"
}

