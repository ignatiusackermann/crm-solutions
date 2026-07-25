import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema, JsonLd, serviceSchema } from "@/lib/json-ld";
import { DiscoveryCallSection, SiteFooter, StandardHeader } from "../site-components";

export const metadata: Metadata = {
  title: "Revenue Platform | CRM Solutions",
  description:
    "A connected revenue system that joins website, customer journey, CRM, follow-up and retention—so attention becomes revenue and customers stay valuable.",
};

const loop = [
  {
    number: "01",
    title: "Position",
    promise: "Give the right buyer a commercially convincing reason to choose you.",
    work: [
      "Offer and value proposition",
      "Ideal-customer priorities",
      "Proof and objection strategy",
      "Commercial content architecture",
    ],
    impact: "Less price pressure. Better-fit enquiries. A shorter path to a buying decision.",
    measure: "Qualified lead rate · Sales objections · Win rate",
  },
  {
    number: "02",
    title: "Attract",
    promise: "Create useful demand around the problems profitable buyers are already trying to solve.",
    work: [
      "Search and AI-answer architecture",
      "Industry landing pages",
      "Diagnostic tools and lead magnets",
      "Campaign-ready content journeys",
    ],
    impact: "More relevant attention without paying to attract everyone.",
    measure: "Cost per qualified lead · Buyer intent · Organic visibility",
  },
  {
    number: "03",
    title: "Convert",
    promise: "Make trust, value and the next step easy to understand and act on.",
    work: [
      "Conversion-led experience design",
      "Case studies and buying proof",
      "Forms, booking or ecommerce",
      "Friction and objection removal",
    ],
    impact: "A larger share of existing attention becomes an enquiry, appointment or sale.",
    measure: "Conversion rate · Revenue per visit · Abandonment",
  },
  {
    number: "04",
    title: "Follow through",
    promise: "Respond while intent is high and keep every opportunity visible until it is resolved.",
    work: [
      "CRM pipeline and lead routing",
      "Immediate acknowledgement",
      "Sales follow-up sequences",
      "Owner and team visibility",
    ],
    impact: "Fewer opportunities disappear between the form, inbox and sales conversation.",
    measure: "Speed to lead · Contact rate · Pipeline value",
  },
  {
    number: "05",
    title: "Retain",
    promise: "Turn a completed sale into onboarding, repeat business, reviews and referrals.",
    work: [
      "Customer onboarding",
      "After-sales communication",
      "Review and referral journeys",
      "Renewal, reorder and reactivation",
    ],
    impact: "More value from customers you have already paid to acquire.",
    measure: "Lifetime value · Repeat purchase · Referral rate",
  },
  {
    number: "06",
    title: "Improve",
    promise: "Give decision-makers the numbers needed to invest, stop or improve with confidence.",
    work: [
      "Commercial dashboard",
      "Journey and source measurement",
      "CAC, conversion and LTV tracking",
      "Prioritized improvement backlog",
    ],
    impact: "Management decisions are based on commercial evidence instead of opinions.",
    measure: "CAC · Contribution margin · Payback · LTV",
  },
];

const included = [
  [
    "Commercial strategy",
    "Objectives, offer, audiences, customer economics, constraints and the business case for change—so the build serves a commercial decision, not a decoration brief.",
  ],
  [
    "Customer platform",
    "The fast, premium digital experience that explains value, builds trust and makes the next action obvious—whether that is enquiry, booking or purchase.",
  ],
  [
    "Revenue operations",
    "CRM structure, pipelines, lead routing, follow-up and the handoffs between marketing, sales and service—so intent does not die in an inbox.",
  ],
  [
    "Content & proof",
    "Decision-focused pages, case studies, answers, comparisons and assets that reduce uncertainty at the moments buyers hesitate.",
  ],
  [
    "Measurement",
    "A practical view of demand, conversion, pipeline, customer value and the next commercial constraint—so improvement has a target.",
  ],
  [
    "Launch & stewardship",
    "Testing, team handover, controlled launch and an improvement plan based on real behaviour—not a silent handoff after go-live.",
  ],
];

