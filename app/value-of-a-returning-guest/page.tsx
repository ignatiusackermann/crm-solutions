import type { Metadata } from "next";
import Link from "next/link";
import { DiscoveryCallSection, SiteFooter, StandardHeader } from "../site-components";
import { ReturningGuestCalculator } from "./returning-guest-calculator";

export const metadata: Metadata = {
  title: "The Value of a Returning Guest | CRM Solutions",
  description:
    "A returning guest books direct and costs you no commission. Work out what that is worth in your establishment — your figures, in Rand, in four minutes.",
  openGraph: {
    type: "article",
    locale: "en_ZA",
    url: "https://www.crmsolutions.app/value-of-a-returning-guest",
    siteName: "CRM Solutions",
    title: "The Value of a Returning Guest",
    description:
      "What a guest costs you, what a guest is worth to you, and how far apart those two numbers are.",
  },
  alternates: { canonical: "/value-of-a-returning-guest" },
  robots: { index: true, follow: true },
};

const FORCES = [
  {
    kicker: "Outside your control",
    title: "The commission is not going to fall.",
    body: "The booking platforms set the rate, and they have never set it lower. Every year more establishments compete for the same searches, so the cost of appearing above them rises too.",
    consequence: "Your cost per new guest rises annually",
  },
  {
    kicker: "Inside your control",
    title: "What happens between enquiry and arrival.",
    body: "How fast a direct enquiry is answered. Whether it is followed up at all. Whether booking direct is obviously easier than booking through a platform. Most establishments spend nothing here.",
    consequence: "Same exposure, more direct bookings",
  },
  {
    kicker: "Decides everything",
    title: "Whether the guest ever comes back.",
    body: "A returning guest books direct, needs no commission and no advertising, and already knows they like the place. That stay is the most profitable revenue in hospitality — and the most commonly forgotten.",
    consequence: "Full margin, zero acquisition cost",
  },
] as const;

const LEVERS = [
  {
    step: "01",
    title: "Answer the direct enquiry first",
    body: "A guest who emails you directly has already chosen not to book through a platform. Replying within minutes rather than the next morning is the cheapest commission saving available to any establishment.",
  },
  {
    step: "02",
    title: "Make booking direct visibly better",
    body: "Not a price war with the platforms — a reason. A late checkout, a bottle on arrival, the room they liked last time. Something the platform cannot offer, stated plainly on your own website.",
  },
  {
    step: "03",
    title: "Remember the guest at the right moment",
    body: "Most establishments never contact a past guest again. A timed, relevant note before the season they last visited turns a one-off stay into a returning one — at no acquisition cost whatsoever.",
  },
] as const;

const LOOP = [
  ["Position", "Make the establishment and the reason to choose it unmistakable."],
  ["Attract", "Earn the searches that matter, on your own site as well as the platforms."],
  ["Convert", "Turn interest into a direct enquiry and a confirmed booking."],
  ["Follow through", "Answer faster, confirm clearly, and let no enquiry go quiet."],
  ["Retain", "Give every past guest a reason and a moment to return."],
  ["Improve", "Measure direct share, return rate and commission, then fix the worst one."],
] as const;

const SYSTEM_ITEMS = [
  {
    title: "A website that earns the direct booking",
    body: "Rooms, rates and availability presented well enough that a guest comparing you against your own platform listing chooses to book with you instead.",
  },
  {
    title: "An enquiry path that never goes quiet",
    body: "Immediate acknowledgement, a defined follow-up sequence and visible ownership, so direct enquiries stop dissolving into an unwatched inbox.",
  },
  {
    title: "A return journey for guests who already liked it",
    body: "Timed, seasonal, relevant reasons to come back, built on who actually stayed — not a monthly newsletter nobody opens.",
  },
  {
    title: "One owner scorecard",
    body: "Direct share, commission paid, response time, return rate and guest value in one view — so you improve the most expensive constraint first.",
  },
] as const;

const PORTFOLIO = [
  {
    name: "Star Aesthetic",
    category: "Doctor-led clinic · Durban North",
    statement:
      "Structuring complex treatment choices into a calm, credible booking journey — original content, clearer pathways and visible clinical leadership.",
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
    q: "Are you telling me to leave the booking platforms?",
    a: "No. They are excellent at reaching a guest who has never heard of you, and that is worth paying for. The argument is about the second stay: once a guest has stayed and liked it, continuing to pay commission to reach them again is a choice, not a necessity.",
  },
  {
    q: "Why is there no price on this page?",
    a: "Because the honest answer depends on what is actually broken. What is fixed is how you pay: half to begin, half at the agreed completion milestone. The total, the scope and the dates are agreed in writing before a cent is due.",
  },
  {
    q: "I already have a website and a booking engine. Does this replace them?",
    a: "Not automatically. We first establish what should stay, what can be connected and where replacing something would genuinely create value. Plenty of engagements keep the existing booking engine and repair everything around it.",
  },
  {
    q: "Are you guaranteeing that guests will come back?",
    a: "No. Guest choices cannot be guaranteed and anyone who tells you otherwise is selling something. We commit to the agreed scope, clear milestones, thorough testing and correcting agreed deliverables that do not meet the approved specification.",
  },
  {
    q: "My place is small. Is this only for hotels?",
    a: "No. It suits established, owner-run establishments with real demand and a reputation worth building on. A twelve-room guest house with a 40% return rate is a better business than a hotel with none. If the arithmetic does not justify the investment, Ignatius will say so on the call.",
  },
] as const;

