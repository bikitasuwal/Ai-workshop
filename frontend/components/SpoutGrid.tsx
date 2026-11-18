"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Stamp } from "./ui";
import { useLanguage } from "@/i18n/LanguageContext";

/** 22 tappable spouts. The sources do not say WHICH spout was added later, so we never single one out. */
export default function SpoutGrid() {
  const { t } = useLanguage();
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="wood-frame rounded-3xl bg-teal-deep p-5 text-cream">
      <p className="text-center text-sm text-cream/75">{t("components.spouts.touch", "Touch a spout")}</p>
      <div className="mx-auto mt-4 grid max-w-sm grid-cols-11 gap-x-1.5 gap-y-5">
        {Array.from({ length: 22 }, (_, i) => {
          const on = active === i;
          return (
            <button
              key={i}
              onClick={() => setActive(on ? null : i)}
              aria-label={`${t("components.spouts.ariaLabel", "Spout")} ${i + 1}`}
              aria-pressed={on}
              className="group relative flex h-16 flex-col items-center"
            >
              <span className={`h-3.5 w-3 rounded-sm transition ${on ? "bg-marigold" : "bg-[#d9b779]"}`} />
              <svg viewBox="0 0 6 40" className="h-11 w-1.5" aria-hidden>
                <path
                  d="M3 0V40"
                  stroke={on ? "#fff2b8" : "#bfe6ef"}
                  strokeWidth={on ? 4 : 2.5}
                  strokeLinecap="round"
                  className="stream"
                  style={{ animationDelay: `${(i % 6) * 0.2}s` }}
                />
              </svg>
              <span className="absolute -inset-1" aria-hidden /> {/* bigger tap area */}
            </button>
          );
        })}
      </div>
      <div className="mt-2 h-px bg-gradient-to-r from-transparent via-cyan-200/50 to-transparent" />

      <div className="mt-4 min-h-[148px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active ?? "none"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl bg-cream p-4 text-wood"
          >
            {active === null ? (
              <p className="text-[15px]">{t("components.spouts.idle")}</p>
            ) : (
              <div className="space-y-2">
                <Stamp type="reported" />
                <p className="text-[15px]">
                  {t("components.spouts.report.s1")} <strong>{t("components.spouts.report.n1")}</strong>{" "}
                  {t("components.spouts.report.s2")} <strong>{t("components.spouts.report.n2")}</strong>{" "}
                  {t("components.spouts.report.s3")}
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
