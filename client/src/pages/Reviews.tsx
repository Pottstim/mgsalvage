import { Link } from "wouter";
import PageHeader from "@/components/PageHeader";
import { TESTIMONIALS, COMPANY } from "@/lib/siteData";
import SEOHead, { aggregateRatingSchema, breadcrumbSchema } from "@/components/SEOHead";
import { useMemo } from "react";
import { Star, ArrowRight, Phone, ExternalLink, MessageSquare } from "lucide-react";

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

            {/* Google Business Profile Review Widget */}
            <div className="mt-8 max-w-lg mx-auto">
              <div className="bg-white rounded-2xl border-2 border-primary/20 shadow-lg p-6">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <h3 className="font-bold text-foreground text-lg" style={{ fontFamily: "var(--font-heading)" }}>
                    Leave Us a Google Review
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Your review helps other North Carolina vehicle owners find a trusted junk car buyer. It takes less than 60 seconds.
                </p>
                <a
                  href={COMPANY.googleBusinessUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#4285F4] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3367D6] transition-colors w-full justify-center"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Review Us on Google
                  <ExternalLink className="w-4 h-4" />
                </a>
                <div className="flex items-center justify-center gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#FBBC04] fill-[#FBBC04]" />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">Powered by Google Reviews</span>
                </div>
              </div>
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
