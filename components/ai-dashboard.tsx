"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Bot, BookOpen, Calendar, MessageCircle, Sparkles, Star, Send, User, Lightbulb } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useRamadanStore } from "@/lib/store"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Message = {
  role: "user" | "assistant"
  content: string
}

export default function AIDashboard() {
  const [activeTab, setActiveTab] = useState("chat")
  const { stats, activities } = useRamadanStore()
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "مرحباً! أنا مساعدك الرمضاني. كيف يمكنني مساعدتك في رحلتك الروحانية خلال شهر رمضان المبارك؟",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Calculate some statistics for insights
  const totalQuranVerses = activities.reduce((sum, day) => sum + (Number.parseInt(day.quran) || 0), 0)
  const fastingDays = activities.filter((day) => day.fasting).length
  const qiyamDays = activities.filter((day) => day.qiyam).length
  const duhaDays = activities.filter((day) => day.duha).length
  const rawatibDays = activities.filter((day) => day.rawatib).length
  const morningDhikrDays = activities.filter((day) => day.dhikrMorning !== "0" && day.dhikrMorning !== "").length
  const eveningDhikrDays = activities.filter((day) => day.dhikrEvening !== "0" && day.dhikrEvening !== "").length
  const charityDays = activities.filter((day) => day.charity).length
  const familyVisitDays = activities.filter((day) => day.familyVisit).length
  const happinessDays = activities.filter((day) => day.happiness).length
  const feedingDays = activities.filter((day) => day.feeding).length

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

  // Generate personalized insights
  const generateInsights = () => {
    const insights = []

    // Quran insights
    if (totalQuranVerses > 0) {
      insights.push({
        title: "قراءة القرآن",
        description: `لقد قرأت ${totalQuranVerses} آية من القرآن الكريم. استمر في القراءة اليومية للوصول إلى ختم القرآن.`,
        icon: <BookOpen className="h-5 w-5 text-emerald-500" />,
      })
    } else {
      insights.push({
        title: "قراءة القرآن",
        description: "لم تبدأ بعد في قراءة القرآن. حاول أن تقرأ ولو صفحة واحدة يومياً.",
        icon: <BookOpen className="h-5 w-5 text-emerald-500" />,
      })
    }

    // Prayer insights
    if (fastingDays > 0 || qiyamDays > 0 || duhaDays > 0 || rawatibDays > 0) {
      insights.push({
        title: "الصلاة والقيام",
        description: `أحسنت! لقد صمت ${fastingDays} يوماً، وقمت بصلاة القيام ${qiyamDays} ليلة، وصلاة الضحى ${duhaDays} يوماً، والسنن الرواتب ${rawatibDays} يوماً.`,
        icon: <Star className="h-5 w-5 text-amber-500" />,
      })
    } else {
      insights.push({
        title: "الصلاة والقيام",
        description: "حاول المحافظة على الصلوات والسنن الرواتب وصلاة الضحى وقيام الليل.",
        icon: <Star className="h-5 w-5 text-amber-500" />,
      })
    }

    // Dhikr insights
    if (morningDhikrDays > 0 || eveningDhikrDays > 0) {
      insights.push({
        title: "الأذكار",
        description: `قمت بأذكار الصباح ${morningDhikrDays} يوماً وأذكار المساء ${eveningDhikrDays} يوماً. الأذكار حصن للمؤمن.`,
        icon: <MessageCircle className="h-5 w-5 text-blue-500" />,
      })
    } else {
      insights.push({
        title: "الأذكار",
        description: "لم تسجل أي أذكار بعد. حاول المحافظة على أذكار الصباح والمساء.",
        icon: <MessageCircle className="h-5 w-5 text-blue-500" />,
      })
    }

    // Good deeds insights
    if (charityDays > 0 || familyVisitDays > 0 || happinessDays > 0 || feedingDays > 0) {
      insights.push({
        title: "الأعمال الصالحة",
        description: `قمت بالصدقة ${charityDays} مرة، وصلة الرحم ${familyVisitDays} مرة، وإدخال السرور ${happinessDays} مرة، والإطعام ${feedingDays} مرة. استمر في فعل الخير.`,
        icon: <Sparkles className="h-5 w-5 text-purple-500" />,
      })
    } else {
      insights.push({
        title: "الأعمال الصالحة",
        description: "لم تسجل أي أعمال صالحة بعد. حاول القيام بالصدقة وصلة الرحم وإدخال السرور والإطعام.",
        icon: <Sparkles className="h-5 w-5 text-purple-500" />,
      })
    }

    // Overall progress
    insights.push({
      title: "التقدم العام",
      description: `تقدمك العام في رمضان هو ${stats.overall}%. استمر في العمل الصالح وزيادة العبادات.`,
      icon: <Calendar className="h-5 w-5 text-rose-500" />,
    })

    return insights
  }

  const insights = generateInsights()

  // Ramadan tips
  const ramadanTips = [
    "احرص على السحور فإنه بركة",
    "اقرأ وردًا يوميًا من القرآن الكريم",
    "حافظ على صلاة التراويح جماعة",
    "أكثر من الدعاء وقت الإفطار",
    "تصدق ولو بالقليل كل يوم",
    "اغتنم العشر الأواخر بالعبادة والدعاء",
    "تحرَّ ليلة القدر في الوتر من العشر الأواخر",
    "اجعل لك وردًا من الأذكار صباحًا ومساءً",
    "صل رحمك وتواصل مع أقاربك",
    "أدخل السرور على المسلمين",
  ]

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
        <CardContent className="p-0">
          <Tabs defaultValue="chat" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 rounded-none border-b">
              <TabsTrigger
                value="chat"
                className="data-[state=active]:bg-purple-50 dark:data-[state=active]:bg-purple-900/20"
              >
                <MessageCircle className="h-4 w-4 ml-2" />
                المحادثة
              </TabsTrigger>
              <TabsTrigger
                value="insights"
                className="data-[state=active]:bg-purple-50 dark:data-[state=active]:bg-purple-900/20"
              >
                <Sparkles className="h-4 w-4 ml-2" />
                التحليلات
              </TabsTrigger>
              <TabsTrigger
                value="tips"
                className="data-[state=active]:bg-purple-50 dark:data-[state=active]:bg-purple-900/20"
              >
                <Lightbulb className="h-4 w-4 ml-2" />
                نصائح رمضانية
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chat" className="p-4 focus-visible:outline-none focus-visible:ring-0">
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
                          <span className="text-xs font-medium">
                            {message.role === "assistant" ? "المساعد" : "أنت"}
                          </span>
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
            </TabsContent>

            <TabsContent value="insights" className="p-4 focus-visible:outline-none focus-visible:ring-0">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">تحليل أدائك في رمضان</h3>

                {insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border rounded-lg bg-card hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">{insight.icon}</div>
                      <div>
                        <h4 className="font-medium">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground">{insight.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tips" className="p-4 focus-visible:outline-none focus-visible:ring-0">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">نصائح لشهر رمضان المبارك</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ramadanTips.map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-3 border rounded-lg bg-purple-50 dark:bg-purple-900/20 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start gap-2">
                        <div className="mt-1 bg-purple-100 dark:bg-purple-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        <p className="text-sm">{tip}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
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

  // Check for progress related questions
  if (q.includes("تقدم") || q.includes("إنجاز") || q.includes("تطور")) {
    const overallProgress = stats.overall || 0
    return `أداؤك العام في رمضان هو ${overallProgress}%. استمر في العمل الصالح وزيادة العبادات. كل خطوة صغيرة تقربك إلى الله تعالى.`
  }

  // Check for health related questions
  if (q.includes("صحة") || q.includes("ماء") || q.includes("تغذية")) {
    return "من المهم الاهتمام بصحتك خلال رمضان. احرص على شرب كمية كافية من الماء بين الإفطار والسحور، وتناول وجبات متوازنة تحتوي على البروتينات والفواكه والخضروات. تجنب الإفراط في تناول الحلويات والأطعمة الدسمة، وحاول ممارسة رياضة خفيفة بعد الإفطار بساعتين."
  }

  // Check for adhkar related questions
  if (q.includes("أذكار") || q.includes("ذكر") || q.includes("تسبيح")) {
    const morningDhikrDays = activities.filter((day) => day.dhikrMorning !== "0" && day.dhikrMorning !== "").length
    const eveningDhikrDays = activities.filter((day) => day.dhikrEvening !== "0" && day.dhikrEvening !== "").length
    return `الأذكار من أفضل العبادات. لقد قمت بأذكار الصباح ${morningDhikrDays} يوماً وأذكار المساء ${eveningDhikrDays} يوماً. من أفضل الأذكار: سبحان الله وبحمده، سبحان الله العظيم، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير. استمر في المحافظة على الأذكار اليومية، فهي حصن للمؤمن.`
  }

  // Check for qibla related questions
  if (q.includes("قبلة") || q.includes("اتجاه") || q.includes("مكة")) {
    return "يمكنك استخدام محدد القبلة في قسم 'أدوات' لمعرفة اتجاه القبلة من موقعك الحالي. اتجاه القبلة هو اتجاه الكعبة المشرفة في مكة المكرمة. من المهم التأكد من اتجاه القبلة قبل الصلاة، خاصة عند السفر أو التواجد في مكان جديد."
  }

  // Check for achievement related questions
  if (q.includes("إنجاز") || q.includes("شارة") || q.includes("جائزة")) {
    return "يمكنك الحصول على شارات الإنجاز عند تحقيق أهداف معينة مثل قراءة أجزاء من القرآن أو المواظبة على الصلاة. تفقد قسم 'الإنجازات' لمعرفة تقدمك في كل شارة. كلما زادت عباداتك وأعمالك الصالحة، كلما حصلت على المزيد من الشارات والإنجازات."
  }

  // Check for help with the app
  if (q.includes("استخدام") || q.includes("تطبيق") || q.includes("مساعدة")) {
    return "هذا التطبيق يساعدك على تتبع عباداتك خلال شهر رمضان. يمكنك تسجيل صلواتك وقراءتك للقرآن والأذكار والأعمال الصالحة. استخدم الجدول في الصفحة الرئيسية لتحديث أنشطتك اليومية. يمكنك أيضاً الاطلاع على إحصائياتك وإنجازاتك في الأقسام المخصصة لذلك."
  }

  // Check for last 10 days of Ramadan
  if (q.includes("العشر الأواخر") || q.includes("ليلة القدر")) {
    return "العشر الأواخر من رمضان هي أفضل أيام الشهر، وفيها ليلة القدر التي هي خير من ألف شهر. يُستحب فيها الاعتكاف وإحياء الليل بالصلاة والدعاء وقراءة القرآن. تحرى ليلة القدر في الليالي الوتر من العشر الأواخر (21، 23، 25، 27، 29). من علامات ليلة القدر: اعتدال الجو، وسطوع النجوم، وطمأنينة القلب."
  }

  // Default response if no specific match
  return "شكراً على سؤالك. رمضان فرصة عظيمة للتقرب إلى الله بالعبادات المختلفة. هل هناك جانب معين من العبادة ترغب في معرفة المزيد عنه؟"
}

