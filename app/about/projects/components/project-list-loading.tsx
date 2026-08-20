import Card from "@/components/card";

export default function ProjectListLoading() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      {[...Array(2)].map((_, i) => (
        <Card
          key={i}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 p-0 dark:border-slate-800 dark:bg-slate-900/60"
        >
          <div className="flex flex-col lg:flex-row">
            <div className="h-56 bg-slate-200 dark:bg-slate-800/80 lg:w-[52%]" />
            <div className="flex flex-1 flex-col justify-between p-6 space-y-4">
              <div className="space-y-3">
                <div className="h-6 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-4/5 rounded bg-slate-200 dark:bg-slate-800" />
              </div>
              <div className="flex gap-3">
                <div className="h-10 w-28 rounded-xl bg-slate-200 dark:bg-slate-800" />
                <div className="h-10 w-28 rounded-xl bg-slate-200 dark:bg-slate-800" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}