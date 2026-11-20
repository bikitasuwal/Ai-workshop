import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { evidenceMeta, type Evidence } from "@/lib/content";

export type DocumentChunk = {
  id: string;
  num: number;
  title: string;
  topic: string;
  keywords: string;
  evidence: Evidence;
  sources: string;
  en: string;
  ne: string;
};

// Cached document chunks
let cachedChunks: DocumentChunk[] = [];

function loadDocumentChunks(): DocumentChunk[] {
  if (cachedChunks.length > 0) return cachedChunks;

  try {
    const candidates = [
      path.resolve(process.cwd(), "public/data/verified_heritage_knowledge.txt"),
      path.resolve(process.cwd(), "../backend/data/verified_heritage_knowledge.txt"),
    ];

    let raw = "";
    for (const c of candidates) {
      if (fs.existsSync(c)) {
        raw = fs.readFileSync(c, "utf-8");
        break;
      }
    }

    if (!raw) {
      console.warn("[Next.js RAG] Knowledge document not found");
      return [];
    }

    const sectionRegex =
      /--------------------------------------------------------------------------------\s*SECTION\s+(\d+):\s*([^\n]+)\s*--------------------------------------------------------------------------------([\s\S]*?)(?=(?:--------------------------------------------------------------------------------\s*SECTION|$))/g;

    const chunks: DocumentChunk[] = [];
    let match: RegExpExecArray | null;

    while ((match = sectionRegex.exec(raw)) !== null) {
      const num = Number(match[1]);
      const title = match[2].trim();
      const body = match[3];

      const topic = (body.match(/Topic:\s*([^\n]+)/i) || [])[1]?.trim() || title;
      const keywords = (body.match(/Keywords:\s*([^\n]+)/i) || [])[1]?.trim() || "";
      const rawEvidence = (body.match(/Evidence:\s*([^\n]+)/i) || [])[1]?.trim().toLowerCase() || "";
      const sources = (body.match(/Sources:\s*([^\n]+)/i) || [])[1]?.trim() || "";
      const enMatch = body.match(/English:\s*([\s\S]*?)(?=Nepali:|$)/i);
      const neMatch = body.match(/Nepali:\s*([\s\S]*?)(?=Sources:|$)/i);

      let evidence: Evidence = "documented";
      if (rawEvidence.includes("belief")) evidence = "belief";
      else if (rawEvidence.includes("oral")) evidence = "oral";
      else if (rawEvidence.includes("reported")) evidence = "reported";
      else if (rawEvidence.includes("verify") || rawEvidence.includes("confirm")) evidence = "verify";

      chunks.push({
        id: `sec-${num}`,
        num,
        title,
        topic,
        keywords,
        evidence,
        sources,
        en: enMatch ? enMatch[1].trim() : "",
        ne: neMatch ? neMatch[1].trim() : "",
      });
    }

    cachedChunks = chunks;
    return chunks;
  } catch (err) {
    console.error("[Next.js RAG] Error loading knowledge document:", err);
    return [];
  }
}

// Tokenizer & Language Utilities
const STOP_EN = new Set(
  "the a an is are was were of in on at to for and or what who how when where why does do it this that about tell me with can you give".split(" ")
);

const STOP_NE = new Set(
  "यो त्यो के कसरी कहिले कहाँ किन को हुन् हो छन् छ थियो थिए र वा मा बाट द्वारा बारे भन्नुहोस् दिनुहोस्".split(" ")
);

function isNepaliText(s: string): boolean {
  return /[\u0900-\u097F]/.test(s);
}

function tokenize(s: string): string[] {
  const norm = s.toLowerCase();
  const words = norm.match(/[\p{L}\p{N}]{2,}/gu) ?? [];
  return words.filter((w) => !STOP_EN.has(w) && !STOP_NE.has(w));
}

