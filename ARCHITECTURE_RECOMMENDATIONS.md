# Architecture & SEO Recommendations

**Date:** May 2026
**Reviewer:** Zo

## 1. High-Level Architecture
This project is an exceptionally well-organized modern React implementation. Utilizing Vite, React 19, Tailwind CSS v4, Radix/Shadcn UI, and `wouter` creates a highly efficient, lean stack that avoids the bloat of heavier frameworks. 

**Strengths:**
* **Scale & Routing:** Highly modular routing structure with dynamic city pages (`CityPage.tsx`), distinct user verticals (B2B vs Consumer), and excellent state management hooks.
* **Theming:** Utilizing modern CSS color spaces (`oklch`) directly in Tailwind utility classes shows a forward-thinking approach to design.
* **Prerendering Script:** The `prerender.js` script using Puppeteer in your build step to crawl the `sitemap.xml` and generate static HTML is exactly the right instinct to solve the CSR SEO penalty.

## 2. Critical Vulnerability: Deployment Runtime vs Prerendering
Despite the presence of `prerender.js`, the live deployment at `mgsalvage.com` is actively bypassing it. 

When querying the live site, it returns an empty `<div id="root"></div>` alongside a `<script id="manus-runtime">` tag. This indicates it is hosted via a third-party AI runtime/platform (Manus) that is delivering the raw Client-Side Rendered (CSR) bundle rather than your statically generated HTML from the `dist` folder.

While Googlebot can render JavaScript, CSR incurs a heavy penalty on First Contentful Paint (FCP) and Time to Interactive (TTI). For a local service company, Local SEO is critical, and throwing away your prerendered static HTML is severely hurting your ranking potential.

## 3. Recommended Action Plan
**Move the deployment off the Manus runtime.** 

Since you already have the Puppeteer prerender script built and working in `prerender.js`, you should deploy the resulting `dist` folder to a standard static host. 

**Recommended Static Hosts:**
* **Cloudflare Pages** (Best performance, free)
* **Vercel** (Excellent developer experience)
* **Zo Space / Nginx** (If you prefer to self-host)

By deploying the purely static output of your `dist` folder, the browser (and Googlebot) will receive fully-rendered HTML instantly, drastically improving your Core Web Vitals and local search rankings.