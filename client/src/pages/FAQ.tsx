import { Link } from "wouter";
import PageHeader from "@/components/PageHeader";
import { FAQS, COMPANY } from "@/lib/siteData";
import SEOHead, { faqSchema, breadcrumbSchema } from "@/components/SEOHead";
import { useMemo } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Phone, ArrowRight } from "lucide-react";

export default function FAQ() {
  const schemas = useMemo(() => [
    faqSchema(FAQS),
    breadcrumbSchema([{ name: "FAQ", url: "/faq" }]),
  ], []);

  return (
    <>
      <SEOHead
        title="Frequently Asked Questions"
        description="Common questions about selling your junk car to MG Salvage. Learn about our process, pricing, towing, and paperwork."
        canonical="/faq"
        schemas={schemas}
      />
      <PageHeader
        title="Frequently Asked Questions — Selling Your Junk Car in NC"
        subtitle="Everything you need to know about selling your junk car to MG Salvage."
        breadcrumbs={[{ label: "FAQ" }]}
      />

      <section className="py-12 md:py-16">
        <div className="container max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-white rounded-xl border border-border px-5">
                <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <h3 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Still Have Questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              We're happy to help. Give us a call or fill out our contact form.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call {COMPANY.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
              >
                Contact Us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
