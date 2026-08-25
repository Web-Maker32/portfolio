export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 animate-pulse px-4 py-8">
      <div className="space-y-3">
        <div className="h-4 w-24 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-10 w-3/4 rounded-xl bg-slate-200 dark:bg-slate-800 sm:w-1/2" />
        <div className="h-5 w-full max-w-xl rounded bg-slate-200 dark:bg-slate-800" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-48 rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900/60" />
        <div className="h-48 rounded-2xl border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900/60" />
      </div>
    </div>
  );
}