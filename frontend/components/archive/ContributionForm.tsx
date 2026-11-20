"use client";

/**
 * The one visitor form on the site. No account needed.
 *  - "A full story"  -> after admin approval it appears on the Stories page.
 *  - "Photos only"   -> after admin approval it appears in the Gallery, in the "From visitors" album.
 * Everything is sent to POST /api/submissions as "pending" and waits for an admin.
 */

import { useRef, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { shrinkImage, type Attribution, type PlaceId, type SubmissionType } from "@/lib/submissions";

interface ContributionFormProps {
  initialLocation?: PlaceId;
  initialType?: SubmissionType;
}

const MAX_PHOTOS: Record<SubmissionType, number> = { story: 3, photo: 5 };
const MAX_BYTES = 6 * 1024 * 1024;
const VALID = ["image/jpeg", "image/png", "image/webp"];

const input =
  "w-full rounded-xl border border-wood/20 bg-cream px-3.5 py-2.5 text-sm text-wood focus:border-marigold focus:outline-none";
const label = "block text-xs font-semibold text-wood mb-1";
const legend = "font-display text-xl font-bold text-brick border-b border-wood/15 pb-2 w-full";

type Picked = { file: File; url: string };

export default function ContributionForm({ initialLocation = "22-dhara", initialType = "story" }: ContributionFormProps) {
  const { isNepali } = useLanguage();
  const tr = (en: string, ne: string) => (isNepali ? ne : en);

  const [type, setType] = useState<SubmissionType>(initialType);
  const [place, setPlace] = useState<PlaceId>(initialLocation);
  const [form, setForm] = useState({
    name: "",
    role: "",
    email: "",
    age: "",
    attribution: "real_name" as Attribution,
    title: "",
    era: "",
    body: "",
    website: "", // honeypot: real visitors never see this
    ownsPhotos: false,
    consent: false,
  });
  const [picked, setPicked] = useState<Picked[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<SubmissionType | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const isStory = type === "story";
  const maxPhotos = MAX_PHOTOS[type];

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type: t } = e.target;
    const v = t === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setForm((f) => ({ ...f, [name]: v }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const chooseType = (next: SubmissionType) => {
    setType(next);
    setPicked((p) => p.slice(0, MAX_PHOTOS[next]));
    setErrors({});
  };

  const addFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    let problem = "";
    const ok: Picked[] = [];
    for (const f of files) {
      if (!VALID.includes(f.type)) problem = tr("Please use JPEG, PNG or WebP photos.", "कृपया JPEG, PNG वा WebP तस्बिर प्रयोग गर्नुहोस्।");
      else if (f.size > MAX_BYTES * 3) problem = tr("A photo is too large (over 18 MB).", "तस्बिर धेरै ठूलो छ (१८ MB भन्दा बढी)।");
      else ok.push({ file: f, url: URL.createObjectURL(f) });
    }
    const room = maxPhotos - picked.length;
    if (ok.length > room) problem = tr(`You can add up to ${maxPhotos} photos.`, `बढीमा ${maxPhotos} वटा तस्बिर थप्न सकिन्छ।`);
    setPicked((p) => [...p, ...ok.slice(0, Math.max(room, 0))]);
    setErrors((p) => ({ ...p, photos: problem }));
  };

  const removePhoto = (i: number) =>
    setPicked((p) => {
      URL.revokeObjectURL(p[i].url);
      return p.filter((_, j) => j !== i);
    });

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = tr("Please enter your name.", "कृपया आफ्नो नाम लेख्नुहोस्।");
    if (isStory) {
      if (form.title.trim().length < 5) e.title = tr("Title must be at least 5 characters.", "शीर्षक कम्तिमा ५ अक्षरको हुनुपर्छ।");
      if (form.body.trim().length < 50) e.body = tr("Story text must be at least 50 characters.", "कथा कम्तिमा ५० अक्षरको हुनुपर्छ।");
    } else if (!picked.length) {
      e.photos = tr("Add at least one photo.", "कम्तिमा एउटा तस्बिर थप्नुहोस्।");
    }
    if (picked.length && !form.ownsPhotos)
      e.ownsPhotos = tr("Please confirm you own the photos or have permission.", "कृपया तस्बिरको स्वामित्व वा अनुमति स्वीकार गर्नुहोस्।");
    if (!form.consent) e.consent = tr("Consent is required.", "सहमति अनिवार्य छ।");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    setServerError("");
    if (!validate()) {
      // The messages sit next to their fields, which can be far above the Send button, so bring the first one into view.
      setServerError(tr("Please fix the highlighted fields above.", "कृपया माथि देखाइएका खाली वा गलत ठाउँ सच्याउनुहोस्।"));
      setTimeout(() => {
        const first = formRef.current?.querySelector("p.text-vermilion:not([role=alert])");
        first?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 50);
      return;
    }
    setBusy(true);
    try {
      const fd = new FormData();
      fd.set("type", type);
      fd.set("place", place);
      fd.set("name", form.name);
      fd.set("role", form.role);
      fd.set("email", form.email);
      fd.set("age", form.age);
      fd.set("attribution", form.attribution);
      fd.set("body", form.body);
      fd.set("website", form.website);
      fd.set("consent", String(form.consent));
      fd.set("ownsPhotos", String(form.ownsPhotos));
      if (isStory) {
        fd.set("title", form.title);
        fd.set("era", form.era);
      }
      const shrunk = await Promise.all(picked.map((p) => shrinkImage(p.file)));
      shrunk.forEach((f) => fd.append("photos", f));

      const res = await fetch("/api/submissions", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setServerError(data.error ?? tr("Could not send. Please try again.", "पठाउन सकिएन। फेरि प्रयास गर्नुहोस्।"));
        return;
      }
      setDone(type);
    } catch {
      setServerError(tr("No connection. Please try again.", "इन्टरनेट जडान छैन। फेरि प्रयास गर्नुहोस्।"));
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    picked.forEach((p) => URL.revokeObjectURL(p.url));
    setPicked([]);
    setForm((f) => ({ ...f, title: "", body: "", era: "", website: "", ownsPhotos: false, consent: false }));
    setErrors({});
    setDone(null);
  }

  if (done) {
    return (
      <div className="wood-frame space-y-5 rounded-3xl bg-paper p-8 text-center text-wood shadow-xl sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-marigold bg-marigold/30 text-3xl">✓</div>
        <div className="space-y-2">
          <h3 className="font-display text-2xl font-bold text-brick sm:text-3xl">
            {tr("Thank you! धन्यवाद", "धन्यवाद! Thank you")}
          </h3>
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-wood/80">
            {done === "story"
              ? tr(
                  "Your story has been sent. An admin will read it first. After approval it will appear on the Stories page.",
                  "तपाईंको कथा पठाइयो। एडमिनले पहिले पढ्नेछन्। स्वीकृत भएपछि यो कथा पृष्ठमा देखिनेछ।",
                )
              : tr(
                  "Your photos have been sent. An admin will check them first. After approval they will appear in the Gallery, in the \"From visitors\" album.",
                  "तपाईंका तस्बिर पठाइयो। एडमिनले पहिले हेर्नेछन्। स्वीकृत भएपछि ती ग्यालरीको \"आगन्तुकबाट\" एल्बममा देखिनेछन्।",
                )}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href={done === "story" ? "/stories" : "/gallery"} className="inline-flex min-h-[46px] items-center rounded-full bg-marigold px-6 font-semibold text-wood shadow-md hover:brightness-105 active:scale-95">
            {done === "story" ? tr("Browse stories", "कथाहरू हेर्नुहोस्") : tr("Open the gallery", "ग्यालरी हेर्नुहोस्")}
          </Link>
          <button type="button" onClick={reset} className="inline-flex min-h-[46px] items-center rounded-full border-2 border-wood/20 bg-cream px-6 font-semibold text-wood hover:bg-wood/5 active:scale-95">
            {tr("Share something else", "अर्को साझा गर्नुहोस्")}
          </button>
        </div>
      </div>
    );
  }

  const placeOptions: [PlaceId, string][] = [
    ["22-dhara", tr("22 Dhara (Balaju Baisdhara)", "२२ धारा (बालाजु बाइसधारा)")],
    ["pyatho-ajima", tr("Pyatho Ajima", "प्याठो अजिमा")],
    ["ward-16", tr("Ward 16 (general living heritage)", "बालाजु वडा १६ (समग्र सम्पदा)")],
  ];

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="wood-frame space-y-8 rounded-3xl bg-paper p-6 text-wood shadow-xl sm:p-10">
      {/* Honeypot: hidden from people, filled in by bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" value={form.website} onChange={change} tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* 1. What are you sharing */}
      <fieldset className="space-y-4">
        <legend className={legend}>{tr("1. What are you sharing?", "१. तपाईं के साझा गर्दै हुनुहुन्छ?")}</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="type">{tr("I want to share", "म साझा गर्न चाहन्छु")} *</label>
            <select id="type" value={type} onChange={(e) => chooseType(e.target.value as SubmissionType)} className={input}>
              <option value="story">{tr("A full story or memory", "पूरा कथा वा सम्झना")}</option>
              <option value="photo">{tr("Photos only", "तस्बिर मात्र")}</option>
            </select>
            <p className="mt-1 text-[11px] text-wood/60">
              {isStory
                ? tr("After admin approval it appears on the Stories page.", "एडमिनले स्वीकृत गरेपछि कथा पृष्ठमा देखिन्छ।")
                : tr("After admin approval it appears in the Gallery, in the \"From visitors\" album.", "एडमिनले स्वीकृत गरेपछि ग्यालरीको \"आगन्तुकबाट\" एल्बममा देखिन्छ।")}
            </p>
          </div>
          <div>
            <label className={label} htmlFor="place">{tr("About which place?", "कुन स्थानबारे?")} *</label>
            <select id="place" value={place} onChange={(e) => setPlace(e.target.value as PlaceId)} className={input}>
              {placeOptions.map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      {/* 2. About you */}
      <fieldset className="space-y-4">
        <legend className={legend}>{tr("2. About you", "२. तपाईंको परिचय")}</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label} htmlFor="name">{tr("Your name", "तपाईंको नाम")} *</label>
            <input id="name" name="name" value={form.name} onChange={change} maxLength={60} className={input}
              placeholder={tr("e.g. Ram Krishna Manandhar", "उदा: रामकृष्ण मानन्धर")} />
            {errors.name && <p className="mt-1 text-xs text-vermilion">{errors.name}</p>}
          </div>
          <div>
            <label className={label} htmlFor="attribution">{tr("How should we show your name?", "तपाईंको नाम कसरी देखाउने?")}</label>
            <select id="attribution" name="attribution" value={form.attribution} onChange={change} className={input}>
              <option value="real_name">{tr("Show my name", "मेरो नाम देखाउने")}</option>
              <option value="anonymous">{tr("Anonymous (Resident)", "गोप्य (स्थानीय बासिन्दा)")}</option>
              <option value="representative">{tr("On behalf of an elder relative", "अग्रजको तर्फबाट")}</option>
            </select>
          </div>
        </div>
        {isStory && (
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={label} htmlFor="role">{tr("Connection to the place", "स्थानसँगको सम्बन्ध")}</label>
              <input id="role" name="role" value={form.role} onChange={change} maxLength={100} className={input}
                placeholder={tr("e.g. Lifelong resident", "उदा: स्थानीय ज्येष्ठ नागरिक")} />
            </div>
            <div>
              <label className={label} htmlFor="age">{tr("Age or era", "उमेर / कालखण्ड")}</label>
              <input id="age" name="age" value={form.age} onChange={change} maxLength={40} className={input}
                placeholder={tr("e.g. 72 or 1970s", "उदा: ७२")} />
            </div>
            <div>
              <label className={label} htmlFor="email">{tr("Email (optional, never shown)", "इमेल (ऐच्छिक, देखाइँदैन)")}</label>
              <input id="email" type="email" name="email" value={form.email} onChange={change} className={input} placeholder="name@example.com" />
            </div>
          </div>
        )}
        {!isStory && (
          <div>
            <label className={label} htmlFor="email">{tr("Email (optional, never shown)", "इमेल (ऐच्छिक, देखाइँदैन)")}</label>
            <input id="email" type="email" name="email" value={form.email} onChange={change} className={input} placeholder="name@example.com" />
          </div>
        )}
      </fieldset>

      {/* 3. Story details (stories only) */}
      {isStory && (
        <fieldset className="space-y-4">
          <legend className={legend}>{tr("3. Your story", "३. तपाईंको कथा")}</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label} htmlFor="title">{tr("Story title", "कथाको शीर्षक")} *</label>
              <input id="title" name="title" value={form.title} onChange={change} maxLength={120} className={input}
                placeholder={tr("e.g. The Vanishing Waters of Balaju", "उदा: बिलाउँदै गएको मूलका सम्झनाहरू")} />
              {errors.title && <p className="mt-1 text-xs text-vermilion">{errors.title}</p>}
            </div>
            <div>
              <label className={label} htmlFor="era">{tr("Approximate era", "समय / दशक")}</label>
              <input id="era" name="era" value={form.era} onChange={change} maxLength={60} className={input}
                placeholder={tr("e.g. 1970s - 1980s", "उदा: विसं २०३०-२०४० को दशक")} />
            </div>
          </div>
          <div>
            <label className={label} htmlFor="body">{tr("Your recollection or spoken testimony", "तपाईंको अनुभव वा अग्रजको भनाइ")} *</label>
            <textarea id="body" name="body" rows={7} value={form.body} onChange={change} maxLength={8000}
              placeholder={tr(
                "Describe your memory, an elder's recollection, the festival atmosphere, or how the place has changed (at least 50 characters)…",
                "विगतका चाडपर्व, ढुङ्गेधाराको पानी, अजिमाको पूजा वा टोलको फेरिँदो परिवेशबारे लेख्नुहोस् (कम्तिमा ५० अक्षर)…",
              )}
              className="w-full rounded-2xl border border-wood/20 bg-cream p-4 text-sm leading-relaxed text-wood focus:border-marigold focus:outline-none" />
            <div className="mt-1 flex justify-between text-xs text-wood/60">
              <span>{tr("Minimum 50 characters", "कम्तिमा ५० अक्षर")}</span>
              <span>{form.body.length} {tr("characters", "अक्षर")}</span>
            </div>
            {errors.body && <p className="mt-1 text-xs text-vermilion">{errors.body}</p>}
          </div>
        </fieldset>
      )}

      {/* Photos */}
      <fieldset className="space-y-4">
        <legend className={legend}>
          {isStory
            ? tr("4. Photographs (optional)", "४. तस्बिर (ऐच्छिक)")
            : tr("3. Your photos", "३. तपाईंका तस्बिर")}
        </legend>
        <div>
          {picked.length < maxPhotos && (
            <input type="file" multiple accept="image/jpeg,image/png,image/webp" onChange={addFiles}
              aria-label={tr("Add photos", "तस्बिर थप्नुहोस्")}
              className="block w-full cursor-pointer text-xs text-wood file:mr-4 file:rounded-full file:border-0 file:bg-marigold file:px-4 file:py-2 file:text-xs file:font-semibold file:text-wood hover:file:brightness-105" />
          )}
          <p className="mt-1 text-[11px] text-wood/60">
            {tr(`JPEG, PNG or WebP · up to ${maxPhotos} photos · location data is removed automatically.`, `JPEG, PNG वा WebP · बढीमा ${maxPhotos} तस्बिर · स्थान जानकारी स्वतः हटाइन्छ।`)}
          </p>
          {errors.photos && <p className="mt-1 text-xs text-vermilion">{errors.photos}</p>}
        </div>

        {picked.length > 0 && (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {picked.map((p, i) => (
              <div key={p.url} className="relative aspect-square overflow-hidden rounded-xl border border-wood/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} alt={tr("Selected photo", "छानिएको तस्बिर")} className="h-full w-full object-cover" />
                <button type="button" onClick={() => removePhoto(i)} aria-label={tr("Remove photo", "तस्बिर हटाउनुहोस्")}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-wood/80 text-xs text-cream hover:bg-wood">✕</button>
              </div>
            ))}
          </div>
        )}

        {!isStory && (
          <div>
            <label className={label} htmlFor="body">{tr("Caption (optional)", "क्याप्सन (ऐच्छिक)")}</label>
            <input id="body" name="body" value={form.body} onChange={change} maxLength={300} className={input}
              placeholder={tr("e.g. Balaju festival, circa 1978", "उदा: बाइसधारा मेला, विसं २०३५")} />
          </div>
        )}

        {picked.length > 0 && (
          <div>
            <label className="flex cursor-pointer items-start gap-2 text-xs text-wood">
              <input type="checkbox" name="ownsPhotos" checked={form.ownsPhotos} onChange={change} className="mt-0.5 accent-brick" />
              <span>
                {tr(
                  "I own these photographs or have permission from my family or community to share them. They show no identifiable worshippers or children without consent, and no restricted rituals.",
                  "यी तस्बिर मेरा वा मेरो परिवारका हुन् वा साझा गर्ने अनुमति छ। सहमति बिना चिनिने भक्तजन वा बालबालिका र वर्जित अनुष्ठान छैनन्।",
                )} *
              </span>
            </label>
            {errors.ownsPhotos && <p className="mt-1 text-xs text-vermilion">{errors.ownsPhotos}</p>}
          </div>
        )}
      </fieldset>

      {/* Consent */}
      <fieldset className="space-y-4">
        <legend className={legend}>{tr("Consent", "सहमति")}</legend>
        <div className="rounded-2xl border border-wood/15 bg-cream/70 p-4">
          <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-wood">
            <input type="checkbox" name="consent" checked={form.consent} onChange={change} className="mt-0.5 accent-brick" />
            <span>
              {tr(
                "I understand that an admin will review my submission before anything is published, and that once approved it will be shown publicly in the Balaju Living Heritage archive for cultural, educational and non-commercial purposes.",
                "म बुझ्छु कि प्रकाशन अघि एडमिनले मेरो योगदान जाँच गर्नेछन्, र स्वीकृत भएपछि यो बालाजु जीवित सम्पदा अभिलेखमा गैर-व्यावसायिक, शैक्षिक तथा सांस्कृतिक प्रयोजनका लागि सार्वजनिक रूपमा देखाइनेछ।",
              )} *
            </span>
          </label>
          {errors.consent && <p className="mt-1 pl-6 text-xs text-vermilion">{errors.consent}</p>}
        </div>
      </fieldset>

      {serverError && (
        <p role="alert" className="rounded-xl bg-vermilion/10 px-4 py-3 text-sm font-semibold text-brick-deep">{serverError}</p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <Link href={isStory ? "/stories" : "/gallery"} className="text-xs font-semibold text-wood/75 underline hover:text-wood">
          {tr("← Back", "← फर्कनुहोस्")}
        </Link>
        <button type="submit" disabled={busy}
          className="inline-flex min-h-[48px] items-center rounded-full bg-brick px-8 font-semibold text-cream shadow-md transition-all hover:bg-brick-deep active:scale-95 disabled:opacity-50">
          {busy ? tr("Sending…", "पठाउँदै…") : tr("Send for review", "समीक्षाका लागि पठाउनुहोस्")}
        </button>
      </div>
    </form>
  );
}
