"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { ARCHIVE_CATEGORIES, CommunityStory, saveCommunityStory } from "@/lib/communityStories";

interface ContributionFormProps {
  initialLocation?: "22-dhara" | "pyatho-ajima" | "ward-16";
  onSuccess?: () => void;
}

export default function ContributionForm({
  initialLocation = "22-dhara",
  onSuccess,
}: ContributionFormProps) {
  const { isNepali } = useLanguage();

  const [formData, setFormData] = useState({
    contributorName: "",
    contributorRole: "",
    email: "",
    age: "",
    attributionPreference: "real_name" as "real_name" | "anonymous" | "representative",
    title: "",
    heritageLocation: initialLocation,
    category: "oral_histories",
    era: "",
    content: "",
    photoCaption: "",
    photoOwnershipConfirmed: false,
    consentAgreed: false,
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    referenceId: string;
    storyTitle: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPhotoError("");

    if (!file) {
      setPhotoPreview(null);
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setPhotoError(
        isNepali
          ? "कृपया मान्य तस्बिर फाइल अपलोड गर्नुहोस् (JPEG, PNG, वा WebP)।"
          : "Invalid format. Please upload a JPEG, PNG, or WebP image."
      );
      return;
    }

    const maxSize = 4 * 1024 * 1024; // 4MB
    if (file.size > maxSize) {
      setPhotoError(
        isNepali
          ? "तस्बिर फाइल ४MB भन्दा ठूलो हुनुहुँदैन।"
          : "Photo size must not exceed 4MB."
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPhotoPreview(null);
    setPhotoError("");
    setFormData((prev) => ({
      ...prev,
      photoCaption: "",
      photoOwnershipConfirmed: false,
    }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.contributorName.trim()) {
      errs.contributorName = isNepali
        ? "योगदानकर्ताको नाम अनिवार्य छ।"
        : "Contributor name is required.";
    }

    if (!formData.title.trim() || formData.title.trim().length < 5) {
      errs.title = isNepali
        ? "कथाको शीर्षक कम्तिमा ५ अक्षरको हुनुपर्दछ।"
        : "Title must be at least 5 characters.";
    }

    if (!formData.content.trim() || formData.content.trim().length < 50) {
      errs.content = isNepali
        ? "संस्मरणको विवरण कम्तिमा ५० अक्षरको हुनुपर्दछ।"
        : "Story text must be at least 50 characters.";
    }

    if (photoPreview && !formData.photoOwnershipConfirmed) {
      errs.photoOwnershipConfirmed = isNepali
        ? "कृपया तस्बिरको स्वामित्व वा अनुमति स्वीकार गर्नुहोस्।"
        : "Please confirm photo ownership or archival permission.";
    }

    if (!formData.consentAgreed) {
      errs.consentAgreed = isNepali
        ? "अभिलेखालयमा सुरक्षित गर्न सहमति अनिवार्य छ।"
        : "Archival consent is required.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const refId =
        "SUB-" +
        Date.now().toString(36).toUpperCase() +
        "-" +
        Math.floor(1000 + Math.random() * 9000);

      const locationMap = {
        "22-dhara": { en: "22 Dhara (Balaju Baisdhara)", ne: "बाइस धारा (बालाजु बाइसधारा)" },
        "pyatho-ajima": { en: "Pyatho Ajima Temple", ne: "प्याठो अजिमा मन्दिर" },
        "ward-16": { en: "Balaju Ward 16 Heritage", ne: "बालाजु वडा १६ सम्पदा" },
      };

      const newStory: CommunityStory = {
        id: `story-${Date.now()}`,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `story-${Date.now()}`,
        title: {
          en: formData.title,
          ne: formData.title,
        },
        contributor: {
          name: formData.attributionPreference === "anonymous" ? (isNepali ? "स्थानीय बासिन्दा (गोप्य)" : "Anonymous Resident") : formData.contributorName,
          nameNepali: formData.attributionPreference === "anonymous" ? "स्थानीय बासिन्दा (गोप्य)" : formData.contributorName,
          age: formData.age ? Number(formData.age) : undefined,
          role: {
            en: formData.contributorRole || "Community Member",
            ne: formData.contributorRole || "स्थानीय समुदाय सदस्य",
          },
          attributionPreference: formData.attributionPreference,
        },
        heritageLocation: {
          id: formData.heritageLocation,
          name: locationMap[formData.heritageLocation],
          slug: formData.heritageLocation,
        },
        category: formData.category,
        era: formData.era || "Recent Recollection",
        publicationDate: new Date().toISOString().split("T")[0],
        summary: {
          en: formData.content.slice(0, 160) + "…",
          ne: formData.content.slice(0, 160) + "…",
        },
        content: {
          en: formData.content,
          ne: formData.content,
        },
        photographs: photoPreview
          ? [
              {
                url: photoPreview,
                caption: {
                  en: formData.photoCaption || formData.title,
                  ne: formData.photoCaption || formData.title,
                },
                credit: formData.contributorName,
              },
            ]
          : undefined,
        tags: ["community", "memory", formData.heritageLocation],
        status: "approved", // Automatically displayed in local collection
        referenceId: refId,
      };

      saveCommunityStory(newStory);
      setIsSubmitting(false);
      setSubmissionResult({
        referenceId: refId,
        storyTitle: formData.title,
      });

      if (onSuccess) onSuccess();
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      contributorName: "",
      contributorRole: "",
      email: "",
      age: "",
      attributionPreference: "real_name",
      title: "",
      heritageLocation: initialLocation,
      category: "oral_histories",
      era: "",
      content: "",
      photoCaption: "",
      photoOwnershipConfirmed: false,
      consentAgreed: false,
    });
    setPhotoPreview(null);
    setSubmissionResult(null);
    setErrors({});
  };

  if (submissionResult) {
    return (
      <div className="wood-frame animate-in fade-in rounded-3xl bg-paper p-8 text-center text-wood shadow-xl sm:p-10 space-y-5">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-marigold/30 border-2 border-marigold text-3xl">
          ✓
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-teal font-semibold">
            {isNepali ? "समीक्षा सूचीमा दर्ता भयो" : "Registered in Community Archive"}
          </span>
          <h3 className="font-display text-2xl font-bold text-brick sm:text-3xl">
            {isNepali ? "धन्यवाद! तपाईंको कथा सुरक्षित भयो" : "Thank You! Your Heritage Story is Archived"}
          </h3>
          <p className="mx-auto max-w-lg text-sm leading-relaxed text-wood/80">
            {isNepali
              ? `"${submissionResult.storyTitle}" शीर्षकको कथा सफलतापूर्वक अभिलेखीकरण गरिएको छ। हाम्रो सम्पादकीय समितिले समीक्षा गरी यसलाई आधिकारिक रूपमा पनि प्रमाणीकरण गर्नेछ।`
              : `Your contribution "${submissionResult.storyTitle}" has been saved. It is now part of the living archive for future generations.`}
          </p>
        </div>

        <div className="inline-block rounded-2xl border border-marigold/40 bg-cream/80 px-5 py-3 font-mono text-xs text-wood">
          <span className="text-wood/60">{isNepali ? "दर्ता संकेत नम्बर:" : "Tracking Reference ID:"}</span>{" "}
          <strong className="text-brick font-bold">{submissionResult.referenceId}</strong>
        </div>

        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <Link
            href="/stories"
            className="inline-flex min-h-[46px] items-center rounded-full bg-marigold px-6 font-semibold text-wood shadow-md hover:brightness-105 active:scale-95"
          >
            {isNepali ? "कथा सङ्गालो हेर्नुहोस्" : "Browse All Stories"}
          </Link>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex min-h-[46px] items-center rounded-full border-2 border-wood/20 bg-cream px-6 font-semibold text-wood hover:bg-wood/5 active:scale-95"
          >
            {isNepali ? "अर्को कथा थप्नुहोस्" : "Submit Another Story"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="wood-frame space-y-8 rounded-3xl bg-paper p-6 text-wood shadow-xl sm:p-10"
    >
      {/* Step 1: Contributor Info */}
      <fieldset className="space-y-4">
        <legend className="font-display text-xl font-bold text-brick border-b border-wood/15 pb-2 w-full">
          {isNepali ? "१. योगदानकर्ताको परिचय" : "1. Contributor Identification"}
        </legend>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-wood mb-1">
              {isNepali ? "पूरा नाम" : "Full Name"} *
            </label>
            <input
              type="text"
              name="contributorName"
              value={formData.contributorName}
              onChange={handleChange}
              placeholder={isNepali ? "उदा: रामकृष्ण मानन्धर" : "e.g. Ram Krishna Manandhar"}
              className="w-full rounded-xl border border-wood/20 bg-cream px-3.5 py-2.5 text-sm text-wood focus:border-marigold focus:outline-none"
            />
            {errors.contributorName && (
              <p className="mt-1 text-xs text-vermilion">{errors.contributorName}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-wood mb-1">
              {isNepali ? "सामुदायिक भूमिका / परिचय" : "Community Role / Connection"}
            </label>
            <input
              type="text"
              name="contributorRole"
              value={formData.contributorRole}
              onChange={handleChange}
              placeholder={isNepali ? "उदा: स्थानीय ज्येष्ठ नागरिक / गुठी सदस्य" : "e.g. Lifelong resident / Guthi trustee"}
              className="w-full rounded-xl border border-wood/20 bg-cream px-3.5 py-2.5 text-sm text-wood focus:border-marigold focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-xs font-semibold text-wood mb-1">
              {isNepali ? "इमेल (ऐच्छिक)" : "Email Address (Optional)"}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full rounded-xl border border-wood/20 bg-cream px-3.5 py-2.5 text-sm text-wood focus:border-marigold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-wood mb-1">
              {isNepali ? "उमेर / कालखण्ड" : "Age or Approximate Era"}
            </label>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder={isNepali ? "उदा: ७२ वा विसं २०३० को दशक" : "e.g. 72 or 1970s"}
              className="w-full rounded-xl border border-wood/20 bg-cream px-3.5 py-2.5 text-sm text-wood focus:border-marigold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-wood mb-1">
              {isNepali ? "प्रकाशन नाम प्राथमिकता" : "Attribution Preference"}
            </label>
            <select
              name="attributionPreference"
              value={formData.attributionPreference}
              onChange={handleChange}
              className="w-full rounded-xl border border-wood/20 bg-cream px-3.5 py-2.5 text-sm text-wood focus:border-marigold focus:outline-none"
            >
              <option value="real_name">{isNepali ? "मेरो वास्तविक नाम देखाउने" : "Show my real name"}</option>
              <option value="anonymous">{isNepali ? "गोप्य (स्थानीय बासिन्दा)" : "Anonymous (Resident)"}</option>
              <option value="representative">{isNepali ? "अग्रजको तर्फबाट" : "On behalf of elder relative"}</option>
            </select>
          </div>
        </div>
      </fieldset>

      {/* Step 2: Story Details */}
      <fieldset className="space-y-4">
        <legend className="font-display text-xl font-bold text-brick border-b border-wood/15 pb-2 w-full">
          {isNepali ? "२. कथाको विवरण" : "2. Story Details & Heritage Location"}
        </legend>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-wood mb-1">
              {isNepali ? "कथाको शीर्षक" : "Story Title"} *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder={isNepali ? "उदा: बिलाउँदै गएको मूलका सम्झनाहरू" : "e.g. The Vanishing Waters of Balaju"}
              className="w-full rounded-xl border border-wood/20 bg-cream px-3.5 py-2.5 text-sm text-wood focus:border-marigold focus:outline-none"
            />
            {errors.title && <p className="mt-1 text-xs text-vermilion">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-wood mb-1">
              {isNepali ? "सम्पदा स्थल" : "Associated Heritage Site"} *
            </label>
            <select
              name="heritageLocation"
              value={formData.heritageLocation}
              onChange={handleChange}
              className="w-full rounded-xl border border-wood/20 bg-cream px-3.5 py-2.5 text-sm text-wood focus:border-marigold focus:outline-none"
            >
              <option value="22-dhara">{isNepali ? "२२ धारा (बालाजु बाइसधारा)" : "22 Dhara (Balaju Baisdhara)"}</option>
              <option value="pyatho-ajima">{isNepali ? "प्याठो अजिमा मन्दिर" : "Pyatho Ajima Temple"}</option>
              <option value="ward-16">{isNepali ? "बालाजु वडा १६ (समग्र सम्पदा)" : "Ward 16 (General Living Heritage)"}</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-wood mb-1">
              {isNepali ? "अभिलेख विधा" : "Archive Category"} *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-xl border border-wood/20 bg-cream px-3.5 py-2.5 text-sm text-wood focus:border-marigold focus:outline-none"
            >
              {ARCHIVE_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {isNepali ? cat.label.ne : cat.label.en}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-wood mb-1">
              {isNepali ? "समय / दशक" : "Approximate Era"}
            </label>
            <input
              type="text"
              name="era"
              value={formData.era}
              onChange={handleChange}
              placeholder={isNepali ? "उदा: विसं २०३०-२०४० को दशक" : "e.g. 1970s - 1980s"}
              className="w-full rounded-xl border border-wood/20 bg-cream px-3.5 py-2.5 text-sm text-wood focus:border-marigold focus:outline-none"
            />
          </div>
        </div>
      </fieldset>

      {/* Step 3: Story Narrative */}
      <fieldset className="space-y-4">
        <legend className="font-display text-xl font-bold text-brick border-b border-wood/15 pb-2 w-full">
          {isNepali ? "३. संस्मरण तथा मौखिक इतिहास" : "3. Story Narrative & Living Memory"}
        </legend>

        <div>
          <label className="block text-xs font-semibold text-wood mb-1">
            {isNepali ? "तपाईंको अनुभव वा अग्रजको भनाइ" : "Your Recollection or Spoken Testimony"} *
          </label>
          <textarea
            name="content"
            rows={6}
            value={formData.content}
            onChange={handleChange}
            placeholder={
              isNepali
                ? "यहाँ विगतका चाडपर्व, ढुङ्गेधाराको पानी, अजिमाको पूजा वा टोलको फेरिँदो परिवेशबारे विस्तारमा लेख्नुहोस् (कम्तिमा ५० अक्षर)..."
                : "Describe your personal memory, an elder's oral recollection, festival atmosphere, or observations on how the heritage has evolved (min 50 characters)..."
            }
            className="w-full rounded-2xl border border-wood/20 bg-cream p-4 text-sm leading-relaxed text-wood focus:border-marigold focus:outline-none font-body"
          />
          <div className="flex justify-between items-center mt-1 text-xs text-wood/60">
            <span>{isNepali ? "कम्तिमा ५० अक्षर अनिवार्य" : "Minimum 50 characters"}</span>
            <span>{formData.content.length} {isNepali ? "अक्षरहरू" : "characters"}</span>
          </div>
          {errors.content && <p className="mt-1 text-xs text-vermilion">{errors.content}</p>}
        </div>
      </fieldset>

      {/* Step 4: Photograph Upload */}
      <fieldset className="space-y-4">
        <legend className="font-display text-xl font-bold text-brick border-b border-wood/15 pb-2 w-full">
          {isNepali ? "४. ऐतिहासिक वा पारिवारिक तस्बिर (ऐच्छिक)" : "4. Historic or Archival Photograph (Optional)"}
        </legend>

        <div>
          <label className="block text-xs font-semibold text-wood mb-1">
            {isNepali ? "तस्बिर फाइल अपलोड गर्नुहोस्" : "Upload Archival Photograph"}
          </label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handlePhotoUpload}
            className="block w-full text-xs text-wood file:mr-4 file:rounded-full file:border-0 file:bg-marigold file:px-4 file:py-2 file:text-xs file:font-semibold file:text-wood hover:file:brightness-105 cursor-pointer"
          />
          <p className="mt-1 text-[11px] text-wood/60">
            {isNepali ? "JPEG, PNG वा WebP, बढीमा ४MB।" : "JPEG, PNG or WebP, up to 4MB."}
          </p>
          {photoError && <p className="mt-1 text-xs text-vermilion">{photoError}</p>}
        </div>

        {/* Photo Preview & Confirmation */}
        {photoPreview && (
          <div className="space-y-3 rounded-2xl border border-wood/15 bg-cream/70 p-4">
            <div className="relative aspect-[16/9] max-w-sm overflow-hidden rounded-xl border border-wood/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photoPreview} alt="Upload preview" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-wood/80 text-cream text-xs hover:bg-wood"
                title="Remove photo"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-wood mb-1">
                {isNepali ? "तस्बिरको क्याप्सन र अनुमानित साल" : "Photograph Caption & Estimated Year"}
              </label>
              <input
                type="text"
                name="photoCaption"
                value={formData.photoCaption}
                onChange={handleChange}
                placeholder={isNepali ? "उदा: बाइसधारा मेला, विसं २०३५" : "e.g. Balaju festival, circa 1978"}
                className="w-full rounded-xl border border-wood/20 bg-cream px-3.5 py-2 text-xs text-wood focus:border-marigold focus:outline-none"
              />
            </div>

            <label className="flex items-start gap-2 text-xs text-wood cursor-pointer">
              <input
                type="checkbox"
                name="photoOwnershipConfirmed"
                checked={formData.photoOwnershipConfirmed}
                onChange={handleChange}
                className="mt-0.5 accent-brick"
              />
              <span>
                {isNepali
                  ? "म प्रमाणित गर्दछु कि यो तस्बिर मेरो वा मेरो परिवारको हो र यसलाई यस अभिलेखालयमा सुरक्षित गर्न मलाई अधिकार छ।"
                  : "I confirm that I own this photograph or have permission from my family/community to archive it here."} *
              </span>
            </label>
            {errors.photoOwnershipConfirmed && (
              <p className="text-xs text-vermilion">{errors.photoOwnershipConfirmed}</p>
            )}
          </div>
        )}
      </fieldset>

      {/* Step 5: Ethics & Archival Consent */}
      <fieldset className="space-y-4">
        <legend className="font-display text-xl font-bold text-brick border-b border-wood/15 pb-2 w-full">
          {isNepali ? "५. अभिलेखीकरण सहमति" : "5. Archival Ethics & Consent"}
        </legend>

        <div className="rounded-2xl border border-wood/15 bg-cream/70 p-4">
          <label className="flex items-start gap-3 text-xs leading-relaxed text-wood cursor-pointer">
            <input
              type="checkbox"
              name="consentAgreed"
              checked={formData.consentAgreed}
              onChange={handleChange}
              className="mt-0.5 accent-brick"
            />
            <span>
              {isNepali
                ? "म मेरो संस्मरण तथा विवरणलाई वडा नं. १६ तथा बालाजु जीवित सम्पदा अभिलेखालयमा गैर-व्यावसायिक, शैक्षिक तथा सांस्कृतिक संरक्षणका लागि समावेश गर्न पूर्ण सहमति दिन्छु।"
                : "I understand that my contribution will be preserved in the Balaju Living Heritage Archive for cultural, educational, and non-commercial documentation, and I consent to its public display."} *
            </span>
          </label>
          {errors.consentAgreed && (
            <p className="mt-1 text-xs text-vermilion pl-6">{errors.consentAgreed}</p>
          )}
        </div>
      </fieldset>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <Link
          href="/stories"
          className="text-xs font-semibold text-wood/75 underline hover:text-wood"
        >
          {isNepali ? "← कथा सङ्गालोमा फर्कनुहोस्" : "← Back to Stories Archive"}
        </Link>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-[48px] items-center rounded-full bg-brick px-8 font-semibold text-cream shadow-md transition-all hover:bg-brick-deep active:scale-95 disabled:opacity-50"
        >
          {isSubmitting
            ? isNepali
              ? "सुरक्षित हुँदैछ…"
              : "Archiving Story…"
            : isNepali
            ? "कथा अभिलेखीकरण गर्नुहोस्"
            : "Submit Story to Archive"}
        </button>
      </div>
    </form>
  );
}
