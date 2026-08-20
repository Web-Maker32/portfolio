import React from "react";
import { cn } from "@/lib/utils";

export default function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 dark:border-slate-800 dark:bg-slate-900/80",
        className
      )}
    >
      {children}
    </div>
  );
}