import PageHeader from "@/components/PageHeader";
import ConsumerForm from "@/components/ConsumerForm";
import { COMPANY, FAQS } from "@/lib/siteData";
import SEOHead, { serviceSchema, faqSchema, breadcrumbSchema } from "@/components/SEOHead";
import { useMemo } from "react";
import { CheckCircle, Phone, Star } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function SellYourJunkCar() {
  const pageFaqs = FAQS.slice(0, 5);
  const schemas = useMemo(() => [
    serviceSchema("Sell Your Junk Car", "Get a free cash offer for your junk, damaged, or unwanted vehicle. Free towing and same-day pickup in Sanford, NC."),
    faqSchema(pageFaqs),
    breadcrumbSchema([{ name: "Sell Your Junk Car", url: "/sell-your-junk-car" }]),
  ], []);

  return (
    <>
      <SEOHead
        title="Sell Your Junk Car | Free Estimate"
        description="Get a free, no-obligation cash offer for your junk car. Free towing, same-day pickup, and cash on the spot in Sanford, NC and surrounding areas."
        canonical="/sell-your-junk-car"
        schemas={schemas}
      />
      <PageHeader
        title="Sell Your Junk Car"
        subtitle="Get a free, no-obligation cash offer for your junk, damaged, or unwanted vehicle. Free towing included."
        breadcrumbs={[{ label: "Sell Your Junk Car" }]}
      />

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Left: Info */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Why Sell to MG Salvage?
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We make selling your junk car as simple as possible. No haggling, no hidden fees, no waiting around. Just a fair cash offer, free towing, and payment on the spot.
              </p>
              <ul className="flex flex-col gap-3 mb-8">
                {[
                  "Fair cash offers based on current market value",
                  "Free towing — we come to you",
                  "Same-day and next-day pickup available",
                  "We buy cars in any condition",
                  "No title? We can often still help",
                  "All paperwork handled for you",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="bg-muted/50 rounded-xl p-5 mb-6">
                <p className="text-sm font-semibold text-foreground mb-1">Prefer to talk to someone?</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Call us directly and get your estimate over the phone.
                </p>
                <a
                  href={`tel:${COMPANY.phoneRaw}`}
                  className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {COMPANY.phone}
                </a>
              </div>

              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Trusted by hundreds of vehicle owners across central NC</p>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-3">
              <ConsumerForm source="sell-your-junk-car" />
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
