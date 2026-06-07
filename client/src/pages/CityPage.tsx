import { Link, useParams } from "wouter";
import PageHeader from "@/components/PageHeader";
import ConsumerForm from "@/components/ConsumerForm";
import { SERVICE_AREAS, COMPANY, FAQS, TESTIMONIALS } from "@/lib/siteData";
import SEOHead, { localBusinessSchema, faqSchema, breadcrumbSchema, serviceSchema } from "@/components/SEOHead";
import { useMemo } from "react";
import { CheckCircle, Phone, Star, ArrowRight, MapPin, Clock, DollarSign, FileText } from "lucide-react";

// Unique local content per city — each city has distinct landmarks, neighborhoods, ZIP codes, and local context
const CITY_LOCAL_CONTENT: Record<string, {
  zipCodes: string[];
  neighborhoods: string[];
  landmarks: string[];
  localContext: string;
  whyChooseUs: string[];
  serviceNote: string;
  layoutVariant?: "a" | "b" | "c";
}> = {
  sanford: {
    zipCodes: ["27330", "27332"],
    neighborhoods: ["West Sanford", "East Sanford", "Deep River", "Jonesboro Heights", "Carbonton Road area"],
    landmarks: ["Historic Downtown Sanford", "Lee County Courthouse", "Sanford Area Farmers Market", "Tramway Road corridor", "Deep River"],
    localContext: "As our headquarters city, Sanford is where MG Salvage was founded and where our operations are based. We know every neighborhood from the historic downtown district near the courthouse to the homes along Carbonton Road and the Deep River area. Our teams are local to Sanford and can typically respond within hours for same-day pickups throughout Lee County.",
    whyChooseUs: [
      "Headquarters location. Fastest response times in Lee County",
      "We serve every Sanford ZIP code: 27330 and 27332",
      "Same-day pickup available throughout the city",
      "Licensed and fully insured for all Sanford neighborhoods",
      "We know local DMV requirements for Lee County title transfers",
    ],
    serviceNote: "Sanford residents get priority scheduling because we're based right here. Whether you're near the Downtown Historic District, out by the Brickyard Homes neighborhood, or along US-421, we'll come to you.",
    layoutVariant: "b",
  },
  fayetteville: {
    zipCodes: ["28301", "28303", "28304", "28305", "28306", "28310", "28314"],
    neighborhoods: ["Haymount", "Vanstory Hills", "Westover", "Raeford Road corridor", "Hope Mills adjacent", "Fort Bragg / Liberty area"],
    landmarks: ["Fort Bragg / Fort Liberty", "Fayetteville Veterans Arsenal", "Cape Fear River Trail", "Cross Creek Mall", "Downtown Fayetteville", "Fayetteville State University"],
    localContext: "Fayetteville is one of North Carolina's largest cities and home to Fort Liberty (formerly Fort Bragg), one of the largest military installations in the world. With over a dozen ZIP codes and a wide geographic footprint, we serve the entire Cumberland County area. Many of our Fayetteville customers are military families who need quick, reliable vehicle removal during PCS moves or when dealing with abandoned vehicles on base-adjacent properties.",
    whyChooseUs: [
      "Military-friendly service. We understand PCS timelines and base-adjacent communities",
      "Full Cumberland County coverage including Raeford Road, Skibo Road, and Bragg Blvd corridors",
      "We handle high-volume pickups near Fort Liberty and Fayetteville State University",
      "Familiar with military ID requirements and power of attorney situations for deployed service members",
      "Free towing across all Fayetteville ZIP codes",
    ],
    serviceNote: "Our Fayetteville service area extends to Hope Mills, Spring Lake, and Eastover. If you're near the All American Expressway, Skibo Road, or the Ramsey Street corridor, we can typically schedule same-day pickup.",
    layoutVariant: "c",
  },
  pittsboro: {
    zipCodes: ["27312", "27344"],
    neighborhoods: ["Historic Downtown Pittsboro", "Fearrington Village", "Bynum area", "Governors Club area", "Chatham Park development"],
    landmarks: ["Chatham County Courthouse", "Fearrington Village", "Haw River", "Jordan Lake", "Historic Downtown Pittsboro", "Chatham Park"],
    localContext: "Pittsboro is the county seat of Chatham County and one of the fastest-growing communities in the Triangle region. With major developments like Chatham Park and Governors Club bringing thousands of new homes, and established communities like Fearrington Village and historic downtown, Pittsboro has a mix of rural properties and suburban neighborhoods. We serve the entire area, from properties along US-15-504 to homes near Jordan Lake.",
    whyChooseUs: [
      "Full Chatham County coverage including Fearrington Village and Governors Club",
      "We serve rural properties and farms along the Haw River corridor",
      "Knowledgeable about Chatham County DMV and title requirements",
      "Same-day pickup available in Pittsboro and surrounding Bynum, Bells, and Moncure",
      "We handle vehicles on large rural properties including tractors, farm trucks, and equipment",
    ],
    serviceNote: "Pittsboro customers often have vehicles on larger rural properties or farms. We're equipped to handle pickups from driveways, fields, and barns throughout Chatham County.",
    layoutVariant: "a",
  },
  carthage: {
    zipCodes: ["28327", "27344"],
    neighborhoods: ["Historic Courthouse district", "Lake Camargo area", "Sandhurst area", "Vass area", "Averasboro area"],
    landmarks: ["Carthage Historic Courthouse", "Lake Camargo", "Weymouth Woods Sandhills Nature Preserve", "Averasboro Battlefield", "Sandhills region", "Deep River"],
    localContext: "Carthage is a small, historic town in Moore County known for its beautiful courthouse square and proximity to the Sandhills region. The area is characterized by sandy soil, pine forests, and properties ranging from historic downtown homes to rural estates. We serve all of Moore County, from Carthage to Aberdeen, Southern Pines, and Pinehurst. We offer the same professional junk car removal service throughout.",
    whyChooseUs: [
      "Full Moore County coverage including Carthage, Aberdeen, Southern Pines, and Pinehurst",
      "We understand rural property access in the Sandhills sandy terrain",
      "Experienced with estate and property cleanouts common in the Moore County area",
      "Familiar with Moore County paperwork and tax requirements for vehicle transfers",
      "Free towing even for properties on unpaved or rural roads",
    ],
    serviceNote: "Carthage and the Sandhills region often have properties on unpaved roads, in pine forests, or on larger acreage. Our team is equipped to handle vehicle pickups in all terrain conditions across Moore County.",
    layoutVariant: "b",
  },
  lillington: {
    zipCodes: ["27546"],
    neighborhoods: ["Downtown Lillington", "Harnett Central area", "Angier adjacent", "Buies Creek area", "Coats area"],
    landmarks: ["Harnett County Courthouse", "Cape Fear River", "Campbell University", "Angier Avenue corridor", "Cape Fear River Walking Trail", "Downtown Lillington"],
    localContext: "Lillington is the county seat of Harnett County, located between Raleigh and Fayetteville along US-421. It's a growing community with a mix of historic downtown, suburban neighborhoods, and rural areas extending toward Angier, Buies Creek (home of Campbell University), and the Cape Fear River. We serve all of Harnett County with the same reliable junk car removal and cash-for-cars service.",
    whyChooseUs: [
      "Complete Harnett County coverage including Lillington, Angier, Coats, and Buies Creek",
      "We serve Campbell University area and student housing communities",
      "Knowledgeable about Harnett County DMV, title, and tax requirements",
      "Same-day pickup available along US-421, NC-210, and Cape Fear River corridor",
      "We handle both residential and commercial vehicles throughout the county",
    ],
    serviceNote: "Lillington sits along the busy US-421 corridor, making it easy for our teams to reach quickly. Whether you're near the courthouse square, along NC-210 toward Angier, or out by the Cape Fear River, we'll come to you.",
  },
  apex: {
    zipCodes: ["27502", "27523"],
    neighborhoods: ["Apex Historic District", "Apex Peakway corridor", "Olive Chapel Road area", "Salem Village", "Center Park area"],
    landmarks: ["Apex Towne Square", "Apex Peak Pavilion", "Kelly Road Park", "Historic Apex Downtown"],
    localContext: "Apex has been ranked one of the best small cities in America, and its rapid growth means plenty of vehicle turnover. From the historic downtown district to the newer developments along the NC-540 corridor, MG Salvage provides fast, reliable junk car removal throughout Apex and western Wake County.",
    whyChooseUs: [
      "Full Wake County coverage including Apex, Holly Springs, and Fuquay-Varina corridors",
      "We serve the fast-growing NC-540 corridor and downtown Apex area",
      "Same-day pickup available throughout Apex ZIP codes 27502 and 27523",
      "Fair offers based on Triangle market conditions",
      "Professional service for Apex's residential and commercial properties",
    ],
    serviceNote: "Apex's combination of established neighborhoods and new construction means we handle everything from old vehicles on rural lots to fleet vehicles from local businesses. Call us for same-day pickup.",
    layoutVariant: "a",
  },
  "holly-springs": {
    zipCodes: ["27540"],
    neighborhoods: ["Broadway Road area", "Apex Highway corridor", "Sunset Lake area", "Wessel Town Center area", "Tollaway corridor"],
    landmarks: ["Wessel Town Center", "Sunset Lake", "Holly Springs Cultural Center", "NC-55 corridor"],
    localContext: "Holly Springs is one of the fastest-growing towns in Wake County, with a booming commercial corridor along US-1 and NC-55. Between the residential subdivisions and the expanding biotech corridor near FUJIFILM Diosynth, vehicles turn over quickly here. We serve all of Holly Springs and southern Wake County.",
    whyChooseUs: [
      "Wake County coverage including Holly Springs, Apex, and Fuquay-Varina",
      "Serving the US-1 biotech corridor and commercial districts",
      "Same-day pickup available throughout ZIP code 27540",
      "We handle both residential and commercial vehicle removal",
      "Professional service for Holly Springs' diverse mix of properties",
    ],
    serviceNote: "Holly Springs' growth means we're regularly removing vehicles from new construction sites, established neighborhoods, and commercial lots. We know how to work around the area's busy roads and tight schedules.",
    layoutVariant: "c",
  },
  dunn: {
    zipCodes: ["28334"],
    neighborhoods: ["Downtown Dunn", "Clinton Avenue corridor", "Barclayville area", "Purvis Lake area", "I-95 corridor area"],
    landmarks: ["Downtown Dunn Historic District", "General William C. Lee House", "I-95 corridor", "Cape Fear River area", "Harnett County area"],
    localContext: "Dunn sits along the I-95 corridor in Harnett County, making it a hub for travelers and commercial traffic. We serve Dunn and the surrounding communities of Erwin, Benson, and the I-95 corridor with reliable junk car removal. Our location allows us to respond quickly to pickups along the entire I-95 stretch between Raleigh and Fayetteville.",
    whyChooseUs: [
      "Full Harnett County coverage including Dunn, Erwin, Benson, and Coats",
      "Same-day pickup available throughout the I-95 corridor",
      "We serve properties along I-95, US-301, and NC-24 corridors",
      "Experienced with commercial and fleet vehicle removal",
      "Fair offers based on current scrap market conditions",
    ],
    serviceNote: "Dunn's location along I-95 makes it easy for our teams to reach quickly. Whether you're near downtown Dunn, along US-301 toward Benson, or on a rural property off NC-55, we'll come to you.",
    layoutVariant: "a",
  },
  raeford: {
    zipCodes: ["28376", "28387"],
    neighborhoods: ["Downtown Raeford", "Dundarrach area", "Hoke County area", "Silver City area", "Rockfish area"],
    landmarks: ["Hoke County Courthouse", "Raeford Historic District", "Fort Liberty adjacent area", "US-401 corridor"],
    localContext: "Raeford is the county seat of Hoke County, located south of Fayetteville near Fort Liberty. We serve all of Hoke County with reliable junk car removal. Many of our Raeford customers are connected to the military community and need quick, dependable vehicle removal.",
    whyChooseUs: [
      "Full Hoke County coverage including Raeford, Dundarrach, and Silver City",
      "Military-friendly service near Fort Liberty",
      "Same-day pickup available throughout Raeford and surrounding areas",
      "We serve rural properties and commercial lots throughout Hoke County",
      "Fair pricing based on current scrap and parts market",
    ],
    serviceNote: "Raeford's rural character means we're often picking up vehicles from farms, large lots, and rural properties. Our equipment handles any terrain.",
    layoutVariant: "b",
  },
  "fuquay-varina": {
    zipCodes: ["27526"],
    neighborhoods: ["Fuquay District", "Varina Station", "Downtown Fuquay-Varina", "Sunset Lake area", "Jenton Road area", "Ten-Ten Road corridor"],
    landmarks: ["Fuquay Mineral Spring Park", "Varina Historical District", "Fuquay-Varina Town Hall", "NC-42 corridor", "US-401 corridor"],
    localContext: "Fuquay-Varina is one of the fastest-growing ZIP codes nationally, located in southern Wake County between Apex and Garner. With two charming historic downtowns, booming suburban developments, and commercial corridors along US-401 and NC-42, Fuquay-Varina has a dynamic vehicle market. We serve the entire Fuquay-Varina area.",
    whyChooseUs: [
      "Full southern Wake County coverage including Fuquay-Varina, Willow Spring, and Holly Springs",
      "Serving both Fuquay District and Varina Station historic downtowns",
      "Same-day pickup available throughout ZIP code 27526",
      "We handle the full spectrum from residential to commercial vehicles",
      "Professional service for Fuquay-Varina's mix of old and new properties",
    ],
    serviceNote: "Fuquay-Varina's rapid growth means we're regularly helping new homeowners, contractors, and businesses. Whether your vehicle is in a subdivision off NC-42 or a rural property near the Harnett County line, we can handle it.",
    layoutVariant: "c",
  },
  burlington: {
    zipCodes: ["27215", "27217"],
    neighborhoods: ["Downtown Burlington", "Huffman Mill area", "Glen Raven area", "I-85/I-40 corridor", "University area"],
    landmarks: ["Downtown Burlington", "Alamance Battleground", "I-85/I-40 interchange", "Burlington Outlet Village"],
    localContext: "Burlington anchors Alamance County at the intersection of I-85 and I-40, making it one of the busiest commercial corridors in central North Carolina. The city's mix of established neighborhoods, industrial areas, and commercial lots creates steady demand for junk car removal services.",
    whyChooseUs: [
      "Full Alamance County coverage including Burlington, Graham, and Mebane",
      "Serving the I-85/I-40 commercial corridor and industrial areas",
      "Same-day pickup available throughout Burlington ZIP codes",
      "Experienced with commercial fleet and industrial vehicle removal",
      "Fair offers based on Piedmont market conditions",
    ],
    serviceNote: "Burlington's location at the I-85/I-40 intersection means we can respond quickly from our Sanford headquarters. We serve everything from residential driveways to industrial lots.",
    layoutVariant: "a",
  },
  asheboro: {
    zipCodes: ["27203", "27205"],
    neighborhoods: ["Downtown Asheboro", "North Asheboro", "South Asheboro", "Prescott Area", "US-64 corridor"],
    landmarks: ["Downtown Asheboro", "North Carolina Zoo", "Randolph County Courthouse", "US-64 corridor"],
    localContext: "Asheboro is the county seat of Randolph County and home to the North Carolina Zoo, one of the largest natural-habitat zoos in the world. The area's mix of downtown commercial, suburban residential, and rural properties means we handle a wide variety of vehicle removal jobs throughout Randolph County.",
    whyChooseUs: [
      "Full Randolph County coverage including Asheboro, Seagrove, and Randleman",
      "Serving the NC Zoo area and US-64 commercial corridor",
      "Same-day pickup available throughout Asheboro ZIP codes",
      "We handle vehicles from residential properties, businesses, and rural farms",
      "Fair offers based on current market conditions",
    ],
    serviceNote: "Asheboro's central location in North Carolina makes it accessible from Sanford via US-64. Whether you're near the zoo, downtown, or on a rural property in Randolph County, we can handle it.",
    layoutVariant: "b",
  },
};

