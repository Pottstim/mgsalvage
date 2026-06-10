import { useEffect } from "react";
import { COMPANY, TESTIMONIALS, SERVICE_AREAS } from "@/lib/siteData";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  schemas?: Record<string, unknown>[];
  noIndex?: boolean;
}

export default function SEOHead({ title, description, canonical, keywords, schemas, noIndex = false }: SEOHeadProps) {
  useEffect(() => {
    const fullTitle = `${title} | MG Salvage`;
    document.title = fullTitle;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // Meta robots
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.setAttribute("name", "robots");
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute("content", noIndex ? "noindex, nofollow" : "index, follow");

    // Meta keywords
    if (keywords) {
      let metaKw = document.querySelector('meta[name="keywords"]');
      if (!metaKw) {
        metaKw = document.createElement("meta");
        metaKw.setAttribute("name", "keywords");
        document.head.appendChild(metaKw);
      }
      metaKw.setAttribute("content", keywords);
    }

    // Open Graph tags
    const ogTags: Record<string, string> = {
      "og:title": fullTitle,
      "og:description": description,
      "og:type": "website",
      "og:site_name": "MG Salvage",
      "og:image": "https://mgsalvage.com/assets/og-image.jpg",
      "og:image:width": "1200",
      "og:image:height": "630",
    };
    if (canonical) {
      ogTags["og:url"] = `https://mgsalvage.com${canonical}`;
    }
    Object.entries(ogTags).forEach(([property, content]) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    });

    // Twitter Card tags
    const twitterTags: Record<string, string> = {
      "twitter:card": "summary_large_image",
      "twitter:title": fullTitle,
      "twitter:description": description,
      "twitter:image": "https://mgsalvage.com/assets/og-image.jpg",
    };
    Object.entries(twitterTags).forEach(([name, content]) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    });

    // Canonical
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", `https://mgsalvage.com${canonical}`);
    }

    // JSON-LD schemas
    const existingScripts = document.querySelectorAll('script[data-seo="true"]');
    existingScripts.forEach((s) => s.remove());

    if (schemas && schemas.length > 0) {
      schemas.forEach((schema) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo", "true");
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
      });
    }

    return () => {
      const scripts = document.querySelectorAll('script[data-seo="true"]');
      scripts.forEach((s) => s.remove());
    };
  }, [title, description, canonical, keywords, schemas, noIndex]);

  return null;
}

// ── Reusable schema generators ──────────────────────────────────────────

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://mgsalvage.com/#business",
    name: COMPANY.name,
    description: COMPANY.description,
    url: "https://mgsalvage.com",
    sameAs: [
      "https://www.google.com/maps?cid=02251826648692237950",
      "https://www.facebook.com/mgsalvage",
      "https://www.yelp.com/biz/mg-salvage-sanford",
      "https://www.bbb.org/us/nc/sanford/profile/auto-salvage/mg-salvage",
    ],
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
    areaServed: [
      { "@type": "City", name: "Sanford", containedInPlace: { "@type": "State", name: "North Carolina" } },
      { "@type": "City", name: "Fayetteville", containedInPlace: { "@type": "State", name: "North Carolina" } },
      { "@type": "City", name: "Pittsboro", containedInPlace: { "@type": "State", name: "North Carolina" } },
      { "@type": "City", name: "Carthage", containedInPlace: { "@type": "State", name: "North Carolina" } },
      { "@type": "City", name: "Lillington", containedInPlace: { "@type": "State", name: "North Carolina" } },
    ],
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

export function serviceSchema(name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: name,
    provider: {
      "@type": "LocalBusiness",
      name: COMPANY.name,
      "@id": "https://mgsalvage.com/#business",
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 35.4799,
        longitude: -79.1803,
      },
      geoRadius: "80467",
    },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mgsalvage.com/" },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        ...(item.url ? { item: `https://mgsalvage.com${item.url}` } : {}),
      })),
    ],
  };
}

export function aggregateRatingSchema() {
  const count = String(TESTIMONIALS.length);
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://mgsalvage.com/#business",
    name: COMPANY.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: count,
      reviewCount: count,
    },
  };
}

export function autoDealerSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    "@id": "https://mgsalvage.com/#business",
    name: COMPANY.name,
    description: COMPANY.description,
    url: "https://mgsalvage.com",
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
    areaServed: SERVICE_AREAS.map((area) => ({
      "@type": "City",
      name: area.name,
      containedInPlace: { "@type": "State", name: "North Carolina" },
    })),
    openingHours: "Mo-Sa 08:00-18:00",
    priceRange: "$$",
    paymentAccepted: "Cash, Check",
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