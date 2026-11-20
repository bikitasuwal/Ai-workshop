/**
 * lib/heritageDetailData.ts
 *
 * Rich archival data, historical timelines, architectural design,
 * living traditions, sources, and interactive suite specifications
 * for 22 Dhara (Balaju Baisdhara) and Pyatho Ajima Temple.
 *
 * Sourced directly from Ward 16 Digital Heritage Archive.
 */

export interface HotspotItem {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  number: string;
  title: { en: string; ne: string };
  element: { en: string; ne: string };
  description: { en: string; ne: string };
  significance: { en: string; ne: string };
  reference: string;
}

export interface ComparisonData {
  title: { en: string; ne: string };
  subtitle: { en: string; ne: string };
  before: {
    label: string;
    date: string;
    source: string;
    src: string;
    caption: { en: string; ne: string };
  };
  after: {
    label: string;
    date: string;
    source: string;
    src: string;
    caption: { en: string; ne: string };
  };
  historicalNotes: { en: string; ne: string };
}

export interface AudioChapter {
  time: number;
  title: string;
}

export interface AudioData {
  title: { en: string; ne: string };
  subtitle: { en: string; ne: string };
  duration: string;
  durationSeconds: number;
  audioSrc: string;
  speaker: { en: string; ne: string };
  transcript: { en: string; ne: string };
  chapters: AudioChapter[];
}

export interface QuizOption {
  id: string;
  text: { en: string; ne: string };
}

export interface QuizQuestion {
  id: string;
  question: { en: string; ne: string };
  options: QuizOption[];
  correctOptionId: string;
  explanation: { en: string; ne: string };
}

export interface QuizData {
  title: { en: string; ne: string };
  description: { en: string; ne: string };
  questions: QuizQuestion[];
}

export interface TimelineEvent {
  year: string;
  yearNepali: string;
  era: { en: string; ne: string };
  title: { en: string; ne: string };
  description: { en: string; ne: string };
  status: "verified" | "documented" | "oral";
}

export interface ArchitectureFeature {
  id: string;
  title: { en: string; ne: string };
  description: { en: string; ne: string };
  status: "verified" | "documented";
}

export interface HeritageSiteDetail {
  id: "22-dhara" | "pyatho-ajima";
  slug: string;
  name: { en: string; ne: string };
  alternateNames: { en: string[]; ne: string[] };
  category: { en: string; ne: string };
  tagline: { en: string; ne: string };
  history: {
    summary: { en: string; ne: string };
    chronicles: {
      heading: { en: string; ne: string };
      text: { en: string; ne: string };
      status: string;
    }[];
    sources: string[];
  };
  architecture: {
    introduction: { en: string; ne: string };
    features: ArchitectureFeature[];
  };
  timeline: TimelineEvent[];
  culturalSignificance: {
    title: { en: string; ne: string };
    description: { en: string; ne: string };
    traditionType: string;
  }[];
  sources: string[];
  hotspots: {
    title: { en: string; ne: string };
    subtitle: { en: string; ne: string };
    image: { src: string; alt: string };
    items: HotspotItem[];
  };
  comparison: ComparisonData;
  audio: AudioData;
  quiz: QuizData;
}

