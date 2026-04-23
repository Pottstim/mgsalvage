import PageHeader from "@/components/PageHeader";
import ConsumerForm from "@/components/ConsumerForm";
import UrgentForm from "@/components/UrgentForm";
import { COMPANY } from "@/lib/siteData";
import SEOHead, { localBusinessSchema, breadcrumbSchema } from "@/components/SEOHead";
import { useMemo } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  const schemas = useMemo(() => [
    localBusinessSchema(),
    breadcrumbSchema([{ name: "Contact", url: "/contact" }]),
  ], []);

  return (
    <>
      <SEOHead
        title="Contact Us"
        description="Get in touch with MG Salvage for junk car removal, estimates, and business inquiries. Call, email, or fill out our form."
        canonical="/contact"
        schemas={schemas}
      />
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with MG Salvage. We're here to help with junk car removal, estimates, and business inquiries."
        breadcrumbs={[{ label: "Contact" }]}
      />

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Get In Touch
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Have a question or ready to sell your junk car? Reach out by phone, email, or fill out one of our forms. We respond quickly — usually within minutes during business hours.
              </p>

              <div className="flex flex-col gap-4 mb-8">
                <a
                  href={`tel:${COMPANY.phoneRaw}`}
                  className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl hover:bg-primary/10 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{COMPANY.phone}</p>
                    <p className="text-xs text-muted-foreground">Call us directly</p>
                  </div>
                </a>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-3 p-4 bg-white border border-border rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{COMPANY.email}</p>
                    <p className="text-xs text-muted-foreground">Email us anytime</p>
                  </div>
                </a>
                <div className="flex items-center gap-3 p-4 bg-white border border-border rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{COMPANY.fullAddress}</p>
                    <p className="text-xs text-muted-foreground">Headquarters</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white border border-border rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{COMPANY.hours}</p>
                    <p className="text-xs text-muted-foreground">Business hours</p>
                  </div>
                </div>
              </div>

              {/* Urgent Form */}
              <UrgentForm />
            </div>

            {/* Main Form */}
            <div className="lg:col-span-3">
              <ConsumerForm source="contact-page" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
