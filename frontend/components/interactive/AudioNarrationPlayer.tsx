"use client";

import { useState, useEffect } from "react";
import { AudioData } from "@/lib/heritageDetailData";
import { useLanguage } from "@/i18n/LanguageContext";

interface AudioNarrationPlayerProps {
  audioData: AudioData;
}

export default function AudioNarrationPlayer({ audioData }: AudioNarrationPlayerProps) {
  const { isNepali } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [showTranscript, setShowTranscript] = useState(true);

  const { title, subtitle, durationSeconds, speaker, transcript, chapters } = audioData;

  // Audio timer simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= durationSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1 * playbackSpeed;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, durationSeconds, playbackSpeed]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progressPercent = Math.min(100, (currentTime / durationSeconds) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="font-deva text-xs font-semibold uppercase tracking-wider text-marigold">
          {isNepali ? "मौखिक सांस्कृतिक वृत्तान्त" : "Spoken Cultural Audio Tour"}
        </p>
        <h3 className="font-display text-2xl font-bold text-brick sm:text-3xl">
          {isNepali ? title.ne : title.en}
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-wood/80">
          {isNepali ? subtitle.ne : subtitle.en}
        </p>
      </div>

      {/* Main Player Box */}
      <div className="wood-frame relative overflow-hidden rounded-3xl bg-gradient-to-br from-wood via-brick-deep to-brick p-6 text-cream shadow-xl sm:p-8">
        <div className="lattice absolute inset-0 opacity-[0.08]" aria-hidden />

        <div className="relative z-10 space-y-6">
          {/* Top Bar: Speaker & Duration */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cream/15 pb-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-marigold text-wood font-display text-lg shadow-sm">
                🎙
              </span>
              <div>
                <p className="text-xs uppercase tracking-wider text-cream/70 font-mono">
                  {isNepali ? "वाचक / प्रस्तोता" : "Narrator / Custodian"}
                </p>
                <p className="font-semibold text-cream text-sm">
                  {isNepali ? speaker.ne : speaker.en}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full border border-marigold/40 bg-cream/10 px-3 py-1 font-mono text-xs text-cream">
                {formatTime(currentTime)} / {formatTime(durationSeconds)}
              </span>
              <button
                type="button"
                onClick={() => setPlaybackSpeed((s) => (s === 1 ? 1.25 : s === 1.25 ? 1.5 : 1))}
                className="rounded-full border border-cream/20 bg-cream/10 px-2.5 py-1 text-xs font-mono font-semibold text-cream hover:bg-cream/20"
                title="Change playback speed"
              >
                {playbackSpeed}x
              </button>
            </div>
          </div>

          {/* Audio Wave Visualizer Simulation */}
          <div className="flex h-12 items-center justify-center gap-1.5 px-2">
            {[40, 65, 30, 85, 95, 55, 75, 45, 90, 60, 35, 80, 100, 70, 50, 85, 60, 40, 75, 90, 45].map(
              (h, i) => (
                <div
                  key={i}
                  style={{
                    height: isPlaying ? `${Math.max(15, (h * (0.6 + (((i * 37 + Math.floor(currentTime) * 53) % 40) / 100))))}%` : "20%",
                    transition: "height 0.25s ease",
                  }}
                  className={`w-1 rounded-full ${
                    i / 21 <= progressPercent / 100 ? "bg-marigold" : "bg-cream/25"
                  }`}
                />
              )
            )}
          </div>

          {/* Progress Scrubber */}
          <div className="space-y-1">
            <input
              type="range"
              min={0}
              max={durationSeconds}
              value={currentTime}
              onChange={(e) => setCurrentTime(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-cream/20 accent-marigold"
              aria-label="Audio scrubber"
            />
          </div>

          {/* Controls: Rewind, Play/Pause, Fast-forward, Toggle Transcript */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-3">
              {/* Back 10s */}
              <button
                type="button"
                onClick={() => setCurrentTime((t) => Math.max(0, t - 10))}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream transition hover:bg-cream/15 active:scale-95"
                title="Rewind 10s"
              >
                ↺10
              </button>

              {/* Play / Pause Primary Button */}
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-marigold text-wood font-bold shadow-lg transition-transform hover:scale-105 active:scale-95"
                aria-label={isPlaying ? "Pause audio narration" : "Play audio narration"}
              >
                {isPlaying ? (
                  <span className="text-xl">⏸</span>
                ) : (
                  <span className="ml-0.5 text-2xl">▶</span>
                )}
              </button>

              {/* Forward 10s */}
              <button
                type="button"
                onClick={() => setCurrentTime((t) => Math.min(durationSeconds, t + 10))}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream transition hover:bg-cream/15 active:scale-95"
                title="Forward 10s"
              >
                10↻
              </button>
            </div>

            {/* Chapters Pill Dropdown or Jump */}
            <div className="flex flex-wrap items-center gap-2">
              {chapters.map((ch) => (
                <button
                  key={ch.time}
                  type="button"
                  onClick={() => {
                    setCurrentTime(ch.time);
                    setIsPlaying(true);
                  }}
                  className={`rounded-full px-3 py-1 text-xs transition ${
                    currentTime >= ch.time &&
                    (chapters[chapters.indexOf(ch) + 1] === undefined ||
                      currentTime < chapters[chapters.indexOf(ch) + 1].time)
                      ? "border border-marigold bg-marigold text-wood font-semibold"
                      : "border border-cream/20 bg-cream/10 text-cream/80 hover:bg-cream/20"
                  }`}
                >
                  {ch.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transcript Accordion */}
      <div className="rounded-2xl border border-marigold/40 bg-paper p-5 sm:p-6">
        <button
          type="button"
          onClick={() => setShowTranscript(!showTranscript)}
          className="flex w-full items-center justify-between text-left font-display text-lg font-semibold text-brick"
          aria-expanded={showTranscript}
        >
          <span className="flex items-center gap-2">
            <span>📜</span>
            <span>{isNepali ? "पूर्ण मौखिक पाठ (ट्रान्सक्रिप्ट)" : "Audio Transcript & Narrative Text"}</span>
          </span>
          <span className="text-sm font-sans text-marigold-deep text-vermilion">
            {showTranscript ? (isNepali ? "लुकाउनुहोस् ▲" : "Hide ▲") : (isNepali ? "पढ्नुहोस् ▼" : "Read ▼")}
          </span>
        </button>

        {showTranscript && (
          <div className="mt-4 border-t border-wood/10 pt-4">
            <div className="space-y-4 font-body text-sm leading-relaxed text-wood/90 whitespace-pre-line">
              {isNepali ? transcript.ne : transcript.en}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
