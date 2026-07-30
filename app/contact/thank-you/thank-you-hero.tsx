"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CONTACT_THANK_YOU_STORAGE_KEY,
  type ContactThankYouPayload,
} from "../contact-storage";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function ContactThankYouHero() {
  const [payload, setPayload] = useState<ContactThankYouPayload | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(CONTACT_THANK_YOU_STORAGE_KEY);
      if (raw) setPayload(JSON.parse(raw) as ContactThankYouPayload);
    } catch {
      setPayload(null);
    }
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <section className="thank-you-hero section-shell" aria-busy="true">
        <div>
          <p className="eyebrow">Message received</p>
          <h1>
            Thank you
            <span>.</span>
          </h1>
        </div>
      </section>
    );
  }

  const name = payload?.firstName?.trim() || "there";

  return (
    <section className="thank-you-hero section-shell" aria-live="polite">
      <div>
        <p className="eyebrow">Message received</p>
        <h1>
          Thank you, {name}
          <span>.</span>
        </h1>
        <p className="thank-you-lede">
          Your note reached CRM Solutions — and it will be treated with care. A confirmation email is on its way to you.
        </p>
      </div>
      <div className="thank-you-panel">
        <p className="thank-you-copy">
          I read every message personally. You took time to write; I will take time to
          reply with a clear, respectful response — usually within one business day.
        </p>
        <p className="thank-you-copy thank-you-copy-gap">
          {payload?.company
            ? `If ${payload.company} needs a deeper conversation than email allows, a Discovery Call is the calm next step.`
            : "If the constraint is bigger than a short email can cover, a Discovery Call is the calm next step."}
        </p>
        <p className="thank-you-note">
          No pressure. No hard sell. Just a serious conversation about what is costing attention,
          enquiries or revenue — and whether we are the right partner.
        </p>
        <div className="thank-you-actions">
          <Link className="button button-copper" href="/book-discovery-call">
            Book a Discovery Call <Arrow />
          </Link>
          <Link className="thank-you-secondary" href="/contact">
            Send another message
          </Link>
        </div>
      </div>
    </section>
  );
}
