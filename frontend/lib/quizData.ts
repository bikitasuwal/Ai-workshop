import type { Evidence } from "./content";

export type QuizTopic = "all" | "dhara" | "ajima" | "festival";

export type Question = {
  id: string;
  topic: "dhara" | "ajima" | "festival";
  question: {
    en: string;
    ne: string;
  };
  options: {
    en: string[];
    ne: string[];
  };
  correctIndex: number;
  evidence: Evidence;
  explanation: {
    en: string;
    ne: string;
  };
  sourceKey?: string;
  relatedUrl?: string;
};

export type DetectiveCard = {
  id: string;
  claim: {
    en: string;
    ne: string;
  };
  correctEvidence: Evidence;
  explanation: {
    en: string;
    ne: string;
  };
};

export type SpoutGroup = {
  id: string;
  spouts: number[];
  title: {
    en: string;
    ne: string;
  };
  subtitle: {
    en: string;
    ne: string;
  };
  detail: {
    en: string;
    ne: string;
  };
  note: {
    en: string;
    ne: string;
  };
};

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: "q-spout-count",
    topic: "dhara",
    question: {
      en: "How many stone spouts are traditionally counted in the Balaju water complex?",
      ne: "बालाजुको ऐतिहासिक जलप्रणालीमा परम्परागत रूपमा कतिवटा ढुङ्गेधाराहरू छन्?",
    },
    options: {
      en: ["12 spouts", "18 spouts", "22 spouts", "24 spouts"],
      ne: ["१२ धारा", "१८ धारा", "२२ धारा", "२४ धारा"],
    },
    correctIndex: 2,
    evidence: "documented",
    explanation: {
      en: "22 Dhara (Baisdhara) is named after its 22 intricately carved stone spouts (dhunge dhara) positioned beneath the Nagarjun forest slope.",
      ne: "२२ धारा (बैसधारा) को नाम नागार्जुन डाँडाको फेदीमा रहेका २२ वटा कलात्मक ढुङ्गेधाराहरूबाट रहन गएको हो।",
    },
    sourceKey: "A",
    relatedUrl: "/dhara",
  },
  {
    id: "q-malla-builder",
    topic: "dhara",
    question: {
      en: "According to widely reported royal history, which king is said to have built the first 21 spouts around Nepal Sambat 875?",
      ne: "प्रचलित समाचार र जनविश्वास अनुसार नेपाल संवत् ८७५ तिर २१ वटा धाराहरू कुन राजाले निर्माण गराएका थिए?",
    },
    options: {
      en: ["King Pratap Malla", "King Jaya Prakash Malla", "King Bhupatindra Malla", "King Yaksha Malla"],
      ne: ["राजा प्रताप मल्ल", "राजा जयप्रकाश मल्ल", "राजा भूपतीन्द्र मल्ल", "राजा यक्ष मल्ल"],
    },
    correctIndex: 1,
    evidence: "reported",
    explanation: {
      en: "News reports widely credit King Jaya Prakash Malla with 21 spouts. However, no primary inscription or archival record has yet verified this claim.",
      ne: "विभिन्न समाचार र इतिहासका पुस्तकमा राजा जयप्रकाश मल्लले २१ धारा बनाएको उल्लेख पाइन्छ, यद्यपि यसको प्राथमिक शिलालेखीय प्रमाण अझै भेटिएको छैन।",
    },
    sourceKey: "A",
    relatedUrl: "/dhara",
  },
  {
    id: "q-shah-extra-spout",
    topic: "dhara",
    question: {
      en: "Who is commonly reported to have added the 22nd spout to the Balaju water complex in 1855 BS?",
      ne: "वि.सं. १८५५ मा २२ औँ धारा कसले थपेको भनी समाचार तथा जनविश्वासमा उल्लेख गरिन्छ?",
    },
    options: {
      en: ["King Rana Bahadur Shah", "King Prithvi Narayan Shah", "King Tribhuvan", "King Girvan Yuddha Shah"],
      ne: ["राजा रणबहादुर शाह", "राजा पृथ्वीनारायण शाह", "राजा त्रिभुवन", "राजा गिर्वाणयुद्ध शाह"],
    },
    correctIndex: 0,
    evidence: "reported",
    explanation: {
      en: "Many published accounts attribute the extra spout to King Rana Bahadur Shah in 1855 BS, although some recent reports mention different origins.",
      ne: "अधिकांश विवरणहरूले वि.सं. १८५५ मा राजा रणबहादुर शाहले थप एउटा धारा निर्माण गरेको बताउँछन्।",
    },
    sourceKey: "B",
    relatedUrl: "/dhara",
  },
  {
    id: "q-nagarjun-forest",
    topic: "dhara",
    question: {
      en: "Which hill forest ecosystem naturally feeds the historic spring water system of Balaju 22 Dhara?",
      ne: "बालाजु २२ धाराको ऐतिहासिक पानीको प्राकृतिक मुहान कुन पहाडी वनक्षेत्रसँग सम्बन्धित छ?",
    },
    options: {
      en: ["Shivapuri Hill", "Chandragiri Hill", "Nagarjun (Raniban) forest", "Phulchowki Hill"],
      ne: ["शिवपुरी डाँडा", "चन्द्रागिरि डाँडा", "नागार्जुन (रानीबन) जंगल", "फूलचोकी डाँडा"],
    },
    correctIndex: 2,
    evidence: "documented",
    explanation: {
      en: "The Balaju water complex sits at the southern base of Nagarjun forest, tapping natural springs routed through traditional channels.",
      ne: "बालाजु जलप्रणाली नागार्जुन वनको फेदीमा अवस्थित छ, जहाँ परम्परागत मुहान र राजकुलोमार्फत पानी धाराहरूमा ल्याइन्थ्यो।",
    },
    sourceKey: "A",
    relatedUrl: "/dhara",
  },
  {
    id: "q-skin-belief",
    topic: "dhara",
    question: {
      en: "How does the research archive classify the popular claim that bathing in 22 Dhara cures skin ailments?",
      ne: "धाराको पानीमा नुहाउनाले छालाको रोग निको हुन्छ भन्ने जनविश्वासलाई यस अनुसन्धानले कुन श्रेणीमा राखेको छ?",
    },
    options: {
      en: [
        "A medically certified therapy",
        "A traditional religious belief, not scientific health advice",
        "A proven pharmaceutical cure",
        "An illegal health rumor",
      ],
      ne: [
        "एक चिकित्सकीय रूपमा प्रमाणित उपचार",
        "धार्मिक आस्था मात्र, वैज्ञानिक वा चिकित्सा तथ्य होइन",
        "एक प्रमाणित औषधि",
        "एक गैरकानूनी हल्ला",
      ],
    },
    correctIndex: 1,
    evidence: "belief",
    explanation: {
      en: "The healing association is a sacred folk belief. It is not scientifically verified treatment and should never be used as a replacement for medical care.",
      ne: "रोग निको हुने कुरा परम्परागत धार्मिक आस्था हो। यो वैज्ञानिक रूपमा प्रमाणित उपचार होइन र यसलाई चिकित्सा सल्लाह मान्न सकिँदैन।",
    },
    sourceKey: "A",
    relatedUrl: "/sources",
  },
  {
    id: "q-who-is-ajima",
    topic: "ajima",
    question: {
      en: "In Newar cultural tradition, who is Pyah Thwam Ajima (Shitala Mai)?",
      ne: "नेवार सांस्कृतिक परम्परामा प्याः थ्वँ अजिमा (शीतला माई) को हुन्?",
    },
    options: {
      en: [
        "A legendary Malla dynasty queen",
        "A divine protective mother-goddess in Newar religion",
        "A Buddhist scholar nun",
        "A modern forest protector deity",
      ],
      ne: [
        "मल्लवंशकी एक ऐतिहासिक महारानी",
        "नेवार धर्म र संस्कृतिमा पुजिने रक्षक मातृदेवी",
        "एक बौद्ध विदुषी भिक्षुणी",
        "एक आधुनिक वनदेवी",
      ],
    },
    correctIndex: 1,
    evidence: "documented",
    explanation: {
      en: "'Ajima' means a protective maternal divine figure. The shrine stands inside Balaju Park and is worshipped by both Hindu and Buddhist devotees.",
      ne: "'अजिमा' भन्नाले रक्षक मातृदेवीलाई बुझाउँछ। बालाजु पार्कभित्र रहेको यस मन्दिरमा हिन्दू र बौद्ध दुवै समुदायले श्रद्धापूर्वक पूजा गर्दछन्।",
    },
    sourceKey: "D",
    relatedUrl: "/ajima",
  },
  {
    id: "q-dristi-lekhan",
    topic: "ajima",
    question: {
      en: "During Lhuti Purnima, which Guthi community performs 'Dristi Lekhan' (painting the sacred eyes of the goddess)?",
      ne: "ल्हुति पुन्हिका अवसरमा अजिमाको पवित्र आँखा र भौँ रंगाउने 'दृष्टि लेखन' विधि कुन समुदायको गुठीले गर्दछ?",
    },
    options: {
      en: ["Pũ (Chitrakar) painters", "Shakya goldsmiths", "Khadgi musicians", "Maharjan farmers"],
      ne: ["पौ (चित्रकार) गुठीका कलाकारहरू", "शाक्य स्वर्णकारहरू", "खड्गी संगीतकारहरू", "महर्जन कृषकहरू"],
    },
    correctIndex: 0,
    evidence: "oral",
    explanation: {
      en: "Artists of the Pũ (Chitrakar) Guthi traditionally paint the eyes and eyebrows of the goddess during Lhuti Purnima before public viewing opens.",
      ne: "पौ (चित्रकार) समुदायका गुठियारहरूले ल्हुति पुन्हिको अवसरमा परम्परागत रीतअनुसार अजिमाको आँखा र भौँ रंगाउने (दृष्टि लेखन) गर्छन्।",
    },
    sourceKey: "D",
    relatedUrl: "/ajima",
  },
  {
    id: "q-pyah-thwam-meaning",
    topic: "ajima",
    question: {
      en: "According to local oral legend, what do the Newar words 'Pyah' and 'Thwam' refer to?",
      ne: "स्थानीय जनश्रुति अनुसार 'प्याः' र 'थ्वँ' शब्दले के अर्थ बोकेको विश्वास गरिन्छ?",
    },
    options: {
      en: [
        "Light and river",
        "Thirst (Pyah) and traditional rice brew (Thwam)",
        "Lotus and temple roof",
        "Gold and silver bells",
      ],
      ne: [
        "उज्यालो र नदी",
        "तिर्खा (प्याः) र परम्परागत जाँड/मदिरा (थ्वँ)",
        "कमल र मन्दिरको गजुर",
        "सुन र चाँदीका घण्टीहरू",
      ],
    },
    correctIndex: 1,
    evidence: "oral",
    explanation: {
      en: "Local storytelling links 'Pyah' (thirst) and 'Thwam' (rice beer) to an oral tale of severe drought and epidemic, though ancient written scripts have not confirmed it.",
      ne: "स्थानीय लोककथा अनुसार 'प्याः' ले तिर्खा र 'थ्वँ' ले चामलको पेयलाई जनाउँछ, जसलाई प्राचीन अनिकाल र महामारीको कथासँग जोडिन्छ।",
    },
    sourceKey: "D",
    relatedUrl: "/ajima",
  },
  {
    id: "q-festival-name",
    topic: "festival",
    question: {
      en: "What is the traditional Newar name of the annual full-moon festival celebrated at Balaju 22 Dhara?",
      ne: "बालाजु २२ धारामा मनाइने वार्षिक पूर्णिमा मेलालाई नेवार परम्परामा के भनिन्छ?",
    },
    options: {
      en: ["Yomari Punhi", "Lhuti Punhi (ल्हुति पुन्हि)", "Gunla Parva", "Siti Nakha"],
      ne: ["योमरी पुन्हि", "ल्हुति पुन्हि", "गुँला पर्व", "सिथि नखः"],
    },
    correctIndex: 1,
    evidence: "documented",
    explanation: {
      en: "The festival is celebrated as Lhuti Punhi (also Baisdhara Mela), when thousands gather for ritual bathing, blessings, and cultural festivities.",
      ne: "यस उत्सवलाई नेवार संस्कृतिमा 'ल्हुति पुन्हि' (बैसधारा मेला) भनिन्छ, जहाँ हजारौँ भक्तजनहरू पवित्र स्नान र आराधनाका लागि उपस्थित हुन्छन्।",
    },
    sourceKey: "A",
    relatedUrl: "/festival",
  },
  {
    id: "q-diya-lamps",
    topic: "festival",
    question: {
      en: "What sacred ritual do visitors perform during the festival in remembrance of deceased family members?",
      ne: "मेलामा आफ्ना दिवंगत पितृ तथा आफन्तको स्मृतिमा भक्तजनहरूले कुन परम्परागत कार्य गर्दछन्?",
    },
    options: {
      en: [
        "Floating paper kites",
        "Lighting earthen oil and butter lamps (दिया/पालो)",
        "Singing harvest songs only",
        "Fasting for a week",
      ],
      ne: [
        "चङ्गा उडाउने",
        "घिउ वा तेलका दिया (दियो/पालो) बाल्ने",
        "बाली काट्ने गीत मात्र गाउने",
        "एक हप्ता उपवास बस्ने",
      ],
    },
    correctIndex: 1,
    evidence: "reported",
    explanation: {
      en: "Devotees light earthen butter lamps (diya) along the spouts and water channels in peaceful tribute to departed ancestors.",
      ne: "भक्तजनहरूले दिवंगत पितृहरूको चीरशान्तिका लागि धारा परिसरमा श्रद्धापूर्वक दियो बालेर बगाउने गर्दछन्।",
    },
    sourceKey: "A",
    relatedUrl: "/festival",
  },
];

