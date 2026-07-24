"use client";
import { useEffect, useState } from "react";

type Instalment = {
  id: string;
  sequence: number;
  label: string;
  amountCents: number;
  dueDescription: string;
  status: string;
  paidAt: string | null;
};

type Plan = {
  reference: string;
  title: string;
  description: string;
  currency: string;
  totalAmountCents: number;
  client: {
    firstName: string;
    lastName: string;
    company: string | null;
    email: string;
  };
  installments: Instalment[];
  paypalReady: boolean;
  accessToken?: string | null;
};

const money = (c: number, x: string) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: x }).format(c / 100);

export default function PaymentPanel() {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paying, setPaying] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const t = q.get("token") || "";
    setToken(t);
    if (q.get("payment") === "success") setMessage("Payment confirmed. Thank you.");
    if (q.get("payment") === "cancelled") setMessage("The PayPal payment was cancelled.");

    const url = t
      ? `/api/client/payment-plan?token=${encodeURIComponent(t)}`
      : "/api/client/payment-plan";

    fetch(url, { cache: "no-store", credentials: "same-origin" })
      .then(async (r) => {
        const d = (await r.json()) as { plan?: Plan; error?: string };
        if (!r.ok || !d.plan) {
          throw new Error(d.error || "Panel could not be opened.");
        }
        setPlan(d.plan);
        if (d.plan.accessToken) setToken(d.plan.accessToken);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function pay(id: string) {
    setPaying(id);
    setError("");
    try {
      const r = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ token: token || undefined, installmentId: id }),
      });
      const d = (await r.json()) as { approvalUrl?: string; error?: string };
      if (!r.ok || !d.approvalUrl) {
        throw new Error(d.error || "PayPal could not be opened.");
      }
      location.assign(d.approvalUrl);
    } catch (x) {
      setError(x instanceof Error ? x.message : "PayPal could not be opened.");
      setPaying("");
    }
  }

  if (loading) {
    return (
      <section className="client-panel-state">
        <i />
        <p>Opening your secure payment panel…</p>
      </section>
    );
  }

  if (!plan && error) {
    return (
      <section className="client-panel-state client-panel-help">
        <p className="eyebrow">Private client access</p>
        <h1>
          {error.includes("Sign in")
            ? "Sign in to continue"
            : "This link may no longer be active"}
          <span>.</span>
        </h1>
        <p>
          {error ||
            "Your personalised access link is included in the payment email from CRM Solutions."}
        </p>
        <a className="button button-primary" href="/client/login">
          Client login <span>↗</span>
        </a>
        <a className="text-link" href="/contact">
          Request assistance <span>↗</span>
        </a>
      </section>
    );
  }

  if (!plan) return null;

  const paid = plan.installments
    .filter((i) => i.status === "paid")
    .reduce((s, i) => s + i.amountCents, 0);
  const next = plan.installments.find((i) => i.status !== "paid");

  return (
    <div className="client-payment-shell">
      <section className="client-payment-welcome">
        <div>
          <p className="eyebrow">Welcome, {plan.client.firstName}</p>
          <h1>
            Your payment plan
            <span>.</span>
          </h1>
          <p>
            {plan.client.company || `${plan.client.firstName} ${plan.client.lastName}`} ·{" "}
            {plan.reference}
          </p>
        </div>
        <div className="client-payment-total">
          <span>Agreed investment</span>
          <strong>{money(plan.totalAmountCents, plan.currency)}</strong>
          <small>
            {money(paid, plan.currency)} paid ·{" "}
            {money(plan.totalAmountCents - paid, plan.currency)} remaining
          </small>
        </div>
      </section>
      {message ? <p className="payment-message">{message}</p> : null}
      {error ? <p className="admin-error">{error}</p> : null}
      <section className="client-engagement">
        <div>
          <span>Engagement</span>
          <h2>{plan.title}</h2>
        </div>
        <p>{plan.description}</p>
      </section>
      <section className="client-installments">
        <div className="client-installment-heading">
          <p className="eyebrow">Agreed payments</p>
          <span>Processed securely by PayPal</span>
        </div>
        {plan.installments.map((i) => (
          <article
            className={
              i.status === "paid" ? "paid" : next?.id === i.id ? "next" : ""
            }
            key={i.id}
          >
            <span>0{i.sequence}</span>
            <div>
              <small>{i.label}</small>
              <strong>{i.dueDescription}</strong>
            </div>
            <b>{money(i.amountCents, plan.currency)}</b>
            {i.status === "paid" ? (
              <em>
                Paid
                {i.paidAt ? ` · ${new Date(i.paidAt).toLocaleDateString()}` : ""}
              </em>
            ) : next?.id === i.id ? (
              <button
                disabled={!plan.paypalReady || paying === i.id}
                onClick={() => pay(i.id)}
              >
                {paying === i.id
                  ? "Opening PayPal…"
                  : plan.paypalReady
                    ? "Pay securely with PayPal ↗"
                    : "PayPal activation pending"}
              </button>
            ) : (
              <em>Follows previous payment</em>
            )}
          </article>
        ))}
      </section>
      <section className="client-security-note">
        <strong>Your payment remains on PayPal.</strong>
        <p>
          CRM Solutions does not receive your PayPal password or complete card
          credentials. Keep this access confidential.
        </p>
        <a href="/terms-and-conditions">Terms</a>
        <a href="/privacy-policy">Privacy</a>
      </section>
    </div>
  );
}
