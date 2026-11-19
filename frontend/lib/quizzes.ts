export type Lang = "en" | "ne";
export type Localized = { en: string; ne?: string };
export type Place = "dhara" | "ajima" | "lhuti" |"general";
export type PlaceId = "dhara" | "ajima";
export type Evidence = "documented" | "community" | "belief" | "context";
export type Status = "ready" | "check"; // "check" stays hidden until verified

export type QuizQuestion = {
  id: string;
  place: Place;
  question: Localized;
  options: Localized[];
  answer: number; // index of the correct option
  explanation: Localized;
  source: string; // where this fact comes from on the site
  evidence?: Evidence;
  status?: Status;
};

export type MatchPair = { 
  id: string;
  term: Localized; 
  meaning: Localized;
  detail: Localized; // shown after a correct match
  evidence: Evidence;
  source: string;
  status?: Status;
};

export const L = (en: string, ne?: string): Localized => ({ en, ne });

export const evidenceLabels: Record<Evidence, Localized> = {
  documented: L("Documented", "अभिलेखित"),
  community: L("Community reported", "समुदायले बताएको"),
  belief: L("Belief", "विश्वास"),
  context: L("Wider context", "फराकिलो सन्दर्भ"),
};

// Missing Nepali never breaks anything: the English text is shown instead.
// In development, the console lists what still needs a translation.
const warned = new Set<string>();
export function t(text: Localized, lang: Lang): string {
  if (lang === "ne") {
    if (text.ne) return text.ne;
    if (process.env.NODE_ENV === "development" && !warned.has(text.en)) {
      warned.add(text.en);
      console.warn(`[i18n] No Nepali yet for: "${text.en}"`);
    }
  }
  return text.en;
}

export const labels = {
    scoreShort: L("Score", "अंक"),
  question: L("Question", "प्रश्न"),
  of: L("of", "/"),
  next: L("Next question", "अर्को प्रश्न"),
  seeScore: L("See my score", "मेरो अंक हेर्नुहोस्"),
  correct: L("Correct", "सही"),
  yourAnswer: L("Your answer", "तपाईंको उत्तर"),
  right: L("Correct.", "सही।"),
  notQuite: L("Not quite.", "ठ्याक्कै होइन।"),
  source: L("Source", "स्रोत"),
  tryAgain: L("Try again", "फेरि प्रयास गर्नुहोस्"),
  best: L("Best score", "उत्कृष्ट अंक"),
  score: L("Your score", "तपाईंको अंक"),
  scorePerfect: L("Perfect. You know this place well.", "उत्कृष्ट! तपाईं यो ठाउँलाई राम्ररी चिन्नुहुन्छ।"),
  scoreGood: L("Well done. Visit the place pages to learn the rest.", "शाबास! बाँकी जान्न स्थान पृष्ठहरू हेर्नुहोस्।"),
  scoreStart: L("A good start. Read the stories and try again.", "राम्रो सुरुआत। कथाहरू पढेर फेरि प्रयास गर्नुहोस्।"),
  shuffle: L("Shuffle", "फेटाउनुहोस्"),
  matchHelp: L("Pick a name on the left, then its meaning on the right.", "बायाँतिर एउटा नाम छान्नुहोस्, अनि दायाँतिर यसको अर्थ।"),
  match: L("Match!", "मिल्यो!"),
  wrong: L("Not a match. Try another.", "मिलेन। अर्को प्रयास गर्नुहोस्।"),
  allMatched: L("All matched.", "सबै मिले।"),
  mistakes: L("Mistakes", "गल्ती"),
  studyNotes: L("What you matched:", "तपाईंले मिलाएका कुरा:"),
};

