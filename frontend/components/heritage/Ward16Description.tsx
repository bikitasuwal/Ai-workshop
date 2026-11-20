"use client";

/**
 * components/heritage/Ward16Description.tsx
 *
 * The description card for /dhara, laid out like the card on /ajima:
 * a single encyclopedia-style article with a small photo floated to the right,
 * a link underneath the photo that opens the 22 Dhara album in the gallery,
 * and a listen button in the card header that reads the card aloud.
 *
 * Every statement comes from the project's own sourced notes (lib/content.ts
 * and the Ward 16 context kept on this card). Beliefs and oral traditions are
 * worded as such.
 */

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal } from "@/components/ui";
import NarrateButton from "@/components/ui/NarrateButton";

interface Ward16DescriptionProps {
  variant?: "home" | "dhara";
}

export default function Ward16Description({ variant = "home" }: Ward16DescriptionProps) {
  const { isNepali } = useLanguage();
  const tr = (en: string, ne: string) => (isNepali ? ne : en);

  // The description, written once. It is shown below and also read aloud by the listen button.
  const intro = tr(
    "Kathmandu Metropolitan City Ward No. 16 is a dynamic urban landscape where historic shrines, traditional waterworks, and generations of Newar cultural heritage intersect with contemporary city life.",
    "काठमाडौँ महानगरपालिका वडा नं. १६ एउटा यस्तो गतिशील सहरी क्षेत्र हो जहाँ ऐतिहासिक तीर्थस्थल, परम्परागत जलप्रणाली र पुस्तौँदेखिको नेवार सांस्कृतिक सम्पदा आधुनिक जीवनसँगै एकाकार भएका छन्।",
  );
  const storyHead = tr(
    "From Nagarjun Foothills to Urban Courtyards",
    "नागार्जुनको फेदीदेखि सहरी चोकसम्म",
  );
  const story = tr(
    "From the forested slopes of Nagarjun to the bustling residential courtyards of Balaju and Sorhakhutte, the ward preserves sacred landmarks that have anchored community rituals for centuries. The stone spouts, shrines, and rest houses are not mere static monuments, but living spaces of daily ablution, evening hymns, and festive solidarity.",
    "नागार्जुन पर्वतको हरियाली फेदीदेखि बालाजु र सोह्रखुट्टेका आवासीय चोकसम्म फैलिएको यो वडाले शताब्दीयौँदेखि स्थानीय समुदायलाई एकताको सूत्रमा बाँध्ने पवित्र सम्पदाहरूको संरक्षण गर्दै आएको छ। यहाँका ढुङ्गेधारा, मन्दिर र पाटीहरू केवल ढुङ्गा र काठका संरचना मात्र होइनन्, स्थानीय नेवार समुदायको दैनिक जीवन र चाडपर्वका अभिन्न अङ्ग हुन्।",
  );
  const noteHead = tr("22 Dhara in Ward 16:", "२२ धारा वडा १६ मा:");
  const note = tr(
    "22 Dhara serves as the hydrological anchor of Ward 16. The ward administration and civic youth committees actively protect the uphill aquifer recharge zone on Nagarjun and co-manage the annual Baisdhara Mela with traditional Guthi caretakers.",
    "२२ धारा यस वडाको सबैभन्दा ठूलो जल सम्पदा हो। वडा नं. १६ ले नागार्जुन डाँडाको जलाधार संरक्षण, मूल सफाइ र प्रत्येक वर्ष लाग्ने बाइसधारा मेला (ल्हुति पुन्हि) को सम्पूर्ण व्यवस्थापन तथा सुरक्षामा स्थानीय गुठी र समुदायसँग हातेमालो गर्दै आएको छ।",
  );
  const quartersHead = tr(
    "Key Heritage Quarters of Ward 16",
    "वडा १६ का प्रमुख सम्पदा बस्तीहरू",
  );
  const neighborhoods = [
    {
      name: isNepali ? "बालाजु (बाइसधारा क्षेत्र)" : "Balaju (Baisdhara Enclave)",
      desc: isNepali
        ? "प्राकृतिक पानीका मूल, ऐतिहासिक २२ ढुङ्गेधारा, बाइसधारा उद्यान र नागार्जुन फेदीको हरियालीले घेरिएको पवित्र जलतीर्थ।"
        : "Historic water heritage precinct at the foot of Nagarjun forest, anchored by the iconic 22 stone spouts and natural springs.",
    },
    {
      name: isNepali ? "प्याठो अजिमा परिसर" : "Pyatho Ajima Sacred Precinct",
      desc: isNepali
        ? "स्थानीय नेवार समुदायको आध्यात्मिक केन्द्र, जहाँ दैनिक पूजा, दाफा भजन र गुठी परम्परा अक्षुण्ण छ।"
        : "Vibrant spiritual sanctuary of the protective Matrika goddess, preserving evening devotional hymns and Guthi systems.",
    },
    {
      name: isNepali ? "सोह्रखुट्टे र नयाँबजार" : "Sorhakhutte & Nayabazar",
      desc: isNepali
        ? "काठमाडौँको ऐतिहासिक व्यापारिक मार्ग, जहाँ परम्परागत नेवार चोक (नानानी) र पाटी-सत्तलहरू संरक्षित छन्।"
        : "Historic gateway neighborhood featuring traditional Newar courtyards, historic rest pavilions, and community life.",
    },
    {
      name: isNepali ? "वनस्थली र रानीवन फेदी" : "Banasthali & Raniban Slopes",
      desc: isNepali
        ? "नागार्जुन राष्ट्रिय निकुञ्जसँग जोडिएको जलाधार क्षेत्र, जसले बाइसधाराको भूमिगत पानी रिचार्ज गर्दछ।"
        : "Adjoins the protected Nagarjun Forest Reserve, providing crucial watershed catchment for subterranean aquifers.",
    },
  ];
  // Headings end with a full stop so the voice pauses after them.
  const stop = isNepali ? "।" : ".";
  const narration = [
    tr("22 Dhara.", "२२ धारा।"),
    intro,
    storyHead + stop,
    story,
    ...(variant === "dhara" ? [noteHead + stop, note] : []),
    quartersHead + stop,
    ...neighborhoods.flatMap((n) => [n.name + stop, n.desc]),
  ].join(" ");

  return (
    <section className="space-y-8">
      <Reveal className="space-y-2 text-center">
        <h2 className="font-display text-3xl font-bold text-brick sm:text-4xl">
          {variant === "dhara"
            ? tr("22 Dhara in the Geography & Heritage of Ward 16", "वडा नं. १६ को भूगोल र सम्पदामा २२ धारा")
            : tr("A Tapestry of History, Faith and Neighbourhood Life", "इतिहास, आस्था र स्थानीय जीवनको संगम · वडा १६")}
        </h2>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-wood/80 sm:text-base">
          {variant === "dhara"
            ? tr(
                "A short, encyclopedia-style introduction to the spouts, their water and the ward that looks after them.",
                "यी धाराहरू, तिनको पानी र यसलाई जोगाउने वडाको सङ्क्षिप्त, विश्वकोश शैलीको परिचय।",
              )
            : tr(
                "A short, encyclopedia-style introduction to the ward, its shrines and the people who look after them.",
                "यो वडा, यसका तीर्थस्थल र यसलाई जोगाउने मानिसहरूको सङ्क्षिप्त, विश्वकोश शैलीको परिचय।",
              )}
        </p>
      </Reveal>

      <div className="mx-auto max-w-5xl">
        {/* The article, with the photo inside it */}
        <Reveal>
          <article className="wood-frame flow-root space-y-4 rounded-3xl bg-paper p-6 text-wood shadow-sm sm:p-8">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 border-b border-wood/15 pb-3">
              <span className="font-display text-xl text-marigold">◈</span>
              <h3 className="font-display text-2xl font-bold text-brick">22 Dhara</h3>
              <span className="font-deva text-lg text-wood/70">२२ धारा</span>
              <NarrateButton text={narration} className="ml-auto self-center" />
            </div>
            <p className="-mt-1 text-xs italic text-wood/60">
              {tr(
                "Also known as Baisdhara; locally called Lhuti.",
                "बैसधारा पनि भनिन्छ; स्थानीय रूपमा ल्हुति।",
              )}
            </p>

            <figure className="mx-auto w-full max-w-xs sm:float-right sm:mb-3 sm:ml-6 sm:mt-1 sm:w-64 lg:w-72">
              <div className="wood-frame relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-wood shadow-sm">
                <Image
                  src="/images/22-dhara/hero.jpg"
                  alt={tr("The 22 stone water spouts of Balaju Baisdhara", "बालाजु बैसधाराका २२ वटा ढुङ्गेधाराहरू")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 288px"
                />
              </div>
              <figcaption className="mt-2 text-center">
                <Link
                  href="/gallery/dhara"
                  className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-teal underline-offset-4 hover:underline"
                >
                  {tr("Explore more photos", "थप तस्बिरहरू हेर्नुहोस्")}
                  <span aria-hidden>→</span>
                </Link>
              </figcaption>
            </figure>

            <p className="text-justify text-sm leading-relaxed text-wood/90 hyphens-auto">
              {intro}
            </p>

            <h4 className="font-display pt-1 text-base font-bold text-brick">{storyHead}</h4>
            <p className="text-justify text-sm leading-relaxed text-wood/90 hyphens-auto">
              {story}
            </p>

            {variant === "dhara" && (
              <div className="rounded-2xl border border-teal/30 bg-teal/10 p-4 text-xs leading-relaxed text-teal-deep">
                <strong>{noteHead}</strong>{" "}
                {note}
              </div>
            )}

            <h4 className="font-display pt-1 text-base font-bold text-brick">{quartersHead}</h4>
            <div className="grid gap-3 sm:grid-cols-2">
              {neighborhoods.map((n, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-wood/15 bg-cream/75 p-3.5 text-xs text-wood"
                >
                  <p className="font-display font-semibold text-brick">{n.name}</p>
                  <p className="mt-1 text-wood/75 leading-relaxed">{n.desc}</p>
                </div>
              ))}
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
