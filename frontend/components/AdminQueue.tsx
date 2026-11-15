"use client";

import { useEffect, useState } from "react";
import type { Post, Status } from "@/lib/posts";
import PostCard from "./PostCard";
import { Notice } from "./ui";
import { chip, field } from "@/lib/styles";

const tabs: Status[] = ["pending", "approved", "rejected"];

export default function AdminQueue() {
  const [status, setStatus] = useState<Status>("pending");
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [reason, setReason] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  const [tick, setTick] = useState(0);

  useEffect(() => {
    let live = true;
    fetch(`/api/admin/posts?status=${status}`, { cache: "no-store" })
      .then(async (r) => {
        const d = await r.json().catch(() => ({}));
        if (!live) return;
        if (!r.ok) return setPosts([]), setError(d.error ?? "Could not load.");
        setPosts(d.posts);
        setCounts(d.counts);
        setError("");
      })
      .catch(() => live && setError("Could not load."));
    return () => {
      live = false;
    };
  }, [status, tick]);

  async function act(id: string, action: "approve" | "reject" | "delete") {
    if (action === "delete" && !confirm("Delete this post permanently?")) return;
    const url = action === "delete" ? `/api/admin/posts/${id}` : `/api/admin/posts/${id}/${action}`;
    const res = await fetch(url, {
      method: action === "delete" ? "DELETE" : "POST",
      headers: { "Content-Type": "application/json" },
      body: action === "reject" ? JSON.stringify({ reason: reason[id] ?? "" }) : undefined,
    });
    if (!res.ok) return setError((await res.json().catch(() => ({}))).error ?? "Action failed.");
    setTick((n) => n + 1);
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2" role="tablist">
        {tabs.map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={status === t}
            onClick={() => setStatus(t)}
            className={`${chip(status === t)} capitalize`}
          >
            {t} {counts[t] ? `(${counts[t]})` : ""}
          </button>
        ))}
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-xl bg-vermilion/10 px-4 py-3 text-sm font-semibold text-brick-deep">
          {error}
        </p>
      )}

      <div className="mt-6 space-y-5">
        {posts === null ? (
          <p className="text-center text-wood/60">Loading…</p>
        ) : posts.length === 0 ? (
          <Notice>Nothing {status}.</Notice>
        ) : (
          posts.map((p) => (
            <PostCard key={p.id} post={p}>
              <p className="mt-1 break-all text-xs text-wood/55">{p.authorEmail}</p>
              <div className="mt-3 space-y-3">
                {status !== "approved" && (
                  <button onClick={() => act(p.id, "approve")} className="min-h-[52px] w-full rounded-full bg-teal font-semibold text-cream active:scale-[0.98]">
                    Approve and publish
                  </button>
                )}
                {status !== "rejected" && (
                  <div className="flex gap-2">
                    <input
                      value={reason[p.id] ?? ""}
                      onChange={(e) => setReason({ ...reason, [p.id]: e.target.value })}
                      placeholder="Reason (shown to author)"
                      maxLength={300}
                      className={`${field} min-w-0 flex-1 !py-2`}
                    />
                    <button onClick={() => act(p.id, "reject")} className="min-h-[48px] rounded-full border-2 border-vermilion px-5 font-semibold text-vermilion active:scale-95">
                      Reject
                    </button>
                  </div>
                )}
                <button onClick={() => act(p.id, "delete")} className="min-h-[44px] text-sm font-semibold text-wood/60 underline underline-offset-4">
                  Delete permanently
                </button>
              </div>
            </PostCard>
          ))
        )}
      </div>
    </div>
  );
}