export default function CityPage() {
  const params = useParams<{ slug: string }>();
  const city = params?.slug ?? "";
  const area = SERVICE_AREAS.find((a) => a.slug === city);
  const localContent = CITY_LOCAL_CONTENT[city];

  const localFaqs = FAQS.slice(0, 4);
  const schemas = useMemo(() => area ? [
    localBusinessSchema(),
    serviceSchema(`Cash for Junk Cars in ${area.name}`, area.description),
    faqSchema(localFaqs),
    breadcrumbSchema([
      { name: "Service Areas", url: "/service-areas" },
      { name: `${area.name}, ${area.state}`, url: `/service-areas/${area.slug}` },
    ]),
  ] : [], [area]);

  // For cities without custom local content, generate generic content from SERVICE_AREAS data
  const effectiveLocalContent = localContent ?? (area ? {
    zipCodes: [],
    neighborhoods: [`${area.name} area`, `${area.county} communities`],
    landmarks: [`${area.name} downtown`, `${area.county} area`],
    localContext: `MG Salvage provides professional junk car removal throughout ${area.name} and ${area.county}. We buy vehicles in any condition — running or not — and offer free towing with cash paid on the spot. Our team serves the entire ${area.name} area with same-day and next-day pickup options.`,
    whyChooseUs: [
      `Full ${area.county} coverage`,
      "Free towing included with every pickup",
      "Cash paid on the spot",
      "All makes, models, and conditions accepted",
      "Licensed and insured service",
    ],
    serviceNote: `We serve all of ${area.name} and the surrounding ${area.county} area. Call us for a free estimate and same-day scheduling.`,
  } : null);

  if (!area || !effectiveLocalContent) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Area Not Found</h1>
        <p className="text-muted-foreground mb-6">We couldn't find information for this service area.</p>
        <Link href="/service-areas" className="text-primary font-semibold hover:underline">
          View All Service Areas
        </Link>
      </div>
    );
  }

  const localTestimonials = TESTIMONIALS.filter(
    (t) => t.location.toLowerCase().includes(area.name.toLowerCase())
  );

  const variant = effectiveLocalContent.layoutVariant || "a";

  return (
    <>
      <SEOHead
        title={`Cash for Junk Cars ${area.name} ${area.state} | Free Towing`}
        description={area.description}
        canonical={`/service-areas/${area.slug}`}
        schemas={schemas}
      />
      <PageHeader
        title={`Cash for Junk Cars in ${area.name}, ${area.state}`}
        subtitle={area.description}
        breadcrumbs={[
          { label: "Service Areas", href: "/service-areas" },
          { label: `${area.name}, ${area.state}` },
        ]}
      />

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2">
              {/* Hero content */}
              <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Junk Car Removal in {area.name}
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {effectiveLocalContent.localContext}
              </p>

              {/* Why Choose Us */}
              {variant === "b" ? (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                    Why {area.name} Residents Choose MG Salvage
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {effectiveLocalContent.whyChooseUs.slice(0, -1).join(". ")}
                    {effectiveLocalContent.whyChooseUs.length > 1 ? ". " : ""}
                    And {effectiveLocalContent.whyChooseUs[effectiveLocalContent.whyChooseUs.length - 1].toLowerCase().
                      replace(/^we /, "")}.
                  </p>
                </div>
              ) : variant !== "c" ? (
                <>
                  <h3 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                    Why {area.name} Residents Choose MG Salvage
                  </h3>
                  <ul className="flex flex-col gap-2.5 mb-8">
                    {effectiveLocalContent.whyChooseUs.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              {/* Service note */}
              <div className="bg-muted/50 rounded-xl p-5 mb-8">
                <p className="text-sm text-foreground leading-relaxed">{effectiveLocalContent.serviceNote}</p>
              </div>

              {/* ZIP codes served */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  ZIP Codes We Serve in {area.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {effectiveLocalContent.zipCodes.map((zip) => (
                    <span key={zip} className="bg-muted border border-border rounded-lg px-3 py-1.5 text-sm font-medium text-foreground">
                      {zip}
                    </span>
                  ))}
                </div>
              </div>

              {/* Neighborhoods */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  {area.name} Neighborhoods & Areas We Serve
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {effectiveLocalContent.neighborhoods.map((n) => (
                    <div key={n} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                      {n}
                    </div>
                  ))}
                </div>
              </div>

              {/* Landmarks */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                  Serving Near {area.name} Landmarks
                </h3>
                <div className="flex flex-wrap gap-2">
                  {effectiveLocalContent.landmarks.map((l) => (
                    <span key={l} className="bg-primary/5 border border-primary/20 rounded-lg px-3 py-1.5 text-xs font-medium text-primary">
                      {l}
                    </span>
                  ))}
                </div>
              </div>

              {/* Why Choose Us — variant c: reordered, prose format, after landmarks */}
              {variant === "c" && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                    Why {area.name} Residents Choose MG Salvage
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {effectiveLocalContent.whyChooseUs.slice(0, -1).join(". ")}
                    {effectiveLocalContent.whyChooseUs.length > 1 ? ". " : ""}
                    And {effectiveLocalContent.whyChooseUs[effectiveLocalContent.whyChooseUs.length - 1].toLowerCase().
                      replace(/^we /, "")}.
                  </p>
                </div>
              )}

              {localTestimonials.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                    What {area.name} Customers Say
                  </h3>
                  {localTestimonials.map((t, i) => (
                    <div key={i} className="bg-muted/50 rounded-xl p-5 mb-3">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="w-3.5 h-3.5 text-primary fill-primary" />
                        ))}
                      </div>
                      <p className="text-sm text-foreground italic mb-2">"{t.quote}"</p>
                      <p className="text-xs text-muted-foreground font-semibold">— {t.name}, {t.location}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
                <p className="text-sm font-semibold text-foreground mb-2">
                  Get a junk car estimate in {area.name}
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  Call us directly for an instant phone estimate.
                </p>
                <a
                  href={`tel:${COMPANY.phoneRaw}`}
                  className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {COMPANY.phone}
                </a>
              </div>
            </div>

            <div className="lg:col-span-3">
              <ConsumerForm source={`city-${area.slug}`} />
            </div>
          </div>
        </div>
      </section>

      {/* Process section specific to this city */}
      <section className="bg-[oklch(0.13_0.01_250)] py-12 md:py-16">
        <div className="container max-w-3xl">
          <h2 className="text-2xl font-bold text-white mb-8 text-center" style={{ fontFamily: "var(--font-heading)" }}>
            How Junk Car Removal Works in {area.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Phone, step: 1, title: "Call or Fill Out the Form", desc: `Tell us about your vehicle — year, make, model, and condition. We'll give you a fair cash offer for your ${area.name} pickup.` },
              { icon: Clock, step: 2, title: "Schedule Your Pickup", desc: `Choose a time that works for you. We offer same-day and next-day pickup throughout ${area.name} and ${area.county}.` },
              { icon: DollarSign, step: 3, title: "We Pick Up Your Vehicle", desc: `Our team arrives at your ${area.name} location with our own tow equipment. Free towing. Always.` },
              { icon: FileText, step: 4, title: "Get Paid Cash on the Spot", desc: `We handle all the paperwork, including the bill of sale and DMV documentation for ${area.county}. You get paid cash immediately.` },
            ].map(({ icon: Icon, step, title, desc }) => (
              <div key={step} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                    {step}
                  </div>
                  <Icon className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-white text-sm" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local FAQ */}
      <section className="bg-muted/50 py-12 md:py-16">
        <div className="container max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center" style={{ fontFamily: "var(--font-heading)" }}>
            FAQ for {area.name} Area
          </h2>
          <div className="space-y-4">
            {localFaqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-lg border border-border p-5">
                <h4 className="font-semibold text-foreground text-sm mb-2">{faq.question}</h4>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/faq" className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:underline">
              View All FAQs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
