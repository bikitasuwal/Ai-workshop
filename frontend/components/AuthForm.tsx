"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { announceAuthChange } from "@/lib/useUser";
import { useLanguage } from "@/i18n/LanguageContext";

/** Admin sign-in. Visitors do not need an account, so there is no sign-up. */
export default function AuthForm() {
  const router = useRouter();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const d = await r.json();
      if (!r.ok) {
        setError(d.error ?? t("components.auth.errorFallback", "Something went wrong. Please try again."));
        return;
      }
      announceAuthChange();
      router.push(d.user?.role === "admin" ? "/admin" : "/");
      router.refresh();
    } catch {
      setError(t("components.auth.netError", "Couldn't connect. Check your network and try again."));
    } finally {
      setBusy(false);
    }
  }

  const input =
    "min-h-[52px] w-full rounded-xl border-2 border-wood/25 bg-white px-4 text-base outline-none focus:border-marigold";

  return (
    <form onSubmit={submit} className="wood-frame rounded-3xl bg-paper p-6" noValidate>
      <div className="space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-wood">{t("components.auth.email", "Email")}</span>
          <input
            className={input}
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("components.auth.emailPlaceholder", "you@example.com")}
            required
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-wood">{t("components.auth.password", "Password")}</span>
          <div className="relative">
            <input
              className={`${input} pr-20`}
              type={show ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("components.auth.passwordLogin", "Your password")}
              required
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-2 top-1/2 min-h-[40px] -translate-y-1/2 rounded-lg px-3 text-sm font-semibold text-brick"
            >
              {show ? t("components.auth.hide", "Hide") : t("components.auth.show", "Show")}
            </button>
          </div>
        </label>
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-xl border border-vermilion/40 bg-vermilion/10 px-4 py-3 text-sm text-brick-deep">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="mt-6 min-h-[54px] w-full rounded-full bg-brick font-semibold text-cream shadow-lg transition active:scale-95 disabled:opacity-60"
      >
        {busy ? t("components.auth.wait", "Please wait…") : t("components.auth.signIn", "Sign in")}
      </button>

    </form>
  );
}
