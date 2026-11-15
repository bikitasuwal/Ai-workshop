"use client";

import { useSyncExternalStore } from "react";

export type User = { name: string; email: string; role: "user" | "admin" } | null;

// One shared copy of "who is signed in", so the menu, the Voices page and the admin page
// cause a single /api/auth/me request instead of one each.
let current: User | undefined; // undefined = still loading
let inflight: Promise<void> | null = null;
const listeners = new Set<() => void>();

function refresh() {
  inflight ??= fetch("/api/auth/me", { cache: "no-store" })
    .then((r) => r.json())
    .then((d) => (current = d.user ?? null))
    .catch(() => (current = null))
    .then(() => {
      inflight = null;
      listeners.forEach((l) => l());
    });
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (current === undefined) refresh();
  return () => void listeners.delete(cb);
}

/** undefined = still loading, null = signed out. */
export function useUser(): User | undefined {
  return useSyncExternalStore(subscribe, () => current, () => undefined);
}

/** Call after sign in / sign out so every component picks up the change. */
export const announceAuthChange = () => refresh();
