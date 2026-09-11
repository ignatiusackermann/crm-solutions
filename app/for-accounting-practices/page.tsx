import type { Metadata } from "next";
import Link from "next/link";
import { DiscoveryCallSection, SiteFooter, StandardHeader } from "../site-components";
import { StandingStillCalculator } from "./standing-still-calculator";

export const metadata: Metadata = {
  title: "How Many New Clients Does Your Practice Need to Stand Still? | CRM Solutions",
  description:
    "The sum accountants run for their clients and rarely for their own practice. Work out how many new clients you need every year just to stay the same size — your figures, in Rand, in four minutes.",
  openGraph: {
    type: "article",
    locale: "en_ZA",
    url: "https://www.crmsolutions.app/for-accounting-practices",
    siteName: "CRM Solutions",
    title: "How many new clients does your practice need just to stand still?",
    description:
      "What a client is worth over the years they stay, how many leave, and what it costs to replace them.",
  },
  alternates: { canonical: "/for-accounting-practices" },
  robots: { index: true, follow: true },
};

const FORCES = [
  {
    number: "01",
    kicker: "Outside your control",
    title: "SARS is automating the simple return.",
    body: "SARS expected to issue about six million auto-assessments this season, and in July 2026 it extended them to certain provisional taxpayers. The once-a-year individual return is steadily becoming SARS's job.",
    consequence: "The easy fee shrinks every year",
  },
  {
    number: "02",
    kicker: "Inside your control",
    title: "What a client hears between deadlines.",
    body: "For many clients, the only contact all year is a request for documents. When clients are asked why they changed accountants, the answers are slow responses and silence — rarely the fee.",
    consequence: "Same clients, longer relationships",
  },
  {
    number: "03",
    kicker: "Decides everything",
    title: "Whether the next client finds you ready.",
    body: "Most new clients arrive by referral — and then look you up before they phone. A website that lists services above a contact form quietly loses the referral you already earned.",
    consequence: "Referrals that actually convert",
  },
] as const;

const LEVERS = [
  {
    step: "01",
    title: "A year-round contact calendar",
    body: "Six messages a year that ask your clients for nothing: the Budget Speech changes that affect them, the February year-end top-ups, checking an auto-assessment before accepting it, the provisional tax dates. Written once, sent automatically, in your practice's own voice.",
  },
  {
    step: "02",
    title: "Documents that arrive without chasing",
    body: "One checklist per client, one upload link, and reminders on day 1, day 7 and day 14 that stop the moment the file arrives. The October phone calls stop being a partner's job.",
  },
  {
    step: "03",
    title: "An enquiry path that answers in minutes",
    body: "Website and WhatsApp enquiries acknowledged immediately, followed up on a defined schedule and visible to the partner — so a referred prospect never waits until tomorrow.",
  },
] as const;

const SYSTEM_ITEMS = [
  {
    title: "A website that sells the monthly relationship",
    body: "Two or three packages named for who they suit, what is included every month rather than only at year end, and a first step that takes one tap on a phone.",
  },
  {
    title: "Onboarding and document collection",
    body: "A clear first-year journey for every new client, and document requests that follow up on their own — so year one stops being the year you lose money on them.",
  },
  {
    title: "A client journey that keeps in touch",
    body: "The year-round calendar, running automatically, so the client hears from you when something relevant changes — not only when a document is due.",
  },
  {
    title: "One partner scorecard",
    body: "Enquiries, response time, new clients won, clients lost and fees retained in one view — so you fix the most expensive leak first.",
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
    step: "01 / Deposit",
    share: "50%",
    title: "Reserve capacity and begin.",
    body: "Paid once the written scope is accepted. It confirms the engagement, secures scheduled capacity and allows strategy and production to begin.",
  },
  {
    step: "02 / Final payment",
    share: "50%",
    title: "Complete the agreed milestone.",
    body: "Paid at the completion, approval or pre-launch milestone recorded in your project agreement — before final transfer or public launch where applicable.",
  },
] as const;

const FAQ = [
  {
    q: "Why is there no price on this page?",
    a: "Because the honest answer depends on what is actually broken. What is fixed is how you pay: half to begin, half at the agreed completion milestone. The total, the scope and the dates are agreed in writing before a cent is due.",
  },
  {
    q: "We already use practice and accounting software. Does this replace it?",
    a: "No. Your accounting, tax and practice software stays exactly where it is. We build the client-facing side around it — the website, the enquiry path, the reminders and the contact calendar. Where your software already does a step well, we use it rather than duplicate it.",
  },
  {
    q: "Our clients come by referral. Why would a website matter?",
    a: "Because a referred client looks you up before they phone. If what they find is a list of services and a contact form, a good share of those referrals never call. The website does not replace referrals — it stops you losing the ones you have already earned.",
  },
  {
    q: "Are you guaranteeing that clients will stay?",
    a: "No. Client choices cannot be guaranteed and anyone who tells you otherwise is selling something. We commit to the agreed scope, clear milestones, thorough testing and correcting agreed deliverables that do not meet the approved specification.",
  },
  {
    q: "Is this only for large firms?",
    a: "No. It suits established, owner-led practices — from a sole practitioner with a few hundred clients to a multi-partner firm — whose client journey is not yet working as one measurable system. If the arithmetic does not justify the investment, Ignatius will say so on the call.",
  },
] as const;

