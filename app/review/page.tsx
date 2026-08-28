import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, StandardHeader } from "../site-components";
import { ReviewForm } from "./review-form";

export const metadata: Metadata = {
  title: "Review the site | CRM Solutions",
  description:
    "An honest review of the new CRM Solutions website — first impression, content and ease of use. Two minutes, no sign-up.",
  robots: { index: false, follow: true },
};

const LOOK_AT = [
  ["/", "The home page", "The argument the whole business rests on."],
  ["/revenue-platform", "Revenue Platform", "What actually gets built, and what it costs."],
  [
    "/value-of-returning-customer",
    "Value of a Returning Customer",
    "Six sliders and a number. Does the number convince you?",
  ],
  ["/ignatius-ackermann", "My story", "Too long? Too personal? Not personal enough?"],
  ["/work/star-aesthetic", "Star Aesthetic case study", "Does this read as real work?"],
] as const;

export default function ReviewPage() {
  return (
    <main className="review-page" id="top">
      <StandardHeader />

      <section className="review-hero section-shell">
        <div>
          <p className="eyebrow">A personal request</p>
          <h1>
            The site is live. Now I want honest eyes on it<span>.</span>
          </h1>
        </div>
        <div className="review-hero-copy">
          <p>
            You are one of a small number of people I have asked directly. I am not looking for
            encouragement — I have had plenty of that and it has never improved anything.
          </p>
          <p>
            Go and look properly. Find what is unclear, weak, slow or broken, then come back and
            tell me. Two minutes. Nothing is published, nothing is shared, and I read every one
            myself.
          </p>
        </div>
      </section>

      <section className="review-tour section-shell">
        <div className="review-tour-intro">
          <p className="eyebrow">Before you rate it</p>
          <h2>Worth a look, if you have not already.</h2>
          <p>Open a few in new tabs, then come back to this page.</p>
        </div>
        <ul className="review-tour-list">
          {LOOK_AT.map(([href, title, note]) => (
            <li key={href}>
              <Link href={href} target="_blank">
                <strong>
                  {title} <span aria-hidden="true">↗</span>
                </strong>
                <small>{note}</small>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="review-form-section section-shell">
        <ReviewForm />
      </section>

      <SiteFooter />
    </main>
  );
}
