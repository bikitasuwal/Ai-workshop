"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { announceAuthChange } from "@/lib/useUser";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const router = useRouter();
  const signup = mode === "signup";
  const [name, setName] = useState("");
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
      const r = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const d = await r.json();
      if (!r.ok) {
        setError(d.error ?? "Something went wrong. Please try again.");
        return;
      }
      announceAuthChange();
      router.push(d.user?.role === "admin" ? "/admin" : "/reviews");
      router.refresh();
    } catch {
      setError("Couldn't connect. Check your network and try again.");
    } finally {
      setBusy(false);
    }
  }

  const input =
    "min-h-[52px] w-full rounded-xl border-2 border-wood/25 bg-white px-4 text-base outline-none focus:border-marigold";

  return (
    <form onSubmit={submit} className="wood-frame rounded-3xl bg-paper p-6" noValidate>
      <div className="space-y-4">
        {signup && (
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-wood">Display name</span>
            <input
              className={input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="nickname"
              maxLength={40}
              placeholder="Shown on your posts"
              required
            />
          </label>
        )}
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-wood">Email</span>
          <input
            className={input}
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          {signup && <span className="mt-1 block text-xs text-wood/60">Never shown publicly.</span>}
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-semibold text-wood">Password</span>
          <div className="relative">
            <input
              className={`${input} pr-20`}
              type={show ? "text" : "password"}
              autoComplete={signup ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={signup ? "At least 8 characters" : "Your password"}
              required
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-2 top-1/2 min-h-[40px] -translate-y-1/2 rounded-lg px-3 text-sm font-semibold text-brick"
            >
              {show ? "Hide" : "Show"}
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
        {busy ? "Please wait…" : signup ? "Create account" : "Sign in"}
      </button>

      <p className="mt-4 text-center text-sm text-wood/80">
        {signup ? (
          <>
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-brick underline underline-offset-4">
              Sign in
            </Link>
          </>
        ) : (
          <>
            New here?{" "}
            <Link href="/signup" className="font-semibold text-brick underline underline-offset-4">
              Create an account
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