const INTENT_RULES: [RegExp, number][] = [
  [/\b(where|location|map|sorhakhutte|nayabazar|ward 16|overview)\b|कहाँ|अवस्थिति|स्थान|नक्सा|वडा १६/i, 1],
  [/\b(built|history|king|malla|shah|rana bahadur|jaya prakash|1774|1789|origin)\b|इतिहास|कसले बनाएको|मल्ल|शाह|राजा|निर्माण/i, 2],
  [/\b(makara|hitimanga|aquifer|spring|nagarjun|jamacho|hydraulic|architecture|sunken|basin|hiti gah)\b|मकर|हितिमंग|मुहान|नागार्जुन|इन्जिनियरिङ|वास्तुकला/i, 3],
  [/\b(bal narayan|sleeping vishnu|budhanilkantha|jal bhairav|shital mai|shrine)\b|बाल नारायण|नारायण|बूढानीलकण्ठ|भैरव|मन्दिरहरू/i, 4],
  [/\b(mela|festival|lhuti punhi|purnima|chaitra|bath|bathing|skin|cure|disease|safe|drink|water quality)\b|मेला|ल्हुति|पुन्हि|पूर्णिमा|स्नान|रोग|छाला|पिउन/i, 5],
  [/\b(pyah|thwam|pyatho|ajima|grandmother|shitala|pith|stone|sanctum|mother goddess|matrika|meaning)\b|प्याः|थ्वँ|प्याठो|अजिमा|शीतला|मातृका|शिला|अर्थ/i, 6],
  [/\b(strut|struts|tunal|tundal|dachi appa|wood|carving|pagoda|roof|brick)\b|टुँडाल|दाची अप्पा|काष्ठकला|छाना|पागोडा/i, 7],
  [/\b(dristi|lekhan|eye|painting|chitrakar|pu|secret|restricted|photo|camera)\b|दृष्टि|लेखन|चित्रकार|पुँ|आँखा|फोटो/i, 8],
  [/\b(dafa|bhajan|khin|drum|cymbals|taa|music|song|phalecha|pati|gunla)\b|दाफा|भजन|खिं|बाजा|ताः|संगीत|पाटी/i, 9],
  [/\b(guthi|offering|offerings|aila|samay baji|sacrifice|stewardship)\b|गुठी|पूजा सामग्री|अय्ला|समय् बजि|बलि/i, 10],
];