export default function ValueOfAReturningGuestPage() {
  return (
    <main className="vrc-page" id="top">
      <StandardHeader />

      <section className="vrc-hero section-shell">
        <div className="vrc-hero-copy">
          <p className="eyebrow">For established South African guest houses, lodges and hotels</p>
          <h1>
            You pay commission to meet a guest once.
            <em>Then you pay it again<span>.</span></em>
          </h1>
          <p className="vrc-hero-intro">
            The first booking is the most expensive one you will ever take. A guest who comes back
            and books direct costs you nothing to reach — which makes your return rate, not your
            rate card, the number that decides how profitable the establishment is.
          </p>
          <div className="vrc-hero-actions">
            <a className="vrc-button" href="#calculator">
              Work out what a returning guest is worth
            </a>
            <a className="text-link" href="#forces">
              See what actually moves the number <span aria-hidden="true">↓</span>
            </a>
          </div>
          <p className="vrc-microcopy">
            Your figures, in Rand. About four minutes. Nothing is stored and nothing is sent.
          </p>
        </div>

        <div className="vrc-hero-visual" aria-label="The value of a guest relationship">
          <div className="vrc-journey-card vrc-journey-first">
            <span>First stay</span>
            <strong>You buy the guest</strong>
            <small>Commission, listing fees, advertising — paid before you meet them.</small>
          </div>
          <div className="vrc-journey-line" aria-hidden="true">
            <span />
          </div>
          <div className="vrc-journey-card vrc-journey-second">
            <span>Second stay</span>
            <strong>You keep the whole margin</strong>
            <small>Booked direct. No commission, no advertising, no acquisition cost at all.</small>
          </div>
        </div>
      </section>

      <section className="vrc-forces" id="forces">
        <div className="section-shell">
          <div className="vrc-heading">
            <p className="eyebrow eyebrow-light">The commercial problem</p>
            <h2>You are probably fighting the one number you cannot win.</h2>
            <p>
              Most owners spend their energy trying to pay less to reach a new guest. That is a
              fight against the platforms and every other establishment on them, and it gets
              harder every season. The number you can genuinely control sits after checkout.
            </p>
          </div>

          <div className="vrc-force-grid">
            {FORCES.map((force, index) => (
              <article key={force.kicker} className="vrc-force-card">
                <div className="vrc-force-top">
                  <span>{force.kicker}</span>
                  <i aria-hidden="true" />
                </div>
                <h3>{force.title}</h3>
                <p>{force.body}</p>
                <strong>{force.consequence}</strong>
                <span className="sr-only">Point {index + 1} of 3</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="vrc-calculator-section section-shell" id="calculator">
        <div className="vrc-heading vrc-heading-split">
          <div>
            <p className="eyebrow">The returning-guest calculator</p>
            <h2>What is a returning guest actually worth to you?</h2>
          </div>
          <p>
            Move six sliders. It uses only the figures you enter, assumes no result and invents no
            guests. Rounded to the nearest Rand.
          </p>
        </div>

        <ReturningGuestCalculator />
      </section>

      <section className="vrc-truth section-shell">
        <div>
          <p className="eyebrow">Why the number matters</p>
          <h2>The establishment that keeps its guests can outbid the one that does not.</h2>
        </div>
        <div className="vrc-truth-copy">
          <p>
            Two guest houses in the same town, with the same rooms and the same rates. One sees
            four guests in ten come back. The other sees none. They are not in the same business,
            and they cannot afford the same marketing.
          </p>
          <p>
            The first can pay more for a listing, a campaign or a photograph than the second can,
            and still be more profitable — because it earns twice from every guest it buys. That
            capacity is not decided by the rate card. It is decided by what happens after checkout.
          </p>
          <p>
            In most establishments, nothing happens after checkout. The booking has an owner. The
            stay has an owner. The return has nobody, and it is where the profit is.
          </p>
        </div>
      </section>

      <section className="vrc-levers section-shell">
        <div className="vrc-heading">
          <p className="eyebrow">Three things that are entirely yours</p>
          <h2>None of them require paying the platforms more.</h2>
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
          <h2>One guest. One connected revenue journey.</h2>
          <p>
            More exposure cannot repair a broken journey. The Revenue Loop strengthens every step
            from first search to a guest who returns and recommends.
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
          <h2>Not another website to admire. A system the establishment can use.</h2>
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
          <p>
            These are not hospitality platforms, and we will not pretend otherwise. They are shown
            because the commercial problem is the same one: a considered decision, a booking
            journey and a reason to come back.
          </p>
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
            until the work reaches the agreed milestone — which matters in a business with a
            season. Founder-led from the first diagnosis through launch.
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
          <h2>The questions owners actually ask.</h2>
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
        title="You have already paid to meet these guests once."
        body="Book a 60-minute Discovery Call with Ignatius. We will look at what a guest costs you, what a guest is worth to you, and which part of the gap is worth closing before the next season."
      />

      <SiteFooter />
    </main>
  );
}
