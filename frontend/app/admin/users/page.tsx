"use client";

import { SectionTitle } from "@/components/ui";
import AdminUsers from "@/components/AdminUsers";
import { useLanguage } from "@/i18n/LanguageContext";

export default function Page() {
  const { t } = useLanguage();

  return (
    <>
      <SectionTitle titleKey="adminMembers" />
      <p className="mx-auto mb-8 mt-3 max-w-md text-center text-wood/80">
        {t(
          "components.admin.users.intro",
          "Everyone who has an account. Suspend someone who keeps posting content that breaks the rules.",
        )}
      </p>
      <AdminUsers />
    </>
  );
}
