import { Router } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { facts, evidenceMeta, sources, type Fact } from "../data/content.js";
import { tooMany } from "../lib/auth.js";

const router = Router();

// ---- simple keyword retrieval over the verified facts ----
const STOP = new Set("the a an is are of in on at to for and or what who how when where why does do it this that about tell me with".split(" "));
const tokens = (s: string) =>
  s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w));

// Question intent -> fact to prioritise (keeps date / safety questions pointing at their caveats)
const INTENTS: [RegExp, string][] = [
  [/\b(when|date|day|time)\b|कहिले|मिति/i, "fest-date"],
  [/\b(safe|drink|drinking|clean|quality|pure)\b|पिउन|सफा/i, "dhara-water"],
  [/\b(skin|cure|heal|disease|medicine|medical)\b/i, "dhara-skin"],
  [/\b(built|build|builder|king|malla|history|who made|constructed)\b/i, "dhara-history"],
  [/\b(name|meaning|mean|pyah|thwam)\b/i, "ajima-name"],
  [/\b(offering|offerings|sacrifice|thwam|aila)\b/i, "ajima-offerings"],
  [/\b(guthi)\b|गुठी/i, "ajima-guthi"],
];
const TOPIC = /lhuti|punhi|mela|festival|dhara|baisdhara|ajima|shitala|pyah|thwam|balaju|spout|water|shrine|guthi|dristi|धारा|अजिमा|बालाजु|पुन्ही|पुन्हि/i;

function retrieve(q: string, k = 3): Fact[] {
  const qt = tokens(q);
  if (!qt.length) return [];
  const onTopic = TOPIC.test(q);
  const boosted = new Set(INTENTS.filter(([re]) => re.test(q)).map(([, id]) => id));
  const scored = facts.map((f) => {
    const set = new Set(tokens(`${f.title} ${f.title} ${f.text}`));
    let score = 0;
    for (const t of qt) if (set.has(t) || [...set].some((h) => h.startsWith(t) || t.startsWith(h))) score += 1;
    // an intent match only counts when the question is also about these places
    if (onTopic && boosted.has(f.id)) score += 5;
    return { f, score };
  });
  return scored.filter((s) => s.score > 0).sort((a, b) => b.score - a.score).slice(0, k).map((s) => s.f);
}

const KNOWLEDGE = facts
  .map((f) => `[${f.id}] ${f.title} (evidence: ${evidenceMeta[f.evidence].label}; sources: ${f.sources.join(",")})\n${f.text}`)
  .join("\n\n");

const SYSTEM = `You are the Heritage Guide for a community website about two places in Balaju, Kathmandu: 22 Dhara (Baisdhara) and Pyatho Ajima.

RULES
1. Answer ONLY from the VERIFIED NOTES below. If the answer is not there, say you don't have verified information and suggest asking the local Guthi, festival committee or heritage authorities. Never invent facts.
2. Always make clear what kind of claim you are stating: documented, commonly reported, oral tradition, or religious belief. Use phrases like "Reports say...", "According to a local article...", "Local belief holds...".
3. Never present religious beliefs as medical facts. Never say the water is safe to drink or can cure disease.
4. For festival dates, say sources disagree and the date must be confirmed with the local committee or Guthi.
5. For ritual details (Dristi Lekhan, offerings), say they should be confirmed with the Guthi and artists, and that restricted rituals should not be photographed without permission.
6. Reply in the user's language (Nepali or English). Keep answers short: 2-4 sentences, warm and respectful, plain words.

VERIFIED NOTES
${KNOWLEDGE}`;

router.post("/", async (req, res) => {
  if (tooMany(`chat:${req.ip}`, 10, 60_000)) {
    return res.status(429).json({ answer: "You're asking quickly. Please wait a minute and try again.", refs: [] });
  }

  const message = String(req.body?.message ?? "").trim().slice(0, 400);
  if (!message) return res.status(400).json({ answer: "Please type a question.", refs: [] });

  const top = retrieve(message);
  const refs = top.map((f) => ({
    id: f.id,
    title: f.title,
    evidence: f.evidence,
    sources: f.sources.map((s) => ({ key: s, title: sources[s].title, url: sources[s].url })),
  }));

  const key = process.env.GEMINI_API_KEY;
  if (key) {
    try {
      const model = new GoogleGenerativeAI(key).getGenerativeModel({
        model: process.env.GEMINI_MODEL ?? "gemini-2.5-flash",
        systemInstruction: SYSTEM,
        generationConfig: { maxOutputTokens: 400, temperature: 0.3 },
      });
      const result = await model.generateContent(message);
      const answer = result.response.text().trim();
      if (answer) return res.json({ answer, refs, mode: "ai" });
    } catch (e) {
      console.error("Gemini error, using local answers:", e);
    }
  }

  // ---- fallback: answer straight from the verified notes ----
  if (!top.length) {
    return res.json({
      answer:
        "I don't have verified information on that yet. For questions I can't answer, the local Guthi members, the festival committee or the heritage authorities are the best people to ask.",
      refs: [],
      mode: "local",
    });
  }
  const best = top[0];
  res.json({
    answer: `${best.title} (${evidenceMeta[best.evidence].label}): ${best.text}`,
    refs: refs.slice(0, 2),
    mode: "local",
  });
});

export default router;