export const quizzes: QuizQuestion[] = [
  {
    id: "dhara-count",
    place: "dhara",
    question: L("How many stone water spouts give 22 Dhara its name?", "कतिवटा ढुङ्गे जलधाराले २२ धारालाई यसको नाम दिएका हुन्?"),
    options: [L("12", "१२"), L("22", "२२"), L("32", "३२"), L("52", "५२")],
    answer: 1,
    explanation: L("22 Dhara is known for twenty-two stone water spouts (dhunge dhara).", "२२ धारा बाइसवटा ढुङ्गे जलधारा (ढुङ्गेधारा) का लागि प्रसिद्ध छ।"),
    source: "Places page, 22 Dhara",
  },
  {
    id: "dhara-forest",
    place: "dhara",
    question: L("Which forest is 22 Dhara near?", "२२ धारा कुन वनको नजिक छ?"),
    options: [L("Nagarjun forest", "नागार्जुन वन"), L("Shivapuri forest", "शिवपुरी वन"), L("Phulchoki forest", "फुल्चोकी वन"), L("Godavari forest", "गोदावरी वन")],
    answer: 0,
    explanation: L("22 Dhara sits in Balaju, near the Nagarjun forest.", "२२ धारा बालाजुमा, नागार्जुन वनको नजिकै छ।"),
    source: "Places page, 22 Dhara",
  },
  {
    id: "dhara-name",
    place: "dhara",
    question: L("Which other name is used for 22 Dhara?", "२२ धाराको अर्को नाम कुन हो?"),
    options: [L("Baisdhara", "बैसधारा"), L("Sundhara", "सुन्धारा"), L("Manohara", "मनोहरा"), L("Bishnumati", "विष्णुमती")],
    answer: 0,
    explanation: L("22 Dhara is also called Baisdhara.", "२२ धारालाई बैसधारा पनि भनिन्छ।"),
    source: "Places page, 22 Dhara",
  },
  {
    id: "dhara-baisdhara-meaning",
    place: "dhara",
    question: L("What does the name 'Baisdhara' literally mean?", "'बैसधारा' नामको शाब्दिक अर्थ के हो?"),
    options: [L("Twenty-two spouts", "बाइस धारा"), L("Twelve rivers", "बाह्र नदी"), L("Place of stones", "ढुङ्गाको ठाउँ"), L("Forest of water", "पानीको वन")],
    answer: 0,
    explanation: L("'Bais' means twenty-two and 'dhara' means a tap or spout.", "'बैस' भनेको बाइस र 'धारा' भनेको पानीको धारा वा कल।"),
    source: "Local reporting on Balaju Baisdhara",
    evidence: "documented",
  },
  {
    id: "dhara-park-name",
    place: "dhara",
    question: L("The 18th-century garden around 22 Dhara is now also known as which park?", "२२ धारा वरपरको १८ औं शताब्दीको बगैँचा अहिले कुन पार्कका नामले पनि चिनिन्छ?"),
    options: [L("Mahendra Park", "महेन्द्र पार्क"), L("Ratna Park", "रत्न पार्क"), L("Tudikhel", "टुँडिखेल"), L("Rani Pokhari", "रानीपोखरी")],
    answer: 0,
    explanation: L("Balaju's old garden is now also called Mahendra Park. Locally it is known as Baisdhara because of the 22 spouts.", "बालाजुको पुरानो बगैँचालाई अहिले महेन्द्र पार्क पनि भनिन्छ। २२ वटा धाराका कारण स्थानीय रूपमा यसलाई बैसधारा भनिन्छ।"),
    source: "Lonely Planet; Public Space Profile, Balaju Park",
    evidence: "documented",
  },
  {
    id: "dhara-belief-bathing",
    place: "dhara",
    question: L("Reports describe a belief that bathing under the spouts brings what?", "प्रतिवेदनहरूका अनुसार धारामुनि नुहाउँदा के प्राप्त हुन्छ भन्ने विश्वास छ?"),
    options: [L("Relief from body ailments and merit", "शारीरिक रोगबाट राहत र पुण्य"), L("Success in business", "व्यापारमा सफलता"), L("Good exam results", "परीक्षामा राम्रो नतिजा"), L("Safe travel abroad", "विदेश यात्रा सुरक्षित")],
    answer: 0,
    explanation: L("Many devotees believe the bath relieves ailments and brings merit. This site records it as a belief, not as medical fact.", "धेरै भक्तजनले यो स्नानले रोगबाट राहत र पुण्य दिन्छ भन्ने विश्वास गर्छन्। यो साइटले यसलाई विश्वासका रूपमा राख्छ, चिकित्सकीय तथ्यका रूपमा होइन।"),
    source: "Ekantipur photo report",
    evidence: "belief",
  },
  {
    id: "dhara-malla-king",
    place: "dhara",
    question: L("Which Malla king commissioned the original 21 water spouts at Balaju in 1774 CE?", "वि.सं. १८३१ (सन् १७७४) मा बालाजुमा प्रारम्भिक २१ वटा ढुङ्गेधारा निर्माण गराउने मल्ल राजा को हुन्?"),
    options: [
      L("King Jaya Prakash Malla", "राजा जयप्रकाश मल्ल"),
      L("King Pratap Malla", "राजा प्रताप मल्ल"),
      L("King Bhupatindra Malla", "राजा भूपतीन्द्र मल्ल"),
      L("King Yaksha Malla", "राजा यक्ष मल्ल"),
    ],
    answer: 0,
    explanation: L("King Jaya Prakash Malla of Kathmandu commissioned twenty-one spouts in 1774 CE to provide water and sacred bathing for pilgrims.", "काठमाडौंका राजा जयप्रकाश मल्लले वि.सं. १८३१ मा तीर्थालुहरूका लागि २१ वटा धारा निर्माण गराएका थिए।"),
    source: "Historical chronicles & Ward 16 Heritage documentation",
    evidence: "documented",
  },
  {
    id: "dhara-shah-addition",
    place: "dhara",
    question: L("Who commissioned the 22nd water spout at Balaju to complete the modern 'Baisdhara' complex in 1789 CE?", "वि.सं. १८४६ (सन् १७८९) मा २२ औं धारा थप गरी हालको 'बैसधारा' पूर्ण बनाउने राजा को हुन्?"),
    options: [
      L("King Prithvi Narayan Shah", "राजा पृथ्वीनारायण शाह"),
      L("King Rana Bahadur Shah", "राजा रणबहादुर शाह"),
      L("King Girvan Yuddha Shah", "राजा गिर्वाणयुद्ध शाह"),
      L("King Tribhuvan", "राजा त्रिभुवन"),
    ],
    answer: 1,
    explanation: L("King Rana Bahadur Shah added the 22nd spout in 1789 CE, bringing the total to the iconic twenty-two spouts seen today.", "राजा रणबहादुर शाहले वि.सं. १८४६ मा २२ औं धारा थपेपछि यस स्थलले बाइसधाराको पूर्ण स्वरूप पाएको हो।"),
    source: "Department of Archaeology; Balaju inscriptions",
    evidence: "documented",
  },
  {
    id: "dhara-makara-creature",
    place: "dhara",
    question: L("What mythical creature is sculpted on the Balaju water spouts (Hitimanga)?", "बालाजुका ढुङ्गेधारा (हितिमंगः) मा कुन पौराणिक जलचरको मुखाकृति कुँदिएको छ?"),
    options: [
      L("Makara (aquatic mythical beast)", "मकर (पौराणिक जलचर)"),
      L("Garuda (celestial eagle)", "गरुड (पन्छीराज)"),
      L("Airavata (divine elephant)", "ऐरावत (हात्ती)"),
      L("Sharābha (eight-legged beast)", "शराभ (आठखुट्टे प्राणी)"),
    ],
    answer: 0,
    explanation: L("The spouts are sculpted as Makaras (mythical aquatic creatures), traditionally revered as the vehicles of river goddess Ganga and water deity Varuna.", "ढुङ्गेधारामा गंगा र वरुणको वाहन मानिने पौराणिक जलजीव 'मकर' (हितिमंगः) को कलात्मक स्वरूप कुँदिएको हुन्छ।"),
    source: "Newar traditional water architecture survey",
    evidence: "documented",
  },
  {
    id: "dhara-aquifer-source",
    place: "dhara",
    question: L("Where does the natural spring water feeding the 22 Dhara gravity aquifer originate?", "२२ धारामा प्रवाह हुने प्राकृतिक मुहानको पानी कुन भौगोलिक क्षेत्रबाट आउँछ?"),
    options: [
      L("Underground springs from Nagarjun Hill", "नागार्जुन डाँडाका भूमिगत मुहान"),
      L("Direct channel from the Bagmati River", "बागमती नदीको प्रत्यक्ष नहर"),
      L("Melamchi water supply project", "मेलम्ची खानेपानी आयोजना"),
      L("Manohara river diversion", "मनोहरा नदी डाइभर्सन"),
    ],
    answer: 0,
    explanation: L("The spouts were fed by subterranean natural spring aquifers originating from the pristine Nagarjun (Jamacho) watershed.", "२२ धाराका परम्परागत मुहान नागार्जुन डाँडा (जामाचो) को जलाधार क्षेत्रका भूमिगत मुहानहरूबाट रिचार्ज हुन्छन्।"),
    source: "Traditional water management studies, Kathmandu Valley",
    evidence: "documented",
  },
  {
    id: "dhara-narayana-replica",
    place: "dhara",
    question: L("Which sacred reclining deity replica was established inside the Balaju garden for royal worship?", "बालाजु उद्यानभित्र राजाहरूको दर्शनका लागि कुन सुतेको नारायणको प्रतिकृति स्थापना गरिएको थियो?"),
    options: [
      L("Budhanilkantha Jalashayana Narayana", "बुढानीलकण्ठ जलशयन नारायण"),
      L("Changunarayan Vishnu", "चाँगुनारायण विष्णु"),
      L("Varaha Avatar of Dholahiti", "धोबीघाटको वराह अवतार"),
      L("Bishankhunarayan", "विशंखुनारायण"),
    ],
    answer: 0,
    explanation: L("A sacred replica of Budhanilkantha's sleeping Vishnu was consecrated at Balaju so reigning monarchs (who were forbidden by superstition from visiting Budhanilkantha) could worship.", "काठमाडौंका राजाहरूलाई बुढानीलकण्ठ जान बन्देज रहेकाले उनीहरूको दर्शनका लागि बालाजुमा जलशयन नारायणको प्रतिकृति स्थापना गरिएको थियो।"),
    source: "Balaju historical records; Regmi Research Series",
    evidence: "documented",
  },
  {
    id: "dhara-basin-design",
    place: "dhara",
    question: L("What architectural feature characterizes the sunken basin (hiti-gah) where the 22 spouts flow?", "२२ धारा बग्ने परम्परागत खाल्डो (हिति-गाः) को वास्तुकलाको विशेषता के हो?")
    ,
    options: [
      L("Sunken stone terrace with carved drainage conduits", "ढुङ्गा छापिएको खोपिल्टो र निकास प्रणाली"),
      L("Elevated wooden tower with hanging pipes", "काठको अग्लो स्तम्भ र झुण्ड्याइएका पाइप"),
      L("Glass enclosure with motorized fountains", "सिसाको घेरा र मोटर पम्प"),
      L("Deep round pit with no runoff exit", "निकास नभएको गहिरो इनार"),
    ],
    answer: 0,
    explanation: L("Traditional hitis are engineered as sunken courtyards (hiti-gah) with dressed stone pavers that control water pressure, cooling, and drainage outflow.", "परम्परागत ढुङ्गेधारा पानीको चाप नियन्त्रण गर्न र प्राकृतिक निकास सहज बनाउन सतहभन्दा गहिरो ढुङ्गे चोक (हिति-गाः) को रूपमा निर्माण गरिन्छ।"),
    source: "Valley water architecture documentation",
    evidence: "documented",
  },
  {
    id: "dhara-bathing-etiquette",
    place: "dhara",
    question: L("According to local heritage custodians, what is prohibited directly under the heritage spouts during ritual bathing?", "सम्पदा संरक्षकहरूका अनुसार पवित्र स्नानका बेला ढुङ्गेधारामुनि प्रत्यक्ष के प्रयोग गर्न निषेध छ?"),
    options: [
      L("Chemical soap and shampoo", "रासायनिक साबुन र स्याम्पु"),
      L("Wearing traditional cotton towels", "परम्परागत सुती कपडा वा गम्छा"),
      L("Chanting morning hymns", "बिहानी भजन कीर्तन"),
      L("Offering fresh flower petals", "ताजा फूलको पात चढाउनु"),
    ],
    answer: 0,
    explanation: L("To protect water purity, sacred stone spouts, and downstream irrigation, community rules prohibit using chemical soaps directly under the hitis.", "पानीको शुद्धता, ढुङ्गाको संरक्षण र तल्लो तटीय पर्यावरण जोगाउन धारामुनि सिधै रासायनिक साबुन वा स्याम्पु प्रयोग गर्न बन्देज छ।"),
    source: "Balaju community stewardship guidelines",
    evidence: "community",
  },
  {
    id: "dhara-hill",
    place: "dhara",
    status: "check",
    question: L("Tradition says Acharya Nagarjuna meditated in a cave on the hill above the park. What is the hill called?"),
    options: [L("Jamacho"), L("Shivapuri"), L("Champadevi"), L("Phulchoki")],
    answer: 0,
    explanation: L("The hill is called Jamacho, also known as Nagarjun. This is a local religious tradition."),
    source: "Onlinekhabar; needs a second source",
    evidence: "belief",
  },
  // ---------- Lhuti Punhi ----------
  {
    id: "lhuti-month",
    place: "lhuti",
    question: L("In which month of the year does Lhuti Punhi usually fall?"),
    options: [L("April"), L("August"), L("November"), L("January")],
    answer: 0,
    explanation: L("It is a spring full-moon festival. Reports place it on the full moon of Chaitra or Baisakh, so the exact day changes every year."),
    source: "Nepali Times; Kathmandu Post; Ekantipur",
    evidence: "documented",
  },
  {
    id: "lhuti-centre",
    place: "lhuti",
    question: L("What is at the heart of Lhuti Punhi at Balaju?"),
    options: [L("Ritual bathing at the stone spouts"), L("A kite-flying contest", "चंगा उडाउने प्रतियोगिता"), L("A chariot procession"), L("A rice harvest dance")],
    answer: 0,
    explanation: L("Hindu and Buddhist devotees come to bathe under the twenty-two stone spouts."),
    source: "Nepali Times; Onlinekhabar",
    evidence: "documented",
  },
  {
    id: "lhuti-days",
    place: "lhuti",
    question: L("Reports describe the Balaju Baisdhara fair as lasting about how long?"),
    options: [L("One day"), L("Three days"), L("Five days"), L("Ten days")],
    answer: 2,
    explanation: L("Reports describe a five-day fair. The dates are set each year by the lunar calendar."),
    source: "Onlinekhabar; Ekantipur",
    evidence: "community",
  },
  {
    id: "lhuti-lamp",
    place: "lhuti",
    question: L("Many visitors light a lamp at the spouts in memory of whom?"),
    options: [L("A deceased relative"), L("A newborn child"), L("A returning traveller"), L("The harvest")],
    answer: 0,
    explanation: L("Bathing and lighting a lamp for a departed relative is described as a tradition."),
    source: "Onlinekhabar; Ekantipur",
    evidence: "community",
  },
  {
    id: "lhuti-blessing",
    place: "lhuti",
    question: L("Some devotees believe a bath at Baisdhara gives the same blessings as bathing at which holy places?"),
    options: [L("Muktinath and Gosainkunda"), L("Lumbini and Janakpur"), L("Pashupatinath and Boudhanath"), L("Swayambhu and Patan")],
    answer: 0,
    explanation: L("This belief is reported in the news. It is recorded here as a belief."),
    source: "Onlinekhabar",
    evidence: "belief",
  },
  {
    id: "lhuti-tamang",
    place: "lhuti",
    status: "check",
    question: L("Reports say Buddhist devotees from which community come to the spouts a day after Temal Jatra?"),
    options: [L("Tamang"), L("Gurung"), L("Tharu"), L("Rai")],
    answer: 0,
    explanation: L("Reports describe Tamang devotees lighting lamps for their ancestors before bathing. Confirm this wording with the community."),
    source: "Kathmandu Post; Ekantipur",
    evidence: "community",
  },
  {
    id: "lhuti-names",
    place: "lhuti",
    status: "check",
    question: L("Lhuti Punhi is also called by which place-based name?"),
    options: [L("Balaju Purnima"), L("Gunla Purnima"), L("Janai Purnima"), L("Buddha Purnima")],
    answer: 0,
    explanation: L("It is also called Balaju Purnima, after the place."),
    source: "Newar calendar reference; verify",
    evidence: "documented",
  },
  {
    id: "ajima-shrine",
    place: "ajima",
    question: L("How is Pyah Thwam Ajima described?", "प्याः थ्वँ अजिमालाई कसरी वर्णन गरिन्छ?"),
    options: [
      L("A protective mother-goddess shrine", "रक्षक मातृदेवीको मन्दिर"),
      L("A royal palace", "राजदरबार"),
      L("A market square", "बजार चोक"),
      L("A school for monks", "भिक्षुहरूको विद्यालय"),
    ],
    answer: 0,
    explanation: L("Pyah Thwam Ajima is described as a protective mother-goddess shrine.", "प्याः थ्वँ अजिमालाई रक्षक मातृदेवीको मन्दिरका रूपमा वर्णन गरिन्छ।"),
    source: "Places page, Pyah Thwam Ajima",
  },
   {
    id: "ajima-word",
    place: "ajima",
    question: L("What does the Newar word 'ajima' commonly mean?", "नेवारी शब्द 'अजिमा' को सामान्य अर्थ के हो?"),
    options: [L("Grandmother", "हजुरआमा"), L("Queen", "रानी"), L("Sacred river", "पवित्र नदी"), L("Golden temple", "स्वर्ण मन्दिर")],
    answer: 0,
    explanation: L("'Ajima' means grandmother. It is used for maternal ancestors and for the mother-goddesses.", "'अजिमा' को अर्थ हजुरआमा हो। यो मातृपक्षका पुर्खा र मातृदेवीहरूका लागि प्रयोग गरिन्छ।"),
    source: "Reference sources on Newar religion",
    evidence: "documented",
  },
  {
    id: "ajima-eight",
    place: "ajima",
    question: L("'Ajima' also names a group of mother-goddesses of the Newar tradition. How many are usually counted?", "'अजिमा' नेवार परम्पराका मातृदेवीहरूको समूहको नाम पनि हो। सामान्यतया कतिवटा गनिन्छन्?"),
    options: [L("Three", "तीन"), L("Five", "पाँच"), L("Eight", "आठ"), L("Twelve", "बाह्र")],
    answer: 2,
    explanation: L("The eight Ajimas are linked with the Ashta Matrika, the eight mother-goddesses.", "आठ अजिमालाई अष्टमातृका, अर्थात् आठ मातृदेवीसँग जोडिन्छ।"),
    source: "Reference sources on Newar religion",
    evidence: "documented",
  },
  {
    id: "ajima-who",
    place: "ajima",
    question: L("According to a scholar of Newar religion, who worships the Matrika / Ajima goddesses?", "नेवार धर्मका एक विद्वान्का अनुसार मातृका / अजिमा देवीहरूको पूजा को गर्छन्?"),
    options: [L("Only Hindu Newars", "केवल हिन्दू नेवार"), L("Only Buddhist Newars", "केवल बौद्ध नेवार"), L("Most Newar castes, Hindu and Buddhist", "हिन्दू र बौद्ध दुवै गरी अधिकांश नेवार जात"), L("Only temple priests", "केवल मन्दिरका पुरोहित")],
    answer: 2,
    explanation: L("The worship is shared across most Newar castes, Hindu or Buddhist, in towns and villages.", "यो पूजा सहर र गाउँ दुवैमा हिन्दू वा बौद्ध अधिकांश नेवार जातिमा साझा छ।"),
    source: "Toffin, article on the cult of Matrka/Ajima goddesses",
    evidence: "documented",
  },
  {
    id: "ajima-shitala",
    place: "ajima",
    question: L("What else is the Balaju shrine locally called?", "बालाजुको यो मन्दिरलाई स्थानीय रूपमा अरू के भनिन्छ?"),
    options: [L("Shitala Mai", "शीतला माई"), L("Harati Maju", "हारती माजु"), L("Manamaiju", "मनमैजु"), L("Bhadrakali", "भद्रकाली")],
    answer: 0,
    explanation: L("The shrine is locally called Shitala Mai. Other Ajima shrines in the valley have their own names.", "यो मन्दिरलाई स्थानीय रूपमा शीतला माई भनिन्छ। उपत्यकाका अन्य अजिमा मन्दिरका आफ्नै नाम छन्।"),
    source: "Ajima page on this site",
    evidence: "community",
  },
  {
    id: "ajima-protection",
    place: "ajima",
    status: "check",
    question: L("In wider Newar tradition, what do many families ask Ajima to protect their children from?"),
    options: [L("Illness, smallpox in the past"), L("Floods"), L("Fire"), L("Bad harvests")],
    answer: 0,
    explanation: L("Ajima is linked with protecting children from illness. This is wider tradition, not a claim about this shrine, and it is recorded as belief."),
    source: "Republica; Swayambhu shrine pages",
    evidence: "context",
  },
  {
    id: "ajima-ritual",
    place: "ajima",
    question: L("Which ritual is connected with Pyah Thwam Ajima?", "प्याः थ्वँ अजिमासँग कुन अनुष्ठान जोडिएको छ?"),
    options: [
      L("Dristi Lekhan, an eye-painting ritual", "दृष्टि लेखन, आँखा रंगाउने अनुष्ठान"),
      L("A kite-flying contest", "चंगा उडाउने प्रतियोगिता"),
      L("A boat race", "डुङ्गा दौड"),
      L("A harvest dance", "बाली भित्र्याउने नाच"),
    ],
    answer: 0,
    explanation: L("The shrine is the home of the Dristi Lekhan eye-painting ritual.", "यो मन्दिर दृष्टि लेखन आँखा रंगाउने अनुष्ठानको थलो हो।"),
    source: "Places page, Pyah Thwam Ajima",
  },
  {
    id: "ajima-sanctum-stone",
    place: "ajima",
    question: L("What serves as the sacred core deity inside the inner sanctum of Pyah Thwam Ajima?", "प्याः थ्वँ अजिमाको गर्भगृहभित्र मूल देवताको रूपमा के स्थापित छ?"),
    options: [
      L("An aniconic natural river rock (pith stone)", "प्राकृतिक शिला (पीठ ढुङ्गा)"),
      L("A large gold-plated standing idol", "ठूलो सुनौलो उभिएको मूर्ति"),
      L("A crystal lingam", "स्फटिकको शिवलिंग"),
      L("A sacred bell without idols", "मूर्तिविहीन घण्ट"),
    ],
    answer: 0,
    explanation: L("In the pith tradition of Newar mother-goddesses, the sanctum enshrines an aniconic natural stone representing the primordial maternal force rather than a human-like statue.", "नेवार पीठ परम्परामा मातृदेवीको मूल स्वरूप मानव आकारको मूर्ति नभई शक्तिस्वरूप प्राकृतिक शिला (पीठ) का रूपमा पुजिन्छ।"),
    source: "Ward 16 Heritage inventory; Newar tantric traditions",
    evidence: "documented",
  },
  {
    id: "ajima-sal-struts",
    place: "ajima",
    question: L("What is depicted on the intricately carved timber roof struts (tunal) of the Ajima shrine?", "अजिमा मन्दिरको छानो थाम्ने काठका टुँडालहरूमा के कुँदिएको छ?"),
    options: [
      L("Ashta Matrikas and protective guardian deities", "अष्टमातृका र रक्षक देवीदेवता"),
      L("Hunting scenes of Malla kings", "मल्ल राजाहरूको सिकार दृश्य"),
      L("Foreign ships and merchants", "विदेशी जहाज र व्यापारीहरू"),
      L("Zodiac astrological signs only", "केवल बाह्र राशिका चिन्ह"),
    ],
    answer: 0,
    explanation: L("The timber struts (tunal) are masterfully carved from Sal wood depicting the multi-armed Matrika goddesses standing over their vahana mounts.", "मन्दिरको छानो अड्याउने सालको काठका टुँडालहरूमा आ-आफ्नो वाहनमाथि उभिएका अष्टमातृका देवीहरू कुँदिएका छन्।"),
    source: "Woodcraft architectural documentation, Balaju",
    evidence: "documented",
  },
  {
    id: "ajima-dristi-artisans",
    place: "ajima",
    question: L("Which traditional artisan community conducts the sacred Dristi Lekhan (eye-painting) rite at Pyah Thwam Ajima?", "प्याः थ्वँ अजिमामा परम्परागत 'दृष्टि लेखन' (आँखा रंगाउने) विधि कुन समुदायका कलाकारले सम्पन्न गर्छन्?"),
    options: [
      L("Pũ (Chitrakar) artisan lineage", "पुँ (चित्रकार) समुदाय"),
      L("Tamrakar copper smiths", "ताम्राकार तामा कालिगड"),
      L("Kansakar bronze casters", "कंसाकार काँस कालिगड"),
      L("Shilpakar woodworkers", "शिल्पकार काष्ठ कलाकार"),
    ],
    answer: 0,
    explanation: L("The hereditary Pũ (Chitrakar) painters carry out the sacred eye-opening rituals that consecrate the visual presence of the deity.", "पुँ (चित्रकार) समुदायका वंशानुगत कलाकारहरूले तान्त्रिक विधिद्वारा देवीको आँखामा रंग भरेर प्राणप्रतिष्ठा (दृष्टि लेखन) गर्दछन्।"),
    source: "Balaju Chitrakar Guthi archives",
    evidence: "documented",
  },
  {
    id: "ajima-dafa-hymns",
    place: "ajima",
    question: L("What musical tradition is regularly sung in the temple phalecha (rest pavilion) by the community?", "मन्दिरको फलेचा (पाटी) मा स्थानीय समुदायद्वारा नियमित रूपमा कुन परम्परागत संगीत गाइन्छ?"),
    options: [
      L("Dafa Bhajan with khin drums and cymbals", "खिं बाजा र ताः सहितको दाफा भजन"),
      L("Classical opera choir", "शास्त्रीय ओपेरा गायन"),
      L("Modern acoustic guitar pop", "आधुनिक गितार पप"),
      L("Carnatic flute solos", "कर्नाटक बाँसुरी वादन"),
    ],
    answer: 0,
    explanation: L("Community elders gather at dusk in the phalecha to sing centuries-old devotional Dafa Bhajan hymns accompanied by the two-headed khin drum and taa brass cymbals.", "साँझपख पाटीमा भेला भएर स्थानीय बासिन्दाहरू खिं बाजा, ताः र झ्यालीको तालमा परम्परागत दाफा भजन गाउँछन्।"),
    source: "Intangible cultural heritage registry, Ward 16",
    evidence: "community",
  },
  {
    id: "ajima-guthi-stewardship",
    place: "ajima",
    question: L("How have the daily rituals and annual festivals of Pyah Thwam Ajima been sustained for generations?", "प्याः थ्वँ अजिमाको दैनिक नित्यपूजा र वार्षिक जात्रा पुस्तान्तरण गर्न कुन संस्थाले भूमिका खेलेको छ?"),
    options: [
      L("Community-based Guthi trust system", "समुदायमा आधारित गुठी प्रणाली"),
      L("Commercial sponsorship contracts", "व्यापारिक प्रायोजन सम्झौता"),
      L("International museum foundation", "अन्तर्राष्ट्रिय संग्रहालय फाउन्डेसन"),
      L("Tourism ticket collection agencies", "पर्यटक टिकट काउन्टर"),
    ],
    answer: 0,
    explanation: L("The traditional Newar Guthi system—a community endowment of lineage elders and volunteers—manages rituals, upkeep, and festival feasts without commercialization.", "परम्परागत गुठी प्रणालीले स्थानीय समुदायको सहभागिता, श्रम र अक्षयकोषबाट शताब्दीयौंदेखि पूजाआजा र जात्रा व्यवस्थापन गर्दै आएको छ।"),
    source: "Guthi Sansthan & Ward 16 community records",
    evidence: "documented",
  },
  {
    id: "ajima-brickwork-style",
    place: "ajima",
    question: L("What type of traditional brick is used in the exterior masonry of classical Newar shrines like Pyah Thwam Ajima?", "प्याः थ्वँ अजिमा जस्ता परम्परागत नेवार मन्दिरको बाहिरी गारोमा कुन प्रकारको इँटा प्रयोग गरिन्छ?"),
    options: [
      L("Dachi Appa (fine wedge-shaped polished bricks)", "दाची अप्पा (चिल्लो र चोसो परेको इँटा)"),
      L("Modern hollow cement blocks", "आधुनिक सिमेन्ट ब्लक"),
      L("Rough sun-dried clay mudballs", "काँचो माटोको डल्ला"),
      L("Glazed bathroom ceramic tiles", "सिरामिक टायल"),
    ],
    answer: 0,
    explanation: L("Classical Newar shrine architecture utilizes Dachi Appa—hand-pressed, high-fired, smooth wedge-shaped bricks laid with hair-thin joints.", "परम्परागत मल्लकालीन शैलीका मन्दिरहरूमा चिल्लो सतह भएको विशेष चोसोदार इँटा 'दाची अप्पा' मसिनो जोडाइमा प्रयोग गरिन्छ।")
    ,
    source: "Traditional architecture of Kathmandu Valley (Gutschow)",
    evidence: "documented",
  },
  {
    id: "respect-photo",
    place: "general",
    question: L("A ritual is happening and you want a photo. What is the respectful choice?", "कुनै अनुष्ठान भइरहेको छ र तपाईं फोटो खिच्न चाहनुहुन्छ। सम्मानजनक रोजाइ के हो?"),
    options: [
      L("Take it quickly, without flash", "फ्ल्यासबिना छिटो खिच्ने"),
      L("Ask the Guthi and the community for permission first", "पहिले गुठी र समुदायसँग अनुमति माग्ने"),
      L("Post it online with a nice caption", "राम्रो क्याप्सनसहित अनलाइनमा पोस्ट गर्ने"),
      L("Wait until people leave, then re-create the scene", "मानिस गएपछि दृश्य पुनः बनाएर खिच्ने"),
    ],
    answer: 1,
    explanation: L("Restricted rituals should not be photographed or shared without the permission of the Guthi and the community.", "प्रतिबन्धित अनुष्ठानको फोटो गुठी र समुदायको अनुमतिबिना खिच्नु वा साझा गर्नु हुँदैन।"),
    source: "Site footer note",
  },
  {
    id: "respect-beliefs",
    place: "general",
    question: L("How does this site record local beliefs?", "यो साइटले स्थानीय विश्वासहरू कसरी राख्छ?"),
    options: [
      L("As beliefs, not as medical or historical fact", "विश्वासका रूपमा, चिकित्सकीय वा ऐतिहासिक तथ्यका रूपमा होइन"),
      L("As proven history", "प्रमाणित इतिहासका रूपमा"),
      L("As medical advice", "चिकित्सकीय सल्लाहका रूपमा"),
      L("As stories made up for visitors", "पाहुनाका लागि बनाइएका कथाका रूपमा"),
    ],
    answer: 0,
    explanation: L("Beliefs here are recorded as beliefs, not as medical or historical fact.", "यहाँ विश्वासलाई विश्वासकै रूपमा राखिएको छ, चिकित्सकीय वा ऐतिहासिक तथ्यका रूपमा होइन।"),
    source: "Site footer note",
  },
  {
    id: "respect-people-bathing",
    place: "general",
    status: "check",
    question: L("Crowds are bathing at the spouts and you want to post a video. What is the respectful choice?"),
    options: [
      L("Film close-ups of faces for a better video"),
      L("Ask permission and avoid close-ups of people bathing"),
      L("Livestream the whole bath"),
      L("Ask people to pose"),
    ],
    answer: 1,
    explanation: L("Ask first, keep people's faces and bodies out of the shot, and follow what the caretakers say."),
    source: "Site footer note; confirm the park's photo rules",
    evidence: "documented",
  },
];

