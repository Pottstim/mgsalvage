import { Link } from "wouter";
import PageHeader from "@/components/PageHeader";
import B2BForm from "@/components/B2BForm";
import { COMPANY } from "@/lib/siteData";
import SEOHead, { serviceSchema, breadcrumbSchema } from "@/components/SEOHead";
import { useMemo } from "react";
import { CheckCircle, ArrowRight, Wrench, Car, Paintbrush } from "lucide-react";

export default function BusinessVehicleRemoval() {
  const schemas = useMemo(() => [
    serviceSchema("Business Vehicle Removal", "Reliable vehicle removal for mechanic shops, body shops, dealers, and fleet operators in Sanford, NC and across central North Carolina."),
    breadcrumbSchema([{ name: "Business Vehicle Removal", url: "/business-vehicle-removal" }]),
  ], []);

  const verticals = [
    {
      icon: Wrench,
      title: "Mechanic Shops",
      description: "Clear abandoned customer vehicles and free up bay space with scheduled removal service.",
      href: "/business-vehicle-removal/mechanic-shops",
    },
    {
      icon: Paintbrush,
      title: "Auto Body & Collision Centers",
      description: "Remove totaled vehicles and insurance write-offs efficiently with reliable pickup scheduling.",
      href: "/business-vehicle-removal/auto-body-shops",
    },
    {
      icon: Car,
      title: "Used Car Dealers & Lot Clearing",
      description: "Keep your lot clean and inventory fresh. We handle bulk vehicle removal on your schedule.",
      href: "/business-vehicle-removal/used-car-dealers",
    },
  ];

  return (
    <>
      <SEOHead
        title="Business Vehicle Removal | Commercial Services"
        description="Reliable vehicle removal services for mechanic shops, body shops, dealers, and fleet operators across central North Carolina."
        canonical="/business-vehicle-removal"
        schemas={schemas}
      />
      <PageHeader
        title="Business Vehicle Removal | Lot Clearing &amp; Commercial Services in Central NC"
        subtitle="Reliable vehicle removal services for mechanic shops, body shops, dealers, and fleet operators across central NC."
        breadcrumbs={[{ label: "Business Vehicle Removal" }]}
      />

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Vehicle Removal Built for Business
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              If you run an automotive shop in central NC, you know the pain of abandoned customer vehicles: they take up bay space you could be billing on, they attract complaints, and after 30 days they become a legal headache. We're the solution that shops, dealers, and body shops across Lee, Chatham, and Moore counties use to clear their lots without the paperwork nightmare.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Here's how it actually works for businesses: you call or fill out the form. We come by to assess the vehicles — often same-day or next-day. We give you a per-vehicle price in writing. We show up on schedule with our flatbed, load up, hand you cash or cut a check, and handle every piece of NC DMV paperwork. No invoicing, no net-30, no chasing payments. You get a clean lot and a clean record of every removal for your books.
            </p>
            
            <h3 className="text-xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              B2B Pricing & Payouts
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We pay per vehicle based on weight, parts value, and condition — same formula we use for consumer cars, but with volume pricing for businesses that clear lots regularly. Typical per-vehicle payouts run <strong>$200 to $1,500+</strong>. For shops that schedule recurring pickups (weekly, bi-weekly, monthly), we offer better per-vehicle rates and priority scheduling — meaning you call and we're there within 24 hours, guaranteed.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              A real example: one of our mechanic shop partners in Sanford clears 3-5 abandoned vehicles from their lot every month. Before MG Salvage, they were paying $150 per vehicle to a towing company that charged them to take cars away. With us, they get paid $200–$400 per vehicle instead. That's a swing of $1,000–$2,000 per month in their P&L — and their lot stays clean.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Lot clearing & abandoned vehicles",
                "Scheduled recurring pickups",
                "Multiple vehicles per visit",
                "Dedicated business accounts",
                "Flexible scheduling around your hours",
                "Professional, insured team",
                "Fair pricing on all vehicles",
                "Paperwork handled completely",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Vertical cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {verticals.map((v) => (
              <Link
                key={v.href}
                href={v.href}
                className="bg-white rounded-xl border border-border p-6 hover:shadow-lg hover:border-primary/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                  {v.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{v.description}</p>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-semibold">
                  Learn More <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>

          {/* B2B Form */}
          <div className="max-w-2xl mx-auto">
            <B2BForm source="business-vehicle-removal" />
          </div>
        </div>
      </section>
    </>
  );
}
