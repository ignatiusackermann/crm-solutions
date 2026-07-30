"use client";

import { FormEvent, useState } from "react";

export default function RequestAccessForm() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setDone("");
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") || "").trim();
    try {
      const response = await fetch("/api/client/request-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const payload = (await response.json()) as { error?: string; message?: string };
      if (!response.ok) throw new Error(payload.error || "Request failed.");
      setDone(
        payload.message ||
          "If that email matches an active plan, a new access code is on its way.",
      );
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="client-request-access" onSubmit={onSubmit}>
      <p className="client-request-access-title">Lost your access code?</p>
      <p className="client-request-access-copy">
        Enter the email on your payment plan. We will send a <strong>new</strong> code and
        panel link (the old one stops working).
      </p>
      <label>
        <span>Email on your plan *</span>
        <input name="email" type="email" required autoComplete="email" />
      </label>
      {error ? (
        <p className="admin-error" role="alert">
          {error}
        </p>
      ) : null}
      {done ? (
        <p className="client-request-access-done" role="status">
          {done}
        </p>
      ) : null}
      <button className="thank-you-secondary" type="submit" disabled={submitting}>
        {submitting ? "Sending…" : "Email me a new access code"}
      </button>
    </form>
  );
}
