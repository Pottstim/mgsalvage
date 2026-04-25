/**
 * Server-side SEO meta injection middleware.
 * Intercepts HTML responses and injects per-route <title>, <meta>, canonical,
 * Open Graph tags, and JSON-LD structured data into the HTML template BEFORE
 * sending it to the client. This ensures crawlers see correct metadata on first pass.
 */

const DOMAIN = "https://mgsalvage.com";

// ── Company data (mirrors client siteData.ts) ──────────────────────────
const COMPANY = {
  name: "MG Salvage",
  phone: "(919) 555-0123",
  email: "info@mgsalvage.com",
  description:
    "MG Salvage is a professional salvage and vehicle acquisition company headquartered in Sanford, NC. We buy junk, damaged, and unwanted vehicles from consumers and businesses across central North Carolina.",
};

const SERVICE_AREAS = [
  { slug: "sanford", name: "Sanford", state: "NC", county: "Lee County" },
  { slug: "fayetteville", name: "Fayetteville", state: "NC", county: "Cumberland County" },
  { slug: "pittsboro", name: "Pittsboro", state: "NC", county: "Chatham County" },
  { slug: "carthage", name: "Carthage", state: "NC", county: "Moore County" },
  { slug: "lillington", name: "Lillington", state: "NC", county: "Harnett County" },
];

const B2B_VERTICALS: Record<string, { title: string; description: string }> = {
  "mechanic-shops": {
    title: "Vehicle Removal for Mechanic Shops",
    description:
      "MG Salvage partners with mechanic shops across central NC to remove abandoned and unwanted vehicles quickly and reliably.",
  },
  "auto-body-shops": {
    title: "Vehicle Removal for Body Shops & Collision Centers",
    description:
      "MG Salvage works with auto body and collision centers to remove totaled vehicles and insurance write-offs efficiently.",
  },
  "used-car-dealers": {
    title: "Lot Clearing for Used Car Dealers",
    description:
      "MG Salvage helps used car dealers clear trade-ins, auction rejects, and aging inventory that isn't worth reconditioning.",
  },
};

// ── Schema generators ───────────────────────────────────────────────────
function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${DOMAIN}/#business`,
    name: COMPANY.name,
    description: COMPANY.description,
    url: DOMAIN,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sanford",
      addressRegion: "NC",
      postalCode: "27330",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 35.4799,
      longitude: -79.1803,
    },
    areaServed: SERVICE_AREAS.map((a) => ({
      "@type": "City",
      name: a.name,
      containedInPlace: { "@type": "State", name: "North Carolina" },
    })),
    openingHours: "Mo-Sa 08:00-18:00",
    priceRange: "$$",
    paymentAccepted: "Cash",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Vehicle Acquisition Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Junk Car Removal" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cash for Junk Cars" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business Vehicle Removal" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Lot Clearing" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Free Towing" } },
      ],
    },
  };
}

function serviceSchema(name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    provider: { "@type": "LocalBusiness", name: COMPANY.name, "@id": `${DOMAIN}/#business` },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: { "@type": "GeoCoordinates", latitude: 35.4799, longitude: -79.1803 },
      geoRadius: "80467",
    },
  };
}

function aggregateRatingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${DOMAIN}/#business`,
    name: COMPANY.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "6",
      reviewCount: "6",
    },
  };
}

