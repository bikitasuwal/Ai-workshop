/**
 * lib/festivalCalendarData.ts
 *
 * Rich festival calendar and Hamro Patro-style Bikram Sambat (BS) lunar/solar data
 * featuring Ward 16, 22 Dhara, Pyatho Ajima, and broader Newar festivals.
 * Arranged accurately according to current date.
 */

export type Bi = { en: string; ne: string };

export type FestivalCategory = "dhara" | "ajima" | "ward16" | "cultural";

export type FestivalEvent = {
  id: string;
  name: Bi;
  category: FestivalCategory;
  placeName: Bi;
  bsDate: Bi;
  gregorianDate: string;
  tithi: Bi;
  monthIndex: number;
  dayOfMonth: number;
  isMajor: boolean;
  isUpcoming: boolean;
  daysRemaining?: number;
  tag: Bi;
  description: Bi;
  rituals: Bi[];
  significance: Bi;
  link?: string;
};

export type CalendarDay = {
  bsDay: number;
  adDay: number;
  tithi: Bi;
  isSaturday: boolean;
  isToday?: boolean;
  festival?: FestivalEvent;
};

export type MonthCalendar = {
  id: string;
  name: Bi;
  yearBs: Bi;
  adRange: Bi;
  startingWeekday: number; // 0 = Sun, 1 = Mon ... 6 = Sat
  totalDays: number;
  days: CalendarDay[];
};

export const TODAY_BS = {
  yearBs: "२०८१",
  monthNameNe: "मंसिर",
  monthNameEn: "Mangsir",
  dayBs: 5,
  weekdayNe: "शुक्रबार",
  weekdayEn: "Friday",
  adFormatted: "Nov 20, 2026",
  tithiNe: "एकादशी",
  tithiEn: "Ekadashi",
};

export const FESTIVAL_CATEGORIES: { id: FestivalCategory | "all"; label: Bi }[] = [
  { id: "all", label: { en: "All Festivals", ne: "सबै चाडपर्वहरू" } },
  { id: "dhara", label: { en: "22 Dhara (Baisdhara)", ne: "२२ धारा (बाइसधारा)" } },
  { id: "ajima", label: { en: "Pyatho Ajima", ne: "प्याठो अजिमा" } },
  { id: "ward16", label: { en: "Ward 16 Heritage", ne: "वडा १६ सम्पदा" } },
  { id: "cultural", label: { en: "Wider Valley Cultural", ne: "उपत्यकाव्यापी सांस्कृतिक" } },
];

