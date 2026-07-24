# Stress-test client payment flow (PayPal bypassed)

## 1. Enable bypass in Vercel
Add env var:
- `PAYMENT_TEST_BYPASS` = `true`
- Keep `PAYPAL_ENV` = `sandbox` (bypass refuses to run when `live`)

Redeploy after saving.

## 2. Test clients CSV
File: `docs/stress-test-clients.csv`

Emails are the temporary `@itools24.co.za` mailboxes from cPanel.

## 3. Run one client through admin
1. Open `/admin/login` → `/admin/payments`
2. Create a plan using a CSV row (name, surname, email, phone)
3. Confirm Resend status: email sent
4. Open the mailbox → check template look + access code
5. Sign in at `/client/login`
6. Click **Confirm test payment** (no PayPal)
7. Confirm installment shows Paid in the panel and in admin plans list

## 4. After testing
Set `PAYMENT_TEST_BYPASS` = `false` (or delete it) before real clients pay.
