# Video 00 — DebtReliefBiz: Sandy's walkthrough (the main body)

**First in the campaign** (decided 18 Nov 2026): it is for sale, needs no client's
permission, and every view is a potential buyer (an NCR-registered debt counsellor).

## How these videos are built (the Shades of Blue /site-info idea)

1. **Opening scene** (5–8 s) — the hook, made once per video.
2. **Main body** — the site's own voice agent walks the viewer through the live site,
   and the page scrolls with her, exactly like "Meet Blue" on shadesobl.co.za/site-info.
   This is a screen recording with the agent's own voice. Same recording, two shapes:
   desktop (16:9) and mobile (9:16).
3. **Closing scene** (5–10 s) — the subtle CRM Solutions CTA: *Book a Discovery Call.*

The same body recording is also embedded at the bottom of the site's /site-info page
(noindex, shared with owners only).

## Lengths

| Where | Format | Total | Opening | **Body** | Closing |
|---|---|---|---|---|---|
| WhatsApp Status (max 60 s per clip) | 9:16 | 60 s | 5 s | **≈ 50 s** | 5 s |
| Instagram / Facebook Reels, TikTok | 9:16 | 60 s | same file as WhatsApp | | |
| YouTube, LinkedIn | 16:9 | ≈ 2:30 | 8 s | **≈ 2:10** | 10 s |
| /site-info page (owners) | 16:9 + 9:16 | — | — | **the long body** | — |

So each site needs **two body scripts**: short (≈ 50 s, about 105 spoken words) and
long (≈ 2:10, about 290 words), each recorded on desktop and on mobile.

The viewer is a **debt counsellor**, so Sandy speaks to them about *their* practice:
the moment first, the pain briefly, features only as proof. No prices.

---

## Short body — ≈ 50 s (portrait: WhatsApp, Reels, TikTok)

| # | Page / section shown | Sandy says (live, in her own voice) |
|---|---|---|
| 1 | Home hero, Sandy's card glowing | "Hi, I'm Sandy. I work for a debt counselling practice, and I never sleep." |
| 2 | Hero → "Talk to Sandy now" | "At two in the morning, when someone is too ashamed to phone, they talk to me instead, in their own words." |
| 3 | /qualify — the 2-minute check | "I explain debt review without judgement, help them check if it could work for them," |
| 4 | Call-back confirmation | "and book a call-back with a registered counsellor for the morning." |
| 5 | /upload — secure documents | "Their payslips and statements arrive through a secure link. Nobody chases paperwork." |
| 6 | /members — client portal, 58% paid | "And every month, clients see their balances falling, so they stay the course." |
| 7 | Admin CRM, leads list | "Your team sees every lead and every milestone in one place." |
| 8 | Hero with "NCR registered" line | "Your name, your NCR number, ready in days." |

≈ 100 words.

## Long body — ≈ 2:10 (landscape: YouTube, LinkedIn, /site-info)

| # | Page / section shown | Sandy says |
|---|---|---|
| 1 | Home hero | "Hello, I'm Sandy, the voice assistant built into this debt counselling practice. Let me show you around, and the page will move along with me." |
| 2 | Hero headline "There is a way out" | "Most debt counselling websites are a form and an office number. But people in debt look for help late at night, alone, and often ashamed. A form at two in the morning sends them back to bed with nothing." |
| 3 | Sandy's card → talking | "So the first thing they meet is me. They can talk out loud, in their own words, with no judgement. I explain what debt review means, what it costs them, and what happens to their credit record." |
| 4 | /qualify | "If they would rather type, there's a two-minute check. It tells them whether debt review could help before anyone asks for their ID number." |
| 5 | Call-back booking / confirmation | "Then I book a free call-back with a registered counsellor. When your counsellor phones the next morning, the summary of our conversation is already waiting." |
| 6 | /upload | "Documents arrive through a secure upload link: payslips, statements, ID. Reminders go out on their own and stop the moment the file arrives." |
| 7 | /members — client portal | "Debt review lasts years. In the client portal, every client sees their payments, their balances falling, and the next milestone. Clients who can see progress stay the course." |
| 8 | /how-it-works and /testimonials | "Plain-language pages explain the process step by step, and real stories show that it works." |
| 9 | Admin CRM | "Behind the scenes, your team has a CRM for the whole journey: every lead, call-back, application and milestone, with a reminder for each deadline." |
| 10 | /calculator | "And for the practice itself, a calculator shows what one cancelled client really costs you." |
| 11 | Header: NCR number, phone, WhatsApp | "Everything carries your practice's name, your NCR registration and your own phone numbers. It is ready to launch in days, not months." |
| 12 | Back to hero | "Picture the next frightened caller finding your practice at two in the morning, and being helped." |

≈ 290 words.

---

## Recording plan (next step)

- **Voice:** Sandy's own live voice (the same voice and model as on the site), driven
  line by line from this script, like Blue's tour. This uses the live voice service,
  not the text-to-speech service whose free daily limit ran out on 18 Nov.
- **Picture:** the recorder in `scripts/video/` scrolls to each section as Sandy reaches
  its line, so voice and page stay in step. Desktop 1920×1080 and mobile 1080×1920.
- **Demo data only:** the client portal uses the demo account; the CRM shows demo leads.
  No real person's details on screen.
- **Note:** debtreliefbiz.co.za/site-info returns 404 on the live site (it exists in the
  code), so the embed needs a DebtReliefBiz deploy. That work belongs in the TDRG
  project, in its own session.