function breadcrumbSchema(items: { name: string; url?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${DOMAIN}/` },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        ...(item.url ? { item: `${DOMAIN}${item.url}` } : {}),
      })),
    ],
  };
}

const FAQS = [
  { question: "What types of vehicles do you buy?", answer: "We buy all types of vehicles regardless of condition — junk cars, damaged vehicles, non-running cars, trucks, SUVs, vans, and even commercial vehicles." },
  { question: "Do I need a title to sell my junk car?", answer: "While having a clean title makes the process faster, we can still purchase vehicles with salvage titles or even no title in many cases." },
  { question: "How quickly can you pick up my vehicle?", answer: "In most cases, we can schedule same-day or next-day pickup. Our team operates Monday through Saturday." },
  { question: "Is towing really free?", answer: "Yes, towing is always free. We never charge for vehicle pickup or towing — the price we quote is the price you receive, with no hidden fees." },
  { question: "How do I get an estimate for my junk car?", answer: "Simply fill out our online estimate form or call us directly. Provide basic details about your vehicle and we'll give you a fair cash offer, usually within minutes." },
  { question: "What paperwork do I need?", answer: "You'll need a valid photo ID and your vehicle title (if available). We handle all the necessary paperwork for the transfer." },
  { question: "Do you buy vehicles from businesses?", answer: "Absolutely. We work with mechanic shops, auto body centers, used car dealers, and fleet operators to remove unwanted vehicles." },
  { question: "What areas do you serve?", answer: "We serve a 50-mile radius from our headquarters in Sanford, NC, including Fayetteville, Pittsboro, Carthage, Lillington, and surrounding communities." },
];

function faqPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ── Route → meta mapping ────────────────────────────────────────────────
interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
  keywords: string;
  schemas: Record<string, unknown>[];
}

function getRouteMeta(pathname: string): RouteMeta {
  // Home
  if (pathname === "/") {
    return {
      title: "Cash for Junk Cars | Free Towing | Sanford NC | MG Salvage",
      description:
        "MG Salvage buys junk cars, offers free towing, and provides fast cash offers in Sanford, NC and surrounding areas. Get your free estimate today.",
      canonical: "/",
      keywords: "junk car removal, cash for junk cars, sell junk car, free towing, junk car buyer, Sanford NC, scrap car removal, same-day pickup, junk vehicle removal, sell my car for cash, unwanted vehicle removal, MG Salvage",
      schemas: [
        localBusinessSchema(),
        aggregateRatingSchema(),
        serviceSchema("Junk Car Removal", "Free junk car removal with cash offers and same-day pickup in Sanford, NC and surrounding areas."),
      ],
    };
  }

  // Sell Your Junk Car
  if (pathname === "/sell-your-junk-car") {
    return {
      title: "Sell Your Junk Car for Cash | Free Estimate | MG Salvage",
      description:
        "Get a free, no-obligation cash offer for your junk car. MG Salvage offers free towing, same-day pickup, and instant payment in Sanford, NC and surrounding areas.",
      canonical: "/sell-your-junk-car",
      keywords: "sell junk car, cash for junk cars, junk car estimate, free car estimate, sell my car for cash, junk car value, Sanford NC, free towing",
      schemas: [
        serviceSchema("Sell Your Junk Car", "Get a free cash offer for your junk, damaged, or unwanted vehicle with free towing and same-day pickup."),
        breadcrumbSchema([{ name: "Sell Your Junk Car", url: "/sell-your-junk-car" }]),
      ],
    };
  }

  // Junk Car Removal
  if (pathname === "/junk-car-removal") {
    return {
      title: "Junk Car Removal | Free Towing & Pickup | MG Salvage",
      description:
        "Professional junk car removal with free towing across central North Carolina. MG Salvage picks up vehicles in any condition \u2014 running or not.",
      canonical: "/junk-car-removal",
      keywords: "junk car removal, free car towing, junk vehicle pickup, scrap car removal, non-running car removal, central North Carolina, free pickup",
      schemas: [
        serviceSchema("Junk Car Removal", "Professional junk car removal with free towing across central North Carolina."),
        breadcrumbSchema([{ name: "Junk Car Removal", url: "/junk-car-removal" }]),
      ],
    };
  }

  // Business Vehicle Removal
  if (pathname === "/business-vehicle-removal") {
    return {
      title: "Business Vehicle Removal | Lot Clearing | MG Salvage",
      description:
        "MG Salvage provides commercial vehicle removal, lot clearing, and scheduled pickups for mechanic shops, body shops, and used car dealers across central NC.",
      canonical: "/business-vehicle-removal",
      keywords: "business vehicle removal, lot clearing, commercial vehicle removal, mechanic shop vehicle removal, body shop vehicle removal, dealer lot clearing, fleet disposal",
      schemas: [
        serviceSchema("Business Vehicle Removal", "Commercial vehicle removal and lot clearing for businesses across central North Carolina."),
        breadcrumbSchema([{ name: "Business Vehicle Removal", url: "/business-vehicle-removal" }]),
      ],
    };
  }

  // B2B Verticals
  const b2bMatch = pathname.match(/^\/business-vehicle-removal\/([\w-]+)$/);
  if (b2bMatch) {
    const slug = b2bMatch[1];
    const vertical = B2B_VERTICALS[slug];
    if (vertical) {
      return {
        title: `${vertical.title} | MG Salvage`,
        description: vertical.description,
        canonical: `/business-vehicle-removal/${slug}`,
        keywords: `${vertical.title.toLowerCase()}, vehicle removal, lot clearing, abandoned vehicle removal, ${slug.replace(/-/g, ' ')}, commercial vehicle pickup`,
        schemas: [
          serviceSchema(vertical.title, vertical.description),
          breadcrumbSchema([
            { name: "Business Vehicle Removal", url: "/business-vehicle-removal" },
            { name: vertical.title, url: `/business-vehicle-removal/${slug}` },
          ]),
        ],
      };
    }
  }

  // Service Areas hub
  if (pathname === "/service-areas") {
    return {
      title: "Service Areas | Junk Car Removal Near You | MG Salvage",
      description:
        "MG Salvage serves a 50-mile radius from Sanford, NC including Fayetteville, Pittsboro, Carthage, and Lillington. Find junk car removal near you.",
      canonical: "/service-areas",
      keywords: "junk car removal near me, service areas, Sanford NC, Fayetteville NC, Pittsboro NC, Carthage NC, Lillington NC, central North Carolina junk car buyer",
      schemas: [
        localBusinessSchema(),
        breadcrumbSchema([{ name: "Service Areas", url: "/service-areas" }]),
      ],
    };
  }

  // City pages
  const cityMatch = pathname.match(/^\/service-areas\/([\w-]+)$/);
  if (cityMatch) {
    const slug = cityMatch[1];
    const area = SERVICE_AREAS.find((a) => a.slug === slug);
    if (area) {
      return {
        title: `Cash for Junk Cars in ${area.name}, ${area.state} | MG Salvage`,
        description: `Sell your junk car in ${area.name}, ${area.state}. MG Salvage offers free towing, same-day pickup, and instant cash offers throughout ${area.county}.`,
        keywords: `junk car removal ${area.name}, cash for junk cars ${area.name} ${area.state}, sell junk car ${area.name}, free towing ${area.county}, ${area.name} scrap car buyer`,
        canonical: `/service-areas/${area.slug}`,
        schemas: [
          localBusinessSchema(),
          serviceSchema(`Cash for Junk Cars in ${area.name}`, `Junk car removal and cash offers in ${area.name}, ${area.state}.`),
          breadcrumbSchema([
            { name: "Service Areas", url: "/service-areas" },
            { name: `${area.name}, ${area.state}`, url: `/service-areas/${area.slug}` },
          ]),
        ],
      };
    }
  }

  // FAQ
  if (pathname === "/faq") {
    return {
      title: "Frequently Asked Questions | MG Salvage",
      description:
        "Find answers to common questions about selling your junk car, our towing process, payment, paperwork, and service areas.",
      canonical: "/faq",
      keywords: "junk car FAQ, sell junk car questions, junk car title, free towing FAQ, junk car process, vehicle removal questions",
      schemas: [
        breadcrumbSchema([{ name: "FAQ", url: "/faq" }]),
        faqPageSchema(),
      ],
    };
  }

  // About
  if (pathname === "/about") {
    return {
      title: "About MG Salvage | Sanford NC Junk Car Buyer",
      description:
        "Learn about MG Salvage \u2014 a professional salvage and vehicle acquisition company headquartered in Sanford, NC, serving central North Carolina since 2020.",
      canonical: "/about",
      keywords: "about MG Salvage, Sanford NC salvage company, junk car buyer, vehicle acquisition, central North Carolina",
      schemas: [
        localBusinessSchema(),
        breadcrumbSchema([{ name: "About", url: "/about" }]),
      ],
    };
  }

  // Reviews
  if (pathname === "/reviews") {
    return {
      title: "Customer Reviews & Testimonials | MG Salvage",
      description:
        "Read real reviews from consumers and businesses who have sold their junk cars to MG Salvage. Rated 4.9 out of 5 stars.",
      canonical: "/reviews",
      keywords: "MG Salvage reviews, junk car buyer reviews, customer testimonials, Sanford NC reviews, junk car removal ratings",
      schemas: [
        aggregateRatingSchema(),
        breadcrumbSchema([{ name: "Reviews", url: "/reviews" }]),
      ],
    };
  }

  // Contact
  if (pathname === "/contact") {
    return {
      title: "Contact MG Salvage | Get a Free Estimate",
      description:
        "Contact MG Salvage for a free junk car estimate, schedule a pickup, or request urgent same-day service. Call or fill out our form.",
      canonical: "/contact",
      keywords: "contact MG Salvage, junk car estimate, schedule pickup, same-day pickup, Sanford NC junk car removal",
      schemas: [
        localBusinessSchema(),
        breadcrumbSchema([{ name: "Contact", url: "/contact" }]),
      ],
    };
  }

  // Fallback
  return {
    title: "MG Salvage | Junk Car Removal & Cash for Cars in Sanford, NC",
    description:
      "MG Salvage buys junk cars, offers free towing, and provides fast cash offers in Sanford, NC and surrounding areas.",
    canonical: pathname,
    keywords: "junk car removal, cash for junk cars, free towing, Sanford NC, MG Salvage",
    schemas: [],
  };
}

// ── HTML injection ──────────────────────────────────────────────────────
export function injectSEO(html: string, pathname: string): string {
  const meta = getRouteMeta(pathname);

  // Build the meta/link/script tags to inject
  const tags: string[] = [];

  // Title
  tags.push(`<title>${escapeHtml(meta.title)}</title>`);

  // Meta description
  tags.push(`<meta name="description" content="${escapeAttr(meta.description)}" />`);

  // Meta keywords
  if (meta.keywords) {
    tags.push(`<meta name="keywords" content="${escapeAttr(meta.keywords)}" />`);
  }

  // Canonical
  tags.push(`<link rel="canonical" href="${DOMAIN}${meta.canonical}" />`);

  // Open Graph
  tags.push(`<meta property="og:title" content="${escapeAttr(meta.title)}" />`);
  tags.push(`<meta property="og:description" content="${escapeAttr(meta.description)}" />`);
  tags.push(`<meta property="og:type" content="website" />`);
  tags.push(`<meta property="og:site_name" content="MG Salvage" />`);
  tags.push(`<meta property="og:url" content="${DOMAIN}${meta.canonical}" />`);
  tags.push(`<meta property="og:image" content="${DOMAIN}/manus-storage/og-image_144fea9d.png" />`);
  tags.push(`<meta property="og:image:width" content="1200" />`);
  tags.push(`<meta property="og:image:height" content="630" />`);

  // JSON-LD schemas
  for (const schema of meta.schemas) {
    tags.push(`<script type="application/ld+json">${JSON.stringify(schema)}</script>`);
  }

  const injection = tags.join("\n    ");

  // Replace the static <title> and <meta description> in the template
  let result = html.replace(
    /<title>.*?<\/title>/,
    ""
  );
  result = result.replace(
    /<meta name="description" content="[^"]*" \/>/,
    ""
  );

  // Inject right before </head>
  result = result.replace("</head>", `    ${injection}\n  </head>`);

  return result;
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttr(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
