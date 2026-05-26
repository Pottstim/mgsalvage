import { useState } from "react";
import { Link } from "wouter";
import PageHeader from "@/components/PageHeader";
import SEOHead, { breadcrumbSchema } from "@/components/SEOHead";
import { useMemo } from "react";
import { COMPANY } from "@/lib/siteData";
import { Building2, Truck, ClipboardList, Phone, ArrowRight, CheckCircle } from "lucide-react";

const BUSINESS_TYPES = [
  { label: "Auto Repair / Mechanic Shop", value: "mechanic" },
  { label: "Auto Body / Collision Center", value: "body_shop" },
  { label: "Used Car Dealer", value: "dealer" },
  { label: "Fleet Operator / Logistics", value: "fleet" },
  { label: "Property Manager / Towing Company", value: "property" },
  { label: "Other", value: "other" },
];

const BENEFITS = [
  { icon: Truck, title: "Scheduled Fleet Pickups", desc: "We work around your lot hours. Schedule weekly, bi-weekly, or on-demand removals." },
  { icon: ClipboardList, title: "Paperwork Handled", desc: "We manage all DMV title transfers, bills of sale, and documentation — no admin burden on your team." },
  { icon: Building2, title: "Multi-Vehicle Capacity", desc: "Clear one vehicle or an entire lot. No minimum order. We scale to your volume." },
  { icon: CheckCircle, title: "Reliable & On Time", desc: "Our business clients count on us to show up when scheduled. We have a 98% on-time arrival rate." },
];

export default function BusinessAccount() {
  const schemas = useMemo(() => [
    breadcrumbSchema([{ name: "Business Account", url: "/business-account" }]),
  ], []);

  const [form, setForm] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    businessType: "",
    vehicleVolume: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/business-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {}
    setSubmitted(true);
  };

  return (
    <>
      <SEOHead
        title="Request a Business Account | MG Salvage"
        description="Set up a business account with MG Salvage for scheduled vehicle removal, fleet pickups, and priority service for mechanic shops, dealers, and fleet operators in central NC."
        canonical="/business-account"
        schemas={schemas}
      />
      <PageHeader
        title="Request a Business Account"
        subtitle="Priority service, scheduled pickups, and dedicated support for shops, dealers, and fleet operators across central North Carolina."
        breadcrumbs={[{ label: "Business Account" }]}
      />

      <section className="py-12 md:py-16">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* Benefits column */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                Why Businesses Choose MG Salvage
              </h2>
              <p className="text-muted-foreground mb-8">
                From single-location shops to multi-site fleet operators, we build reliable removal partnerships that keep your lot clear and your operation running.
              </p>
              <div className="space-y-6">
                {BENEFITS.map((b, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <b.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{b.title}</h3>
                      <p className="text-sm text-muted-foreground">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 p-6 bg-muted/40 rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">Prefer to call?</p>
                <a
                  href={`tel:${COMPANY.phoneRaw}`}
                  className="inline-flex items-center gap-2 text-lg font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  {COMPANY.phone}
                </a>
                <p className="text-xs text-muted-foreground mt-1">{COMPANY.hours}</p>
              </div>
            </div>

            {/* Form column */}
            <div>
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                    Request Received!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Thanks for reaching out. A member of our business services team will contact you within 1 business day.
                  </p>
                  <Link
                    href="/business-vehicle-removal"
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80"
                  >
                    Learn more about B2B services <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Business Name *</label>
                      <input
                        type="text"
                        name="businessName"
                        required
                        value={form.businessName}
                        onChange={handleChange}
                        className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Smith's Auto Repair"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Contact Name *</label>
                      <input
                        type="text"
                        name="contactName"
                        required
                        value={form.contactName}
                        onChange={handleChange}
                        className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="John Smith"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="john@smithsauto.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="(919) 555-0000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Business Type *</label>
                    <select
                      name="businessType"
                      required
                      value={form.businessType}
                      onChange={handleChange}
                      className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select your business type…</option>
                      {BUSINESS_TYPES.map((bt) => (
                        <option key={bt.value} value={bt.value}>{bt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Estimated Monthly Vehicle Volume</label>
                    <select
                      name="vehicleVolume"
                      value={form.vehicleVolume}
                      onChange={handleChange}
                      className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select approximate volume…</option>
                      <option value="1-3">1–3 vehicles/month</option>
                      <option value="4-10">4–10 vehicles/month</option>
                      <option value="11-25">11–25 vehicles/month</option>
                      <option value="26+">26+ vehicles/month</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Additional Notes</label>
                    <textarea
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Tell us about your operation, scheduling needs, or any questions…"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                  >
                    Request Business Account <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-xs text-muted-foreground text-center">
                    We typically respond within 1 business day. Your info is never shared.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
