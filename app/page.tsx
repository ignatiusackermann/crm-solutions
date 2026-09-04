
import Link from "next/link";
import { DiscoveryCallSection, SiteFooter } from "./site-components";

const leakCards = [
  {
    number: "01",
    title: "Attention without relevance",
    body: "Marketing attracts visits, but the offer does not answer the buyer’s real concern.",
    consequence: "Higher acquisition cost",
  },
  {
    number: "02",
    title: "Interest without action",
    body: "Weak proof, confusing choices and unnecessary friction reduce conversion.",
    consequence: "Fewer qualified enquiries",
  },
  {
    number: "03",
    title: "Enquiries without follow-through",
    body: "Slow response and invisible pipelines allow valuable opportunities to decay.",
    consequence: "Lost sales and time",
  },
  {
    number: "04",
    title: "Customers without a next step",
    body: "Poor onboarding and absent retention journeys keep lifetime value unnecessarily low.",
    consequence: "Revenue left behind",
  },
];

const loopSteps = [
  ["Position", "Make the value and next step unmistakable."],
  ["Attract", "Create relevant demand around real buyer intent."],
  ["Convert", "Turn attention into enquiries, bookings and sales."],
  ["Follow through", "Respond faster and keep every opportunity visible."],
  ["Retain", "Improve repeat business, reviews and referrals."],
  ["Improve", "Measure the journey and act on the next constraint."],
];

const projects = [
  {
    name: "Lava-SA",
    category: "Specialist commerce",
    statement:
      "Turning a specialist product catalogue into a premium commerce and education platform.",
    themes: ["Product architecture", "Buying confidence", "Commerce"],
    href: "/work/lava-sa",
    linkLabel: "Read the case study",
    className: "lava",
    screenshot: "/portfolio/lava-sa-desktop.jpg",
    host: "lava-sa.com",
  },
  {
    name: "Star Aesthetic",
    category: "Aesthetic practice",
    statement:
      "Structuring complex treatment choices into a calm, credible patient journey.",
    themes: ["Premium identity", "Treatment clarity", "Consultations"],
    href: "/work/star-aesthetic",
    linkLabel: "Read the case study",
    className: "star",
    screenshot: "/portfolio/star-aesthetic-desktop.jpg",
    host: "staraesthetic.co.za",
  },
  {
    name: "Storvac Systems",
    category: "Product selection",
    statement:
      "Helping buyers understand capacity and find the right solution faster.",
    themes: ["Decision support", "Find my size", "Restrained commerce"],
    href: "/work/storvac",
    linkLabel: "Read the case study",
    className: "storvac",
    screenshot: "/portfolio/storvac-desktop.jpg",
    host: "storvac.co.za",
  },
];

const principles = [
  "Business model before feature list",
  "Customer decision before page decoration",
  "Evidence before claims",
  "Useful automation before fashionable automation",
  "Measurable outcomes before vanity metrics",
  "Long-term asset before quick-launch theatre",
];

