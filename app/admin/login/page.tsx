"use client";

import { useActionState } from "react";
import { loginAdmin } from "../actions";

const initialState = { error: null };

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAdmin, initialState);

  return (
    <main className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-950/10 dark:border-slate-800 dark:bg-slate-900 sm:p-9">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-700 dark:text-cyan-300">Portfolio studio</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">Admin sign in</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">Enter your private studio password to manage website projects.</p>
        <form action={formAction} className="mt-8 space-y-5">
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
            Password
            <input
              required
              autoFocus
              name="password"
              type="password"
              autoComplete="current-password"
              className="mt-2 w-full rounded-xl border border-slate-300 bg-transparent px-4 py-3 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700"
            />
          </label>
          {state.error && <p className="rounded-xl bg-rose-50 p-3 text-sm font-medium text-rose-600 dark:bg-rose-950/30 dark:text-rose-300">{state.error}</p>}
          <button type="submit" disabled={pending} className="w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-cyan-700 disabled:cursor-wait disabled:opacity-60 dark:bg-white dark:text-slate-950 dark:hover:bg-cyan-200">
            {pending ? "Checking..." : "Open studio"}
          </button>
        </form>
      </div>
    </main>
  );
}
