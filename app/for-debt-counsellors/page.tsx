import type { Metadata } from "next";
import Link from "next/link";
import { DiscoveryCallSection, SiteFooter, StandardHeader } from "../site-components";
import previews from "../../lib/debtreliefbiz-previews.json";
import { Preview, SideNav } from "./sales-parts";
import { CancellationCalculator } from "./cancellation-calculator";

/* CRM Solutions' page for South African debt counsellors. It sells DebtReliefBiz —
   the website, AI voice assistant, client portal and CRM we built for debt review —
   and every screenshot opens the live demo on debtreliefbiz.co.za.
   No prices on this page (decided 18 Nov 2026): the investment depends on the size of the
   practice and which of Sandy's levels it takes, and is set out on the walkthrough. */

const DEMO = "https://debtreliefbiz.co.za";

export const metadata: Metadata = {
  title: "Websites and CRM for Debt Counsellors | CRM Solutions",
  description:
    "DebtReliefBiz: a ready-to-trade website for South African debt counselling practices, with an AI voice assistant, a client portal and a CRM that connects to your dialler.",
  openGraph: {
    type: "article",
    locale: "en_ZA",
    url: "https://www.crmsolutions.app/for-debt-counsellors",
    siteName: "CRM Solutions",
    title: "The debt counselling website that answers at 2 a.m.",
    description:
      "Website, AI voice assistant, client portal and CRM for South African debt counsellors — carrying your practice's name.",
  },
  alternates: { canonical: "/for-debt-counsellors" },
  robots: { index: true, follow: true },
};

type PreviewMeta = { label: string; group: string; url: string; width: number; height: number };
const ALL = previews as Record<string, PreviewMeta>;
const group = (name: string) => Object.entries(ALL).filter(([, item]) => item.group === name);

const NAV = [
  { id: "calculator", label: "What churn costs" },
  { id: "features", label: "Features" },
  { id: "pages", label: "Pages" },
  { id: "portal", label: "Client portal" },
  { id: "crm", label: "CRM" },
  { id: "styles", label: "Styles" },
  { id: "included", label: "What's included" },
  { id: "pricing", label: "How it is priced" },
  { id: "questions", label: "Questions" },
];

const FEATURES = [
  [
    "Sandy, the AI voice assistant",
    "Answers out loud, day and night. Books a call-back with your counsellor and flags Section 129 cases as urgent.",
  ],
  [
    "Written for people who cannot sleep",
    "The page changes after 9 p.m. Visitors tap what is keeping them up, and Sandy already knows why they came.",
  ],
  [
    "A two-minute enquiry form",
    "For people who would rather type. Leads land in your CRM and your dialler queue in seconds.",
  ],
  [
    "Documents from a phone",
    "ID, payslips and statements, uploaded from the client's phone and ticked off on their file.",
  ],
  [
    "A client portal",
    "Clients see what is paid, what is left and their debt-free date. Milestones keep them paying.",
  ],
  [
    "Stories, with permission",
    "Clients share a written or video story. Nothing goes live until you approve it.",
  ],
  [
    "A CRM built for debt review",
    "Leads, clients, Form 16 to clearance, accounts, payments and documents in one place.",
  ],
  [
    "POPIA from day one",
    "Encrypted documents, access per staff member, an audit trail and recorded consent.",
  ],
] as const;

const INCLUDED = [
  [
    "Website",
    [
      "Home, how it works, client stories, qualify form, document upload",
      "Terms and POPIA privacy policy, drafted for your review",
      "Office map, phone menu and SEO basics",
    ],
  ],
  [
    "Sandy",
    [
      "A live voice assistant on every page",
      "Call-back booking straight into your CRM",
      "A transcript and summary on every lead",
    ],
  ],
  [
    "Client portal",
    [
      "Sign-up and login",
      "Progress, accounts, months left and milestones",
      "Document upload and story sharing",
    ],
  ],
  [
    "CRM",
    [
      "Leads, pipeline and clients",
      "A full debt-review client record",
      "The dialler bridge and the 2027 growth plan",
    ],
  ],
] as const;

const STEPS = [
  ["Walkthrough", "Twenty minutes. We show you this exact system and learn how your practice runs."],
  ["Your brand", "Your logo, colours, offices and NCR number. The colour engine re-themes everything from your logo."],
  ["Your dialler", "We connect new leads to your dialler and read call outcomes back. Your agents keep their screens."],
  ["Go live", "Your domain, Sandy switched on, staff trained. Clients can sign in from day one."],
] as const;

