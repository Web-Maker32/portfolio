import { site } from "@/data/site";
import ContactEmail from "./contact-email";

export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-slate-200 py-10 text-sm text-slate-500 transition-colors duration-300 dark:border-slate-800 dark:text-slate-400">
      <div className="container mx-auto flex flex-col items-center justify-between gap-5 px-4 sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {site.name}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-5">
          {site.contactEmail && <ContactEmail email={site.contactEmail} />}
          {site.github && (
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-slate-900 dark:hover:text-white"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}