const process = [
  ["Diagnose", "Establish the objective, current numbers, customer journey and most expensive leakage."],
  ["Architect", "Define the offer, content, journeys, system connections, measurement plan and exact scope."],
  ["Build", "Design and develop the customer platform, integrations and automation with clear decision points."],
  ["Launch & improve", "Validate the experience, train the business and prioritize the next commercial gain."],
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function RevenueJourney() {
  return (
    <div className="journey" aria-label="A customer journey from first visit to increasing customer value">
      <svg className="journey-lines" viewBox="0 0 760 520" aria-hidden="true">
        <defs>
          <linearGradient id="journeyGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#82909b" />
            <stop offset="0.52" stopColor="#c75c36" />
            <stop offset="1" stopColor="#d98a64" />
          </linearGradient>
        </defs>
        <path className="ghost-orbit orbit-one" d="M82 370 C260 338 238 130 410 226 S582 130 720 54" />
        <path className="ghost-orbit orbit-two" d="M318 530 C328 305 452 324 520 174 S624 18 760 0" />
        <circle className="ghost-orbit" cx="420" cy="270" r="112" />
        <circle className="ghost-orbit" cx="708" cy="104" r="56" />
        <path className="active-route" pathLength="1" d="M44 360 C140 360 152 302 216 322 S284 370 332 318 S426 296 480 340 S572 372 618 306 S686 250 726 214" />
      </svg>
      <div className="journey-node node-website"><i /><span>Website</span></div>
      <div className="journey-node node-enquiry"><i /><span>Enquiry</span></div>
      <div className="journey-node node-crm"><i /><span>CRM</span></div>
      <div className="journey-node node-follow"><i /><span>Follow-up</span></div>
      <div className="journey-node node-value"><i /><span>Customer value</span></div>
      <div className="journey-pulse" aria-hidden="true" />
      <p className="journey-note">One connected commercial journey</p>
    </div>
  );
}

function ProjectVisual({
  type,
  screenshot,
  host,
}: {
  type: string;
  screenshot: string;
  host: string;
}) {
  return (
    <div className={`project-visual project-visual-real ${type}`} aria-hidden="true">
      <div className="project-browser project-browser-real">
        <div className="browser-bar">
          <i />
          <i />
          <i />
          <span>{host}</span>
        </div>
        <div className="screenshot-window">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={screenshot} alt="" />
        </div>
      </div>
      <span className="visual-label">Live platform</span>
    </div>
  );
}

export default function Home() {
  return (
    <main id="top">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="CRM Solutions home">
          <img
            src="/brand/crm-solutions-logo-primary-outlined.svg"
            alt="CRM Solutions — Business Growth Systems"
            width={350}
            height={96}
          />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link href="/revenue-platform">Revenue Platform</Link>
          <a href="#work">Work</a>
          <a href="#insights">Insights</a>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="header-actions">
          <Link className="header-account" href="/client/login" aria-label="Client login" title="Client login">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <circle cx="12" cy="8" r="3.25" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M5.5 19.2c1.7-3.1 4-4.7 6.5-4.7s4.8 1.6 6.5 4.7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </Link>
          <Link className="header-cta" href="/book-discovery-call">Book a Discovery Call <Arrow /></Link>
        </div>
        <details className="mobile-menu">
          <summary aria-label="Open navigation">Menu</summary>
          <nav aria-label="Mobile navigation">
            <Link href="/revenue-platform">Revenue Platform</Link>
            <a href="#work">Work</a>
            <Link href="/contact">Contact</Link>
            <Link href="/client/login">Client login</Link>
            <a href="#about">About</a>
            <Link href="/revenue-leak-audit">Find Your Revenue Leaks</Link>
            <Link href="/book-discovery-call">Book a Discovery Call</Link>
          </nav>
        </details>
      </header>

      <section className="hero section-shell">
        <div className="hero-copy">
          <p className="eyebrow">Revenue systems that stop leakage between click and cash</p>
          <h1>
            <span className="headline-line">Make every click,</span>
            <span className="headline-line">enquiry and</span>
            <span className="headline-line">customer worth <em>more</em><b>.</b></span>
          </h1>
          <p className="hero-intro">
            Connected revenue platforms for established businesses—bringing your website,
            customer journey, CRM, automation and follow-up together.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/revenue-leak-audit">Find Your Revenue Leaks <Arrow /></Link>
            <a className="text-link" href="#work">See the Work <Arrow /></a>
          </div>
          <p className="founder-note">
            Strategy, design, development, automation and measurement—directly led by
            <span> Ignatius Ackermann.</span>
          </p>
        </div>
        <RevenueJourney />
      </section>

      <section className="credibility section-shell" aria-label="CRM Solutions experience">
        <div className="credibility-intro">
          <span className="section-index">01 / Commercial reality</span>
          <h2>Growth stalls when tools don’t share <em>one</em> journey.</h2>
        </div>
        <div className="credibility-grid">
          <div><strong>Since 2001</strong><span>Building commercial digital platforms</span></div>
          <div><strong>Founder-led</strong><span>From commercial strategy through launch</span></div>
          <div><strong>Limited engagements</strong><span>Direct senior attention throughout</span></div>
          <div><strong>One connected view</strong><span>Marketing, sales, service and retention</span></div>
        </div>
        <p className="section-deep-link">
          <Link href="/insights/why-traffic-does-not-create-revenue">
            Why doesn’t more traffic create more revenue? <Arrow />
          </Link>
        </p>
      </section>

      <section className="problem-section" id="insights">
        <div className="section-shell">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow eyebrow-light">The expensive gaps are often between the tools</p>
              <h2>Your website may not be the <em>real</em> problem.</h2>
            </div>
            <p>
              You may already have traffic, a capable team, a CRM and a credible business.
              Yet prospects still hesitate, enquiries wait and existing customers are rarely invited back.
            </p>
          </div>
          <div className="leak-grid">
            {leakCards.map((card) => (
              <article className="leak-card" key={card.number}>
                <div className="leak-top"><span>{card.number}</span><i /></div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <strong>{card.consequence}</strong>
              </article>
            ))}
          </div>
          <p className="problem-transition">
            A redesign placed on top of a broken customer journey only makes the leakage look better.
          </p>
          <p className="section-deep-link">
            <Link href="/insights/website-or-customer-journey">
              Is the website the constraint—or the journey after it? <Arrow />
            </Link>
          </p>
        </div>
      </section>

      <section className="audit-section section-shell" id="audit">
        <div className="audit-card">
          <div className="audit-copy">
            <p className="eyebrow">The Revenue Leak Audit</p>
            <h2>Find where growth is leaking out of the system.</h2>
            <p>
              In a few focused minutes, examine the commercial journey across positioning,
              demand, conversion, follow-up, retention and measurement.
            </p>
            <Link className="button button-copper" href="/revenue-leak-audit">Start the Revenue Leak Audit <Arrow /></Link>
            <small>No obligation. Useful even if we never work together.</small>
            <p className="section-deep-link">
              <Link href="/insights/find-revenue-leaks">
                How do you find the most expensive revenue leak? <Arrow />
              </Link>
            </p>
          </div>
          <div className="audit-output">
            <p>Your diagnostic will identify</p>
            <ol>
              <li><span>01</span><b>Your most expensive likely leak</b></li>
              <li><span>02</span><b>Two supporting constraints</b></li>
              <li><span>03</span><b>The commercial consequence</b></li>
              <li><span>04</span><b>A practical first action</b></li>
            </ol>
          </div>
        </div>
      </section>

      <section className="platform-section section-shell" id="platform">
        <div className="section-heading split-heading light-split">
          <div>
            <p className="eyebrow">The Revenue Platform</p>
            <h2>One connected system.<br /><em>Six</em> commercial jobs.</h2>
          </div>
          <p>
            Your customer does not experience a website, CRM, email sequence and sales team
            as separate tools. They experience one business. The Revenue Platform is designed the same way.
          </p>
        </div>
        <div className="loop-list">
          {loopSteps.map(([title, body], index) => (
            <article className="loop-step" key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{body}</p>
              <i aria-hidden="true" />
            </article>
          ))}
        </div>
        <Link className="text-link platform-link" href="/revenue-platform">Explore the Revenue Platform <Arrow /></Link>
        <p className="section-deep-link">
          <Link href="/insights/connected-revenue-platform">
            What does a connected revenue platform actually do? <Arrow />
          </Link>
        </p>
      </section>

      <section className="work-section" id="work">
        <div className="section-shell">
          <div className="work-heading">
            <div>
              <p className="eyebrow">Systems built around real buying decisions</p>
              <h2>Proof beats <em>claims</em>.</h2>
            </div>
            <p>
              Each platform starts with a different commercial problem. The craft follows the customer decision,
              the operating reality and the result the business needs.
            </p>
          </div>
          <div className="project-list">
            {projects.map((project, index) => (
              <article className="project" key={project.name}>
                <ProjectVisual
                  type={project.className}
                  screenshot={project.screenshot}
                  host={project.host}
                />
                <div className="project-copy">
                  <span className="project-number">0{index + 1} / {project.category}</span>
                  <h3>{project.name}</h3>
                  <p>{project.statement}</p>
                  <ul>{project.themes.map((theme) => <li key={theme}>{theme}</li>)}</ul>
                  <a className="text-link" href={project.href}>{project.linkLabel} <Arrow /></a>
                  <small>Full commercial case study</small>
                </div>
              </article>
            ))}
          </div>
          <p className="section-deep-link">
            <Link href="/insights/proof-before-claims">
              How do you know a platform will work before you buy it? <Arrow />
            </Link>
          </p>
        </div>
      </section>

      <section className="founder-section section-shell" id="about">
        <div className="founder-panel">
          <div className="founder-years" aria-label="Building digital platforms since 2001">
            <span>2001</span><i /><span>Today</span>
          </div>
          <div className="founder-copy">
            <p className="eyebrow eyebrow-light">Why founder-led matters</p>
            <h2>No junior handoff after the sale.</h2>
            <p>
              The person who helps diagnose the commercial problem remains involved in the strategy,
              architecture, build and measurement. There is no sales handoff to a junior delivery team.
            </p>
            <p>
              Ignatius Ackermann has built digital platforms across changing technologies and business models
              since 2001. The objective is not to chase the newest tool. It is to decide what will help the business
              earn, save, learn and improve.
            </p>
            <Link className="text-link text-link-light" href="/ignatius-ackermann">Meet Ignatius <Arrow /></Link>
            <p className="section-deep-link">
              <Link href="/insights/no-junior-handoff">
                Who actually builds the system after the strategy call? <Arrow />
              </Link>
            </p>
          </div>
          <ul className="principles">
            {principles.map((principle) => <li key={principle}>{principle}</li>)}
          </ul>
        </div>
      </section>

      <section className="process-section section-shell" id="process">
        <div className="process-intro">
          <span className="section-index">02 / A controlled path</span>
          <h2>A controlled path from diagnosis to live system.</h2>
          <p>Clear responsibilities, scheduled decisions, visible progress and direct founder communication.</p>
        </div>
        <div className="process-grid">
          {process.map(([title, body], index) => (
            <article key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <p className="section-deep-link">
          <Link href="/insights/from-diagnosis-to-live-system">
            How do you go from uncertainty to a working revenue system? <Arrow />
          </Link>
        </p>
      </section>

      <section className="investment-section section-shell">
        <div className="investment-card">
          <div>
            <p className="eyebrow eyebrow-light">For established businesses ready to improve the system</p>
            <h2>A serious commercial asset deserves a clear investment case.</h2>
          </div>
          <div className="investment-copy">
            <p>Revenue Platform engagements begin at</p>
            <strong>R20,000</strong>
            <p>
              Final investment depends on business complexity, customer journeys, content depth,
              integrations and the value of the problem—not an arbitrary page count.
            </p>
            <p>
              The standard arrangement is two equal payments. Where it suits the business, a third
              to begin with two monthly thirds can be arranged.
            </p>
            <Link className="button button-copper" href="/book-discovery-call">Find Out If We Are a Fit <Arrow /></Link>
            <p className="section-deep-link">
              <Link href="/insights/revenue-platform-investment">
                What should a revenue platform investment actually buy? <Arrow />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <DiscoveryCallSection title="Turn the diagnosis into a decision." />
      <SiteFooter />
    </main>
  );
}
