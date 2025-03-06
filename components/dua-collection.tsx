"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Search, BookOpen, Heart, Copy, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"

// Comprehensive dua collection
const duaCollection = {
  "أدعية رمضان": [
    {
      arabic: "اللهم إني صائم فتقبل مني إنك أنت السميع العليم",
      translation: "O Allah, I am fasting, so accept it from me; indeed, You are the All-Hearing, the All-Knowing",
      reference: "دعاء مأثور",
    },
    {
      arabic: "اللهم لك صمت وعلى رزقك أفطرت وبك آمنت وعليك توكلت",
      translation:
        "O Allah, for You I have fasted, and with Your provision I have broken my fast, and in You I believe, and on You I rely",
      reference: "أبو داود",
    },
    {
      arabic: "اللهم إنك عفو تحب العفو فاعف عني",
      translation: "O Allah, You are forgiving and love forgiveness, so forgive me",
      reference: "الترمذي",
    },
    {
      arabic: "اللهم اجعل صيامي صيام الصائمين وقيامي قيام القائمين",
      translation:
        "O Allah, make my fasting like the fasting of the true fasters, and my standing (in prayer) like those who stand (in true prayer)",
      reference: "دعاء مأثور",
    },
    {
      arabic: "اللهم اجعلني من عتقائك من النار في هذا الشهر الكريم",
      translation: "O Allah, make me among those whom You free from the Fire in this noble month",
      reference: "دعاء مأثور",
    },
    {
      arabic: "اللهم بارك لنا في رمضان وبلغنا ليلة القدر",
      translation: "O Allah, bless us in Ramadan and enable us to reach the Night of Decree (Laylat al-Qadr)",
      reference: "دعاء مأثور",
    },
    {
      arabic: "ذهب الظمأ وابتلت العروق وثبت الأجر إن شاء الله",
      translation: "The thirst has gone, the veins are moistened, and the reward is confirmed, if Allah wills",
      reference: "أبو داود",
    },
  ],
  "أدعية الصباح والمساء": [
    {
      arabic: "أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له",
      translation:
        "We have reached the morning, and the kingdom belongs to Allah. Praise be to Allah. None has the right to be worshipped but Allah alone, Who has no partner",
      reference: "أبو داود",
    },
    {
      arabic: "اللهم ما أصبح بي من نعمة أو بأحد من خلقك فمنك وحدك لا شريك لك، فلك الحمد ولك الشكر",
      translation:
        "O Allah, whatever blessing has come to me or to any of Your creation this morning is from You alone, without partner, so for You is all praise and unto You all thanks",
      reference: "أبو داود",
    },
    {
      arabic: "اللهم إني أسألك خير هذا اليوم: فتحه، ونصره، ونوره، وبركته، وهداه",
      translation:
        "O Allah, I ask You for the good of this day: its victory, its help, its light, its blessings, and its guidance",
      reference: "أبو داود",
    },
    {
      arabic: "اللهم بك أصبحنا، وبك أمسينا، وبك نحيا، وبك نموت، وإليك النشور",
      translation:
        "O Allah, by You we enter the morning and by You we enter the evening, by You we live and by You we die, and to You is the resurrection",
      reference: "الترمذي",
    },
  ],
  "أدعية الاستغفار": [
    {
      arabic: "أستغفر الله العظيم الذي لا إله إلا هو الحي القيوم وأتوب إليه",
      translation:
        "I seek forgiveness from Allah the Mighty, Whom there is none worthy of worship except Him, the Living, the Self-Sustaining, and I repent to Him",
      reference: "أبو داود والترمذي",
    },
    {
      arabic:
        "اللهم أنت ربي لا إله إلا أنت، خلقتني وأنا عبدك، وأنا على عهدك ووعدك ما استطعت، أعوذ بك من شر ما صنعت، أبوء لك بنعمتك علي، وأبوء بذنبي فاغفر لي فإنه لا يغفر الذنوب إلا أنت",
      translation:
        "O Allah, You are my Lord, there is none worthy of worship except You. You created me and I am Your servant, and I abide by Your covenant and promise as best I can. I seek refuge in You from the evil that I have done. I acknowledge Your favor upon me, and I acknowledge my sin, so forgive me, for none forgives sins except You",
      reference: "البخاري",
    },
    {
      arabic: "رب اغفر لي وتب علي إنك أنت التواب الرحيم",
      translation:
        "My Lord, forgive me and accept my repentance. Indeed, You are the Accepting of repentance, the Merciful",
      reference: "القرآن الكريم",
    },
  ],
  "أدعية طلب الجنة": [
    {
      arabic: "اللهم إني أسألك الجنة وما قرب إليها من قول أو عمل، وأعوذ بك من النار وما قرب إليها من قول أو عمل",
      translation:
        "O Allah, I ask You for Paradise and whatever brings me closer to it of words and deeds, and I seek refuge in You from the Fire and whatever brings me closer to it of words and deeds",
      reference: "ابن ماجه",
    },
    {
      arabic: "اللهم إني أسألك الفردوس الأعلى من الجنة",
      translation: "O Allah, I ask You for the highest level of Paradise (Al-Firdaws)",
      reference: "البخاري",
    },
    {
      arabic: "اللهم أدخلني الجنة واجرني من النار",
      translation: "O Allah, admit me to Paradise and protect me from the Fire",
      reference: "دعاء مأثور",
    },
  ],
  "أدعية متنوعة": [
    {
      arabic: "اللهم إني أسألك العفو والعافية في الدنيا والآخرة",
      translation: "O Allah, I ask You for pardon and well-being in this life and the next",
      reference: "ابن ماجه",
    },
    {
      arabic: "اللهم أعني على ذكرك وشكرك وحسن عبادتك",
      translation: "O Allah, help me to remember You, to thank You, and to worship You in the best manner",
      reference: "أبو داود والنسائي",
    },
    {
      arabic: "اللهم ارزقنا حسن الخاتمة",
      translation: "O Allah, grant us a good end",
      reference: "دعاء مأثور",
    },
    {
      arabic: "اللهم اغفر للمؤمنين والمؤمنات والمسلمين والمسلمات الأحياء منهم والأموات",
      translation:
        "O Allah, forgive the believing men and women, and the Muslim men and women, the living among them and the dead",
      reference: "دعاء مأثور",
    },
    {
      arabic: "اللهم اشف مرضانا ومرضى المسلمين",
      translation: "O Allah, heal our sick and the sick among the Muslims",
      reference: "دعاء مأثور",
    },
  ],
}

