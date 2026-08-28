import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/lib/json-ld";
import { DiscoveryCallSection, SiteFooter, StandardHeader } from "../site-components";

export const metadata: Metadata = {
  title: "Ignatius Ackermann — Web Developer, Durban South Africa | CRM Solutions",
  description:
    "Ignatius Ackermann is a web developer and founder of CRM Solutions in Durban, South Africa. Retrenched from retail in his forties, self-taught from 2002, around 150 websites built, and still building at 68. His story, in full.",
  openGraph: {
    type: "profile",
    locale: "en_ZA",
    url: "https://www.crmsolutions.app/ignatius-ackermann",
    siteName: "CRM Solutions",
    title: "Ignatius Ackermann — Web Developer, Durban South Africa",
    description:
      "Three careers, one retrenchment and a diploma he never received. The full story of the founder of CRM Solutions.",
    images: ["/ignatius-ackermann.webp"],
  },
  alternates: { canonical: "/ignatius-ackermann" },
  robots: { index: true, follow: true },
};

/**
 * /ignatius-ackermann — the founder's story.
 *
 * Written to be answerable, not just readable: a search engine or language
 * model asking "who is Ignatius Ackermann from Durban South Africa" should be
 * able to lift a correct, specific answer from this page. That is why it opens
 * with a direct-answer block, carries a facts table, closes with plain Q&A, and
 * ships Person structured data with sameAs links.
 *
 * Every dated claim traces to source documents in the CV archive. Nothing here
 * is inferred or embellished.
 */

const FACTS = [
  ["Full name", "Ignatius Ackermann"],
  ["Based in", "Durban, KwaZulu-Natal, South Africa"],
  ["Occupation", "Web developer, designer and founder of CRM Solutions"],
  ["Age", "68 (born 1958)"],
  ["Working on the web since", "2002"],
  ["Independent as CRM Solutions since", "1 March 2020"],
  ["Websites built", "Around 150 for Overflow PLR alone, 2013–2020"],
  ["Schooled at", "Afrikaans Hoër Seunskool, Pretoria (matriculated 1976)"],
  ["Studied", "Interior Design, Technikon Pretoria (1979–1981)"],
  ["Earlier careers", "Visual merchandising (1982–2002), professional musician (1986–1992)"],
  ["Known for", "Building an online tour booking and payment system for the 2010 World Cup"],
] as const;

