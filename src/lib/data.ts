/* Barcha matn shu faylda. Taqdimotdan oldin shu yerda tahrirlang.
   Sanalar taxminiy bo‘lsa «~» bilan belgilangan; iqtiboslar «mazmunan» berilgan. */

export const PRESENTER = {
  name: "Dilorom Toyirova",
  group: "85-25 I guruh",
  university: "Farg‘ona davlat texnika universiteti",
  faculty: "Ishlab chiqarishda boshqaruv fakulteti",
  subject: "Falsafa",
  topic: "Abu Nasr Forobiy va G‘azzoliyning falsafa ilmiga oid qarashlarini qiyosiy tahlil etish",
  basis: "Forobiyning «Siyosat falsafasi» va G‘azzoliyning «Kimyoi saodat» asarlari asosida",
}

export type SectionId = "muqova" | "kirish" | "allomalar" | "tarix" | "forobiy" | "gazzoliy" | "qiyos" | "taqqoslash" | "umumiy" | "xulosa"

export const SECTIONS: { id: SectionId; label: string; term: string }[] = [
  { id: "muqova", label: "Muqova", term: "Sarlavha" },
  { id: "kirish", label: "Kirish", term: "Muqaddima" },
  { id: "allomalar", label: "Allomalar", term: "Ulamo" },
  { id: "tarix", label: "Tarix", term: "Ta’rix" },
  { id: "forobiy", label: "Forobiy", term: "Siyosat" },
  { id: "gazzoliy", label: "G‘azzoliy", term: "Kimyo" },
  { id: "qiyos", label: "Qiyos", term: "Muqoyasa" },
  { id: "taqqoslash", label: "Farqlar", term: "Ixtilof" },
  { id: "umumiy", label: "Umumiylik", term: "Ittifoq" },
  { id: "xulosa", label: "Xulosa", term: "Xotima" },
]

export type Thinker = "f" | "g"

export const THINKERS = {
  f: {
    short: "Forobiy",
    full: "Abu Nasr Muhammad ibn Muhammad al-Forobiy",
    arabic: "الفارابي",
    years: "~870 – 950",
    title: "«Muallimi soniy»",
    titleMeaning: "Arastudan keyingi «Ikkinchi muallim»",
    rows: [
      { k: "Tug‘ilgan joyi", v: "Farob (O‘tror), Sirdaryo bo‘yi" },
      { k: "Faoliyati", v: "Bag‘dod, Halab, Damashq" },
      { k: "Yozgan tili", v: "Arab tili" },
      { k: "Yo‘nalishi", v: "Falsafa, mantiq, siyosat, musiqa" },
      { k: "Asosiy asarlari", v: "«Fozil odamlar shahri», «Siyosat falsafasi», «Ilmlar tasnifi»" },
    ],
    idea: "Saodatga aql, ilm va fazilatli jamiyat orqali erishiladi.",
  },
  g: {
    short: "G‘azzoliy",
    full: "Abu Homid Muhammad ibn Muhammad al-G‘azzoliy",
    arabic: "الغزالي",
    years: "~1058 – 1111",
    title: "«Hujjat ul-Islom»",
    titleMeaning: "«Islomning dalili»",
    rows: [
      { k: "Tug‘ilgan joyi", v: "Tus, Xuroson" },
      { k: "Faoliyati", v: "Nishopur, Bag‘dod (Nizomiya), Damashq, Tus" },
      { k: "Yozgan tili", v: "Arab va fors tillari" },
      { k: "Yo‘nalishi", v: "Kalom, fiqh, axloq, tasavvuf" },
      { k: "Asosiy asarlari", v: "«Ihyo ulum id-din», «Tahofut al-falosifa», «Kimyoi saodat»" },
    ],
    idea: "Saodatga o‘zlikni tanish va qalbni poklash orqali erishiladi.",
  },
} as const

