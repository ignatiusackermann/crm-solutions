import type { Metadata } from "next";
import Link from "next/link";
import { DiscoveryCallSection, SiteFooter, StandardHeader } from "../site-components";
import { ReturningCustomerCalculator } from "./returning-customer-calculator";

export const metadata: Metadata = {
  title: "The Value of a Returning Customer | CRM Solutions",
  description:
    "The first sale is the most expensive one you will ever make. Work out what a returning customer is worth in your business — your figures, in Rand, in four minutes.",
  openGraph: {
    type: "article",
    locale: "en_ZA",
    url: "https://www.crmsolutions.app/value-of-returning-customer",
    siteName: "CRM Solutions",
    title: "The Value of a Returning Customer",
    description:
      "What a customer costs, what a customer is worth, and how far apart those two numbers are.",
  },
  alternates: { canonical: "/value-of-returning-customer" },
  robots: { index: true, follow: true },
};

const FORCES = [
  {
    number: "01",
    kicker: "Outside your control",
    title: "The price of attention only moves one way.",
    body: "Search and social advertising are auctions. Every year more businesses bid for the same finite attention, so the clearing price rises. No campaign trick reverses that.",
    consequence: "Your cost per customer rises annually",
  },
  {
    number: "02",
    kicker: "Inside your control",
    title: "What happens after the enquiry arrives.",
    body: "How fast someone responds. How many times they follow up. Whether the enquiry belongs to a person or to an inbox. Most businesses spend nothing improving this.",
    consequence: "Same spend, more customers",
  },
  {
    number: "03",
    kicker: "Decides everything",
    title: "Whether there is anything to buy next.",
    body: "Every sale after the first carries no acquisition cost. That margin is what you get to bid with. A business with no second sale is trying to profit on the most expensive transaction it will ever make.",
    consequence: "You can outbid your market",
  },
] as const;

const LEVERS = [
  {
    step: "01",
    title: "Speed to first contact",
    body: "The difference between replying in minutes and replying tomorrow is not a customer-service detail. It is the largest single conversion variable most businesses have, and it costs nothing to fix.",
  },
  {
    step: "02",
    title: "A follow-up sequence that actually runs",
    body: "Most enquiries are contacted once and then quietly abandoned. A defined, automated, visible sequence recovers opportunities you have already paid for.",
  },
  {
    step: "03",
    title: "A back end worth returning for",
    body: "A second product, a service plan, a reason to come back at the right moment — and where you genuinely sell only one thing, a partner offer that earns on the introduction.",
  },
] as const;

const LOOP = [
  ["Position", "Make the value and the next step unmistakable."],
  ["Attract", "Create relevant demand around real buyer intent."],
  ["Convert", "Turn attention into enquiries, bookings and sales."],
  ["Follow through", "Respond faster and keep every opportunity visible."],
  ["Retain", "Improve repeat business, reviews and referrals."],
  ["Improve", "Measure the journey and act on the next constraint."],
] as const;

const SYSTEM_ITEMS = [
  {
    title: "A website built around the buying decision",
    body: "Pages that answer the real objection, establish credibility and move the right visitor towards an enquiry — instead of describing the company.",
  },
  {
    title: "An enquiry path that never goes quiet",
    body: "Immediate acknowledgement, a defined follow-up sequence and visible ownership, so interested buyers stop disappearing between forms and follow-up.",
  },
  {
    title: "A return journey for customers who already trust you",
    body: "Timed, relevant reasons to buy again — built on what you actually sell, not generic newsletters nobody opens.",
  },
  {
    title: "One owner scorecard",
    body: "Enquiries, response time, conversion, repeat rate and customer value in one view — so you improve the most expensive constraint first.",
  },
] as const;

const PORTFOLIO = [
  {
    name: "Star Aesthetic",
    category: "Doctor-led aesthetic clinic · Durban North",
    statement:
      "Structuring complex treatment choices into a calm, credible patient journey — with original treatment content, clearer pathways and visible clinical leadership.",
    screenshot: "/portfolio/star-aesthetic-desktop.jpg",
    host: "staraesthetic.co.za",
    href: "/work/star-aesthetic",
    external: "https://www.staraesthetic.co.za",
  },
  {
    name: "Lava-SA",
    category: "Specialist commerce",
    statement:
      "Turning a specialist product catalogue into a premium commerce and education platform, where buying confidence is built before the cart.",
    screenshot: "/portfolio/lava-sa-desktop.jpg",
    host: "lava-sa.com",
    href: "/work/lava-sa",
    external: "https://www.lava-sa.com",
  },
] as const;

