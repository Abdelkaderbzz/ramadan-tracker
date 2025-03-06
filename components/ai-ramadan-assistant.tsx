"use client"

import { useState } from "react"
import { Bot, Send, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { useRamadanStore } from "@/lib/store"
import SuggestedQuestions from "./ai-suggested-questions"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function AIRamadanAssistant() {
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

  return (
    <div className="rtl">
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
        <Button onClick={handleSend} disabled={isLoading} size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>

      {messages.length < 3 && <SuggestedQuestions onSelectQuestion={(question) => setInput(question)} />}
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
  if (q.includes("قرآن") || q.includes("تلاوة") || q.includes("سورة")) {
    const quranPages = activities.reduce((sum, day) => sum + (Number.parseInt(day.quran) || 0), 0)
    const quranProgress = stats.quran || 0
    return `قراءة القرآن من أفضل العبادات في رمضان. لقد قرأت حوالي ${quranPages} آية وأكملت ${quranProgress}% من هدفك في قراءة القرآن. استمر في القراءة اليومية واجعل لك ورداً ثابتاً.`
  }

  // Check for dua related questions
  if (q.includes("دعاء") || q.includes("أدعية") || q.includes("ذكر")) {
    return "من الأدعية المستحبة في رمضان: 'اللهم إنك عفو تحب العفو فاعف عني'، و'اللهم إني أسألك الجنة وأعوذ بك من النار'. يمكنك إضافة أدعيتك المفضلة في قسم 'دعاء اليوم'."
  }

  // Check for general Ramadan questions
  if (q.includes("رمضان") || q.includes("فضل") || q.includes("شهر")) {
    return "رمضان هو شهر الرحمة والمغفرة والعتق من النار. فيه ليلة القدر التي هي خير من ألف شهر. اغتنم هذا الشهر الكريم بالعبادة والذكر وقراءة القرآن وفعل الخيرات."
  }

  // Check for progress related questions
  if (q.includes("تقدم") || q.includes("إنجاز") || q.includes("تطور")) {
    const overallProgress = stats.overall || 0
    return `أداؤك العام في رمضان هو ${overallProgress}%. استمر في العمل الصالح وزيادة العبادات. كل خطوة صغيرة تقربك إلى الله تعالى.`
  }

  // Check for health related questions
  if (q.includes("صحة") || q.includes("ماء") || q.includes("تغذية")) {
    return "من المهم الاهتمام بصحتك خلال رمضان. احرص على شرب كمية كافية من الماء بين الإفطار والسحور، وتناول وجبات متوازنة تحتوي على البروتينات والفواكه والخضروات."
  }

  // Check for adhkar related questions
  if (q.includes("أذكار") || q.includes("ذكر") || q.includes("تسبيح")) {
    const morningDhikrDays = activities.filter((day) => day.dhikrMorning !== "0" && day.dhikrMorning !== "").length
    const eveningDhikrDays = activities.filter((day) => day.dhikrEvening !== "0" && day.dhikrEvening !== "").length
    return `الأذكار من أفضل العبادات. لقد قمت بأذكار الصباح ${morningDhikrDays} يوماً وأذكار المساء ${eveningDhikrDays} يوماً. استمر في المحافظة على الأذكار اليومية، فهي حصن للمؤمن.`
  }

  // Check for qibla related questions
  if (q.includes("قبلة") || q.includes("اتجاه") || q.includes("مكة")) {
    return "يمكنك استخدام محدد القبلة في قسم 'أدوات' لمعرفة اتجاه القبلة من موقعك الحالي. اتجاه القبلة هو اتجاه الكعبة المشرفة في مكة المكرمة."
  }

  // Check for achievement related questions
  if (q.includes("إنجاز") || q.includes("شارة") || q.includes("جائزة")) {
    return "يمكنك الحصول على شارات الإنجاز عند تحقيق أهداف معينة مثل قراءة أجزاء من القرآن أو المواظبة على الصلاة. تفقد قسم 'الإنجازات' لمعرفة تقدمك في كل شارة."
  }

  // Check for help with the app
  if (q.includes("استخدام") || q.includes("تطبيق") || q.includes("مساعدة")) {
    return "هذا التطبيق يساعدك على تتبع عباداتك خلال شهر رمضان. يمكنك تسجيل صلواتك وقراءتك للقرآن والأذكار والأعمال الصالحة. استخدم الجدول في الصفحة الرئيسية لتحديث أنشطتك اليومية."
  }

  // Check for last 10 days of Ramadan
  if (q.includes("العشر الأواخر") || q.includes("ليلة القدر")) {
    return "العشر الأواخر من رمضان هي أفضل أيام الشهر، وفيها ليلة القدر التي هي خير من ألف شهر. يُستحب فيها الاعتكاف وإحياء الليل بالصلاة والدعاء وقراءة القرآن. تحرى ليلة القدر في الليالي الوتر من العشر الأواخر (21، 23، 25، 27، 29)."
  }

  // Default response if no specific match
  return "شكراً على سؤالك. رمضان فرصة عظيمة للتقرب إلى الله بالعبادات المختلفة. هل هناك جانب معين من العبادة ترغب في معرفة المزيد عنه؟"
}

