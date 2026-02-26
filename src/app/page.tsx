import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/hero";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ServiceCard } from "@/components/service-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { featureHighlights, getFeaturedServices } from "@/lib/data";
import { createPageMetadata } from "@/lib/seo";

const TestimonialsSection = dynamic(() => import("@/components/testimonials").then((module) => module.Testimonials), {
  loading: () => <div className="h-64 animate-pulse rounded-3xl bg-muted/60" />,
});

export const metadata: Metadata = createPageMetadata({
  title: "Premium Home Booking Platform",
  description:
    "Book premium home services with verified professionals, transparent pricing, and a delightful checkout flow.",
  path: "/",
  image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1600&q=80",
});

export default function HomePage() {
  const featuredServices = getFeaturedServices();

  return (
    <>
      <Hero />

      <section className="py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <header className="mb-14 max-w-3xl">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Why UrbanNest</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Built for trust, speed, and premium outcomes.</h2>
            </header>
          </ScrollReveal>
          <div className="grid gap-6 md:grid-cols-3">
            {featureHighlights.map((feature) => (
              <ScrollReveal key={feature.title}>
                <Card className="rounded-2xl border-border/60 bg-card/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="p-6">
                    <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </span>
                    <h3 className="text-xl font-semibold tracking-tight">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Featured Services</p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Find the right service for your home.</h2>
            </div>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/services">
                View all services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredServices.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <header className="mb-12 text-center">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">Testimonials</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Loved by modern homeowners.</h2>
            </header>
          </ScrollReveal>
          <TestimonialsSection />
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="container mx-auto">
          <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-sky-500/20 via-background to-cyan-500/10 p-10 shadow-2xl sm:p-14">
            <h2 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">Ready to book your next premium home service?</h2>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
              Start in less than 60 seconds with transparent pricing, flexible scheduling, and verified professionals.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/services">Book a Service</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8">
                <Link href="/contact">Talk to Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

