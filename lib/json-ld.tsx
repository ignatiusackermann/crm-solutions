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
    address: {
      "@type": "PostalAddress",
      addressLocality: "Durban",
      addressCountry: "ZA",
    },
    areaServed: [
      { "@type": "Country", name: "South Africa" },
      { "@type": "Country", name: "United States" },
    ],
    knowsAbout: [
      "Revenue platform design",
      "Customer journey architecture",
      "CRM implementation",
      "Conversion optimisation",
      "Commercial measurement",
    ],
    sameAs: [] as string[],
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
    areaServed: ["ZA", "US"],
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "10000",
      priceValidUntil: "2027-12-31",
      description: "Revenue Platform engagements begin at US$10,000.",
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
