"use client";

/**
 * components/heritage/AjimaDescription.tsx
 *
 * The description card for /ajima, laid out like the Ward 16 card on /dhara:
 * an encyclopedia-style article on the left, a small photo on the right with a
 * link underneath that opens the Ajima album in the gallery.
 *
 * Every statement comes from the project's own sourced notes (lib/content.ts and
 * lib/heritageDetailData.ts). Beliefs and oral traditions are worded as such.
 */

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal } from "@/components/ui";

export default function AjimaDescription() {
  const { isNepali } = useLanguage();
  const tr = (en: string, ne: string) => (isNepali ? ne : en);

  const facts: [string, string][] = [
    [tr("Location", "स्थान"), tr("Balaju, Ward 16, Kathmandu", "बालाजु, वडा नं. १६, काठमाडौँ")],
    [
      tr("Deity", "देवी"),
      tr("Ajima, a protective mother goddess (Matrika); locally called Shitala Mai", "अजिमा (मातृका), रक्षक मातृदेवी; स्थानीय रूपमा शीतला माई"),
    ],
    [tr("Tradition", "परम्परा"), tr("Newar", "नेवार")],
    [tr("Festival link", "पर्वसँग सम्बन्ध"), tr("Baisdhara / Lhuti Punhi", "बैसधारा / ल्हुति पुन्हि")],
    [tr("Cared for by", "संरक्षण"), tr("Guthi (community trusts)", "गुठी (सामुदायिक ट्रस्ट)")],
  ];

  return (
    <section className="space-y-8">
      <Reveal className="space-y-2 text-center">
        <h2 className="font-display text-3xl font-bold text-brick sm:text-4xl">
          {tr("Pyatho Ajima, a Mother Goddess Shrine in Ward 16", "प्याठो अजिमा, वडा नं. १६ को मातृदेवी मन्दिर")}
        </h2>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-wood/80 sm:text-base">
          {tr(
            "A short, encyclopedia-style introduction to the shrine, its goddess and the community that looks after it.",
            "यस मन्दिर, यसकी देवी र यसलाई जोगाउने समुदायको सङ्क्षिप्त, विश्वकोश शैलीको परिचय।",
          )}
        </p>
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        {/* Left: the article */}
        <div className="lg:col-span-7">
          <Reveal>
            <article className="wood-frame space-y-4 rounded-3xl bg-paper p-6 text-wood shadow-sm sm:p-8">
              <div className="flex items-baseline gap-3 border-b border-wood/15 pb-3">
                <span className="font-display text-xl text-marigold">◈</span>
                <h3 className="font-display text-2xl font-bold text-brick">Pyatho Ajima</h3>
                <span className="font-deva text-lg text-wood/70">प्याठो अजिमा</span>
              </div>
              <p className="-mt-1 text-xs italic text-wood/60">
                {tr(
                  "Also written Pyah Thwam Ajima; locally called Shitala Mai.",
                  "प्याः थ्वँ अजिमा पनि लेखिन्छ; स्थानीय रूपमा शीतला माई भनिन्छ।",
                )}
              </p>

              <p className="text-sm leading-relaxed text-wood/90">
                {tr(
                  "Pyatho Ajima is a Newar shrine to a protective mother goddess in Balaju, in Ward 16 of Kathmandu Metropolitan City. Local reporting places it inside the historic Balaju Baisdhara Park complex, beside the Nagarjun forest and close to the 22 Dhara water spouts.",
                  "प्याठो अजिमा काठमाडौँ महानगरपालिका वडा नं. १६ को बालाजुमा रहेको रक्षक मातृदेवीको नेवार मन्दिर हो। स्थानीय समाचारअनुसार यो नागार्जुन जङ्गलनजिक, २२ धारा नजिकै ऐतिहासिक बालाजु बैसधारा पार्क परिसरभित्र पर्छ।",
                )}
              </p>

              <h4 className="font-display pt-1 text-base font-bold text-brick">{tr("The Ajima", "अजिमा")}</h4>
              <p className="text-sm leading-relaxed text-wood/90">
                {tr(
                  "In Newar religion, “Ajima” broadly means a divine, protective mother figure. Ajima or Matrika goddesses are worshipped by different Newar communities, Hindu and Buddhist, and their shrines and forms vary across the Kathmandu Valley.",
                  "नेवार धर्ममा “अजिमा” भन्नाले व्यापक रूपमा दिव्य, रक्षक मातृशक्तिलाई बुझाउँछ। हिन्दु र बौद्ध दुवै नेवार समुदायले अजिमा वा मातृका देवीको पूजा गर्छन्, र काठमाडौँ उपत्यकाभरि तिनका मन्दिर र स्वरूप फरक-फरक हुन्छन्।",
                )}
              </p>

              <h4 className="font-display pt-1 text-base font-bold text-brick">{tr("Worship and tradition", "पूजा र परम्परा")}</h4>
              <p className="text-sm leading-relaxed text-wood/90">
                {tr(
                  "Local reporting associates the goddess with protection from illness, epidemics and threats to children’s wellbeing. This is a religious belief, not a proven way to prevent or treat disease. During the annual Baisdhara / Lhuti Punhi observance, devotees are reported to bathe at the 22 Dhara spouts and then worship at the shrine.",
                  "स्थानीय समाचारले देवीलाई रोग, महामारी र बालबालिकाको कल्याणमाथिको खतराबाट रक्षासँग जोडेको छ। यो धार्मिक विश्वास हो; रोग रोक्ने वा निको पार्ने प्रमाणित उपाय होइन। वार्षिक बैसधारा / ल्हुति पुन्हिको समयमा भक्तजनहरू २२ धाराका धारामा स्नान गरेर मन्दिरमा पूजा गर्ने उल्लेख छ।",
                )}
              </p>
              <p className="text-sm leading-relaxed text-wood/90">
                {tr(
                  "Members of the Pũ (Chitrakar) community’s Guthi are described as painting the eyes of the goddess in a ritual called Dristi Lekhan. The exact procedure should be confirmed with the artists and the Guthi, and the ritual should not be assumed to be open to photography.",
                  "पौ (चित्रकार) समुदायको गुठीका सदस्यहरूले दृष्टि लेखन भनिने अनुष्ठानमा देवीका आँखा लेख्ने वर्णन गरिएको छ। यसको सही विधि कलाकार र गुठीसँग पुष्टि गर्नुपर्छ, र यो अनुष्ठान फोटो खिच्न खुला छ भनी मान्नु हुँदैन।",
                )}
              </p>

              <h4 className="font-display pt-1 text-base font-bold text-brick">{tr("Building and care", "भवन र संरक्षण")}</h4>
              <p className="text-sm leading-relaxed text-wood/90">
                {tr(
                  "The shrine is described as a brick building with a tiered red roof, with exposed terracotta brickwork and carved timber roof struts. Guthi, the traditional community trusts, keep up its rituals, community duties and festival continuity.",
                  "मन्दिरलाई तहतहको रातो छाना भएको इँटाको भवनका रूपमा वर्णन गरिएको छ, जसमा देखिने टेराकोटा इँटा र कुँदिएका काठका टुँडाल छन्। गुठी (परम्परागत सामुदायिक ट्रस्ट) ले यसका अनुष्ठान, सामुदायिक दायित्व र पर्वको निरन्तरता जोगाउँछ।",
                )}
              </p>

              <dl className="grid gap-2 pt-2 sm:grid-cols-2">
                {facts.map(([k, v]) => (
                  <div key={k} className="rounded-2xl border border-wood/15 bg-cream/75 p-3 text-xs">
                    <dt className="font-semibold uppercase tracking-wider text-vermilion">{k}</dt>
                    <dd className="mt-0.5 leading-relaxed text-wood/80">{v}</dd>
                  </div>
                ))}
              </dl>

              <p className="border-t border-wood/10 pt-3 text-[11px] leading-relaxed text-wood/60">
                {tr(
                  "Most of this comes from a local news article plus general academic context on Ajima goddesses. Some details are oral tradition and still need confirming with the Guthi. See the Sources page.",
                  "यसका धेरै कुरा स्थानीय समाचार र अजिमा देवीबारेको सामान्य शैक्षिक सन्दर्भबाट आएका हुन्। केही विवरण मौखिक परम्परा हुन् र गुठीसँग पुष्टि गर्न बाँकी छ। स्रोत पृष्ठ हेर्नुहोस्।",
                )}
              </p>
            </article>
          </Reveal>
        </div>

        {/* Right: a small photo, and the way into the album */}
        <div className="lg:sticky lg:top-24 lg:col-span-5">
          <Reveal delay={0.1}>
            <figure className="mx-auto w-full max-w-sm lg:max-w-none">
              <div className="wood-frame relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-wood shadow-md">
                <Image
                  src="/media/shrine.jpg"
                  alt={tr("The Pyatho Ajima shrine in Balaju, Ward 16", "बालाजु, वडा नं. १६ को प्याठो अजिमा मन्दिर")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 420px"
                />
              </div>
              <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <Link
                  href="/gallery/ajima"
                  className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-teal underline-offset-4 hover:underline"
                >
                  {tr("Explore more photos", "थप तस्बिरहरू हेर्नुहोस्")}
                  <span aria-hidden>→</span>
                </Link>
                <span className="text-xs text-wood/55">{tr("Pyatho Ajima album", "प्याठो अजिमा एल्बम")}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