export const DETECTIVE_CARDS: DetectiveCard[] = [
  {
    id: "d1",
    claim: {
      en: "Balaju water complex contains exactly 22 carved stone spouts (dhunge dhara) positioned along the garden terrace.",
      ne: "बालाजुको धारा परिसरमा बगैँचाको पर्खालमा लहरै २२ वटा ढुङ्गेधाराहरू निर्मित छन्।",
    },
    correctEvidence: "documented",
    explanation: {
      en: "Documented fact: physical architecture, municipal surveys, and consistent published records confirm the 22 spouts.",
      ne: "प्रमाणित तथ्य: भौतिक संरचना, नापी तथा ऐतिहासिक अध्ययनहरूले २२ वटा ढुङ्गेधाराको अवस्थितिलाई प्रमाणित गर्दछ।",
    },
  },
  {
    id: "d2",
    claim: {
      en: "King Jaya Prakash Malla commissioned 21 spouts around NS 875, and King Rana Bahadur Shah added the final spout in 1855 BS.",
      ne: "राजा जयप्रकाश मल्लले नेपाल संवत् ८७५ मा २१ धारा बनाए र वि.सं. १८५५ मा राजा रणबहादुर शाहले अन्तिम धारा थपे।",
    },
    correctEvidence: "reported",
    explanation: {
      en: "Commonly reported: widely repeated in modern journalism and guidebooks, but no primary royal inscription or archival record has confirmed it.",
      ne: "समाचार विवरण: पत्रपत्रिका र पुस्तकहरूमा धेरै दोहोरिएको भए तापनि यसको कुनै प्राचीन शिलालेख वा अभिलेख अझै फेला परेको छैन।",
    },
  },
  {
    id: "d3",
    claim: {
      en: "During Lhuti Purnima, the Pũ (Chitrakar) Guthi performs the sacred 'Dristi Lekhan' ritual to paint the goddess's eyes.",
      ne: "ल्हुति पुन्हिका दिन पौ (चित्रकार) गुठीले परम्परागत विधिअनुसार अजिमाको आँखामा दृष्टि लेखन गर्दछ।",
    },
    correctEvidence: "oral",
    explanation: {
      en: "Oral tradition: sustained directly by community Guthi practitioners and local testimony; details must be respected and verified directly with the artisans.",
      ne: "मौखिक परम्परा: यो समुदाय र गुठियारहरूले पुस्तान्तरण गरेको परम्परा हो, जसलाई गुठी सदस्यहरूसँग परामर्श गरी पुष्टि गर्नुपर्छ।",
    },
  },
  {
    id: "d4",
    claim: {
      en: "Bathing in the waters of 22 Dhara purifies sins and holds spiritual merit equal to Muktinath and Gosaikunda.",
      ne: "२२ धारामा स्नान गर्नाले पाप नाश हुन्छ र मुक्तिनाथ तथा गोसाइँकुण्ड सरह पुण्य प्राप्त हुन्छ।",
    },
    correctEvidence: "belief",
    explanation: {
      en: "Religious belief: a sacred matter of personal and communal faith, not an empirical or scientific fact.",
      ne: "धार्मिक आस्था: यो भक्तजनहरूको गहिरो आस्था र धार्मिक विश्वास हो, कुनै भौतिक वा वैज्ञानिक तथ्य होइन।",
    },
  },
  {
    id: "d5",
    claim: {
      en: "Drinking spout water cures skin diseases and clears fever without need for medical diagnosis.",
      ne: "धाराको पानी पिउनाले वा नुहाउनाले छालाको रोग र ज्वरो कुनै औषधिबिना नै निको हुन्छ।",
    },
    correctEvidence: "belief",
    explanation: {
      en: "Religious belief: traditional belief only; without lab water-quality testing and clinical trials, it must never be taken as health advice.",
      ne: "धार्मिक आस्था: यो लोकविश्वास मात्र हो; वैज्ञानिक परीक्षणबिना यसलाई चिकित्सा उपचार वा पिउन योग्य प्रमाणित मान्न सकिँदैन।",
    },
  },
  {
    id: "d6",
    claim: {
      en: "The annual festival date alternates between Chaitra Shukla Purnima and Baisakh full moon depending on news reports.",
      ne: "वार्षिक मेलाको मितिबारे प्रकाशित स्रोतहरू बाझिएका छन्—कहीँ चैत्र शुक्ल पूर्णिमा त कहीँ वैशाख पूर्णिमा लेखिएको छ।",
    },
    correctEvidence: "verify",
    explanation: {
      en: "Please confirm: published accounts give contradictory dates; visitors should always check the exact date with the local Guthi or festival committee.",
      ne: "पुष्टि गर्नुपर्ने: प्रकाशित प्रतिवेदनहरूमा मिति फरक उल्लेख भएकाले स्थानीय गुठी र आयोजक समितिसँग मिति निश्चित गर्नुपर्छ।",
    },
  },
];

