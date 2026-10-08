"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { validateContactField, type ContactField } from "@/lib/contact-validation";
import { submitContactMessage, type ActionState } from "./actions";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all duration-200 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30 active:translate-y-px disabled:opacity-50"
    >
      {pending ? "Sending message..." : "Send message"}
    </button>
  );
};

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [clientErrors, setClientErrors] = useState<Partial<Record<ContactField, string>>>({});
  const initialState: ActionState = {
    success: false,
    error: null,
    fieldErrors: {},
  };

  const [state, formAction] = useActionState(submitContactMessage, initialState);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      {/* Header Banner */}
      <div className="animate-fade-up mb-8 text-center" style={{ animationDelay: "0s" }}>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">
          Get in touch
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Have a question or an idea?
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
          I’m looking for a frontend developer opportunity. If you’d like to discuss my projects or a role, send me a message.
        </p>
      </div>

      {/* Form Container */}
      <div className="animate-fade-up" style={{ animationDelay: "0.15s" }}>
        <form
          ref={formRef}
          action={formAction}
          className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/80 sm:p-8"
        >
          {/* Name & Email Row */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                required
                maxLength={80}
                aria-invalid={Boolean(clientErrors.name || state?.fieldErrors?.name)}
                aria-describedby={clientErrors.name || state?.fieldErrors?.name ? "name-error" : undefined}
                onBlur={(event) => {
                  const error = validateContactField("name", event.currentTarget.value) ?? undefined;
                  setClientErrors((current) => ({ ...current, name: error }));
                }}
                className={`w-full rounded-xl border bg-transparent px-4 py-2.5 text-slate-900 transition focus:outline-none focus:ring-2 dark:text-white ${
                  clientErrors.name || state?.fieldErrors?.name
                    ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-slate-700 dark:focus:border-blue-400"
                }`}
                placeholder="Your name"
              />
              {(clientErrors.name || state?.fieldErrors?.name) && (
                <p id="name-error" className="mt-1 text-xs font-medium text-rose-600 dark:text-rose-400">{clientErrors.name ?? state?.fieldErrors?.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                maxLength={120}
                aria-invalid={Boolean(clientErrors.email || state?.fieldErrors?.email)}
                aria-describedby={clientErrors.email || state?.fieldErrors?.email ? "email-error" : undefined}
                onBlur={(event) => {
                  const error = validateContactField("email", event.currentTarget.value) ?? undefined;
                  setClientErrors((current) => ({ ...current, email: error }));
                }}
                className={`w-full rounded-xl border bg-transparent px-4 py-2.5 text-slate-900 transition focus:outline-none focus:ring-2 dark:text-white ${
                  clientErrors.email || state?.fieldErrors?.email
                    ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-slate-700 dark:focus:border-blue-400"
                }`}
                placeholder="username@example.com"
              />
              {(clientErrors.email || state?.fieldErrors?.email) && (
                <p id="email-error" className="mt-1 text-xs font-medium text-rose-600 dark:text-rose-400">{clientErrors.email ?? state?.fieldErrors?.email}</p>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              minLength={15}
              maxLength={4000}
              aria-invalid={Boolean(clientErrors.message || state?.fieldErrors?.message)}
              aria-describedby={clientErrors.message || state?.fieldErrors?.message ? "message-error" : undefined}
              onBlur={(event) => {
                const error = validateContactField("message", event.currentTarget.value) ?? undefined;
                setClientErrors((current) => ({ ...current, message: error }));
              }}
              className={`w-full rounded-xl border bg-transparent px-4 py-2.5 text-slate-900 transition focus:outline-none focus:ring-2 dark:text-white ${
                clientErrors.message || state?.fieldErrors?.message
                  ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
                  : "border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-slate-700 dark:focus:border-blue-400"
              }`}
              placeholder="Write your message..."
            />
            {(clientErrors.message || state?.fieldErrors?.message) && (
              <p id="message-error" className="mt-1 text-xs font-medium text-rose-600 dark:text-rose-400">{clientErrors.message ?? state?.fieldErrors?.message}</p>
            )}
          </div>

          <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="company_website">Leave this field empty</label>
            <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <SubmitButton />

          {/* Alert Messages */}
          {state?.success && (
            <div role="status" className="animate-fade-up rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
              Thanks for your message. It has been received.
            </div>
          )}

          {state?.error && (
            <div role="alert" className="animate-fade-up rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-center text-sm font-medium text-rose-600 dark:text-rose-400">
              {state.error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}