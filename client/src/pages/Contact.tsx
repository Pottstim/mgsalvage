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
        title="Contact MG Salvage in Sanford, NC | Free Estimate"
        description="Get in touch with MG Salvage for junk car removal, estimates, and business inquiries. Call, email, or fill out our form."
        canonical="/contact"
        keywords="contact MG Salvage, junk car removal, get estimate, call us"
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
                Have a question or ready to sell your junk car? Reach out by phone, email, or fill out one of our forms. We respond quickly. Usually within minutes during business hours.
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

              {/* Google Map Embed */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-foreground mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                  Our Location
                </h3>
                <div className="relative w-full h-[250px] rounded-xl overflow-hidden border border-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3203.974017789901!2d-79.19266562394553!3d35.4830126249238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8851a5d5d5d5d5d5%3A0x5d5d5d5d5d5d5d5d!2sSanford%2C%20NC%2027330!5e0!3m2!1sen!2sus!4v1715700000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="MG Salvage location in Sanford, NC"
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  <MapPin className="w-3 h-3 inline mr-1" />
                  {COMPANY.fullAddress} — Serving central North Carolina
                </p>
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