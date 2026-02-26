import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { homeStats } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.22),transparent_40%),radial-gradient(circle_at_80%_0%,hsl(188_94%_43%/0.18),transparent_42%),linear-gradient(180deg,hsl(var(--background)),hsl(var(--background)))]" />
      <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="inline-flex items-center rounded-full border border-border/70 bg-background/80 px-4 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground backdrop-blur">
            Premium Home Booking Platform
          </p>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Book trusted home services with a premium, effortless experience.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            From deep cleaning to electrical safety checks, UrbanNest connects you with verified experts and seamless checkout in minutes.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-8 text-base">
              <Link href="/services">
                Explore Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 text-base">
              <Link href="/contact">Speak to Concierge</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 rounded-3xl border border-border/60 bg-background/70 p-6 shadow-2xl backdrop-blur">
          {homeStats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border/50 bg-card/80 p-5">
              <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