export default function DuaCollection() {
  const [activeCategory, setActiveCategory] = useState<string>("أدعية رمضان")
  const [searchQuery, setSearchQuery] = useState("")
  const [favorites, setFavorites] = useState<string[]>([])
  const [copiedDua, setCopiedDua] = useState<string | null>(null)
  const { toast } = useToast()

  // Filter duas based on search query
  const filteredDuas = searchQuery
    ? Object.entries(duaCollection).flatMap(([category, duas]) =>
        duas
          .filter(
            (dua) =>
              dua.arabic.includes(searchQuery) || dua.translation.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((dua) => ({ ...dua, category })),
      )
    : duaCollection[activeCategory as keyof typeof duaCollection]

  const toggleFavorite = (dua: string) => {
    if (favorites.includes(dua)) {
      setFavorites(favorites.filter((d) => d !== dua))
    } else {
      setFavorites([...favorites, dua])
      toast({
        title: "تمت الإضافة إلى المفضلة",
        description: "تم إضافة الدعاء إلى قائمة المفضلة",
      })
    }
  }

  const copyToClipboard = (dua: string) => {
    navigator.clipboard.writeText(dua)
    setCopiedDua(dua)
    toast({
      title: "تم النسخ",
      description: "تم نسخ الدعاء إلى الحافظة",
    })

    setTimeout(() => {
      setCopiedDua(null)
    }, 2000)
  }

  return (
    <Card className="rtl">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-medium">مكتبة الأدعية</CardTitle>
        <BookOpen className="h-5 w-5 text-purple-500" />
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن دعاء..."
              className="pl-10"
            />
          </div>
        </div>

        {searchQuery ? (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">نتائج البحث</h3>
            {filteredDuas.length > 0 ? (
              filteredDuas.map((dua: any, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-lg font-medium mb-2">{dua.arabic}</p>
                      <p className="text-sm text-muted-foreground mb-1">{dua.translation}</p>
                      <p className="text-xs text-muted-foreground">{dua.reference}</p>
                      {dua.category && (
                        <span className="inline-block mt-2 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded-full">
                          {dua.category}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-purple-600"
                        onClick={() => toggleFavorite(dua.arabic)}
                      >
                        <Heart
                          className={`h-4 w-4 ${favorites.includes(dua.arabic) ? "fill-purple-500 text-purple-500" : ""}`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-purple-600"
                        onClick={() => copyToClipboard(dua.arabic)}
                      >
                        {copiedDua === dua.arabic ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">لا توجد نتائج مطابقة لبحثك</p>
            )}
          </div>
        ) : (
          <Tabs defaultValue="أدعية رمضان" onValueChange={setActiveCategory}>
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
              {Object.keys(duaCollection).map((category) => (
                <TabsTrigger key={category} value={category} className="text-xs md:text-sm">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(duaCollection).map(([category, duas]) => (
              <TabsContent key={category} value={category} className="space-y-4">
                <h3 className="text-lg font-medium">{category}</h3>
                {duas.map((dua, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-lg font-medium mb-2">{dua.arabic}</p>
                        <p className="text-sm text-muted-foreground mb-1">{dua.translation}</p>
                        <p className="text-xs text-muted-foreground">{dua.reference}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-purple-600"
                          onClick={() => toggleFavorite(dua.arabic)}
                        >
                          <Heart
                            className={`h-4 w-4 ${favorites.includes(dua.arabic) ? "fill-purple-500 text-purple-500" : ""}`}
                          />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-purple-600"
                          onClick={() => copyToClipboard(dua.arabic)}
                        >
                          {copiedDua === dua.arabic ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </TabsContent>
            ))}

            {favorites.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">الأدعية المفضلة</h3>
                <div className="space-y-4">
                  {favorites.map((favDua, index) => {
                    // Find the dua object that matches this favorite
                    const duaObj = Object.values(duaCollection)
                      .flat()
                      .find((dua) => dua.arabic === favDua)

                    if (!duaObj) return null

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-4 border border-purple-200 rounded-lg bg-purple-50/50 dark:bg-purple-900/10"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-lg font-medium mb-2">{duaObj.arabic}</p>
                            <p className="text-sm text-muted-foreground mb-1">{duaObj.translation}</p>
                            <p className="text-xs text-muted-foreground">{duaObj.reference}</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-purple-600"
                              onClick={() => toggleFavorite(duaObj.arabic)}
                            >
                              <Heart className="h-4 w-4 fill-purple-500 text-purple-500" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-purple-600"
                              onClick={() => copyToClipboard(duaObj.arabic)}
                            >
                              {copiedDua === duaObj.arabic ? (
                                <Check className="h-4 w-4 text-green-500" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}

