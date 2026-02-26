import { Skeleton } from "@/components/ui/skeleton";

export function ServicesSkeletonGrid({ view, count }: { view: "grid" | "list"; count: number }) {
  if (view === "list") {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="grid gap-0 overflow-hidden rounded-2xl border border-border/60 md:grid-cols-[280px_1fr]">
            <Skeleton className="h-52 md:h-full" />
            <div className="space-y-3 p-6">
              <Skeleton className="h-7 w-1/3" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-20 w-full" />
              <div className="grid grid-cols-3 gap-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="overflow-hidden rounded-2xl border border-border/60">
          <Skeleton className="h-52 w-full" />
          <div className="space-y-3 p-6">
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
