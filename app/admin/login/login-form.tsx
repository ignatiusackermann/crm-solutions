"use client";

import { FormEvent, useState } from "react";

export default function AdminLoginForm({ returnTo }: { returnTo: string }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const form = event.currentTarget;
    const password = String(new FormData(form).get("password") || "");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ password, returnTo }),
      });
      const payload = (await response.json()) as {
        error?: string;
        redirectTo?: string;
      };
      if (!response.ok) {
        throw new Error(payload.error || "Sign-in failed.");
      }
      location.assign(payload.redirectTo || "/admin/payments");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign-in failed.");
      setSubmitting(false);
    }
  }

  return (
    <form className="admin-login-form" onSubmit={onSubmit}>
      <label>
        <span>Password *</span>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          autoFocus
        />
      </label>
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
