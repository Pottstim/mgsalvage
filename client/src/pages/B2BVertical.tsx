import { useParams } from "wouter";
import PageHeader from "@/components/PageHeader";
import B2BForm from "@/components/B2BForm";
import { COMPANY, TESTIMONIALS } from "@/lib/siteData";
import SEOHead, { serviceSchema, breadcrumbSchema } from "@/components/SEOHead";
import { useMemo } from "react";
import { CheckCircle, Phone, Star } from "lucide-react";
import { Link } from "wouter";

interface VerticalData {
  title: string;
  slug: string;
  businessType: string;
  headline: string;
  intro: string;
  benefits: string[];
  painPoints: string[];
  testimonialType: string;
}

const VERTICALS: Record<string, VerticalData> = {
  "mechanic-shops": {
    title: "Mechanic Shops",
    slug: "mechanic-shops",
    businessType: "Mechanic Shop",
    headline: "Vehicle Removal for Mechanic Shops",
    intro: "Abandoned customer vehicles taking up bay space? MG Salvage partners with mechanic shops across central NC to remove unwanted vehicles quickly and reliably — so you can focus on the cars that pay.",
    benefits: [
      "Free up valuable bay and lot space",
      "Remove abandoned customer vehicles legally",
      "Scheduled recurring pickups available",
      "Fast response — often same-day or next-day",
      "We handle all title and paperwork issues",
      "Fair payment for vehicles with salvage value",
    ],
    painPoints: [
      "Customers abandon vehicles after seeing repair estimates",
      "Lot space fills up with non-paying inventory",
      "Legal liability for storing abandoned vehicles",
      "Time wasted tracking down vehicle owners",
    ],
    testimonialType: "Mechanic Shop",
  },
  "auto-body-shops": {
    title: "Auto Body & Collision Centers",
    slug: "auto-body-shops",
    businessType: "Auto Body Shop",
    headline: "Vehicle Removal for Body Shops & Collision Centers",
    intro: "Totaled vehicles and insurance write-offs piling up? MG Salvage works with auto body and collision centers to remove vehicles efficiently, keeping your workflow and lot space clear.",
    benefits: [
      "Remove totaled and insurance write-off vehicles",
      "Clear lot space for incoming repair jobs",
      "Reliable scheduling around your operations",
      "Handle vehicles with salvage titles",
      "Professional and insured team",
      "Consistent pricing you can count on",
    ],
    painPoints: [
      "Totaled vehicles sit waiting for owner decisions",
      "Insurance write-offs take up valuable lot space",
      "Coordinating with multiple tow companies is unreliable",
      "Paperwork for salvage vehicles is time-consuming",
    ],
    testimonialType: "Body Shop",
  },
  "used-car-dealers": {
    title: "Used Car Dealers & Lot Clearing",
    slug: "used-car-dealers",
    businessType: "Used Car Dealer",
    headline: "Lot Clearing for Used Car Dealers",
    intro: "Keep your lot looking sharp and your inventory fresh. MG Salvage helps used car dealers clear trade-ins, auction rejects, and aging inventory that isn't worth reconditioning.",
    benefits: [
      "Clear trade-ins that aren't worth reconditioning",
      "Remove auction rejects and aging inventory",
      "Bulk vehicle removal in a single visit",
      "Flexible scheduling — weekly, monthly, or on-demand",
      "Fair market pricing on all vehicles",
      "Professional service that reflects well on your business",
    ],
    painPoints: [
      "Trade-ins pile up that aren't worth selling",
      "Auction rejects take up prime lot space",
      "Aging inventory hurts your lot's appearance",
      "Finding reliable removal services is hit-or-miss",
    ],
    testimonialType: "Dealer",
  },
};

