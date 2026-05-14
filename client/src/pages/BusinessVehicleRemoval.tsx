import { Link } from "wouter";
import PageHeader from "@/components/PageHeader";
import B2BForm from "@/components/B2BForm";
import { COMPANY } from "@/lib/siteData";
import SEOHead, { serviceSchema, breadcrumbSchema } from "@/components/SEOHead";
import { useMemo } from "react";
import { CheckCircle, ArrowRight, Wrench, Car, Paintbrush } from "lucide-react";

export default function BusinessVehicleRemoval() {
  const schemas = useMemo(() => [
    serviceSchema("Business Vehicle Removal", "Reliable vehicle removal for mechanic shops, body shops, dealers, and fleet operators across central NC."),
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
        title="Business Vehicle Removal"
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
              MG Salvage partners with automotive businesses across central North Carolina to provide dependable vehicle removal. Whether you need a one-time lot clearing or ongoing scheduled pickups, we work around your operations to keep things running smoothly. Our commercial services are designed specifically to resolve the logistical headaches of abandoned customer vehicles, insurance write-offs, and unsalable trade-ins. By outsourcing your vehicle removal needs to us, you can clear valuable bay and lot space, avoid the liability of storing neglected vehicles, and focus on your core business.
            </p>
            
            <h3 className="text-xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              B2B Pricing & Payouts
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We understand that maximizing the value of your assets and minimizing hassle is critical to your bottom line. We provide upfront, fair market pricing for every vehicle we remove, paying <strong>$200 to $1,500+ per vehicle</strong> depending on weight, parts value, and condition. For bulk removals and long-term business partnerships, we often negotiate preferential terms or recurring pick-up schedules that streamline your operations and guarantee a steady revenue stream from your junk or abandoned inventory.
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
