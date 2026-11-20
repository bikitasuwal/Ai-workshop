"use client";

import Image from "next/image";
import { useLanguage } from "@/i18n/LanguageContext";
import { Reveal } from "@/components/ui";

interface Ward16DescriptionProps {
  variant?: "home" | "dhara";
}

export default function Ward16Description({ variant = "home" }: Ward16DescriptionProps) {
  const { isNepali } = useLanguage();

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

  return (
    <section className="space-y-8">
      {/* Header */}
      <Reveal className="text-center space-y-2">
        <h2 className="font-display text-3xl font-bold text-brick sm:text-4xl">
          {variant === "dhara"
            ? isNepali
              ? "काठमाडौँ वडा नं. १६ को भूगोल र सम्पदामा २२ धारा"
              : "22 Dhara in the Geography & Heritage of Ward 16"
            : isNepali
            ? "इतिहास, आस्था र स्थानीय जीवनको संगम · वडा १६"
            : "A Tapestry of History, Faith and Neighbourhood Life"}
        </h2>
        <p className="mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-wood/80">
          {isNepali
            ? "काठमाडौँ महानगरपालिका वडा नं. १६ एउटा यस्तो गतिशील सहरी क्षेत्र हो जहाँ ऐतिहासिक तीर्थस्थल, परम्परागत जलप्रणाली र पुस्तौँदेखिको नेवार सांस्कृतिक सम्पदा आधुनिक जीवनसँगै एकाकार भएका छन्।"
            : "Kathmandu Metropolitan City Ward No. 16 is a dynamic urban landscape where historic shrines, traditional waterworks, and generations of Newar cultural heritage intersect with contemporary city life."}
        </p>
      </Reveal>

      {/* Main Two-Column Layout */}
      <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
        {/* Left Column: Descriptive Story & Neighborhoods (7 cols) */}
        <div className="space-y-6 lg:col-span-7">
          <Reveal>
            <div className="wood-frame rounded-3xl bg-paper p-6 sm:p-8 text-wood shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-wood/15 pb-3">
                <span className="font-display text-xl text-marigold">◈</span>
                <h3 className="font-display text-xl font-bold text-brick">
                  {isNepali ? "नागार्जुनको फेदीदेखि सहरी चोकसम्म" : "From Nagarjun Foothills to Urban Courtyards"}
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-wood/85">
                {isNepali
                  ? "नागार्जुन पर्वतको हरियाली फेदीदेखि बालाजु र सोह्रखुट्टेका आवासीय चोकसम्म फैलिएको यो वडाले शताब्दीयौँदेखि स्थानीय समुदायलाई एकताको सूत्रमा बाँध्ने पवित्र सम्पदाहरूको संरक्षण गर्दै आएको छ। यहाँका ढुङ्गेधारा, मन्दिर र पाटीहरू केवल ढुङ्गा र काठका संरचना मात्र होइनन्, स्थानीय नेवार समुदायको दैनिक जीवन र चाडपर्वका अभिन्न अङ्ग हुन्।"
                  : "From the forested slopes of Nagarjun to the bustling residential courtyards of Balaju and Sorhakhutte, the ward preserves sacred landmarks that have anchored community rituals for centuries. The stone spouts, shrines, and rest houses are not mere static monuments, but living spaces of daily ablution, evening hymns, and festive solidarity."}
              </p>

              {variant === "dhara" && (
                <div className="rounded-2xl border border-teal/30 bg-teal/10 p-4 text-xs leading-relaxed text-teal-deep">
                  <strong>{isNepali ? "२२ धाराको वडा सन्दर्भ:" : "22 Dhara in Ward 16:"}</strong>{" "}
                  {isNepali
                    ? "२२ धारा यस वडाको सबैभन्दा ठूलो जल सम्पदा हो। वडा नं. १६ ले नागार्जुन डाँडाको जलाधार संरक्षण, मूल सफाइ र प्रत्येक वर्ष लाग्ने बाइसधारा मेला (ल्हुति पुन्हि) को सम्पूर्ण व्यवस्थापन तथा सुरक्षामा स्थानीय गुठी र समुदायसँग हातेमालो गर्दै आएको छ।"
                    : "22 Dhara serves as the hydrological anchor of Ward 16. The ward administration and civic youth committees actively protect the uphill aquifer recharge zone on Nagarjun and co-manage the annual Baisdhara Mela with traditional Guthi caretakers."}
                </div>
              )}

              {/* Four Neighborhood Enclaves */}
              <div className="pt-2">
                <p className="font-deva text-xs font-bold uppercase tracking-wider text-vermilion mb-3">
                  {isNepali ? "वडा १६ का प्रमुख सम्पदा बस्तीहरू:" : "Key Heritage Quarters of Ward 16:"}
                </p>
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
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Hero Heritage Photo & Stats (5 cols) */}
        <div className="space-y-6 lg:col-span-5">
          <Reveal delay={0.1}>
            <div className="space-y-4">
              <div className="wood-frame relative aspect-[4/3] sm:aspect-[4/3] w-full overflow-hidden rounded-3xl bg-wood shadow-md">
                <Image
                  src="/images/heritage/ward-intro.jpg"
                  alt={isNepali ? "काठमाडौँ महानगरपालिका वडा नं. १६ को सम्पदा" : "Ward 16 Living Heritage Streetscape"}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 450px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-wood/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-cream/90 font-mono">
                  <span>📍 Ward No. 16, Kathmandu</span>
                  <span className="rounded-full bg-brick/80 px-2.5 py-0.5 text-[10px]">
                    Nepal Mandala
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
