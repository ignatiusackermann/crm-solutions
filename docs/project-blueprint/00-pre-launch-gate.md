# 00 — Pre-launch gate (mandatory)

Do not send outreach, run ads, or tell clients “the site is live” until every **MUST** row is green.

## Email (MUST)

- [ ] Sending domain **Verified** in Resend (status not “Not Started”)
- [ ] SPF includes Resend (`include:amazonses.com`) — **one** SPF TXT only
- [ ] DKIM CNAMEs for Resend present
- [ ] Vercel `RESEND_API_KEY` matches **this** Resend project
- [ ] Admin test email **Delivered** (inbox + Resend → Emails)
- [ ] Discovery / booking proof: client + admin emails Delivered
- [ ] Contact proof: client thank-you + admin alert Delivered

Full SOP: [`../sop-resend-email.md`](../sop-resend-email.md)

**Remember:** verify the domain you **send from**, never prospect/recipient domains.

## Public forms (MUST)

For **each** public form (Contact, Discovery, Audit if saved, Newsletter, etc.):

- [ ] Saves to database
- [ ] Email to **admin**
- [ ] Email to **submitter** (thank-you / confirmation)
- [ ] Dedicated **thank-you page** (personal name in hero — not inline under the wrong H1)
- [ ] Turnstile (or equivalent) on spam-sensitive forms
- [ ] Honeypot only is not enough for high-visibility booking

Pattern: [`01-forms-email-thankyou.md`](01-forms-email-thankyou.md)

## Admin (MUST before calling ops “done”)

- [ ] Every saved submission type has an **admin list**
- [ ] Bookings: list + cancel (+ cancel email)
- [ ] Contact submissions: list + status
- [ ] Client can request a **new** access code by email (old code cannot be “resent” — only hash stored)
- [ ] Admin can issue new access from Client Plans list
- [ ] No “data in DB but founder only finds it in Resend”

Modules: [`02-admin-dashboard-modules.md`](02-admin-dashboard-modules.md)

## Booking integrity (MUST if Discovery / calendar exists)

- [ ] Taken slots disabled in UI
- [ ] Unique DB constraint on slot start
- [ ] Race returns clear “already booked” error

## Nice-to-have (not blocking first outbound)

- [ ] Survey / Leak Audit results stored + admin list
- [ ] Voice call register
- [ ] Client progress panel beyond payments
- [ ] Google Analytics / traffic panel

## Smoke test (30 minutes, every launch)

1. Book Discovery → thank-you page → Resend (3 rows) → inboxes  
2. Contact form → thank-you page → Resend (admin + client) → inboxes  
3. Admin test email  
4. Open client payment panel with a test plan  
5. Confirm no double-book on a taken slot  

## CRM Solutions status (update when closing gaps)

| Item | Status (30 Jul 2026) |
|------|----------------------|
| Resend domain | PASS |
| Discovery emails | PASS |
| Contact client thank-you email | PASS (code; confirm after deploy) |
| Contact thank-you page | PASS (code; confirm after deploy) |
| Discovery thank-you page | PASS (code; confirm after deploy) |
| Admin payments | PASS |
| Admin Discovery bookings | **GAP** |
| Admin contact submissions | **GAP** |
| Survey storage + admin | **GAP** |
| Voice register | **GAP** |
| Analytics panel | Deferred |
