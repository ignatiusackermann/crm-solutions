"use client";

import { FormEvent, useState } from "react";

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

export default function ClientLoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/client/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          ...data,
          turnstileToken: siteKey
            ? (document.querySelector(
                '[name="cf-turnstile-response"]',
              ) as HTMLInputElement | null)?.value
            : undefined,
        }),
      });
      const payload = (await response.json()) as {
        error?: string;
        redirectTo?: string;
      };
      if (!response.ok) {
        throw new Error(payload.error || "Sign-in failed.");
      }
      location.assign(payload.redirectTo || "/client/payment");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed.");
      setSubmitting(false);
    }
  }

  return (
    <form className="client-login-form" onSubmit={onSubmit}>
      <label>
        <span>Email *</span>
        <input name="email" type="email" required autoComplete="username" />
      </label>
      <label>
        <span>Temporary access code *</span>
        <input
          name="accessCode"
          required
          autoComplete="one-time-code"
          placeholder="XXXX-XXXX"
        />
      </label>
      {siteKey ? (
        <div className="cf-turnstile" data-sitekey={siteKey} data-theme="light" />
      ) : null}
      {error ? (
        <p className="admin-error" role="alert">
          {error}
        </p>
      ) : null}
      <button className="button button-primary" disabled={submitting} type="submit">
        {submitting ? "Signing in…" : "Continue"}{" "}
        <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
