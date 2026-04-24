# MG Salvage — Comprehensive Technical & Architecture SEO Audit

**Date:** April 24, 2026
**Domain:** mgsalvage.com (www.mgsalvage.com)
**Auditor:** Manus AI

---

## Executive Summary

This audit examines the MG Salvage web application across four critical dimensions: frontend rendering pipeline, schema markup and local entity data, server architecture and routing, and crawl optimization. The site is currently deployed as a **client-side rendered (CSR) single-page application** built on React 19 + Vite + Express. While the application architecture is sound for user experience, the CSR-only rendering model presents the single largest SEO blocker — search engine crawlers receive an empty `<div id="root"></div>` on initial page load, meaning all metadata, content, and structured data are invisible until JavaScript executes.

The audit identifies **5 critical blockers**, **4 high-priority issues**, and **3 moderate optimizations**. A prioritized implementation roadmap is provided at the end.

---

## 1. Frontend Framework & Rendering Pipeline

### 1.1 SSR/SSG Status — CRITICAL BLOCKER

The application uses `createRoot(...).render(...)` from `react-dom/client` in `client/src/main.tsx`, confirming it is a **pure client-side rendered SPA**. There is no `hydrateRoot`, no SSR entry point, and no prerender configuration in the Vite build pipeline (`vite.config.ts`). The Express server in production mode serves static files via `express.static()` with a catch-all fallback to `index.html` — a standard SPA pattern.

When Googlebot fetches any page, the initial HTML payload contains:

```html
<div id="root"></div>
<script type="module" src="/src/main.tsx?v=..."></script>
```

While Googlebot does execute JavaScript, it does so on a **deferred rendering queue** that can delay indexing by days or weeks [1]. Critical metadata (title, description, canonical, OG tags) and all JSON-LD structured data are injected via React's `useEffect` hook in the `SEOHead` component, meaning they are completely absent from the initial HTML response.

| Aspect | Current State | Required State |
|--------|--------------|----------------|
| Rendering mode | Client-side only (CSR) | Server-side rendered (SSR) or pre-rendered |
| Initial HTML payload | Empty `<div id="root">` | Fully rendered page content |
| Meta tags in source | Only static fallback in `index.html` | Per-route dynamic meta in server response |
| JSON-LD in source | Absent until JS executes | Present in initial `<head>` |
| Googlebot first-pass | Sees empty shell | Sees complete page |

### 1.2 Dynamic Meta Injection

The `SEOHead` component correctly manages `document.title`, `<meta name="description">`, canonical `<link>`, Open Graph tags (`og:title`, `og:description`, `og:type`, `og:site_name`, `og:url`), and JSON-LD scripts. Each page passes unique values. However, because this runs inside a `useEffect`, the metadata is only available after client-side hydration — not in the server response.

The static fallback in `client/index.html` provides a single generic title and description that applies to every route:

```html
<title>MG Salvage - Junk Car Removal & Cash for Cars in Sanford, NC</title>
<meta name="description" content="MG Salvage buys junk cars..." />
```

This means all 13+ pages share identical metadata from the crawler's perspective on first pass.

### 1.3 Hydration Mismatches

Since the application uses `createRoot` (not `hydrateRoot`), there is no SSR hydration occurring, and therefore no hydration mismatch risk. However, this also confirms there is no server-rendered content to hydrate — the entire page is built client-side.

---

## 2. Schema Markup & Local Entity Data

### 2.1 JSON-LD Format and Placement

JSON-LD schemas are correctly formatted and injected into `<head>` via `document.head.appendChild()`. Each schema block uses `<script type="application/ld+json" data-seo="true">`. The cleanup function properly removes stale schemas on route change. The implementation is architecturally correct but suffers from the CSR rendering issue described above — schemas are invisible in the initial HTML.

### 2.2 Schema Type Granularity — HIGH PRIORITY

The current `LocalBusiness` schema uses the generic `LocalBusiness` type. For a salvage/auto recycling business, a more granular type would improve entity recognition:

| Current | Recommended |
|---------|-------------|
| `LocalBusiness` | `AutoPartsStore` or `LocalBusiness` with `additionalType: "AutoWrecking"` |
| Generic `Service` | `Service` with `serviceType` specified |
| No `hasOfferCatalog` | `hasOfferCatalog` with specific service offerings |

### 2.3 Data Completeness — HIGH PRIORITY

The `localBusinessSchema()` function is missing several fields that strengthen local authority:

| Field | Status | Impact |
|-------|--------|--------|
| `geo` (GeoCoordinates) | Present in `serviceSchema` but **missing** from `localBusinessSchema` | Critical for local pack |
| `hasOfferCatalog` | Missing | Helps Google understand specific services |
| `url` | Missing | Should reference `https://mgsalvage.com` |
| `image` | Missing | Business image/logo URL |
| `sameAs` | Missing | Social media profile links |
| `paymentAccepted` | Missing | "Cash" — relevant for the business model |
| `serviceArea` boundaries | Uses `GeoCircle` in Service schema but `City` list in LocalBusiness | Should be consistent |

