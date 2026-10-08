"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application route error:", error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
        Something went wrong
      </p>
      <h1 className="mt-3 text-3xl font-extrabold text-slate-950 dark:text-white">
        This page hit an error.
      </h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        Try loading the page again. If the problem continues, please come back later.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500"
      >
        Try again
      </button>
    </section>
  );
}