const sequence = [
  [
    "01",
    "Diagnose",
    "Objectives, numbers, buyer journey, operating reality and the most expensive likely leak—before production begins.",
  ],
  [
    "02",
    "Architect",
    "Offer, information structure, integrations, measurement and a controlled delivery plan the business can approve.",
  ],
  [
    "03",
    "Build",
    "The customer platform, content, CRM connections and essential automations are produced together, with clear decision points.",
  ],
  [
    "04",
    "Launch",
    "The experience is tested, the team is prepared and the new system is released deliberately—not dumped live.",
  ],
  [
    "05",
    "Improve",
    "Real behaviour reveals the next constraint. Growth Stewardship turns that evidence into the next commercial action.",
  ],
];

const proof = [
  {
    name: "Lava-SA",
    constraint: "Specialist buyers needed education before they would buy with confidence.",
    outcome: "Catalogue, proof and checkout designed as one commerce journey.",
    href: "/work/lava-sa",
  },
  {
    name: "Star Aesthetic",
    constraint: "Complex treatments created hesitation instead of booked consultations.",
    outcome: "Treatment clarity and a calm path from interest to consultation.",
    href: "/work/star-aesthetic",
  },
  {
    name: "Storvac Systems",
    constraint: "Product choice was slow because capacity and fit were hard to judge.",
    outcome: "Faster fit decisions that reduce wrong-size friction.",
    href: "/work/storvac",
  },
];

