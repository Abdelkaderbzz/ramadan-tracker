export interface MotivationItem {
  content: string;
  source?: string;
  contentAr: string;
  sourceAr?: string;
  type: 'hadith' | 'dua' | 'quote';
}

export const RAMADAN_MOTIVATIONS: MotivationItem[] = [
  {
    content:
      'When Ramadan begins, the gates of Paradise are opened, the gates of Hell are closed, and the devils are chained.',
    source: 'Sahih Bukhari & Muslim',
    contentAr:
      'إذا دخل رمضان فتحت أبواب الجنة، وغلقت أبواب النار، وسلسلت الشياطين.',
    sourceAr: 'رواه البخاري ومسلم',
    type: 'hadith',
  },
  {
    content:
      'Whoever fasts Ramadan out of faith and in the hope of reward, his previous sins will be forgiven.',
    source: 'Sahih Bukhari',
    contentAr: 'من صام رمضان إيماناً واحتساباً غفر له ما تقدم من ذنبه.',
    sourceAr: 'رواه البخاري',
    type: 'hadith',
  },
  {
    content:
      'The breath of the fasting person is more pleasant to Allah than the scent of musk.',
    source: 'Sahih Muslim',
    contentAr: 'لخلوف فم الصائم أطيب عند الله من ريح المسك.',
    sourceAr: 'رواه مسلم',
    type: 'hadith',
  },
  {
    content:
      'Paradise has a gate called Ar-Rayyan, through which only those who fast will enter on the Day of Resurrection.',
    source: 'Sahih Bukhari',
    contentAr:
      'إن في الجنة باباً يقال له الريان، يدخل منه الصائمون يوم القيامة، لا يدخل منه أحد غيرهم.',
    sourceAr: 'رواه البخاري',
    type: 'hadith',
  },
  {
    content:
      'Every action of the son of Adam is given manifold reward, each good deed receiving ten times its like, up to seven hundred times.',
    source: 'Sahih Muslim',
    contentAr: 'كل عمل ابن آدم يضاعف، الحسنة عشر أمثالها إلى سبعمائة ضعف.',
    sourceAr: 'رواه مسلم',
    type: 'hadith',
  },
  {
    content: 'Take Suhoor, for in Suhoor there is blessing.',
    source: 'Sahih Bukhari',
    contentAr: 'تسحروا فإن في السحور بركة.',
    sourceAr: 'رواه البخاري',
    type: 'hadith',
  },
  {
    content: "Allah says: 'Fasting is for Me and I shall reward for it'.",
    source: 'Hadith Qudsi',
    contentAr:
      'قال الله عز وجل: كل عمل ابن آدم له إلا الصيام فإنه لي وأنا أجزي به.',
    sourceAr: 'حديث قدسي',
    type: 'hadith',
  },
  {
    content:
      'O Allah, help me to remember You, thank You, and worship You in the best way.',
    contentAr: 'اللهم أعني على ذكرك وشكرك وحسن عبادتك.',
    type: 'dua',
  },
  {
    content: 'The best of you are those who learn the Quran and teach it.',
    source: 'Sahih Bukhari',
    contentAr: 'خيركم من تعلم القرآن وعلمه.',
    sourceAr: 'رواه البخاري',
    type: 'hadith',
  },
  {
    content: 'Ramadan is like a rain that nourishes the seeds of good deeds.',
    contentAr: 'رمضان كالغيث يحيي بذور الأعمال الصالحة.',
    type: 'quote',
  },
  {
    content:
      'Fasting is a shield; so when one of you is fasting he should not use foul or foolish talk.',
    source: 'Sahih Muslim',
    contentAr: 'الصيام جنة، فإذا كان يوم صوم أحدكم فلا يرفث ولا يصخب.',
    sourceAr: 'رواه مسلم',
    type: 'hadith',
  },
  {
    content:
      'He who provides a fasting person something with which to break his fast, will earn the same reward as the one who was observing the fast.',
    source: 'Tirmidhi',
    contentAr:
      'من فطر صائماً كان له مثل أجره، غير أنه لا ينقص من أجر الصائم شيئاً.',
    sourceAr: 'رواه الترمذي',
    type: 'hadith',
  },
  {
    content:
      'The thirst is gone, the veins are moistened, and the reward is confirmed, if Allah wills.',
    source: 'Abu Dawood',
    contentAr: 'ذهب الظمأ وابتلت العروق وثبت الأجر إن شاء الله.',
    sourceAr: 'رواه أبو داود',
    type: 'dua',
  },
  {
    content:
      'Whoever stands in prayer during the nights of Ramadan out of faith and in the hope of reward, his previous sins will be forgiven.',
    source: 'Sahih Bukhari',
    contentAr: 'من قام رمضان إيماناً واحتساباً غفر له ما تقدم من ذنبه.',
    sourceAr: 'رواه البخاري',
    type: 'hadith',
  },
  {
    content: 'Look for the Night of Qadr in the last ten nights of Ramadan.',
    source: 'Sahih Bukhari',
    contentAr: 'تحروا ليلة القدر في العشر الأواخر من رمضان.',
    sourceAr: 'رواه البخاري',
    type: 'hadith',
  },
  {
    content:
      'O Allah, You are Most Forgiving, and You love forgiveness; so forgive me.',
    source: 'Tirmidhi',
    contentAr: 'اللهم إنك عفو تحب العفو فاعف عني.',
    sourceAr: 'رواه الترمذي',
    type: 'dua',
  },
  {
    content:
      'The most beloved of deeds to Allah are those that are most consistent, even if it is small.',
    source: 'Sahih Bukhari',
    contentAr: 'أحب الأعمال إلى الله أدومها وإن قل.',
    sourceAr: 'رواه البخاري',
    type: 'hadith',
  },
  {
    content: 'A smile in the face of your brother is charity.',
    source: 'Tirmidhi',
    contentAr: 'تبسمك في وجه أخيك لك صدقة.',
    sourceAr: 'رواه الترمذي',
    type: 'hadith',
  },
  {
    content: 'He who does not show mercy to others, will not be shown mercy.',
    source: 'Sahih Bukhari',
    contentAr: 'من لا يرحم لا يرحم.',
    sourceAr: 'رواه البخاري',
    type: 'hadith',
  },
  {
    content:
      'Ramadan is the month whose beginning is mercy, whose middle is forgiveness and whose end is freedom from fire.',
    source: 'Ibn Khuzaymah',
    contentAr: 'رمضان أوله رحمة، وأوسطه مغفرة، وآخره عتق من النار.',
    sourceAr: 'رواه ابن خزيمة',
    type: 'hadith',
  },
  {
    content:
      'Indeed, Allah does not look at your appearance or your wealth, but He looks at your hearts and your actions.',
    source: 'Sahih Muslim',
    contentAr:
      'إن الله لا ينظر إلى صوركم وأموالكم، ولكن ينظر إلى قلوبكم وأعمالكم.',
    sourceAr: 'رواه مسلم',
    type: 'hadith',
  },
  {
    content:
      'Our Lord, give us in this world that which is good and in the Hereafter that which is good and protect us from the punishment of the Fire.',
    source: 'Quran 2:201',
    contentAr: 'ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار.',
    sourceAr: 'سورة البقرة: ٢٠١',
    type: 'dua',
  },
  {
    content: 'Wealth is not diminished by charity.',
    source: 'Sahih Muslim',
    contentAr: 'ما نقصت صدقة من مال.',
    sourceAr: 'رواه مسلم',
    type: 'hadith',
  },
  {
    content:
      'Allah is helpful to His servant as long as the servant helps his brother.',
    source: 'Sahih Muslim',
    contentAr: 'والله في عون العبد ما كان العبد في عون أخيه.',
    sourceAr: 'رواه مسلم',
    type: 'hadith',
  },
  {
    content:
      'O Allah, I ask You for beneficial knowledge, goodly provision and acceptable deeds.',
    source: 'Ibn Majah',
    contentAr: 'اللهم إني أسألك علماً نافعاً، ورزقاً طيباً، وعملاً متقبلاً.',
    sourceAr: 'رواه ابن ماجه',
    type: 'dua',
  },
  {
    content:
      'The upper hand is better than the lower hand (the one that gives is better than the one that takes).',
    source: 'Sahih Bukhari',
    contentAr: 'اليد العليا خير من اليد السفلى.',
    sourceAr: 'رواه البخاري',
    type: 'hadith',
  },
  {
    content:
      'Ramadan is not about staying hungry, it is about staying away from sins.',
    contentAr: 'ليس الصيام من الأكل والشرب فقط، بل هو من اللغو والرفث.',
    type: 'quote',
  },
  {
    content:
      'A person who starts the day with Quran, starts it with blessings.',
    contentAr: 'من بدأ يومه بالقرآن، بدأه بالبركة.',
    type: 'quote',
  },
  {
    content: 'Fast so that you may gain health.',
    source: 'At-Tabarani',
    contentAr: 'صوموا تصحوا.',
    sourceAr: 'رواه الطبراني',
    type: 'hadith',
  },
  {
    content: 'The best charity is that given in Ramadan.',
    source: 'Tirmidhi',
    contentAr: 'أفضل الصدقة صدقة في رمضان.',
    sourceAr: 'رواه الترمذي',
    type: 'hadith',
  },
];
