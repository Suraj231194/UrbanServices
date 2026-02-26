import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <section className="py-24">
      <div className="container mx-auto space-y-6 px-4">
        <Skeleton className="h-12 w-64 rounded-xl" />
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <Skeleton className="h-80 rounded-2xl" />
          <Skeleton className="h-[28rem] rounded-2xl" />
        </div>
      </div>
    </section>
  );
}