export default function ForAccountingPracticesPage() {
  return (
    <main className="vrc-page" id="top">
      <StandardHeader />

      <section className="vrc-hero section-shell">
        <div className="vrc-hero-copy">
          <p className="eyebrow">For South African accounting practices</p>
          <h1>
            How many new clients does your practice need just to stand still?
            <em>Most practices have never done the sum<span>.</span></em>
          </h1>
          <p className="vrc-hero-intro">
            You run the numbers for your clients every day. This is the one most practices never
            run for themselves: how many clients leave in a typical year, what each one was worth
            over the years they stayed, and how many you have to win just to stay the same size.
          </p>
          <div className="vrc-hero-actions">
            <a className="vrc-button" href="#calculator">
              Work out your standing-still number
            </a>
            <a className="text-link" href="#forces">
              See what actually moves it <span aria-hidden="true">↓</span>
            </a>
          </div>
          <p className="vrc-microcopy">
            Your figures, in Rand. About four minutes. Nothing is stored and nothing is sent.
          </p>
        </div>

        <div className="vrc-hero-visual" aria-label="The value of a client relationship">
          <div className="vrc-journey-card vrc-journey-first">
            <span>Year one</span>
            <strong>The expensive year</strong>
            <small>
              Onboarding, cleaning up somebody else&rsquo;s books, and hours that never reach the
              invoice.
            </small>
          </div>
          <div className="vrc-journey-line" aria-hidden="true">
            <span />
          </div>
          <div className="vrc-journey-card vrc-journey-second">
            <span>Year three onwards</span>
            <strong>The years that pay</strong>
            <small>The same client and the same work, at a fraction of the effort.</small>
          </div>
        </div>
      </section>

      <section className="vrc-forces" id="forces">
        <div className="section-shell">
          <div className="vrc-heading">
            <p className="eyebrow eyebrow-light">The commercial problem</p>
            <h2>Clients rarely leave over the fee. They leave over the silence.</h2>
            <p>
              A practice is paid in year three, not year one. So the client who quietly moves after
              one tax season is not a small loss — it is most of what that client was ever going to
              be worth. Three forces decide how often that happens.
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
            <p className="eyebrow">The standing-still calculator</p>
            <h2>How many clients do you have to win just to stay the same size?</h2>
          </div>
          <p>
            Move six sliders. It uses only the figures you enter, assumes no result and invents no
            clients. If you do not track your loss rate, count the clients who did not come back
            for last year&rsquo;s return.
          </p>
        </div>

        <StandingStillCalculator />
      </section>

      <section className="vrc-truth section-shell">
        <div>
          <p className="eyebrow">Why the number matters</p>
          <h2>A practice that keeps its clients can afford to win the next one.</h2>
        </div>
        <div className="vrc-truth-copy">
          <p>
            Every client who leaves has to be replaced before the practice grows at all. That is
            the treadmill: referrals, proposals and first meetings spent simply getting back to
            where you were — and then the most expensive year of the relationship, all over again.
          </p>
          <p>
            Keeping a client costs a fraction of winning one. The work is already understood, the
            books are already clean, and the fee arrives without a proposal. Every year a client
            stays is the most profitable year you have had with them.
          </p>
          <p>
            In most practices the relationship between deadlines belongs to nobody. The work has an
            owner. The deadlines have an owner. The eleven months in between have neither, and that
            is where clients decide to leave.
          </p>
        </div>
      </section>

      <section className="vrc-levers section-shell">
        <div className="vrc-heading">
          <p className="eyebrow">Three things that are entirely yours</p>
          <h2>None of them need more marketing.</h2>
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

      <section className="vrc-system section-shell" id="what-we-build">
        <div className="vrc-system-intro">
          <p className="eyebrow">What CRM Solutions builds for practices</p>
          <h2>Not another website to admire. A system the practice can use.</h2>
          <p>
            The website is one part. The commercial value comes from how the whole client journey
            works together — from the first enquiry to the tenth tax return — and how clearly the
            partner can see it.
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
            <h2>Half to begin. Half at completion.</h2>
          </div>
          <p>
            Nothing is due before the scope is agreed in writing, and the second half is not due
            until the work reaches the agreed milestone. Founder-led from the first diagnosis
            through launch — no page-count package, no junior handover, no disappearing once the
            platform is live.
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
          <h2>The questions practice owners actually ask.</h2>
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
        title="You have already earned the hard part."
        body="Book a 60-minute Discovery Call with Ignatius. We will look at your standing-still number, where clients are leaving, and which part of the gap is worth closing first."
      />

      <SiteFooter />
    </main>
  );
}