export const HERITAGE_SITES_DATA: Record<"22-dhara" | "pyatho-ajima", HeritageSiteDetail> = {
  "22-dhara": {
    id: "22-dhara",
    slug: "22-dhara",
    name: {
      en: "22 Dhara (Balaju Baisdhara)",
      ne: "बाइस धारा (बालाजु बाइसधारा)",
    },
    alternateNames: {
      en: ["Balaju Twenty-Two Water Spouts", "Baisdhara Water Heritage", "Balaju Hiti"],
      ne: ["बालाजु बाइसधारा", "बाइसधारा तीर्थस्थल", "बालाजु हिति"],
    },
    category: {
      en: "Traditional Water Heritage & Sacred Shrine",
      ne: "परम्परागत जल सम्पदा तथा तीर्थस्थल",
    },
    tagline: {
      en: "Where mountain springs, medieval hydraulic engineering, and sacred living ritual meet.",
      ne: "जहाँ नागार्जुनको मूल, मल्लकालीन जल इन्जिनियरिङ र पवित्र परम्परा एकाकार हुन्छन्।",
    },
    history: {
      summary: {
        en: "22 Dhara is one of the Kathmandu Valley's most celebrated historic water complexes. Originating in the late medieval Malla period with later royal additions during the early Shah era, it represents an extraordinary synthesis of indigenous Newari hydraulic engineering, stone sculpture, and sacred natural ecology.",
        ne: "२२ धारा काठमाडौँ उपत्यकाको प्रख्यात ऐतिहासिक जल संरचना हो। मल्लकालको उत्तराद्र्ध र शाहकालको प्रारम्भमा विकसित यो सम्पदा नेवारी जल इन्जिनियरिङ, ढुङ्गे मूर्तिकला र प्राकृतिक पर्यावरणको अनुपम संगम हो।",
      },
      chronicles: [
        {
          heading: {
            en: "18th-Century Malla Commissioning (1774 CE)",
            ne: "१८ औँ शताब्दीमा मल्लकालीन स्थापना (वि.सं. १८३१)",
          },
          text: {
            en: "Historical records confirm that King Jaya Prakash Malla of Kantipur commissioned the first twenty-one spouts in 1774 CE (Vikram Samvat 1831). Mountain aquifer water was brought down from Nagarjun hill through subterranean earthen pipes to create a royal pleasure park and ritual cleansing sanctuary.",
            ne: "ऐतिहासिक वंशावली अनुसार कान्तिपुरका राजा जयप्रकाश मल्लले वि.सं. १८३१ मा नागार्जुनको शिरबाट बग्ने मूलको पानी संकलन गरी २१ वटा ढुङ्गेधारा निर्माण गराएका थिए।",
          },
          status: "documented",
        },
        {
          heading: {
            en: "Addition of the 22nd Spout & Shah Expansion (1789 CE)",
            ne: "२२ औँ धाराको थप तथा शाहकालीन विस्तार (वि.सं. १८४५)",
          },
          text: {
            en: "Following the unification of the valley, King Rana Bahadur Shah added the twenty-second spout in 1789 CE (Vikram Samvat 1845), completing the revered count of twenty-two. The complex was expanded with shaded rest pavilions (patis/sattals) and surrounding gardens.",
            ne: "उपत्यकाको एकीकरणपछि राजा रणबहादुर शाहले वि.सं. १८४५ तिर बाइसौँ धारा थप गरी 'बाइसधारा' को पूर्ण स्वरूप दिएका थिए। यसपछि यहाँ पाटी, सत्तल र बगैँचा विस्तार गरियो।",
          },
          status: "documented",
        },
        {
          heading: {
            en: "Sanctuary of the Reclining Narayana",
            ne: "जलशयन नारायण मन्दिरको स्थापना",
          },
          text: {
            en: "Within the complex grounds lies a replica of the sacred reclining Vishnu (Balaju Jalashayana Narayana), fashioned after the ancient Budhanilkantha statue. Built during the Malla period so monarchs—who were prohibited by royal superstition from visiting Budhanilkantha—could worship Narayana locally.",
            ne: "यसै परिसरमा बुढानीलकण्ठको नारायण स्वरूप जस्तै जलशयन नारायणको शिला मूर्ति स्थापना गरिएको छ, जसले गर्दा राजाहरूले यहाँ प्रत्यक्ष दर्शन गर्न सक्थे।",
          },
          status: "documented",
        },
      ],
      sources: [
        "Department of Archaeology, Government of Nepal — Monument Survey Records",
        "UNESCO Kathmandu Valley Cultural Heritage Inventory: Water Systems",
        "Regmi, D.R. — Medieval Nepal (Historical Chronicles)",
        "Wright, Daniel — History of Nepal translated from the Vamshavalis",
      ],
    },
    architecture: {
      introduction: {
        en: "The architecture of 22 Dhara represents the pinnacle of traditional Newari stone masonry and gravity-fed water channel engineering (hiti system). Built along a linear terraced revetment wall, each component serves both functional hydrological and symbolic religious roles.",
        ne: "२२ धाराको वास्तुकला परम्परागत नेवारी ढुङ्गे शिल्पकला र गुरुत्वमा आधारित परम्परागत जलप्रणाली (हिति) को उत्कृष्ट उदाहरण हो।",
      },
      features: [
        {
          id: "makara-spouts",
          title: {
            en: "Makara (Mythological Water Beast) Spouts",
            ne: "मकर आकृति भएका ढुङ्गे टुँडाल",
          },
          description: {
            en: "Each of the twenty-two spouts is intricately carved from single blocks of grey sandstone depicting the Makara—a mythical aquatic creature combining crocodile, elephant, and fish characteristics, symbolizing the purity and abundance of water.",
            ne: "प्रत्येक बाइसवटा धारा बलौटे ढुङ्गामा कुँदिएका मकर (गोही, हात्ती र जलचरको मिश्रित स्वरूप) मुखाकृति भएका छन्, जसले जलको पवित्रता र समृद्धिलाई संकेत गर्छ।",
          },
          status: "verified",
        },
        {
          id: "gravity-aqueduct",
          title: {
            en: "Gravity-Fed Subterranean Clay Aqueduct",
            ne: "गुरुत्वमा आधारित भूमिगत माटोको कुलो",
          },
          description: {
            en: "Terracotta pipes and stone channels guide natural seepage from the Nagarjun hill catchment down to a sedimentation chamber behind the stone terrace without mechanical pumps.",
            ne: "नागार्जुन पर्वतको शिरबाट आउने प्राकृतिक मुहानको पानीलाई कुनै पम्प बिना नै भूमिगत माटोको कुलोमार्फत यहाँ ल्याइएको छ।",
          },
          status: "verified",
        },
        {
          id: "stone-basin",
          title: {
            en: "Sunken Stepped Basin & Drainage Floor",
            ne: "ढुङ्गा छापिएको निकास तथा स्नान कुण्ड",
          },
          description: {
            en: "Paved with dressed flagstones, the sunken basin provides stable footing for hundreds of simultaneous bathers while lateral drains continuously convey runoff out to feed park gardens and ponds.",
            ne: "लामो ढुङ्गे कुण्डले एकैपटक सयौँ श्रद्धालुहरूलाई स्नान गर्न सहज बनाउँछ र बगेको पानीलाई निरन्तर बाहिर बगैँचा र पोखरीमा निकास गर्छ।",
          },
          status: "verified",
        },
        {
          id: "rest-sattals",
          title: {
            en: "Traditional Rest Pavilions (Patis & Sattals)",
            ne: "परम्परागत पाटी तथा सत्तलहरू",
          },
          description: {
            en: "Lattice-windowed Newari rest pavilions framing the promenade provide sheltered seating for elders, Guthi meetings, and visiting pilgrims during the annual festival.",
            ne: "नेवारी काष्ठकलाका सुन्दर आँखिझ्याल भएका पाटी-सत्तलहरू मेलामा आउने तीर्थालु र भजन मण्डलीहरूका लागि विश्रामस्थल हुन्।",
          },
          status: "verified",
        },
      ],
    },
    timeline: [
      {
        year: "1774 CE",
        yearNepali: "वि.सं. १८३१",
        era: { en: "Late Malla Period", ne: "मल्लकालको उत्तरार्ध" },
        title: { en: "Construction of 21 Spouts", ne: "२१ वटा ढुङ्गेधाराको निर्माण" },
        description: {
          en: "King Jaya Prakash Malla of Kantipur commissions the original 21 stone spouts fed by Nagarjun hill aquifer channels.",
          ne: "कान्तिपुरका राजा जयप्रकाश मल्लले नागार्जुनको मूल जोडेर सुरुमा २१ वटा ढुङ्गेधारा निर्माण गराए।",
        },
        status: "verified",
      },
      {
        year: "1789 CE",
        yearNepali: "वि.सं. १८४५",
        era: { en: "Early Shah Period", ne: "प्रारम्भिक शाहकाल" },
        title: { en: "Addition of 22nd Spout", ne: "२२ औँ धाराको थप" },
        description: {
          en: "King Rana Bahadur Shah adds the 22nd stone spout, formalizing the sacred number twenty-two (Baisdhara).",
          ne: "राजा रणबहादुर शाहले बाइसौँ धारा थप गरी बाइसधाराको पूर्ण स्वरूप दिए।",
        },
        status: "verified",
      },
      {
        year: "1960s CE",
        yearNepali: "वि.सं. २०२१-२०२५",
        era: { en: "Modern Conservation", ne: "आधुनिक उद्यान विकास" },
        title: { en: "Balaju Udhyan Park Development", ne: "बालाजु उद्यानको विकास" },
        description: {
          en: "The historic complex is incorporated into the landscaped Balaju Baisdhara Park with public swimming pools and protected gardens.",
          ne: "ऐतिहासिक सम्पदालाई समेटेर बालाजु बाइसधारा उद्यान र पौडी पोखरीको विस्तार गरियो।",
        },
        status: "verified",
      },
      {
        year: "2015 CE",
        yearNepali: "वि.सं. २०७२",
        era: { en: "Post-Disaster Resilience", ne: "भूकम्पपछिको अवस्था" },
        title: { en: "Gorkha Earthquake Resilience", ne: "भूकम्पीय दृढता" },
        description: {
          en: "The stone revetment and subterranean channels endure the major earthquake with minimal structural compromise.",
          ne: "विनाशकारी भूकम्पमा पनि बाइसधाराको ढुङ्गे पर्खाल र जलप्रणाली सुरक्षित रह्यो।",
        },
        status: "verified",
      },
      {
        year: "2020s CE",
        yearNepali: "वि.सं. २०७८-हाल",
        era: { en: "Living Community Stewardship", ne: "सामुदायिक संरक्षण" },
        title: { en: "Aquifer Recharge & Heritage Conservation", ne: "जलाधार संरक्षण अभियान" },
        description: {
          en: "Kathmandu Ward 16 and community youth groups initiate watershed monitoring on Nagarjun hill to safeguard water flow.",
          ne: "वडा नं. १६ र स्थानीय युवाहरूद्वारा नागार्जुन जलाधार संरक्षण र पानीको निरन्तर प्रवाहका लागि अभियान सुरु गरियो।",
        },
        status: "verified",
      },
    ],
    culturalSignificance: [
      {
        title: { en: "Lhuti Punhi (Baisdhara Mela)", ne: "ल्हुति पुन्हि (बाइसधारा मेला)" },
        description: {
          en: "Every year on Chaitra Shukla Purnima (full moon of Chaitra), tens of thousands of pilgrims bathe beneath all twenty-two spouts in sequential order, believing the mineral-rich mountain water purifies the body and prevents seasonal skin diseases.",
          ne: "प्रत्येक वर्ष चैत शुक्ल पूर्णिमाको दिन लाग्ने बाइसधारा मेलामा श्रद्धालुहरूले बाइसै धारामा क्रमैसँग स्नान गर्दछन्, जसले रोगव्याधि नाश हुने र पुण्य मिल्ने विश्वास छ।",
        },
        traditionType: "Annual Living Pilgrimage",
      },
      {
        title: { en: "Hindu-Buddhist Syncretism", ne: "हिन्दू-बौद्ध सांस्कृतिक समन्वय" },
        description: {
          en: "The site embodies the harmonious coexistence of Kathmandu's spiritual traditions: Newar Buddhists revere the waters in connection to Nagarjun's meditation caves, while Hindus venerate the presiding Jalashayana Narayana.",
          ne: "बौद्ध धर्मावलम्बीहरू नागार्जुन ध्यान भूमिसँग जोडेर र हिन्दूहरू जलशयन नारायणका रूपमा यस पवित्र तीर्थलाई श्रद्धा गर्दछन्।",
        },
        traditionType: "Spiritual Syncretism",
      },
      {
        title: { en: "Medicinal Mountain Water Beliefs", ne: "जडीबुटीयुक्त पानीको औषधीय गुण" },
        description: {
          en: "Elders recount that water filtering down through Nagarjun's wild medicinal herbs carries therapeutic minerals, relieving joint pains and skin irritation.",
          ne: "नागार्जुनका प्राकृतिक जडीबुटीहरूबाट छानिँदै आउने पानीमा औषधीय गुण हुने र यसले छाला तथा बाथ रोगमा फाइदा पुग्ने जनविश्वास छ।",
        },
        traditionType: "Traditional Medicine",
      },
    ],
    sources: [
      "Department of Archaeology, Government of Nepal — Monument Survey Records",
      "Kathmandu Valley: The Preserved Sites (UNESCO / Department of Archaeology)",
      "Regmi, D.R. — Medieval Nepal (Historical Chronicles)",
      "Ward 16 Cultural Heritage Documentation Initiative (2024)",
    ],
    hotspots: {
      title: {
        en: "Architectural & Hydraulic Hotspots",
        ne: "वास्तुकला तथा जलप्रणालीका मुख्य अङ्गहरू",
      },
      subtitle: {
        en: "Click any numbered marker on the diagram below to explore the craftsmanship, gravity engineering, and cultural symbolism of 22 Dhara.",
        ne: "वास्तुकला, इन्जिनियरिङ र सांस्कृतिक महत्त्व बुझ्न तलका नम्बरहरूमा क्लिक गर्नुहोस्।",
      },
      image: {
        src: "/images/22-dhara/architecture-overview.jpg",
        alt: "22 Dhara architectural layout and stone spouts",
      },
      items: [
        {
          id: "spout-makara",
          x: 28,
          y: 46,
          number: "01",
          title: {
            en: "Carved Stone Makara Spout (Hiti-Manga)",
            ne: "मकर आकृति भएको ढुङ्गेधारा (हितिमङ्ग)",
          },
          element: {
            en: "Architectural Feature: Carved Spout",
            ne: "वास्तुकला: कुँदिएको ढुङ्गे टुँडाल",
          },
          description: {
            en: "Each of the twenty-two spouts is carved from dense grey sandstone depicting the Makara—a composite mythological water beast combining the snout of a crocodile, trunk of an elephant, and tail of a peacock.",
            ne: "प्रत्येक बाइसवटा ढुङ्गेधारा बलौटे ढुङ्गाबाट कुँदिएका छन्। मकरको मुखाकृतिले जलको पवित्रता र निरन्तर प्रवाहलाई संकेत गर्दछ।",
          },
          significance: {
            en: "In Newar and Vedic cosmology, the Makara is the vehicle of Varuna (god of water) and Ganga (river goddess), purifying mountain spring water as sacred nectar.",
            ne: "हिन्दू तथा बौद्ध परम्परामा मकरलाई वरुण र गङ्गाको वाहन मानिन्छ, जसले यहाँको पानीलाई पवित्र जलको रूपमा शुद्ध गर्छ।",
          },
          reference: "Department of Archaeology, Government of Nepal — Stone Monument Survey Records",
        },
        {
          id: "aqueduct-inlet",
          x: 52,
          y: 20,
          number: "02",
          title: {
            en: "Subterranean Mountain Aqueduct",
            ne: "भूमिगत प्राकृतिक जलप्रणाली",
          },
          element: {
            en: "Hydraulic Engineering: Gravity Conduit",
            ne: "जल इन्जिनियरिङ: गुरुत्व कुलो",
          },
          description: {
            en: "Subterranean terracotta and stone conduits channel perennial seepage from the high forest springs of Nagarjun hill (Jamacho) directly into distribution chambers behind the revetment wall without electric pumps.",
            ne: "नागार्जुन पर्वतको शिरबाट आउने प्राकृतिक मुहानको पानीलाई कुनै मेसिन बिना नै गुरुत्वाकर्षणका आधारमा भूमिगत माटोको कुलोमार्फत यहाँ ल्याइएको छ।",
          },
          significance: {
            en: "Represents indigenous Malla-era hydrological understanding of geological pressure balances, delivering mineral-rich water at stable temperatures year-round.",
            ne: "मल्लकालीन इन्जिनियरिङको यो उत्कृष्ट नमुनाले वर्षैभरि स्थिर तापक्रममा खनिजयुक्त स्वच्छ पानी उपलब्ध गराउँछ।",
          },
          reference: "UNESCO Kathmandu Valley Cultural Heritage Inventory: Water Systems",
        },
        {
          id: "drainage-basin",
          x: 48,
          y: 78,
          number: "03",
          title: {
            en: "Sunken Stone Paved Basin (Hiti-Gah)",
            ne: "ढुङ्गा छापिएको जल कुण्ड (हितिगः)",
          },
          element: {
            en: "Spatial Design: Drainage Trough",
            ne: "वास्तुकला: निकास तथा स्नान कुण्ड",
          },
          description: {
            en: "A continuous, linear sunken stone pavement allows hundreds of pilgrims to stand comfortably beneath the cascading water while secondary channels continuously flush spent water outward.",
            ne: "लामो ढुङ्गे कुण्डले एकैपटक हजारौँ श्रद्धालुहरूलाई स्नान गर्न सहज बनाउँछ र बगेको पानीलाई निरन्तर बाहिर निकास गर्छ।",
          },
          significance: {
            en: "Designed for public sanitation and ritual cleanliness: running water prevents standing contamination and flows directly to nourish adjacent agricultural plots and park gardens.",
            ne: "पानी नजम्ने र निरन्तर बगिरहने गरी बनाइएको यो संरचनाले सरसफाइ र सार्वजनिक स्वास्थ्यलाई ध्यानमा राखेको छ।",
          },
          reference: "Korn, Wolfgang — The Traditional Architecture of the Kathmandu Valley",
        },
        {
          id: "rest-pavilion",
          x: 82,
          y: 34,
          number: "04",
          title: {
            en: "Pilgrim Rest Pavilion (Sattal)",
            ne: "परम्परागत सत्तल तथा विश्रामस्थल",
          },
          element: {
            en: "Vernacular Architecture: Timber & Brick Sattal",
            ne: "काष्ठकला तथा ईँटाले बनेको पाटी",
          },
          description: {
            en: "Tiered brick-and-timber rest houses with traditional Newari lattice windows (jhyal) and open colonnades provide shelter for pilgrims and festival participants.",
            ne: "नेवारी काष्ठकलाका सुन्दर आँखिझ्याल र खम्बाहरू भएका यी पाटी-सत्तलहरू मेलामा आउने तीर्थालुहरूका लागि विश्रामस्थल हुन्।",
          },
          significance: {
            en: "Civic community infrastructure that transforms the physical water source into a social living room for intergenerational dialogue and festival congregation.",
            ne: "तीर्थस्थललाई सामाजिक जमघट र सांस्कृतिक विमर्शको केन्द्र बनाउन यस्ता सत्तलहरूले महत्त्वपूर्ण भूमिका खेलेका छन्।",
          },
          reference: "Kathmandu Metropolitan Municipal Archives: Ward 16 Monument Register",
        },
      ],
    },
    comparison: {
      title: {
        en: "Then & Now: Architectural Continuity",
        ne: "विगत र वर्तमान: बाइसधाराको निरन्तरता",
      },
      subtitle: {
        en: "Drag the slider to compare the historic mid-20th century layout with contemporary preservation in Ward 16.",
        ne: "विगतको स्वरूप र वर्तमान संरक्षण अवस्था तुलना गर्न बीचको रेखालाई दायाँ-बायाँ सार्नुहोस्।",
      },
      before: {
        label: "Historic Archive (c. 1960s)",
        date: "c. 1960s CE",
        source: "Department of Archaeology Archive",
        src: "/images/22-dhara/comparison-historic.jpg",
        caption: {
          en: "Balaju waterspouts following royal garden restoration in the 1960s.",
          ne: "वि.सं. २०२२ तिर बालाजु उद्यान विस्तारपछिको ऐतिहासिक तस्बिर।",
        },
      },
      after: {
        label: "Present Day Stewardship",
        date: "Contemporary Archive",
        source: "Ward 16 Heritage Documentation Project",
        src: "/images/22-dhara/comparison-contemporary.jpg",
        caption: {
          en: "The living waterspouts maintained as an active cultural sanctuary by Ward 16 and local caretakers.",
          ne: "वडा नं. १६ र स्थानीय समुदायद्वारा संरक्षित वर्तमान बाइसधारा परिसर।",
        },
      },
      historicalNotes: {
        en: "While the forested background of Nagarjun hill remains intact, urban development in the outer perimeter has heightened the importance of protecting the underground spring recharge zone.",
        ne: "नागार्जुनको वनक्षेत्र जोगाइए तापनि आसपासको तीव्र सहरीकरणका कारण पानीको मूल रिचार्ज हुने क्षेत्रको संरक्षण अझ संवेदनशील बनेको छ।",
      },
    },
    audio: {
      title: {
        en: "The Living Springs of Balaju",
        ne: "बालाजुको जीवन्त जल सम्पदा",
      },
      subtitle: {
        en: "A spoken audio tour detailing the engineering, royal history and annual Baisdhara Mela.",
        ne: "बाइसधाराको इतिहास, प्रविधि र चैते पूर्णिमा मेलाको मौखिक वृत्तान्त।",
      },
      duration: "03:15",
      durationSeconds: 195,
      audioSrc: "/audio/22-dhara-narration.mp3",
      speaker: {
        en: "Ward 16 Cultural Heritage Documentation Initiative",
        ne: "वडा नं. १६ सांस्कृतिक सम्पदा संरक्षण समिति",
      },
      transcript: {
        en: "Welcome to 22 Dhara, also known throughout Nepal as Balaju Baisdhara. Standing before these stone spouts, you are witnessing nearly three centuries of living water heritage.\n\nIn the mid-eighteenth century, King Jaya Prakash Malla brought water from the high forest springs of Nagarjun hill through underground clay pipes to feed twenty-one sculpted spouts. A few decades later, King Rana Bahadur Shah added the twenty-second spout, completing the sacred count of twenty-two.\n\nEvery year on the full moon of Chaitra, thousands of pilgrims arrive before dawn. They bathe under each of the twenty-two spouts in sequence, trusting in the healing minerals of Nagarjun and seeking spiritual renewal.",
        ne: "२२ धारा अर्थात् बालाजु बाइसधारामा यहाँलाई स्वागत छ। यी ढुङ्गेधाराहरू अगाडि उभिँदा तपाईं झण्डै तीन शताब्दी पुरानो जीवित जल सम्पदाको प्रत्यक्षदर्शी बन्नुहुन्छ।\n\n१८ औँ शताब्दीको मध्यतिर राजा जयप्रकाश मल्लले नागार्जुन डाँडाको मुहानबाट पानी ल्याएर सुरुमा २१ वटा धारा बनाएका थिए। पछि राजा रणबहादुर शाहले बाइसौँ धारा थप गरी बाइसधाराको पूर्ण स्वरूप दिए।\n\nप्रत्येक वर्ष चैते पूर्णिमामा हजारौँ श्रद्धालुहरू बिहान सबेरै आएर बाइसै धारामा क्रमैसँग स्नान गर्दछन् र नयाँ आध्यात्मिक ऊर्जा प्राप्त गर्दछन्।",
      },
      chapters: [
        { time: 0, title: "1. Origins & Royal Chronicles" },
        { time: 55, title: "2. The Makara Spout Architecture" },
        { time: 110, title: "3. Lhuti Punhi Sacred Bathing" },
        { time: 155, title: "4. Protecting the Nagarjun Watershed" },
      ],
    },
    quiz: {
      title: {
        en: "Test Your Knowledge: 22 Dhara",
        ne: "ज्ञान परीक्षण: बाइसधारा सम्पदा",
      },
      description: {
        en: "Answer five questions grounded in verified historical chronicles and Newar architecture.",
        ne: "बाइसधाराको इतिहास र वास्तुकला सम्बन्धी ५ वटा प्रश्नहरूको सही उत्तर दिनुहोस्।",
      },
      questions: [
        {
          id: "q1",
          question: {
            en: "Which king originally commissioned the first twenty-one stone spouts in the mid-18th century?",
            ne: "१८ औँ शताब्दीको मध्यतिर सुरुमा २१ वटा ढुङ्गेधारा निर्माण गर्ने राजा को हुन्?",
          },
          options: [
            { id: "a", text: { en: "King Pratap Malla", ne: "राजा प्रताप मल्ल" } },
            { id: "b", text: { en: "King Jaya Prakash Malla", ne: "राजा जयप्रकाश मल्ल" } },
            { id: "c", text: { en: "King Prithvi Narayan Shah", ne: "राजा पृथ्वीनारायण शाह" } },
            { id: "d", text: { en: "King Bhupatindra Malla", ne: "राजा भूपतीन्द्र मल्ल" } },
          ],
          correctOptionId: "b",
          explanation: {
            en: "Historical chronicles document that King Jaya Prakash Malla of Kantipur commissioned the original twenty-one water spouts around 1774 CE.",
            ne: "ऐतिहासिक वंशावली अनुसार कान्तिपुरका राजा जयप्रकाश मल्लले वि.सं. १८३१ मा सुरुमा २१ वटा धारा निर्माण गराएका थिए।",
          },
        },
        {
          id: "q2",
          question: {
            en: "Who added the twenty-second water spout to complete the revered count of 'Baisdhara'?",
            ne: "२२ औँ धारा थप गरी 'बाइसधारा' को पूर्ण स्वरूप दिने राजा को हुन्?",
          },
          options: [
            { id: "a", text: { en: "King Rana Bahadur Shah", ne: "राजा रणबहादुर शाह" } },
            { id: "b", text: { en: "King Tribhuvan", ne: "राजा त्रिभुवन" } },
            { id: "c", text: { en: "King Mahendra", ne: "राजा महेन्द्र" } },
            { id: "d", text: { en: "King Yaksha Malla", ne: "राजा यक्ष मल्ल" } },
          ],
          correctOptionId: "a",
          explanation: {
            en: "King Rana Bahadur Shah added the twenty-second spout in 1789 CE (1845 BS), completing the historic 'Baisdhara'.",
            ne: "राजा रणबहादुर शाहले वि.सं. १८४५ (सन् १७८९) मा बाइसौँ धारा थप गरी बाइसधारा बनाएका थिए।",
          },
        },
        {
          id: "q3",
          question: {
            en: "What mythical creature is sculpted on the stone spouts to symbolize water purity?",
            ne: "जलको पवित्रता दर्शाउन ढुङ्गेधारामा कुन पौराणिक जलचरको आकृति कुँदिएको छ?",
          },
          options: [
            { id: "a", text: { en: "Garuda", ne: "गरुड" } },
            { id: "b", text: { en: "Makara (Mythical Water Beast)", ne: "मकर" } },
            { id: "c", text: { en: "Airavata (Sacred Elephant)", ne: "ऐरावत हात्ती" } },
            { id: "d", text: { en: "Simha (Lion Guardian)", ne: "सिंह" } },
          ],
          correctOptionId: "b",
          explanation: {
            en: "The Makara—a mythical creature with crocodile and elephant features—is the sacred vehicle of water deities Ganga and Varuna in Hindu-Buddhist cosmology.",
            ne: "मकर जलकी देवी गङ्गा र वरुणको वाहन मानिने भएकाले ढुङ्गेधाराको मुखाकृतिमा मकर कुँद्ने प्राचीन परम्परा छ।",
          },
        },
        {
          id: "q4",
          question: {
            en: "During which annual festival do tens of thousands of pilgrims take a holy bath under all 22 spouts?",
            ne: "कुन पर्वका दिन हजारौँ भक्तजनहरूले बाइसै धारामा पवित्र स्नान गर्दछन्?",
          },
          options: [
            { id: "a", text: { en: "Indra Jatra", ne: "इन्द्रजात्रा" } },
            { id: "b", text: { en: "Baisdhara Mela (Chaitra Shukla Purnima)", ne: "बाइसधारा मेला (चैते पूर्णिमा)" } },
            { id: "c", text: { en: "Maha Shivaratri", ne: "महाशिवरात्रि" } },
            { id: "d", text: { en: "Janai Purnima", ne: "जनै पूर्णिमा" } },
          ],
          correctOptionId: "b",
          explanation: {
            en: "Baisdhara Mela is celebrated on Chaitra Shukla Purnima (the full moon of Chaitra, usually April), when devotees bathe in sequence for health and merit.",
            ne: "प्रत्येक वर्ष चैत शुक्ल पूर्णिमाको दिन लाग्ने बाइसधारा मेलामा स्नान गर्नाले छाला सम्बन्धी रोग निको हुने र पुण्य लाभ हुने जनविश्वास छ।",
          },
        },
        {
          id: "q5",
          question: {
            en: "From which natural forested hill does 22 Dhara derive its perennial mountain spring water?",
            ne: "बाइसधारामा आउने प्राकृतिक मूलको पानी कुन संरक्षित वन क्षेत्रबाट आउँछ?",
          },
          options: [
            { id: "a", text: { en: "Chandragiri Hill", ne: "चन्द्रागिरि डाँडा" } },
            { id: "b", text: { en: "Nagarjun Hill (Jamacho)", ne: "नागार्जुन पर्वत (जामाचो)" } },
            { id: "c", text: { en: "Phulchoki Hill", ne: "फूलचोकी डाँडा" } },
            { id: "d", text: { en: "Shivapuri Peak", ne: "शिवपुरी डाँडा" } },
          ],
          correctOptionId: "b",
          explanation: {
            en: "The water originates from the dense forest catchment of Nagarjun Hill (Jamacho), flowing naturally by gravity into the subterranean brick-and-clay conduits.",
            ne: "बाइसधाराको पानी नागार्जुन राष्ट्रिय निकुञ्ज (जामाचो) को प्राकृतिक जलाधारबाट भूमिगत कुलो हुँदै आउँछ।",
          },
        },
      ],
    },
  },
  "pyatho-ajima": {
    id: "pyatho-ajima",
    slug: "pyatho-ajima",
    name: {
      en: "Pyatho Ajima Temple",
      ne: "प्याठो अजिमा मन्दिर",
    },
    alternateNames: {
      en: ["Pyatho Ajima Dega", "Pyatho Devi Shrine", "Pyatho Ajima Mother Goddess Sanctuary"],
      ne: ["प्याठो अजिमा द्यःछेँ", "प्याठो देवी मन्दिर", "मातृका अजिमा पीठ"],
    },
    category: {
      en: "Traditional Community Temple & Mother Goddess Shrine",
      ne: "परम्परागत स्थानीय मन्दिर तथा अजिमा पीठ",
    },
    tagline: {
      en: "A sacred sanctuary of maternal protection, Newar woodcarving, and neighborhood solidarity.",
      ne: "मातृस्नेह, नेवारी काष्ठकला र सामुदायिक एकताको पवित्र थलो।",
    },
    history: {
      summary: {
        en: "Pyatho Ajima Temple is a revered community sanctuary in Ward 16 dedicated to Ajima—the protective maternal ancestor deity central to Newar cultural and spiritual life. Rooted in medieval Kathmandu's neighbourhood development, the shrine has served for centuries as a vital nexus of community solidarity, disease protection rituals, and matrilineal spiritual reverence.",
        ne: "प्याठो अजिमा मन्दिर वडा नं. १६ मा अवस्थित एक ऐतिहासिक तथा पवित्र समुदाय-केन्द्रित देवालय हो। नेवार संस्कृतिमा मातृ तथा संरक्षक शक्तिका रूपमा पुजिने अजिमाको यो मन्दिरले शताब्दीयौँदेखि स्थानीय बासिन्दाहरूको स्वास्थ्य रक्षा, पारिवारिक कल्याण र सामुदायिक एकताको केन्द्रका रूपमा काम गर्दै आएको छ।",
      },
      chronicles: [
        {
          heading: {
            en: "Malla-Era Neighborhood Guardian Foundations",
            ne: "मल्लकालीन टोल संरक्षक पीठ",
          },
          text: {
            en: "In the urban topology of the medieval Kathmandu Valley, settlements were safeguarded by concentric rings of protective mother goddesses (Ajimas or Matrikas). Pyatho Ajima was established as a localized guardian deity to protect neighborhood inhabitants from epidemics and illness.",
            ne: "मध्यकालीन काठमाडौँ उपत्यकाको सहरी संरचनामा टोल र बस्तीहरूको सुरक्षाका लागि मातृत्व शक्तिका रूपमा अजिमा (मातृका) पीठहरूको स्थापना गर्ने विशिष्ट परम्परा थियो। प्याठो अजिमा यस भेगका बासिन्दाहरूको रोगब्याधीबाट रक्षा गर्ने संरक्षक शक्तिका रूपमा स्थापित गरिएको मानिन्छ।",
          },
          status: "documented",
        },
        {
          heading: {
            en: "Guthi Community Custodianship & Maintenance",
            ne: "गुठी परम्परा र सामुदायिक संरक्षण",
          },
          text: {
            en: "Historical records show that the temple was historically sustained through autonomous Newar Guthis (traditional community trusts). Lineage families contributed sesame oil for perpetual lamps, and collective labor for periodic structural repair.",
            ne: "ऐतिहासिक अभिलेखहरू अनुसार यो मन्दिर स्थानीय नेवार गुठीहरूको सक्रिय सहकार्यमा सञ्चालन हुँदै आएको छ। विभिन्न कुल तथा दाफा खलःहरूले नियमित पूजा, मर्मत सम्भार र पर्वहरूको व्यवस्थापन गर्दै आएका छन्।",
          },
          status: "documented",
        },
        {
          heading: {
            en: "Post-Disaster Resiliency & Conservation",
            ne: "पुनर्निर्माण र आधुनिक संरक्षण",
          },
          text: {
            en: "Like many sacred masonry structures in Kathmandu, Pyatho Ajima has withstood valley earthquakes over the centuries. Local community committees, in consultation with heritage preservation guidelines, periodically renovate timber roof structures while preserving the ancient sanctum stone intact.",
            ne: "स्थानीय संरक्षण समिति र वडाको पहलमा मन्दिरको मूल स्वरूप र गर्भगृहको शिला नबिग्रने गरी काष्ठकला तथा छानाको संरक्षण कार्य हुँदै आएको छ।",
          },
          status: "verified",
        },
      ],
      sources: [
        "Slusser, Mary Shepherd — Nepal Mandala: A Cultural Study of the Kathmandu Valley",
        "Department of Archaeology, Government of Nepal — Cultural Property Survey Records",
        "Ward 16 Local Community Guthi Archives & Oral Testimony",
        "Gellner, David N. — Monk, Householder, and Tantric Priest",
      ],
    },
    architecture: {
      introduction: {
        en: "Pyatho Ajima Temple exemplifies classical Newar vernacular sacred architecture. Featuring exposed polished terracotta brickwork, intricate timber roof struts, and a consecrated river-stone sanctum, the shrine harmonizes engineering resilience with devotional artistry.",
        ne: "प्याठो अजिमा मन्दिर परम्परागत नेवारी वास्तुकलाको सुन्दर नमुना हो। दाची अप्पा ईँटा, कुँदिएका सालका टुँडाल र प्राकृतिक शिला गर्भगृहले यस मन्दिरलाई आध्यात्मिक र कलात्मक दृष्टिले अद्वितीय बनाएका छन्।",
      },
      features: [
        {
          id: "aniconic-sanctum",
          title: {
            en: "Aniconic River Stone Sanctum (Garbhagriha)",
            ne: "प्राकृतिक शिलायुक्त गर्भगृह",
          },
          description: {
            en: "Rather than an anthropomorphic idol, the sanctum enshrines an ancient consecrated natural stone embodying the raw maternal earth energy of Ajima.",
            ne: "मन्दिरको गर्भगृहमा मानवाकार मूर्ति नभई प्राचीन प्राकृतिक शिलालाई नै साक्षात् देवीका रूपमा पूजा गरिन्छ।",
          },
          status: "verified",
        },
        {
          id: "carved-struts",
          title: {
            en: "Intricately Carved Sal-Wood Struts (Tundals)",
            ne: "कलात्मक सालका टुँडालहरू",
          },
          description: {
            en: "Angled timber struts carved from dense Sal hardwood transfer roof loads while depicting multi-armed protective Matrikas with tantric emblems.",
            ne: "सालको कडा काठबाट बनाइएका यी टुँडालहरूले छानालाई आड दिनुका साथै विभिन्न देवी-देवताका कलात्मक स्वरूप प्रस्तुत गर्छन्।",
          },
          status: "verified",
        },
        {
          id: "dachi-appa",
          title: {
            en: "Polished Terracotta Brickwork (Dachi Appa)",
            ne: "दाची अप्पा (परम्परागत चिल्लो ईँटा)",
          },
          description: {
            en: "High-fired wedge-profile bricks laid with fine yellow mud mortar provide seismic flexural resistance and thermal mass.",
            ne: "मन्दिरको बाहिरी भागमा पानी नछिर्ने गरी मसिनो माटोको जोर्नीमा दाची अप्पा ईँटा कुशलतापूर्वक जडान गरिएको छ।",
          },
          status: "verified",
        },
        {
          id: "courtyard-quadrangle",
          title: {
            en: "Communal Courtyard (Nanani) & Open Bhajan Pati",
            ne: "सामुदायिक चोक र भजन पाटी",
          },
          description: {
            en: "The temple opens directly into a residential quadrangle and connects to an open wooden pavilion where neighborhood elders sing evening Dafa hymns.",
            ne: "मन्दिर खुला ढुङ्गे चोकमा अवस्थित छ र यससँगै जोडिएको पाटीमा स्थानीय बासिन्दाहरू साँझपख भजन गाउन भेला हुन्छन्।",
          },
          status: "verified",
        },
      ],
    },
    timeline: [
      {
        year: "14th-15th c.",
        yearNepali: "वि.सं. १४ औँ-१५ औँ शताब्दी",
        era: { en: "Early Malla Era", ne: "प्रारम्भिक मल्लकाल" },
        title: { en: "Establishment of Guardian Shrine", ne: "संरक्षक पीठको स्थापना" },
        description: {
          en: "Consecration of the natural mother-goddess stone sanctum to protect local settlement from viral epidemics.",
          ne: "टोल बस्तीलाई महामारी र रोगव्याधिबाट जोगाउन प्राकृतिक शिला पीठको स्थापना।",
        },
        status: "oral",
      },
      {
        year: "17th-18th c.",
        yearNepali: "वि.सं. १७ औँ-१८ औँ शताब्दी",
        era: { en: "High Malla Period", ne: "मध्य मल्लकाल" },
        title: { en: "Tiered Temple Construction & Woodcraft", ne: "मन्दिर तथा काष्ठकलाको विस्तार" },
        description: {
          en: "Addition of tiered terracotta roof, carved Sal-wood struts, and establishment of dedicated Guthi endowments.",
          ne: "कलात्मक टुँडालसहितको छाना निर्माण र गुठी व्यवस्थाको स्थापना।",
        },
        status: "documented",
      },
      {
        year: "1980s CE",
        yearNepali: "वि.सं. २०४० को दशक",
        era: { en: "Guild Restoration", ne: "शिल्पकार मर्मत" },
        title: { en: "Timber & Roof Conservation", ne: "छाना र काष्ठकलाको संरक्षण" },
        description: {
          en: "Local woodcarver guilds repair weather-worn struts following traditional Newari joinery techniques.",
          ne: "परम्परागत विधिअनुसार पुराना टुँडालहरूको मर्मत तथा संरक्षण।",
        },
        status: "verified",
      },
      {
        year: "2015 CE",
        yearNepali: "वि.सं. २०७२",
        era: { en: "Seismic Recovery", ne: "भूकम्पपछिको पुनरुत्थान" },
        title: { en: "Courtyard & Wall Stabilization", ne: "पर्खाल तथा चोकको सबलीकरण" },
        description: {
          en: "Community Guthi members stabilize exterior brickwork and repave courtyard stone flags.",
          ne: "समुदायको अगुवाइमा मन्दिरको बाहिरी पर्खाल र चोकको ढुङ्गा पुनः छापियो।",
        },
        status: "verified",
      },
      {
        year: "Present",
        yearNepali: "हाल",
        era: { en: "Living Traditions", ne: "जीवन्त निरन्तरता" },
        title: { en: "Daily Devotion & Eye-Painting (Dristi Lekhan)", ne: "दृष्टि लेखन तथा नियमित पूजा" },
        description: {
          en: "Annual Dristi Lekhan rituals performed by Chitrakar artists alongside daily morning and evening worship.",
          ne: "चित्रकार समूहद्वारा वार्षिक रूपमा गरिने दृष्टि लेखन तथा नियमित दीप प्रज्वलन।",
        },
        status: "verified",
      },
    ],
    culturalSignificance: [
      {
        title: { en: "Maternal Protection of Children", ne: "बालबालिकाको ममतामयी सुरक्षा" },
        description: {
          en: "In Newar spiritual life, 'Ajima' (Grandmother) is an approachable maternal protector. Mothers bring infants here at daybreak to pray for protection against fevers, measles, and smallpox.",
          ne: "नेपाल भाषामा 'अजिमा' को अर्थ हजुरआमा हुन्छ। बालबच्चालाई ज्वरो, दादुरा र रोगव्याधिबाट जोगाउन आमाहरू यहाँ आएर पूजाआजा गर्दछन्।",
        },
        traditionType: "Matrilineal Devotion",
      },
      {
        title: { en: "Dristi Lekhan (Ritual Eye Painting)", ne: "दृष्टि लेखन अनुष्ठान" },
        description: {
          en: "Once a year, hereditary Pũ (Chitrakar) artisans consecrate new pigments to paint the divine eyes of the deity, awakening spiritual vision and renewing the community's bond with the divine.",
          ne: "प्रत्येक वर्ष परम्परागत चित्रकारहरूले नयाँ प्राकृतिक रंगले देवीको आँखा कोर्ने (दृष्टि लेखन) अनुष्ठान गर्छन्, जसले आध्यात्मिक दृष्टि जागृत गराउँछ।",
        },
        traditionType: "Hereditary Art Ritual",
      },
      {
        title: { en: "Evening Dafa Bhajan & Guthi Life", ne: "साँझको दाफा भजन तथा गुठी परम्परा" },
        description: {
          en: "Local elders gather in the adjoining wooden pati to sing devotional classical hymns with double-headed drums (khin) and bronze cymbals (taa), sustaining neighbourhood unity.",
          ne: "मन्दिरसँगैको पाटीमा साँझपख बज्ने खिं बाजा र ताः को धुनमा गाइने दाफा भजनले बस्तीमा आपसी भाइचारा र शान्ति कायम राख्छ।",
        },
        traditionType: "Community Music & Trust",
      },
    ],
    sources: [
      "Slusser, Mary Shepherd — Nepal Mandala: A Cultural Study of the Kathmandu Valley",
      "Gellner, David N. — Monk, Householder, and Tantric Priest",
      "Department of Archaeology, Government of Nepal — Timber Monument Documentation",
      "Pyatho Ajima Guthi Sansthan Trust Records (Ward 16)",
    ],
    hotspots: {
      title: {
        en: "Vernacular Sacred Architecture Hotspots",
        ne: "मन्दिर वास्तुकलाका मुख्य अङ्गहरू",
      },
      subtitle: {
        en: "Click any numbered marker on the temple facade to explore Newar woodcarvings, masonry, and courtyard sacred spaces.",
        ne: "मन्दिरको काष्ठकला, परम्परागत ईँटा र पवित्र गर्भगृह बुझ्न तलका नम्बरहरूमा क्लिक गर्नुहोस्।",
      },
      image: {
        src: "/images/pyatho-ajima/hero.jpg",
        alt: "Pyatho Ajima Temple architectural facade layout",
      },
      items: [
        {
          id: "sacred-sanctum",
          x: 48,
          y: 62,
          number: "01",
          title: {
            en: "Sacred Natural Stone Sanctum (Garbhagriha)",
            ne: "प्राकृतिक शिलायुक्त गर्भगृह",
          },
          element: {
            en: "Sacred Iconography: Aniconic River Stone",
            ne: "धार्मिक स्वरूप: प्राकृतिक शिला पीठ",
          },
          description: {
            en: "Unlike temples with humanized bronze idols, Pyatho Ajima's core sanctum houses an ancient aniconic river-stone embodying the primordial mother goddess.",
            ne: "यस मन्दिरको गर्भगृहमा कुनै मानवाकार मूर्ति नभई प्राचीन प्राकृतिक शिलालाई नै साक्षात् देवीका रूपमा पूजा गरिन्छ।",
          },
          significance: {
            en: "Reflects the oldest indigenous layer of Kathmandu Valley religion, where natural stones in intimate contact with the soil are recognized as loci of maternal protective energy.",
            ne: "यो परम्परा काठमाडौँ उपत्यकाको प्राचीन प्रकृति तथा मातृपूजाको ज्वलन्त नमुना हो।",
          },
          reference: "Slusser, Mary Shepherd — Nepal Mandala: A Cultural Study of the Kathmandu Valley",
        },
        {
          id: "timber-struts",
          x: 32,
          y: 28,
          number: "02",
          title: {
            en: "Carved Sal Timber Struts (Tundals)",
            ne: "काष्ठकलायुक्त टुँडालहरू",
          },
          element: {
            en: "Structural Woodcraft: Angled Roof Struts",
            ne: "काष्ठकला: छाना आड दिने टुँडाल",
          },
          description: {
            en: "Angled struts carved from dense Sal hardwood transfer the outward thrust of the pitched terracotta roof while displaying intricate figures of multi-armed protective deities.",
            ne: "सालको कडा काठबाट बनाइएका यी टुँडालहरूले छानालाई बलियोसँग धान्नुका साथै विभिन्न देवी-देवताका कलात्मक स्वरूप प्रस्तुत गर्छन्।",
          },
          significance: {
            en: "Harmonizes functional timber joinery with apotropaic (protective) religious iconography intended to ward off harmful forces from the neighborhood.",
            ne: "इन्जिनियरिङ र धार्मिक आस्थालाई सन्तुलित गर्दै टोलको सुरक्षाका लागि यस्ता टुँडालहरू कुँद्ने परम्परा छ।",
          },
          reference: "Department of Archaeology, Government of Nepal — Timber Monument Documentation",
        },
        {
          id: "dachi-appa",
          x: 68,
          y: 52,
          number: "03",
          title: {
            en: "Polished Fired Brickwork (Dachi Appa)",
            ne: "दाची अप्पा (परम्परागत चिल्लो ईँटा)",
          },
          element: {
            en: "Material Craft: Wedge-Profile High-Fired Bricks",
            ne: "निर्माण सामग्री: चिल्लो परम्परागत ईँटा",
          },
          description: {
            en: "Exterior walls feature glazed wedge-shaped Newar bricks (dachi appa) laid with paper-thin joints of traditional yellow mud mortar (chaah), preventing rain penetration.",
            ne: "मन्दिरको बाहिरी भागमा पानी नछिर्ने गरी मसिनो माटोको जोर्नीमा दाची अप्पा ईँटा कुशलतापूर्वक जडान गरिएको छ।",
          },
          significance: {
            en: "Traditional Newar masonry provides extraordinary thermal inertia and flexural resistance during earthquakes while producing a rich terracotta patina.",
            ne: "यस प्रकारको ईँटाको पर्खालले मन्दिरलाई भूकम्पीय कम्पन थेग्न मद्दत गर्नुका साथै न्यानो र आकर्षक स्वरूप दिन्छ।",
          },
          reference: "Korn, Wolfgang — The Traditional Architecture of the Kathmandu Valley",
        },
        {
          id: "courtyard-nanani",
          x: 20,
          y: 84,
          number: "04",
          title: {
            en: "Residential Courtyard (Nanani) & Pati",
            ne: "टोल चोक (नानानी) तथा भजन पाटी",
          },
          element: {
            en: "Urban Layout: Communal Sacred Quadrangle",
            ne: "सहरी संरचना: सामुदायिक चोक र पाटी",
          },
          description: {
            en: "The temple faces directly into the stone-paved residential quadrangle and connects to an adjoining open wooden rest pavilion (pati) where community elders sing evening bhajans.",
            ne: "मन्दिर खुला ढुङ्गे चोकमा अवस्थित छ र यससँगै जोडिएको पाटीमा स्थानीय बासिन्दाहरू साँझपख भजन गाउन भेला हुन्छन्।",
          },
          significance: {
            en: "Demonstrates that in Newar urban design, sacred temples are never isolated monuments but active centers of neighbourhood daily life and child play.",
            ne: "नेवारी बस्ती विकासमा मन्दिरहरू बस्तीभन्दा अलग नभई दैनिक जीवन र सामाजिक सम्बन्धको केन्द्रबिन्दु हुन्छन्।",
          },
          reference: "Gellner, David N. — Monk, Householder, and Tantric Priest",
        },
      ],
    },
    comparison: {
      title: {
        en: "Then & Now: Post-Disaster Resiliency",
        ne: "विगत र वर्तमान: भूकम्पपछिको संरक्षण",
      },
      subtitle: {
        en: "Compare the historical temple setting with contemporary community-led structural conservation following the 2015 earthquake.",
        ne: "विगतको अवस्था र २०७२ को भूकम्पपछि समुदायको सहभागितामा गरिएको संरक्षण कार्य तुलना गर्नुहोस्।",
      },
      before: {
        label: "Pre-Restoration Setting",
        date: "Pre-2015 Documentation",
        source: "Community Heritage Archive",
        src: "/media/shrine1.jpg",
        caption: {
          en: "Pyatho Ajima Temple before seismic stabilization and courtyard restoration.",
          ne: "२०७२ को भूकम्पअघिको मन्दिर तथा परिसरको दृश्य।",
        },
      },
      after: {
        label: "Post-Restoration Stewardship",
        date: "Contemporary Archive",
        source: "Ward 16 Cultural Documentation",
        src: "/images/pyatho-ajima/hero.jpg",
        caption: {
          en: "Restored temple structure with secured timber joinery and clean stone paving.",
          ne: "पुनर्निर्माणपछि काष्ठकला र छाना सुरक्षित गरिएको वर्तमान मन्दिर।",
        },
      },
      historicalNotes: {
        en: "Following the 2015 tremors, community members and ward authorities collaborated to reinforce the timber joinery and re-lay the courtyard stone without disturbing the ancient core sanctum stone.",
        ne: "२०७२ को भूकम्पपछि स्थानीय गुठी र वडाको पहलमा गर्भगृहको प्राचीन शिला यथावत् राखी छाना र काठका जोर्नीहरूको परम्परागत विधिबाट मर्मत गरियो।",
      },
    },
    audio: {
      title: {
        en: "The Grandmother's Guardian Sanctuary",
        ne: "हाम्रो टोलको ममतामयी छहारी",
      },
      subtitle: {
        en: "A spoken cultural audio tour exploring maternal deity worship, guthi stewardship and community music.",
        ne: "अजिमाको महत्त्व, गुठी परम्परा र साँझको भजन संस्कृतिको मौखिक वृत्तान्त।",
      },
      duration: "02:50",
      durationSeconds: 170,
      audioSrc: "/audio/pyatho-ajima-narration.mp3",
      speaker: {
        en: "Ward 16 Cultural Heritage Documentation Initiative",
        ne: "वडा नं. १६ सांस्कृतिक सम्पदा संरक्षण समिति",
      },
      transcript: {
        en: "Step into the courtyard of Pyatho Ajima Temple, where centuries of maternal devotion greet every visitor. In the Newar language, 'Ajima' literally translates to 'Grandmother'.\n\nUnlike formidable warrior deities, Ajima is an intimate maternal protector. For generations, whenever young children in this tole suffered from fevers, viral ailments, or sleepless nights, mothers brought them here at daybreak. An offering of vermilion, sweet water, and mustard-oil lamps was lit with faith that maternal warmth could heal all vulnerabilities.\n\nEvery evening, this quiet courtyard awakens with the rhythm of the Dafa bhajan—local elders gathering in the adjacent open pavilion to play cymbals and hand drums. This temple is not merely historic masonry: it is the living heart of neighbourly solidarity in Ward 16.",
        ne: "प्याठो अजिमा मन्दिरको यो शान्त चोकमा यहाँलाई स्वागत छ। नेपाल भाषामा 'अजिमा' को अर्थ 'हजुरआमा' हुन्छ।\n\nअजिमा कुनै टाढाको वा डरलाग्दो देवता हुनुहुन्न; उहाँ बालबालिकालाई माया गर्ने ममतामयी हजुरआमा हुनुहुन्छ। पुस्तौँदेखि यस टोलका बालबच्चा बिरामी पर्दा आमाहरू यहाँ आएर दियो बाल्ने र रक्षाको कामना गर्ने गर्दथे।\n\nसाँझ परेपछि मन्दिरसँगैको पाटीमा बज्ने भजनका धुनहरूले टोलवासीहरूलाई एकताबद्ध बनाउँछ। यो मन्दिर इँटा र काठको संरचना मात्र नभई वडा नं. १६ को आपसी सद्भाव र जीवन्त संस्कृतिको धरोहर हो।",
      },
      chapters: [
        { time: 0, title: "1. The Maternal Spirit of Ajima" },
        { time: 45, title: "2. The Aniconic Stone Sanctum" },
        { time: 105, title: "3. Evening Bhajan in the Pati" },
        { time: 145, title: "4. Intergenerational Community Care" },
      ],
    },
    quiz: {
      title: {
        en: "Test Your Knowledge: Pyatho Ajima Temple",
        ne: "ज्ञान परीक्षण: प्याठो अजिमा मन्दिर",
      },
      description: {
        en: "Answer five questions about Newar mother goddess veneration, vernacular architecture and guthi traditions.",
        ne: "नेवार मातृका परम्परा, मन्दिर वास्तुकला र गुठी संस्कृति सम्बन्धी ५ वटा प्रश्नहरू।",
      },
      questions: [
        {
          id: "pa-q1",
          question: {
            en: "What does the word 'Ajima' mean in the indigenous Newar language?",
            ne: "नेपाल भाषा (नेवारी) मा 'अजिमा' शब्दको वास्तविक अर्थ के हो?",
          },
          options: [
            { id: "a", text: { en: "Warrior Queen", ne: "योद्धा रानी" } },
            { id: "b", text: { en: "Grandmother (Maternal Protector)", ne: "हजुरआमा (मातृ संरक्षक)" } },
            { id: "c", text: { en: "Sacred River", ne: "पवित्र नदी" } },
            { id: "d", text: { en: "Golden Temple", ne: "स्वर्ण मन्दिर" } },
          ],
          correctOptionId: "b",
          explanation: {
            en: "In the Newar language, 'Aji' or 'Ajima' translates affectionately to 'Grandmother', symbolizing close familial love and maternal safeguarding.",
            ne: "नेपाल भाषामा 'अजिमा' को अर्थ 'हजुरआमा' हुन्छ, जसले परिवारका बालबालिका र बासिन्दाको आमा झैँ ममता र सुरक्षा गर्ने शक्तिलाई जनाउँछ।",
          },
        },
        {
          id: "pa-q2",
          question: {
            en: "What is enshrined in the core sanctum (garbhagriha) of Pyatho Ajima?",
            ne: "प्याठो अजिमा मन्दिरको गर्भगृहभित्र के स्थापना गरिएको छ?",
          },
          options: [
            { id: "a", text: { en: "A natural aniconic river stone", ne: "प्राकृतिक शिला (ढुङ्गा)" } },
            { id: "b", text: { en: "A gilded bronze multi-armed statue", ne: "धातुको बहुभुजा मूर्ति" } },
            { id: "c", text: { en: "A wooden carved pillar", ne: "काठको खम्बा" } },
            { id: "d", text: { en: "A marble footprint", ne: "सङ्गमरमरको पाउ" } },
          ],
          correctOptionId: "a",
          explanation: {
            en: "Following archaic Newar tradition, the temple houses a natural uncarved sacred stone connected to the earth, rather than a man-made sculpture.",
            ne: "काठमाडौँ उपत्यकाको प्राचीन मातृका परम्पराअनुसार गर्भगृहमा कुनै मानवाकार मूर्ति नभई साक्षात् प्राकृतिक शिलालाई नै देवी मानेर पूजा गरिन्छ।",
          },
        },
        {
          id: "pa-q3",
          question: {
            en: "Which traditional community ritual is performed here by Chitrakar artisans?",
            ne: "चित्रकार समूहद्वारा यहाँ कुन पवित्र अनुष्ठान सम्पन्न गरिन्छ?",
          },
          options: [
            { id: "a", text: { en: "Dristi Lekhan (Painting the Divine Eyes)", ne: "दृष्टि लेखन (आँखा कोर्ने)" } },
            { id: "b", text: { en: "Chariot Pulling (Ratha Jatra)", ne: "रथ तान्ने जात्रा" } },
            { id: "c", text: { en: "Sword Dance (Khadga Jatra)", ne: "खड्ग जात्रा" } },
            { id: "d", text: { en: "Sacred Thread Renewal", ne: "जनै फेर्ने" } },
          ],
          correctOptionId: "a",
          explanation: {
            en: "Hereditary Chitrakar painters perform the annual Dristi Lekhan ceremony, ritually awakening the spiritual vision of the deity with consecrated colors.",
            ne: "चित्रकार समूहले प्रत्येक वर्ष मन्दिरमा विधिपूर्वक रंग भरेर देवीको दृष्टि खोल्ने 'दृष्टि लेखन' पूजा गर्छन्।",
          },
        },
        {
          id: "pa-q4",
          question: {
            en: "What kind of devotional music do elders sing in the adjacent open wooden pavilion?",
            ne: "मन्दिर अगाडिको पाटीमा अग्रजहरूले कुन परम्परागत भजन गाउने गर्दछन्?",
          },
          options: [
            { id: "a", text: { en: "Dafa Bhajan", ne: "दाफा भजन" } },
            { id: "b", text: { en: "Dohori", ne: "दोहोरी" } },
            { id: "c", text: { en: "Deuda", ne: "देउडा" } },
            { id: "d", text: { en: "Ghatu", ne: "घाटु" } },
          ],
          correctOptionId: "a",
          explanation: {
            en: "Dafa Bhajan is the classical medieval choral hymn tradition of the Newars, accompanied by the khin drum and taa cymbals.",
            ne: "दाफा भजन नेवार समुदायको प्राचीन शास्त्रीय भक्ति संगीत हो, जसमा खिं र ताः बाजा बजाएर मन्दिरहरूमा भजन गाइन्छ।",
          },
        },
        {
          id: "pa-q5",
          question: {
            en: "What heavy and durable native wood was selected to carve the intricate temple struts?",
            ne: "मन्दिरको छाना अड्याउने कलात्मक टुँडालहरू बनाउन कुन बलियो काठ प्रयोग गरिएको छ?",
          },
          options: [
            { id: "a", text: { en: "Pine (Salla)", ne: "सल्ला" } },
            { id: "b", text: { en: "Sal Hardwood (Agrath)", ne: "साल (अग्रथ)" } },
            { id: "c", text: { en: "Bamboo (Bans)", ne: "बाँस" } },
            { id: "d", text: { en: "Teak", ne: "सागौन" } },
          ],
          correctOptionId: "b",
          explanation: {
            en: "Dense, termite-resistant Sal timber (Shorea robusta) is the premier wood chosen by Newar master carvers for structural roof struts.",
            ne: "धमिरा नलाग्ने र सयौँ वर्ष टिक्ने भएकाले परम्परागत काष्ठकला र टुँडाल बनाउन सालको काठ प्रयोग गरिन्छ।",
          },
        },
      ],
    },
  },
};
