import type { Metadata } from "next";
import Link from "next/link";
import { DiscoveryCallSection, SiteFooter, StandardHeader } from "../site-components";

export const metadata: Metadata = {
  title: "Revenue Platform | CRM Solutions",
  description: "A connected business growth system that improves positioning, acquisition, conversion, follow-up, retention and commercial measurement.",
};

const loop = [
  { number: "01", title: "Position", promise: "Give the right buyer a commercially convincing reason to choose you.", work: ["Offer and value proposition", "Ideal-customer priorities", "Proof and objection strategy", "Commercial content architecture"], impact: "Less price pressure. Better-fit enquiries. A shorter path to a buying decision.", measure: "Qualified lead rate · Sales objections · Win rate" },
  { number: "02", title: "Attract", promise: "Create useful demand around the problems profitable buyers are already trying to solve.", work: ["Search and AI-answer architecture", "Industry landing pages", "Diagnostic tools and lead magnets", "Campaign-ready content journeys"], impact: "More relevant attention without paying to attract everyone.", measure: "Cost per qualified lead · Buyer intent · Organic visibility" },
  { number: "03", title: "Convert", promise: "Make trust, value and the next step easy to understand and act on.", work: ["Conversion-led experience design", "Case studies and buying proof", "Forms, booking or ecommerce", "Friction and objection removal"], impact: "A larger share of existing attention becomes an enquiry, appointment or sale.", measure: "Conversion rate · Revenue per visit · Abandonment" },
  { number: "04", title: "Follow through", promise: "Respond while intent is high and keep every opportunity visible until it is resolved.", work: ["CRM pipeline and lead routing", "Immediate acknowledgement", "Sales follow-up sequences", "Owner and team visibility"], impact: "Fewer opportunities disappear between the form, inbox and sales conversation.", measure: "Speed to lead · Contact rate · Pipeline value" },
  { number: "05", title: "Retain", promise: "Turn a completed sale into onboarding, repeat business, reviews and referrals.", work: ["Customer onboarding", "After-sales communication", "Review and referral journeys", "Renewal, reorder and reactivation"], impact: "More value from customers you have already paid to acquire.", measure: "Lifetime value · Repeat purchase · Referral rate" },
  { number: "06", title: "Improve", promise: "Give decision-makers the numbers needed to invest, stop or improve with confidence.", work: ["Commercial dashboard", "Journey and source measurement", "CAC, conversion and LTV tracking", "Prioritized improvement backlog"], impact: "Management decisions are based on commercial evidence instead of opinions.", measure: "CAC · Contribution margin · Payback · LTV" },
];

const included = [
  ["Commercial strategy", "Objectives, offer, audiences, customer economics, constraints and the business case for change."],
  ["Customer platform", "The fast, premium digital experience that explains value, builds trust and makes action easy."],
  ["Revenue operations", "CRM structure, pipelines, lead routing, follow-up and the handoffs between marketing, sales and service."],
  ["Content & proof", "Decision-focused pages, case studies, answers, comparisons and assets that reduce uncertainty."],
  ["Measurement", "A practical view of demand, conversion, pipeline, customer value and the next commercial constraint."],
  ["Launch & stewardship", "Testing, team handover, controlled launch and an improvement plan based on real behaviour."],
];

const sequence = [
  ["01", "Diagnose", "Objectives, numbers, buyer journey, operating reality and the most expensive likely leak."],
  ["02", "Architect", "Offer, information structure, integrations, measurement and a controlled delivery plan."],
  ["03", "Build", "The customer platform, content, CRM connections and essential automations are produced together."],
  ["04", "Launch", "The experience is tested, the team is prepared and the new system is released deliberately."],
  ["05", "Improve", "Real behaviour reveals the next constraint. Growth Stewardship turns that evidence into action."],
];

