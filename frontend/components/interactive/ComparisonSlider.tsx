"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { ComparisonData } from "@/lib/heritageDetailData";
import { useLanguage } from "@/i18n/LanguageContext";

interface ComparisonSliderProps {
  comparisonData: ComparisonData;
  /** Show the "Historical Context Notes" box under the slider. */
  showNotes?: boolean;
}

export default function ComparisonSlider({ comparisonData, showNotes = true }: ComparisonSliderProps) {
  const { isNepali } = useLanguage();
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { title, subtitle, before, after, historicalNotes } = comparisonData;

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updatePosition(e.clientX);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    } else if (e.key === "Home") {
      setSliderPosition(0);
    } else if (e.key === "End") {
      setSliderPosition(100);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="font-display text-2xl font-bold text-brick sm:text-3xl">
          {isNepali ? title.ne : title.en}
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-wood/80">
          {isNepali ? subtitle.ne : subtitle.en}
        </p>
      </div>

      {/* Main Interactive Split Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => setIsDragging(false)}
        className="wood-frame relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-3xl bg-wood shadow-xl"
        tabIndex={0}
        role="slider"
        aria-label="Image comparison slider"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={handleKeyDown}
      >
        {/* Layer 1: "After" / Present Day image (underneath, full width) */}
        <div className="absolute inset-0">
          <Image
            src={after.src}
            alt={isNepali ? after.caption.ne : after.caption.en}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 900px"
            priority
          />
          {/* Badge: After */}
          <div className="absolute bottom-4 right-4 z-10 rounded-full border border-marigold/60 bg-wood/85 px-3.5 py-1 text-xs font-semibold text-cream shadow-md backdrop-blur-xs">
            {after.label} ({after.date})
          </div>
        </div>

        {/* Layer 2: "Before" / Historical image (clipped by slider position) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="relative h-full w-[100cqi] max-w-none sm:w-[890px]">
            <Image
              src={before.src}
              alt={isNepali ? before.caption.ne : before.caption.en}
              fill
              className="object-cover filter sepia-[0.3]"
              sizes="(max-width: 1024px) 100vw, 900px"
              priority
            />
          </div>
          {/* Badge: Before */}
          <div className="absolute bottom-4 left-4 z-10 rounded-full border border-marigold/60 bg-brick/90 px-3.5 py-1 text-xs font-semibold text-cream shadow-md backdrop-blur-xs">
            {before.label} ({before.date})
          </div>
        </div>

        {/* Vertical divider line */}
        <div
          className="pointer-events-none absolute inset-y-0 w-1 bg-marigold shadow-2xl"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Center Handle Button */}
          <div className="absolute top-1/2 -left-5 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-cream bg-wood text-marigold shadow-2xl transition-transform active:scale-95">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
              <path d="M8.5 12l4-4v3h3V8l4 4-4 4v-3h-3v3z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Historical Context Notes */}
      {showNotes && (
      <div className="rounded-2xl border border-marigold/40 bg-paper/90 p-5 text-wood sm:p-6">
        <div className="flex items-start gap-3">
          <span className="text-xl text-marigold font-display">◈</span>
          <div className="space-y-1.5 text-sm">
            <p className="font-display font-semibold text-brick">
              {isNepali ? "ऐतिहासिक निरन्तरता तथा संरक्षण टिपोट" : "Conservation & Hydrological Continuity"}
            </p>
            <p className="leading-relaxed text-wood/85">
              {isNepali ? historicalNotes.ne : historicalNotes.en}
            </p>
            <div className="flex flex-wrap gap-4 pt-1 text-xs text-wood/60 font-mono">
              <span>{isNepali ? "विगत अभिलेख:" : "Archive:"} {before.source}</span>
              <span>•</span>
              <span>{isNepali ? "वर्तमान अध्ययन:" : "Present Documentation:"} {after.source}</span>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
