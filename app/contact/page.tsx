"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { submitWebsiteInquiry, type ActionState } from "./actions";

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
  const initialState: ActionState = {
    success: false,
    error: null,
    fieldErrors: {},
  };

  const [state, formAction] = useActionState(submitWebsiteInquiry, initialState);

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
          Fill out your project details below to get an estimate and project breakdown for your new website.
        </p>
      </div>

      {/* Form Container */}
      <div className="animate-fade-up" style={{ animationDelay: "0.15s" }}>
        <form
          ref={formRef}
          action={formAction}
          noValidate
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
                className={`w-full rounded-xl border bg-transparent px-4 py-2.5 text-slate-900 transition focus:outline-none focus:ring-2 dark:text-white ${
                  state?.fieldErrors?.name
                    ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-slate-700 dark:focus:border-blue-400"
                }`}
                placeholder="User Name"
              />
              {state?.fieldErrors?.name && (
                <p className="mt-1 text-xs font-medium text-rose-500">{state.fieldErrors.name}</p>
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
                className={`w-full rounded-xl border bg-transparent px-4 py-2.5 text-slate-900 transition focus:outline-none focus:ring-2 dark:text-white ${
                  state?.fieldErrors?.email
                    ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-slate-700 dark:focus:border-blue-400"
                }`}
                placeholder="username@example.com"
              />
              {state?.fieldErrors?.email && (
                <p className="mt-1 text-xs font-medium text-rose-500">{state.fieldErrors.email}</p>
              )}
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
                className={`w-full rounded-xl border bg-white px-4 py-2.5 text-slate-900 transition focus:outline-none focus:ring-2 dark:bg-slate-900 dark:text-white ${
                  state?.fieldErrors?.websiteType
                    ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-slate-700 dark:focus:border-blue-400"
                }`}
              >
                <option value="">Select type</option>
                <option value="Single Landing Page">Single Landing Page</option>
                <option value="Personal / Developer Portfolio">Personal / Portfolio</option>
                <option value="Business / Corporate Site">Business / Corporate</option>
                <option value="Blog / News / Publication">Blog / News Site</option>
                <option value="E-Commerce Store">E-Commerce Store</option>
                <option value="Web App / Full SaaS">Web Application / SaaS</option>
                <option value="Custom API / Backend Integration">Backend / API Service</option>
              </select>
              {state?.fieldErrors?.websiteType && (
                <p className="mt-1 text-xs font-medium text-rose-500">{state.fieldErrors.websiteType}</p>
              )}
            </div>

            <div>
              <label htmlFor="budget" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Estimated Budget
              </label>
              <select
                id="budget"
                name="budget"
                className={`w-full rounded-xl border bg-white px-4 py-2.5 text-slate-900 transition focus:outline-none focus:ring-2 dark:bg-slate-900 dark:text-white ${
                  state?.fieldErrors?.budget
                    ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-slate-700 dark:focus:border-blue-400"
                }`}
              >
                <option value="">Select budget</option>
                <option value="Under ₨25,000">Under ₨25,000 (~$90)</option>
                <option value="₨25,000 - ₨50,000">₨25,000 - ₨50,000 (~$180)</option>
                <option value="₨50,000 - ₨100,000">₨50,000 - ₨100,000 (~$360)</option>
                <option value="₨100,000 - ₨250,000">₨100,000 - ₨250,000 (~$900)</option>
                <option value="₨250,000+">₨250,000+ ($900+)</option>
              </select>
              {state?.fieldErrors?.budget && (
                <p className="mt-1 text-xs font-medium text-rose-500">{state.fieldErrors.budget}</p>
              )}
            </div>

            <div>
              <label htmlFor="timeline" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Timeframe
              </label>
              <select
                id="timeline"
                name="timeline"
                className={`w-full rounded-xl border bg-white px-4 py-2.5 text-slate-900 transition focus:outline-none focus:ring-2 dark:bg-slate-900 dark:text-white ${
                  state?.fieldErrors?.timeline
                    ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
                    : "border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-slate-700 dark:focus:border-blue-400"
                }`}
              >
                <option value="">Select timeline</option>
                <option value="Urgent (< 1 Week)">Urgent (&lt; 1 Week)</option>
                <option value="1-2 Weeks">1 - 2 Weeks</option>
                <option value="2-4 Weeks">2 - 4 Weeks</option>
                <option value="1+ Month">1+ Month</option>
              </select>
              {state?.fieldErrors?.timeline && (
                <p className="mt-1 text-xs font-medium text-rose-500">{state.fieldErrors.timeline}</p>
              )}
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
              rows={4}
              className={`w-full rounded-xl border bg-transparent px-4 py-2.5 text-slate-900 transition focus:outline-none focus:ring-2 dark:text-white ${
                state?.fieldErrors?.description
                  ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
                  : "border-slate-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-slate-700 dark:focus:border-blue-400"
              }`}
              placeholder="Describe what your website should do, required pages, desired tech stack, and any design references you have in mind..."
            />
            {state?.fieldErrors?.description && (
              <p className="mt-1 text-xs font-medium text-rose-500">{state.fieldErrors.description}</p>
            )}
          </div>

          <SubmitButton />

          {/* Alert Messages */}
          {state?.success && (
            <div className="animate-fade-up rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
              Your website request has been received! I will review your details and get back to you with a proposal.
            </div>
          )}

          {state?.error && !state?.fieldErrors && (
            <div className="animate-fade-up rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-center text-sm font-medium text-rose-600 dark:text-rose-400">
              {state.error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}