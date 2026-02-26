'use client';

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const [active, setActive] = useState(0);
  const selected = useMemo(() => testimonials[active], [active]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
      <Card className="rounded-3xl border-border/60 bg-card/80 shadow-xl">
        <CardContent className="p-8 sm:p-10">
          <div className="mb-6 flex gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Star key={idx} className="h-5 w-5 fill-current" />
            ))}
          </div>
          <p className="text-2xl font-medium leading-relaxed tracking-tight sm:text-3xl">&quot;{selected.quote}&quot;</p>
          <div className="mt-8 flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-full">
              <Image src={selected.avatar} alt={selected.name} fill className="object-cover" sizes="56px" />
            </div>
            <div>
              <p className="font-semibold">{selected.name}</p>
              <p className="text-sm text-muted-foreground">{selected.role}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {testimonials.map((item, idx) => (
          <button
            key={item.name}
            type="button"
            onClick={() => setActive(idx)}
            className={`w-full rounded-2xl border p-4 text-left transition-all ${
              idx === active
                ? "border-primary/40 bg-primary/5 shadow-md"
                : "border-border/60 bg-card/70 hover:border-border hover:bg-card"
            }`}
          >
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.role}</p>
          </button>
        ))}
      </div>
    </section>
  );
}


