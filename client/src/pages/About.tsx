import { Link } from "wouter";
import PageHeader from "@/components/PageHeader";
import { COMPANY, HOW_IT_WORKS } from "@/lib/siteData";
import SEOHead, { localBusinessSchema, breadcrumbSchema } from "@/components/SEOHead";
import { useMemo } from "react";
import { ArrowRight, Phone, MapPin, Clock, Shield, Users } from "lucide-react";

export default function About() {
  const schemas = useMemo(() => [
    localBusinessSchema(),
    breadcrumbSchema([{ name: "About", url: "/about" }]),
  ], []);

  return (
    <>
      <SEOHead
        title="About MG Salvage"
        description="MG Salvage is a professional salvage and vehicle acquisition company in Sanford, NC. Learn about our team, values, and process."
        canonical="/about"
        schemas={schemas}
      />
      <PageHeader
        title="About MG Salvage"
        subtitle="Professional salvage and vehicle acquisition company headquartered in Sanford, NC."
        breadcrumbs={[{ label: "About" }]}
      />

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Who We Are
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              MG Salvage is a professional salvage and vehicle acquisition company serving central North Carolina from our headquarters in Sanford, NC. We buy junk, damaged, and unwanted vehicles from individual owners and businesses — offering fair cash offers, free towing, and a straightforward process you can count on.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We started MG Salvage because we saw a gap in the market: too many junk car services were unreliable, opaque about pricing, or slow to respond. We built our business on the opposite principles — clear communication, honest offers, and showing up when we say we will.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, we serve consumers and businesses across a 50-mile radius from Sanford, including Fayetteville, Pittsboro, Carthage, Lillington, and surrounding communities. Whether you have one old car in the driveway or a lot full of vehicles that need clearing, we're here to help.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
            {[
              { icon: Shield, title: "Honest Pricing", desc: "The price we quote is the price you get. No hidden fees, no last-minute deductions." },
              { icon: Clock, title: "Fast Response", desc: "We respond to estimates quickly and offer same-day or next-day pickup in most cases." },
              { icon: MapPin, title: "Local Service", desc: "We're based in Sanford and serve the surrounding 50-mile area. We know these communities." },
              { icon: Users, title: "Business Partners", desc: "We work with shops, dealers, and fleet operators as a reliable, long-term removal partner." },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-xl border border-border p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2" style={{ fontFamily: "var(--font-heading)" }}>{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center" style={{ fontFamily: "var(--font-heading)" }}>
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              {HOW_IT_WORKS.map((step) => (
                <div key={step.step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold mx-auto mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                    {step.step}
                  </div>
                  <h4 className="font-semibold text-foreground mb-1" style={{ fontFamily: "var(--font-heading)" }}>{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
