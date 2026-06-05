import { Link, useLocation } from "wouter";
import { useState } from "react";
import { COMPANY, NAV_LINKS, SERVICE_AREAS } from "@/lib/siteData";
import { Phone, Menu, X, MapPin, Clock, Mail, ChevronRight } from "lucide-react";

function TopBar() {
  return (
    <div className="bg-[oklch(0.15_0.01_250)] text-white/80 text-sm hidden md:block">
      <div className="container flex items-center justify-between py-2">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {COMPANY.fullAddress}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {COMPANY.hours}
          </span>
        </div>
        <a
          href={`tel:${COMPANY.phoneRaw}`}
          className="flex items-center gap-1.5 text-primary font-semibold hover:text-primary/80 transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          {COMPANY.phone}
        </a>
      </div>
    </div>
  );
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <TopBar />
      <div className="container flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/assets/logo-light.png"
            alt="MG Salvage"
            className="h-12 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                location === link.href
                  ? "text-primary bg-primary/5"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${COMPANY.phoneRaw}`}
            className="flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <Phone className="w-4 h-4" />
            {COMPANY.phone}
          </a>
          <Link
            href="/sell-your-junk-car"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Get Free Estimate
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-white">
          <nav className="container py-4 flex flex-col gap-1" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  location === link.href
                    ? "text-primary bg-primary/5"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t border-border flex flex-col gap-2">
              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="flex items-center gap-2 px-3 py-2.5 text-sm font-semibold text-primary"
              >
                <Phone className="w-4 h-4" />
                {COMPANY.phone}
              </a>
              <Link
                href="/sell-your-junk-car"
                onClick={() => setMobileOpen(false)}
                className="bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-semibold text-center hover:bg-primary/90 transition-colors"
              >
                Get Free Estimate
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[oklch(0.15_0.01_250)] text-white/80">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/assets/logo-dark.png"
                alt="MG Salvage"
                className="h-11 w-auto"
              />
            </div>
            <p className="text-sm text-white/60 mb-4 leading-relaxed">
              Professional salvage and vehicle acquisition company serving central North Carolina. Fast cash, free towing, honest service.
            </p>
            <address className="flex flex-col gap-2 text-sm not-italic">
              <a href={`tel:${COMPANY.phoneRaw}`} className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                <Phone className="w-4 h-4" />
                {COMPANY.phone}
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                {COMPANY.email}
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {COMPANY.fullAddress}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {COMPANY.hours}
              </span>
            </address>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>Quick Links</h4>
            <ul className="flex flex-col gap-2">
              {[
                { label: "Sell Your Junk Car", href: "/sell-your-junk-car" },
                { label: "Junk Car Removal", href: "/junk-car-removal" },
                { label: "Business Vehicle Removal", href: "/business-vehicle-removal" },
                { label: "How It Works", href: "/about" },
                { label: "FAQ", href: "/faq" },
                { label: "Contact Us", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Service", href: "/terms-of-service" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors flex items-center gap-1">
                    <ChevronRight className="w-3 h-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-semibold text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>Service Areas</h4>
            <ul className="flex flex-col gap-2">
              {SERVICE_AREAS.map((area) => (
                <li key={area.slug}>
                  <Link href={`/service-areas/${area.slug}`} className="text-sm hover:text-white transition-colors flex items-center gap-1">
                    <ChevronRight className="w-3 h-3" />
                    {area.name}, {area.state}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/service-areas" className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                  <ChevronRight className="w-3 h-3" />
                  View All Areas
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Services */}
          <div>
            <h4 className="font-semibold text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>Business Services</h4>
            <ul className="flex flex-col gap-2">
              {["Mechanic Shops", "Auto Body Shops", "Used Car Dealers"].map((label) => (
                <li key={label}>
                  <Link href={`/business-vehicle-removal/${label.toLowerCase().replace(/\s+/g, "-")}`} className="text-sm hover:text-white transition-colors flex items-center gap-1">
                    <ChevronRight className="w-3 h-3" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-sm text-white font-medium mb-2">Talk to a local buyer today</p>
              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>&copy; {new Date().getFullYear()} MG Salvage. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              Licensed &amp; Insured
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              NC DMV Compliant
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
              50-Mile Service Radius
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Breadcrumbs() {
  const [location] = useLocation();
  if (location === "/") return null;

  const crumbMap: Record<string, { label: string; href?: string }> = {
    "/": { label: "Home", href: "/" },
    "/sell-your-junk-car": { label: "Sell Your Junk Car", href: "/sell-your-junk-car" },
    "/junk-car-removal": { label: "Junk Car Removal", href: "/junk-car-removal" },
    "/business-vehicle-removal": { label: "Business Vehicle Removal", href: "/business-vehicle-removal" },
    "/service-areas": { label: "Service Areas", href: "/service-areas" },
    "/faq": { label: "FAQ", href: "/faq" },
    "/about": { label: "About", href: "/about" },
    "/reviews": { label: "Reviews", href: "/reviews" },
    "/contact": { label: "Contact", href: "/contact" },
    "/privacy-policy": { label: "Privacy Policy", href: "/privacy-policy" },
    "/terms-of-service": { label: "Terms of Service", href: "/terms-of-service" },
  };

  // Handle dynamic routes like /service-areas/sanford, /business-vehicle-removal/mechanic-shops
  const segments = location.split("/").filter(Boolean);
  const parts: { label: string; href?: string }[] = [{ label: "Home", href: "/" }];

  let accumulated = "";
  for (const segment of segments) {
    accumulated += `/${segment}`;
    const match = crumbMap[accumulated];
    if (match) {
      parts.push(match);
    } else {
      // Capitalize segment for display
      const label = segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      parts.push({ label });
    }
  }

  if (parts.length <= 1) return null;

  return (
    <nav className="bg-[oklch(0.08_0.01_250)] py-2.5" aria-label="Breadcrumb">
      <div className="container flex items-center gap-1.5 text-sm">
        {parts.map((part, i) => (
          <span key={i} className="flex items-center gap-1.5 text-white/60">
            {i > 0 && <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
            {part.href ? (
              <Link href={part.href} className="hover:text-white transition-colors">
                {part.label}
              </Link>
            ) : (
              <span className="text-white/80">{part.label}</span>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}

/**
 * Sticky mobile CTA bar — shown only on mobile, fixed to bottom.
 * Drives call and form conversions from every page.
 */
function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-lg flex lg:hidden">
      <a
        href={`tel:${COMPANY.phoneRaw}`}
        className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold text-primary border-r border-border"
      >
        <Phone className="w-4 h-4" />
        Call Now
      </a>
      <Link
        href="/sell-your-junk-car"
        className="flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold bg-primary text-white"
      >
        Get Free Estimate
      </Link>
    </div>
  );
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Breadcrumbs />
      {/* pb-16 on mobile to prevent content hiding behind sticky bar */}
      <main className="flex-1 pb-16 lg:pb-0">{children}</main>
      <Footer />
      <MobileStickyBar />
    </div>
  );
}