"use client";

/** Opens the chat sheet from anywhere on the site. */
export default function AskButton({
  children,
  className = "",
  question,
}: {
  children: React.ReactNode;
  className?: string;
  question?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent("open-chat", { detail: { question } }))}
    >
      {children}
    </button>
  );
}
