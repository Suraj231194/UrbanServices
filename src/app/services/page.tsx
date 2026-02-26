import type { Metadata } from "next";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ServicesPageClient } from "@/components/services/services-page-client";
import type { ServiceCardItem } from "@/components/services/types";
import { featureHighlights, getAllServices, siteConfig, testimonials } from "@/lib/data";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Browse Premium Services",
  description: "Discover home services with smart filters, transparent pricing, live comparison, and fast booking.",
  path: "/services",
  image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
});

export const revalidate = 3600;

function parseDurationToMinutes(duration: string) {
  const normalized = duration.toLowerCase().trim();

  if (normalized.includes("per sq")) return 240;

  const rangeMatch = normalized.match(/(\d+)\s*-\s*(\d+)/);
  if (rangeMatch) {
    const a = Number(rangeMatch[1]);
    const b = Number(rangeMatch[2]);
    const avg = (a + b) / 2;
    return normalized.includes("hour") ? avg * 60 : avg;
  }

  const singleMatch = normalized.match(/(\d+)/);
  if (singleMatch) {
    const value = Number(singleMatch[1]);
    return normalized.includes("hour") ? value * 60 : value;
  }

  return 120;
}

export default function ServicesPage() {
  const rawServices = getAllServices();

  const serializableServices: ServiceCardItem[] = rawServices.map((service, idx) => {
    const rating =
      service.subservices.length > 0
        ? service.subservices.reduce((sum, item) => sum + item.rating, 0) / service.subservices.length
        : 4.7;
    const reviewCount = 120 + idx * 43 + service.subservices.length * 65;
    const popularity = Math.round(rating * 20 + reviewCount / 15);
    const available = idx % 5 !== 0;
    const badge: "Popular" | "Best Value" = popularity > 95 ? "Popular" : "Best Value";
    const durationMinutes =
      service.subservices.length > 0
        ? Math.round(
            service.subservices.reduce((sum, item) => sum + parseDurationToMinutes(item.duration), 0) /
              service.subservices.length,
          )
        : parseDurationToMinutes(service.duration);

    return {
      slug: service.slug,
      name: service.name,
      category: service.name,
      tagline: service.tagline,
      description: service.description,
      image: service.image,
      price: service.price,
      duration: service.duration,
      durationMinutes,
      rating: Number(rating.toFixed(1)),
      reviewCount,
      popularity,
      badge,
      available,
      subservicesCount: service.subservices.length,
      subservices: service.subservices.map((item) => ({
        slug: item.slug,
        name: item.name,
        price: item.price,
        duration: item.duration,
        rating: item.rating,
      })),
    };
  });

  const avgRating =
    serializableServices.reduce((sum, item) => sum + item.rating, 0) / Math.max(1, serializableServices.length);
  const totalReviews = serializableServices.reduce((sum, item) => sum + item.reviewCount, 0);
  const totalBookingsK = Math.max(12, Math.round(totalReviews / 1000));

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteConfig.url}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${siteConfig.url}/services`,
      },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "UrbanNest Services",
    itemListElement: serializableServices.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      url: `${siteConfig.url}/services/${item.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      <section className="py-10 sm:py-14">
        <div className="container mx-auto space-y-8 px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Services</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <ServicesPageClient
            services={serializableServices}
            stats={{
              bookings: `${totalBookingsK}k+`,
              rating: `${avgRating.toFixed(2)}/5`,
              professionals: "2,500+",
            }}
            testimonials={testimonials}
            whyChoose={featureHighlights.map((item) => ({ title: item.title, description: item.description }))}
          />
        </div>
      </section>
    </>
  );
}