/** The numeric ladder: two lives, a century apart. */
export const LADDER: { year: string; who: Thinker; title: string; text: string }[] = [
  {
    year: "870",
    who: "f",
    title: "Farobda tug‘ildi (~870)",
    text: "Sirdaryo bo‘yidagi Farob (O‘tror) shahrida, turkiy oilada tug‘ilgan. Yoshligidan til va ilmlarga qiziqqan.",
  },
  {
    year: "900",
    who: "f",
    title: "Bag‘dod: mantiq maktabi (~900-yillar)",
    text: "Xalifalik poytaxtida Arastu mantiqini o‘rganadi, yunon falsafasini arab tilida sharhlaydi. Keyinchalik unga «Muallimi soniy» — «Ikkinchi muallim» laqabi beriladi.",
  },
  {
    year: "942",
    who: "f",
    title: "Halab saroyi (~942)",
    text: "Hamdoniylar hukmdori Sayfuddavla saroyida ijod qiladi. Davlat, shahar va saodat haqidagi siyosiy-falsafiy asarlari shu davrga to‘g‘ri keladi.",
  },
  {
    year: "950",
    who: "f",
    title: "Damashqda vafot etdi (950)",
    text: "Ortida yuzga yaqin asar qoladi. Uning g‘oyalari Ibn Sino orqali butun Sharq falsafasiga tarqaladi.",
  },
  {
    year: "1058",
    who: "g",
    title: "Tusda G‘azzoliy tug‘ildi (~1058)",
    text: "Forobiy vafotidan bir asrdan ko‘proq vaqt o‘tib, Xurosondagi Tus shahrida dunyoga keladi. Nishopurda Imom ul-Haramayn Juvayniydan tahsil oladi.",
  },
  {
    year: "1091",
    who: "g",
    title: "Bag‘dod Nizomiya madrasasi (1091)",
    text: "Vazir Nizomulmulk uni Bag‘doddagi Nizomiya madrasasiga bosh mudarris etib tayinlaydi. U davrning eng nufuzli olimiga aylanadi.",
  },
  {
    year: "1095",
    who: "g",
    title: "«Tahofut» va ruhiy inqiroz (~1095)",
    text: "«Tahofut al-falosifa» («Faylasuflarning izchilsizligi») asarida Forobiy va Ibn Sino qarashlarini tanqid qiladi. O‘sha yili Bag‘dodni tark etib, tasavvuf yo‘liga kiradi.",
  },
  {
    year: "1105",
    who: "g",
    title: "«Kimyoi saodat» (~1105)",
    text: "Fors tilida, keng xalq uchun yozilgan bu kitob «Ihyo ulum id-din»ning mohiyatini qisqa va tushunarli shaklda beradi.",
  },
  {
    year: "1111",
    who: "g",
    title: "Tusda vafot etdi (1111)",
    text: "Islom tafakkurida «Hujjat ul-Islom» sifatida qoladi; asarlari Sharqda ham, G‘arbda ham o‘qiladi.",
  },
]

/** Forobiy's six principles of being, from the First Cause down to matter (emanation, fayz). */
export const EMANATION = [
  { name: "Birinchi sabab", term: "al-Avval", text: "Yagona, mukammal mavjudot; hamma narsa undan «toshib» chiqadi" },
  { name: "Ikkinchi aqllar", term: "osmon sferalari", text: "Har bir osmon sferasini boshqaruvchi aqllar" },
  { name: "Faol aql", term: "al-aql al-fa’’ol", text: "Inson aqliga bilim nurini beruvchi o‘ninchi aql" },
  { name: "Jon", term: "nafs", text: "Tirik mavjudotlarni harakatlantiruvchi kuch" },
  { name: "Shakl", term: "surat", text: "Narsaga mohiyat beruvchi ko‘rinish" },
  { name: "Modda", term: "hayulo", text: "Shakl qabul qiluvchi asos" },
]

/** Forobiy's typology of cities: the virtuous one and its four opposites. */
export const CITIES: { name: string; term: string; desc: string; variant: "whole" | "scattered" | "hollow" | "cracked" | "turned" }[] = [
  {
    name: "Fozil shahar",
    term: "al-madina al-fozila",
    desc: "Odamlar saodatga erishish uchun o‘zaro hamkorlik qiladi. Hamma a’zo sog‘lom tanadek bir-birini to‘ldiradi.",
    variant: "whole",
  },
  {
    name: "Johil shahar",
    term: "al-madina al-johila",
    desc: "Haqiqiy saodatni bilmaydi: boylik, lazzat, shon-shuhrat yoki hokimiyatni maqsad deb biladi.",
    variant: "scattered",
  },
  {
    name: "Fosiq shahar",
    term: "al-madina al-fosiqa",
    desc: "Saodat nima ekanini biladi, lekin xuddi johil shahar kabi yashaydi — bilim amalga aylanmaydi.",
    variant: "hollow",
  },
  {
    name: "O‘zgargan shahar",
    term: "al-madina al-mutabaddila",
    desc: "Avval fozil bo‘lgan, keyin qarashlari va amallari buzilib, boshqa yo‘lga o‘tib ketgan.",
    variant: "cracked",
  },
  {
    name: "Adashgan shahar",
    term: "al-madina al-zolla",
    desc: "Saodatni noto‘g‘ri tushunadi; xalqqa soxta tasavvurlar beriladi, rahbari esa aldovga tayanadi.",
    variant: "turned",
  },
]

