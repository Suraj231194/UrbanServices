'use client';

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-24">
      <div className="max-w-lg rounded-3xl border border-border/60 bg-card/80 p-10 text-center shadow-lg">
        <h1 className="text-3xl font-semibold tracking-tight">Something went wrong</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          An unexpected issue occurred while loading this page.
        </p>
        <Button className="mt-8" onClick={reset}>
          Try Again
        </Button>
      </div>
    </section>
  );
}