const CHAPTERS = [
  {
    years: "1976 – 1981",
    place: "Pretoria",
    title: "The diploma that never arrived",
    body: [
      "I matriculated from Afrikaans Hoër Seunskool in Pretoria in 1976, did two years of compulsory military service at the School of Armour in Bloemfontein, and then spent three years at Technikon Pretoria studying Interior Design.",
      "I completed the course. I never received the diploma — I had one subject to re-write, Model Building, and by then we had learned that the Design Institute of South Africa was not recognising the National Diploma anyway. So I walked away from three years of study with nothing on paper.",
      "It is the first thing on this page for a reason. I have never had a qualification to hide behind. Everything after this was learned by doing it.",
    ],
  },
  {
    years: "1982 – 1992",
    place: "Pretoria, Johannesburg, Durban",
    title: "Shop windows by day, stage lights by night",
    body: [
      "I went into visual merchandising — Foschini in Pretoria from 1982, then Hepworths as Senior Visual Coordinator covering Gauteng, KwaZulu-Natal and the Free State, until the company closed down in 1986.",
      "Then I played music for a living. Six years in cover bands, mostly on three-month contracts with the Holiday Inn group, and in clubs around Johannesburg and Pretoria. It is not a detour I apologise for. Playing to a room that did not come to see you teaches you to read an audience fast, and to keep going when the room is not with you.",
      "A run of gigs brought me to Durban. I heard there were visual coordinator posts going, walked into Miladys, and got one. I kept playing part-time until 1996.",
    ],
  },
  {
    years: "1992 – 2002",
    place: "Durban",
    title: "Twelve stores, then none",
    body: [
      "Miladys until 1995, then John Craig — men's clothing, aimed at an upmarket and increasingly confident black customer in a country that had just held its first democratic election. I was responsible for the merchandising and visual presentation of twelve branches across KwaZulu-Natal and the Eastern Cape.",
      "It was the best decade of my working life to that point. I sat in real commercial conversations, got involved in stock movements, sell-off rates and profit, and my input was taken seriously.",
      "At the end of 2001 John Craig restructured. KwaZulu-Natal was left with four stores. My position went part-time, then redundant. I was kept on contract through 2002 to look after what remained, and then that ended too.",
    ],
  },
  {
    years: "2002 – 2007",
    place: "Durban",
    title: "Starting again at forty-four",
    body: [
      "I was forty-four. Retail was struggling and I could see that finding another position doing what I had always done was not realistic. So I sat down and studied web design.",
      "It was not a leap into something foreign. Graphic design, visual display, merchandising — the work had always been about making someone want to walk closer. A web page is a shop window that has to earn attention in about three seconds.",
      "I built HTML sites for tourism and information businesses through 2003 and 2004. Then, in late 2004, I put everything into learning Joomla, because clients kept asking for something they could update themselves and the demand for a real content management system was growing fast. In 2004 the features Joomla gave me — shopping carts, booking engines, classifieds — were otherwise only available to PHP and ASP programmers. I was neither. That was the whole point.",
      "From 2005 to 2007 I freelanced: tourism, corporate, information and e-commerce sites.",
    ],
  },
  {
    years: "2008 – 2013",
    place: "Durban",
    title: "The work I am proudest of",
    body: [
      "Nyko Manufacturing, from 2008 to 2010, built industrial shrink-wrap machinery. I built their site and got them into the top five on Google for shrink wrap machine, blister pack machine and skin pack machine — second, third and first respectively. Specific, boring, measurable. My favourite kind of result.",
      "Then Southern Circle Tours and Safaris, from 2010, with the Soccer World Cup coming. We rebuilt the site and ran an aggressive international marketing programme through the tournament, then had to hold those gains afterwards against a client base that was 99% international — Britain, Europe, America, and increasingly Japan and China.",
      "The part I am still proud of: online tour booking with credit card payment. The commercial systems for this were priced far out of reach of a small or medium tour operator, so we built our own on Joomla and Jomres. At the time we were the only medium-sized tour operator in South Africa offering it.",
    ],
  },
  {
    years: "2013 – 2020",
    place: "Durban",
    title: "One hundred and fifty websites, then two hundred people gone",
    body: [
      "Overflow PLR was primarily a call centre, and it needed websites behind everything it was promoting — the programmes the agents were selling, and sites for Overflow's own clients. I built around a hundred and fifty of them over close to seven years, starting in Joomla and moving to WordPress as the industry did.",
      "A hundred and fifty sites teaches you something no course will. You stop being precious. You learn what can be reused, what always breaks, what a client will actually maintain once you hand it over, and how to get something live and working when it needs to be live and working.",
      "I was retrenched on 1 March 2020, at sixty-one. Overflow went from roughly two hundred people — mostly call centre agents — to five. Two hundred jobs, in a country where a job feeds a household and often several. I had been through a retrenchment myself and I still was not ready to watch one at that scale.",
      "Twenty-five days later the country went into lockdown.",
    ],
  },
  {
    years: "2020 – today",
    place: "Durban",
    title: "CRM Solutions, and no intention of stopping",
    body: [
      "I started working for myself the day I was retrenched, and I have been CRM Solutions ever since. Three weeks later every business in the country closed its doors, and I was a brand-new freelancer with no employer and no pipeline. I do not recommend the timing. I do not regret it either. The work has changed shape: less \"build me a website\" and more \"work out why the money is leaking out of this business and then build the thing that stops it\" — the site, the enquiry path, the follow-up, the customer data and the measurement, as one connected system.",
      "I am sixty-eight. That is not a disclaimer, it is the qualification. I have watched the web go from hand-written HTML to Joomla to WordPress to whatever we are calling this now, and the thing that decides whether a business does well online has not changed once in twenty-four years. It was never the technology.",
    ],
  },
] as const;

/**
 * Sites built in earlier years that are still live today. Listed by domain
 * with a short description taken from the site's own content, never guessed.
 * Every entry is checked live before it is listed — a portfolio must never
 * link to a dead host.
 */
