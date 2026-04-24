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
});
