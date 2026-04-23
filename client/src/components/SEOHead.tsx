import { useEffect } from "react";
import { COMPANY } from "@/lib/siteData";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  schemas?: Record<string, unknown>[];
}

export default function SEOHead({ title, description, canonical, schemas }: SEOHeadProps) {
  useEffect(() => {
    document.title = `${title} | MG Salvage`;
    
    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // Open Graph tags
    const ogTags: Record<string, string> = {
      "og:title": `${title} | MG Salvage`,
      "og:description": description,
      "og:type": "website",
      "og:site_name": "MG Salvage",
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
  }, [title, description, canonical, schemas]);

  return null;
}

// Reusable schema generators
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: COMPANY.name,
    description: COMPANY.description,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sanford",
      addressRegion: "NC",
      postalCode: "27330",
      addressCountry: "US",
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
  };
}

export function serviceSchema(name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "LocalBusiness",
      name: COMPANY.name,
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 35.4799,
        longitude: -79.1803,
      },
      geoRadius: "80467", // 50 miles in meters
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
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: COMPANY.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "47",
      reviewCount: "47",
    },
  };
}
