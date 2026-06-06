import PageHeader from "@/components/PageHeader";
import { COMPANY, FAQS } from "@/lib/siteData";
import SEOHead, { faqSchema, breadcrumbSchema } from "@/components/SEOHead";
import { useMemo } from "react";
import { Link } from "wouter";
import { ArrowRight, Phone, FileText, Shield, CheckCircle, AlertTriangle, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const titleFaqs = [
  {
    question: "Can I sell a junk car without a title in North Carolina?",
    answer: "Yes, in many cases you can sell a junk car without a title in North Carolina. A clear title is the easiest path, but NC law provides alternatives: if your vehicle is 15+ model years old, you may be able to sell it with a bill of sale and notarized affidavit. For newer vehicles, you can apply for a duplicate title through the NC DMV or pursue a bonded title. MG Salvage handles vehicles in all title situations and can guide you through your specific case."
  },
  {
    question: "What documents do I need if I don't have a title in NC?",
    answer: "The minimum documents needed: (1) Valid government-issued photo ID, (2) Proof of registration (if available), (3) A completed Bill of Sale (we provide this), (4) For vehicles 15+ years old and worth under $5,000 — an NC DMV Affidavit of Facts (Form MVR-92H) may suffice. For all other cases, a duplicate title application (Form MVR-4) or bonded title process is required. We help prepare all paperwork at no extra charge."
  },
  {
    question: "How does the bonded title process work in NC?",
    answer: "A bonded title in North Carolina requires: (1) Apply for a surety bond equal to 1.5x the vehicle's appraised value, (2) Have the vehicle inspected by an NC DMV License & Theft Bureau agent, (3) Submit all paperwork (MVR-4, MVR-92A, bond certificate, inspection report) to your local license plate agency, (4) Pay applicable title fees (currently $56). The bond protects against future ownership claims. The process takes 2–4 weeks. MG Salvage can often buy the vehicle without you completing this process — saving you the bond cost."
  },
  {
    question: "Does MG Salvage buy cars with lost or missing titles?",
    answer: "Yes. We buy vehicles with lost titles, missing titles, and salvage titles every day. The process depends on your situation: vehicles 15+ years old in NC have simpler documentation requirements; newer vehicles may need a duplicate title or bonded title. Call us or fill out our form with your vehicle details, and we'll tell you exactly what's needed for your specific case."
  },
  {
    question: "How much does not having a title reduce my offer?",
    answer: "Not having a title typically reduces an offer by 15–30%, depending on the vehicle's age, value, and circumstances. This reflects the additional paperwork, DMV processing time, and legal verification required. However, we never charge you for paperwork handling — the reduction covers our processing costs and risk assessment. For vehicles under $500, the title status often has minimal impact."
  },
];

export default function NoTitleGuide() {
  const schemas = useMemo(() => [
    faqSchema(titleFaqs),
    breadcrumbSchema([{ name: "Guides", url: "/guides" }, { name: "Selling Without a Title", url: "/guides/sell-car-without-title-nc" }]),
  ], []);

  return (
    <>
      <SEOHead
        title="How to Sell a Junk Car Without a Title in NC | 2026 Guide"
        description="Complete guide to selling a junk car without a title in North Carolina. NC DMV rules, bonded title process, required documents, VIN verification steps, and what to expect. MG Salvage helps with all paperwork."
        canonical="/guides/sell-car-without-title-nc"
        schemas={schemas}
      />
      <PageHeader
        title="How to Sell a Junk Car Without a Title in NC"
        subtitle="No title doesn't mean no options. A complete guide to North Carolina's DMV requirements, bonded titles, duplicate title process, and exactly what documents you need."
        breadcrumbs={[{ label: "Guides", href: "/guides" }, { label: "No-Title Guide" }]}
      />

      <section className="py-12 md:py-16">
        <div className="container max-w-4xl">
          <div className="prose max-w-none">
            {/* Lead */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-800 mb-1">Important: NC Law Varies by Vehicle Age</p>
                <p className="text-sm text-amber-700">North Carolina has different title requirements depending on whether your vehicle is 15+ model years old and valued under $5,000. Read the sections below carefully, or call us — we'll walk you through your specific situation.</p>
              </div>
            </div>

            {/* Quick Assessment */}
            <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-heading)" }}>Which Path Applies to You?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-white rounded-xl border border-border p-6">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2" style={{ fontFamily: "var(--font-heading)" }}>Vehicle 15+ Model Years Old</h3>
                <p className="text-sm text-muted-foreground mb-3">If your vehicle is a 2011 model or older and valued under $5,000, NC DMV allows a simplified path: an Affidavit of Facts (Form MVR-92H) combined with a Bill of Sale and your photo ID may be sufficient. No surety bond required. This is the most common junk car scenario.</p>
                <p className="text-xs text-muted-foreground italic">NC GS § 20-53 — Vehicle Titling Exemptions</p>
              </div>
              <div className="bg-white rounded-xl border border-border p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2" style={{ fontFamily: "var(--font-heading)" }}>Vehicle Newer Than 15 Model Years</h3>
                <p className="text-sm text-muted-foreground mb-3">If your vehicle is a 2012 or newer, North Carolina law requires either a duplicate title or a bonded title. The duplicate title path (Form MVR-4) is faster and cheaper if you're the registered owner. A bonded title adds cost (roughly $100–$300 in bond fees) but works when ownership documentation is incomplete.</p>
                <p className="text-xs text-muted-foreground italic">NC GS § 20-53 and NC DMV Title Manual § H-105</p>
              </div>
            </div>

            {/* Path 1: Duplicate Title */}
            <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-heading)" }}>Path 1: Duplicate Title (Fastest — If You're the Registered Owner)</h2>
            <div className="bg-white rounded-xl border border-border p-6 mb-8">
              <p className="text-muted-foreground mb-4 leading-relaxed">If you were the last registered owner, the simplest solution is to request a duplicate title from the NC DMV. This costs $21.50 and can be done online, by mail, or in person at any NC license plate agency. Processing takes 7–14 business days by mail, or same-day in person (some agencies).</p>
              <ol className="flex flex-col gap-3 mb-4 list-decimal list-inside">
                <li className="text-sm text-foreground">Complete NC DMV Form MVR-4 (Application for Duplicate Title)</li>
                <li className="text-sm text-foreground">Provide your valid NC driver's license or ID</li>
                <li className="text-sm text-foreground">Pay the $21.50 duplicate title fee</li>
                <li className="text-sm text-foreground">Receive your duplicate title — then sell the vehicle normally</li>
              </ol>
              <a href="https://www.ncdot.gov/dmv/title-registration/vehicles/Pages/lost-title.aspx" target="_blank" rel="noopener noreferrer" className="text-primary text-sm font-semibold hover:underline">NC DMV: Lost or Duplicate Title Information →</a>
            </div>

            {/* Path 2: Bonded Title */}
            <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-heading)" }}>Path 2: Bonded Title (When You're Not the Registered Owner)</h2>
            <div className="bg-white rounded-xl border border-border p-6 mb-8">
              <p className="text-muted-foreground mb-4 leading-relaxed">If you bought a vehicle but never received the title, inherited a car without paperwork, or lost title documents and you're not the registered owner — a bonded title is your path. This process costs more ($100–$300 for the bond + $56 title fee) and takes 2–4 weeks, but it creates a legal title.</p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                {[
                  { step: 1, title: "Get Bond Quote", desc: "Contact a surety bond provider. The bond amount is 1.5x the vehicle's appraised value (minimum $100)." },
                  { step: 2, title: "DMV Inspection", desc: "Schedule a VIN verification with an NC DMV License & Theft Bureau agent at your nearest district office." },
                  { step: 3, title: "Submit Paperwork", desc: "File MVR-4, MVR-92A (bonded title affidavit), bond certificate, and inspection report at your license plate agency." },
                  { step: 4, title: "Receive Title", desc: "After processing (2–4 weeks), you receive a bonded title. You can now sell the vehicle legally." },
                ].map(({ step, title, desc }) => (
                  <div key={step} className="text-center">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold mx-auto mb-2">{step}</div>
                    <p className="font-semibold text-foreground text-sm mb-1" style={{ fontFamily: "var(--font-heading)" }}>{title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic">Pro tip: For junk cars worth under $1,000, the bonded title costs often exceed the vehicle's value. Call us before pursuing this path — in many cases, we can buy the vehicle without you completing the bonded title process.</p>
            </div>

            {/* Path 3: Bill of Sale + Affidavit (for 15+ year vehicles) */}
            <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-heading)" }}>Path 3: Bill of Sale + Affidavit (Vehicles 15+ Years Old)</h2>
            <div className="bg-white rounded-xl border border-border p-6 mb-8">
              <p className="text-muted-foreground mb-4 leading-relaxed">For vehicles 15+ model years old and valued under $5,000, North Carolina offers a streamlined path. You may be able to transfer ownership using a Bill of Sale and notarized Affidavit of Facts (Form MVR-92H) without obtaining a new title first. This is the most common path for junk cars and salvage vehicles.</p>
              <ul className="flex flex-col gap-2 mb-4">
                {["Vehicle must be 15+ model years old (2011 or older as of 2026)", "Vehicle value must be under $5,000", "Seller must provide valid photo ID", "Buyer and seller complete NC Bill of Sale (we provide the form)", "Notarized Affidavit of Facts (Form MVR-92H) may be required"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* How MG Salvage Handles This */}
            <div className="bg-[oklch(0.13_0.01_250)] rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>How MG Salvage Makes This Easy</h2>
              </div>
              <p className="text-white/70 leading-relaxed mb-4">We buy vehicles in all title situations — clean title, salvage title, bonded title, lost title, even vehicles that were abandoned on your property. We handle all the DMV paperwork, prepare the Bill of Sale, and walk you through exactly what's needed for your specific vehicle's age and situation.</p>
              <ul className="flex flex-col gap-2 mb-6">
                {["We prepare all NC DMV paperwork at no extra charge", "We can buy most vehicles without you needing a bonded title", "We handle VIN verification and theft checks", "No upfront costs or DMV fees — we deduct what's needed from the offer", "Same-day pickup and payment once paperwork is complete"].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/80">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Required Documents Checklist */}
            <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-heading)" }}>Document Checklist — What to Have Ready</h2>
            <div className="bg-muted/50 rounded-xl p-6 mb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { doc: "Valid Photo ID", required: "Always Required", desc: "NC driver's license, state ID, military ID, or passport." },
                  { doc: "Vehicle Registration", required: "Helpful", desc: "Current or expired NC registration card, if available. Not required." },
                  { doc: "Proof of Ownership", required: "Case-by-Case", desc: "Previous bill of sale, insurance card, repair receipts. Helps establish ownership history." },
                  { doc: "VIN Number", required: "Always Required", desc: "17-character VIN from dashboard, door jamb, or insurance documents. We can help locate it." },
                  { doc: "Keys", required: "Helpful", desc: "Not required, but having keys increases the offer. Lost keys are not a dealbreaker." },
                  { doc: "Lien Release", required: "If Financed", desc: "If there was a lien, a lien satisfaction letter from the lender is required." },
                ].map(({ doc, required, desc }) => (
                  <div key={doc} className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full shrink-0 mt-2 ${required === "Always Required" ? "bg-red-500" : required === "Helpful" ? "bg-amber-500" : "bg-gray-400"}`} />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{doc} <span className={`text-xs ml-1 ${required === "Always Required" ? "text-red-500" : required === "Helpful" ? "text-amber-500" : "text-gray-500"}`}>{required}</span></p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-primary rounded-2xl p-10 text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>Don't Let a Missing Title Stop You</h2>
              <p className="text-white/80 mb-6 max-w-xl mx-auto">We've helped hundreds of NC vehicle owners navigate the title process. Tell us about your vehicle and we'll tell you exactly what's needed — zero obligation.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/sell-your-junk-car" className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3.5 rounded-lg font-semibold hover:bg-white/90 transition-colors">
                  Get Your Free Estimate <ArrowRight className="w-4 h-4" />
                </Link>
                <a href={`tel:${COMPANY.phoneRaw}`} className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-3.5 rounded-lg font-semibold hover:bg-white/20 transition-colors">
                  <Phone className="w-4 h-4" /> {COMPANY.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/50 py-12 md:py-16">
        <div className="container max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center" style={{ fontFamily: "var(--font-heading)" }}>No-Title Selling FAQ</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {titleFaqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-white rounded-lg border border-border px-4">
                <AccordionTrigger className="text-sm font-medium text-foreground hover:no-underline">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