export default function B2BVertical() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "";
  const data = VERTICALS[slug];
  const schemas = useMemo(() => data ? [
    serviceSchema(`Vehicle Removal for ${data.title}`, data.intro),
    breadcrumbSchema([
      { name: "Business Vehicle Removal", url: "/business-vehicle-removal" },
      { name: data.title, url: `/business-vehicle-removal/${data.slug}` },
    ]),
  ] : [], [data]);

  if (!data) return <div className="container py-20 text-center">Page not found.</div>;

  const testimonial = TESTIMONIALS.find((t) => t.type === data.testimonialType);

  return (
    <>
      <SEOHead
        title={`${data.headline} | MG Salvage`}
        description={data.intro}
        canonical={`/business-vehicle-removal/${data.slug}`}
        schemas={schemas}
      />
      <PageHeader
        title={data.headline}
        subtitle={data.intro}
        breadcrumbs={[
          { label: "Business Vehicle Removal", href: "/business-vehicle-removal" },
          { label: data.title },
        ]}
      />

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Common Challenges
              </h2>
              <ul className="flex flex-col gap-3 mb-8">
                {data.painPoints.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <h2 className="text-xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                How MG Salvage Helps
              </h2>
              <ul className="flex flex-col gap-3 mb-8">
                {data.benefits.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              {testimonial && (
                <div className="bg-muted/50 rounded-xl p-5 mb-6">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground italic mb-3">"{testimonial.quote}"</p>
                  <p className="text-xs text-muted-foreground font-semibold">
                    — {testimonial.name}, {testimonial.location}
                  </p>
                </div>
              )}

              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm"
              >
                <Phone className="w-4 h-4" />
                Call {COMPANY.phone}
              </a>
            </div>

            <div className="lg:col-span-3">
              <B2BForm source={`b2b-${data.slug}`} businessType={data.businessType} />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works — B2B Process */}
      <section className="bg-[oklch(0.13_0.01_250)] py-12 md:py-16">
        <div className="container max-w-3xl">
          <h2 className="text-2xl font-bold text-white mb-8 text-center" style={{ fontFamily: "var(--font-heading)" }}>
            How Our {data.title} Partnership Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { step: 1, title: "Initial Consultation", desc: `We assess your lot, discuss your pain points, and create a custom removal plan for your ${data.businessType.toLowerCase()}. No obligation.` },
              { step: 2, title: "Transparent Pricing", desc: "We provide per-vehicle pricing upfront. No hidden fees, no surprises. You know exactly what each removal costs before we show up." },
              { step: 3, title: "Scheduled Pickup", desc: "Same-day or next-day pickup available. We work around your business hours — early morning, after hours, or weekends." },
              { step: 4, title: "Payment & Documentation", desc: "Cash paid on pickup. We handle all title transfers, bills of sale, and NC DMV paperwork. You get a clean record of every transaction." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">{step}</div>
                  <h3 className="font-semibold text-white text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI / Why Partner — prose section */}
      <section className="py-12 md:py-16">
        <div className="container max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Why {data.title} Across Central NC Partner with MG Salvage
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Every abandoned vehicle on your lot represents lost revenue — bay space you can't bill for, inventory that isn't moving, and a liability exposure that grows with every month it sits. Across central NC, {data.businessType.toLowerCase()}s partner with MG Salvage because we understand the business pressures you face: tight margins, demanding customers, and the need to keep your operation running smoothly.
            </p>
            <p>
              Our process is designed to be invisible to your workflow. We schedule around your hours, arrive with our own equipment, handle every piece of NC DMV paperwork, and pay you cash on the spot. No invoicing delays, no net-30 terms, no back-and-forth. You call, we show up, we pay, we leave.
            </p>
            <p>
              For shops with recurring needs — whether it's monthly lot clearing or on-demand pickups — we offer priority scheduling and volume pricing. The more vehicles we handle for you, the better the per-vehicle rate. It's a partnership, not a transaction.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-12">
        <div className="container text-center">
          <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Ready to Clear Your Lot?
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Get a free, no-obligation assessment of your vehicle removal needs. We respond within one business day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={`tel:${COMPANY.phoneRaw}`} className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors">
              <Phone className="w-4 h-4" /> Call {COMPANY.phone}
            </a>
            <Link href="/business-vehicle-removal" className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors">
              Learn About Business Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
