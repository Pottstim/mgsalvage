import { describe, expect, it } from "vitest";
import { injectSEO } from "./seoMiddleware";

const TEMPLATE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>MG Salvage - Junk Car Removal & Cash for Cars in Sanford, NC</title>
    <meta name="description" content="MG Salvage buys junk cars..." />
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

describe("seoMiddleware.injectSEO", () => {
  it("injects correct title for homepage", () => {
    const result = injectSEO(TEMPLATE, "/");
    expect(result).toContain("<title>Cash for Junk Cars | Free Towing | Sanford NC | MG Salvage</title>");
  });

  it("removes the original static title and description", () => {
    const result = injectSEO(TEMPLATE, "/");
    expect(result).not.toContain("MG Salvage - Junk Car Removal &amp; Cash for Cars");
    expect(result).not.toContain('content="MG Salvage buys junk cars..."');
  });

  it("injects canonical URL for homepage", () => {
    const result = injectSEO(TEMPLATE, "/");
    expect(result).toContain('<link rel="canonical" href="https://mgsalvage.com/"');
  });

  it("injects Open Graph tags", () => {
    const result = injectSEO(TEMPLATE, "/");
    expect(result).toContain('property="og:title"');
    expect(result).toContain('property="og:description"');
    expect(result).toContain('property="og:type"');
    expect(result).toContain('property="og:site_name"');
    expect(result).toContain('property="og:url"');
  });

  it("injects meta keywords tag on homepage", () => {
    const result = injectSEO(TEMPLATE, "/");
    expect(result).toContain('<meta name="keywords"');
    expect(result).toContain('junk car removal');
    expect(result).toContain('cash for junk cars');
    expect(result).toContain('Sanford NC');
    expect(result).toContain('free towing');
    expect(result).toContain('MG Salvage');
  });

  it("injects page-specific keywords for each route", () => {
    const sellResult = injectSEO(TEMPLATE, "/sell-your-junk-car");
    expect(sellResult).toContain('sell junk car');
    expect(sellResult).toContain('junk car value');

    const b2bResult = injectSEO(TEMPLATE, "/business-vehicle-removal");
    expect(b2bResult).toContain('lot clearing');
    expect(b2bResult).toContain('commercial vehicle removal');

    const cityResult = injectSEO(TEMPLATE, "/service-areas/sanford");
    expect(cityResult).toContain('junk car removal Sanford');
    expect(cityResult).toContain('Lee County');
  });

  it("injects JSON-LD LocalBusiness schema with geo and hasOfferCatalog", () => {
    const result = injectSEO(TEMPLATE, "/");
    expect(result).toContain('"@type":"LocalBusiness"');
    expect(result).toContain('"@type":"GeoCoordinates"');
    expect(result).toContain('"hasOfferCatalog"');
    expect(result).toContain('"paymentAccepted":"Cash"');
  });

  it("injects correct meta for sell-your-junk-car page", () => {
    const result = injectSEO(TEMPLATE, "/sell-your-junk-car");
    expect(result).toContain("<title>Sell Your Junk Car for Cash | Free Estimate | MG Salvage</title>");
    expect(result).toContain('href="https://mgsalvage.com/sell-your-junk-car"');
  });

  it("injects correct meta for city page", () => {
    const result = injectSEO(TEMPLATE, "/service-areas/sanford");
    expect(result).toContain("Cash for Junk Cars in Sanford, NC");
    expect(result).toContain("Lee County");
    expect(result).toContain('href="https://mgsalvage.com/service-areas/sanford"');
  });

  it("injects correct meta for B2B vertical page", () => {
    const result = injectSEO(TEMPLATE, "/business-vehicle-removal/mechanic-shops");
    expect(result).toContain("Vehicle Removal for Mechanic Shops");
    expect(result).toContain("mechanic shops");
  });

  it("injects BreadcrumbList schema for subpages", () => {
    const result = injectSEO(TEMPLATE, "/faq");
    expect(result).toContain('"@type":"BreadcrumbList"');
    expect(result).toContain('"FAQ"');
  });

  it("injects FAQPage schema on /faq page", () => {
    const result = injectSEO(TEMPLATE, "/faq");
    expect(result).toContain('"@type":"FAQPage"');
    expect(result).toContain('"@type":"Question"');
    expect(result).toContain('"What types of vehicles do you buy?"');
  });

  it("provides fallback meta for unknown routes", () => {
    const result = injectSEO(TEMPLATE, "/some-random-page");
    expect(result).toContain("<title>MG Salvage | Junk Car Removal");
  });

  it("injects AggregateRating schema on reviews page", () => {
    const result = injectSEO(TEMPLATE, "/reviews");
    expect(result).toContain('"@type":"AggregateRating"');
    expect(result).toContain('"ratingValue":"4.9"');
  });

  // SSR fallback content tests
  it("injects H1 tag inside root div for homepage", () => {
    const result = injectSEO(TEMPLATE, "/");
    expect(result).toContain("<h1>");
    expect(result).toContain("Fast Cash for Your Junk Car");
    expect(result).not.toContain('<div id="root"></div>');
  });

  it("injects semantic HTML landmarks (header, nav, main, footer) for homepage", () => {
    const result = injectSEO(TEMPLATE, "/");
    expect(result).toContain("<header>");
    expect(result).toContain('<nav aria-label="Main navigation">');
    expect(result).toContain("<main>");
    expect(result).toContain("<footer>");
    expect(result).toContain("<address>");
  });

  it("injects navigation links in SSR content", () => {
    const result = injectSEO(TEMPLATE, "/");
    expect(result).toContain('<a href="/sell-your-junk-car">Sell Your Junk Car</a>');
    expect(result).toContain('<a href="/faq">FAQ</a>');
    expect(result).toContain('<a href="/contact">Contact</a>');
  });

  it("injects SSR content with keyword-rich body text for homepage", () => {
    const result = injectSEO(TEMPLATE, "/");
    expect(result).toContain("free towing");
    expect(result).toContain("same-day pickup");
    expect(result).toContain("Sanford, Fayetteville, Pittsboro, Carthage, Lillington");
  });

  it("injects SSR fallback for all page routes", () => {
    const routes = [
      "/sell-your-junk-car",
      "/junk-car-removal",
      "/business-vehicle-removal",
      "/business-vehicle-removal/mechanic-shops",
      "/service-areas",
      "/service-areas/sanford",
      "/faq",
      "/about",
      "/reviews",
      "/contact",
    ];
    for (const route of routes) {
      const result = injectSEO(TEMPLATE, route);
      expect(result).toContain("<h1>");
      expect(result).toContain("<header>");
      expect(result).toContain("<main>");
      expect(result).toContain("<footer>");
      expect(result).not.toContain('<div id="root"></div>');
    }
  });
});