const PAYMENTS = [
  {
    step: "01 / To begin",
    share: "⅓",
    title: "Reserve capacity and start.",
    body: "Paid once the written scope is accepted. It confirms the engagement, secures scheduled capacity and allows strategy and production to begin.",
  },
  {
    step: "02 / Month two",
    share: "⅓",
    title: "Through the build.",
    body: "Paid thirty days later, while the platform, journeys and connections are being built against the agreed milestones.",
  },
  {
    step: "03 / Month three",
    share: "⅓",
    title: "At completion.",
    body: "Paid sixty days from the start, at the agreed completion or pre-launch milestone recorded in your project agreement.",
  },
] as const;

const FAQ = [
  {
    q: "Why is there no price on this page?",
    a: "Because the honest answer depends on what is actually broken. What is fixed is how you pay: a third to begin, a third at thirty days and a third at sixty days. The total, the scope and the dates are agreed in writing before a cent is due.",
  },
  {
    q: "I already have a website. Does this replace it?",
    a: "Not automatically. We first establish what should stay, what can be connected and where replacing something would genuinely create value. Plenty of engagements keep the existing site and repair what happens after the enquiry.",
  },
  {
    q: "My CRM already sends emails. How is this different?",
    a: "An email tool is one step. We look at the whole line — what the website promises, how quickly an enquiry is answered, how many times it is followed up, what a customer is offered next and whether the owner can see any of it in one place.",
  },
  {
    q: "Are you guaranteeing that customers will come back?",
    a: "No. Customer choices cannot be guaranteed and anyone who tells you otherwise is selling something. We commit to the agreed scope, clear milestones, thorough testing and correcting agreed deliverables that do not meet the approved specification.",
  },
  {
    q: "Is this only for large companies?",
    a: "No. It suits established, owner-led South African businesses with proven demand and a real offer, whose customer journey is not yet working as one measurable system. If the arithmetic does not justify the investment, Ignatius will say so on the call.",
  },
] as const;

