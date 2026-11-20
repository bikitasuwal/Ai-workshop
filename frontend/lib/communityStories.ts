/**
 * lib/communityStories.ts
 *
 * Seed database & client repository for Community Heritage Stories.
 * Ported from Ward 16 Digital Heritage Archive and tailored for Balaju Living Heritage.
 */

export interface ArchiveCategory {
  id: string;
  label: { en: string; ne: string };
  description: { en: string; ne: string };
  icon: string;
}

export interface StoryPhotograph {
  url: string;
  caption?: { en: string; ne: string };
  credit?: string;
}

export interface CommunityStory {
  id: string;
  slug: string;
  title: { en: string; ne: string };
  contributor: {
    name: string;
    nameNepali?: string;
    age?: number;
    role?: { en: string; ne: string };
    attributionPreference?: "real_name" | "anonymous" | "representative";
  };
  heritageLocation: {
    id: "22-dhara" | "pyatho-ajima" | "ward-16";
    name: { en: string; ne: string };
    slug: string;
  };
  category: string;
  era?: string;
  summary: { en: string; ne: string };
  content: { en: string; ne: string };
  publicationDate: string;
  featured?: boolean;
  photographs?: StoryPhotograph[];
  tags?: string[];
  status?: "approved" | "pending_review";
  referenceId?: string;
}

export const ARCHIVE_CATEGORIES: ArchiveCategory[] = [
  {
    id: "user",
    label: { en: "Submitted by users", ne: "प्रयोगकर्ताद्वारा पठाइएको" },
    description: {
      en: "Stories and memories sent in by visitors and approved by an admin.",
      ne: "आगन्तुकले पठाएका र एडमिनले स्वीकृत गरेका कथा तथा सम्झना।",
    },
    icon: "heart",
  },
  {
    id: "documentation",
    label: { en: "Documentation", ne: "अभिलेख" },
    description: {
      en: "Researched and documented accounts of the places, their traditions and history.",
      ne: "स्थान, परम्परा र इतिहासबारे अनुसन्धान गरी तयार पारिएका अभिलेख।",
    },
    icon: "document-text",
  },
];

