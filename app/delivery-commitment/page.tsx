import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, StandardHeader } from "../site-components";

export const metadata: Metadata = {
  title: "Our Delivery Commitment | CRM Solutions",
  description:
    "The standards CRM Solutions commits to across scope, quality, communication, testing, correction and 90-day launch support.",
};

export default function DeliveryCommitmentPage() {
  return (
    <main className="legal-page">
      <StandardHeader />
      <section className="legal-hero commitment-hero section-shell">
        <p className="eyebrow">Confidence without inflated promises</p>
        <h1>Our Delivery Commitment<span>.</span></h1>
        <p>Effective 23 July 2026 · A practical commitment to the work we control.</p>
      </section>

      <article className="legal-document section-shell">
        <aside>
          <strong>On this page</strong>
          <a href="#commitment">The commitment</a>
          <a href="#correction">Correction standard</a>
          <a href="#communication">Communication &amp; testing</a>
          <a href="#support">90-day support</a>
          <a href="#boundaries">Clear boundaries</a>
          <a href="#raise">Raise a concern</a>
        </aside>

        <div className="legal-copy">
          <section id="commitment">
            <h2>1. What CRM Solutions commits to</h2>
            <p>
              CRM Solutions commits to delivering the agreed Revenue Platform or other
              professional services to the scope, milestones and quality standard recorded
              in the accepted proposal or project agreement.
            </p>
            <p>
              You will receive direct senior involvement, clear decision points, honest
              progress communication and a tested handover. If an agreed deliverable does
              not meet its approved written specification, CRM Solutions will correct that
              deliverable at no additional professional fee.
            </p>
          </section>

          <section>
            <h2>2. A controlled delivery standard</h2>
            <ul>
              <li>Commercial objectives and scope are recorded before production begins.</li>
              <li>Important strategy, design and functionality decisions are presented for approval.</li>
              <li>Milestones, responsibilities and dependencies remain visible throughout the engagement.</li>
              <li>The agreed experience is reviewed across appropriate desktop and mobile layouts.</li>
              <li>Critical forms, journeys, integrations and payment or booking actions are tested before launch.</li>
              <li>Known material limitations are disclosed rather than hidden behind marketing language.</li>
            </ul>
          </section>

          <section id="correction">
            <h2>3. The correction commitment</h2>
            <p>
              Where an agreed deliverable materially differs from the approved written
              specification, CRM Solutions will investigate and correct the difference
              without charging an additional professional fee.
            </p>
            <p>
              This commitment covers correction of the agreed work. It does not convert a
              fixed scope into unlimited revisions, introduce new functionality, or cover a
              later change in preference, strategy, content, regulation or business
              requirement.
            </p>
          </section>

          <section id="communication">
            <h2>4. Communication, review and handover</h2>
            <p>
              CRM Solutions will identify the information, access, content and approvals
              required from the client. Review points will be used to confirm direction
              before dependent work continues.
            </p>
            <p>
              Before launch or final transfer, the agreed platform will receive a practical
              quality review. The client will also be given a reasonable opportunity to
              review the agreed deliverables and report material specification gaps.
            </p>
          </section>

          <section id="support">
            <h2>5. 90-Day Launch Support</h2>
            <p>
              For Revenue Platform engagements, CRM Solutions remains involved for 90
              calendar days after the agreed launch date, unless the project agreement
              records a different support period.
            </p>
            <p>During this period, launch support includes:</p>
            <ul>
              <li>investigating defects in the agreed CRM Solutions deliverables;</li>
              <li>correcting confirmed defects covered by the approved scope;</li>
              <li>reviewing available early performance signals and material journey friction; and</li>
              <li>helping the client establish a practical improvement priority list.</li>
            </ul>
            <p>
              Launch support is not an ongoing maintenance plan, marketing retainer or
              promise of unlimited development. New work can be scoped separately or
              continued through Growth Stewardship.
            </p>
          </section>

          <section id="boundaries">
            <h2>6. Clear boundaries</h2>
            <p>
              CRM Solutions does not guarantee leads, search rankings, sales, revenue,
              profit or another commercial outcome. Those results also depend on the
              market, offer, pricing, reputation, media investment, sales follow-up,
              operating capacity and client decisions.
            </p>
            <p>The commitment does not cover:</p>
            <ul>
              <li>delays caused by late content, access, feedback, approvals or payment;</li>
              <li>new scope or changes requested after approval;</li>
              <li>client, staff or third-party changes made outside the agreed process;</li>
              <li>hosting, software, API, payment, email, search, social or other third-party outages and policy changes;</li>
              <li>issues caused by unsupported devices, software or services not included in the agreement; or</li>
              <li>force majeure and circumstances reasonably beyond CRM Solutions&apos; control.</li>
            </ul>
          </section>

          <section>
            <h2>7. The project agreement remains decisive</h2>
            <p>
              This page explains the general CRM Solutions delivery standard. The accepted
              proposal or project agreement records the exact scope, acceptance criteria,
              review periods, support, exclusions and remedies for a particular engagement.
              If the documents conflict, the signed project agreement takes priority.
            </p>
            <p>
              This commitment should be read with the{" "}
              <Link href="/terms-and-conditions">Terms &amp; Conditions</Link> and{" "}
              <Link href="/payment-options">Payment Options</Link>.
            </p>
          </section>

          <section id="raise">
            <h2>8. Raising a concern</h2>
            <p>
              If you believe an agreed deliverable does not meet its approved
              specification, identify the deliverable, the relevant written requirement
              and the problem observed. CRM Solutions will acknowledge the concern,
              investigate it and explain the proposed resolution.
            </p>
            <p>
              Contact:{" "}
              <a href="/contact">Contact page</a>
              .
            </p>
          </section>

          <p className="legal-review-note">
            This is a practical commercial draft. The final commitment and project
            agreement should be reviewed by a South African legal professional before
            public commercial launch.
          </p>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
