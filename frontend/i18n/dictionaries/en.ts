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
  /**
   * Sections below start EMPTY in English: their English source of truth
   * lives in lib/content.ts (which also feeds the chatbot), so nothing is
   * duplicated here. Consumers call t() with the lib string as fallback —
   * English renders unchanged, and ne.ts fills these in with Nepali.
   */
  evidence: {} as Partial<
    Record<"documented" | "reported" | "oral" | "belief" | "verify", { label: string; hint: string }>
  >,
  facts: {} as Record<string, { title: string; text: string }>,
  limitations: [] as string[],
  chatSuggestions: [] as string[],
  sourceNotes: {} as Record<string, string>,

  common: {
    siteTitle: "Balaju Living Heritage",
    loading: "Loading…",
    backToTop: "Back to top",
    sourcesLabel: "Sources:",
    skipToContent: "Skip to main content",
  },

  nav: {
    places: "Places",
    gallery: "Gallery",
    festival: "Festival",
    quiz: "Quiz",
    voices: "Voices",
    sources: "Sources",
    language: "Language",
    switchLanguage: "Switch language to Nepali",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    mainNav: "Main",
    homeLink: "Balaju Living Heritage — go to the homepage",
    langSelection: "Language selection",
    langSelector: "Language selector",
    switchToEn: "Switch to English",
    switchToNe: "नेपाली भाषामा हेर्नुहोस्",
    heroIllo:
      "Illustration: twenty-two stone spouts pouring water beneath a pagoda skyline at dawn, with butter lamps floating up",
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
    heritageQuiz: { ne: "सम्पदा प्रश्नोत्तरी", en: "Heritage Quiz & Challenges" },
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

  /** Per-page copy — each key mirrors a route under app/. */
  pages: {
    sources: {
      intro:
        "These notes summarise published reporting and academic context. They do not replace the voices of Guthi members, priests, artists and residents.",
      stillToConfirm: "Still to be confirmed",
    },
    dhara: {
      subtitle:
        "Twenty-two stone spouts beside the Nagarjun forest in Balaju: public water, ritual bathing and a yearly festival.",
      badges: ["22 stone spouts", "Balaju, Kathmandu", "Lhuti Punhi festival"],
      storyIntro: "Tap a title to open it. The seal above each piece tells you how well it is documented.",
      continueTitle: "Continue to Pyah Thwam Ajima",
      continueBody: "After bathing, many devotees worship at the nearby Ajima shrine.",
      visitCta: "Visit the shrine page",
      askCta: "Ask the guide",
    },
    ajima: {
      subtitle: "A protective mother-goddess shrine inside Balaju Baisdhara Park, also known as Shitala Mai.",
      respectStrong: "Please be respectful.",
      respectBody:
        "This is a living place of worship. Some rituals may be private or restricted, so ask the Guthi before photographing or recording.",
      storyIntro: "Local reporting and oral tradition are marked as such. Where details need confirming, we say so.",
      waterTitle: "See the water side of the story",
      waterBody: "The Ajima and the 22 spouts are two parts of one tradition.",
      visitCta: "Visit 22 Dhara",
      askCta: "Ask about Dristi Lekhan",
    },
    festival: {
      subtitle:
        "The yearly Baisdhara Mela: bathing at the spouts, lamps for the departed, and worship at the Ajima shrine.",
      dateLabel: "मिति",
      dateTitle: "This year's date",
      dateBody:
        "Reports disagree: some say the full moon of Chaitra, one 2024 report says Baisakh. We will publish the date only after it is confirmed by the local committee or Guthi.",
      askCta: "Ask the guide about the festival",
    },
    places: {
      intro: "Two places inside the Balaju Baisdhara Park complex. They are best understood together.",
    },
    gallery: {
      intro: "Photographs and video, shown with the care these living places deserve.",
      photos: "Photographs",
      video: "Video",
      fromVisitors: "From visitors",
      moreTitle: "More is on the way",
      moreBody:
        "Every item carries its place, date and a consent note. Restricted rituals and identifiable worshippers are not published without permission.",
      shareCta: "Share a photo of your visit",
    },
    reviews: {
      intro: "Tell us about your visit, share a photo, or report a problem that needs care.",
      steps: [
        { t: "Sign in", d: "Only signed-in visitors can post." },
        { t: "Share", d: "A review, up to 3 photos, or a complaint about the place." },
        { t: "Admin checks", d: "Every post is read by an admin before anyone sees it." },
        { t: "Published", d: "Approved posts appear below with your display name." },
      ],
      rulesTitle: "Please keep in mind",
      rules: [
        "No photos of identifiable worshippers or children without their consent.",
        "No photos or video of restricted rituals.",
        "Complaints should be about the place (litter, damage, access), not about individuals.",
        "Posts that break these rules are not published.",
      ],
    },
    login: {
      intro: "Welcome back. Sign in to share your visit.",
    },
    signup: {
      intro: "An account lets you share reviews, photos and concerns. An admin checks every post before it appears.",
    },
  },

  /** Shared component copy (Footer, AccountMenu, AuthForm, ChatWidget, PlaceCard). */
  components: {
    footer: {
      intro:
        "A community archive of 22 Dhara and Pyah Thwam Ajima. Built to record, respect and pass on what Balaju's people already keep alive.",
      respect:
        "Please do not photograph or share restricted rituals without the permission of the Guthi and the community. Beliefs on this site are recorded as beliefs, not as medical or historical fact.",
      sourcesLink: "Sources & what still needs confirming",
    },
    account: {
      signIn: "Sign in",
      menuLabel: "Account menu",
      closeLabel: "Close menu",
      admin: "Admin",
      dashboard: "Admin dashboard",
      signOut: "Sign out",
    },
    auth: {
      errorFallback: "Something went wrong. Please try again.",
      netError: "Couldn't connect. Check your network and try again.",
      displayName: "Display name",
      namePlaceholder: "Shown on your posts",
      email: "Email",
      emailPlaceholder: "you@example.com",
      neverPublic: "Never shown publicly.",
      password: "Password",
      passwordSignup: "At least 8 characters",
      passwordLogin: "Your password",
      hide: "Hide",
      show: "Show",
      wait: "Please wait…",
      createAccount: "Create account",
      signIn: "Sign in",
      haveAccount: "Already have an account?",
      newHere: "New here?",
      createLink: "Create an account",
    },
    chat: {
      welcome:
        "Namaste! I'm the Heritage Guide. Ask me about 22 Dhara, Pyah Thwam Ajima, or the Lhuti Punhi festival. I answer only from the verified notes on this site.",
      errorFallback: "Sorry, something went wrong.",
      netError: "I couldn't connect. Please check your network and try again.",
      openLabel: "Ask the Heritage Guide",
      dialogLabel: "Heritage Guide chat",
      closeLabel: "Close chat",
      headerNe: "सम्पदा मार्गदर्शक",
      headerEn: "Heritage Guide",
      sourceLabel: "Source",
      typingLabel: "Typing",
      placeholder: "Ask in English or नेपाली…",
      sendLabel: "Send",
      disclaimer: "Answers come only from verified local sources. Beliefs are not medical advice.",
    },
    placeCard: {
      discover: "Discover",
    },
    spouts: {
      touch: "Touch a spout",
      ariaLabel: "Spout",
      idle: "Twenty-two stone spouts line the complex. Pick any one to see what reports say about who built them.",
      report: {
        s1: "News reports say",
        n1: "21",
        s2: "of the 22 spouts were built by King Jaya Prakash Malla, and",
        n2: "one",
        s3: "was added later by King Rana Bahadur Shah (1855 BS). The sources reviewed do not say which spout that is, and they do not confirm this with an inscription or archive record.",
      },
    },
    video: {
      unsupported: "Your browser can't play this video.",
    },
    visitorPhotos: {
      emptyTitle: "No visitor photos yet",
      emptyBody: "Approved photos from visitors will appear here.",
      altPrefix: "Visitor photo, ",
    },
    panorama: {
      loading: "Loading…",
      chooseLabel: "Choose a place to look around",
      lookAroundPrefix: "Look around: ",
      tapToLook: "Tap to look around",
      error: "The viewer couldn't start on this device. The photo is still shown in the gallery.",
      dragHint: "Drag to look around · pinch to zoom",
      photoView: "Photo view (about {hfov}° wide). A full 360° capture will replace it when available.",
    },
    voices: {
      status: {
        pending: "Waiting for admin",
        approved: "Published",
        rejected: "Not published",
      },
      errTooShort: "Please write at least 10 characters.",
      errNoPhoto: "Add at least one photo.",
      errSend: "Could not send. Please try again.",
      errNet: "No connection. Please try again.",
      thanks: "Thank you! धन्यवाद",
      thanksBody: "An admin will read it before it appears. You can see its status below.",
      shareAnother: "Share another",
      legend: "What would you like to share?",
      aboutPlace: "About which place?",
      ratingLabel: "Your rating (optional)",
      ratingAria: "Rating",
      starOne: "{n} star",
      starMany: "{n} stars",
      titleLabel: "Title (optional)",
      bodyComplaint: "What needs care?",
      bodyPhoto: "About this photo",
      bodyReview: "Your experience",
      phComplaint: "e.g. litter near the spouts, damage, access problems…",
      phOther: "Tell us in your own words…",
      photosLabel: "Photos",
      photosOptional: "(optional)",
      photosUpTo: "· up to {n}",
      selectedPhoto: "Selected photo",
      removePhoto: "Remove photo",
      addPhoto: "Add photo",
      photoNote:
        "Location data is removed from photos. Please avoid showing worshippers' faces or children.",
      sending: "Sending…",
      sendForReview: "Send for review",
      modNote: "An admin reads every post before it is published.",
      confirmDelete: "Delete this post?",
      yourPosts: "Your posts",
      delete: "Delete",
      reasonPrefix: "Reason:",
      signInTitle: "Sign in to post",
      signInBody: "Anyone can read. Only signed-in visitors can share.",
      adminTitle: "You are the admin",
      adminBody: "Admins approve visitors' posts but do not post themselves.",
      openQueue: "Open review queue",
      namaste: "Namaste, {name}",
      fromVisitors: "From visitors",
      filterAll: "All",
      filterReview: "Reviews",
      filterPhoto: "Photos",
      filterComplaint: "Complaints",
      loadError: "Posts couldn't be loaded right now.",
      emptyTitle: "Nothing published here yet",
      emptyBody: "Be the first voice.",
      ratingOut: "{n} out of 5",
      sharedPhoto: "Photo shared by a visitor",
    },
    map: {
      wardName: "Ward 16, Kathmandu",
      typeLabel: "Map type",
      tabMap: "Interactive map",
      tabGoogle: "Google Maps",
      zoomLandmarks: "Zoom to landmarks",
      wholeWard: "Whole ward",
      lockMap: "Lock map (to scroll page)",
      unlockMap: "Unlock map to move it",
      ariaLabel: "Map of {name} with landmarks",
      loadError: "The map couldn't load. Use the landmark cards below or open Google Maps.",
      iframeTitle: "Google Map near {name}",
      hintMap: "Tap a landmark name to open its page. Map data © OpenStreetMap contributors.",
      hintGoogle: "Landmark pins open pages only on the Interactive map. Use the cards below here.",
      approx: "Pin position approximate",
      markerTitle: "{name} — open details",
      openWard: "Open {ward} in Google Maps ↗",
      directions: "Directions to Baisdhara ↗",
    },
    admin: {
      shell: {
        adminsOnly: "Admins only",
        prompt: "Sign in with the admin account to open the dashboard.",
        signIn: "Sign in",
      },
      nav: {
        dashboard: "Dashboard",
        posts: "Posts",
        members: "Members",
        viewSite: "View site",
        ariaAdmin: "Admin",
        ariaDashboard: "Admin dashboard",
        ariaSections: "Admin sections",
        badge: "Admin",
        siteName: "Balaju Living Heritage",
      },
      dashboard: {
        ne: "प्रशासक ड्यासबोर्ड",
        title: "Admin dashboard",
        welcome: "Welcome, {name}. Your job here is to review what visitors send. You don't post yourself.",
        loadError: "Could not load the numbers. Is the backend running?",
        tilePending: "Waiting for review",
        tilePublished: "Published",
        tileRejected: "Rejected",
        tileMembers: "Members",
        tileSuspended: "Suspended",
        needsReview: "Needs your review",
        openAll: "Open all →",
        loading: "Loading…",
        reviewThis: "Review this",
        emptyTitle: "All caught up",
        emptyBody: "No posts are waiting.",
      },
      queue: {
        loadError: "Could not load.",
        confirmDelete: "Delete this post permanently?",
        actionFailed: "Action failed.",
        tabPending: "pending",
        tabApproved: "approved",
        tabRejected: "rejected",
        loading: "Loading…",
        emptyTitle: "Nothing {status}.",
        approve: "Approve and publish",
        reasonPlaceholder: "Reason (shown to author)",
        reject: "Reject",
        deletePermanently: "Delete permanently",
        intro: "You approve or reject what visitors send. Nothing appears on the website until you approve it.",
      },
      users: {
        loadError: "Could not load members.",
        confirmSuspend: "Suspend {name}? They will be signed out and cannot post.",
        actionFailed: "Action failed.",
        loading: "Loading…",
        emptyTitle: "No members yet.",
        badgeAdmin: "Admin",
        badgeSuspended: "Suspended",
        joined: "Joined {date}",
        postOne: "{n} post",
        postMany: "{n} posts",
        restore: "Restore access",
        suspend: "Suspend",
        intro: "Everyone who has an account. Suspend someone who keeps posting content that breaks the rules.",
      },
    },
  },

  /**
   * Display copy living in lib/places.ts and lib/posts.ts. English source of
   * truth stays there (single source, like lib/content.ts) — these records
   * start empty and consumers call t(path, libValue) as fallback; ne.ts
   * carries the Nepali.
   */
  placeCopy: {} as Record<string, { photoAlt: string; summary: string; mapBlurb: string }>,
  sceneCopy: {} as Record<string, { title: string; caption: string }>,
  videoCopy: {} as Record<string, string>,
  postCopy: {
    kind: {} as Record<string, string>,
    place: {} as Record<string, string>,
  },
};

export type Dictionary = typeof en;

/** Valid SectionTitle keys — keeps every <SectionTitle titleKey="…"> typo-free. */
export type SectionTitleKey = keyof Dictionary["titles"];
