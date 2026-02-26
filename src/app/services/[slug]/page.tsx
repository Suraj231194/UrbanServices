import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CheckCircle2, Star } from "lucide-react";
import { unstable_noStore as noStore } from "next/cache";
import { FAQ } from "@/components/faq";
import { BookNowButton } from "@/components/book-now-button";
import { Card, CardContent } from "@/components/ui/card";
import { getServiceBySlug, type Service } from "@/lib/data";
import { createPageMetadata } from "@/lib/seo";
import { formatINR } from "@/lib/utils";

export const dynamic = "force-dynamic";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

async function getServiceSSR(slug: string): Promise<Service | null> {
  noStore();
  return getServiceBySlug(slug);
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return createPageMetadata({
      title: "Service Not Found",
      description: "The requested service could not be found.",
      path: `/services/${slug}`,
    });
  }

  return createPageMetadata({
    title: service.name,
    description: service.description,
    path: `/services/${service.slug}`,
    image: service.image,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceSSR(slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;
  const topSubService = service.subservices[0];

  return (
    <section className="py-20 sm:py-24">
      <div className="container mx-auto space-y-14 px-4">
        <article className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Premium Service</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{service.name}</h1>
            <p className="mt-4 text-xl text-muted-foreground">{service.tagline}</p>
            <p className="mt-7 text-base leading-relaxed text-foreground/90">{service.longDescription}</p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {service.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/70 p-4">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                  <p className="text-sm text-muted-foreground">{feature}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <BookNowButton slug={service.slug} subServiceSlug={topSubService?.slug} label="Book This Service" />
            </div>
          </div>

          <Card className="overflow-hidden rounded-3xl border-border/60 bg-card/80 shadow-lg">
            <div className="relative h-72">
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
                priority
              />
            </div>
            <CardContent className="p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Starting Price</span>
                  <span className="font-semibold">{formatINR(service.price)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Typical Duration</span>
                  <span className="font-semibold">{service.duration}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </article>

        <section className="space-y-6">
          <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Service Options</p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Explore multiple {service.name.toLowerCase()} options
              </h2>
            </div>
          </header>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {service.subservices.map((item) => (
              <Card key={item.slug} className="rounded-2xl border-border/60 bg-card/80 shadow-sm">
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold leading-snug">{item.name}</h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                      {item.rating.toFixed(1)}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground">{item.description}</p>

                  <div className="space-y-2 rounded-xl border border-border/60 bg-muted/20 p-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Price</span>
                      <span className="font-semibold">{formatINR(item.price)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-semibold">{item.duration}</span>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {item.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <BookNowButton slug={service.slug} subServiceSlug={item.slug} className="w-full rounded-xl px-4" size="default" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <FAQ items={service.faqs} title="Service FAQs" />
      </div>
    </section>
  );
}

