'use client';

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Grid3X3,
  Heart,
  List,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import type { ServicesStats, ServicesTestimonial, ServiceCardItem, WhyChooseItem } from "@/components/services/types";
import { ServicesCatalogCard } from "@/components/services/services-catalog-card";
import { ServicesSkeletonGrid } from "@/components/services/services-skeleton-grid";
import { ServicesPagination } from "@/components/services/services-pagination";
import { BookNowButton } from "@/components/book-now-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn, formatINR } from "@/lib/utils";

type ServicesPageClientProps = {
  services: ServiceCardItem[];
  stats: ServicesStats;
  testimonials: ServicesTestimonial[];
  whyChoose: WhyChooseItem[];
};

type SortValue = "price-asc" | "price-desc" | "popular" | "rated";
type DurationValue = "all" | "short" | "medium" | "long";

function useDebouncedValue<T>(value: T, delay = 400) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedValue(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

function passesDurationFilter(durationMinutes: number, filter: DurationValue) {
  if (filter === "all") return true;
  if (filter === "short") return durationMinutes <= 60;
  if (filter === "medium") return durationMinutes > 60 && durationMinutes <= 180;
  return durationMinutes > 180;
}

export function ServicesPageClient({ services, stats, testimonials, whyChoose }: ServicesPageClientProps) {
  const minAvailablePrice = Math.min(...services.map((item) => item.price));
  const maxAvailablePrice = Math.max(...services.map((item) => item.price));

  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebouncedValue(searchInput);

  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([minAvailablePrice, maxAvailablePrice]);
  const [minRating, setMinRating] = useState("0");
  const [durationFilter, setDurationFilter] = useState<DurationValue>("all");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [sortBy, setSortBy] = useState<SortValue>("popular");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [previewService, setPreviewService] = useState<ServiceCardItem | null>(null);
  const [compareOpen, setCompareOpen] = useState(false);
  const [carouselApi, setCarouselApi] = useState<any>(null);

  const categories = useMemo(() => ["All", ...services.map((item) => item.category)], [services]);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 260);
    setIsLoading(true);
    return () => window.clearTimeout(timer);
  }, [debouncedSearch, category, priceRange, minRating, durationFilter, onlyAvailable, sortBy, view, page]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, category, priceRange, minRating, durationFilter, onlyAvailable, sortBy, view]);

  useEffect(() => {
    if (!carouselApi) return;
    const interval = window.setInterval(() => {
      if (carouselApi.canScrollNext()) {
        carouselApi.scrollNext();
      } else {
        carouselApi.scrollTo(0);
      }
    }, 4200);
    return () => window.clearInterval(interval);
  }, [carouselApi]);

  const filteredSorted = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();

    const filtered = services.filter((item) => {
      const text = `${item.name} ${item.tagline} ${item.description} ${item.subservices.map((entry) => entry.name).join(" ")}`.toLowerCase();
      const matchesSearch = !query || text.includes(query);
      const matchesCategory = category === "All" || item.category === category;
      const matchesPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
      const matchesRating = item.rating >= Number(minRating);
      const matchesDuration = passesDurationFilter(item.durationMinutes, durationFilter);
      const matchesAvailability = !onlyAvailable || item.available;

      return matchesSearch && matchesCategory && matchesPrice && matchesRating && matchesDuration && matchesAvailability;
    });

    return filtered.sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rated") return b.rating - a.rating || b.reviewCount - a.reviewCount;
      return b.popularity - a.popularity;
    });
  }, [services, debouncedSearch, category, priceRange, minRating, durationFilter, onlyAvailable, sortBy]);

  const pageSize = view === "grid" ? 6 : 5;
  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / pageSize));
  const activePage = Math.min(page, totalPages);
  const paginatedServices = filteredSorted.slice((activePage - 1) * pageSize, activePage * pageSize);

  const compareServices = services.filter((item) => compareList.includes(item.slug));

  const toggleWishlist = (slug: string) => {
    setWishlist((prev) => (prev.includes(slug) ? prev.filter((entry) => entry !== slug) : [...prev, slug]));
  };

  const toggleCompare = (slug: string) => {
    setCompareList((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((entry) => entry !== slug);
      }
      if (prev.length >= 4) {
        return prev;
      }
      return [...prev, slug];
    });
  };

  const clearFilters = () => {
    setSearchInput("");
    setCategory("All");
    setPriceRange([minAvailablePrice, maxAvailablePrice]);
    setMinRating("0");
    setDurationFilter("all");
    setOnlyAvailable(false);
    setSortBy("popular");
  };

  return (
    <div className="space-y-16 pb-24">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-sky-500/15 via-background to-cyan-500/10 px-5 py-10 shadow-xl sm:px-8 sm:py-14">
        <div className="absolute -right-24 top-0 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-60 w-60 rounded-full bg-sky-500/10 blur-3xl" />

        <div className="relative space-y-8">
          <div className="max-w-4xl space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Premium Service Discovery</p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              Find the right home service in minutes.
            </h1>
            <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
              Explore verified categories, compare pricing, and book with confidence using powerful filters and real-time service discovery.
            </p>
          </div>

          <div className="max-w-2xl">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Search by service, category, or option"
                className="h-12 rounded-full border-border/70 bg-background/90 pl-10 shadow-sm"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <Button
                key={item}
                variant={category === item ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setCategory(item)}
              >
                {item}
              </Button>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <Card className="rounded-2xl border-border/60 bg-background/80">
              <CardContent className="flex items-center gap-3 p-4">
                <TrendingUp className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Total Bookings</p>
                  <p className="text-lg font-semibold">{stats.bookings}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-border/60 bg-background/80">
              <CardContent className="flex items-center gap-3 p-4">
                <Star className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Average Rating</p>
                  <p className="text-lg font-semibold">{stats.rating}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border-border/60 bg-background/80">
              <CardContent className="flex items-center gap-3 p-4">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Verified Professionals</p>
                  <p className="text-lg font-semibold">{stats.professionals}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <Card className="rounded-2xl border-border/60 bg-card/80 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <SlidersHorizontal className="h-4 w-4" />
                Filter Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <p className="text-sm font-medium">Price Range</p>
                <Slider
                  min={minAvailablePrice}
                  max={maxAvailablePrice}
                  step={50}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange([value[0], value[1]])}
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{formatINR(priceRange[0])}</span>
                  <span>{formatINR(priceRange[1])}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Minimum Rating</p>
                <Select value={minRating} onValueChange={setMinRating}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">All ratings</SelectItem>
                    <SelectItem value="4">4.0 and above</SelectItem>
                    <SelectItem value="4.5">4.5 and above</SelectItem>
                    <SelectItem value="4.8">4.8 and above</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Duration</p>
                <Select value={durationFilter} onValueChange={(value: DurationValue) => setDurationFilter(value)}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All durations</SelectItem>
                    <SelectItem value="short">Short (up to 60 mins)</SelectItem>
                    <SelectItem value="medium">Medium (60-180 mins)</SelectItem>
                    <SelectItem value="long">Long (180+ mins)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 px-3 py-2">
                <p className="text-sm font-medium">Available now</p>
                <Switch checked={onlyAvailable} onCheckedChange={setOnlyAvailable} />
              </div>

              <Button variant="outline" className="w-full rounded-xl" onClick={clearFilters}>
                <X className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        </aside>

        <div className="space-y-6">
          <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/70 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filteredSorted.length}</span> services
              </p>
              <p className="text-xs text-muted-foreground">
                Compare up to 4 services for side-by-side evaluation.
              </p>
            </div>

            <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
              <Select value={sortBy} onValueChange={(value: SortValue) => setSortBy(value)}>
                <SelectTrigger className="w-full rounded-xl sm:w-[210px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price-asc">Price low to high</SelectItem>
                  <SelectItem value="price-desc">Price high to low</SelectItem>
                  <SelectItem value="popular">Most popular</SelectItem>
                  <SelectItem value="rated">Top rated</SelectItem>
                </SelectContent>
              </Select>

              <div className="inline-flex rounded-xl border border-border/60 bg-background p-1">
                <Button
                  variant={view === "grid" ? "default" : "ghost"}
                  size="sm"
                  className="rounded-lg"
                  onClick={() => setView("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={view === "list" ? "default" : "ghost"}
                  size="sm"
                  className="rounded-lg"
                  onClick={() => setView("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <Dialog open={compareOpen} onOpenChange={setCompareOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full rounded-xl sm:w-auto" disabled={compareList.length < 2}>
                    Compare ({compareList.length})
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-5xl">
                  <DialogHeader>
                    <DialogTitle>Service Comparison</DialogTitle>
                    <DialogDescription>Compare selected services side by side.</DialogDescription>
                  </DialogHeader>
                  <div className="overflow-x-auto">
                    <Table className="min-w-[700px]">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Service</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Options</TableHead>
                          <TableHead>Availability</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {compareServices.map((item) => (
                          <TableRow key={item.slug}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell>{formatINR(item.price)}</TableCell>
                            <TableCell>{item.rating.toFixed(1)}</TableCell>
                            <TableCell>{item.duration}</TableCell>
                            <TableCell>{item.subservicesCount}</TableCell>
                            <TableCell>
                              <Badge variant={item.available ? "default" : "secondary"}>
                                {item.available ? "Available" : "Limited"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {isLoading ? (
            <ServicesSkeletonGrid view={view} count={pageSize} />
          ) : paginatedServices.length > 0 ? (
            <div className={cn(view === "grid" ? "grid gap-6 md:grid-cols-2 xl:grid-cols-3" : "space-y-4")}>
              {paginatedServices.map((service) => (
                <ServicesCatalogCard
                  key={service.slug}
                  service={service}
                  view={view}
                  isWishlisted={wishlist.includes(service.slug)}
                  isCompared={compareList.includes(service.slug)}
                  onToggleWishlist={toggleWishlist}
                  onToggleCompare={toggleCompare}
                  onQuickPreview={setPreviewService}
                />
              ))}
            </div>
          ) : (
            <Card className="rounded-2xl border-border/60 bg-card/70">
              <CardContent className="flex flex-col items-center justify-center py-14 text-center">
                <p className="text-xl font-semibold">No services found</p>
                <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or filters.</p>
                <Button variant="outline" className="mt-5 rounded-xl" onClick={clearFilters}>
                  Reset Filters
                </Button>
              </CardContent>
            </Card>
          )}

          <ServicesPagination page={activePage} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </section>

      <section className="space-y-6">
        <header className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Why Choose Us</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Built for reliability, trust, and speed.</h2>
        </header>
        <div className="grid gap-4 md:grid-cols-3">
          {whyChoose.map((item, idx) => {
            const Icon = idx === 0 ? ShieldCheck : idx === 1 ? BadgeCheck : Sparkles;
            return (
              <Card key={item.title} className="rounded-2xl border-border/60 bg-card/80 shadow-sm">
                <CardContent className="space-y-3 p-6">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </span>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <header className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Customer Stories</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">What customers say after booking.</h2>
        </header>
        <div className="relative px-0 sm:px-10">
          <Carousel setApi={setCarouselApi} opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {testimonials.map((item) => (
                <CarouselItem key={item.name} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="h-full rounded-2xl border-border/60 bg-card/80 shadow-sm">
                    <CardContent className="flex h-full flex-col p-6">
                      <div className="mb-4 flex gap-1 text-amber-400">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star key={idx} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <p className="flex-1 text-sm leading-relaxed text-muted-foreground">&quot;{item.quote}&quot;</p>
                      <div className="mt-5 flex items-center gap-3">
                        <div className="relative h-11 w-11 overflow-hidden rounded-full">
                          <Image src={item.avatar} alt={item.name} fill className="object-cover" sizes="44px" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-2 hidden sm:inline-flex" />
            <CarouselNext className="-right-2 hidden sm:inline-flex" />
          </Carousel>
        </div>
      </section>

      <Dialog open={Boolean(previewService)} onOpenChange={(open) => !open && setPreviewService(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-3xl">
          {previewService && (
            <>
              <DialogHeader>
                <DialogTitle>{previewService.name}</DialogTitle>
                <DialogDescription>{previewService.tagline}</DialogDescription>
              </DialogHeader>
              <div className="space-y-5">
                <div className="relative h-64 overflow-hidden rounded-2xl">
                  <Image src={previewService.image} alt={previewService.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 720px" />
                </div>
                <p className="text-sm text-muted-foreground">{previewService.description}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {previewService.subservices.slice(0, 4).map((item) => (
                    <div key={item.slug} className="rounded-xl border border-border/60 bg-muted/20 p-3 text-sm">
                      <p className="font-medium">{item.name}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatINR(item.price)} - {item.duration}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  <Button asChild className="rounded-xl">
                    <Link href={`/services/${previewService.slug}`}>View Full Service</Link>
                  </Button>
                  <BookNowButton
                    slug={previewService.slug}
                    subServiceSlug={previewService.subservices[0]?.slug}
                    label="Book Now"
                    size="default"
                    variant="outline"
                    className="rounded-xl px-4"
                  />
                  <Button
                    variant="ghost"
                    className="rounded-xl"
                    onClick={() => {
                      toggleWishlist(previewService.slug);
                      setPreviewService(null);
                    }}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    {wishlist.includes(previewService.slug) ? "Saved" : "Save"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}


