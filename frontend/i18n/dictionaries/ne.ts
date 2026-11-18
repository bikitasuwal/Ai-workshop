/**
 * i18n/dictionaries/ne.ts
 *
 * Nepali (नेपाली) UI and interface dictionary for Balaju Living Heritage.
 * Spreads the English dictionary and overrides only the strings that get
 * translated, so every key added to en.ts automatically exists here too
 * (untranslated keys gracefully fall back to English).
 *
 * The `titles` entries are bilingual pairs shown together on every page —
 * their content is intentionally identical to en.ts, because SectionTitle
 * picks which line becomes the heading from the active language.
 */

import { en, type Dictionary } from "./en";

export const ne: Dictionary = {
  ...en,

  common: {
    ...en.common,
    siteTitle: "बालाजु सम्पदा",
    loading: "लोड हुँदैछ…",
    backToTop: "शीर्षमा जानुहोस्",
  },

  nav: {
    ...en.nav,
    places: "स्थानहरू",
    gallery: "ग्यालरी",
    festival: "पर्व",
    voices: "आवाजहरू",
    sources: "स्रोतहरू",
    language: "भाषा",
    switchLanguage: "Switch language to English",
    openMenu: "मेनु खोल्नुहोस्",
    closeMenu: "मेनु बन्द गर्नुहोस्",
  },

  home: {
    ...en.home,

    hero: {
      ...en.home.hero,
      // जहाँ जल, पूजा र स्मृति भेटिन्छ — split around the gold-shine span.
      titleLead: "जहाँ ",
      titleHighlight: "जल",
      titleTail: ", पूजा र स्मृति भेटिन्छ",
      subtitle:
        "बालाजु, काठमाडौँका दुई सम्पदा स्थलको जीवित अभिलेख — यसलाई स्नान, पूजा, चित्रकला र भेलागर्ने नेवार समुदायहरूले जीवित राखेका छन्।",
      exploreCta: "स्थानहरू अन्वेषण गर्नुहोस्",
      askCta: "गाइडलाई सोध्नुहोस्",
    },

    intro: {
      ...en.home.intro,
      quote: "सम्पदा केवल ढुङ्गा मात्र होइन। मानिसहरूले निरन्तर गरिरहने कुरा नै हो।",
      body:
        "यस साइटले बालाजुका दुई स्थान र तिरका जीवन्त परम्पराको अभिलेख राख्छ, जहाँ अभिलेखित कुरा र विश्वास वा मौखिक परम्परालाई स्पष्ट रूपमा छुट्याएको छ।",
    },

    lookAroundBody:
      "आफ्नो फोनबाट दुई स्थान भित्रिनुहोस्। वरिपरि हेर्न तान्नुहोस्, जुम गर्न छिचोल्नुहोस्।",

    mapBody:
      "दुवै स्थान बालाजु बैसधारा पार्क परिसरभित्र पर्छन्। कुनै पनिचिन्ह थिचेर त्यसको पृष्ठ खोल्नुहोस्।",

    pillars: {
      water: {
        ...en.home.pillars.water,
        text: "सार्वजनिक जलवितरण र रीतिमय स्नानका लागि प्रयोग हुने ढुङ्गाका धाराहरू।",
      },
      worship: {
        ...en.home.pillars.worship,
        text: "मन्दिर, पूजाअर्चन र रक्षक आजामा मातृ देवीको परम्परा।",
      },
      art: {
        ...en.home.pillars.art,
        text: "पौ (चित्रकार) कलाकारहरूले सामुदायिक रीतमा देवीको आँखा चित्रण गर्छन्।",
      },
      community: {
        ...en.home.pillars.community,
        text: "गुठी समूहहरूले एक पुस्तादेखि अर्को पुस्तामा रीत, कर्तव्य र सीप हस्तान्तरण गर्छन्।",
      },
    },

    festival: {
      ...en.home.festival,
      title: "बत्ती र पानीको पर्व",
      body:
        "हरेक वर्ष भक्तजनहरूले धारामा स्नान गर्छन्, केहीले दिवंगत नाताप्रति बत्ती बाल्छन्, र धेरैले पछि प्याः थ्वँ अजिमाको पूजा गर्छन्।",
      note: "विभिन्न तिथिहरू उल्लेख छन्। कृपया स्थानीय समितिसँग पुष्टि गर्नुहोस्।",
      cta: "पर्वको बारेमा",
    },

    labelsBody:
      "प्रत्येक कथनमा सानो छाप हुन्छ, जसले गर्दा तपाईंले अभिलेख र विश्वास छुट्याउन सक्नुहुन्छ।",

    ask: {
      ...en.home.ask,
      title: "सम्पदा गाइडलाई सोध्नुहोस्",
      body: "उत्तरहरू यस साइटका प्रमाणित नोटहरूबाट मात्र आउँछन्।",
    },
  },
};
