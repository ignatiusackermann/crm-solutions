type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const SITE_URL = "https://www.crmsolutions.app";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: "CRM Solutions",
    legalName: "CRM Solutions",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/crm-solutions-icon-512.png`,
    description:
      "Connected revenue platforms for established businesses—website, customer journey, CRM, automation and follow-up designed as one commercial system.",
    founder: {
      "@type": "Person",
      name: "Ignatius Ackermann",
      jobTitle: "Founder",
      url: `${SITE_URL}/#about`,
    },
    // E.164 rather than the local 076 form, so the number resolves the same
    // way for an international caller as it does for a South African one.
    // Matches the number on the Google Business Profile.
    telephone: "+27761809799",
    // Mirrors the Google Business Profile field for field: suburb and street
    // together, city separate. Postcode 4051 is what the profile stores — the
    // public Maps listing renders 4000, which is Google's own geocode and not
    // a defect in the profile. 4051 is canonical everywhere.
    address: {
      "@type": "PostalAddress",
      streetAddress: "104 Lothian Rd, Durban North",
      addressLocality: "Durban",
      addressRegion: "KwaZulu-Natal",
      postalCode: "4051",
      addressCountry: "ZA",
    },
    areaServed: [{ "@type": "Country", name: "South Africa" }],
    knowsAbout: [
      "Revenue platform design",
      "Customer journey architecture",
      "CRM implementation",
      "Conversion optimisation",
      "Commercial measurement",
    ],
    // Entity reconciliation: these tell Google the site, the Facebook page
    // and the Google Business Profile are one business. The Google URL is
    // the CID form rather than a maps.app.goo.gl short link or a /maps/place
    // path, because only the CID survives Google changing its URL format.
    // Ignatius's personal LinkedIn belongs on the Person schema in
    // app/ignatius-ackermann/page.tsx, not here.
    sameAs: [
      "https://www.facebook.com/p/CRM-Solutions-100066631755979/",
      "https://maps.google.com/?cid=5166188373915160663",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "CRM Solutions",
    description:
      "Connected revenue platforms for established businesses.",
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/revenue-platform#service`,
    name: "Revenue Platform",
    serviceType: "Connected commercial digital platform",
    provider: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/revenue-platform`,
    description:
      "A connected revenue system joining positioning, demand, conversion, CRM follow-up, retention and commercial measurement.",
    areaServed: ["ZA"],
    offers: {
      "@type": "Offer",
      priceCurrency: "ZAR",
      price: "20000",
      priceValidUntil: "2027-12-31",
      description: "Revenue Platform engagements begin at R20,000.",
      url: `${SITE_URL}/revenue-platform`,
    },
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: input.url,
    mainEntityOfPage: input.url,
    datePublished: input.datePublished || "2026-07-25",
    dateModified: "2026-07-25",
    author: {
      "@type": "Person",
      name: "Ignatius Ackermann",
    },
    publisher: {
      "@type": "Organization",
      name: "CRM Solutions",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand/crm-solutions-icon-512.png`,
      },
    },
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
