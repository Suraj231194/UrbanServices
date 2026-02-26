import { Skeleton } from "@/components/ui/skeleton";

export default function CheckoutLoading() {
  return (
    <section className="py-24">
      <div className="container mx-auto space-y-6 px-4">
        <Skeleton className="h-12 w-48 rounded-xl" />
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <Skeleton className="h-[34rem] rounded-3xl" />
          <Skeleton className="h-[28rem] rounded-3xl" />
        </div>
      </div>
    </section>
  );
}
