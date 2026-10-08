import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[50vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
        404 · Page not found
      </p>
      <h1 className="mt-3 text-3xl font-extrabold text-slate-950 dark:text-white">
        This page isn’t here.
      </h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        The link may be out of date, or the page may have moved.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-500"
      >
        Return home
      </Link>
    </main>
  );
}