export default function ValueOfReturningCustomerPage() {
  return (
    <main className="vrc-page" id="top">
      <StandardHeader />

      <section className="vrc-hero section-shell">
        <div className="vrc-hero-copy">
          <p className="eyebrow">For established South African businesses</p>
          <h1>
            The first sale is the most expensive one you will ever make.
            <em>The profit is in the second<span>.</span></em>
          </h1>
          <p className="vrc-hero-intro">
            Whatever trade you think you are in, the business you actually run is arithmetic: what
            a customer costs you, what a customer is worth to you, and how far apart those two
            numbers are. Everything else is detail.
          </p>
          <div className="vrc-hero-actions">
            <a className="vrc-button" href="#calculator">
              Work out what a returning customer is worth
            </a>
            <a className="text-link" href="#forces">
              See what actually moves the number <span aria-hidden="true">↓</span>
            </a>
          </div>
          <p className="vrc-microcopy">
            Your figures, in Rand. About four minutes. Nothing is stored and nothing is sent.
          </p>
        </div>

        <div className="vrc-hero-visual" aria-label="The value of a customer relationship">
          <div className="vrc-journey-card vrc-journey-first">
            <span>First sale</span>
            <strong>You buy a customer</strong>
            <small>Advertising, time, discounting, effort — all spent before the profit.</small>
          </div>
          <div className="vrc-journey-line" aria-hidden="true">
            <span />
          </div>
          <div className="vrc-journey-card vrc-journey-second">
            <span>Second sale</span>
            <strong>You keep the margin</strong>
            <small>No acquisition cost. This is the money you get to bid with.</small>
          </div>
        </div>
      </section>

      <section className="vrc-forces" id="forces">
        <div className="section-shell">
          <div className="vrc-heading">
            <p className="eyebrow eyebrow-light">The commercial problem</p>
            <h2>You are probably fighting the one number you cannot win.</h2>
            <p>
              Most owners spend their energy trying to pay less for a customer. That is a fight
              against every other business bidding in the same auction, and it gets harder every
              year. The number you can genuinely control sits on the other side of the sale.
            </p>
          </div>

          <div className="vrc-force-grid">
            {FORCES.map((force) => (
              <article key={force.number} className="vrc-force-card">
                <div className="vrc-force-top">
                  <span>{force.kicker}</span>
                  <i aria-hidden="true" />
                </div>
                <h3>{force.title}</h3>
                <p>{force.body}</p>
                <strong>{force.consequence}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="vrc-calculator-section section-shell" id="calculator">
        <div className="vrc-heading vrc-heading-split">
          <div>
            <p className="eyebrow">The returning-customer calculator</p>
            <h2>What is a returning customer actually worth to you?</h2>
          </div>
          <p>
            Move six sliders. It uses only the figures you enter, assumes no result and invents no
            customers. Rounded to the nearest Rand.
          </p>
        </div>

        <ReturningCustomerCalculator />
      </section>

      <section className="vrc-truth section-shell">
        <div>
          <p className="eyebrow">Why the number matters</p>
          <h2>The business that can afford to pay the most for a customer takes the market.</h2>
        </div>
        <div className="vrc-truth-copy">
          <p>
            You do not win an auction by being clever. You win it by being able to pay more than
            anyone else and still make money. A business whose customers come back can pay two or
            three times what its competitor can for exactly the same enquiry — and remain the more
            profitable of the two.
          </p>
          <p>
            That capacity is not decided in the ad account. It is decided by everything that
            happens after the first sale: how the customer is treated, what they are offered next,
            and whether anyone owns the journey between “that went well” and “I should buy again”.
          </p>
          <p>
            In most businesses that journey belongs to nobody. Marketing has an owner. Delivery has
            an owner. The space between them has neither, and it is where the profit is.
          </p>
        </div>
      </section>

      <section className="vrc-levers section-shell">
        <div className="vrc-heading">
          <p className="eyebrow">Three things that are entirely yours</p>
          <h2>None of them require a bigger advertising budget.</h2>
        </div>
        <div className="vrc-lever-list">
          {LEVERS.map((lever) => (
            <article key={lever.step}>
              <span>{lever.step}</span>
              <div>
                <h3>{lever.title}</h3>
                <p>{lever.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="vrc-loop section-shell">
        <div className="vrc-heading">
          <p className="eyebrow">The mechanism</p>
          <h2>One customer. One connected revenue journey.</h2>
          <p>
            More traffic cannot repair a broken journey. The Revenue Loop strengthens every step
            from first attention to a customer who returns and refers.
          </p>
        </div>
        <div className="vrc-loop-list">
          {LOOP.map(([title, body], index) => (
            <div className="vrc-loop-step" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
              <i aria-hidden="true" />
            </div>
          ))}
        </div>
      </section>

      <section className="vrc-system section-shell">
        <div className="vrc-system-intro">
          <p className="eyebrow">What CRM Solutions builds</p>
          <h2>Not another website to admire. A system the business can use.</h2>
          <p>
            The website is one part. The commercial value comes from how the whole journey works
            together — and how clearly the owner can see it.
          </p>
          <a className="text-link" href="#investment">
            See how the engagement works <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="vrc-system-list">
          {SYSTEM_ITEMS.map((item, index) => (
            <article key={item.title}>
              <span>0{index + 1}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="vrc-proof section-shell">
        <div className="vrc-heading">
          <p className="eyebrow">Evidence before claims</p>
          <h2>Built for real South African businesses.</h2>
        </div>
        <div className="vrc-proof-grid">
          {PORTFOLIO.map((project) => (
            <article key={project.name} className="vrc-proof-card">
              <div className="vrc-browser" aria-hidden="true">
                <div className="vrc-browser-bar">
                  <i />
                  <i />
                  <i />
                  <span>{project.host}</span>
                </div>
                <div className="vrc-browser-window">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.screenshot} alt="" />
                </div>
              </div>
              <div className="vrc-proof-copy">
                <div className="vrc-proof-topline">
                  <span>{project.category}</span>
                  <span>Live platform</span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.statement}</p>
                <div className="vrc-proof-links">
                  <Link className="text-link" href={project.href}>
                    Read the case study <span aria-hidden="true">→</span>
                  </Link>
                  <a href={project.external} target="_blank" rel="noreferrer">
                    Visit {project.host} <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="vrc-proof-note">
          We show what was built and why. We do not publish revenue claims without verified client
          data and permission.
        </p>
      </section>

      <section className="vrc-investment section-shell" id="investment">
        <div className="vrc-heading vrc-heading-split">
          <div>
            <p className="eyebrow">The engagement</p>
            <h2>A third to begin. Two monthly thirds.</h2>
          </div>
          <p>
            No large amount leaves your account in one month, and the payments run alongside the
            build rather than ahead of it. Founder-led from the first diagnosis through launch —
            no page-count package, no junior handover, no disappearing once the platform is live.
          </p>
        </div>

        <div className="vrc-payment-timeline">
          {PAYMENTS.map((payment) => (
            <article key={payment.step}>
              <span>{payment.step}</span>
              <strong>{payment.share}</strong>
              <h3>{payment.title}</h3>
              <p>{payment.body}</p>
            </article>
          ))}
        </div>

        <p className="vrc-payment-rule">
          Your accepted proposal always controls the exact total, currency, milestone, due date and
          project-specific terms. Full detail on the{" "}
          <Link href="/payment-options">payment options page</Link>.
        </p>
      </section>

      <section className="vrc-faq section-shell">
        <div>
          <p className="eyebrow">Before you ask</p>
          <h2>The questions business owners actually ask.</h2>
        </div>
        <div className="vrc-faq-list">
          {FAQ.map((item) => (
            <details key={item.q}>
              <summary>
                {item.q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <DiscoveryCallSection
        eyebrow="A focused commercial conversation"
        title="You have already paid for the hard part."
        body="Book a 60-minute Discovery Call with Ignatius. We will look at what a customer costs you, what a customer is worth to you, and which part of the gap is worth closing first."
      />

      <SiteFooter />
    </main>
  );
}
