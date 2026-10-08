"use client";

import { useState } from "react";

export default function ContactEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setError("");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setError("Copy unavailable. Use the email link instead.");
    }
  };

  return (
    <span className="inline-flex items-center gap-2">
      <a
        href={`mailto:${email}`}
        className="transition-colors hover:text-blue-700 dark:hover:text-blue-300"
      >
        Email
      </a>
      <button
        type="button"
        onClick={copyEmail}
        className="rounded px-1.5 py-1 text-xs font-medium text-slate-500 underline decoration-slate-300 underline-offset-2 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300"
      >
        {copied ? "Copied" : "Copy email"}
      </button>
      {error && <span role="status" className="sr-only">{error}</span>}
    </span>
  );
}
