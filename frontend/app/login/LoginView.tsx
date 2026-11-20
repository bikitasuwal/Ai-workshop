"use client";

/**
 * app/login/LoginView.tsx — client body of /login.
 * The server wrapper (page.tsx) owns the `metadata` export.
 */

import AuthForm from "@/components/AuthForm";
import { Reveal, SectionTitle } from "@/components/ui";
import { useLanguage } from "@/i18n/LanguageContext";

export default function LoginView() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-md px-5 pb-12 pt-24">
      <Reveal>
        <SectionTitle titleKey="signIn" />
        <p className="mx-auto mt-3 text-center text-wood/80">{t("pages.login.intro")}</p>
      </Reveal>
      <Reveal className="mt-8" delay={0.1}>
        <AuthForm />
      </Reveal>
    </section>
  );
}
