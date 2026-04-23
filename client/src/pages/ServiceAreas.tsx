import { Link } from "wouter";
import PageHeader from "@/components/PageHeader";
import { SERVICE_AREAS, COMPANY } from "@/lib/siteData";
import SEOHead, { localBusinessSchema, breadcrumbSchema } from "@/components/SEOHead";
import { useMemo } from "react";
import { MapPin, ArrowRight, Phone } from "lucide-react";

export default function ServiceAreas() {
  const schemas = useMemo(() => [
    localBusinessSchema(),
    breadcrumbSchema([{ name: "Service Areas", url: "/service-areas" }]),
  ], []);

  return (
    <>
      <SEOHead
        title="Service Areas | Junk Car Removal Near You"
        description={`MG Salvage serves a ${COMPANY.serviceRadius} radius from Sanford, NC. Junk car removal in Fayetteville, Pittsboro, Carthage, Lillington, and more.`}
        canonical="/service-areas"
        schemas={schemas}
      />
      <PageHeader
        title="Service Areas"
        subtitle={`MG Salvage serves a ${COMPANY.serviceRadius} radius from our headquarters in Sanford, NC. We provide junk car removal and cash offers throughout central North Carolina.`}
        breadcrumbs={[{ label: "Service Areas" }]}
      />

      <section className="py-12 md:py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Coverage Area
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We cover Sanford and the surrounding communities within a 50-mile radius, including major towns in Lee, Cumberland, Chatham, Moore, and Harnett counties. If you're not sure whether we serve your area, give us a call — we're happy to check.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {SERVICE_AREAS.map((area) => (
              <Link
                key={area.slug}
                href={`/service-areas/${area.slug}`}
                className="bg-white rounded-xl border border-border p-6 hover:shadow-lg hover:border-primary/20 transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                      {area.name}, {area.state}
                    </h3>
                    <p className="text-xs text-muted-foreground">{area.county}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                  {area.description}
                </p>
                <ul className="flex flex-col gap-1.5 mb-4">
                  {area.highlights.map((h) => (
                    <li key={h} className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-primary" />
                      {h}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-1 text-sm text-primary font-semibold">
                  Get an estimate in {area.name}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Don't see your area? We may still be able to help.
            </p>
            <a
              href={`tel:${COMPANY.phoneRaw}`}
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
