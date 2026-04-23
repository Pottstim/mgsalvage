import PageHeader from "@/components/PageHeader";
import B2BForm from "@/components/B2BForm";
import { COMPANY, TESTIMONIALS } from "@/lib/siteData";
import SEOHead, { serviceSchema, breadcrumbSchema } from "@/components/SEOHead";
import { useMemo } from "react";
import { CheckCircle, Phone, Star } from "lucide-react";

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

export default function B2BVertical({ slug }: { slug: string }) {
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
              <B2BForm source={`b2b-${data.slug}`} defaultBusinessType={data.businessType} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