function retrieveChunks(query: string, k = 3): { chunk: DocumentChunk; score: number }[] {
  const chunks = loadDocumentChunks();
  if (!chunks.length) return [];

  const qTokens = tokenize(query);
  const boosts = new Set<number>();

  for (const [pattern, secNum] of INTENT_RULES) {
    if (pattern.test(query)) {
      boosts.add(secNum);
    }
  }

  const scored = chunks.map((chunk) => {
    let score = 0;
    const chunkKeywords = tokenize(chunk.keywords);
    const chunkTitle = tokenize(chunk.title + " " + chunk.topic);
    const chunkText = tokenize(chunk.en + " " + chunk.ne);

    const kwSet = new Set(chunkKeywords);
    const titleSet = new Set(chunkTitle);
    const textSet = new Set(chunkText);

    for (const t of qTokens) {
      if (kwSet.has(t)) score += 4;
      if (titleSet.has(t)) score += 3;
      if (textSet.has(t)) score += 1;
    }

    if (boosts.has(chunk.num)) {
      score += 6;
    }

    return { chunk, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const rawMessage = String(body?.message ?? "").trim().slice(0, 500);

    if (!rawMessage) {
      return NextResponse.json({ answer: "Please type a question.", refs: [] }, { status: 400 });
    }

    const userNepali = isNepaliText(rawMessage);
    const wantsBilingual = /\b(both languages|bilingual|nepali and english|नेपाली र अंग्रेजी)\b/i.test(rawMessage);

    // 1. Retrieve RAG document passages
    const retrieved = retrieveChunks(rawMessage, 3);

    const refs = retrieved.map(({ chunk }) => ({
      id: chunk.id,
      title: userNepali ? chunk.topic : chunk.title,
      evidence: chunk.evidence,
      sources: [
        {
          key: `Sec ${chunk.num}`,
          title: chunk.sources || "Ward 16 Cultural Documentation",
          url: "/sources",
        },
      ],
    }));

    const generateLocalAnswer = (): string => {
      if (!retrieved.length) {
        return userNepali
          ? "यस विषयमा हाम्रो डिजिटल अभिलेखमा प्रमाणित विवरण उपलब्ध छैन। प्रमाणित विवरणका लागि स्थानीय गुठी, मेला व्यवस्थापन समिति वा वडा १६ कार्यालयमा सोध्न सक्नुहुन्छ।"
          : "I do not have verified archival information on that topic in our records. For unverified questions, please consult with the local Guthi elders, the festival committee, or the Ward 16 Heritage Office.";
      }

      const top = retrieved[0].chunk;
      const label = evidenceMeta[top.evidence]?.label ?? "Documented";

      if (wantsBilingual) {
        return `[English] (${label}): ${top.en}\n\n[नेपाली] (${label}): ${top.ne}`;
      }

      if (userNepali) {
        return `(${label}) ${top.ne}`;
      }

      return `(${label}) ${top.en}`;
    };

    // 2. Check for Gemini API key
    const apiKey = (process.env.GEMINI_API_KEY || "").trim();

    if (apiKey) {
      const passagesContext = retrieved
        .map(
          ({ chunk }) =>
            `[Section ${chunk.num}: ${chunk.title} | Evidence: ${chunk.evidence} | Sources: ${chunk.sources}]\nENGLISH:\n${chunk.en}\nNEPALI:\n${chunk.ne}`
        )
        .join("\n\n---\n\n");

      const systemInstruction = `You are the official Heritage Guide AI for Balaju Ward 16, Kathmandu, specializing in 22 Dhara (Balaju Baisdhara) and Pyah Thwam Ajima.

GROUNDING & RAG INSTRUCTIONS:
1. Answer strictly using ONLY the information provided in the VERIFIED ARCHIVAL PASSAGES below. Never invent outside facts, dates, kings, or folklore.
2. If the user question is not covered in the verified passages, reply courteously that verified archival information is not available for that topic, and suggest consulting local Guthi members or the Ward 16 office.
3. LANGUAGE REQUIREMENT:
   - If the user writes in Nepali (नेपाली), you MUST answer in fluent, respectful, natural Nepali.
   - If the user writes in English, answer in clear, articulate English.
   - If the user asks for both languages or bilingual, provide the response in English followed by Nepali.
4. EVIDENCE DISTINCTION: Always distinguish between documented history, community reports, oral traditions, and religious beliefs.
5. HEALTH/WATER SAFETY: Never claim that 22 Dhara water cures illnesses or is medically proven for skin diseases. Treat this strictly as cultural faith.
6. CULTURAL PRIVACY: Mention that sacred rituals such as Dristi Lekhan (eye-painting by Chitrakar artisans) are esoteric and subject to Guthi restrictions on photography.
7. Keep answers engaging, warm, respectful, and concise (2-4 paragraphs).

VERIFIED ARCHIVAL PASSAGES:
${passagesContext || "No specific passage matched; use archival grounding policy."}`;

      const candidateModels = Array.from(
        new Set([
          process.env.GEMINI_MODEL || "gemini-3.5-flash",
          "gemini-3.5-flash",
          "gemini-3.8-flash",
          "gemini-flash-latest",
        ])
      );

      const prompt = `User Question: ${rawMessage}\n\nRespond to the user question using the verified passages provided in the system instruction in ${
        wantsBilingual ? "both English and Nepali" : userNepali ? "Nepali (नेपाली)" : "English"
      }.`;

      for (const model of candidateModels) {
        try {
          const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
          const geminiRes = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ role: "user", parts: [{ text: prompt }] }],
              systemInstruction: { parts: [{ text: systemInstruction }] },
              generationConfig: {
                maxOutputTokens: 600,
                temperature: 0.2,
              },
            }),
          });

          if (geminiRes.ok) {
            const data = await geminiRes.json();
            const aiAnswer = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
            if (aiAnswer) {
              return NextResponse.json({
                answer: aiAnswer,
                refs,
                mode: "rag-ai",
              });
            }
          }
        } catch (err) {
          console.warn(`[Next.js Gemini] Model ${model} failed, trying next candidate:`, err);
        }
      }
    }

    // 3. Fallback: answer directly from the document
    const fallbackAnswer = generateLocalAnswer();
    return NextResponse.json({
      answer: fallbackAnswer,
      refs,
      mode: "rag-document",
    });
  } catch (globalErr) {
    console.error("[Next.js Chat API error]:", globalErr);
    return NextResponse.json({
      answer: "I am having trouble accessing the heritage records right now. Please try again in a moment.",
      refs: [],
      mode: "error-fallback",
    });
  }
}
