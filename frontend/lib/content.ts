// All site + chatbot content comes from here (source: 22_Dhara_and_Pyah_Thwam_Ajima_Research_Notes.txt).
// Every fact carries an evidence label so the UI and the chatbot never present belief or oral tradition as proven history.

export type Evidence = "documented" | "reported" | "oral" | "belief" | "verify";

export const evidenceMeta: Record<
  Evidence,
  { label: string; hint: string; color: string; bg: string }
> = {
  documented: {
    label: "Documented",
    hint: "Described consistently in published sources",
    color: "#FAF3E3",
    bg: "#8B2E1F",
  },
  reported: {
    label: "Commonly reported",
    hint: "Widely repeated in news reports, no primary record found",
    color: "#FAF3E3",
    bg: "#1F4E5F",
  },
  oral: {
    label: "Oral tradition",
    hint: "Local story passed down by word of mouth",
    color: "#3B2416",
    bg: "#E8A317",
  },
  belief: {
    label: "Religious belief",
    hint: "A matter of faith, not scientific or medical fact",
    color: "#FAF3E3",
    bg: "#6B4A2E",
  },
  verify: {
    label: "Please confirm",
    hint: "Sources disagree. Confirm with the community",
    color: "#8B2E1F",
    bg: "#F3D9A8",
  },
};

export type Fact = {
  id: string;
  place: "dhara" | "ajima" | "festival" | "general";
  title: string;
  text: string;
  evidence: Evidence;
  sources: string[]; // keys of `sources`
};

export const sources: Record<string, { title: string; url: string; note: string }> = {
  A: {
    title: "OnlineKhabar English — Balaju Baisdhara Mela (Apr 23, 2024)",
    url: "https://english.onlinekhabar.com/balaju-baisdhara-mela-historical-heritage-of-the-malla-period-centre-of-religious-faith-photos.html",
    note: "Spouts, commonly reported royal history, Lhuti Punhi, shrines, beliefs.",
  },
  B: {
    title: "Kantipur / RSS — Baisdhara Mela report (Mar 31, 2018)",
    url: "https://ekantipur.com/national/2018/03/31/152247543404749268.html",
    note: "Another account of the festival and the 21 + 1 spout attribution.",
  },
  C: {
    title: "Ratopati English — Balaju Baisdhara fair (Apr 2, 2026)",
    url: "https://english.ratopati.com/story/56796/see-the-photo-of-balaju-baisadhara-fair",
    note: "Recent account. Its attribution of the extra spout differs from others.",
  },
  D: {
    title: "Insight Dainik — Local article on Pyah Thwam Ajima (Nov 5, 2026)",
    url: "https://www.insightdainik.com/post/2026-11-05-130425",
    note: "Local cultural reporting. Oral-history claims need corroboration.",
  },
  E: {
    title: "Gérard Toffin — Cult of Mātṛkā/Ajimā goddesses (SINHAS 28:2, 2023)",
    url: "https://martinchautari.org.np/journal-details/studies-in-nepali-history-and-society/abstracts/sinhas-vol-28-no-2-gerard-toffin",
    note: "Academic context on Ajima worship. Not specific to the Balaju shrine.",
  },
  F: {
    title: "OnlineKhabar Nepali — Baisdhara / Lhuti reporting (2019)",
    url: "https://www.onlinekhabar.com/2019/04/759108/",
    note: "Additional reporting on Baisdhara, Lhuti Punhi and local beliefs.",
  },
};

