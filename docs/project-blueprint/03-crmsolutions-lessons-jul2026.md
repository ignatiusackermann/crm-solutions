# 03 — Lessons from crmsolutions.app (Jul 2026)

Painful, expensive-to-repeat mistakes. Read before starting the next site.

## 1. Resend domain left “Not Started”

- cPanel mailboxes (`payments@`, `bookings@`) were created → felt “done”
- Resend still could not send until **Domains → Verified**
- Symptom: bookings saved, **zero rows** in Resend, empty inboxes
- Fix locked in SOP: `docs/sop-resend-email.md` + pre-launch gate

## 2. Confusing FROM vs TO verification

- People assumed every recipient domain must be verified  
- Truth: verify **sending** domain only (`crmsolutions.app`)

## 3. Thank-you UX under the wrong page

- Discovery confirmation sat under “Book a Discovery Call” (navy-on-black)  
- Felt broken and ungrateful  
- Pattern: dedicated `/…/thank-you` with personal hero

## 4. Contact thank-you email missing

- Admin got the lead; submitter got silence  
- Always send **both** admin alert + client thank-you

## 5. Admin only built for payments

- Contact + Discovery written to DB with no operator UI  
- Founder hunting Roundcube / Resend is not a workflow  
- Blueprint: admin module per form type

## 6. Turnstile only on some forms

- Contact + client login protected; Discovery final step not  
- Align spam protection across all high-value forms before traffic

## 7. Survey / voice deferred without a backlog note

- Fine to defer for outbound  
- Not fine to “forget” — keep on pre-launch / post-launch gap list

## Time cost

Most of a launch week was spent **tightening loose ends** that a blueprint checklist would have caught in an afternoon. This folder exists so the next project starts with the gate, not the autopsy.
