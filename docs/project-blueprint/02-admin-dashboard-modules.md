# 02 — Admin dashboard modules (required map)

**Rule:** If the public site can create a row, the admin must be able to **see and act** on that row. Resend inbox is not an admin UI.

## Module checklist for every agency site

| # | Module | Must do | CRM Solutions (30 Jul 2026) |
|---|--------|---------|------------------------------|
| 1 | **Auth** | Secure admin login | PASS |
| 2 | **Payment plans** | Create plan, list, status, test email | PASS (`/admin/payments`) |
| 3 | **Discovery / bookings** | Calendar or list, confirm, **cancel + email client** | **GAP** — data in `discovery_bookings` only |
| 4 | **Contact submissions** | List, open message, mark handled | **GAP** — data in `contact_submissions` only |
| 5 | **Survey / Leak Audit** | Who took it, scores, answers | **GAP** — not stored |
| 6 | **Voice register** | Timestamp, summary/notes (even manual) | **GAP** |
| 7 | **Client progress** (later) | Milestones beyond payment | Not started |
| 8 | **Traffic / Analytics** | GA embed or link-out | Deferred (OK) |

## Minimum booking admin (build next)

1. Table: date/time (visitor + SA), name, company, email, phone, status, email_status  
2. Actions: open detail, **Cancel** (set status `cancelled`, free slot, email client + remove/update Google event if present)  
3. Filter: upcoming / past / cancelled  

## Minimum contact admin

1. Table: received_at, name, email, company, preview, status (`new` / `replied` / `archived`)  
2. Detail view: full message + mailto / WhatsApp  
3. Mark handled  

## Sidebar IA (suggested)

```
01 Payment Generator / Plans
02 Discovery Bookings     ← missing
03 Contact Inbox          ← missing
04 Audit Results          ← later
05 Voice Log              ← later
```

## Do not ship again without

- Admin list for **every** `INSERT` from a public form  
- Cancel path that emails the human who booked  
- Same Resend from-domain as public confirmations  
