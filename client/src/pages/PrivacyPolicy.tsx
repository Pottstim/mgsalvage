import { Link } from "wouter";
import PageHeader from "@/components/PageHeader";
import { COMPANY } from "@/lib/siteData";
import SEOHead from "@/components/SEOHead";
import { Phone, MapPin, Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy"
        description="MG Salvage's privacy policy explaining how we collect, use, and protect your personal information when you use our junk car removal services."
        canonical="/privacy"
        keywords="privacy policy, MG Salvage, data protection, personal information"
        noIndex={false}
        schemas={[{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Privacy Policy",
          description: "MG Salvage's privacy policy for junk car removal services in Sanford, NC",
          url: "https://mgsalvage.com/privacy",
          publisher: {
            "@type": "Organization",
            name: "MG Salvage",
            url: "https://mgsalvage.com"
          }
        }]}
      />
      <PageHeader
        title="Privacy Policy"
        subtitle="How MG Salvage collects, uses, and protects your personal information."
        breadcrumbs={[{ label: "Privacy Policy", url: "/privacy" }]}
      />

      <section className="py-12 md:py-16">
        <div className="container max-w-3xl">
          <div className="bg-white rounded-xl border border-border p-8 md:p-12 space-y-6">
            <h2 className="text-2xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              Your Privacy Matters
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              At MG Salvage, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains what information we collect, how we use it, and the choices you have regarding your data.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Information We Collect
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              When you contact MG Salvage — whether by phone, email, or through our website forms — we may collect the following information:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Name and contact information (phone number, email address)</li>
              <li>Vehicle details (make, model, year, condition)</li>
              <li>Location information (for pickup scheduling)</li>
              <li>Any additional details you provide about your vehicle or situation</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              How We Use Your Information
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Provide you with a cash estimate for your vehicle</li>
              <li>Schedule and coordinate vehicle pickup</li>
              <li>Handle necessary paperwork and transactions</li>
              <li>Communicate with you about our services</li>
              <li>Improve our website and customer experience</li>
              <li>Comply with applicable laws and regulations</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Information Sharing &amp; Disclosure
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              MG Salvage does not sell, trade, or otherwise transfer your personal information to outside parties. We may share information with:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Trusted third-party service providers who assist in our operations</li>
              <li>Legal authorities when required by law or to protect our rights</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Data Security
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, or destruction. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Your Rights
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Request access to the personal information we hold about you</li>
              <li>Request correction of inaccurate personal data</li>
              <li>Request deletion of your personal data in certain circumstances</li>
              <li>Withdraw consent for data processing where consent was the basis</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Cookies &amp; Tracking
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Our website may use cookies to enhance user experience and analyze website traffic. You can configure your browser to refuse cookies, though some site features may not function properly without them.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Changes to This Policy
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the "Last Updated" date at the top will be revised. We encourage you to review this policy periodically.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Contact Us
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about this Privacy Policy or your data rights, please contact us:
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
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                MG Salvage, Sanford, NC 27330
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}