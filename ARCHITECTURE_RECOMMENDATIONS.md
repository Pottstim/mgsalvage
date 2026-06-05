# Architecture & SEO Recommendations

**Date:** May 2026  
**Reviewer:** Zo

## 1. High-level architecture

This project is a well-organized React implementation using Vite, React 19, Tailwind CSS v4, Radix/Shadcn UI, and `wouter`. The stack avoids framework bloat while remaining capable.

Strengths:

- **Scale and routing:** Modular routing with dynamic city pages (`CityPage.tsx`), distinct user verticals (B2B vs consumer), and clean state management hooks.
- **Theming:** Uses modern CSS color spaces (`oklch`) directly in Tailwind utility classes.
- **Prerendering script:** The `prerender.js` script uses Puppeteer in the build step to crawl `sitemap.xml` and generate static HTML — the right approach for CSR SEO.

## 2. Deployment status

The site is deployed to Cloudflare Pages and serves content to Googlebot. The previous Manus-runtime tag has been removed. The CI/CD pipeline runs `prerender.js` as part of the build.

If Googlebot encounters rendering issues, verify that the Cloudflare Pages build output includes the prerendered HTML files from the `dist` directory. Cloudflare Pages serves static files directly, so Googlebot receives fully-rendered HTML for all pages in the sitemap.

## 3. Ongoing maintenance

- Run `node prerender.js` during each production build to regenerate static HTML for any new or updated pages.
- Monitor Google Search Console for indexation coverage and Core Web Vitals.
- Add new city pages to the sitemap and regenerate prerendered HTML when expanding service areas.