function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function RevenuePlatformPage() {
  return <main className="platform-page" id="top">
    <StandardHeader current="platform" />

    <section className="platform-hero section-shell">
      <div className="platform-hero-copy"><p className="eyebrow">The Revenue Platform</p><h1>From first click to retained customer—<em>one revenue system</em><span>.</span></h1><p>A premium website cannot repair a weak offer, slow follow-up or invisible pipeline on its own. The Revenue Platform connects the customer-facing experience to the commercial system behind it.</p><div className="hero-actions"><Link className="button button-primary" href="/revenue-leak-audit">Find Your Revenue Leaks <Arrow /></Link><a className="text-link" href="#included">See What Is Included <Arrow /></a></div></div>
      <div className="platform-map" aria-label="The six stages of the Revenue Platform"><div className="map-core"><span>Customer</span><strong>Revenue</strong></div>{loop.map((stage,index)=><div className={`map-node map-node-${index+1}`} key={stage.title}><span>{stage.number}</span><b>{stage.title}</b></div>)}<i className="map-orbit map-orbit-one" aria-hidden="true"/><i className="map-orbit map-orbit-two" aria-hidden="true"/></div>
    </section>

    <section className="platform-outcome-strip" aria-label="Revenue Platform business outcomes"><div className="section-shell"><div><small>Acquire</small><strong>Better-fit demand</strong></div><div><small>Convert</small><strong>More buying action</strong></div><div><small>Operate</small><strong>Faster follow-through</strong></div><div><small>Grow</small><strong>Higher customer value</strong></div></div></section>

    <section className="disconnect-section"><div className="section-shell disconnect-grid"><div><p className="eyebrow eyebrow-light">The hidden cost of disconnected growth</p><h2>Customers experience <em>one business</em>. Your systems should work that way too.</h2></div><div className="disconnect-copy"><p>Marketing may generate the click. The website creates—or weakens—confidence. A form passes the enquiry. Sales determines whether it becomes revenue. Service influences whether the customer returns or recommends you.</p><p>When each part is bought, managed and measured separately, valuable intent is lost in the handoffs. CRM Solutions designs those handoffs as part of the product.</p><strong>The expensive leaks usually sit between the tools—not inside them.</strong></div></div></section>

    <section className="loop-detail section-shell" id="loop">
      <div className="loop-detail-intro"><p className="eyebrow">The Revenue Loop</p><h2>Six commercial jobs. One accountable journey.</h2><p>Every stage has work to perform, a business consequence and a number worth watching.</p></div>
      <div className="loop-detail-list">{loop.map(stage=><article className="loop-detail-card" key={stage.title}><div className="loop-detail-title"><span>{stage.number}</span><h3>{stage.title}</h3></div><div className="loop-detail-promise"><p>{stage.promise}</p><strong>{stage.impact}</strong></div><ul>{stage.work.map(item=><li key={item}>{item}</li>)}</ul><div className="loop-measure"><small>Commercial signals</small><b>{stage.measure}</b></div></article>)}</div>
    </section>

    <section className="included-section" id="included"><div className="section-shell"><div className="included-heading"><div><p className="eyebrow">What the engagement includes</p><h2>Not a list of features. A controlled commercial build.</h2></div><p>Scope is shaped around the most valuable constraint. These six workstreams ensure the visible platform and the operating system behind it are designed together.</p></div><div className="included-grid">{included.map(([title,body],index)=><article key={title}><span>0{index+1}</span><h3>{title}</h3><p>{body}</p></article>)}</div><p className="scope-note">Technology is selected after the commercial requirements are clear. Your business does not need more software—it needs fewer gaps.</p></div></section>

    <section className="economics-section section-shell"><div className="economics-card"><div className="economics-copy"><p className="eyebrow eyebrow-light">The investment case</p><h2>How many profitable customers must the system create—or save—to pay for itself?</h2><p>That is a more useful starting point than asking how many pages the website contains. We establish the contribution profit of a customer, the present leakage and the commercial improvement required to break even.</p></div><div className="break-even"><p>Simple break-even view</p><div className="formula"><span>Platform investment</span><i>÷</i><span>Contribution profit per new customer</span><b>=</b><strong>Customers to break even</strong></div><div className="example"><span>Example</span><b>US$10,000 ÷ US$5,000 = 2 customers</b></div><small>Illustration only. The actual business case uses your economics, capacity and sales cycle.</small></div></div></section>

    <section className="delivery-section section-shell"><div className="delivery-heading"><p className="eyebrow">How the work moves</p><h2>A senior-led path from evidence to operating system.</h2><p>The sequence stays clear, while scope and timing adjust to business complexity.</p></div><div className="delivery-sequence">{sequence.map(([number,title,body])=><article key={title}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>

    <section className="fit-section"><div className="section-shell fit-grid"><div className="fit-heading"><p className="eyebrow eyebrow-light">A deliberate fit</p><h2>Built for an established business with a valuable customer and a real constraint.</h2></div><div className="fit-columns"><div><h3>A strong fit when…</h3><ul><li>Your offer already has commercial evidence.</li><li>A new customer is valuable enough to justify serious acquisition work.</li><li>Marketing, sales or service handoffs are costing money.</li><li>A decision-maker will remain involved.</li><li>You want a measured business asset, not a cosmetic refresh.</li></ul></div><div><h3>Probably not the right fit when…</h3><ul><li>You need only a low-cost brochure website.</li><li>The business model or offer has not yet been tested.</li><li>Success is defined only by launching quickly.</li><li>No one owns sales follow-up after the enquiry.</li><li>Price is the only selection criterion.</li></ul></div></div></div></section>

    <section className="platform-investment section-shell"><div><p className="eyebrow">Revenue Platform engagements</p><h2>Begin at <em>US$10,000</em>.</h2></div><div><p>Final investment reflects business complexity, content depth, customer journeys, integrations and the value of the constraint. If the likely return cannot justify the work, the honest answer is not to proceed.</p><a className="button button-primary" href="/book-discovery-call">Book a Discovery Call <Arrow /></a></div></section>

    <section className="commitment-panel section-shell" aria-labelledby="commitment-title">
      <div className="commitment-panel-index"><span>Our delivery standard</span><b>01</b></div>
      <div className="commitment-panel-copy">
        <h2 id="commitment-title">A clear commitment to the work we can control.</h2>
        <p>CRM Solutions commits to the approved scope, clear milestones, direct senior communication and thorough testing before launch. If an agreed deliverable does not meet its approved written specification, it will be corrected at no additional professional fee.</p>
      </div>
      <div className="commitment-panel-support">
        <strong>90-Day Launch Support</strong>
        <p>After launch, we remain involved to resolve covered platform defects, review early performance signals and help establish the next improvement priorities.</p>
        <Link className="text-link" href="/delivery-commitment">Read the Delivery Commitment <Arrow /></Link>
      </div>
    </section>

    <section className="final-cta section-shell"><p className="eyebrow">Start with the constraint—not the redesign</p><h2>Find the revenue leak that deserves attention <em>first</em>.</h2><p>The Revenue Leak Audit gives us a commercially sensible place to begin—even if the answer is not a new platform.</p><div className="hero-actions final-actions"><Link className="button button-primary" href="/revenue-leak-audit">Find Your Revenue Leaks <Arrow /></Link><Link className="text-link" href="/#work">See the Work <Arrow /></Link></div></section>
    <DiscoveryCallSection eyebrow="Discuss the business case" title="Decide whether the Revenue Platform earns its place." body="Use a 60-minute Discovery Call to examine the constraint, customer economics and practical scope before committing to a build." />
    <SiteFooter />
  </main>;
}
