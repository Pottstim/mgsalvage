import { Link } from "wouter";
import PageHeader from "@/components/PageHeader";
import ConsumerForm from "@/components/ConsumerForm";
import { SERVICE_AREAS, COMPANY, FAQS, TESTIMONIALS } from "@/lib/siteData";
import SEOHead, { localBusinessSchema, faqSchema, breadcrumbSchema, serviceSchema } from "@/components/SEOHead";
import { useMemo } from "react";
import { CheckCircle, Phone, Star, ArrowRight } from "lucide-react";

export default function CityPage({ city }: { city: string }) {
  const area = SERVICE_AREAS.find((a) => a.slug === city);

  const localFaqs = FAQS.slice(0, 4);
  const schemas = useMemo(() => area ? [
    localBusinessSchema(),
    serviceSchema(`Cash for Junk Cars in ${area.name}`, area.description),
    faqSchema(localFaqs),
    breadcrumbSchema([
      { name: "Service Areas", url: "/service-areas" },
      { name: `${area.name}, ${area.state}`, url: `/service-areas/${area.slug}` },
    ]),
  ] : [], [area]);

  if (!area) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Area Not Found</h1>
        <p className="text-muted-foreground mb-6">We couldn't find information for this service area.</p>
        <Link href="/service-areas" className="text-primary font-semibold hover:underline">
          View All Service Areas
        </Link>
      </div>
    );
  }

  const localTestimonials = TESTIMONIALS.filter(
    (t) => t.location.toLowerCase().includes(area.name.toLowerCase())
  );

  return (
    <>
      <SEOHead
        title={`Cash for Junk Cars ${area.name} ${area.state} | Free Towing`}
        description={area.description}
        canonical={`/service-areas/${area.slug}`}
        schemas={schemas}
      />
      <PageHeader
        title={`Cash for Junk Cars in ${area.name}, ${area.state}`}
        subtitle={area.description}
        breadcrumbs={[
          { label: "Service Areas", href: "/service-areas" },
          { label: `${area.name}, ${area.state}` },
        ]}
      />

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Junk Car Removal in {area.name}
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                MG Salvage provides fast, reliable junk car removal throughout {area.name} and {area.county}. We buy vehicles in any condition — running, non-running, wrecked, or abandoned — and we always offer free towing and cash on the spot.
              </p>

              <h3 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Why Choose MG Salvage in {area.name}?
              </h3>
              <ul className="flex flex-col gap-2.5 mb-8">
                {[
                  `Local service covering all of ${area.county}`,
                  "Same-day and next-day pickup available",
                  "Free towing — no hidden fees",
                  "Cash paid on the spot",
                  "We handle all paperwork",
                  "Any vehicle condition accepted",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              {localTestimonials.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                    What {area.name} Customers Say
                  </h3>
                  {localTestimonials.map((t, i) => (
                    <div key={i} className="bg-muted/50 rounded-xl p-5 mb-3">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="w-3.5 h-3.5 text-primary fill-primary" />
                        ))}
                      </div>
                      <p className="text-sm text-foreground italic mb-2">"{t.quote}"</p>
                      <p className="text-xs text-muted-foreground font-semibold">— {t.name}, {t.location}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
                <p className="text-sm font-semibold text-foreground mb-2">
                  Get a junk car estimate in {area.name}
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  Call us directly for an instant phone estimate.
                </p>
                <a
                  href={`tel:${COMPANY.phoneRaw}`}
                  className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {COMPANY.phone}
                </a>
              </div>
            </div>

            <div className="lg:col-span-3">
              <ConsumerForm source={`city-${area.slug}`} />
            </div>
          </div>
        </div>
      </section>

      {/* Local FAQ */}
      <section className="bg-muted/50 py-12 md:py-16">
        <div className="container max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center" style={{ fontFamily: "var(--font-heading)" }}>
            FAQ for {area.name} Area
          </h2>
          <div className="space-y-4">
            {localFaqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-lg border border-border p-5">
                <h4 className="font-semibold text-foreground text-sm mb-2">{faq.question}</h4>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/faq" className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:underline">
              View All FAQs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
