"use client";

/**
 * components/heritage/AjimaDescription.tsx
 *
 * The description card for /ajima, laid out like the Ward 16 card on /dhara:
 * a single encyclopedia-style card with a small photo inside it (floated to the right)
 * and a link underneath the photo that opens the Ajima album in the gallery.
 *
 * Every statement comes from the project's own sourced notes (lib/content.ts and
 * lib/heritageDetailData.ts). Beliefs and oral traditions are worded as such.
 */

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal } from "@/components/ui";
import NarrateButton from "@/components/ui/NarrateButton";

export default function AjimaDescription() {
  const { isNepali } = useLanguage();
  const tr = (en: string, ne: string) => (isNepali ? ne : en);

  // The description, written once. It is shown below and also read aloud by the listen button.
  const intro = tr(
    "Pyatho Ajima is a Newar shrine to a protective mother goddess in Balaju, in Ward 16 of Kathmandu Metropolitan City. Local reporting places it inside the historic Balaju Baisdhara Park complex, beside the Nagarjun forest and close to the 22 Dhara water spouts.",
    "प्याठो अजिमा काठमाडौँ महानगरपालिका वडा नं. १६ को बालाजुमा रहेको रक्षक मातृदेवीको नेवार मन्दिर हो। स्थानीय समाचारअनुसार यो नागार्जुन जङ्गलनजिक, २२ धारा नजिकै ऐतिहासिक बालाजु बैसधारा पार्क परिसरभित्र पर्छ।",
  );
  const ajimaHead = tr("The Ajima", "अजिमा");
  const ajimaText = tr(
    "In Newar religion, “Ajima” broadly means a divine, protective mother figure. Ajima or Matrika goddesses are worshipped by different Newar communities, Hindu and Buddhist, and their shrines and forms vary across the Kathmandu Valley.",
    "नेवार धर्ममा “अजिमा” भन्नाले व्यापक रूपमा दिव्य, रक्षक मातृशक्तिलाई बुझाउँछ। हिन्दु र बौद्ध दुवै नेवार समुदायले अजिमा वा मातृका देवीको पूजा गर्छन्, र काठमाडौँ उपत्यकाभरि तिनका मन्दिर र स्वरूप फरक-फरक हुन्छन्।",
  );
  const worshipHead = tr("Worship and tradition", "पूजा र परम्परा");
  const worship1 = tr(
    "Local reporting associates the goddess with protection from illness, epidemics and threats to children’s wellbeing. This is a religious belief, not a proven way to prevent or treat disease. During the annual Baisdhara / Lhuti Punhi observance, devotees are reported to bathe at the 22 Dhara spouts and then worship at the shrine.",
    "स्थानीय समाचारले देवीलाई रोग, महामारी र बालबालिकाको कल्याणमाथिको खतराबाट रक्षासँग जोडेको छ। यो धार्मिक विश्वास हो; रोग रोक्ने वा निको पार्ने प्रमाणित उपाय होइन। वार्षिक बैसधारा / ल्हुति पुन्हिको समयमा भक्तजनहरू २२ धाराका धारामा स्नान गरेर मन्दिरमा पूजा गर्ने उल्लेख छ।",
  );
  const worship2 = tr(
    "Members of the Pũ (Chitrakar) community’s Guthi are described as painting the eyes of the goddess in a ritual called Dristi Lekhan. The exact procedure should be confirmed with the artists and the Guthi, and the ritual should not be assumed to be open to photography.",
    "पौ (चित्रकार) समुदायको गुठीका सदस्यहरूले दृष्टि लेखन भनिने अनुष्ठानमा देवीका आँखा लेख्ने वर्णन गरिएको छ। यसको सही विधि कलाकार र गुठीसँग पुष्टि गर्नुपर्छ, र यो अनुष्ठान फोटो खिच्न खुला छ भनी मान्नु हुँदैन।",
  );
  // Headings end with a full stop so the voice pauses after them.
  const stop = isNepali ? "।" : ".";
  const narration = [tr("Pyatho Ajima.", "प्याठो अजिमा।"), intro, ajimaHead + stop, ajimaText, worshipHead + stop, worship1, worship2].join(" ");

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

      <div className="mx-auto max-w-5xl">
        {/* The article, with the photo inside it */}
        <div>
          <Reveal>
            <article className="wood-frame flow-root space-y-4 rounded-3xl bg-paper p-6 text-wood shadow-sm sm:p-8">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 border-b border-wood/15 pb-3">
                <span className="font-display text-xl text-marigold">◈</span>
                <h3 className="font-display text-2xl font-bold text-brick">Pyatho Ajima</h3>
                <span className="font-deva text-lg text-wood/70">प्याठो अजिमा</span>
                <NarrateButton text={narration} className="ml-auto self-center" />
              </div>
              <p className="-mt-1 text-xs italic text-wood/60">
                {tr(
                  "Also written Pyah Thwam Ajima; locally called Shitala Mai.",
                  "प्याः थ्वँ अजिमा पनि लेखिन्छ; स्थानीय रूपमा शीतला माई भनिन्छ।",
                )}
              </p>

              <figure className="mx-auto w-full max-w-xs sm:float-right sm:mb-3 sm:ml-6 sm:mt-1 sm:w-64 lg:w-72">
                <div className="wood-frame relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-wood shadow-sm">
                  <Image
                    src="/media/shrine1.jpg"
                    alt={tr("The Pyatho Ajima shrine in Balaju, Ward 16", "बालाजु, वडा नं. १६ को प्याठो अजिमा मन्दिर")}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 288px"
                  />
                </div>
                <figcaption className="mt-2 text-center">
                  <Link
                    href="/gallery/ajima"
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

              <h4 className="font-display pt-1 text-base font-bold text-brick">{ajimaHead}</h4>
              <p className="text-justify text-sm leading-relaxed text-wood/90 hyphens-auto">
                {ajimaText}
              </p>

              <h4 className="font-display pt-1 text-base font-bold text-brick">{worshipHead}</h4>
              <p className="text-justify text-sm leading-relaxed text-wood/90 hyphens-auto">
                {worship1}
              </p>
              <p className="text-justify text-sm leading-relaxed text-wood/90 hyphens-auto">
                {worship2}
              </p>



            </article>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
