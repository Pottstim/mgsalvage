import { Link } from "wouter";
import PageHeader from "@/components/PageHeader";
import { TESTIMONIALS, COMPANY } from "@/lib/siteData";
import SEOHead, { aggregateRatingSchema, breadcrumbSchema } from "@/components/SEOHead";
import { useMemo } from "react";
import { Star, ArrowRight, Phone } from "lucide-react";

export default function Reviews() {
  const schemas = useMemo(() => [
    aggregateRatingSchema(),
    breadcrumbSchema([{ name: "Reviews", url: "/reviews" }]),
  ], []);

  return (
    <>
      <SEOHead
        title="Reviews & Testimonials"
        description="Read reviews from real customers and business partners who've worked with MG Salvage for junk car removal in central NC."
        canonical="/reviews"
        schemas={schemas}
      />
      <PageHeader
        title="Reviews & Testimonials"
        subtitle="Hear from real customers and business partners who've worked with MG Salvage."
        breadcrumbs={[{ label: "Reviews" }]}
      />

      <section className="py-12 md:py-16">
        <div className="container">
          {/* Aggregate rating summary */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-primary fill-primary" />
              ))}
            </div>
            <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              4.9 out of 5
            </p>
            <p className="text-muted-foreground">Based on {TESTIMONIALS.length}+ reviews from customers and businesses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-xl border border-border p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>
                <p className="text-foreground text-sm leading-relaxed mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-3 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-muted-foreground">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.location} &middot; {t.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <h3 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Ready to Experience the MG Salvage Difference?
            </h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
              <Link
                href="/sell-your-junk-car"
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Get Your Free Estimate
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm"
              >
                <Phone className="w-4 h-4" />
                Call {COMPANY.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