const LIVE_SITES = [
  ["cabanamio.co.za", "Self-catering chalets a few metres from Amanzimtoti beach."],
  ["cabanamioholidays.co.za", "Three-bedroom beach chalets and ten-year flexi-week packages."],
  ["cabanamio-chalets.co.za", "Landing page for the Cabana Mio chalets."],
  ["la-hacienda.site", "Rustic boutique accommodation at Salt Rock, KwaZulu-Natal."],
  ["samsonenergy.co.za", "Solar installations for homes, businesses, estates and farms."],
  ["sca-za.com", "South Coast Advisory — accounting and business management, a Xero Silver Partner."],
  ["shadesobl.co.za", "Shades of Blue Lifestyles — steel fabrication, repairs, maintenance and labour support."],
  ["storvac.co.za", "StorVac Systems — vacuum sealing bags for channel sealers, delivered nationwide."],
  ["sunshinesugarsa.online", "Sugar manufacturing and distribution."],
  ["yasukesafety.co.za", "Personal protective equipment and workwear, sold online across South Africa."],
  ["autorepairshop.co.za", "Landing page for a customer-acquisition offer aimed at auto repair shops."],
] as const;

const FUTURE = [
  {
    kicker: "2026",
    title: "I am not giving an old car a facelift.",
    body: [
      "Twenty years inside content management systems taught me their limits better than their manuals ever did. Joomla, then WordPress. I am grateful for every site I built on them and I would not have had a career without them.",
      "But I spent a great deal of that time working around guardrails rather than building. And by 2026 it was clear they are not moving fast enough any more. Staying with them would be giving an old car a facelift — new paint, same sluggish engine underneath. It will never be as nimble as what has come after it.",
      "At this stage of my life I am not willing to be the man holding on to the past because it is familiar.",
    ],
  },
  {
    kicker: "The next ten years",
    title: "The website stops being the job.",
    body: [
      "Things are changing at a pace I have not seen before in twenty-four years of this. I am on that train and I intend to enjoy the ride, wherever it ends up going.",
      "I think web development as a trade is approaching its expiry date. Building the site will not be the work much longer — the tools are getting too good at it. The work that remains is the business itself: helping small and medium-sized businesses widen their footprint online, streamline how they market, how they take a new customer on, and how they look after the customers they already have.",
      "Less a developer. More a business and customer consultant who can still build the thing himself when it needs building.",
    ],
  },
  {
    kicker: "The final lap",
    title: "I work like the finish line is close, because it is.",
    body: [
      "I am sixty-eight. I am on the final lap and I can see the end of the race from here, even though nobody has told me where the line is.",
      "We buried a school friend the other day. At my age death is not an abstraction — it waits around a corner somewhere and I have stopped pretending otherwise. None of us knows when we will be called home. If I am honest with you, that is the engine now. Knowing the time is limited is exactly what makes me work the way I do.",
      "So I treat every project as though it might be the last one I am given to finish. I am an artist at heart, and I would like each build to be a piece of art rather than a delivery — solid enough that whatever technology comes next can be built on top of it, and still earning its place in the business long after I have handed it over.",
      "And I have no intention of spending the years I have left on projects or partnerships where only one side benefits. That is not arrogance. It is arithmetic.",
    ],
  },
] as const;

const VALUES = [
  ["Honesty", "Maintained toward everyone I deal with, for as long as I am around to deal with them."],
  ["Passion", "The energy that keeps the wheels turning. Doing the work as well as I can, and enjoying it."],
  ["Commitment", "Keeping the promises I make and meeting the deadline the client was given."],
  ["Caring", "Really listening. Showing interest. Making the person in front of me feel like they matter."],
  ["Health", "Without it the other four mean nothing. It is the one nobody earns."],
] as const;

const FAQ = [
  {
    q: "Who is Ignatius Ackermann?",
    a: "Ignatius Ackermann is a web developer, designer and business-systems builder based in Durban, South Africa. He is the founder of CRM Solutions, which builds connected revenue platforms for established businesses. He has worked on the commercial web since 2002, after two earlier careers in retail visual merchandising and live music.",
  },
  {
    q: "Where is Ignatius Ackermann based?",
    a: "Durban, in KwaZulu-Natal, South Africa. He works remotely with clients in South Africa, the United States and selected international markets.",
  },
  {
    q: "What does he actually do?",
    a: "He builds the whole commercial journey a business runs on — the website, the enquiry and booking path, the follow-up, the customer data and the measurement — rather than a website on its own. He works founder-led, from first diagnosis through to launch, without handing the work to a junior team after the sale.",
  },
  {
    q: "What is he best known for?",
    a: "Building an online tour booking and credit card payment system for Southern Circle Tours and Safaris around the 2010 FIFA World Cup, at a time when the commercial equivalents were priced out of reach of small and medium-sized South African tour operators. It was built on Joomla and Jomres.",
  },
  {
    q: "What qualifications does he have?",
    a: "None in web development. He studied Interior Design at Technikon Pretoria from 1979 to 1981 and completed the course but never received the diploma. Everything he does professionally he taught himself, starting in 2002 at the age of 44 after being made redundant in retail.",
  },
  {
    q: "How can you contact him?",
    a: "Through crmsolutions.app — either the contact page or by booking a discovery call directly.",
  },
] as const;