export const facts: Fact[] = [
  // ---------- 22 DHARA ----------
  {
    id: "dhara-what",
    place: "dhara",
    title: "What it is",
    text: "22 Dhara, also called Baisdhara, is a historic water-spout complex in Balaju, near the Nagarjun forest. It is known for 22 stone water spouts (dhunge dhara) and sits within the wider Balaju park and religious landscape. Local reporting also links the place with the Newar name Lhuti. Nearby shrines are reported to be dedicated to deities including Vishnu and Shiva.",
    evidence: "documented",
    sources: ["A", "B"],
  },
  {
    id: "dhara-history",
    place: "dhara",
    title: "Who built it?",
    text: "Several news reports say 21 of the spouts were built by King Jaya Prakash Malla, around Nepal Sambat 875, and that one more spout was added later by King Rana Bahadur Shah in 1855 BS. This is widely repeated, but the sources reviewed do not confirm it with an inscription, archive record or archaeological study. One 2026 report names the extra spout's origin differently.",
    evidence: "reported",
    sources: ["A", "B", "C"],
  },
  {
    id: "dhara-water",
    place: "dhara",
    title: "Water and engineering",
    text: "The 22 stone spouts are the defining feature: traditional public water infrastructure that is also used for ritual bathing. How the water source, channels, drainage and surroundings are maintained is an open research question. The sources reviewed give no detailed engineering assessment and no reliable current water-quality data, so nobody should claim the water is safe to drink without testing.",
    evidence: "verify",
    sources: ["A"],
  },
  {
    id: "dhara-faith",
    place: "dhara",
    title: "Faith and bathing",
    text: "Devotees bathe at the spouts for spiritual merit, blessings or purification. Some accounts compare its spiritual value with pilgrimage sites such as Muktinath and Gosaikunda.",
    evidence: "belief",
    sources: ["A"],
  },
  {
    id: "dhara-skin",
    place: "dhara",
    title: "The skin-disease belief",
    text: "Some reports mention a belief that bathing here protects against or cures skin diseases. This is a traditional belief only. It is not a scientifically established treatment and must not be read as health advice.",
    evidence: "belief",
    sources: ["A"],
  },
  {
    id: "dhara-value",
    place: "dhara",
    title: "Why it matters today",
    text: "The site holds several roles at once: historic public water infrastructure, a place of religious bathing and worship, a gathering place for local communities and pilgrims, a setting for Newar cultural practice and annual festivities, and a public park. Issues worth investigating include water flow and quality, maintenance of the stonework, waste during festivals, visitor pressure, accessibility and continuity of local rituals. These are research questions, not confirmed claims about current conditions.",
    evidence: "documented",
    sources: ["A", "B"],
  },

  // ---------- FESTIVAL ----------
  {
    id: "fest-what",
    place: "festival",
    title: "Baisdhara Mela / Lhuti Punhi",
    text: "An annual gathering at the site. Devotees bathe at the spouts and take part in religious activities. In the local Newar context it is also called Lhuti Punhi.",
    evidence: "documented",
    sources: ["A", "B", "F"],
  },
  {
    id: "fest-lamps",
    place: "festival",
    title: "Lamps and local deities",
    text: "Some reports describe people lighting lamps in memory of deceased relatives. Other accounts link the wider festival period with local deity traditions, including Manmaiju Devi Jatra and Kadelchok Bhagwati.",
    evidence: "reported",
    sources: ["A"],
  },
  {
    id: "fest-date",
    place: "festival",
    title: "When is it?",
    text: "Published reports do not agree on the date. Some say Chaitra Shukla Purnima, while an OnlineKhabar report from 2024 describes the full moon of Baisakh. Always confirm the current year's date with the local festival committee or the relevant Guthi.",
    evidence: "verify",
    sources: ["A", "B", "C"],
  },

  // ---------- PYAH THWAM AJIMA ----------
  {
    id: "ajima-who",
    place: "ajima",
    title: "Who is Pyah Thwam Ajima?",
    text: "Pyah Thwam Ajima (प्याः थ्वँ अजिमा), also written Pyatho Ajima and locally called Shitala Mai, is described in local reporting as a shrine inside the historic Balaju Baisdhara Park. 'Ajima' broadly means a divine, protective mother figure in Newar religion. Ajima / Matrika goddesses are worshipped by different Newar communities, Hindu and Buddhist, and their shrines and forms vary across the Kathmandu Valley. The academic source listed gives this general context only; it is not a study of this shrine.",
    evidence: "documented",
    sources: ["D", "E"],
  },
  {
    id: "ajima-belief",
    place: "ajima",
    title: "Protection from illness",
    text: "Local reporting associates the Ajima with protection from illness, epidemics and threats to children's wellbeing. The wider Hindu tradition of Shitala is linked with protection from diseases such as smallpox and fever. These are religious beliefs, not proven ways to prevent or treat disease.",
    evidence: "belief",
    sources: ["D"],
  },
  {
    id: "ajima-name",
    place: "ajima",
    title: "What does the name mean?",
    text: "A local article reads 'Pyah' as thirst and 'Thwam' as the traditional Newar rice beer, and links this to an oral story of thirst, drought or water shortage, and epidemics. The article itself notes there is no clear ancient written evidence for this meaning. Please check it with Newar speakers, ritual practitioners and Guthi members.",
    evidence: "oral",
    sources: ["D"],
  },
  {
    id: "ajima-dristi",
    place: "ajima",
    title: "Dristi Lekhan: painting the eyes",
    text: "During the Lhuti Purnima observance, members of the Pũ (Chitrakar) community's Guthi traditionally paint the eyes and eyebrows of the goddess image. The article describes this as a religiously meaningful ritual, not ordinary decoration, and suggests public viewing of the image may be restricted until it is complete. The exact procedure, terms and timing should be confirmed directly with the artists and Guthi, and the ritual should not be assumed open to photography.",
    evidence: "oral",
    sources: ["D"],
  },
  {
    id: "ajima-offerings",
    place: "ajima",
    title: "Offerings",
    text: "The local article lists offerings that may include Thwam, Aila, abir, sindoor, flowers, incense, and Samay Baji items such as beaten rice, roasted soybeans, choila and bara. It also mentions an animal-sacrifice tradition, with eggplant or ash gourd as alternatives for worshippers who do not offer an animal. This is that article's account, not a rule followed by every devotee. Practices may differ among families and Guthi groups.",
    evidence: "oral",
    sources: ["D"],
  },
  {
    id: "ajima-guthi",
    place: "ajima",
    title: "Guthi and living heritage",
    text: "Guthi institutions maintain rituals, community duties, traditional skills and festival continuity. The same local article raises concerns about Guthi land encroachment, management difficulty, administrative complexity and passing traditions to younger generations. These claims have not been independently verified in the sources reviewed.",
    evidence: "verify",
    sources: ["D"],
  },
  {
    id: "ajima-link",
    place: "ajima",
    title: "Connection to 22 Dhara",
    text: "Local reporting describes devotees bathing at the 22 Dhara spouts and then worshipping Pyah Thwam Ajima during the Baisdhara / Lhuti Punhi observance. Balaju's heritage is therefore not only stone spouts. It is the relationship between water, worship, seasonal festivals, traditional art, community participation and Guthi responsibility.",
    evidence: "documented",
    sources: ["D", "A"],
  },
];

export const byPlace = (place: Fact["place"]) => facts.filter((f) => f.place === place);

export const limitations = [
  "The royal construction history of the 22 spouts is widely reported, but no primary evidence was found in the sources reviewed.",
  "Published sources disagree about the exact date of the annual Baisdhara / Lhuti Punhi event.",
  "Claims that the water cures or prevents skin disease are religious beliefs, not medical evidence.",
  "The meaning of 'Pyah Thwam' and its drought story are local tradition; ancient written evidence was not found.",
  "The Dristi Lekhan account comes from local journalism and should be confirmed with the Pũ / Chitrakar Guthi.",
  "Offerings and sacrifice practices vary. They should not be generalised to all worshippers.",
  "The current condition of the water system, water quality and accessibility needs on-site or official verification.",
  "Restricted ritual information must not be recorded or published without the community's permission.",
];

export const chatSuggestions = [
  "What is 22 Dhara?",
  "When is Lhuti Punhi?",
  "What is Dristi Lekhan?",
  "Is the water safe to drink?",
];