export const SPOUT_GROUPS: SpoutGroup[] = [
  {
    id: "spouts-1-5",
    spouts: [1, 2, 3, 4, 5],
    title: {
      en: "Spouts 1 – 5: Northern Spring Inflow",
      ne: "धारा १ – ५: उत्तरी मुहान र जलागम",
    },
    subtitle: {
      en: "Natural forest runoff from Nagarjun Hill",
      ne: "नागार्जुन पहाडको प्राकृतिक मुहान",
    },
    detail: {
      en: "These spouts receive cool groundwater channeled through subterranean stone aqueducts originating in the Nagarjun reserve forest.",
      ne: "यी धाराहरूमा नागार्जुन संरक्षित वनबाट आउने शीतल भूमिगत पानी परम्परागत ढुङ्गे कुलोमार्फत ल्याइन्छ।",
    },
    note: {
      en: "Carvings depict Makara (mythical aquatic creatures) with open jaws symbolising auspicious flow.",
      ne: "धाराका टुटीहरूमा मकर (जलचर प्राणी) को कलात्मक मुख कुँदिएको छ जसले शुभ जलप्रवाह जनाउँछ।",
    },
  },
  {
    id: "spouts-6-10",
    spouts: [6, 7, 8, 9, 10],
    title: {
      en: "Spouts 6 – 10: The Sacred Bathing Terrace",
      ne: "धारा ६ – १०: पवित्र स्नान चोक",
    },
    subtitle: {
      en: "Pilgrims' initial cleansing station",
      ne: "तीर्थयात्रीहरूको प्रारम्भिक स्नान क्षेत्र",
    },
    detail: {
      en: "Devotees starting the full 22-spout ritual walk sequentially along this central paved pathway to receive blessings from every spout.",
      ne: "२२ धाराको पूर्ण स्नान अनुष्ठान गर्ने भक्तजनहरूले यहाँबाट क्रमशः हिँड्दै हरेक धाराको जल ग्रहण गर्दछन्।",
    },
    note: {
      en: "The stonework displays traditional Newar relief moldings along the perimeter walls.",
      ne: "पर्खालमा परम्परागत नेवारी ढुङ्गाकला र ज्यामितीय किनारहरू कुँदिएका छन्।",
    },
  },
  {
    id: "spouts-11-15",
    spouts: [11, 12, 13, 14, 15],
    title: {
      en: "Spouts 11 – 15: Heart of Baisdhara",
      ne: "धारा ११ – १५: बैसधाराको केन्द्र भाग",
    },
    subtitle: {
      en: "Where lamps float during Lhuti Punhi",
      ne: "ल्हुति पुन्हिमा बत्ती बगाइने मुख्य स्थान",
    },
    detail: {
      en: "During the annual festival, earthen butter lamps (diya) line the drainage flumes below these spouts, illuminating the night.",
      ne: "वार्षिक मेलाको रातमा यी धाराहरू मुनिका जलमार्गमा घिउका दियाहरू बालेर बगाइन्छ, जसले रातभर उज्यालो दिन्छ।",
    },
    note: {
      en: "The water channels are laid with sunken drainage beds designed to prevent flooding.",
      ne: "जलप्रवाह नरोकियोस् भनी गहिरा ढुङ्गाका नालीहरू कुशलतापूर्वक निर्माण गरिएका छन्।",
    },
  },
  {
    id: "spouts-16-20",
    spouts: [16, 17, 18, 19, 20],
    title: {
      en: "Spouts 16 – 20: Late Malla Heritage",
      ne: "धारा १६ – २०: मल्लकालीन शिल्पकला",
    },
    subtitle: {
      en: "Linked by tradition to King Jaya Prakash Malla",
      ne: "राजा जयप्रकाश मल्लसँग जोडिएको जनश्रुति",
    },
    detail: {
      en: "Local tradition attributes the first 21 spouts to the late Malla period, reflecting Kathmandu Valley's sophisticated public water infrastructure.",
      ne: "स्थानीय जनश्रुतिले यी धाराहरूलाई मल्लकालीन काठमाडौँ उपत्यकाको उन्नत सार्वजनिक जलप्रणालीको प्रतीक मान्दछ।",
    },
    note: {
      en: "Nearby small shrines house depictions of Shiva, Vishnu, and local guardian deities.",
      ne: "नजिकै रहेका साना मन्दिरहरूमा शिव, विष्णु तथा स्थानीय रक्षक देवताहरूको मूर्ति स्थापना छ।",
    },
  },
  {
    id: "spouts-21-22",
    spouts: [21, 22],
    title: {
      en: "Spouts 21 & 22: The Royal Addition",
      ne: "धारा २१ र २२: थपिएको ऐतिहासिक धारा",
    },
    subtitle: {
      en: "Attributed to King Rana Bahadur Shah (1855 BS)",
      ne: "राजा रणबहादुर शाह (वि.सं. १८५५) सँग सम्बन्धित",
    },
    detail: {
      en: "The 22nd spout completes the complex that gave Baisdhara its enduring name, marking the transition from 21 spouts to 22.",
      ne: "२२ औँ धाराले यस परिसरलाई पूर्णता दिई 'बैसधारा' को प्रख्यात नाम स्थापित गर्‍यो।",
    },
    note: {
      en: "After completing the bath at spout 22, pilgrims proceed to Pyah Thwam Ajima shrine nearby.",
      ne: "२२ औँ धारामा स्नान सम्पन्न गरेपछि भक्तजनहरू नजिकै रहेको प्याः थ्वँ अजिमाको दर्शन गर्न जान्छन्।",
    },
  },
];
