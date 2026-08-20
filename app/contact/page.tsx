"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { submitWebsiteInquiry } from "./action";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all duration-200 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/30 active:translate-y-px disabled:opacity-50"
    >
      {pending ? "Submitting Request..." : "Request Website Build"}
    </button>
  );
};

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(submitWebsiteInquiry, {
    success: false,
    error: null,
  });

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
          Order A Website
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Build Your Custom Website
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">
          Fill out your project details below to get a estimate and project breakdown for your new website.
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
                required
                className="w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
                placeholder="jane@example.com"
              />
            </div>
          </div>

          {/* Project Details Row */}
          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label htmlFor="websiteType" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Website Type
              </label>
              <select
                id="websiteType"
                name="websiteType"
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
              >
                <option value="">Select type</option>
                <option value="Landing Page">Landing Page</option>
                <option value="Portfolio">Portfolio</option>
                <option value="Blog / News">Blog / News</option>
                <option value="Web Application">Web Application</option>
              </select>
            </div>

            <div>
              <label htmlFor="budget" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Estimated Budget
              </label>
              <select
                id="budget"
                name="budget"
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
              >
                <option value="">Select budget</option>
                <option value="<$300">&lt; $300</option>
                <option value="$300 - $800">$300 - $800</option>
                <option value="$800 - $1500">$800 - $1,500</option>
                <option value="$1500+">$1,500+</option>
              </select>
            </div>

            <div>
              <label htmlFor="timeline" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Timeframe
              </label>
              <select
                id="timeline"
                name="timeline"
                required
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
              >
                <option value="">Select timeline</option>
                <option value="1-2 Weeks">1 - 2 Weeks</option>
                <option value="2-4 Weeks">2 - 4 Weeks</option>
                <option value="1+ Month">1+ Month</option>
              </select>
            </div>
          </div>

          {/* Project Details Description */}
          <div>
            <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Project Description & Features
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              className="w-full rounded-xl border border-slate-300 bg-transparent px-4 py-2.5 text-slate-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-400/20"
              placeholder="Describe what your website should do, required pages, and any design references you have in mind..."
            />
          </div>

          <SubmitButton />

          {/* Alert Messages */}
          {state?.success && (
            <div className="animate-fade-up rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
              Your website request has been received! I will review your details and get back to you with a proposal.
            </div>
          )}

          {state?.error && (
            <div className="animate-fade-up rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-center text-sm font-medium text-rose-600 dark:text-rose-400">
              {state.error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}