// Draft items (status "check") only appear when NEXT_PUBLIC_SHOW_DRAFTS=true.
const SHOW_DRAFTS = process.env.NEXT_PUBLIC_SHOW_DRAFTS === "true";
const available = (item: { status?: Status }) => SHOW_DRAFTS || item.status !== "check";

export function quizFor(place: PlaceId) {
  return quizzes.filter((q) => (q.place === place || q.place === "general") && available(q));
}

// For the /quiz page: pass "all", "dhara", "ajima" or "lhuti".
export function quizByTopic(topic: Place | "all") {
  return quizzes.filter((q) => (topic === "all" || q.place === topic) && available(q));
}

const ajimaPairs: MatchPair[] = [
  {
    id: "aj-ajima",
    term: L("Ajima", "अजिमा"),
    meaning: L("A protective mother figure in Newar religion", "नेवार धर्ममा रक्षक मातृस्वरूप"),
    detail: L("In Nepal Bhasa the word also means grandmother. It is used for maternal ancestors and for the mother-goddesses.", "नेपाल भाषामा यो शब्दको अर्थ हजुरआमा पनि हो। यो मातृपक्षका पुर्खा र मातृदेवीहरूका लागि प्रयोग गरिन्छ।"),
    evidence: "documented",
    source: "Ajima page; reference sources",
  },
  {
    id: "aj-matrika",
    term: L("Matrika", "मातृका"),
    meaning: L("Mother-goddesses worshipped by Newar communities, Hindu and Buddhist", "हिन्दू र बौद्ध दुवै नेवार समुदायले पूजा गर्ने मातृदेवीहरू"),
    detail: L("A scholar of Newar religion describes the worship as shared by most Newar castes, high or low, in towns and villages.", "नेवार धर्मका एक विद्वान्ले यो पूजा सहर र गाउँका उच्च वा निम्न अधिकांश नेवार जातिमा साझा रहेको बताउँछन्।"),
    evidence: "documented",
    source: "Toffin, article on Matrka/Ajima goddesses",
  },
  {
    id: "aj-pyah",
    term: L("Pyah Thwam Ajima", "प्याः थ्वँ अजिमा"),
    meaning: L("A protective mother-goddess shrine in Balaju Baisdhara Park", "बालाजु बैसधारा पार्कभित्रको रक्षक मातृदेवीको मन्दिर"),
    detail: L("Local reporting describes it as a shrine inside the historic park. Written sources about this shrine are limited, so this site marks what is still being confirmed.", "स्थानीय प्रतिवेदनहरूले यसलाई ऐतिहासिक पार्कभित्रको मन्दिरका रूपमा वर्णन गर्छन्। यस मन्दिरबारे लिखित स्रोत सीमित छन्, त्यसैले यो साइटले अझै पुष्टि हुँदै गरेका कुरा चिन्ह लगाउँछ।"),
    evidence: "community",
    source: "Ajima page; local reporting",
  },
  {
    id: "aj-shitala",
    term: L("Shitala Mai", "शीतला माई"),
    meaning: L("A local name for the Balaju shrine", "बालाजु मन्दिरको स्थानीय नाम"),
    detail: L("In wider tradition, Shitala is a goddess associated with smallpox. This site records that link as belief.", "व्यापक परम्परामा शीतला बिफरसँग सम्बन्धित देवी हुन्। यो साइटले त्यो सम्बन्धलाई विश्वासका रूपमा राख्छ।"),
    evidence: "belief",
    source: "Ajima page; wider tradition",
  },
  {
    id: "aj-dristi",
    term: L("Dristi Lekhan", "दृष्टि लेखन"),
    meaning: L("An eye-painting ritual", "आँखा रंगाउने अनुष्ठान"),
    detail: L("The shrine is described as the home of this ritual. Please do not photograph or share restricted rituals without the Guthi's and the community's permission.", "यो मन्दिरलाई यस अनुष्ठानको थलो भनिन्छ। कृपया प्रतिबन्धित अनुष्ठानको फोटो गुठी र समुदायको अनुमतिबिना नखिच्नुहोस् वा साझा नगर्नुहोस्।"),
    evidence: "community",
    source: "Places page; site footer note",
  },
  {
    id: "aj-park",
    term: L("Balaju Baisdhara Park", "बालाजु बैसधारा पार्क"),
    meaning: L("The historic park where the shrine stands", "मन्दिर रहेको ऐतिहासिक पार्क"),
    detail: L("The garden dates from the 18th century and is now also called Mahendra Park. Locally it is known as Baisdhara because of its 22 stone spouts.", "यो बगैँचा १८ औं शताब्दीको हो र अहिले महेन्द्र पार्क पनि भनिन्छ। २२ वटा ढुङ्गे धाराका कारण स्थानीय रूपमा यसलाई बैसधारा भनिन्छ।"),
    evidence: "documented",
    source: "Lonely Planet; Public Space Profile",
  },
  {
    id: "aj-guthi",
    term: L("Guthi"),
    meaning: L("A community trust that cares for shrines and rituals"),
    detail: L("Guthis are traditional Newar community institutions. Ask before photographing or sharing restricted rituals."),
    evidence: "documented",
    source: "Site footer note; verify wording",
    status: "check",
  },
  {
    id: "aj-hariti",
    term: L("Hariti (Harati)"),
    meaning: L("A Buddhist protector of children, sometimes identified with Ajima"),
    detail: L("Wider context: the Ajima shrine near Swayambhu is linked with her. This is not a claim about the Balaju shrine."),
    evidence: "context",
    source: "Swayambhu shrine pages",
    status: "check",
  },
];

