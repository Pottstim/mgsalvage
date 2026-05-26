import { Link } from "wouter";
import PageHeader from "@/components/PageHeader";
import { TESTIMONIALS, COMPANY } from "@/lib/siteData";
import SEOHead, { aggregateRatingSchema, breadcrumbSchema } from "@/components/SEOHead";
import { useMemo } from "react";
import { Star, ArrowRight, Phone, ExternalLink } from "lucide-react";

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
                <Star key={i} className="w-7 h-7 text-primary fill-primary" />
              ))}
            </div>
            <p className="text-3xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              4.9 out of 5
            </p>
            <p className="text-muted-foreground mt-1">Based on {TESTIMONIALS.length}+ reviews from customers and businesses</p>

            {/* Google Business Profile CTA */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={COMPANY.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                <Star className="w-4 h-4 fill-current" />
                Leave Us a Review on Google
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <article key={i} className="bg-white rounded-xl border border-border p-6">
                {/* Star rating from data */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(t.rating ?? 5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-primary fill-primary" />
                  ))}
                </div>
                <blockquote className="text-muted-foreground mb-4 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.location} &middot; {t.type}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 text-center bg-muted/40 rounded-2xl p-10">
            <h3 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Ready to Experience the MG Salvage Difference?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of satisfied customers across central North Carolina.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/sell-your-junk-car"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Get Your Free Estimate <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="inline-flex items-center gap-2 border border-border text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-muted transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call {COMPANY.phone}
              </a>
              <a
                href={COMPANY.googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/5 transition-colors"
              >
                <Star className="w-4 h-4 fill-primary" />
                Leave a Google Review
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
