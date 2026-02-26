import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/data";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookNowButton } from "@/components/book-now-button";
import { formatINR } from "@/lib/utils";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

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
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-4 left-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
          from {formatINR(service.price)}
        </div>
      </div>
      <CardHeader>
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <CardTitle className="text-xl tracking-tight">{service.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{service.description}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-medium text-foreground/80">Duration: {service.duration}</p>
        <p className="mt-1 text-xs text-muted-foreground">{service.subservices.length} service options available</p>
      </CardContent>
      <CardFooter className="grid w-full grid-cols-2 gap-3">
        <Button asChild className="rounded-xl">
          <Link href={`/services/${service.slug}`}>View Service</Link>
        </Button>
        <BookNowButton
          slug={service.slug}
          label="Book Now"
          variant="outline"
          size="default"
          className="rounded-xl px-4"
        />
      </CardFooter>
    </Card>
  );
}