const dharaPairs: MatchPair[] = [
  {
    id: "dh-22",
    term: L("22 Dhara", "२२ धारा"),
    meaning: L("Twenty-two stone water spouts beside the Nagarjun forest", "नागार्जुन वन छेउका बाइसवटा ढुङ्गे जलधारा"),
    detail: L("The spouts are painted stone taps, and the park is known locally by this name.", "धाराहरू रंगाइएका ढुङ्गाका कल हुन्, र पार्क स्थानीय रूपमा यही नामले चिनिन्छ।"),
    evidence: "documented",
    source: "Places page; Public Space Profile",
  },
  {
    id: "dh-bais",
    term: L("Baisdhara", "बैसधारा"),
    meaning: L("'Bais' means twenty-two, 'dhara' means tap or spout", "'बैस' को अर्थ बाइस, 'धारा' को अर्थ कल वा पानीको धारा"),
    detail: L("The name simply counts the spouts: twenty-two stone taps.", "नामले धाराहरूको संख्या मात्र बताउँछ: बाइसवटा ढुङ्गे कल।"),
    evidence: "documented",
    source: "Local reporting",
  },
  {
    id: "dh-dhunge",
    term: L("Dhunge dhara", "ढुङ्गेधारा"),
    meaning: L("A stone water spout", "ढुङ्गाको जलधारा"),
    detail: L("Stone spouts like these are found across the valley, for example in Patan and Bhaktapur.", "यस्ता ढुङ्गे धारा उपत्यकाभरि पाइन्छन्, जस्तै पाटन र भक्तपुरमा।"),
    evidence: "documented",
    source: "Reference entry on dhunge dhara",
  },
  {
    id: "dh-lhuti",
    term: L("Lhuti", "ल्हुति"),
    meaning: L("The Newar name for this place", "यस ठाउँको नेवारी नाम"),
    detail: L("The Newa community calls the place Lhuti, and the full-moon festival there is Lhuti Punhi.", "नेवा समुदायले यस ठाउँलाई ल्हुति भन्छ, र यहाँको पूर्णिमा पर्व ल्हुति पुन्हि हो।"),
    evidence: "community",
    source: "Onlinekhabar",
  },
  {
    id: "dh-punhi",
    term: L("Lhuti Punhi", "ल्हुति पुन्हि"),
    meaning: L("The spring full-moon festival with ritual bathing", "धार्मिक स्नानसहितको वसन्त पूर्णिमा पर्व"),
    detail: L("Reports describe a fair of about five days, with devotees bathing at the 22 spouts. The dates move with the lunar calendar.", "प्रतिवेदनहरूले करिब पाँच दिनको मेला बताउँछन्, जहाँ भक्तजनले २२ धारामा स्नान गर्छन्। मिति चन्द्र पात्रोअनुसार सर्छ।"),
    evidence: "community",
    source: "Onlinekhabar; Ekantipur",
  },
  {
    id: "dh-jamacho",
    term: L("Jamacho"),
    meaning: L("The sacred hill above the park, also called Nagarjun"),
    detail: L("Tradition says the Buddhist teacher Acharya Nagarjuna meditated in a cave there. Some people also climb the hill on Lhuti Punhi."),
    evidence: "belief",
    source: "Onlinekhabar; Newar calendar reference",
    status: "check",
  },
];

export function pairsFor(place: PlaceId) {
  return (place === "ajima" ? ajimaPairs : dharaPairs).filter(available);
}