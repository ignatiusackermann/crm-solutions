# 01 — Forms → email → thank-you (standard pattern)

Every public lead form follows the **same four outcomes**. Missing any one is a launch defect.

```
Submit → Save DB → Email admin → Email submitter → Redirect /thank-you
```

## 1. Save

- Table per form type (`contact_submissions`, `discovery_bookings`, …)
- Store name, email, company, message/meta, `created_at`, `status`
- Never “email only” with no DB row

## 2. Email admin

- From: verified brand address (`bookings@` / `contact@` / `info@` on **verified** domain)
- To: founder / ops inbox
- Reply-To: the submitter
- Subject: clear (`Website contact — Name` / `New Discovery Call — Company — time`)

## 3. Email submitter (do not skip)

- Warm thank-you / confirmation using **first name**
- Set expectations (reply window, what happens next)
- Soft next step (Discovery Call / resource) — no hard sell
- Reply-To: admin

CRM Solutions Contact example subject: `Thank you for contacting CRM Solutions`

## 4. Thank-you page (dedicated route)

**Do not** leave confirmation under the booking/contact hero (“Book a Discovery Call” + navy card).

Required:

- Route e.g. `/contact/thank-you`, `/book-discovery-call/thank-you`
- `robots: noindex`
- Hero: **Thank you, {FirstName}.**
- Valuing copy (they took time; you will reply with care)
- Below: useful next steps (Discovery, audit/survey, 2–3 insight articles)
- Pass name via `sessionStorage` (or signed query) after successful POST

## Reference implementation (this repo)

| Piece | Path |
|-------|------|
| Contact API + client thank-you mail | `lib/server/contact.ts` |
| Contact form → redirect | `app/contact/contact-form.tsx` |
| Contact thank-you page | `app/contact/thank-you/` |
| Discovery bookings + mails | `lib/server/discovery-bookings.ts` |
| Discovery thank-you page | `app/book-discovery-call/thank-you/` |
| Resend SOP | `docs/sop-resend-email.md` |

## Turnstile

- Wire on Contact + login + **Discovery final step** before heavy traffic
- Keys: `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY`
- Localhost may skip when secret unset — production must verify
