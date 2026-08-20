"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/about/projects", label: "Projects" },
  { href: "/stack", label: "Stack" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const dragStartXRef = useRef<number | null>(null);
  const openRef = useRef(false);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      if (event.clientX <= 24 || openRef.current) {
        dragStartXRef.current = event.clientX;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (dragStartXRef.current === null) return;
      const deltaX = event.clientX - dragStartXRef.current;
      if (!openRef.current && deltaX > 40) setOpen(true);
      if (openRef.current && deltaX < -40) setOpen(false);
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (dragStartXRef.current === null) return;
      const deltaX = event.clientX - dragStartXRef.current;
      if (!openRef.current && deltaX > 80) setOpen(true);
      else if (openRef.current && deltaX < -80) setOpen(false);
      dragStartXRef.current = null;
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-colors duration-300 dark:border-slate-800/80 dark:bg-slate-950/80 px-4 py-4 md:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="text-xl font-black tracking-tighter text-slate-900 transition-opacity hover:opacity-80 dark:text-white">
          Next Portfolio
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Nav Button */}
        <button
          className="rounded-xl p-2 text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/80 md:hidden"
          onClick={() => setOpen((val) => !val)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-xs md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col gap-4 bg-white px-6 pb-6 pt-20 shadow-2xl transition-transform duration-300 ease-out dark:bg-slate-900 md:hidden"
        style={{ transform: open ? "translateX(0)" : "translateX(-100%)" }}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-base font-medium text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </aside>
    </header>
  );
}