const WORK = [
  ["CRM Solutions", "Connected revenue platforms for established businesses.", "https://www.crmsolutions.app"],
  ["Star Aesthetic Centre", "Doctor-led aesthetic clinic in Durban North.", "https://www.staraesthetic.co.za"],
  ["Lava-SA", "Specialist commerce and product education platform.", "https://www.lava-sa.com"],
] as const;

function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ignatius Ackermann",
    givenName: "Ignatius",
    familyName: "Ackermann",
    jobTitle: "Web Developer and Founder",
    description:
      "Web developer, designer and founder of CRM Solutions, based in Durban, South Africa. Self-taught on the web since 2002 following earlier careers in retail visual merchandising and as a professional musician. Built roughly 150 websites for Overflow PLR between 2013 and 2020 and has run CRM Solutions independently since March 2020.",
    image: "https://www.crmsolutions.app/ignatius-ackermann.webp",
    url: "https://www.crmsolutions.app/ignatius-ackermann",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Durban",
      addressRegion: "KwaZulu-Natal",
      addressCountry: "ZA",
    },
    worksFor: {
      "@type": "Organization",
      name: "CRM Solutions",
      url: "https://www.crmsolutions.app",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Technikon Pretoria",
    },
    knowsAbout: [
      "Web development",
      "WordPress",
      "Joomla",
      "Search engine optimisation",
      "E-commerce",
      "Content management systems",
      "Customer relationship management",
      "Online booking systems",
      "Conversion optimisation",
    ],
    sameAs: [
      "https://www.crmsolutions.app",
      "https://www.staraesthetic.co.za",
      "https://www.lava-sa.com",
      "https://www.linkedin.com/in/ignatiusackermann/",
    ],
  };
}