/** The twelve innate qualities of the first ruler (Forobiy, «Fozil odamlar shahri»). */
export const RULER_QUALITIES = [
  "Sog‘lom tana va mukammal a’zolar",
  "Har narsani tez va to‘g‘ri tushunish",
  "Kuchli xotira",
  "Zehn o‘tkirligi, farosat",
  "Fikrini aniq va chiroyli ifodalash",
  "Ilm va ta’limga muhabbat",
  "Yeyish-ichish va lazzatda me’yor",
  "Haqiqatni sevish, yolg‘ondan nafratlanish",
  "Qalb ulug‘vorligi, or-nomus",
  "Mol-dunyoga befarqlik",
  "Adolatni sevish, zulmga qarshilik",
  "Qat’iyat va jasorat",
]

/** The four discourses (unvon) that open «Kimyoi saodat». */
export const UNVON = [
  {
    n: "I",
    name: "O‘zni tanish",
    arabic: "معرفة النفس",
    front: "Inson kim?",
    text: "Inson — tashqi tana va ichki qalbdan iborat; haqiqiy mohiyat — qalb. «Kimki o‘zini tanisa, Robbini taniydi» degan hikmat kitobning kaliti (mazmunan).",
  },
  {
    n: "II",
    name: "Allohni tanish",
    arabic: "معرفة الله",
    front: "Yaratuvchi qanday taniladi?",
    text: "O‘z tanasi va qalbining tuzilishini anglagan kishi undagi hikmat orqali Yaratuvchining qudrati va donoligini taniydi.",
  },
  {
    n: "III",
    name: "Dunyoni tanish",
    arabic: "معرفة الدنيا",
    front: "Dunyo nima?",
    text: "Dunyo — safardagi bekat. Undan oxirat yo‘li uchun ozuqa olish kerak, ammo unga ko‘ngil bog‘lab qolmaslik lozim.",
  },
  {
    n: "IV",
    name: "Oxiratni tanish",
    arabic: "معرفة الآخرة",
    front: "So‘nggi maqsad qayerda?",
    text: "Haqiqiy, oxirgi saodat oxiratda. Dunyo hayoti — unga tayyorgarlik, qalb esa o‘sha saodatni ko‘taruvchi.",
  },
]

/** The four pillars (rukn) of the book, ten principles each. */
export const RUKN = [
  { name: "Ibodot", text: "Ibodatlar: Allohga bandalik burchlari", tone: "g" },
  { name: "Muomalot", text: "Kundalik hayot: savdo, oila, odob, muomala", tone: "g" },
  { name: "Muhlikot", text: "Halok qiluvchi illatlar: hasad, kibr, ochko‘zlik, g‘azab", tone: "dark" },
  { name: "Munjiyot", text: "Najot beruvchi fazilatlar: tavba, sabr, shukr, muhabbat", tone: "gold" },
] as const

/** The climax: one metaphor, read in two directions. */
export const QIYOS_STEPS: {
  who: Thinker | "both"
  kicker: string
  title: string
  text: string
  center: string
  ring: string[]
}[] = [
  {
    who: "f",
    kicker: "Forobiy",
    title: "Shahar — sog‘lom tana kabi",
    text: "Fozil shaharda har kim o‘z martabasida turadi va hamma birgalikda saodatga xizmat qiladi — xuddi tana a’zolari birgalikda hayotni saqlagani kabi.",
    center: "Birinchi rahbar",
    ring: ["Yaqin yordamchilar", "Olimlar", "Hunarmandlar", "Xizmatchilar"],
  },
  {
    who: "f",
    kicker: "Forobiy",
    title: "Rahbar — tananing yuragi",
    text: "Tanada bosh a’zo yurak bo‘lgani kabi, shaharda ham hammani tartibga soluvchi bitta rahbar bor. Shuning uchun fozil shahar fozil rahbarsiz bo‘lmaydi.",
    center: "Yurak",
    ring: ["Bosh a’zolar", "Yordamchi a’zolar", "Ijrochi a’zolar", "Eng quyi a’zolar"],
  },
  {
    who: "g",
    kicker: "G‘azzoliy",
    title: "Tana — bir mamlakat",
    text: "«Kimyoi saodat»da tana mamlakatga o‘xshatiladi: qalb — podshoh, aql — vazir, shahvat — soliq yig‘uvchi, g‘azab — shahar posboni. Ularni yo‘q qilish emas, boshqarish kerak.",
    center: "Qalb — podshoh",
    ring: ["Aql — vazir", "Shahvat — soliq yig‘uvchi", "G‘azab — posbon", "Sezgilar — lashkar"],
  },
  {
    who: "both",
    kicker: "Qiyos",
    title: "Bir metafora — ikki yo‘nalish",
    text: "Forobiy tanadan shaharga boradi: maqsad — jamiyatni tartibga solish. G‘azzoliy mamlakatdan qalbga qaytadi: maqsad — insonning ichki dunyosini tartibga solish.",
    center: "Saodat",
    ring: ["Forobiy: tana → shahar", "Jamiyat islohi", "G‘azzoliy: mamlakat → qalb", "Nafs islohi"],
  },
]

