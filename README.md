# CRM Solutions — Vercel / local Next.js

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Vercel deploy

1. Import `ignatiusackermann/crm-solutions` in Vercel.
2. Framework Preset: **Next.js** (auto).
3. Build command: `next build` · Output: default.
4. Set **Node.js 22.x**.
5. Add environment variables (see below), then Redeploy.

## Environment variables

Add these in **Vercel → Project → Settings → Environment Variables** (never commit secrets):

| Variable | Required for |
|----------|----------------|
| `ADMIN_PASSWORD` | Admin login at `/admin/login` |
| `ADMIN_SESSION_SECRET` | Signed admin cookie (recommended) |
| `ADMIN_EMAIL` | Admin identity (default `ignatius@crmsolutions.app`) |
| `DATABASE_URL` | Turso/libSQL SQLite URL (bookings + payments) |
| `DATABASE_AUTH_TOKEN` | Turso auth token (if required) |
| `RESEND_API_KEY` | Booking / payment emails |
| `DISCOVERY_ADMIN_EMAIL` | Booking admin notify |
| `DISCOVERY_FROM_EMAIL` | Booking from address |
| `DISCOVERY_MEETING_URL` | Fallback meeting link |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` / `GOOGLE_REFRESH_TOKEN` / `GOOGLE_CALENDAR_ID` | Calendar invites |
| `PAYPAL_CLIENT_ID` / `PAYPAL_CLIENT_SECRET` / `PAYPAL_ENV` | Client payments (`sandbox` or `live`) |
| `PAYMENT_FROM_EMAIL` | Payment plan emails |
| `GEMINI_API_KEY` | Voice Business Advisor |

Apply SQL in `drizzle/*.sql` to your Turso database before using bookings/payments.

## Main routes

- `/` · `/revenue-platform` · `/revenue-leak-audit` · `/book-discovery-call`
- `/payment-options` · `/delivery-commitment` · legal pages
- `/admin/login` · `/admin/payments`
- `/client/payment?token=...`
