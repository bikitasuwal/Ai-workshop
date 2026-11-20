"use client";

import { useState, useMemo } from "react";
import {
  CALENDAR_MONTHS,
  MonthCalendar,
  CalendarDay,
  FestivalEvent,
  TODAY_BS,
} from "@/lib/festivalCalendarData";
import { useLanguage } from "@/i18n/LanguageContext";

const NE_DIGITS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
export const toNepaliNum = (num: number): string =>
  String(num)
    .split("")
    .map((d) => NE_DIGITS[Number(d)] ?? d)
    .join("");

const WEEKDAYS = [
  { en: "Sun", ne: "आइत", fullNe: "आइतबार" },
  { en: "Mon", ne: "सोम", fullNe: "सोमबार" },
  { en: "Tue", ne: "मङ्गल", fullNe: "मङ्गलबार" },
  { en: "Wed", ne: "बुध", fullNe: "बुधबार" },
  { en: "Thu", ne: "बिही", fullNe: "बिहीबार" },
  { en: "Fri", ne: "शुक्र", fullNe: "शुक्रबार" },
  { en: "Sat", ne: "शनि", fullNe: "शनिबार", isHoliday: true },
];

export default function HamroPatroCalendar({
  onSelectFestival,
}: {
  onSelectFestival?: (fest: FestivalEvent) => void;
}) {
  const { isNepali } = useLanguage();

  // Find index of month that contains Today (Mangsir 2081)
  const todayMonthIndex = useMemo(() => {
    const idx = CALENDAR_MONTHS.findIndex((m) => m.days.some((d) => d.isToday));
    return idx >= 0 ? idx : 0;
  }, []);

  const [currentMonthIndex, setCurrentMonthIndex] = useState(todayMonthIndex);
  const monthData: MonthCalendar = CALENDAR_MONTHS[currentMonthIndex] ?? CALENDAR_MONTHS[0];

  // Default selected day: Today's date (Mangsir 5)
  const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(() => {
    const currentMonth = CALENDAR_MONTHS[todayMonthIndex] ?? CALENDAR_MONTHS[0];
    return currentMonth.days.find((d) => d.isToday) ?? currentMonth.days[0] ?? null;
  });

  const handlePrev = () => {
    if (currentMonthIndex > 0) {
      const newIdx = currentMonthIndex - 1;
      setCurrentMonthIndex(newIdx);
      const newMonth = CALENDAR_MONTHS[newIdx];
      setSelectedDay(newMonth.days.find((d) => d.isToday) ?? newMonth.days.find((d) => d.festival) ?? newMonth.days[0]);
    }
  };

  const handleNext = () => {
    if (currentMonthIndex < CALENDAR_MONTHS.length - 1) {
      const newIdx = currentMonthIndex + 1;
      setCurrentMonthIndex(newIdx);
      const newMonth = CALENDAR_MONTHS[newIdx];
      setSelectedDay(newMonth.days.find((d) => d.isToday) ?? newMonth.days.find((d) => d.festival) ?? newMonth.days[0]);
    }
  };

  const handleToday = () => {
    setCurrentMonthIndex(todayMonthIndex);
    const m = CALENDAR_MONTHS[todayMonthIndex];
    setSelectedDay(m.days.find((d) => d.isToday) ?? m.days[0]);
  };

  const emptyCells = Array.from({ length: monthData.startingWeekday });

  return (
    <div className="overflow-hidden rounded-3xl border border-marigold/30 bg-paper/90 shadow-xl backdrop-blur-sm">
      {/* Calendar Top Header: Hamro Patro Style Red/Marigold Theme */}
      <div className="relative bg-gradient-to-r from-brick-deep via-brick to-wood p-5 sm:p-6 text-cream">
        <div className="lattice absolute inset-0 opacity-10" aria-hidden />

        {/* Live Today Bar */}
        <div className="relative mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-cream/15 pb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-marigold animate-pulse" />
            <span className="font-deva font-semibold text-marigold">
              {isNepali ? "आजको मिति:" : "Today's Date:"}
            </span>
            <span className="font-deva font-bold text-cream">
              {isNepali
                ? `वि.सं. ${TODAY_BS.yearBs} ${TODAY_BS.monthNameNe} ${toNepaliNum(TODAY_BS.dayBs)} गते (${TODAY_BS.weekdayNe})`
                : `${TODAY_BS.monthNameEn} ${TODAY_BS.dayBs}, ${TODAY_BS.yearBs} BS (${TODAY_BS.weekdayEn})`}
            </span>
            <span className="text-cream/50">•</span>
            <span className="text-cream/80 text-[11px]">
              {TODAY_BS.adFormatted}
            </span>
          </div>

          <button
            type="button"
            onClick={handleToday}
            className="flex items-center gap-1.5 rounded-full bg-marigold px-3.5 py-1 text-xs font-bold text-wood shadow transition hover:bg-cream hover:text-brick active:scale-95"
          >
            <span>📍</span>
            <span>{isNepali ? "आजको मितिमा जानुहोस्" : "Go to Today"}</span>
          </button>
        </div>

        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <p className="font-deva text-xs font-semibold tracking-wider text-marigold uppercase">
                {isNepali ? "हाम्रो पात्रो शैलीको सांस्कृतिक क्यालेन्डर" : "Nepali Bikram Sambat Cultural Patro"}
              </p>
            </div>
            <h3 className="font-display mt-1 text-2xl sm:text-3xl font-bold text-cream tracking-tight flex items-center gap-3">
              <span>{isNepali ? monthData.name.ne : monthData.name.en}</span>
              {monthData.days.some((d) => d.isToday) && (
                <span className="rounded-full bg-vermilion/80 px-2.5 py-0.5 text-xs font-bold font-deva text-cream border border-cream/20">
                  {isNepali ? "चालु महिना" : "Current Month"}
                </span>
              )}
            </h3>
            <p className="mt-0.5 text-xs sm:text-sm text-cream/75">
              {isNepali ? monthData.adRange.ne : monthData.adRange.en}
            </p>
          </div>

          {/* Month Navigation & Dropdown Controls */}
          <div className="flex items-center gap-2">
            {/* Quick Month Select */}
            <select
              value={currentMonthIndex}
              onChange={(e) => {
                const newIdx = Number(e.target.value);
                setCurrentMonthIndex(newIdx);
                const newMonth = CALENDAR_MONTHS[newIdx];
                setSelectedDay(
                  newMonth.days.find((d) => d.isToday) ??
                  newMonth.days.find((d) => d.festival) ??
                  newMonth.days[0]
                );
              }}
              className="rounded-full border border-cream/25 bg-wood/70 px-3 py-1.5 text-xs font-semibold text-cream shadow-sm hover:border-marigold focus:outline-none cursor-pointer"
            >
              {CALENDAR_MONTHS.map((m, idx) => (
                <option key={m.id} value={idx} className="bg-wood text-cream">
                  {isNepali ? m.name.ne : m.name.en}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handlePrev}
              disabled={currentMonthIndex === 0}
              aria-label="Previous Month"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 bg-cream/10 text-cream transition hover:bg-cream/25 disabled:opacity-30 disabled:pointer-events-none active:scale-95"
            >
              ←
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={currentMonthIndex === CALENDAR_MONTHS.length - 1}
              aria-label="Next Month"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 bg-cream/10 text-cream transition hover:bg-cream/25 disabled:opacity-30 disabled:pointer-events-none active:scale-95"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Weekday Column Headers */}
      <div className="grid grid-cols-7 border-b border-wood/10 bg-cream/70 text-center text-xs font-bold text-wood/80 sm:text-sm">
        {WEEKDAYS.map((wd, i) => (
          <div
            key={wd.en}
            className={`py-3 ${wd.isHoliday ? "text-vermilion font-extrabold bg-vermilion/5" : ""} ${
              i === 0 ? "border-l-0" : ""
            }`}
          >
            <span>{isNepali ? wd.ne : wd.en}</span>
            <span className="hidden sm:inline text-[11px] font-normal opacity-70 ml-1">
              ({wd.isHoliday && isNepali ? "बिदा" : wd.en})
            </span>
          </div>
        ))}
      </div>

      {/* Calendar Grid Cells */}
      <div className="grid grid-cols-7 gap-px bg-wood/10 p-1.5 sm:p-2">
        {/* Leading blank days */}
        {emptyCells.map((_, i) => (
          <div key={`empty-${i}`} className="min-h-[72px] sm:min-h-[90px] rounded-xl bg-cream/30 opacity-40" />
        ))}

        {/* Month days */}
        {monthData.days.map((day) => {
          const isSelected = selectedDay?.bsDay === day.bsDay;
          const hasFest = !!day.festival;
          const isToday = !!day.isToday;

          return (
            <button
              key={`day-${day.bsDay}`}
              type="button"
              onClick={() => {
                setSelectedDay(day);
                if (day.festival && onSelectFestival) {
                  onSelectFestival(day.festival);
                }
              }}
              className={`group relative flex min-h-[72px] sm:min-h-[92px] flex-col justify-between rounded-xl p-1.5 sm:p-2 text-left transition-all duration-150 ${
                isSelected
                  ? "bg-marigold text-wood font-bold ring-2 ring-brick shadow-md scale-[1.02] z-10"
                  : isToday
                  ? "bg-amber-100/90 hover:bg-amber-100 ring-2 ring-marigold shadow-md text-wood font-semibold"
                  : day.isSaturday
                  ? "bg-cream/90 hover:bg-cream text-vermilion"
                  : "bg-paper/90 hover:bg-cream text-wood"
              }`}
            >
              {/* Today Pill Badge */}
              {isToday && (
                <span className="absolute -top-1.5 -right-1 rounded-full bg-vermilion px-1.5 py-0.5 text-[8px] font-bold text-cream shadow-sm animate-pulse z-10">
                  {isNepali ? "आज" : "Today"}
                </span>
              )}

              {/* Day numbers top row */}
              <div className="flex items-start justify-between w-full">
                <span
                  className={`font-display text-base sm:text-xl leading-none ${
                    isSelected
                      ? "text-wood font-extrabold"
                      : isToday
                      ? "text-brick font-black"
                      : day.isSaturday
                      ? "text-vermilion font-bold"
                      : "text-brick"
                  }`}
                >
                  {isNepali ? toNepaliNum(day.bsDay) : day.bsDay}
                </span>
                <span className="text-[10px] sm:text-xs font-mono opacity-60 tabular-nums">
                  {day.adDay}
                </span>
              </div>

              {/* Tithi & Festival indicator */}
              <div className="mt-1 space-y-0.5 w-full">
                <p className="truncate text-[9px] sm:text-[11px] leading-tight opacity-75 font-deva">
                  {isNepali ? day.tithi.ne : day.tithi.en}
                </p>

                {hasFest && (
                  <div
                    className={`flex items-center gap-1 rounded-md px-1 py-0.5 text-[8px] sm:text-[10px] font-bold truncate ${
                      isSelected
                        ? "bg-brick text-cream"
                        : "bg-brick/15 text-brick border border-brick/30"
                    }`}
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-vermilion animate-ping" />
                    <span className="truncate">{isNepali ? day.festival?.name.ne : day.festival?.name.en}</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Day Details Panel */}
      {selectedDay && (
        <div className="border-t border-wood/15 bg-cream/90 p-4 sm:p-6 transition-all">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-brick px-2.5 py-0.5 text-xs font-semibold text-cream">
                  {isNepali
                    ? `${monthData.name.ne} ${toNepaliNum(selectedDay.bsDay)} गते`
                    : `${monthData.name.en} Day ${selectedDay.bsDay}`}
                </span>
                {selectedDay.isToday && (
                  <span className="rounded-full bg-vermilion px-2.5 py-0.5 text-xs font-bold text-cream flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-cream animate-pulse" />
                    {isNepali ? "आजको दिन" : "Today"}
                  </span>
                )}
                {selectedDay.isSaturday && (
                  <span className="rounded-full bg-vermilion/15 px-2 py-0.5 text-xs font-semibold text-vermilion">
                    {isNepali ? "शनिबार (सार्वजनिक बिदा)" : "Saturday (Holiday)"}
                  </span>
                )}
                <span className="text-xs font-medium text-wood/75 font-deva">
                  {isNepali ? `तिथि: ${selectedDay.tithi.ne}` : `Tithi: ${selectedDay.tithi.en}`}
                </span>
              </div>

              {selectedDay.festival ? (
                <div className="mt-2 space-y-1">
                  <h4 className="font-display text-xl font-bold text-brick sm:text-2xl">
                    {isNepali ? selectedDay.festival.name.ne : selectedDay.festival.name.en}
                  </h4>
                  <p className="text-sm font-semibold text-teal flex items-center gap-1.5">
                    <span>📍</span>
                    <span>{isNepali ? selectedDay.festival.placeName.ne : selectedDay.festival.placeName.en}</span>
                  </p>
                  <p className="text-sm text-wood/85 max-w-2xl mt-1">
                    {isNepali ? selectedDay.festival.description.ne : selectedDay.festival.description.en}
                  </p>
                </div>
              ) : (
                <div className="mt-1">
                  <p className="text-sm text-wood/75">
                    {selectedDay.isToday
                      ? isNepali
                        ? `आज वि.सं. ${TODAY_BS.yearBs} ${TODAY_BS.monthNameNe} ${toNepaliNum(TODAY_BS.dayBs)} गते (${TODAY_BS.weekdayNe}) हो। नजिकिँदै गरेको प्रमुख चाड बाला चतुर्दशी (मंसिर १४) हो।`
                        : `Today is ${TODAY_BS.monthNameEn} ${TODAY_BS.dayBs}, ${TODAY_BS.yearBs} BS (${TODAY_BS.weekdayEn}). The nearest upcoming festival is Bala Chaturdashi on Mangsir 14.`
                      : isNepali
                      ? "यस दिन कुनै ठूलो स्थानीय जात्रा वा मेला तोकिएको छैन। दैनिक नित्यपूजा यथावत रहनेछ।"
                      : "No major festival fair falls on this specific date. Regular daily morning and evening rites continue."}
                  </p>
                </div>
              )}
            </div>

            {selectedDay.festival && selectedDay.festival.link && (
              <a
                href={selectedDay.festival.link}
                className="inline-flex items-center gap-1.5 rounded-full bg-brick px-4 py-2 text-xs font-semibold text-cream shadow-sm hover:bg-brick-deep transition active:scale-95"
              >
                <span>{isNepali ? "स्थान विवरण हेर्नुहोस्" : "Explore Location"}</span>
                <span>→</span>
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
