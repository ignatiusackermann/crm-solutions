"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const RATINGS = [
  {
    name: "ratingFirstImpression",
    label: "First impression",
    hint: "The first few seconds. Did it look like a business you would trust?",
  },
  {
    name: "ratingContent",
    label: "Content and message",
    hint: "Was it clear what CRM Solutions does and who it is for?",
  },
  {
    name: "ratingUsability",
    label: "Ease of use",
    hint: "Finding your way around, on whatever device you are holding.",
  },
] as const;

const QUESTIONS = [
  {
    name: "unclear",
    label: "Anything unclear or confusing?",
    hint: "A sentence that did not land, a word that made you pause, a page you could not find.",
  },
  {
    name: "broken",
    label: "Anything broken or not working?",
    hint: "A link that went nowhere, something that looked wrong on your phone, text overlapping.",
  },
  {
    name: "calculator",
    label: "The returning-customer calculator — did the number make sense?",
    hint: "It is on the Value of a Returning Customer page. Move the sliders and see if you believe the answer.",
  },
  {
    name: "wouldContact",
    label: "What would make you more likely to get in touch?",
    hint: "Or, honestly, what would put you off.",
  },
] as const;

function Stars({ name }: { name: string }) {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(0);
  const active = hover || value;

  return (
    <div className="review-stars" onMouseLeave={() => setHover(0)}>
      <input type="hidden" name={name} value={value || ""} />
      {[1, 2, 3, 4, 5].map((score) => (
        <button
          key={score}
          type="button"
          className={score <= active ? "is-on" : undefined}
          onClick={() => setValue(score)}
          onMouseEnter={() => setHover(score)}
          aria-label={`${score} out of 5`}
          aria-pressed={score === value}
        >
          <span aria-hidden="true">★</span>
        </button>
      ))}
      <span className="review-stars-value">{value ? `${value}/5` : "Not rated"}</span>
    </div>
  );
}

export function ReviewForm() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    const form = event.currentTarget;
    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "The review could not be sent.");
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "The review could not be sent.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="review-done" role="status">
        <p className="eyebrow">Received</p>
        <h2>Thank you — genuinely.</h2>
        <p>
          That is more useful to me than any analytics dashboard. I read every one of these myself,
          and if you left your name or email I will reply to you personally.
        </p>
        <Link className="text-link" href="/">
          Back to the site <span aria-hidden="true">→</span>
        </Link>
      </div>
    );
  }

  return (
    <form className="review-form" onSubmit={submit}>
      <fieldset>
        <legend>
          <span>01</span> Rate the experience
        </legend>
        {RATINGS.map((item) => (
          <div className="review-rating-row" key={item.name}>
            <div>
              <strong>{item.label}</strong>
              <small>{item.hint}</small>
            </div>
            <Stars name={item.name} />
          </div>
        ))}
      </fieldset>

      <fieldset>
        <legend>
          <span>02</span> Tell me what you found
        </legend>
        <p className="review-optional">Every box below is optional. One honest sentence beats none.</p>
        {QUESTIONS.map((item) => (
          <label className="review-question" key={item.name}>
            <span>{item.label}</span>
            <small>{item.hint}</small>
            <textarea name={item.name} rows={3} />
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>
          <span>03</span> Who is this from? <em>Optional</em>
        </legend>
        <div className="review-grid">
          <label>
            <span>Your name</span>
            <input name="name" autoComplete="name" />
          </label>
          <label>
            <span>How do we know each other?</span>
            <input name="relationship" placeholder="Former colleague, client, friend…" />
          </label>
          <label>
            <span>Email, if you would like a reply</span>
            <input name="email" type="email" autoComplete="email" />
          </label>
        </div>
        {/* Honeypot — hidden from people, irresistible to bots. */}
        <input
          className="review-hp"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      </fieldset>

      {error ? (
        <p className="admin-error" role="alert">
          {error}
        </p>
      ) : null}

      <div className="review-submit">
        <button className="button button-copper" disabled={submitting}>
          {submitting ? "Sending…" : "Send my review"} <span aria-hidden="true">↗</span>
        </button>
        <small>No sign-up. Nothing shared publicly. It goes straight to Ignatius.</small>
      </div>
    </form>
  );
}
