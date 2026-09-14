export default function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-slate-200 py-10 text-sm text-slate-500 transition-colors duration-300 dark:border-slate-800 dark:text-slate-400">
      <div className="container mx-auto flex flex-col items-center justify-between gap-5 px-4 sm:flex-row">
        <p>&copy; {new Date().getFullYear()} Next Portfolio</p>
        <div className="flex items-center gap-5">
          <a 
            href="mailto:hello@example.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="transition-colors hover:text-cyan-600 dark:hover:text-cyan-300"
          >
            Email
          </a>
          <a 
            href="https://github.com/Web-Maker32" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="transition-colors hover:text-slate-900 dark:hover:text-white"
          >
            GitHub
          </a>
          <a 
            href="https://www.linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="transition-colors hover:text-cyan-600 dark:hover:text-cyan-300"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}