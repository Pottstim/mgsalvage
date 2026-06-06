import PageHeader from "@/components/PageHeader";
import { COMPANY, FAQS } from "@/lib/siteData";
import SEOHead, { faqSchema, breadcrumbSchema } from "@/components/SEOHead";
import { useMemo } from "react";
import { Link } from "wouter";
import { ArrowRight, Phone, DollarSign, Scale, Car, Info, CheckCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const valuationFaqs = [
  {
    question: "What is the average scrap value for a junk car in North Carolina?",
    answer: "Junk car scrap value in North Carolina typically ranges from $200 to $1,500+, depending primarily on vehicle weight and current scrap metal prices. Most standard sedans (~3,500 lbs) generate $300–$500. Heavier SUVs and trucks (~5,000+ lbs) can generate $500–$1,000+. As of mid-2026, scrap steel in the Southeast is trading around $180–$220 per ton, with complete cars commanding a premium over stripped hulks."
  },
  {
    question: "What factors determine how much my junk car is worth?",
    answer: "Four primary factors: (1) Vehicle Weight — heavier vehicles contain more recyclable metal; (2) Catalytic Converter Value — some OEM cats (especially on Toyotas, Hondas, and luxury vehicles) can be worth $100–$500+ alone; (3) Salable Parts — engines, transmissions, alternators, starters, and body panels that are still functional add significant value; (4) Current Scrap Market — metal prices fluctuate weekly based on global commodity markets."
  },
  {
    question: "Which junk cars are worth the most in North Carolina?",
    answer: "In the NC market, pickup trucks (Ford F-150, Chevy Silverado, Ram 1500), full-size SUVs (Tahoe, Suburban, Expedition), and popular sedans with valuable catalytic converters (Honda Accord, Toyota Camry) consistently command the highest offers. Trucks weigh more, providing higher scrap value, and their parts are in constant demand in the Southeast market."
  },
  {
    question: "Does the condition of my junk car affect the price?",
    answer: "Yes, significantly. A non-running vehicle with a seized engine is worth less than one that starts. Missing major components (engine, transmission, catalytic converter) reduce value. Accident damage that didn't affect the drivetrain has minimal impact. Vehicles with clean titles are worth more than those with salvage or no titles. Always disclose the condition honestly — it results in a more accurate offer."
  },
];

export default function JunkCarValuationGuide() {
  const schemas = useMemo(() => [
    faqSchema(valuationFaqs),
    breadcrumbSchema([{ name: "Guides", url: "/guides" }, { name: "Junk Car Valuation Guide", url: "/guides/junk-car-valuation" }]),
  ], []);

  return (
    <>
      <SEOHead
        title="What Is My Junk Car Worth in NC? | 2026 Valuation Guide"
        description="Complete guide to junk car valuation in North Carolina: scrap metal rates, catalytic converter values, make/model pricing, and how to get the best offer. Free estimate from MG Salvage."
        canonical="/guides/junk-car-valuation"
        schemas={schemas}
      />
      <PageHeader
        title="What Is My Junk Car Worth in NC?"
        subtitle="A complete guide to understanding junk car valuation — from scrap metal rates to catalytic converter pricing and everything in between."
        breadcrumbs={[{ label: "Guides", href: "/guides" }, { label: "Junk Car Valuation" }]}
      />

      {/* Intro */}
      <section className="py-12 md:py-16">
        <div className="container max-w-4xl">
          <div className="prose max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              If you've got a junk car taking up space and you're wondering what it's actually worth, you're not alone. The value of a junk car in North Carolina depends on a handful of factors — metal weight, usable parts, catalytic converter value, and current scrap market conditions. This guide breaks down exactly how junk car pricing works so you can walk into any offer with confidence.
            </p>

            {/* Quick Value Range Table */}
            <div className="bg-muted/50 rounded-2xl p-8 mb-10">
              <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: "var(--font-heading)" }}>Quick Value Ranges by Vehicle Type (NC Market, 2026)</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Vehicle Type</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Typical Weight</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Value Range</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50"><td className="py-3 px-4">Compact Sedan (Civic, Corolla, Focus)</td><td className="py-3 px-4">2,700–3,200 lbs</td><td className="py-3 px-4 font-semibold text-foreground">$200–$500</td></tr>
                    <tr className="border-b border-border/50"><td className="py-3 px-4">Mid-Size Sedan (Accord, Camry, Malibu)</td><td className="py-3 px-4">3,200–3,700 lbs</td><td className="py-3 px-4 font-semibold text-foreground">$300–$650</td></tr>
                    <tr className="border-b border-border/50"><td className="py-3 px-4">Full-Size Sedan (Impala, Taurus, Charger)</td><td className="py-3 px-4">3,700–4,200 lbs</td><td className="py-3 px-4 font-semibold text-foreground">$350–$750</td></tr>
                    <tr className="border-b border-border/50"><td className="py-3 px-4">Compact SUV (CR-V, RAV4, Escape)</td><td className="py-3 px-4">3,400–3,800 lbs</td><td className="py-3 px-4 font-semibold text-foreground">$350–$700</td></tr>
                    <tr className="border-b border-border/50"><td className="py-3 px-4">Full-Size SUV (Tahoe, Expedition, Sequoia)</td><td className="py-3 px-4">5,200–6,000 lbs</td><td className="py-3 px-4 font-semibold text-foreground">$550–$1,200+</td></tr>
                    <tr className="border-b border-border/50"><td className="py-3 px-4">Half-Ton Truck (F-150, Silverado, Ram 1500)</td><td className="py-3 px-4">4,500–5,500 lbs</td><td className="py-3 px-4 font-semibold text-foreground">$500–$1,500+</td></tr>
                    <tr><td className="py-3 px-4">Heavy-Duty Truck (F-250, Silverado 2500, Ram 2500)</td><td className="py-3 px-4">6,000–7,500 lbs</td><td className="py-3 px-4 font-semibold text-foreground">$600–$1,500+</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-4">Ranges reflect complete vehicles in average condition. Vehicles with valuable catalytic converters, functional engines, or clean titles may exceed these ranges.</p>
            </div>

            {/* The Four Factors That Determine Value */}
            <h2 className="text-2xl font-bold text-foreground mb-6 mt-10" style={{ fontFamily: "var(--font-heading)" }}>The Four Factors That Determine Your Junk Car's Value</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-white rounded-xl border border-border p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Scale className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2" style={{ fontFamily: "var(--font-heading)" }}>1. Vehicle Weight &amp; Scrap Metal</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">The single largest component of your car's value is its weight in recyclable steel, aluminum, and copper. At $180–$220 per ton in the Southeast market, a 4,500 lb truck generates roughly $400–$500 in scrap alone. Heavier vehicles = higher base offers.</p>
              </div>
              <div className="bg-white rounded-xl border border-border p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2" style={{ fontFamily: "var(--font-heading)" }}>2. Catalytic Converter Value</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">OEM catalytic converters contain platinum, palladium, and rhodium — precious metals worth $100–$500+ depending on the vehicle. Toyota, Honda, and luxury-brand converters typically command the highest prices in NC. Aftermarket cats are worth significantly less.</p>
              </div>
              <div className="bg-white rounded-xl border border-border p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Car className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2" style={{ fontFamily: "var(--font-heading)" }}>3. Salable Used Parts</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">If your engine, transmission, alternator, starter, or body panels are still functional, they add real money. A running 4-cylinder engine might add $200–$400. Clean doors, hoods, and bumpers for popular models are always in demand. Salvage yards evaluate each vehicle individually.</p>
              </div>
              <div className="bg-white rounded-xl border border-border p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2" style={{ fontFamily: "var(--font-heading)" }}>4. Current Scrap Market Conditions</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">Scrap steel, aluminum, and precious metal prices fluctuate weekly based on global supply chains and commodity markets. The Southeast US market (including NC) typically tracks 5–10% below coastal export hubs. Prices are highest in spring and summer when construction demand peaks.</p>
              </div>
            </div>

            {/* Condition Multipliers */}
            <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-heading)" }}>Condition Multipliers: How Your Car's State Affects Price</h2>
            <div className="bg-white rounded-xl border border-border p-6 mb-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2"><CheckCircle className="w-4 h-4 text-green-500" /><span className="font-semibold text-foreground text-sm">Runs & Drives</span></div>
                  <p className="text-xs text-muted-foreground">Highest value tier. Engine and transmission are functional. Vehicle may still be cosmetically rough or have minor issues.</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2"><CheckCircle className="w-4 h-4 text-amber-500" /><span className="font-semibold text-foreground text-sm">Starts but Doesn't Drive</span></div>
                  <p className="text-xs text-muted-foreground">Engine runs but transmission or other mechanical issues prevent driving. Moderate value — engine alone has part-out value.</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2"><CheckCircle className="w-4 h-4 text-red-500" /><span className="font-semibold text-foreground text-sm">Doesn't Run (Seized/Blown)</span></div>
                  <p className="text-xs text-muted-foreground">Scrap value primarily. Still worth money for metal weight and remaining usable parts. Catalytic converter may still hold value.</p>
                </div>
              </div>
            </div>

            {/* Title Status */}
            <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-heading)" }}>Title Status Matters</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">A clean NC title in your name commands the best price. Vehicles with salvage titles, bonded titles, or no title typically receive offers 15–30% lower because of the additional paperwork, VIN verification, and legal risk involved. That said, we buy vehicles in all title situations — and we've written a <Link href="/guides/sell-car-without-title-nc" className="text-primary font-semibold hover:underline">complete guide on selling without a title</Link>.</p>

            {/* NC-Specific Market */}
            <div className="bg-[oklch(0.13_0.01_250)] rounded-2xl p-8 mb-10">
              <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>Why NC Is a Strong Market for Junk Car Sellers</h2>
              <p className="text-white/70 leading-relaxed mb-4">North Carolina's central location between major East Coast scrap processors, combined with high demand for used truck and SUV parts across the Southeast, means junk car values here are competitive. Sanford's proximity to Raleigh-Durham, Fayetteville, and the Triad gives sellers access to multiple buyers, which drives up offers. Unlike rural markets where one buyer has a monopoly, central NC is a competitive salvage market — and that works in your favor.</p>
              <p className="text-white/70 leading-relaxed">Additionally, NC's large military population (Fort Liberty alone has over 50,000 personnel) means vehicles are bought and sold frequently during PCS moves, creating steady supply and demand in the used parts market.</p>
            </div>

            {/* CTA */}
            <div className="bg-primary rounded-2xl p-10 text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>Get a Real Offer — Not a Guess</h2>
              <p className="text-white/80 mb-6 max-w-xl mx-auto">Our offers are based on actual scrap market data, part-out values, and your vehicle's specific condition. No obligation, no pressure — just a fair number.</p>
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
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center" style={{ fontFamily: "var(--font-heading)" }}>Junk Car Valuation FAQ</h2>
          <Accordion type="single" collapsible className="space-y-2">
            {valuationFaqs.map((faq, i) => (
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
