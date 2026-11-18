/**
 * i18n/dictionaries/en.ts
 *
 * English UI and interface dictionary for Balaju Living Heritage.
 * This is the canonical dictionary: `ne.ts` spreads it and overrides
 * only the strings that get translated, so any key added here exists
 * in both languages (untranslated keys gracefully fall back to English).
 *
 * Note on `titles`: those entries are *bilingual pairs* (a Devanagari
 * line + an English line shown together), so their content is identical
 * in both language files. SectionTitle picks which line is the heading
 * based on the active language.
 */

export const en = {
  common: {
    siteTitle: "Balaju Living Heritage",
    loading: "Loading…",
    backToTop: "Back to top",
  },

  nav: {
    places: "Places",
    gallery: "Gallery",
    festival: "Festival",
    voices: "Voices",
    sources: "Sources",
    language: "Language",
    switchLanguage: "Switch language to Nepali",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
  },

  /** SectionTitle pairs — { ne, en } shown together on every page. */
  titles: {
    twoPlaces: { ne: "दुई स्थान", en: "Two places, one story" },
    lookAroundCourtyards: { ne: "चारैतिर हेर्नुहोस्", en: "Look around the courtyards" },
    wardMap: { ne: "वडा नं. १६ · नक्सा", en: "Find them in Ward 16" },
    livingHeritage: { ne: "जीवित सम्पदा", en: "Living heritage" },
    howWeLabel: { ne: "हामी कसरी लेख्छौँ", en: "How we label what we know" },
    dharaSpouts: { ne: "धाराहरू", en: "Meet the spouts" },
    dharaWalk: { ne: "हिँडेर हेर्नुहोस्", en: "Walk along the spouts" },
    lookAround: { ne: "चारैतिर हेर्नुहोस्", en: "Look around" },
    dharaStory: { ne: "कथा र आस्था", en: "The story, in short pieces" },
    lookAroundShrine: { ne: "चारैतिर हेर्नुहोस्", en: "Look around the shrine" },
    ajimaStory: { ne: "अजिमाको कथा", en: "The Ajima, in short pieces" },
    thePlaces: { ne: "स्थानहरू", en: "The places" },
    gallery: { ne: "ग्यालरी", en: "Gallery" },
    festivalAbout: { ne: "पर्वको बारेमा", en: "About the festival" },
    voices: { ne: "तपाईंको आवाज", en: "Voices of visitors" },
    sources: { ne: "स्रोतहरू", en: "Sources & open questions" },
    signIn: { ne: "प्रवेश", en: "Sign in" },
    join: { ne: "खाता खोल्नुहोस्", en: "Join the community" },
    adminPosts: { ne: "पोस्टहरू", en: "Posts to review" },
    adminMembers: { ne: "सदस्यहरू", en: "Members" },
  },

  home: {
    hero: {
      eyebrow: "बैसधारा · प्याः थ्वँ अजिमा",
      // The h1 is split around the gold-shine span: lead + highlighted word + tail.
      titleLead: "Where",
      titleHighlight: "water",
      titleTail: ", worship and memory meet",
      subtitle:
        "A living archive of two heritage places in Balaju, Kathmandu, kept alive by the Newar communities who bathe, pray, paint and gather there.",
      exploreCta: "Explore the places",
      askCta: "Ask the guide",
    },
    intro: {
      quote: "Heritage is not only stone. It is what people keep doing.",
      body:
        "This site records two places in Balaju and the living traditions around them, clearly separating what is documented from what is belief or oral tradition.",
    },
    lookAroundBody:
      "Step into the two places from your phone. Drag to look around, pinch to zoom.",
    mapBody:
      "Both places lie inside the Balaju Baisdhara Park complex. Tap a landmark to open its page.",
    pillars: {
      water: {
        ne: "जल",
        en: "Water",
        text: "Stone spouts that serve as public water points and places of ritual bathing.",
      },
      worship: {
        ne: "पूजा",
        en: "Worship",
        text: "Shrines, offerings and the tradition of a protective mother goddess.",
      },
      art: {
        ne: "कला",
        en: "Art",
        text: "Pũ (Chitrakar) artists paint the goddess's eyes in a community ritual.",
      },
      community: {
        ne: "गुठी",
        en: "Community",
        text: "Guthi groups carry rituals, duties and skills from one generation to the next.",
      },
    },
    festival: {
      eyebrow: "ल्हुति पुन्हि · बैसधारा मेला",
      title: "The festival of lamps and water",
      body:
        "Each year devotees bathe at the spouts, some light lamps for relatives who have passed, and many then worship Pyah Thwam Ajima.",
      note: "Reports give different dates. Please confirm with the local committee.",
      cta: "About the festival",
    },
    labelsBody:
      "Every statement carries a small seal, so you can tell a record from a belief.",
    ask: {
      eyebrow: "सोध्नुहोस्",
      title: "Ask the Heritage Guide",
      body: "Answers come only from the verified notes on this site.",
    },
  },
};

export type Dictionary = typeof en;

/** Valid SectionTitle keys — keeps every <SectionTitle titleKey="…"> typo-free. */
export type SectionTitleKey = keyof Dictionary["titles"];
