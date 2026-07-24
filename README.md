# CRM Solutions — Vercel / local Next.js

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript · Supabase Postgres

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Vercel deploy

1. Import `ignatiusackermann/crm-solutions` in Vercel.
2. Framework Preset: **Next.js**.
3. Node.js **22.x** or **24.x**.
4. Add environment variables (below), then Redeploy.

## Supabase setup

1. Create/open your Supabase project.
2. Open **SQL Editor** and run the full script in `supabase/schema.sql`.
3. Copy **Project Settings → Database → Connection string (URI)**.
   - For Vercel, prefer the **Transaction pooler** connection (port `6543`).
4. Put that URI in Vercel as `DATABASE_URL`.

## Environment variables

| Variable | Required for |
|----------|----------------|
| `ADMIN_PASSWORD` | Admin login at `/admin/login` |
| `ADMIN_SESSION_SECRET` | Signed admin cookie |
| `ADMIN_EMAIL` | Admin identity (default `ignatius@crmsolutions.app`) |
| `DATABASE_URL` | Supabase Postgres connection URI |
| `RESEND_API_KEY` | Booking / payment emails |
| `DISCOVERY_*` / Google Calendar vars | Discovery bookings |
| `PAYPAL_*` / `PAYMENT_FROM_EMAIL` | Client payments |
| `GEMINI_API_KEY` | Voice Business Advisor |

## Main routes

- `/` · `/revenue-platform` · `/revenue-leak-audit` · `/book-discovery-call`
- `/payment-options` · `/delivery-commitment` · legal pages
- `/admin/login` · `/admin/payments`
- `/client/payment?token=...`
