import type { Metadata } from "next";
import { CookieSettingsButton } from "../cookie-consent";
import { SiteFooter, StandardHeader } from "../site-components";

export const metadata: Metadata = {
  title: "Cookie Policy | CRM Solutions",
  description: "How CRM Solutions uses essential storage and optional website technologies.",
};

export default function CookiePolicyPage() {
  return (
    <main className="legal-page">
      <StandardHeader />
      <section className="legal-hero section-shell">
        <p className="eyebrow">Clear choices</p>
        <h1>Cookie Policy<span>.</span></h1>
        <p>Effective 23 July 2026 · Optional technologies remain off until you choose otherwise.</p>
      </section>
      <article className="legal-document section-shell">
        <aside>
          <strong>On this page</strong>
          <a href="#what">What cookies are</a>
          <a href="#categories">Our categories</a>
          <a href="#voice">Voice conversations</a>
          <a href="#choices">Your choices</a>
          <a href="#changes">Changes</a>
        </aside>
        <div className="legal-copy">
          <section id="what">
            <h2>1. What cookies and local storage do</h2>
            <p>Cookies and similar browser storage can remember a choice, maintain a secure session, protect a form or help a website understand how people use it. Some are necessary for a requested feature; others are optional.</p>
            <p>This policy uses “cookies” as a convenient term for cookies, local storage and comparable website technologies.</p>
          </section>
          <section id="categories">
            <h2>2. The categories used here</h2>
            <ul>
              <li><strong>Essential.</strong> Security, booking and client functionality, and remembering your privacy choices. These cannot be disabled through our banner because the site may not work correctly without them.</li>
              <li><strong>Analytics.</strong> Optional measurement that may help CRM Solutions understand visits, journeys and page performance. It is disabled until you consent.</li>
              <li><strong>Preferences.</strong> Optional storage that may remember non-essential interface choices. It is disabled until you consent.</li>
            </ul>
            <p>CRM Solutions does not currently use the consent control to authorise advertising cookies or the sale of personal information.</p>
          </section>
          <section id="voice">
            <h2>3. Voice Business Advisor</h2>
            <p>Clara starts only when you deliberately select “Start voice conversation” and allow microphone access. Live audio is sent to the configured voice-AI provider so the conversation can be understood and answered. Microphone access is not a cookie and is controlled by your browser.</p>
            <p>You may mute or end the conversation at any time. Do not share payment-card details, passwords or confidential personal or company information during a voice conversation. See the <a href="/privacy-policy">Privacy Policy</a> for the wider processing explanation.</p>
          </section>
          <section id="choices">
            <h2>4. Your choices</h2>
            <p>You may accept optional categories, keep only essential storage, or select categories individually. Your consent choice is itself stored locally so the banner does not ask on every page.</p>
            <div className="cookie-policy-control">
              <CookieSettingsButton />
            </div>
            <p>You can also clear this site&apos;s stored data in your browser. Doing so may remove saved choices and require secure features to start a new session.</p>
          </section>
          <section>
            <h2>5. Third-party services</h2>
            <p>Requested features may communicate with providers used for hosting, voice processing, calendar and video meetings, email or secure online payments. Those providers may process technical information under their own terms when their service is used.</p>
          </section>
          <section id="changes">
            <h2>6. Changes and contact</h2>
            <p>This policy may change when website functionality or providers change. The effective date above identifies the current published version.</p>
            <p>Questions may be sent via the <a href="/contact">Contact page</a>.</p>
          </section>
          <p className="legal-review-note">This is a practical POPIA-conscious draft. Final provider names, cookie durations, business identity and Information Officer details should be confirmed before the public legal review.</p>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