export const INITIAL_APPROVED_STORIES: CommunityStory[] = [
  {
    id: "balaju-springs-memory",
    slug: "balaju-springs-memory",
    title: {
      en: "The Vanishing Waters: Memories of the Nagarjun Aquifers",
      ne: "बिलाउँदै गएको मूल: नागार्जुन जलाधारका पुराना सम्झनाहरू",
    },
    contributor: {
      name: "Ram Krishna Manandhar",
      nameNepali: "रामकृष्ण मानन्धर",
      age: 74,
      role: { en: "Lifelong Balaju Resident", ne: "स्थानीय ज्येष्ठ नागरिक, बालाजु" },
      attributionPreference: "real_name",
    },
    heritageLocation: {
      id: "22-dhara",
      name: { en: "22 Dhara (Balaju Baisdhara)", ne: "बाइस धारा (बालाजु बाइसधारा)" },
      slug: "22-dhara",
    },
    category: "documentation",
    era: "1950s - 1970s",
    publicationDate: "2024-03-12",
    featured: true,
    summary: {
      en: "An elder recalls the crystal-clear springs feeding the 22 spouts before rapid urbanization altered the subterranean natural water channels in the late 20th century.",
      ne: "तीव्र सहरीकरण हुनुअघि नागार्जुन डाँडाको फेदीबाट बाइसै धारामा निरन्तर बग्ने कञ्चन पानीका प्राकृतिक मूलहरूबारे एक ज्येष्ठ नागरिकको सम्झना।",
    },
    content: {
      en: `When I was a boy in the late 1950s, the water of Balaju Baisdhara was so clear you could count the pebbles in the water channels. The entire hillside above the 22 spouts was dense with chilaune and uttis trees, and you could hear water gurgling underground beneath your feet.

My father used to say that the water had healing properties because it filtered through mountain herbs before emerging from the dragon (Makara) spouts. On the morning of Chaitra Shukla Purnima, we would wake up at four in the morning to the sound of temple bells and flute music from visiting devotees.

Over the last forty years, many paved roads and concrete homes have been built along the foothills. The water volume has decreased, and municipal pumps now support what nature once provided freely. It is essential that the young people of Ward 16 understand that these water spouts are living ecosystems, not merely decorative stonework.`,
      ne: `विसं २०१५ तिर जब म बालक थिएँ, बालाजु बाइसधाराको पानी यति कञ्चन हुन्थ्यो कि कुलोभित्रका साना ढुङ्गा पनि स्पष्ट देखिन्थे। बाइसधाराभन्दा माथिको नागार्जुन डाँडा उत्तिस र चिलाउनेको बाक्लो जंगलले ढाकिएको थियो, र हिँड्दा जमिनमुनिबाट पानी सुसाइरहेको आवाज स्पष्ट सुनिन्थ्यो।

मेरा बुबा भन्नुहुन्थ्यो कि यो पानी पहाडका जडीबुटी हुँदै छानिन्छ, त्यसैले यसमा रोग निको पार्ने शक्ति हुन्छ। चैत्र शुक्ल पूर्णिमाको दिन बिहान चारै बजे शङ्ख-घण्टको ध्वनि र बाँसुरीको धुनले हामी ब्युँझन्थ्यौँ।

विगत चार दशकमा फेदी वरिपरि पक्की सडक र घरहरू बने। प्राकृतिक पानीको बहाव घट्दै गयो। आजका युवा पुस्ताले के बुझ्न जरुरी छ भने, यी ढुङ्गेधारा केवल कलात्मक ढुङ्गा मात्र होइनन्, यो त प्रकृति र मानव जीवनलाई जोड्ने अमूल्य जीवित प्रणाली हो।`,
    },
    photographs: [
      {
        url: "/images/22-dhara/spouts-detail.jpg",
        caption: {
          en: "The carved Makara water spouts flowing into the stone basin during early spring.",
          ne: "वसन्त ऋतुमा ढुङ्गेधाराबाट जल प्रवाह भइरहेको मनमोहक दृश्य।",
        },
        credit: "Ward 16 Cultural Documentation Project",
      },
    ],
    tags: ["springs", "aquifers", "nagarjun", "baisdhara", "oral history"],
    status: "approved",
  },
  {
    id: "pyatho-ajima-dafa-tradition",
    slug: "pyatho-ajima-dafa-tradition",
    title: {
      en: "Singing into the Twilight: The Dafa Bhajan of Pyatho Ajima",
      ne: "साँझको छहारीमा दाफा भजन: प्याठो अजिमाको भक्ति संगीत",
    },
    contributor: {
      name: "Balaram Chitrakar",
      nameNepali: "बलराम चित्रकार",
      age: 68,
      role: { en: "Guthi Devotional Singer & Painter", ne: "गुठी भजन गायक तथा चित्रकार" },
      attributionPreference: "real_name",
    },
    heritageLocation: {
      id: "pyatho-ajima",
      name: { en: "Pyatho Ajima Temple", ne: "प्याठो अजिमा मन्दिर" },
      slug: "pyatho-ajima",
    },
    category: "documentation",
    era: "Generational Tradition",
    publicationDate: "2024-02-18",
    featured: false,
    summary: {
      en: "A Guthi devotional singer describes the fading yet resilient tradition of singing medieval Newari hymns (Dafa) each evening in the open pavilion facing Pyatho Ajima.",
      ne: "प्याठो अजिमा मन्दिर अगाडिको पाटीमा साँझपख गाइने शास्त्रीय नेवारी दाफा भजन र यसलाई निरन्तरता दिन भइरहेका प्रयासहरूको वृत्तान्त।",
    },
    content: {
      en: `Every dusk after the temple bells ring, five or six of us gather in the wooden pati across from the shrine. We bring out the khin (double-headed drum), the taa (small bronze cymbals), and our handwritten songbooks that have been copied from father to son for three generations.

The songs we sing to Ajima are not in standard Nepali or modern Newar. They are written in an archaic poetic Newari dialect that invokes the eight mother goddesses (Ashta Matrika) to protect our children from epidemics, smallpox, and spiritual distress.

When the pandemic hit a few years ago, we were not allowed to gather in the pati. The silence of the courtyard was unbearable. Once restrictions eased, the very first evening we resumed singing, neighbors from three streets away came out onto their balconies with tears in their eyes. The hymns remind the entire tole that our community heart is still beating.`,
      ne: `मन्दिरको घण्टी बजेपछि साँझको समयमा हामी पाँच-छ जना मन्दिर सामुन्नेको पाटीमा जम्मा हुन्छौँ। हामीसँग खिं (बाजा), ताः (सानो झ्याम्टा) र तीन पुस्तादेखि सारिएका पुराना भजनका पाण्डुलिपिहरू हुन्छन्।

हामीले अजिमालाई सुनाउने भजनहरू प्राचीन नेपाल भाषामा छन्, जसमा अष्टमातृकालाई आफ्ना बालबच्चालाई महामारी र रोगव्याधिबाट जोगाउन पुकारिन्छ।

केही वर्षअघि जब महामारी आयो, पाटीमा भेला हुन पाइएन। त्यो बेला चोकको मौनता निकै पीडादायी थियो। अवस्था सामान्य भएपछि पहिलो दिन जब हामीले भजन सुरु गर्यौँ, आसपासका छिमेकीहरू कौसी र झ्यालबाट सुन्दै निकै भावुक बनेका थिए। यो भजन हाम्रो टोलको एकताको स्पन्दन हो।`,
    },
    photographs: [
      {
        url: "/images/pyatho-ajima/ritual-worship.jpg",
        caption: {
          en: "Evening lamp lighting and quiet devotion at the Pyatho Ajima temple threshold.",
          ne: "प्याठो अजिमा मन्दिरको संघारमा साँझको दीप प्रज्वलन।",
        },
        credit: "Ward 16 Heritage Documentation",
      },
    ],
    tags: ["dafa bhajan", "music", "guthi", "rituals", "community"],
    status: "approved",
  },
  {
    id: "1970s-baisdhara-mela-photo",
    slug: "1970s-baisdhara-mela-photo",
    title: {
      en: "A Family Pilgrimage in 1974: The Historic Baisdhara Mela",
      ne: "विसं २०३१ को पारिवारिक तीर्थयात्रा: ऐतिहासिक बाइसधारा मेला",
    },
    contributor: {
      name: "Nirmala Shrestha",
      nameNepali: "निर्मला श्रेष्ठ",
      age: 61,
      role: { en: "Resident & Cultural Educator", ne: "स्थानीय बासिन्दा तथा शिक्षिका" },
      attributionPreference: "real_name",
    },
    heritageLocation: {
      id: "22-dhara",
      name: { en: "22 Dhara (Balaju Baisdhara)", ne: "बाइस धारा (बालाजु बाइसधारा)" },
      slug: "22-dhara",
    },
    category: "documentation",
    era: "1970s",
    publicationDate: "2024-01-28",
    featured: false,
    summary: {
      en: "A family snapshot from Chaitra Shukla Purnima 1974 shows thousands dressed in traditional Haku Patasi and Daura Suruwal taking ritual ablution under the 22 spouts.",
      ne: "विसं २०३१ सालको चैते पूर्णिमामा परम्परागत हाकुपटासी र दौरासुरुवालमा सजिएका श्रद्धालुहरूले बाइसधारामा स्नान गरिरहेको पारिवारिक तस्बिर र सम्झना।",
    },
    content: {
      en: `My grandfather preserved this black-and-white photograph in an old tin box. It was taken in April 1974 during the annual Baisdhara Mela on Chaitra Shukla Purnima.

In the photograph, you see my grandmother in her black-and-red Haku Patasi standing beneath the twelfth spout with water streaming over her head. Around her, hundreds of families from Patan, Bhaktapur, and the western hills are drying their clothes on the grass or picnicking with beaten rice (baji) and spiced roasted soybeans (choila).

What strikes me most is the absence of modern fencing and plastic packaging. People brought their offerings in copper plates and woven bamboo baskets. It was not just a religious ritual; it was the major annual social gathering where distant relatives met and renewed family friendships.`,
      ne: `मेरा बाजेले यो पुरानो श्यामश्वेत तस्बिर एउटा टिनको बट्टामा जतन गरेर राख्नुभएको थियो। यो विसं २०३१ सालको चैते पूर्णिमा मेलामा खिचिएको हो।

तस्बिरमा मेरी बज्यै हाकुपटासी लगाएर बाह्रौँ धारामा स्नान गर्दै गरेको देखिन्छ। वरिपरि पाटन, भक्तपुर र पश्चिम भेगबाट आएका श्रद्धालुहरू खुला घाँसे मैदानमा च्युरा र छोयला खाँदै रमाइलो गरिरहेका छन्।

त्यसबेला न कुनै फलामे बार थियो, न त प्लास्टिकको फोहोर नै। मानिसहरू तामाका थाली र बाँसका चोयाका डालामा पूजा सामग्री लिएर आउँथे। त्यो केवल धार्मिक स्नान मात्र थिएन, टाढा-टाढाका आफन्तजन भेट्ने र सुख-दुःख साट्ने ठूलो सामाजिक उत्सव थियो।`,
    },
    photographs: [
      {
        url: "/images/22-dhara/baisdhara-mela.jpg",
        caption: {
          en: "Devotees gathering for ritual bathing during the spring Baisdhara Mela.",
          ne: "वसन्त ऋतुको बाइसधारा मेलामा स्नान गर्न भेला भएका श्रद्धालुहरू।",
        },
        credit: "Shrestha Family Private Archive",
      },
    ],
    tags: ["baisdhara mela", "pilgrimage", "festival", "1970s", "haku patasi"],
    status: "approved",
  },
  {
    id: "woodcarver-craft-pyatho",
    slug: "woodcarver-craft-pyatho",
    title: {
      en: "Carving Faith in Sal Wood: Notes on the Ajima Struts",
      ne: "सालको काठमा कुँदिएको आस्था: अजिमाका टुँडालहरूको शिल्पकला",
    },
    contributor: {
      name: "Gyanu Ratna Shilpakar",
      nameNepali: "ज्ञानुरत्न शिल्पकार",
      age: 72,
      role: { en: "Master Woodcarver (Retired)", ne: "वरिष्ठ काष्ठ शिल्पी" },
      attributionPreference: "real_name",
    },
    heritageLocation: {
      id: "pyatho-ajima",
      name: { en: "Pyatho Ajima Temple", ne: "प्याठो अजिमा मन्दिर" },
      slug: "pyatho-ajima",
    },
    category: "documentation",
    era: "1980s Restoration",
    publicationDate: "2024-04-05",
    featured: false,
    summary: {
      en: "A master woodcarver details the traditional joinery, iconography of the Ashta Matrikas, and consecrated Sal timber used in restoring the temple roof struts in the 1980s.",
      ne: "विसं २०४० को दशकमा मन्दिरको छाना मर्मत गर्दा सालको काठमा अष्टमातृकाको स्वरूप कुँद्ने परम्परागत विधिबारे एक अनुभवी काष्ठशिल्पीको टिपोट।",
    },
    content: {
      en: `When our woodcarver guild was asked to repair damaged struts (tundals) on the southern eaves of Pyatho Ajima in 1983, we spent three weeks simply selecting seasoned Sal wood from the Terai forests. Sal is heavy, dense, and resistant to termites, but it requires sharp gouges and immense patience.

Each strut is not just a timber support; it is an incarnation of a protective deity. The lower section features a dwarf yaksha bearing the load, the middle section depicts a multi-armed Matrika holding tantric emblems, and the upper section blossoms into stylized foliage supporting the roof rafters.

Before we made the first cut with our chisels, the temple priest conducted a ritual blessing (Puja) on our tools. We were taught that wood carving is not merely an artistic job; it is meditation through wood and steel.`,
      ne: `विसं २०४० मा जब हाम्रो शिल्पकार समूहलाई प्याठो अजिमा मन्दिरको दक्षिणतर्फको टुँडाल मर्मत गर्ने जिम्मा दिइयो, हामीले तीन हप्ता त तराईको पुरानो सालको काठ छनोट गर्नमै बिताएका थियौँ। सालको काठ निकै बलियो हुन्छ र धमिरा लाग्दैन।

प्रत्येक टुँडाल केवल काठको टेको मात्र होइन, त्यो देवीको स्वरूप हो। तल्लो भागमा भार थेग्ने यक्ष, बीचमा विभिन्न हतियार लिएकी मातृका र माथिल्लो भागमा कलात्मक बुट्टाहरू हुन्छन्।

काठमा पहिलो छिनो चलाउनुअघि पुजारीले हाम्रा औजारहरूको पूजा गरेका थिए। हामीलाई अग्रजहरूले सिकाएका थिए कि काष्ठकला केवल पेसा मात्र होइन, यो काठ र फलामको माध्यमबाट गरिने ध्यान हो।`,
    },
    photographs: [
      {
        url: "/images/pyatho-ajima/timber-struts.jpg",
        caption: {
          en: "Intricately carved Sal-wood roof struts supporting the tiered pagoda roof.",
          ne: "प्याठो अजिमा मन्दिरको छाना अड्याउने कलात्मक सालका टुँडालहरू।",
        },
        credit: "Department of Archaeology Documentation",
      },
    ],
    tags: ["woodcarving", "struts", "architecture", "sal timber", "craft"],
    status: "approved",
  },
  {
    id: "childhood-at-the-bathing-ghats",
    slug: "childhood-at-the-bathing-ghats",
    title: {
      en: "Splashing at the Stone Pools: A 1980s Childhood in Balaju",
      ne: "ढुङ्गे कुण्डमा पानी छ्याप्दै: विसं २०४० को दशकको बाल्यकाल",
    },
    contributor: {
      name: "Suresh Shakya",
      nameNepali: "सुरेश शाक्य",
      age: 49,
      role: { en: "Community Educator", ne: "स्थानीय सामाजिक कार्यकर्ता" },
      attributionPreference: "real_name",
    },
    heritageLocation: {
      id: "22-dhara",
      name: { en: "22 Dhara (Balaju Baisdhara)", ne: "बाइस धारा (बालाजु बाइसधारा)" },
      slug: "22-dhara",
    },
    category: "documentation",
    era: "1980s",
    publicationDate: "2024-05-14",
    featured: false,
    summary: {
      en: "A Balaju local reflects on growing up next to the 22 spouts, learning to swim in the lower bathing pools, and the sacred code of keeping the water pure.",
      ne: "बाइसधारा नजिकै हुर्केका एक स्थानीयको सम्झना: धाराको कञ्चन पानीमा पौडी सिकेको र पानी फोहोर गर्न नहुने स्थानीय संस्कार।",
    },
    content: {
      en: `For those of us who grew up in Balaju in the 1980s, the 22 spouts were our backyard playground and community sanctuary. During hot summer afternoons after school, we would run down to the lower water basins to splash and cool off.

Even as children, we were strictly taught the unwritten laws of the stone spouts: you never put your feet under the upper Makara mouths where people drink, you never use soap near the sacred fountains, and you never step with leather shoes inside the sunken stone hiti.

The elders watched us from the surrounding patis. If any child misbehaved, an elder would clap their hands or call out our parents' names. There was no need for security guards or surveillance cameras—the community itself was the living guardian of the heritage.`,
      ne: `विसं २०४० को दशकमा बालाजुमा हुर्किएका हाम्रा लागि बाइसधारा हाम्रो खेलमैदान र पवित्र थलो दुवै थियो। गर्मीको समयमा स्कुल छुट्टी भएपछि हामी तल्लो पोखरीमा पानी खेल्न दौडिन्थ्यौँ।

बालक छँदै हामीलाई अग्रजहरूले सिकाएका थिए: पिउने धाराको मुखमा खुट्टा राख्नुहुन्न, धारा छेउमा साबुन दल्नुहुन्न, र छालाको जुत्ता लगाएर ढुङ्गेधाराको कुण्डमा पस्नुहुन्न।

वरपरका पाटीमा बसेका बाजे-बज्यैहरूले हामीलाई नियालिरहनुहुन्थ्यो। कुनै बच्चाले गल्ती गर्यो भने उहाँहरू तुरुन्तै सम्झाउनुहुन्थ्यो। त्यसबेला न सुरक्षा गार्ड चाहिन्थ्यो, न त सीसीटिभी नै—सिङ्गो समुदाय नै सम्पदाको सच्चा पहरेदार थियो।`,
    },
    photographs: [
      {
        url: "/images/22-dhara/spouts-row.jpg",
        caption: {
          en: "The historic row of 22 stone spouts pouring perennial water into the stone trough.",
          ne: "ढुङ्गे कुण्डमा निरन्तर जल प्रवाह गरिरहेका ऐतिहासिक बाइस धाराहरू।",
        },
        credit: "Ward 16 Heritage Archive",
      },
    ],
    tags: ["childhood", "swimming", "hiti rules", "elders", "memory"],
    status: "approved",
  },
];
