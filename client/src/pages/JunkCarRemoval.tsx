import { Link } from "wouter";
import PageHeader from "@/components/PageHeader";
import { COMPANY } from "@/lib/siteData";
import SEOHead, { serviceSchema, breadcrumbSchema, faqSchema } from "@/components/SEOHead";
import { useMemo } from "react";
import { CheckCircle, ArrowRight, Phone, AlertTriangle, Truck, FileText, DollarSign } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQS } from "@/lib/siteData";

export default function JunkCarRemoval() {
  const pageFaqs = FAQS.slice(0, 4);
  const schemas = useMemo(() => [
    serviceSchema("Junk Car Removal", "Free junk car removal across central North Carolina. We handle towing, paperwork, and pay you cash."),
    breadcrumbSchema([{ name: "Junk Car Removal", url: "/junk-car-removal" }]),
    faqSchema(pageFaqs),
  ], []);

  return (
    <>
      <SEOHead
        title="Junk Car Removal in Sanford, NC | Free Towing"
        description="Free junk car removal in Sanford, NC and surrounding areas. We handle towing, paperwork, and pay you cash on the spot."
        canonical="/junk-car-removal"
        schemas={schemas}
      />
      <PageHeader
        title="Junk Car Removal"
        subtitle="Free junk car removal across central North Carolina. We handle the towing, paperwork, and pay you cash."
        breadcrumbs={[{ label: "Junk Car Removal" }]}
      />

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              What Is Junk Car Removal?
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Junk car removal is the process of having an unwanted, damaged, or non-running vehicle picked up and taken off your property. At MG Salvage, we make this process free and simple: we come to you, handle all the paperwork, tow the vehicle at no cost, and pay you cash on the spot. If you've been wondering how to clear out space in your driveway, garage, or lot, our professional junk car removal service is the easiest answer. We specialize in assessing the salvage value of your vehicle quickly and ensuring that every step of the removal process is safe, environmentally responsible, and legally compliant. 
            </p>
            
            <h3 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Pricing & Value: What Is Your Junk Car Worth?
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Every vehicle has value, even if it no longer runs. Depending on the make, model, year, and condition, we offer highly competitive payouts for junk cars. While prices fluctuate based on current scrap metal rates and usable parts, payouts typically range from <strong>$200 to $1,500+</strong>. For highly sought-after models or vehicles with perfectly intact major components, we regularly pay even more. Get a free, no-obligation estimate today to find out exactly what your junk car is worth. 
            </p>

            <h3 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              What Counts as a "Junk Car"?
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              A junk car is any vehicle that is no longer practical or cost-effective to repair or drive. This includes:
            </p>
            <ul className="flex flex-col gap-2 mb-8">
              {[
                "Vehicles that don't start or run",
                "Cars with major mechanical failures (blown engine, bad transmission)",
                "Vehicles with extensive body damage or rust",
                "Flood-damaged or fire-damaged vehicles",
                "Cars that have failed inspection and aren't worth repairing",
                "Abandoned vehicles on your property",
                "Vehicles with salvage or rebuilt titles",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Process cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-xl border border-border p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2" style={{ fontFamily: "var(--font-heading)" }}>Free Towing</h4>
              <p className="text-sm text-muted-foreground">We bring our own tow equipment. You don't pay a cent for pickup or transport.</p>
            </div>
            <div className="bg-white rounded-xl border border-border p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2" style={{ fontFamily: "var(--font-heading)" }}>Paperwork Handled</h4>
              <p className="text-sm text-muted-foreground">We prepare the bill of sale and handle DMV documentation. You just sign.</p>
            </div>
            <div className="bg-white rounded-xl border border-border p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2" style={{ fontFamily: "var(--font-heading)" }}>Cash on the Spot</h4>
              <p className="text-sm text-muted-foreground">Get paid immediately when we pick up your vehicle. No waiting for checks.</p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-muted/50 rounded-xl p-6 mb-8 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">Vehicle Accessibility</p>
                <p className="text-sm text-muted-foreground">
                  For towing, your vehicle needs to be accessible: in a driveway, parking lot, or on the street. If the vehicle is in a tight spot, let us know when you request your estimate so we can plan accordingly.
                </p>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Ready to Remove Your Junk Car?
              </h3>
              <p className="text-muted-foreground mb-6">
                Get a free estimate and schedule your pickup today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/sell-your-junk-car"
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  Get Free Estimate
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`tel:${COMPANY.phoneRaw}`}
                  className="inline-flex items-center gap-2 text-primary font-semibold"
                >
                  <Phone className="w-4 h-4" />
                  Call {COMPANY.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/50 py-12 md:py-16">
        <div className="container max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center" style={{ fontFamily: "var(--font-heading)" }}>
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-2">
            {pageFaqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-white rounded-lg border border-border px-4">
                <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
