# SOP — Resend email (mandatory gate)

**Rule:** Never send Discovery Calls, payment plans, contact replies, or client outreach that depends on crmsolutions.app mail until this gate is green. Missing it delays launches and embarrasses live bookings.

**Verify the domain we send FROM — not domains we send TO.**  
Recipient addresses (`@gmail.com`, `@itools24.co.za`, prospect clinics, etc.) never need Resend verification.

---

## Hard gate (must pass before go-live / outbound)

| # | Check | Pass looks like |
|---|--------|-----------------|
| 1 | Resend → **Domains** → `crmsolutions.app` | Status **Verified** (“ready to send”) |
| 2 | DNS SPF includes Resend (HostGator Zone Editor) | Single TXT: `v=spf1 +a +mx +ip4:… include:amazonses.com ~all` (one SPF only) |
| 3 | DKIM CNAMEs present | `resend` / `resend2` / `resend3` `._domainkey` → Resend |
| 4 | Vercel Production `RESEND_API_KEY` | Matches an API key from **this same** Resend project |
| 5 | From addresses | `DISCOVERY_FROM_EMAIL` / `PAYMENT_FROM_EMAIL` use `@crmsolutions.app` (e.g. `bookings@` or `payments@`) |
| 6 | Proof send | `/admin/payments` → **Send test email** → inbox + Resend → Emails = **Delivered** |
| 7 | Discovery proof | Book one test Discovery Call → client + admin rows appear in Resend |

If step 1 is **Not Started** / Pending / Failed: **stop**. Do not “fix” by creating more cPanel mailboxes.

---

## Setup (new project or new sending domain)

1. Create the domain in [Resend Domains](https://resend.com/domains) (e.g. `crmsolutions.app`).
2. Add the DNS records Resend shows (verification TXT + DKIM CNAMEs) at the domain’s DNS host.
3. Update **one** root SPF TXT to include `include:amazonses.com` (merge into existing HostGator SPF — never add a second `v=spf1`).
4. Click **Verify** in Resend. Wait until **Verified**.
5. Create cPanel mailboxes only if you need to *receive* mail (`info@`, `bookings@`, `payments@`). Mailboxes ≠ send authority.
6. Set Vercel env vars → Redeploy.
7. Run the hard-gate proof sends (admin test + one Discovery booking).

---

## What not to do

- Do not verify prospect domains, `itools24.co.za`, or “the rest of the world” in Resend.
- Do not assume a working Roundcube inbox means Resend can send.
- Do not treat `emailReady: true` alone as proof — that only means an API key string exists.
- Do not go live on bookings/payments if Resend → Emails shows no new rows after a test.

---

## Incident reminder (Jul 2026)

Bookings saved; no confirmations. Root cause: `crmsolutions.app` left **Not Started** in Resend despite DNS/mailboxes. Fixed when domain reached **Verified** and admin test delivered to `info@`.

---

## Related

- Stress test payments: `docs/stress-test-checklist.md` (run this SOP first)
- Test clients: `docs/stress-test-clients.csv`
- Internal status page: `/site-info`
