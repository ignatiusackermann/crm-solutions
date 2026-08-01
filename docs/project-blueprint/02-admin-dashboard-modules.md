# 02 — Admin dashboard modules (required map)

**Rule:** If the public site can create a row, the admin must be able to **see and act** on that row. Resend inbox is not an admin UI.

## Module checklist for every agency site

| # | Module | Must do | CRM Solutions (1 Aug 2026) |
|---|--------|---------|------------------------------|
| 1 | **Auth** | Secure admin login | PASS |
| 2 | **Payment plans** | Create plan, list, status, test email | PASS (`/admin/payments`) |
| 3 | **Discovery / bookings** | Calendar or list, confirm, **cancel + email client** | **PASS** — `/admin/bookings` list + month calendar + cancel email |
| 4 | **Contact submissions** | List, open message, mark handled | **PASS** — `/admin/contact` |
| 5 | **Survey / Leak Audit** | Who took it, scores, answers | **PASS** — stored on email-results + `/admin/audits` |
| 6 | **Voice register** | Timestamp, summary/notes (even manual) | **PASS** — `/admin/voice` (manual; missed calls supported) |
| 7 | **Client progress** (later) | Milestones beyond payment | Not started |
| 8 | **Traffic / Analytics** | GA embed or link-out | **PASS** — `/admin/traffic` + consent-gated GA4 tag |

## Minimum booking admin

1. Table: date/time (visitor + SA), name, company, email, phone, status, email_status  
2. Actions: open detail, **Cancel** (set status `cancelled`, free slot, email client + remove/update Google event if present)  
3. Filter: upcoming / past / cancelled  
4. Month calendar of confirmed calls (SAST)

**Confirm model:** bookings are auto-confirmed on public submit (slot + Google + emails). Admin action is cancel (and join Meet / email).

## Minimum contact admin

1. Table: received_at, name, email, company, preview, status (`new` / `replied` / `archived`)  
2. Detail view: full message + mailto / WhatsApp  
3. Mark handled  

## Voice / missed calls

1. Manual log today: channel, direction, outcome (`missed` | `answered` | `voicemail` | `callback` | …), summary, notes  
2. Later: Twilio (or similar) inbound webhook → same `voice_call_log` table  

## Traffic

1. Yes — pull from **Google Analytics 4**  
2. Site: `NEXT_PUBLIC_GA_MEASUREMENT_ID` + cookie consent gate  
3. Admin: link-out to GA4 (`/admin/traffic`), optional `GA4_PROPERTY_ID` deep link  

## Sidebar IA

```
01 Discovery Bookings     ← /admin/bookings
02 Contact Inbox          ← /admin/contact
03 Voice Log              ← /admin/voice
04 Audit Results          ← /admin/audits
05 Payment Generator      ← /admin/payments
06 Website Traffic        ← /admin/traffic
```

## Do not ship again without

- Admin list for **every** `INSERT` from a public form  
- Cancel path that emails the human who booked  
- Same Resend from-domain as public confirmations  
