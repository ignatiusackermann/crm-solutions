# Project Blueprint — CRM Solutions agency stack

**Purpose:** Copy this folder into the next Next.js / Vercel / Supabase / Resend site so we do not re-learn the same loose ends under launch pressure.

**Origin:** Hardened on `crmsolutions.app` (Jul 2026). Hours were lost on email domain verification, missing thank-you pages, and an admin that only covered payments.

## How to use on a new project

1. Copy `docs/project-blueprint/` into the new repo as `docs/project-blueprint/`.
2. Replace domain / from-addresses in the checklists with the new brand.
3. Work **`00-pre-launch-gate.md`** top to bottom before outbound or paid ads.
4. Build admin modules from **`02-admin-dashboard-modules.md`** — do not ship “forms that save but nobody can see.”
5. Keep **`03-crmsolutions-lessons-jul2026.md`** as the cautionary list.

## Documents in this pack

| File | Job |
|------|-----|
| [`00-pre-launch-gate.md`](00-pre-launch-gate.md) | Mandatory go-live checklist |
| [`01-forms-email-thankyou.md`](01-forms-email-thankyou.md) | Standard pattern: form → DB → Resend (admin + client) → thank-you page |
| [`02-admin-dashboard-modules.md`](02-admin-dashboard-modules.md) | Required admin panels (including gaps still open on CRM Solutions) |
| [`03-crmsolutions-lessons-jul2026.md`](03-crmsolutions-lessons-jul2026.md) | What burned time — never repeat |
| Parent: [`../sop-resend-email.md`](../sop-resend-email.md) | Resend domain verification SOP |

## Stack this pack assumes

Next.js (App Router) · Vercel · Supabase Postgres · Resend · optional Cloudflare Turnstile · optional Google Calendar
