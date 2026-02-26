import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <section className="py-24">
      <div className="container mx-auto space-y-6 px-4">
        <Skeleton className="h-14 w-72 rounded-xl" />
        <Skeleton className="h-6 w-[36rem] rounded-xl" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-72 rounded-2xl" />
          <Skeleton className="h-72 rounded-2xl" />
          <Skeleton className="h-72 rounded-2xl" />
        </div>
      </div>
    </section>
  );
}

