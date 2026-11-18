"use client";

import Link from "next/link";
import AdminNav from "@/components/layout/AdminNav";
import PageLayout from "@/components/ui/PageLayout";
import { useUser } from "@/lib/useUser";
import { useLanguage } from "@/i18n/LanguageContext";

/** Everything under /admin: only admins get in, and it wears its own dark chrome. */
export default function AdminShell({ children }: { children: React.ReactNode }) {
  const user = useUser();
  const { t } = useLanguage();

  if (user === undefined) return <div className="min-h-[60vh]" aria-hidden />;
  if (!user || user.role !== "admin") {
    return (
      <section className="mx-auto max-w-md px-5 pb-16 pt-24 text-center">
        <div className="rounded-3xl bg-paper p-6">
          <p className="font-display text-2xl text-brick">{t("components.admin.shell.adminsOnly", "Admins only")}</p>
          <p className="mt-1 text-wood/75">
            {t("components.admin.shell.prompt", "Sign in with the admin account to open the dashboard.")}
          </p>
          <Link href="/login" className="mt-4 inline-flex min-h-[52px] items-center rounded-full bg-brick px-7 font-semibold text-cream">
            {t("components.admin.shell.signIn", "Sign in")}
          </Link>
        </div>
      </section>
    );
  }
  return (
    <div className="min-h-[70vh] bg-paper/60">
      <AdminNav />
      <PageLayout variant="default">{children}</PageLayout>
    </div>
  );
}
