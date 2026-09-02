# SEND SHEET — Accountant campaign (ZA General 01)

**Email:** `za-general-01-launch.md` — text + HTML, subject A/B split
**Landing page:** https://www.crmsolutions.app/value-of-returning-customer
**Sending domain:** crm-solutions.online
**Lists:** `data-002\phplist-batches-accountant\batch-01.csv` … `batch-06.csv`
**Total:** 1,533 contacts across 6 batches

## Why this list first

Accountants sell the second sale for a living — the annual return, the monthly
bookkeeping, the retainer. The email's argument needs no translation for them.
The data is also the cleanest of the five categories built: **batch-01 is 100%
role addresses** (info@, reception@, accounts@), 275 of 300 on `.co.za`, one
contact per domain, no duplicates anywhere across the six batches.

## Day 0 — before anything sends

- [ ] **SPF** record published for crm-solutions.online
- [ ] **DKIM** signing enabled and verified
- [ ] **DMARC** record published, start at `p=none` and watch reports
- [ ] Send yourself a test to a Gmail address. Open it, view **Show original**,
      and confirm SPF, DKIM and DMARC all read PASS. Do not proceed otherwise.
- [ ] Send a second test to an Outlook/Hotmail address — it is the stricter of
      the two for a new domain
- [ ] Reply-to mailbox exists, is monitored, and is not the same inbox the
      bounces land in
- [ ] `[COMPANY]` attribute created in PHPList, mapped to the CSV `company`
      column, default value "your business"
- [ ] Unsubscribe link renders and actually works — click it on the test
- [ ] Suppression list created, shared across every future category send

## The ramp

Do not open at 300. A brand-new domain sending 300 cold on day one is the
single fastest way to burn it.

| Day | Send | From | Watch for |
|---|---|---|---|
| 1 | **50** | batch-01 rows 1–50 | Bounces. Anything over 5% — stop and diagnose |
| 2 | **100** | batch-01 rows 51–150 | Bounce rate, first replies, any complaint |
| 3 | **200** | batch-01 rows 151–300 + batch-02 rows 1–50 | Same, plus whether Gmail is inboxing |
| 4 | **300** | batch-02 remainder | Now at full daily rate |
| 5+ | **300/day** | batch-03 → batch-06 | Steady state. 1,533 contacts ≈ 6 more days |

Subject split: odd sending days use subject **A** ("The first sale is the most
expensive one you will ever make"), even days use **B** ("What does a new
customer actually cost you?"). Keep the split consistent so the comparison
means something.

## What counts as working

The call to action is the calculator; **the conversion is the reply**. Opens are
the least useful number here and, with no tracking pixel on campaign one, you
will not have them anyway. That is deliberate.

Judge it on:

- **Replies** — the only number that matters. Even "not now" is a live contact.
- **Bounce rate** — under 3% is healthy for directory data, over 5% is a problem
  with the list, not the copy.
- **Complaints** — anything above 0.1% means stop and reconsider the framing.
- **Calculator sessions** — visible in analytics as traffic to
  `/value-of-returning-customer` on send days.

## If it does not work

Do not rewrite the email after one batch. 50 sends tells you nothing. Give it
the full batch-01 (300) before judging, then change **one** thing:

1. Subject line first — cheapest change, biggest effect
2. Then the opening two sentences
3. The argument itself last — it is the part most likely to be right

## After this list

Four more are built and waiting: Legal (2,049), Security (1,265), Restaurants
(1,064), Cleaning (842). Accommodation (3,010 + 6,771 pool) stays on hold.

One suppression list across all of them — an unsubscribe from Accountant must
never receive the Legal send.
