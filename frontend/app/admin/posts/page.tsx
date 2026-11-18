"use client";

import { SectionTitle } from "@/components/ui";
import AdminQueue from "@/components/AdminQueue";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Page() {
  const { t } = useLanguage();

  return (
    <>
      <SectionTitle titleKey="adminPosts" />
      <p className="mx-auto mb-8 mt-3 max-w-md text-center text-wood/80">
        {t(
          "components.admin.queue.intro",
          "You approve or reject what visitors send. Nothing appears on the website until you approve it.",
        )}
      </p>
      <AdminQueue />
    </>
  );
}