The `aggregateRatingSchema()` hardcodes `ratingCount: "47"` and `reviewCount: "47"` while the visible Reviews page dynamically counts from the `TESTIMONIALS` array (currently 6 items). This inconsistency could trigger a structured data penalty.

---

## 3. Server Architecture & Routing

### 3.1 Server Configuration

The Express server properly routes all non-API requests to the SPA's `index.html`, which is correct for client-side routing. The tRPC API is mounted at `/api/trpc`, keeping API traffic cleanly separated. The server does not expose `X-Powered-By: Express` header removal, which is a minor security/fingerprinting concern.

### 3.2 Response Headers — MODERATE

| Header | Current | Recommended |
|--------|---------|-------------|
| `X-Powered-By` | `Express` (exposed) | Remove with `app.disable('x-powered-by')` |
| `Cache-Control` | Not set | Set appropriate caching for static assets |
| `Content-Security-Policy` | Not set | Add basic CSP headers |
| `X-Content-Type-Options` | Not set | Add `nosniff` |
| `X-Frame-Options` | Not set | Add `DENY` or `SAMEORIGIN` |

### 3.3 Subdirectory Routing

All services are consolidated under the main domain using subdirectory routing (`/service-areas/`, `/business-vehicle-removal/`, etc.), which is the correct approach for domain authority consolidation. No subdomains are used for content, which is optimal.

### 3.4 Semantic HTML Structure

The application uses proper semantic HTML5 elements:

| Element | Usage | Assessment |
|---------|-------|------------|
| `<header>` | Site header with navigation | Correct |
| `<nav>` | Desktop and mobile navigation | Correct (two `<nav>` elements) |
| `<main>` | Page content wrapper | Correct |
| `<footer>` | Site footer | Correct |
| `<section>` | Content sections on every page | Correct |
| `<h1>` | Single per page | Correct |
| `<h2>` - `<h3>` | Section headings | Correct hierarchy |
| `<article>` | Not used for testimonials/reviews | Should be added |
| `<address>` | Not used for contact info | Should be added in footer |

---

## 4. Crawl Optimization

### 4.1 robots.txt — CRITICAL BLOCKER

No `robots.txt` file exists. Requesting `/robots.txt` returns the SPA's `index.html` (the catch-all fallback). This means crawlers receive a full HTML page instead of crawl directives, which wastes crawl budget and provides no guidance.

### 4.2 sitemap.xml — CRITICAL BLOCKER

No `sitemap.xml` exists. For a site with 13+ pages including dynamically routed city pages and B2B vertical pages, a sitemap is essential for discovery and crawl prioritization.

### 4.3 Crawl Trap Risk

The SPA catch-all route means any URL path returns a 200 status with the same HTML shell. This creates an infinite URL space from the crawler's perspective — every random URL appears to be a valid page. Without proper 404 handling at the server level, crawlers may waste significant budget on non-existent pages.

### 4.4 Redirect Chains

No redirect chains were identified. All routes return 200 directly. However, there is no HTTP-to-HTTPS redirect configured at the server level (handled by the deployment platform).

---

## Prioritized Implementation Roadmap

The following fixes are ordered by SEO impact, from most critical to least:

### Priority 1 — Critical Blockers (Implement Immediately)

**1A. Add Pre-rendering for SEO-Critical Pages**
Since the platform does not support full SSR, implement a **server-side meta tag injection** approach: intercept HTML responses at the Express level and inject per-route `<title>`, `<meta>`, canonical, OG tags, and JSON-LD directly into the HTML template before sending it to the client. This ensures crawlers see correct metadata on first pass without requiring a full SSR migration.

**1B. Create robots.txt**
Add a proper `robots.txt` to `client/public/` with sitemap reference and crawl directives.

**1C. Generate sitemap.xml**
Create a static `sitemap.xml` covering all pages with proper `<lastmod>`, `<changefreq>`, and `<priority>` values.

### Priority 2 — High Priority (Implement This Week)

**2A. Enhance LocalBusiness Schema**
Add `geo` coordinates, `url`, `hasOfferCatalog`, `paymentAccepted`, and `image` fields. Fix the aggregate rating count inconsistency.

**2B. Add Security Headers**
Remove `X-Powered-By`, add `X-Content-Type-Options`, `X-Frame-Options`, and basic `Cache-Control` headers for static assets.

**2C. Fix Unicode Escapes**
Replace remaining `\u2014` string literals with actual em-dash characters throughout the codebase.

### Priority 3 — Moderate Optimizations (Implement This Month)

**3A. Add `<article>` Elements**
Wrap testimonials and review cards in `<article>` elements for better semantic parsing.

**3B. Add `<address>` Element**
Wrap contact information in the footer with the `<address>` HTML5 element.

**3C. Add Structured Data Testing**
Implement automated validation of JSON-LD output against Google's Rich Results requirements.

---

## References

[1]: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics "Google: JavaScript SEO Basics"
[2]: https://schema.org/LocalBusiness "Schema.org: LocalBusiness"
[3]: https://developers.google.com/search/docs/appearance/structured-data "Google: Structured Data Guidelines"
[4]: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview "Google: Sitemaps Overview"
