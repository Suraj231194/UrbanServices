import { Skeleton } from "@/components/ui/skeleton";

export default function ServiceLoading() {
  return (
    <section className="py-24">
      <div className="container mx-auto space-y-6 px-4">
        <Skeleton className="h-10 w-56 rounded-xl" />
        <Skeleton className="h-6 w-[36rem] rounded-xl" />
        <div className="grid gap-6 lg:grid-cols-2">
          <Skeleton className="h-96 rounded-3xl" />
          <Skeleton className="h-96 rounded-3xl" />
        </div>
      </div>
    </section>
  );
}