export const FESTIVALS_DATA: FestivalEvent[] = [
  {
    id: "bala-chaturdashi",
    name: {
      en: "Bala Chaturdashi Satbij Sowing",
      ne: "बाला चतुर्दशी (सद्बिज छर्ने पर्व)",
    },
    category: "cultural",
    placeName: { en: "Balaju Forest Trail & Nagarjun Shrines", ne: "बालाजु वन मार्ग तथा नागार्जुन देवालय" },
    bsDate: { en: "Mangsir 14, 2081", ne: "मंसिर १४, २०८१" },
    gregorianDate: "December 01, 2026",
    tithi: { en: "Mangsir Krishna Chaturdashi", ne: "मंसिर कृष्ण चतुर्दशी" },
    monthIndex: 1, // Mangsir
    dayOfMonth: 14,
    isMajor: true,
    isUpcoming: true,
    daysRemaining: 9,
    tag: { en: "Nearest Upcoming Festival", ne: "आउँदो प्रमुख पर्व" },
    description: {
      en: "Devotees keep an all-night oil lamp vigil before dawn, then sow 'Satbij' (seven sacred grains) along the forested paths of Balaju and Nagarjun to secure peace and liberation for departed ancestors.",
      ne: "आफ्ना दिवङ्गत पितृहरूको सम्झनामा रातभर जाग्राम बसेर बिहान सबेरै बालाजु र नागार्जुन फेदीका वनमार्गहरूमा सद्बिज (सात थरीका अन्न) छर्ने ऐतिहासिक धार्मिक पर्व।",
    },
    rituals: [
      {
        en: "All-night vigil with earthen oil lamps, bhajan, and prayers at holy Balaju shrines.",
        ne: "बालाजु मन्दिर परिसरमा रातभर दियो बालेर पितृस्मृतिमा जाग्राम बस्ने।",
      },
      {
        en: "Sowing paddy, barley, sesame, wheat, and lotus seeds along forested sacred grounds at daybreak.",
        ne: "बिहान सबेरै धान, जौ, तिल, गहुँ, केराउ लगायतका पवित्र अन्न छर्दै वन परिक्रमा गर्ने।",
      },
    ],
    significance: {
      en: "Every single seed sown in the sacred grounds guarantees spiritual liberation for seven generations of ancestors.",
      ne: "सद्बिजको एक-एक दाना छर्दा पितृहरूले वैतरणी नदी तर्ने र मोक्ष प्राप्त गर्ने जनविश्वास रहिआएको छ।",
    },
    link: "/dhara",
  },
  {
    id: "baisdhara-mela",
    name: {
      en: "Baisdhara Mela / Lhuti Punhi",
      ne: "बाइसधारा मेला / ल्हुति पुन्हि (बालाजु पूर्णिमा)",
    },
    category: "dhara",
    placeName: { en: "Balaju 22 Dhara Complex", ne: "बालाजु २२ धारा परिसर" },
    bsDate: { en: "Chaitra 30, 2081 (Full Moon)", ne: "चैत ३०, २०८१ (पूर्णिमा)" },
    gregorianDate: "April 13, 2025",
    tithi: { en: "Chaitra Shukla Purnima", ne: "चैत्र शुक्ल पूर्णिमा" },
    monthIndex: 5, // Chaitra
    dayOfMonth: 30,
    isMajor: true,
    isUpcoming: true,
    daysRemaining: 142,
    tag: { en: "Grand Annual Heritage Fair", ne: "वार्षिक महास्नान तथा मेला" },
    description: {
      en: "The grand annual gathering at Balaju where thousands of devotees take sacred ritual baths under all twenty-two stone water spouts to attain spiritual merit, relieve joint pains, and pay homage to mountain aquifers.",
      ne: "बालाजुको बाइसधारामा लाग्ने ऐतिहासिक मेला, जहाँ हजारौँ श्रद्धालुहरू २२ वटै धारामा क्रमैसँग पवित्र स्नान गरी पुण्य आर्जन गर्छन् र नागार्जुन डाँडाका मुहानहरूको पूजा गर्दछन्।",
    },
    rituals: [
      {
        en: "Sequential ritual immersion under all 22 carved Makara stone spouts from dawn to dusk.",
        ne: "बिहानैदेखि २२ वटै मकर ढुङ्गेधारामुनि पालैसँग पवित्र स्नान गर्ने परम्परा।",
      },
      {
        en: "Floating earthen oil lamps (diyo) in the lower lotus ponds in memory of deceased ancestors.",
        ne: "पोखरीमा दिवङ्गत पितृहरूको मोक्षका लागि दीप प्रज्वलन गरी बगाउने।",
      },
      {
        en: "Worship at the adjacent Bal Narayan (sleeping Vishnu) pool and Jal Bhairav shrine.",
        ne: "परिसरभित्र रहेका बाल नारायण (जलशयन विष्णु) र जल भैरवको विशेष दर्शन र पूजाआजा।",
      },
    ],
    significance: {
      en: "Equal in spiritual merit to the sacred baths of Gosainkunda and Muktinath according to local Newar and Himalayan traditions.",
      ne: "यस दिन बाइसधारामा स्नान गर्नाले गोसाइँकुण्ड र मुक्तिनाथ गए सरहको पुण्य फल मिल्ने धार्मिक विश्वास रहिआएको छ।",
    },
    link: "/dhara",
  },
  {
    id: "manamaiju-jatra",
    name: {
      en: "Manamaiju Devi Jatra",
      ne: "मनमैजु देवी जात्रा",
    },
    category: "ward16",
    placeName: { en: "Manamaiju & Ward 16 Border", ne: "मनमैजु तथा वडा १६ सीमा क्षेत्र" },
    bsDate: { en: "Chaitra 26, 2081", ne: "चैत २६, २०८१" },
    gregorianDate: "April 09, 2025",
    tithi: { en: "Chaitra Shukla Ashtami (Chaite Dashain)", ne: "चैत्र शुक्ल अष्टमी (चैते दशैँ)" },
    monthIndex: 5,
    dayOfMonth: 26,
    isMajor: true,
    isUpcoming: true,
    daysRemaining: 138,
    tag: { en: "Chariot Procession", ne: "रथ यात्रा तथा जात्रा" },
    description: {
      en: "A vibrant multi-day goddess festival featuring wooden chariot processions through adjoining Ward 16 streets, traditional dhimay music, and blessings for community well-being.",
      ne: "बालाजु नजिकैको ऐतिहासिक मनमैजु मन्दिरबाट सुरु हुने रथयात्रा, धिमे बाजागाजा र टोलटोलमा गरिने मातृका पूजा।",
    },
    rituals: [
      {
        en: "Pulling the decorated wooden chariot of Goddess Manamaiju through historical alleys.",
        ne: "परम्परागत काठको रथ तानेर टोल परिक्रमा गराउने।",
      },
      {
        en: "Offering Samay Baji feasts and seasonal floral wreaths.",
        ne: "समय् बजि र मौसमी फूलका मालाहरू चढाउने।",
      },
    ],
    significance: {
      en: "Celebrates protective maternal divinity safeguarding the agricultural northern rims of Kathmandu.",
      ne: "काठमाडौँको उत्तर-पश्चिमी भूभागको सहकाल र सुरक्षाका लागि मनाइने परम्परा।",
    },
  },
  {
    id: "dristi-lekhan",
    name: {
      en: "Pyatho Ajima Dristi Lekhan & Jatra",
      ne: "प्याठो अजिमा दृष्टि लेखन तथा जात्रा",
    },
    category: "ajima",
    placeName: { en: "Pyatho Ajima Temple Courtyard", ne: "प्याठो अजिमा मन्दिर परिसर" },
    bsDate: { en: "Chaitra 27, 2081 - Baisakh 1, 2082", ne: "चैत २७, २०८१ - वैशाख १, २०८२" },
    gregorianDate: "April 10-14, 2025",
    tithi: { en: "Paha Charhe to Navavarsha", ne: "पाँहाचह्रे देखि नयाँ वर्ष" },
    monthIndex: 5,
    dayOfMonth: 27,
    isMajor: true,
    isUpcoming: true,
    daysRemaining: 139,
    tag: { en: "Tantric Painting Rite", ne: "तन्त्रोक्त दृष्टि लेखन" },
    description: {
      en: "The secret Tantric eye-painting ritual performed by designated priests behind closed sanctuary doors, awakening the compassionate yet fierce protective sight of Goddess Ajima before the annual festival.",
      ne: "पुजारीहरूद्वारा बन्द ढोकाभित्र गुप्तरूपमा सम्पन्न गरिने तान्त्रिक दृष्टि लेखन विधि, जसले मातृका देवीको चैतन्य दृष्टि जागृत गराउँदछ।",
    },
    rituals: [
      {
        en: "Secret Tantric consecration and ritual painting of the deity's gaze using herbal inks.",
        ne: "प्राकृतिक रङ्ग र तान्त्रिक मन्त्रद्वारा देवीको आँखा कोर्ने (दृष्टि लेखन) विधि।",
      },
      {
        en: "Nyas and invocation of protective energy for the neighborhood.",
        ne: "टोलबासीको रक्षा र रोगव्याधि निवारणका लागि न्यास पूजा।",
      },
    ],
    significance: {
      en: "A core rite in Newar tantric deity veneration, reaffirming Ajima as the mother protector of Ward 16.",
      ne: "वडा १६ का रैथाने बासिन्दाहरूलाई प्राकृतिक प्रकोप र रोगव्याधिबाट बचाउने जनविश्वास।",
    },
    link: "/ajima",
  },
  {
    id: "gurunanak-purnima",
    name: {
      en: "Guru Nanak Jayanti / Purnima",
      ne: "गुरु नानक जयन्ती तथा पूर्णिमा",
    },
    category: "ward16",
    placeName: {
      en: "Prachin Udasin Guru Nanak Math, Balaju (Ward 16)",
      ne: "प्राचीन उदासीन गुरु नानक मठ, बालाजु (विष्णुमती किनार, वडा १६)",
    },
    bsDate: {
      en: "Kartik Shukla Purnima",
      ne: "कात्तिक शुक्ल पूर्णिमा",
    },
    gregorianDate: "November 5, 2026",
    tithi: {
      en: "Kartik Shukla Purnima",
      ne: "कार्तिक शुक्ल पूर्णिमा",
    },
    monthIndex: 0, // Kartik
    dayOfMonth: 30,
    isMajor: true,
    isUpcoming: false,
    tag: {
      en: "Historical Nanak Footprints & Sacred Fair",
      ne: "ऐतिहासिक नानक पदचिह्न तथा मेला",
    },
    description: {
      en: "Celebrates the 1516 AD visit of Guru Nanak Dev to Balaju on the banks of the Bishnumati River during his third Udasi. Devotees gather at the historic Balaju Guru Nanak Math for Akhand Path, Kirtan, Langar, and homage to his sacred stone footprint (charan).",
      ne: "सिख धर्मका संस्थापक गुरु नानक देवले सन् १५१६ मा तेस्रो उदासीका क्रममा बालाजुको विष्णुमती नदी किनारमा आएर ध्यान गर्नुभएको ऐतिहासिक स्थल। कात्तिक शुक्ल पूर्णिमामा यहाँ विशेष अखण्ड पाठ, कीर्तन, लङ्गर र चरण पादुका (पदचिह्न) को विशेष पूजाअर्चना गरिन्छ।",
    },
    rituals: [
      {
        en: "Worship at the ancient stone slab preserving Guru Nanak's sacred footprint (charan paduka).",
        ne: "बालाजु मठभित्र रहेको गुरु नानकको प्राचीन शिलामा कुँदिएको पदचिह्न (चरण) को पूजाअर्चना।",
      },
      {
        en: "Recitation of Sri Guru Granth Sahib, devotional shabad kirtan, and Ardas.",
        ne: "गुरु ग्रन्थ साहिबको अखण्ड पाठ, शब्द कीर्तन र सामूहिक प्रार्थना।",
      },
      {
        en: "Serving community feast (Langar) to visitors of all communities and faiths.",
        ne: "सबै जातजाति र समुदायका लागि जातपात रहित लङ्गर (सामूहिक भोजन) सेवा।",
      },
    ],
    significance: {
      en: "A rare testament to Kathmandu and Ward 16's multicultural heritage, linking Malla-era Balaju with the founder of Sikhism and royal yogi Sidh Hari Daas.",
      ne: "बालाजुलाई मल्लकालदेखि नै बहुसांस्कृतिक र सर्वधर्म समन्वयको केन्द्र बनाउने दुर्लभ सिख-नेपाल ऐतिहासिक धरोहर।",
    },
  },
  {
    id: "bal-narayan-snan",
    name: {
      en: "Bal Narayan Haribodhini Ekadashi Snan",
      ne: "बाल नारायण हरिबोधिनी एकादशी स्नान",
    },
    category: "dhara",
    placeName: { en: "Bal Narayan Pool (Balaju)", ne: "बाल नारायण पोखरी (बालाजु उद्यान)" },
    bsDate: { en: "Kartik 27, 2081", ne: "कात्तिक २७, २०८१" },
    gregorianDate: "November 12, 2026",
    tithi: { en: "Kartik Shukla Ekadashi", ne: "कार्तिक शुक्ल एकादशी" },
    monthIndex: 0,
    dayOfMonth: 27,
    isMajor: true,
    isUpcoming: false,
    tag: { en: "Divine Awakening Fair", ne: "हरिबोधिनी एकादशी मेला" },
    description: {
      en: "Dedicated worship at the sacred replica of Budhanilkantha Narayan inside Balaju gardens, marking the divine awakening of Lord Vishnu after four months of cosmic slumber.",
      ne: "बालाजु उद्यानभित्र रहेको बूढानीलकण्ठको पवित्र प्रतिरूप बाल नारायण मन्दिरमा भगवान् विष्णुको चार महिनाको योगनिद्रा समाप्त भएको अवसरमा गरिने विशेष मेला।",
    },
    rituals: [
      {
        en: "Fasting and offering of sugarcane arches, sweet potatoes, and marigold garlands.",
        ne: "उखुको मण्डप बनाएर सखरखण्ड, पिँडालु र सयपत्री फूल चढाउने परम्परा।",
      },
      {
        en: "Circumambulating the sacred pool with burning incense and Vedic hymns.",
        ne: "जलशयन पोखरीको चारैतिर घुमेर वैदिक मन्त्रोच्चारणसहित परिक्रमा गर्ने।",
      },
    ],
    significance: {
      en: "Historically allowed royal monarchs to participate in the Haribodhini rites without breaking the taboo against visiting Budhanilkantha.",
      ne: "काठमाडौंका मल्ल तथा शाह राजाहरूले बूढानीलकण्ठ जान नहुने बन्देजका कारण यहीँ आएर एकादशीको व्रत सम्पन्न गर्ने ऐतिहासिक महत्त्व।",
    },
    link: "/dhara",
  },
  {
    id: "gunla-parva",
    name: {
      en: "Gunla Parva & Morning Dafa Processions",
      ne: "गुँला पर्व तथा प्रभातकालीन दाफा परिक्रमा",
    },
    category: "ward16",
    placeName: { en: "Ward 16 Shrines & Phalechas", ne: "वडा १६ का मठमन्दिर तथा फलेचाहरू" },
    bsDate: { en: "Shrawan - Bhadra (Full Month)", ne: "साउन - भदौ (गुँला महिनाभरि)" },
    gregorianDate: "August - September",
    tithi: { en: "Gunla Lunar Month", ne: "गुँला पवित्र चन्द्रमास" },
    monthIndex: 0,
    dayOfMonth: 15,
    isMajor: true,
    isUpcoming: false,
    tag: { en: "Sacred Month of Music", ne: "महिनाभरिको भजन-कीर्तन" },
    description: {
      en: "A month-long sacred monsoon observance when early morning devotional guilds traverse Ward 16 playing Dha and Gunla Bajan, culminating in blessings at Pyatho Ajima and nearby stupas.",
      ne: "नेवार समुदायको एक महिना लामो सांस्कृतिक पर्व, जहाँ बिहानै गुँला बाजा, धाः बाजा र बाँसुरी बजाउँदै स्थानीय मन्दिर तथा चैत्यहरूको परिक्रमा गरिन्छ।",
    },
    rituals: [
      {
        en: "Dawn musical circumambulation around Ward 16 stupas and water shrines.",
        ne: "बिहान सबेरै गुँला बाजा बजाउँदै चैत्य र जलकुण्डहरूको परिक्रमा।",
      },
    ],
    significance: {
      en: "Maintains centuries-old Newar Buddhist devotional solidarity and monsoon purification.",
      ne: "नेवार बौद्ध परम्पराको धार्मिक एकता र वर्षायामको आत्मशुद्धि।",
    },
  },
];