function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export default function IgnatiusAckermannPage() {
  return (
    <main className="story-page" id="top">
      <JsonLd data={[personSchema(), faqSchema()]} />
      <StandardHeader />

      <section className="story-hero section-shell">
        <div className="story-hero-copy">
          <p className="eyebrow">The person behind CRM Solutions</p>
          <h1>
            Ignatius Ackermann<span>.</span>
          </h1>
          <p className="story-lede">
            I am a web developer in Durban, South Africa. I was forty-four the first time I
            opened a book about building websites, I have started over three times since, and I am
            sixty-eight and still building. This is the whole story, including the parts that did
            not work.
          </p>
        </div>
        <figure className="story-portrait">
          <Image
            src="/ignatius-ackermann.webp"
            alt="Ignatius Ackermann, founder of CRM Solutions, Durban"
            width={1000}
            height={1000}
            sizes="(max-width: 1000px) 100vw, 40vw"
            priority
          />
        </figure>
      </section>

      <section className="story-answer section-shell">
        <div>
          <p className="eyebrow eyebrow-light">The short answer</p>
          <h2>If you only read one paragraph.</h2>
        </div>
        <div className="story-answer-copy">
          <p>
            Ignatius Ackermann is a web developer, designer and business-systems builder based in
            Durban, South Africa, and the founder of CRM Solutions. He matriculated in Pretoria in
            1976, studied Interior Design at Technikon Pretoria, spent twenty years in retail visual
            merchandising and six years as a professional musician, and taught himself web
            development in 2002 after being made redundant. He has built commercial websites,
            e-commerce stores, booking engines and customer systems ever since — including an online
            tour booking and payment platform used through the 2010 FIFA World Cup, and roughly 150
            websites for the call-centre group Overflow PLR between 2013 and 2020. He was retrenched on
            1 March 2020, three weeks before South Africa’s Covid lockdown, and has run CRM
            Solutions independently ever since. He is 68 years old.
          </p>
        </div>
      </section>

      <section className="story-chapters section-shell">
        <div className="story-heading">
          <p className="eyebrow">The long version</p>
          <h2>Nobody arrives here in a straight line.</h2>
        </div>

        {CHAPTERS.map((chapter) => (
          <article className="story-chapter" key={chapter.years}>
            <div className="story-chapter-meta">
              <span className="story-years">{chapter.years}</span>
              <span className="story-place">{chapter.place}</span>
            </div>
            <div className="story-chapter-body">
              <h3>{chapter.title}</h3>
              {chapter.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="story-now section-shell">
        <div className="story-heading">
          <p className="eyebrow">Where this goes</p>
          <h2>Still getting out of the starting blocks — at an age when most people stop.</h2>
        </div>
        <div className="story-now-copy">
          <p>
            I am not the person with a hundred thousand subscribers explaining how easy this is. I
            am the person who has been quietly good at this for two decades and is still working out
            how to be found. If you are somewhere similar — capable, experienced, and struggling to
            get the thing moving — you are not doing it wrong. It is genuinely hard, and most of the
            people telling you otherwise are selling a course.
          </p>
          <p>
            What I have instead is thirty years of watching what actually makes a customer walk
            closer, come back, and tell someone else. That started in a shop window in Pretoria in
            1982 and it has not changed much. Only the window has.
          </p>
        </div>
        <div className="story-work">
          {WORK.map(([name, line, href]) => (
            <a key={name} href={href} target="_blank" rel="noreferrer">
              <strong>{name}</strong>
              <span>{line}</span>
              <em>
                Visit <span aria-hidden="true">↗</span>
              </em>
            </a>
          ))}
        </div>
      </section>

      <section className="story-live section-shell">
        <div className="story-heading">
          <p className="eyebrow">Still online</p>
          <h2>Work from earlier years that is still running today.</h2>
          <p>
            These are not examples of what I build now, and I am not going to pretend otherwise.
            They were built to the standard of their time, inside the limits of WordPress and
            Joomla, with whatever budget the client had. Some of them need an upgrade badly and I
            know exactly which ones.
          </p>
          <p>
            They are here because a website that is still doing its job years after it was handed
            over says something a portfolio of fresh mockups cannot. Nothing on this list was built
            last month to look good on this page.
          </p>
        </div>
        <ul className="story-live-list">
          {LIVE_SITES.map(([domain, note]) => (
            <li key={domain}>
              <a href={`https://www.${domain}`} target="_blank" rel="noreferrer">
                <strong>
                  {domain} <span aria-hidden="true">↗</span>
                </strong>
                <em>{note}</em>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="story-values section-shell">
        <div className="story-heading">
          <p className="eyebrow">What has not changed</p>
          <h2>Five things I wrote down years ago and still mean.</h2>
        </div>
        <div className="story-values-list">
          {VALUES.map(([name, body]) => (
            <article key={name}>
              <h3>{name}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="story-facts section-shell">
        <div className="story-heading">
          <p className="eyebrow">For the record</p>
          <h2>The facts, plainly stated.</h2>
        </div>
        <dl className="story-facts-list">
          {FACTS.map(([term, value]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="story-future">
        <div className="section-shell">
          <div className="story-heading">
            <p className="eyebrow eyebrow-light">What comes next</p>
            <h2>The part of the story that has not happened yet.</h2>
          </div>
          <div className="story-future-list">
            {FUTURE.map((item) => (
              <article key={item.kicker}>
                <span>{item.kicker}</span>
                <div>
                  <h3>{item.title}</h3>
                  {item.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="story-faq section-shell">
        <div className="story-heading">
          <p className="eyebrow">Questions people ask</p>
          <h2>Straight answers.</h2>
        </div>
        <div className="story-faq-list">
          {FAQ.map((item) => (
            <article key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </article>
          ))}
        </div>
        <p className="story-faq-note">
          Written plainly and answered directly so that a search engine, or an AI assistant asked
          about me, can find something accurate rather than assembling something vague.{" "}
          <Link href="/contact">Correct me if anything here is wrong</Link>.
        </p>
      </section>

      <DiscoveryCallSection
        eyebrow="If any of that sounded familiar"
        title="Tell me what you are trying to get moving."
        body="Book a 60-minute Discovery Call. No pitch deck, no junior account manager — just the two of us looking at what is actually holding the business back."
      />

      <SiteFooter />
    </main>
  );
}
