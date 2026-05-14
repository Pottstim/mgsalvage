import { Link } from "wouter";
import PageHeader from "@/components/PageHeader";
import { COMPANY } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import { Scale, Phone, MapPin } from "lucide-react";

export default function TermsOfService() {
  return (
    <>
      <SEOHead
        title="Terms of Service"
        description="MG Salvage's terms of service for junk car removal, vehicle acquisition, and related services in Sanford, NC and surrounding areas."
        canonical="/terms"
        keywords="terms of service, MG Salvage, junk car removal, vehicle acquisition, conditions"
        noIndex={false}
        schemas={[{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Terms of Service",
          description: "Terms and conditions for MG Salvage junk car removal services",
          url: "https://mgsalvage.com/terms",
          publisher: {
            "@type": "Organization",
            name: "MG Salvage",
            url: "https://mgsalvage.com"
          }
        }]}
      />
      <PageHeader
        title="Terms of Service"
        subtitle="Terms and conditions for MG Salvage junk car removal and vehicle acquisition services."
        breadcrumbs={[{ label: "Terms of Service", url: "/terms" }]}
      />

      <section className="py-12 md:py-16">
        <div className="container max-w-3xl">
          <div className="bg-white rounded-xl border border-border p-8 md:p-12 space-y-6">
            <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              Terms of Service — MG Salvage
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to MG Salvage. These Terms of Service govern your use of our website and services. By accessing our site or engaging our services, you agree to comply with these terms.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              1. Services Provided
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              MG Salvage provides junk car removal, vehicle acquisition, and related services to consumers and businesses in central North Carolina. Our services include free towing, cash payment for vehicles, and handling of all associated paperwork.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              2. Vehicle Acceptance
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We purchase vehicles in virtually any condition — running, non-running, damaged, wrecked, or abandoned. Upon inspection, we provide a fair cash offer. We reserve the right to adjust the offer based on the actual condition of the vehicle at the time of pickup.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              3. Payment Terms
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Payment is provided in cash at the time of vehicle pickup, unless otherwise arranged. For business accounts and bulk removals, payment terms may be agreed upon in writing. All prices are quoted in US dollars.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              4. Towing &amp; Removal
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Towing is provided free of charge. The vehicle must be accessible for our tow equipment. Customers are responsible for ensuring accurate vehicle location information is provided at the time of scheduling. We are not liable for delays due to inaccessible vehicles or incorrect location details.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              5. Title &amp; Documentation
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              A valid title is preferred but not always required. We assist with paperwork including bill of sale and DMV documentation. Customers must provide a valid photo ID. We are not responsible for pre-existing liens or title issues that may affect the transfer.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              6. Limitation of Liability
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              MG Salvage shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services or the purchase of your vehicle. Our total liability is limited to the agreed-upon purchase price of the vehicle.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              7. Indemnification
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              You agree to indemnify and hold harmless MG Salvage, its officers, employees, and agents from any claims, damages, or expenses arising from your use of our services or misrepresentation of vehicle condition.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              8. Governing Law
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              These terms are governed by the laws of the State of North Carolina. Any disputes shall be resolved in the courts of Lee County, North Carolina.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              9. Changes to Terms
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be posted on this page. Continued use of our services constitutes acceptance of the updated terms.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              10. Contact
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these terms, contact us at:
            </p>
            <div className="flex flex-col gap-3 mt-4">
              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="flex items-center gap-2 text-primary font-semibold"
              >
                <Phone className="w-4 h-4" />
                {COMPANY.phone}
              </a>
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-2 text-primary font-semibold"
              >
                <MapPin className="w-4 h-4" />
                {COMPANY.email}
              </a>
              <p className="text-sm text-muted-foreground">
                MG Salvage — Sanford, NC 27330
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}