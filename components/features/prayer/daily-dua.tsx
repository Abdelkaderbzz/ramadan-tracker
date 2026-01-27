"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { FileText, Save, Trash2, BookOpen } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRamadanStore } from "@/lib/store"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function DailyDua() {
  const { savedDuas, addDua, removeDua, currentDua, updateCurrentDua } = useRamadanStore()
  const [showSuggestions, setShowSuggestions] = useState(false)
  const { toast } = useToast()
  const [selectedCategory, setSelectedCategory] = useState<string>("أدعية رمضان")

  // Suggested duas
  const suggestedDuas = [
    "اللهم إني أسألك الجنة وأعوذ بك من النار",
    "اللهم اغفر لي ذنبي كله دقه وجله وأوله وآخره وعلانيته وسره",
    "اللهم إني أسألك العفو والعافية في الدنيا والآخرة",
    "اللهم إني صائم فتقبل مني إنك أنت السميع العليم",
    "اللهم لك صمت وعلى رزقك أفطرت وبك آمنت وعليك توكلت",
    "اللهم إنك عفو تحب العفو فاعف عني",
    "اللهم أعني على ذكرك وشكرك وحسن عبادتك",
  ]

  // Categorized duas
  const duaCategories = {
    "أدعية رمضان": [
      "اللهم إني صائم فتقبل مني إنك أنت السميع العليم",
      "اللهم لك صمت وعلى رزقك أفطرت وبك آمنت وعليك توكلت",
      "اللهم إنك عفو تحب العفو فاعف عني",
      "اللهم اجعل صيامي صيام الصائمين وقيامي قيام القائمين",
      "اللهم اجعلني من عتقائك من النار في هذا الشهر الكريم",
      "اللهم بارك لنا في رمضان وبلغنا ليلة القدر",
      "ذهب الظمأ وابتلت العروق وثبت الأجر إن شاء الله",
    ],
    "أدعية الصباح والمساء": [
      "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له",
      "اللهم ما أصبح بي من نعمة أو بأحد من خلقك فمنك وحدك لا شريك لك، فلك الحمد ولك الشكر",
      "اللهم إني أسألك خير هذا اليوم: فتحه، ونصره، ونوره، وبركته، وهداه",
      "اللهم بك أصبحنا، وبك أمسينا، وبك نحيا، وبك نموت، وإليك النشور",
    ],
    "أدعية الاستغفار": [
      "أستغفر الله العظيم الذي لا إله إلا هو الحي القيوم وأتوب إليه",
      "اللهم أنت ربي لا إله إلا أنت، خلقتني وأنا عبدك، وأنا على عهدك ووعدك ما استطعت، أعوذ بك من شر ما صنعت، أبوء لك بنعمتك علي، وأبوء بذنبي فاغفر لي فإنه لا يغفر الذنوب إلا أنت",
      "اللهم اغفر لي ذنبي كله دقه وجله وأوله وآخره وعلانيته وسره",
      "رب اغفر لي وتب علي إنك أنت التواب الرحيم",
    ],
    "أدعية متنوعة": [
      "اللهم إني أسألك الجنة وأعوذ بك من النار",
      "اللهم إني أسألك العفو والعافية في الدنيا والآخرة",
      "اللهم أعني على ذكرك وشكرك وحسن عبادتك",
      "اللهم ارزقنا حسن الخاتمة",
      "اللهم اغفر للمؤمنين والمؤمنات والمسلمين والمسلمات الأحياء منهم والأموات",
      "اللهم اشف مرضانا ومرضى المسلمين",
    ],
  }

  const handleSaveDua = () => {
    if (!currentDua.trim()) {
      toast({
        title: "لا يمكن حفظ دعاء فارغ",
        description: "الرجاء كتابة الدعاء أولاً",
        variant: "destructive",
      })
      return
    }

    addDua(currentDua)
    updateCurrentDua("")

    toast({
      title: "تم حفظ الدعاء",
      description: "تم إضافة الدعاء إلى قائمة الأدعية المحفوظة",
    })
  }

  const handleSelectSuggestion = (dua: string) => {
    updateCurrentDua(dua)
    // No need to manually set showSuggestions as the dialog will handle its own state
  }

  return (
    <Card className="rtl">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">دعاء اليوم</CardTitle>
        <motion.div whileHover={{ rotate: 15 }} whileTap={{ scale: 0.9 }}>
          <FileText className="h-5 w-5 text-teal-500" />
        </motion.div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">أدعية تدعو بها اليوم</p>

        <div className="space-y-4">
          <div className="relative">
            <Input
              value={currentDua}
              onChange={(e) => updateCurrentDua(e.target.value)}
              placeholder="اكتب دعائك هنا"
              className="rtl text-right pr-10"
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-primary"
                >
                  <BookOpen className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="rtl">
                <DialogHeader>
                  <DialogTitle>اختر من الأدعية المقترحة</DialogTitle>
                  <DialogDescription>يمكنك اختيار أحد الأدعية المقترحة أو كتابة دعاء خاص بك</DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4 py-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Object.keys(duaCategories).map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        onClick={() => setSelectedCategory(category)}
                        className="text-sm"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>

                  <div className="grid gap-2 max-h-[300px] overflow-y-auto">
                    {duaCategories[selectedCategory as keyof typeof duaCategories].map((dua, index) => (
                      <div
                        key={index}
                        className="p-3 border rounded-md cursor-pointer hover:bg-muted"
                        onClick={() => {
                          updateCurrentDua(dua)
                          // Close the dialog after selection
                          const closeButton = document.querySelector('[data-state="open"] button[aria-label="Close"]')
                          if (closeButton instanceof HTMLElement) {
                            closeButton.click()
                          }
                        }}
                      >
                        {dua}
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSaveDua} size="sm" className="gap-1">
              <Save className="h-4 w-4 ml-1" />
              حفظ الدعاء
            </Button>
          </div>
        </div>

        {savedDuas.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">الأدعية المحفوظة:</h4>
            <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
              <AnimatePresence>
                {savedDuas.map((dua, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center justify-between p-2 bg-muted/50 rounded-md"
                  >
                    <p className="text-sm flex-1">{dua}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      onClick={() => removeDua(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

