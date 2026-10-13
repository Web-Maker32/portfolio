# Muhammed Hashir Ali — Full-Stack Developer

A portfolio for my full-stack development work. I’m a self-taught developer based in Pakistan, building personal web projects with React, Next.js, TypeScript, and Supabase.

**Live site:** [portfolio-six-snowy-76.vercel.app](https://portfolio-six-snowy-76.vercel.app)

## Featured projects

### [Next Finance](https://github.com/Web-Maker32/next-finance)

A personal finance dashboard for balances, transactions, and budgets. Built with Next.js, TypeScript, Supabase, and Zod.

- [Live demo](https://next-finance-steel.vercel.app)
- [Source code](https://github.com/Web-Maker32/next-finance)

### Portfolio Site

This site showcases my projects and includes project case studies, a contact form, and light and dark themes.

- [Live site](https://portfolio-six-snowy-76.vercel.app)
- [Source code](https://github.com/Web-Maker32/portfolio)

## Built with

Next.js App Router · React · TypeScript · Tailwind CSS · Supabase · Zod

## Run locally

Requirements: Node.js 20.9 or later and pnpm 11.23.0 (the version pinned in `package.json`).

```powershell
Copy-Item .env.example .env.local
pnpm install --frozen-lockfile
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Set the environment values described below to enable the database-backed project catalog, admin studio, and contact submissions.

Copy your real `.env.local` configuration from your deployment settings; do not commit credentials. The repository’s `.env.example` intentionally contains placeholders.

The development script uses Webpack because the current Next.js/Turbopack setup can panic while resolving the installed Next.js package on Windows. Production builds continue to use Next.js's normal optimized build pipeline.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `ADMIN_PASSWORD` | Yes for `/admin` | Password for the admin sign-in form. Use a unique, high-entropy value. |
| `ADMIN_SESSION_SECRET` | Yes for `/admin` | Random signing secret for the HTTP-only session cookie; use 32+ random characters. |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes for database features | Supabase project URL. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Yes for public project reads | Publishable key used to read the project catalog. |
| `SUPABASE_SECRET_KEY` | Yes for admin edits, contact messages, and rate limiting | Server-only Supabase secret. Never expose it to the browser or commit it. |
| `CONTACT_RATE_LIMIT_SECRET` | Yes in production | Random server-only secret used to hash client IPs for contact-form rate limiting. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional | Real contact address shown in the footer with a copy-email button. Leave blank to hide it. |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical site origin, without a trailing slash; used for metadata, robots, and sitemap URLs. |
| `RESEND_API_KEY` | Optional | Enables email notifications for new contact messages. |
| `INQUIRY_NOTIFY_EMAIL` | Optional | Destination address for contact message notifications. |
| `RESEND_FROM` | Optional | Verified sender address in Resend. All three Resend values are needed to send notifications. |

The contact form validates with shared Zod rules in the browser and server, uses a honeypot and a Supabase-backed limit of five messages per network per 15 minutes, and stores messages in Supabase. Configure a trustworthy `x-real-ip` or `x-forwarded-for` client IP header at the hosting proxy and apply the SQL schema to enable rate limiting. Email notifications are optional.

## Supabase setup

1. In the Supabase SQL Editor, run [`supabase/schema.sql`](./supabase/schema.sql).
2. Set the Supabase URL and publishable key in `.env.local`.
3. Set `SUPABASE_SECRET_KEY` on the server only (for local development, `.env.local`; for deployment, the hosting provider's server environment).
4. Set the two admin values and restart the app.
5. Sign in at `/admin`, then use **Restore defaults** if you want to seed the example projects. New and edited projects are stored in Supabase and publicly readable; contact messages and rate-limit records are private and service-role only.

The admin uses a shared password and signed HTTP-only session cookies, not Supabase Auth. The private inbox lets you view messages and set their status. Keep the admin password and server secret private, and do not add public access policies to the messages or rate-limit tables.

## Projects and profile links

- `/projects` lists personal projects; `/about/projects` permanently redirects there.
- `/projects/[slug]` provides a case study for each project. Case studies describe the current projects and do not claim client outcomes.
- `GET /api/projects` returns the public project catalog with a short shared cache.
- Set `NEXT_PUBLIC_CONTACT_EMAIL` only after you are ready to publish a real email. The LinkedIn and resume links are intentionally omitted until you have a real profile and resume to share.

## Checks and deployment

```powershell
pnpm lint
pnpm typecheck
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
pnpm test:a11y
pnpm screenshots
pnpm lighthouse
```

Run `pnpm screenshots` to refresh the desktop homepage previews in `public/portfolio-light.png`, `public/portfolio-dark.png`, and `public/portfolio.png`. It starts the local Playwright development server and captures the homepage at 1440 × 900; rerun it after visual homepage changes.

Run the Lighthouse command after `pnpm build`. If Lighthouse cannot find Chrome on your machine, set the Playwright-installed Chromium path in PowerShell:

```powershell
$env:CHROME_PATH = (pnpm exec node -e "const { chromium } = require('@playwright/test'); console.log(chromium.executablePath())")
pnpm lighthouse
```

End-to-end tests use Playwright and axe-core. Lighthouse CI audits the home, project list, about, and contact pages; the performance score threshold is a warning, while accessibility and SEO thresholds fail the run. GitHub Actions runs lint, typecheck, build, browser tests, accessibility checks, and Lighthouse on Windows for pushes and pull requests. Configure the production environment variables in your hosting provider, set `NEXT_PUBLIC_SITE_URL` to the production origin, and deploy the Next.js app with the provider's standard Next.js integration.
