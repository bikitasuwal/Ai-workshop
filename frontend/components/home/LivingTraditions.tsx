"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal, SectionTitle } from "@/components/ui";
import { useLanguage } from "@/i18n/LanguageContext";

const TILES = [
  { key: "water", href: "/dhara", photo: "/media/spouts.jpg", pos: "20% 75%" },
  { key: "worship", href: "/ajima", photo: "/media/shrine.jpg", pos: "45% 40%" },
  { key: "art", href: "/ajima", photo: "/media/spouts-walk-poster.jpg", pos: "70% 30%" },
  { key: "community", href: "/stories", photo: null, pos: "50% 50%" },
] as const;

/** Home section 4: four tall tiles for the living side of the heritage. */
export default function LivingTraditions() {
  const { t, dict, isNepali } = useLanguage();
  const num = (i: number) => (isNepali ? ["०१", "०२", "०३", "०४"][i] : `0${i + 1}`);

  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionTitle titleKey="homeTraditions" />
          <p className="mx-auto mt-5 max-w-xl text-center text-wood/75">{t("home.traditions.sub")}</p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TILES.map((tile, i) => {
            const p = dict.home.pillars[tile.key];
            return (
              <Reveal key={tile.key} delay={i * 0.07}>
                <Link
                  href={tile.href}
                  className="group relative block aspect-[3/4] overflow-hidden bg-wood text-cream focus-visible:outline-marigold"
                >
                  {tile.photo ? (
                    <Image
                      src={tile.photo}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ objectPosition: tile.pos }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-brick to-brick-deep">
                      <div className="lattice absolute inset-0 opacity-20" aria-hidden />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-wood/90 via-wood/45 to-wood/10 transition-colors duration-500 group-hover:from-brick-deep/90" aria-hidden />
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <p className="text-[11px] font-semibold tracking-[0.25em] text-marigold">{num(i)}</p>
                    <h3 className="font-display mt-1 text-3xl leading-tight">{isNepali ? p.ne : p.en}</h3>
                    <p className="font-deva mt-0.5 text-sm text-cream/70">{isNepali ? p.en : p.ne}</p>
                    <p className="mt-3 text-sm leading-relaxed text-cream/85">{p.text}</p>
                    <span className="mt-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-marigold">
                      <span className="h-px w-8 bg-marigold transition-all duration-500 group-hover:w-14" aria-hidden />
                      {t("home.traditions.open")}
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