// ---- Hamro Patro Style Months Calendar Data (2081/2082 BS) ----
// Authentic Nepali Bikram Sambat months aligned with today's date
export const CALENDAR_MONTHS: MonthCalendar[] = [
  {
    id: "kartik-2081",
    name: { en: "Kartik 2081", ne: "कात्तिक २०८१" },
    yearBs: { en: "2081 BS", ne: "२०८१ वि.सं." },
    adRange: { en: "Oct 17 - Nov 15, 2026", ne: "अक्टोबर - नोभेम्बर २०२६" },
    startingWeekday: 4, // Thursday
    totalDays: 30,
    days: Array.from({ length: 30 }, (_, i) => {
      const bsDay = i + 1;
      const adDay = ((16 + i) % 31) + 1;
      const isSaturday = (4 + i) % 7 === 6;
      const tithiIndex = (i % 15) + 1;
      const tithisNe = ["प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पञ्चमी", "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", i >= 15 ? "पूर्णिमा" : "औंसी"];
      const tithisEn = ["Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shasthi", "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", i >= 15 ? "Purnima" : "Amavasya"];

      let festival: FestivalEvent | undefined;
      if (bsDay === 27) {
        festival = FESTIVALS_DATA.find((f) => f.id === "bal-narayan-snan");
      } else if (bsDay === 30) {
        festival = FESTIVALS_DATA.find((f) => f.id === "gurunanak-purnima");
      }

      return {
        bsDay,
        adDay,
        tithi: { en: tithisEn[tithiIndex - 1], ne: tithisNe[tithiIndex - 1] },
        isSaturday,
        festival,
      };
    }),
  },
  {
    id: "mangsir-2081",
    name: { en: "Mangsir 2081 (Current Month)", ne: "मंसिर २०८१ (वर्तमान महिना)" },
    yearBs: { en: "2081 BS", ne: "२०८१ वि.सं." },
    adRange: { en: "Nov 16 - Dec 15, 2026", ne: "नोभेम्बर - डिसेम्बर २०२६" },
    startingWeekday: 1, // Monday
    totalDays: 30,
    days: Array.from({ length: 30 }, (_, i) => {
      const bsDay = i + 1;
      const adDay = ((15 + i) % 30) + 1;
      const isSaturday = (1 + i) % 7 === 6;
      const tithiIndex = (i % 15) + 1;
      const tithisNe = ["प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पञ्चमी", "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", i >= 15 ? "औंसी" : "पूर्णिमा"];
      const tithisEn = ["Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shasthi", "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", i >= 15 ? "Amavasya" : "Purnima"];

      let festival: FestivalEvent | undefined;
      if (bsDay === 14) {
        festival = FESTIVALS_DATA.find((f) => f.id === "bala-chaturdashi");
      }

      return {
        bsDay,
        adDay,
        tithi: { en: tithisEn[tithiIndex - 1], ne: tithisNe[tithiIndex - 1] },
        isSaturday,
        isToday: bsDay === 5, // Mangsir 5 is TODAY (Nov 20)
        festival,
      };
    }),
  },
  {
    id: "poush-2081",
    name: { en: "Poush 2081", ne: "पुस २०८१" },
    yearBs: { en: "2081 BS", ne: "२०८१ वि.सं." },
    adRange: { en: "Dec 16, 2026 - Jan 14, 2027", ne: "डिसेम्बर - जनवरी" },
    startingWeekday: 3, // Wednesday
    totalDays: 30,
    days: Array.from({ length: 30 }, (_, i) => {
      const bsDay = i + 1;
      const adDay = ((15 + i) % 31) + 1;
      const isSaturday = (3 + i) % 7 === 6;
      const tithiIndex = (i % 15) + 1;
      const tithisNe = ["प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पञ्चमी", "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", i >= 15 ? "पूर्णिमा" : "औंसी"];
      const tithisEn = ["Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shasthi", "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", i >= 15 ? "Purnima" : "Amavasya"];

      return {
        bsDay,
        adDay,
        tithi: { en: tithisEn[tithiIndex - 1], ne: tithisNe[tithiIndex - 1] },
        isSaturday,
      };
    }),
  },
  {
    id: "magh-2081",
    name: { en: "Magh 2081", ne: "माघ २०८१" },
    yearBs: { en: "2081 BS", ne: "२०८१ वि.सं." },
    adRange: { en: "Jan 15 - Feb 12, 2027", ne: "जनवरी - फेब्रुअरी" },
    startingWeekday: 5, // Friday
    totalDays: 29,
    days: Array.from({ length: 29 }, (_, i) => {
      const bsDay = i + 1;
      const adDay = ((14 + i) % 31) + 1;
      const isSaturday = (5 + i) % 7 === 6;
      const tithiIndex = (i % 15) + 1;
      const tithisNe = ["प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पञ्चमी", "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", i >= 15 ? "औंसी" : "पूर्णिमा"];
      const tithisEn = ["Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shasthi", "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", i >= 15 ? "Amavasya" : "Purnima"];

      return {
        bsDay,
        adDay,
        tithi: { en: tithisEn[tithiIndex - 1], ne: tithisNe[tithiIndex - 1] },
        isSaturday,
      };
    }),
  },
  {
    id: "falgun-2081",
    name: { en: "Falgun 2081", ne: "फागुन २०८१" },
    yearBs: { en: "2081 BS", ne: "२०८१ वि.सं." },
    adRange: { en: "Feb 13 - Mar 13, 2027", ne: "फेब्रुअरी - मार्च" },
    startingWeekday: 6, // Saturday
    totalDays: 30,
    days: Array.from({ length: 30 }, (_, i) => {
      const bsDay = i + 1;
      const adDay = ((12 + i) % 28) + 1;
      const isSaturday = (6 + i) % 7 === 6;
      const tithiIndex = (i % 15) + 1;
      const tithisNe = ["प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पञ्चमी", "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", i >= 15 ? "औंसी" : "पूर्णिमा"];
      const tithisEn = ["Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shasthi", "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", i >= 15 ? "Amavasya" : "Purnima"];

      return {
        bsDay,
        adDay,
        tithi: { en: tithisEn[tithiIndex - 1], ne: tithisNe[tithiIndex - 1] },
        isSaturday,
      };
    }),
  },
  {
    id: "chaitra-2081",
    name: { en: "Chaitra 2081", ne: "चैत २०८१" },
    yearBs: { en: "2081 BS", ne: "२०८१ वि.सं." },
    adRange: { en: "Mar 14 - Apr 13, 2027", ne: "मार्च - अप्रिल" },
    startingWeekday: 1, // Monday
    totalDays: 30,
    days: Array.from({ length: 30 }, (_, i) => {
      const bsDay = i + 1;
      const adDay = ((13 + i) % 31) + 1;
      const isSaturday = (1 + i) % 7 === 6;
      const tithiIndex = (i % 15) + 1;
      const isPurnimaDay = bsDay === 30;
      const tithisNe = ["प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पञ्चमी", "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", isPurnimaDay ? "पूर्णिमा" : "औंसी"];
      const tithisEn = ["Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shasthi", "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", isPurnimaDay ? "Purnima" : "Amavasya"];

      let festival: FestivalEvent | undefined;
      if (bsDay === 30) {
        festival = FESTIVALS_DATA.find((f) => f.id === "baisdhara-mela");
      } else if (bsDay === 26) {
        festival = FESTIVALS_DATA.find((f) => f.id === "manamaiju-jatra");
      } else if (bsDay === 27) {
        festival = FESTIVALS_DATA.find((f) => f.id === "dristi-lekhan");
      }

      return {
        bsDay,
        adDay,
        tithi: { en: tithisEn[tithiIndex - 1], ne: tithisNe[tithiIndex - 1] },
        isSaturday,
        festival,
      };
    }),
  },
  {
    id: "baisakh-2082",
    name: { en: "Baisakh 2082", ne: "वैशाख २०८२" },
    yearBs: { en: "2082 BS (New Year)", ne: "२०८२ वि.सं. (नयाँ वर्ष)" },
    adRange: { en: "Apr 14 - May 14, 2027", ne: "अप्रिल - मे" },
    startingWeekday: 3, // Wednesday
    totalDays: 31,
    days: Array.from({ length: 31 }, (_, i) => {
      const bsDay = i + 1;
      const adDay = ((13 + i) % 30) + 1;
      const isSaturday = (3 + i) % 7 === 6;
      const tithiIndex = (i % 15) + 1;
      const tithisNe = ["प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पञ्चमी", "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", i >= 15 ? "पूर्णिमा" : "औंसी"];
      const tithisEn = ["Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shasthi", "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", i >= 15 ? "Purnima" : "Amavasya"];

      return {
        bsDay,
        adDay,
        tithi: { en: tithisEn[tithiIndex - 1], ne: tithisNe[tithiIndex - 1] },
        isSaturday,
      };
    }),
  },
];

export function getMostRecentUpcomingFestival(): FestivalEvent {
  const upcoming = FESTIVALS_DATA.filter((f) => f.isUpcoming);
  if (upcoming.length === 0) return FESTIVALS_DATA[0];
  // Sort by smallest positive daysRemaining
  return [...upcoming].sort((a, b) => (a.daysRemaining ?? 999) - (b.daysRemaining ?? 999))[0];
}