const FAQ = [
  {
    q: "Is an AI voice assistant allowed for a debt counsellor?",
    a: "Sandy says she is an AI, never gives advice, never quotes fees or promises savings, and never asks for ID or banking details. She explains debt review in general terms and books a call-back with your registered counsellor.",
  },
  {
    q: "Will it work with our dialler?",
    a: "Yes. New online leads are pushed into your dialler and call outcomes come back into the CRM. If your dialler has no API, we run a scheduled export and import instead.",
  },
  {
    q: "Can we bring our existing clients across?",
    a: "Yes. We import your client list, accounts and payment history from a spreadsheet or your current system.",
  },
  {
    q: "Do we keep our domain and our data?",
    a: "Yes. The domain is yours, and so is every record. You can export everything at any time.",
  },
  {
    q: "How long until we are live?",
    a: "It depends mostly on how quickly we receive your logo, wording and dialler details. We agree a date with you on the walkthrough.",
  },
] as const;

export default function ForDebtCounsellorsPage() {
  const home = ALL.home;

  return (
    <main className="drb-page" id="top">
      <StandardHeader />

      <section className="drb-hero section-shell">
        <div className="drb-hero-copy">
          <p className="eyebrow">For debt counselling practices</p>
          <h1>The debt counselling website that answers at 2&nbsp;a.m.</h1>
          <p className="drb-hero-intro">
            DebtReliefBiz is a ready-to-trade website for South African debt counsellors, with{" "}
            <strong>Sandy</strong>, an AI voice assistant who books call-backs while you sleep, a
            client portal that keeps clients paying, and a CRM built for debt review — carrying your
            practice&apos;s name, not ours.
          </p>
          <ul className="hero-points">
            <li>A live demo you can use today — every screenshot opens the real page</li>
            <li>Your brand, rebuilt from your logo</li>
            <li>POPIA built in, not bolted on</li>
          </ul>
          <div className="hero-actions drb-hero-actions">
            <a className="button button-copper" href="#calculator">
              Work out what churn costs you <span aria-hidden="true">→</span>
            </a>
            <a className="text-link" href={DEMO} target="_blank" rel="noreferrer">
              Try the live demo — talk to Sandy <span aria-hidden="true">→</span>
            </a>
          </div>
          <p className="drb-flag">
            <a href="#pricing">
              Sandy can also answer your phones and call your clients
              <span aria-hidden="true"> →</span>
            </a>
          </p>
        </div>
      </section>

      <section className="drb-frame-section section-shell">
        <div className="drb-frame">
          <div className="drb-frame-bar">
            <i /><i /><i />
            <span className="drb-frame-url">debtreliefbiz.co.za</span>
            <span className="drb-frame-hint">Hover to scroll</span>
          </div>
          <a href={DEMO} target="_blank" rel="noreferrer" aria-label="Home page — open the live demo">
            <span
              className="drb-shot drb-shot-wide"
              style={{ aspectRatio: "16 / 9", ["--scroll-dur" as string]: "28s" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/previews/home.webp"
                alt="Full-page screenshot of the DebtReliefBiz home page"
                width={home.width}
                height={home.height}
              />
            </span>
          </a>
        </div>
      </section>

      <div className="drb-body section-shell">
        <aside>
          <SideNav items={NAV} />
        </aside>

        <div className="drb-sections">
          <section id="calculator">
            <div className="vrc-heading vrc-heading-split">
              <h2>What a cancellation costs you</h2>
              <p>
                Your income is the after-care fee, month after month, for as long as a client
                stays under review. A client who falls out does not cost you one fee — they cost
                you every fee that was still to come. Move the sliders to your own figures.
              </p>
            </div>
            <div className="drb-calculator" data-reveal>
              <CancellationCalculator />
            </div>
            <p className="drb-note">
              The NDRC reported 24.3% of its matters cancelled between March 2020 and March 2026.
              Nationally, close to 2 million debt review applications have produced about 213 000
              clearance certificates.
            </p>
          </section>

          <section id="features">
            <div className="vrc-heading vrc-heading-split">
              <h2>Features</h2>
              <p>
                Everything a debt counselling practice needs to turn a frightened visitor at 2 a.m.
                into a client who pays every month.
              </p>
            </div>
            <div className="drb-card-grid" data-reveal>
              {FEATURES.map(([title, body]) => (
                <article key={title} className="drb-card">
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="pages">
            <div className="vrc-heading vrc-heading-split">
              <h2>Pages</h2>
              <p>Every page of the public website. Hover to scroll through it, click to open the live page.</p>
            </div>
            <div className="drb-shot-grid" data-reveal>
              {group("pages").map(([key, item]) => (
                <figure key={key}>
                  <Preview
                    src={`/previews/${key}.webp`}
                    label={item.label}
                    href={`${DEMO}${item.url}`}
                    width={item.width}
                    height={item.height}
                    slow={key === "home" ? 2 : 1}
                  />
                  <figcaption>{item.label}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section id="portal">
            <div className="vrc-heading vrc-heading-split">
              <h2>Client portal</h2>
              <p>
                Clients see their progress, their accounts and their debt-free date. People who can
                see the finish line keep paying. Try it as Emma or David.
              </p>
            </div>
            <div className="drb-shot-grid" data-reveal>
              {group("portal").map(([key, item]) => (
                <figure key={key}>
                  <Preview
                    src={`/previews/${key}.webp`}
                    label={item.label}
                    href={`${DEMO}${item.url}`}
                    width={item.width}
                    height={item.height}
                  />
                  <figcaption>{item.label}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section id="crm">
            <div className="vrc-heading vrc-heading-split">
              <h2>The CRM</h2>
              <p>
                Built for debt review and laid out like the systems your team already knows: lists
                with a search box on every column, a quick view, and a full client record from Form
                16 to clearance.
              </p>
            </div>
            <div className="drb-shot-grid" data-reveal>
              {group("crm").map(([key, item]) => (
                <figure key={key}>
                  <Preview
                    src={`/previews/${key}.webp`}
                    label={item.label}
                    href={`${DEMO}${item.url}`}
                    width={item.width}
                    height={item.height}
                  />
                  <figcaption>{item.label}</figcaption>
                </figure>
              ))}
            </div>
            <p className="drb-note">
              The live CRM is password-protected. Ask for the demo password on your walkthrough.
            </p>
          </section>

          <section id="styles">
            <div className="vrc-heading vrc-heading-split">
              <h2>Styles</h2>
              <p>
                Your logo sets the colours. Every shade, hover, border and background is calculated
                from two numbers, so the whole system becomes yours in minutes rather than weeks.
              </p>
            </div>
            <div className="drb-style-grid" data-reveal>
              {group("styles").map(([key, item]) => (
                <figure key={key}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/previews/${key}.webp`}
                    alt={`The home page in ${item.label}`}
                    width={item.width}
                    height={item.height}
                    loading="lazy"
                  />
                  <figcaption>{item.label}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section id="included">
            <div className="vrc-heading">
              <h2>What&apos;s included</h2>
            </div>
            <div className="drb-card-grid" data-reveal>
              {INCLUDED.map(([title, items]) => (
                <article key={title} className="drb-card">
                  <h3>{title}</h3>
                  <ul className="drb-ticks">
                    {items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <h3 className="drb-subhead">From walkthrough to live</h3>
            <ol className="drb-steps" data-reveal>
              {STEPS.map(([title, body], index) => (
                <li key={title}>
                  <span className="drb-step-number">{index + 1}</span>
                  <strong>{title}</strong>
                  <p>{body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="pricing">
            <div className="vrc-heading vrc-heading-split">
              <h2>How it is priced</h2>
              <p>
                Priced for your practice: how many agents you run, how many calls you take, and which
                of Sandy&apos;s levels you switch on. Set out on the walkthrough, never per user or per
                lead.
              </p>
            </div>
            <div className="drb-pricing">
              <div className="drb-price-card">
                <p className="drb-price-kicker">Level 1 — the practice platform</p>
                <p className="drb-price-figure drb-side-figure-small">
                  <span>Website, Sandy, client portal and CRM</span>
                </p>
                <ul className="drb-ticks">
                  <li>Sandy answers your website aloud, 24 hours a day, 365 days a year</li>
                  <li>Qualifies, books call-backs and collects documents</li>
                  <li>Client portal and a CRM built for debt review</li>
                  <li>Hosting, secure document storage, backups and support</li>
                </ul>
                <Link className="button button-copper drb-price-button" href="/book-discovery-call">
                  Book a walkthrough <span aria-hidden="true">→</span>
                </Link>
              </div>

              <div className="drb-price-side">
                <div className="drb-side-card">
                  <p className="drb-side-kicker">Level 2 — Sandy answers your phones</p>
                  <p>
                    When every agent is busy, at lunch or after hours, Sandy answers your practice&apos;s
                    own number, answers questions, takes the details and books the call-back. All it
                    needs is a registered phone number.
                  </p>
                </div>
                <div className="drb-side-card">
                  <p className="drb-side-kicker">Level 3 — Sandy calls your clients</p>
                  <p>
                    Sandy phones clients for missing documents, sends the secure upload link and
                    reminds them of the next step, so your agents spend their day on higher-value work.
                    In English, isiZulu, Setswana, Sesotho, Afrikaans and more.
                  </p>
                </div>
              </div>
            </div>
            <p className="drb-note">
              Callers are always told they are speaking to an AI assistant. Advice and assessment stay
              with your registered debt counsellors.
            </p>
          </section>

          <section id="questions" className="vrc-faq">
            <div>
              <p className="eyebrow">Before you ask</p>
              <h2>The questions counsellors actually ask.</h2>
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
        </div>
      </div>

      <DiscoveryCallSection
        eyebrow="Twenty minutes, no obligation"
        title="See it running before you decide."
        body="Book a walkthrough with Ignatius. We open this exact system, show you how a lead travels from your website into your dialler and back, and agree what your practice would need changed."
      />

      <SiteFooter />
    </main>
  );
}
