'use client';

import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BookNowButton } from "@/components/book-now-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn, formatINR } from "@/lib/utils";
import type { ServiceCardItem } from "@/components/services/types";

type ServicesCatalogCardProps = {
  service: ServiceCardItem;
  view: "grid" | "list";
  isWishlisted: boolean;
  isCompared: boolean;
  onToggleWishlist: (slug: string) => void;
  onToggleCompare: (slug: string) => void;
  onQuickPreview: (service: ServiceCardItem) => void;
};

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Star
          key={idx}
          className={cn(
            "h-3.5 w-3.5",
            idx < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40",
          )}
        />
      ))}
    </div>
  );
}

export function ServicesCatalogCard({
  service,
  view,
  isWishlisted,
  isCompared,
  onToggleWishlist,
  onToggleCompare,
  onQuickPreview,
}: ServicesCatalogCardProps) {
  const firstOption = service.subservices[0];

  if (view === "list") {
    return (
      <Card className="overflow-hidden rounded-2xl border-border/60 bg-card/85 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
        <div className="grid gap-0 md:grid-cols-[280px_1fr]">
          <div className="relative h-52 md:h-full">
            <Image
              src={service.image}
              alt={service.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 280px"
            />
            <div className="absolute left-4 top-4">
              <Badge className="rounded-full bg-background/90 text-foreground">{service.badge}</Badge>
            </div>
          </div>

          <div className="flex flex-col">
            <CardHeader className="space-y-3 pb-2">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">{service.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{service.tagline}</p>
                </div>
                <button
                  type="button"
                  className={cn(
                    "rounded-full border p-2 transition-colors",
                    isWishlisted ? "border-rose-300 bg-rose-50 text-rose-600" : "border-border/70 text-muted-foreground hover:text-foreground",
                  )}
                  onClick={() => onToggleWishlist(service.slug)}
                  aria-label="Toggle wishlist"
                >
                  <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-1">
                  <RatingStars rating={service.rating} />
                  <span className="font-medium">{service.rating.toFixed(1)}</span>
                </span>
                <span className="text-muted-foreground">({service.reviewCount.toLocaleString()} reviews)</span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{service.subservicesCount} options</span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs">{service.duration}</span>
              </div>
            </CardHeader>

            <CardContent className="pb-3 pt-0">
              <p className="text-sm text-muted-foreground">{service.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm">
                  From <span className="text-base font-semibold text-foreground">{formatINR(service.price)}</span>
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Checkbox checked={isCompared} onCheckedChange={() => onToggleCompare(service.slug)} id={`cmp-${service.slug}`} />
                  <label htmlFor={`cmp-${service.slug}`} className="cursor-pointer text-muted-foreground">
                    Compare
                  </label>
                </div>
              </div>
            </CardContent>

            <CardFooter className="mt-auto grid grid-cols-1 gap-2 md:grid-cols-3">
              <Button asChild className="rounded-xl">
                <Link href={`/services/${service.slug}`}>View Service</Link>
              </Button>
              <BookNowButton
                slug={service.slug}
                subServiceSlug={firstOption?.slug}
                label="Book Now"
                size="default"
                variant="outline"
                className="rounded-xl px-4"
              />
              <Button variant="ghost" className="rounded-xl" onClick={() => onQuickPreview(service)}>
                <Eye className="mr-2 h-4 w-4" />
                Quick Preview
              </Button>
            </CardFooter>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden rounded-2xl border-border/60 bg-card/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-52 overflow-hidden">
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent" />
        <div className="absolute left-4 top-4">
          <Badge className="rounded-full bg-background/95 text-foreground">{service.badge}</Badge>
        </div>
        <button
          type="button"
          className={cn(
            "absolute right-4 top-4 rounded-full border bg-background/90 p-2 backdrop-blur transition-colors",
            isWishlisted ? "border-rose-300 text-rose-600" : "border-border/70 text-muted-foreground hover:text-foreground",
          )}
          onClick={() => onToggleWishlist(service.slug)}
          aria-label="Toggle wishlist"
        >
          <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
        </button>
        <div className="absolute bottom-4 left-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
          from {formatINR(service.price)}
        </div>
      </div>

      <CardHeader className="space-y-3 pb-3">
        <h3 className="text-xl font-semibold tracking-tight">{service.name}</h3>
        <p className="text-sm text-muted-foreground">{service.description}</p>
        <div className="flex items-center justify-between text-sm">
          <span className="inline-flex items-center gap-1">
            <RatingStars rating={service.rating} />
            <span className="font-medium">{service.rating.toFixed(1)}</span>
          </span>
          <span className="text-muted-foreground">{service.reviewCount.toLocaleString()} reviews</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 py-0">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Duration</span>
          <span className="font-medium">{service.duration}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Category options</span>
          <span className="font-medium">{service.subservicesCount}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Checkbox checked={isCompared} onCheckedChange={() => onToggleCompare(service.slug)} id={`cmp-grid-${service.slug}`} />
          <label htmlFor={`cmp-grid-${service.slug}`} className="cursor-pointer text-muted-foreground">
            Compare this service
          </label>
        </div>
      </CardContent>

      <CardFooter className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Button asChild className="rounded-xl">
          <Link href={`/services/${service.slug}`}>View Service</Link>
        </Button>
        <BookNowButton
          slug={service.slug}
          subServiceSlug={firstOption?.slug}
          label="Book Now"
          size="default"
          variant="outline"
          className="rounded-xl px-4"
        />
        <Button variant="ghost" className="sm:col-span-2 rounded-xl" onClick={() => onQuickPreview(service)}>
          <Eye className="mr-2 h-4 w-4" />
          Quick Preview
        </Button>
      </CardFooter>
    </Card>
  );
}
