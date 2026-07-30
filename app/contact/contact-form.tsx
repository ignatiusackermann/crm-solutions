"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { CONTACT_THANK_YOU_STORAGE_KEY } from "./contact-storage";

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

export default function ContactForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const firstName = String(data.firstName || "").trim();
    const company = String(data.company || "").trim();

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          turnstileToken: siteKey
            ? (document.querySelector(
                '[name="cf-turnstile-response"]',
              ) as HTMLInputElement | null)?.value
            : undefined,
        }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(payload.error || "Message could not be sent.");

      sessionStorage.setItem(
        CONTACT_THANK_YOU_STORAGE_KEY,
        JSON.stringify({ firstName, company: company || undefined }),
      );
      router.push("/contact/thank-you");
      return;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Message could not be sent.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="contact-grid">
        <label>
          <span>First name *</span>
          <input name="firstName" required autoComplete="given-name" />
        </label>
        <label>
          <span>Surname *</span>
          <input name="lastName" required autoComplete="family-name" />
        </label>
        <label>
          <span>Email *</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label>
          <span>Phone / WhatsApp</span>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <label className="form-wide">
          <span>Company</span>
          <input name="company" autoComplete="organization" />
        </label>
        <label className="form-wide">
          <span>How can I help? *</span>
          <textarea name="message" rows={6} required minLength={10} />
        </label>
      </div>
      {siteKey ? (
        <div
          className="cf-turnstile"
          data-sitekey={siteKey}
          data-theme="light"
        />
      ) : null}
      {error ? (
        <p className="admin-error" role="alert">
          {error}
        </p>
      ) : null}
      <button className="button button-primary" disabled={submitting} type="submit">
        {submitting ? "Sending…" : "Send message"} <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
