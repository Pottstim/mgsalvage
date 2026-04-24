import { Link } from "wouter";
import { COMPANY, HOW_IT_WORKS, SERVICE_AREAS, TESTIMONIALS } from "@/lib/siteData";
import { Phone, Truck, DollarSign, Clock, Shield, Star, MapPin, ArrowRight, CheckCircle, Building2, Car } from "lucide-react";
import SEOHead, { localBusinessSchema, aggregateRatingSchema, serviceSchema } from "@/components/SEOHead";
import { useMemo } from "react";

function Hero() {
  return (
    <section className="relative bg-[oklch(0.13_0.01_250)] overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 25% 50%, oklch(0.65 0.19 45 / 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 50%, oklch(0.65 0.19 45 / 0.15) 0%, transparent 50%)"
        }} />
      </div>
      <div className="container relative py-20 md:py-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Serving Sanford, NC &amp; Surrounding Areas</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" style={{ fontFamily: "var(--font-heading)" }}>
            Fast Cash for Your{" "}
            <span className="text-primary">Junk Car</span>
            <br />Free Towing. Same Day.
          </h1>
          <p className="text-lg md:text-xl text-white/60 mb-8 max-w-2xl leading-relaxed">
            MG Salvage buys junk, damaged, and unwanted vehicles from consumers and businesses across central North Carolina. No hassle, no hidden fees — just honest offers and reliable service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/sell-your-junk-car"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3.5 rounded-lg text-base font-semibold hover:bg-primary/90 transition-colors"
            >
              <Car className="w-5 h-5" />
              Sell Your Junk Car
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/business-vehicle-removal"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-3.5 rounded-lg text-base font-semibold hover:bg-white/15 transition-colors"
            >
              <Building2 className="w-5 h-5" />
              Business Vehicle Removal
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-4 text-sm text-white/50">
            <a href={`tel:${COMPANY.phoneRaw}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              {COMPANY.phone}
            </a>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span>{COMPANY.hours}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const stats = [
    { icon: DollarSign, label: "Cash Paid Out", value: "$500K+" },
    { icon: Truck, label: "Vehicles Purchased", value: COMPANY.vehiclesPurchased },
    { icon: Clock, label: "Same-Day Pickup", value: "Available" },
    { icon: Shield, label: "Service Radius", value: "50 Miles" },
  ];

  return (
    <section className="bg-white border-b border-border">
      <div className="container py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground text-lg leading-tight" style={{ fontFamily: "var(--font-heading)" }}>{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="bg-muted/50 py-16 md:py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Selling your junk car is simple. Four steps, and you're done.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_IT_WORKS.map((item) => (
            <div key={item.step} className="bg-white rounded-xl p-6 border border-border relative">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                {item.step}
              </div>
              <h3 className="font-semibold text-foreground text-lg mb-2" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhoWeServe() {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Who We Serve
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether you're an individual with an old car or a business with a lot full of vehicles, we've got you covered.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border border-border p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <Car className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Individual Vehicle Owners
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Got a junk car, damaged vehicle, or a car that won't start? We'll give you a fair cash offer, pick it up for free, and pay you on the spot. No dealership runaround.
            </p>
            <ul className="flex flex-col gap-2 mb-6">
              {["Free towing — always", "Cash paid on the spot", "Any condition accepted", "Same-day pickup available"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/sell-your-junk-car"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
            >
              Get Your Free Estimate
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="bg-white rounded-xl border border-border p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Businesses &amp; Shops
            </h3>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Mechanic shops, body shops, used car dealers, and fleet operators — we handle lot clearing, abandoned vehicle removal, and scheduled pickups so you can focus on your business.
            </p>
            <ul className="flex flex-col gap-2 mb-6">
              {["Lot clearing & abandoned vehicles", "Scheduled recurring pickups", "Multiple vehicles at once", "Dedicated business accounts"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/business-vehicle-removal"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline"
            >
              Learn About Business Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceAreasSection() {
  return (
    <section className="bg-[oklch(0.13_0.01_250)] py-16 md:py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Service Areas
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            We serve a {COMPANY.serviceRadius} radius from our headquarters in Sanford, NC.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {SERVICE_AREAS.map((area) => (
            <Link
              key={area.slug}
              href={`/service-areas/${area.slug}`}
              className="bg-white/5 border border-white/10 rounded-xl p-5 text-center hover:bg-white/10 transition-colors group"
            >
              <MapPin className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="font-semibold text-white group-hover:text-primary transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                {area.name}
              </p>
              <p className="text-xs text-white/50 mt-1">{area.county}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/service-areas"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            View All Service Areas
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ReviewsSnapshot() {
  const featured = TESTIMONIALS.slice(0, 3);
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-primary fill-primary" />
            ))}
          </div>
          <p className="text-muted-foreground">Trusted by consumers and businesses across central NC</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((t, i) => (
            <div key={i} className="bg-white rounded-xl border border-border p-6">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-primary fill-primary" />
                ))}
              </div>
              <p className="text-foreground text-sm leading-relaxed mb-4">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-sm font-semibold text-muted-foreground">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location} &middot; {t.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
          >
            Read All Reviews
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-primary py-16 md:py-20">
      <div className="container text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>
          Ready to Get Rid of That Junk Car?
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          Get a free, no-obligation estimate in minutes. We'll pick up your vehicle for free and pay you cash on the spot.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/sell-your-junk-car"
            className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3.5 rounded-lg text-base font-semibold hover:bg-white/90 transition-colors"
          >
            Get Your Free Estimate
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={`tel:${COMPANY.phoneRaw}`}
            className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-3.5 rounded-lg text-base font-semibold hover:bg-white/20 transition-colors"
          >
            <Phone className="w-5 h-5" />
            Call {COMPANY.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const schemas = useMemo(() => [
    localBusinessSchema(),
    aggregateRatingSchema(),
    serviceSchema("Junk Car Removal", "Free junk car removal with cash offers and same-day pickup in Sanford, NC and surrounding areas."),
  ], []);

  return (
    <>
      <SEOHead
        title="Cash for Junk Cars | Free Towing | Sanford NC"
        description="MG Salvage buys junk cars, offers free towing, and provides fast cash offers in Sanford, NC and surrounding areas. Get your free estimate today."
        canonical="/"
        keywords="junk car removal, cash for junk cars, sell junk car, free towing, junk car buyer, Sanford NC, scrap car removal, same-day pickup, junk vehicle removal, sell my car for cash, unwanted vehicle removal, MG Salvage"
        schemas={schemas}
      />
      <Hero />
      <TrustBar />
      <HowItWorksSection />
      <WhoWeServe />
      <ServiceAreasSection />
      <ReviewsSnapshot />
      <FinalCTA />
    </>
  );
}