export const COMPARE: { topic: string; f: string; g: string }[] = [
  { topic: "Bilim manbai", f: "Aql va mantiqiy isbot (burhon)", g: "Aql + vahiy + qalb tajribasi (zavq)" },
  { topic: "Saodat nima", f: "Aqlning kamoloti, faol aqlga yaqinlashish", g: "Allohni tanish va Unga muhabbat" },
  { topic: "Qayerda erishiladi", f: "Shu dunyoda, fozil jamiyatda", g: "Dunyoda tayyorlanadi, oxiratda to‘liq" },
  { topic: "Saodatga yo‘l", f: "Ilm, ta’lim va fazilatli siyosat", g: "Ibodat, nafs tarbiyasi, qalbni poklash" },
  { topic: "Diqqat markazi", f: "Jamiyat va davlat", g: "Shaxs va uning qalbi" },
  { topic: "Ideal rahbar", f: "Faylasuf-hukmdor", g: "Adolatli podshoh; asl «podshoh» — qalb" },
  { topic: "Falsafaga munosabat", f: "Eng oliy ilm; Aflotun va Arastuni uyg‘unlashtiradi", g: "Mantiq va matematikani qabul qiladi, metafizikani tanqid qiladi" },
  { topic: "Til va uslub", f: "Arabcha, qat’iy ilmiy uslub", g: "«Kimyoi saodat» — forscha, keng xalq uchun" },
]

export const TAHOFUT = {
  total: 20,
  meta: 16,
  nature: 4,
  charges: [
    { title: "Olam azaliy", text: "Faylasuflarning «olam qadimdan bor, yaratilmagan» degan fikri" },
    { title: "Faqat kulliyot", text: "«Alloh faqat umumiy narsalarni biladi, juz’iy hodisalarni bilmaydi» degan fikr" },
    { title: "Jismsiz qayta tirilish", text: "Oxiratda tanalar qayta tirilmaydi, faqat ruh qoladi degan fikr" },
  ],
}

export const VENN = {
  f: ["Saodatga siyosat orqali", "Faylasuf-hukmdor", "Fayz (emanatsiya) kosmologiyasi"],
  both: ["Saodat — oliy maqsad", "Ilm va axloq birligi", "Nafsni aql boshqarishi kerak", "Tana–jamiyat o‘xshatishi", "Mantiqni qadrlash"],
  g: ["Qalb va tasavvuf yo‘li", "Oxirat saodati", "Falsafiy metafizika tanqidi"],
}

export const LESSONS = [
  {
    title: "Aql va axloq birga",
    text: "Ikkala alloma ham bilimni axloqdan ajratmaydi: Forobiyda ilm fazilatga, G‘azzoliyda qalb poklanishiga olib boradi.",
  },
  {
    title: "Jamiyat shaxsdan boshlanadi",
    text: "Forobiy fozil jamiyatni, G‘azzoliy fozil insonni izlaydi. Bugun ham biri ikkinchisisiz bo‘lmaydi: yaxshi jamiyat — tarbiyalangan insonlar jamiyati.",
  },
  {
    title: "Tanqid ham — ilmiy muloqot",
    text: "G‘azzoliy Forobiyni tanqid qildi, lekin uning mantiqini qabul qildi. Fikrlar to‘qnashuvi Sharq tafakkurini boyitdi.",
  },
]

export const SOURCES = [
  "Abu Nasr Forobiy. Siyosat falsafasi. — Toshkent (o‘zbekcha nashr).",
  "Abu Nasr Forobiy. Fozil odamlar shahri. — Toshkent (o‘zbekcha nashr).",
  "Abu Homid G‘azzoliy. Kimyoi saodat (o‘zbekcha tarjima).",
  "Abu Homid G‘azzoliy. Tahofut al-falosifa (~1095).",
  "Stanford Encyclopedia of Philosophy: «Al-Farabi’s Psychology and Epistemology».",
  "Stanford Encyclopedia of Philosophy: «Al-Ghazali» (F. Griffel).",
  "Wikipedia: «The Alchemy of Happiness» (Kimiya-yi sa’adat).",
]
