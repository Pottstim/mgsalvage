# MG Salvage Website TODO

## Foundation
- [x] Database schema for leads table (consumer, B2B, urgent)
- [x] tRPC API routes for lead submission
- [x] n8n webhook integration for lead notifications
- [x] N8N_WEBHOOK_URL secret configuration

## Theme & Layout
- [x] Dark charcoal/graphite theme with orange accent color
- [x] Global navigation with all pages: Home, Sell Your Junk Car, Junk Car Removal, Business Vehicle Removal, Service Areas, FAQ, About, Reviews, Contact
- [x] Responsive mobile navigation (hamburger menu)
- [x] Footer with contact info, service areas, quick links
- [x] Public-facing layout wrapper (no dashboard sidebar)

## Homepage
- [x] Hero section with dual CTAs (consumer + business)
- [x] Trust signals bar (years in business, vehicles purchased, etc.)
- [x] How It Works section (4 steps)
- [x] Who We Serve split section (consumer vs business)
- [x] Service areas map/summary
- [x] Reviews snapshot
- [x] Final CTA section

## Consumer Funnel Pages
- [x] Sell Your Junk Car page with inline estimate form
- [x] Consumer estimate form: name, phone, email, city, year/make/model, condition, title status
- [x] Junk Car Removal informational page
- [x] Cash for Junk Cars Sanford NC local SEO page (via city page /service-areas/sanford)

## B2B Funnel Pages
- [x] Business Vehicle Removal hub page with B2B form
- [x] B2B form: business name, contact, phone, email, city, business type, vehicle count/types, pickup timing
- [x] Mechanic Shops vertical page
- [x] Auto Body Shops vertical page
- [x] Used Car Dealers vertical page

## Service Areas
- [x] Service Areas hub page with coverage map/list
- [x] Dynamic routing /service-areas/:city
- [x] Sanford city page with localized content
- [x] Fayetteville city page with localized content
- [x] Pittsboro city page with localized content
- [x] Carthage city page with localized content
- [x] Lillington city page with localized content

## Supporting Pages
- [x] FAQ page with accordion-style Q&A
- [x] About / How It Works page
- [x] Reviews / Testimonials page
- [x] Contact / Request Pickup page with urgent callback form

## Forms & Lead Routing
- [x] Consumer estimate form submission -> DB + n8n webhook
- [x] B2B form submission -> DB + n8n webhook
- [x] Urgent callback form submission -> DB + n8n webhook
- [x] Lead type tagging on all submissions (consumer, b2b-mechanic, b2b-bodyshop, b2b-dealer, urgent)

## SEO & Schema
- [x] Dynamic meta tags per page (title, description, og:title, og:description, og:type, og:site_name, og:url)
- [x] LocalBusiness JSON-LD schema on Home/About
- [x] Service JSON-LD schema on service pages
- [x] FAQPage JSON-LD schema on FAQ page
- [x] BreadcrumbList JSON-LD schema sitewide
- [x] AggregateRating JSON-LD schema on Reviews page

## Testing
- [x] Vitest tests for lead submission API
- [x] Vitest tests for n8n webhook integration

## Technical SEO Audit & Fixes
- [x] Audit SSR/SSG status — verified CSR-only, implemented server-side meta injection
- [x] Audit dynamic meta tag injection — implemented server-side SEO middleware
- [x] Server-side meta injection middleware (title, description, canonical, OG, JSON-LD per route)
- [x] Validate JSON-LD schema markup format and placement in <head>
- [x] Enhanced JSON-LD schemas (geo, @id, hasOfferCatalog, paymentAccepted, serviceType)
- [x] Fix aggregateRating reviewCount to match actual testimonial count
- [x] Semantic HTML improvements (address element in footer, article elements for reviews)
- [x] robots.txt with sitemap reference and API/404 disallow
- [x] sitemap.xml with all 17 pages and correct priorities
- [x] Security headers (X-Content-Type-Options, X-Frame-Options, Referrer-Policy)
- [x] Disable X-Powered-By header
- [x] Vitest tests for SEO middleware (11 tests)
- [x] Compile technical audit report (AUDIT_REPORT.md)

## SEO Keyword Fixes
- [x] Add meta keywords tag to homepage via server-side SEO middleware
- [x] Add meta keywords tags to all pages (server-side + client-side)