const produces = [
  "A clearer commercial journey from first click to retained customer",
  "A customer-facing platform the business can operate without theatre",
  "Connected follow-up so enquiries do not decay between tools",
  "Measurement that names the next constraint worth fixing",
  "Senior accountability from diagnosis through launch support",
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function RevenuePlatformPage() {
  return (
    <main className="platform-page" id="top">
      <JsonLd
        data={[
          serviceSchema(),
          breadcrumbSchema([
            { name: "Home", url: "https://www.crmsolutions.app/" },
            {
              name: "Revenue Platform",
              url: "https://www.crmsolutions.app/revenue-platform",
            },
          ]),
        ]}
      />
      <StandardHeader current="platform" />

      <section className="platform-hero section-shell">
        <div className="platform-hero-copy">
          <p className="eyebrow">The Revenue Platform</p>
          <h1>
            From first click to retained customer—
            <em>one revenue system</em>
            <span>.</span>
          </h1>
          <p>
            A premium website cannot repair a weak offer, slow follow-up or an invisible
            pipeline on its own. The Revenue Platform connects the customer-facing experience
            to the commercial system behind it—so attention becomes revenue, and customers stay
            valuable after the first sale.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/revenue-leak-audit">
              Find Your Revenue Leaks <Arrow />
            </Link>
            <a className="text-link" href="#story">
              See how the story works <Arrow />
            </a>
          </div>
        </div>
        <div className="platform-map" aria-label="The six stages of the Revenue Platform">
          <div className="map-core">
            <span>Customer</span>
            <strong>Revenue</strong>
          </div>
          {loop.map((stage, index) => (
            <div className={`map-node map-node-${index + 1}`} key={stage.title}>
              <span>{stage.number}</span>
              <b>{stage.title}</b>
            </div>
          ))}
          <i className="map-orbit map-orbit-one" aria-hidden="true" />
          <i className="map-orbit map-orbit-two" aria-hidden="true" />
        </div>
      </section>

      <section className="platform-outcome-strip" aria-label="Revenue Platform business outcomes">
        <div className="section-shell">
          <div>
            <small>Acquire</small>
            <strong>Better-fit demand</strong>
          </div>
          <div>
            <small>Convert</small>
            <strong>More buying action</strong>
          </div>
          <div>
            <small>Operate</small>
            <strong>Faster follow-through</strong>
          </div>
          <div>
            <small>Grow</small>
            <strong>Higher customer value</strong>
          </div>
        </div>
      </section>

      <section className="disconnect-section" id="story">
        <div className="section-shell disconnect-grid">
          <div>
            <p className="eyebrow eyebrow-light">The hidden cost of disconnected growth</p>
            <h2>
              Customers experience <em>one business</em>. Your systems should work that way too.
            </h2>
          </div>
          <div className="disconnect-copy">
            <p>
              Marketing may generate the click. The website creates—or weakens—confidence. A form
              passes the enquiry. Sales determines whether it becomes revenue. Service influences
              whether the customer returns or recommends you.
            </p>
            <p>
              When each part is bought, managed and measured separately, valuable intent is lost
              in the handoffs. The business looks busy. The pipeline tells a quieter story.
            </p>
            <strong>The expensive leaks usually sit between the tools—not inside them.</strong>
          </div>
        </div>
      </section>

      <section className="definition-section section-shell">
        <div className="definition-heading">
          <p className="eyebrow">What you are actually buying</p>
          <h2>
            Not another website project. Not another CRM rollout. A <em>connected</em> commercial
            system.
          </h2>
        </div>
        <div className="definition-grid">
          <div>
            <h3>What this is</h3>
            <ul>
              <li>One accountable journey from first click to retained customer</li>
              <li>Website, proof, enquiry path, CRM and follow-up designed together</li>
              <li>Scope shaped around the most expensive commercial constraint</li>
              <li>Senior-led diagnosis, architecture, build and launch support</li>
              <li>Measurement that tells you what to improve next</li>
            </ul>
          </div>
          <div>
            <h3>What this is not</h3>
            <ul>
              <li>A cosmetic redesign placed on a broken buying path</li>
              <li>A software licence sale or feature catalogue</li>
              <li>A junior delivery chain after a senior sales conversation</li>
              <li>A page-count quote for an undefined commercial problem</li>
              <li>Automation for its own sake</li>
            </ul>
          </div>
        </div>
        <p className="section-deep-link">
          <Link href="/insights/connected-revenue-platform">
            What does a connected revenue platform actually do? <Arrow />
          </Link>
        </p>
      </section>

      <section className="handoff-section">
        <div className="section-shell handoff-grid">
          <div className="handoff-intro">
            <p className="eyebrow eyebrow-light">Where money usually escapes</p>
            <h2>
              Watch one enquiry cross the gap between <em>interest</em> and revenue.
            </h2>
            <p>
              This is the story most businesses recognise. The tools may each “work.” The journey
              between them does not.
            </p>
          </div>
          <div className="handoff-compare">
            <article>
              <span>Before</span>
              <h3>Disconnected handoffs</h3>
              <ol>
                <li>A prospect finds the site and submits a form late on a Tuesday.</li>
                <li>The enquiry lands in a shared inbox—or waits for a weekly CRM import.</li>
                <li>Nobody owns speed-to-lead. The buyer cools. A competitor answers first.</li>
                <li>If a sale happens, onboarding and the next offer are improvised.</li>
              </ol>
            </article>
            <article>
              <span>After</span>
              <h3>One accountable path</h3>
              <ol>
                <li>The same enquiry is captured with enough context to act.</li>
                <li>Immediate acknowledgement sets expectation while intent is high.</li>
                <li>CRM routing makes the opportunity visible to the right owner.</li>
                <li>Follow-up sequences and a clear next step protect the pipeline.</li>
                <li>After the sale, onboarding and retention continue the same journey.</li>
              </ol>
            </article>
          </div>
        </div>
      </section>

      <section className="loop-detail section-shell" id="loop">
        <div className="loop-detail-intro">
          <p className="eyebrow">The Revenue Loop</p>
          <h2>Six commercial jobs. One accountable journey.</h2>
          <p>
            Every stage has work to perform, a business consequence and a number worth watching.
            The platform is not six separate projects—it is one story told in sequence.
          </p>
        </div>
        <div className="loop-detail-list">
          {loop.map((stage) => (
            <article className="loop-detail-card" key={stage.title}>
              <div className="loop-detail-title">
                <span>{stage.number}</span>
                <h3>{stage.title}</h3>
              </div>
              <div className="loop-detail-promise">
                <p>{stage.promise}</p>
                <strong>{stage.impact}</strong>
              </div>
              <ul>
                {stage.work.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="loop-measure">
                <small>Commercial signals</small>
                <b>{stage.measure}</b>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="included-section" id="included">
        <div className="section-shell">
          <div className="included-heading">
            <div>
              <p className="eyebrow">What the engagement includes</p>
              <h2>
                Not a list of features. A controlled commercial <em>build</em>.
              </h2>
            </div>
            <p>
              Scope is shaped around the most valuable constraint. These six workstreams ensure
              the visible platform and the operating system behind it are designed together—so
              you are not paying twice for the same gap later.
            </p>
          </div>
          <div className="included-grid">
            {included.map(([title, body], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <div className="produces-block">
            <h3>A typical engagement produces</h3>
            <ul>
              {produces.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <p className="scope-note">
            Technology is selected after the commercial requirements are clear. Your business
            does not need more software—it needs fewer gaps.
          </p>
        </div>
      </section>

      <section className="platform-proof section-shell" id="proof">
        <div className="platform-proof-heading">
          <div>
            <p className="eyebrow">Proof before claims</p>
            <h2>
              The work should show the commercial <em>decision</em>, not only the screens.
            </h2>
          </div>
          <p>
            Each platform below started with a different buying problem. The craft followed the
            customer decision and the operating reality the business had to run after launch.
          </p>
        </div>
        <div className="platform-proof-list">
          {proof.map((item, index) => (
            <article key={item.name}>
              <span>0{index + 1}</span>
              <h3>{item.name}</h3>
              <p>
                <b>Constraint.</b> {item.constraint}
              </p>
              <p>
                <b>System response.</b> {item.outcome}
              </p>
              <Link className="text-link" href={item.href}>
                Read the case study <Arrow />
              </Link>
            </article>
          ))}
        </div>
        <p className="section-deep-link">
          <Link href="/insights/proof-before-claims">
            How do you know a platform will work before you buy it? <Arrow />
          </Link>
        </p>
      </section>

      <section className="economics-section section-shell">
        <div className="economics-card">
          <div className="economics-copy">
            <p className="eyebrow eyebrow-light">The investment case</p>
            <h2>
              How many profitable customers must the system create—or save—to pay for itself?
            </h2>
            <p>
              That is a more useful starting point than asking how many pages the website
              contains. We establish the contribution profit of a customer, the present leakage
              and the commercial improvement required to break even—then decide whether a
              Revenue Platform is the sensible next asset.
            </p>
            <p className="section-deep-link">
              <Link href="/insights/revenue-platform-investment">
                What should a revenue platform investment actually buy? <Arrow />
              </Link>
            </p>
          </div>
          <div className="break-even">
            <p>Simple break-even view</p>
            <div className="formula">
              <span>Platform investment</span>
              <i>÷</i>
              <span>Contribution profit per new customer</span>
              <b>=</b>
              <strong>Customers to break even</strong>
            </div>
            <div className="example">
              <span>Example</span>
              <b>US$10,000 ÷ US$5,000 = 2 customers</b>
            </div>
            <small>
              Illustration only. The actual business case uses your economics, capacity and sales
              cycle.
            </small>
          </div>
        </div>
      </section>

      <section className="delivery-section section-shell">
        <div className="delivery-heading">
          <p className="eyebrow">How the work moves</p>
          <h2>A senior-led path from evidence to operating system.</h2>
          <p>
            The sequence stays clear, while scope and timing adjust to business complexity. The
            person who helps diagnose the constraint remains involved when architecture and
            trade-offs become real.
          </p>
        </div>
        <div className="delivery-sequence">
          {sequence.map(([number, title, body]) => (
            <article key={title}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <div className="stewardship-note">
          <div>
            <h3>After launch: Growth Stewardship</h3>
            <p>
              Launch is not the finish line. Early performance signals reveal the next constraint—
              often in follow-up, content, or retention. Stewardship keeps senior judgment available
              so improvement stays commercial, not cosmetic.
            </p>
          </div>
          <p className="section-deep-link">
            <Link href="/insights/from-diagnosis-to-live-system">
              How do you go from uncertainty to a working revenue system? <Arrow />
            </Link>
          </p>
        </div>
      </section>

      <section className="fit-section">
        <div className="section-shell fit-grid">
          <div className="fit-heading">
            <p className="eyebrow eyebrow-light">A deliberate fit</p>
            <h2>
              Built for an established business with a valuable customer and a real constraint.
            </h2>
          </div>
          <div className="fit-columns">
            <div>
              <h3>A strong fit when…</h3>
              <ul>
                <li>Your offer already has commercial evidence.</li>
                <li>A new customer is valuable enough to justify serious acquisition work.</li>
                <li>Marketing, sales or service handoffs are costing money.</li>
                <li>A decision-maker will remain involved.</li>
                <li>You want a measured business asset, not a cosmetic refresh.</li>
              </ul>
            </div>
            <div>
              <h3>Probably not the right fit when…</h3>
              <ul>
                <li>You need only a low-cost brochure website.</li>
                <li>The business model or offer has not yet been tested.</li>
                <li>Success is defined only by launching quickly.</li>
                <li>No one owns sales follow-up after the enquiry.</li>
                <li>Price is the only selection criterion.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="platform-investment section-shell">
        <div>
          <p className="eyebrow">Revenue Platform engagements</p>
          <h2>
            Begin at <em>US$10,000</em>.
          </h2>
        </div>
        <div>
          <p>
            Final investment reflects business complexity, content depth, customer journeys,
            integrations and the value of the constraint—not an arbitrary page count. If the
            likely return cannot justify the work, the honest answer is not to proceed.
          </p>
          <p>
            The figure purchases a clearer commercial journey, a platform the business can
            operate, connected follow-up where it matters, measurement that supports decisions,
            and senior accountability through launch support.
          </p>
          <Link className="button button-primary" href="/book-discovery-call">
            Book a Discovery Call <Arrow />
          </Link>
        </div>
      </section>

      <section className="commitment-panel section-shell" aria-labelledby="commitment-title">
        <div className="commitment-panel-index">
          <span>Our delivery standard</span>
          <b>01</b>
        </div>
        <div className="commitment-panel-copy">
          <h2 id="commitment-title">A clear commitment to the work we can control.</h2>
          <p>
            CRM Solutions commits to the approved scope, clear milestones, direct senior
            communication and thorough testing before launch. If an agreed deliverable does not
            meet its approved written specification, it will be corrected at no additional
            professional fee.
          </p>
        </div>
        <div className="commitment-panel-support">
          <strong>90-Day Launch Support</strong>
          <p>
            After launch, we remain involved to resolve covered platform defects, review early
            performance signals and help establish the next improvement priorities.
          </p>
          <Link className="text-link" href="/delivery-commitment">
            Read the Delivery Commitment <Arrow />
          </Link>
        </div>
      </section>

      <section className="final-cta section-shell">
        <p className="eyebrow">Start with the constraint—not the redesign</p>
        <h2>
          Find the revenue leak that deserves attention <em>first</em>.
        </h2>
        <p>
          The Revenue Leak Audit gives a commercially sensible place to begin—even if the answer
          is not a new platform. Diagnosis first. Build only when the business case is clear.
        </p>
        <div className="hero-actions final-actions">
          <Link className="button button-primary" href="/revenue-leak-audit">
            Find Your Revenue Leaks <Arrow />
          </Link>
          <Link className="text-link" href="/#work">
            See the Work <Arrow />
          </Link>
        </div>
        <p className="section-deep-link">
          <Link href="/insights/find-revenue-leaks">
            How do you find the most expensive revenue leak? <Arrow />
          </Link>
        </p>
      </section>

      <DiscoveryCallSection
        eyebrow="Discuss the business case"
        title="Decide whether the Revenue Platform earns its place."
        body="Use a 60-minute Discovery Call to examine the constraint, customer economics and practical scope before committing to a build."
      />
      <SiteFooter />
    </main>
  );
}
