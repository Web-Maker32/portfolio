# Web Maker

A portfolio and project inquiry site built with Next.js App Router, React, TypeScript, and Tailwind CSS.

## Run locally

Requirements: Node.js 20.9 or later and pnpm 11.23.0 (the version pinned in `package.json`).

```powershell
Copy-Item .env.example .env.local
pnpm install --frozen-lockfile
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Set the environment values described below to enable the database-backed project catalog, admin studio, and contact submissions.

The development script uses Webpack because the current Next.js/Turbopack setup can panic while resolving the installed Next.js package on Windows. Production builds continue to use Next.js's normal optimized build pipeline.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `ADMIN_PASSWORD` | Yes for `/admin` | Password for the admin sign-in form. Use a unique, high-entropy value. |
| `ADMIN_SESSION_SECRET` | Yes for `/admin` | Random signing secret for the HTTP-only session cookie; use 32+ random characters. |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes for database features | Supabase project URL. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Yes for public project reads | Publishable key used to read the project catalog. |
| `SUPABASE_SECRET_KEY` | Yes for admin edits and inquiries | Server-only Supabase secret. Never expose it to the browser or commit it. |
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical site origin, without a trailing slash; used for metadata, robots, and sitemap URLs. |
| `RESEND_API_KEY` | Optional | Enables email notifications for new contact messages. |
| `INQUIRY_NOTIFY_EMAIL` | Optional | Destination address for contact message notifications. |
| `RESEND_FROM` | Optional | Verified sender address in Resend. All three Resend values are needed to send notifications. |

The contact form stores messages in Supabase. Email notifications are optional; a missing email configuration does not prevent saving a message.

## Supabase setup

1. In the Supabase SQL Editor, run [`supabase/schema.sql`](./supabase/schema.sql).
2. Set the Supabase URL and publishable key in `.env.local`.
3. Set `SUPABASE_SECRET_KEY` on the server only (for local development, `.env.local`; for deployment, the hosting provider's server environment).
4. Set the two admin values and restart the app.
5. Sign in at `/admin`, then use **Restore defaults** if you want to seed the example projects. New and edited projects are stored in Supabase and publicly readable; contact messages have no public read/write policy.

The admin uses a shared password and server-side Supabase actions, not Supabase Auth. Keep the admin password and server secret private, and do not add a public write policy for either table.

## Checks and deployment

```powershell
pnpm lint
pnpm typecheck
pnpm build
```

GitHub Actions runs the same checks for pushes and pull requests. Configure the production environment variables in your hosting provider, set `NEXT_PUBLIC_SITE_URL` to the production origin, and deploy the Next.js app with the provider's standard Next.js integration.
