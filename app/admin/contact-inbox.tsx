"use client";

import { useState, useTransition } from "react";
import type { AdminContactMessage } from "./contact-actions";
import { updateContactMessageStatusAction } from "./contact-actions";

export default function ContactInbox({
  initialMessages,
  loadError,
}: {
  initialMessages: AdminContactMessage[];
  loadError: string | null;
}) {
  const formatDate = (date: string | null) => {
    if (!date || Number.isNaN(Date.parse(date))) return "Date unavailable";
    return `${new Date(date).toISOString().slice(0, 16).replace("T", " ")} UTC`;
  };

  const [messages, setMessages] = useState(initialMessages);
  const [notice, setNotice] = useState("");
  const [isPending, startTransition] = useTransition();

  const updateStatus = (id: number, status: AdminContactMessage["status"]) => {
    setNotice("");
    startTransition(async () => {
      const result = await updateContactMessageStatusAction(id, status);
      if (result.error) {
        setNotice(result.error);
        return;
      }
      setMessages((current) =>
        current.map((message) => message.id === id ? { ...message, status } : message),
      );
      setNotice("Message status updated.");
    });
  };

  return (
    <section aria-labelledby="contact-inbox-heading" className="mx-auto mt-10 max-w-7xl space-y-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-300">Inbox</p>
        <h2 id="contact-inbox-heading" className="mt-1 text-2xl font-black text-slate-950 dark:text-white">
          Contact messages
        </h2>
      </div>

      {loadError && <p role="alert" className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">{loadError}</p>}
      {notice && <p role="status" className="rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">{notice}</p>}

      {!loadError && messages.length === 0 && (
        <p className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900">
          No messages yet.
        </p>
      )}

      <ul className="space-y-3">
        {messages.map((message) => (
          <li key={message.id} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <h3 className="font-bold text-slate-950 dark:text-white">{message.name}</h3>
                <a href={`mailto:${message.email}`} className="text-sm text-blue-700 underline dark:text-blue-300">
                  {message.email}
                </a>
                <time dateTime={message.createdAt ?? undefined} className="mt-1 block text-xs text-slate-500">
                  {formatDate(message.createdAt)}
                </time>
              </div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300">
                Status
                <select
                  value={message.status}
                  disabled={isPending}
                  onChange={(event) => updateStatus(message.id, event.target.value as AdminContactMessage["status"])}
                  className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-slate-900 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="archived">Archived</option>
                </select>
              </label>
            </div>
            <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-6 text-slate-700 dark:text-slate-300">
              {message.message}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
