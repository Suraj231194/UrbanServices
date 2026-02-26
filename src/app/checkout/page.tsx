import type { Metadata } from "next";
import { BookingForm } from "@/components/booking-form";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Checkout",
  description: "Securely confirm your booking with your preferred date and payment method.",
  path: "/checkout",
  image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1600&q=80",
});

export default function CheckoutPage() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <header className="mb-10 max-w-3xl">
          <h1 className="text-5xl font-semibold tracking-tight">Checkout</h1>
          <p className="mt-4 text-lg text-muted-foreground">Finalize your booking and lock your preferred service slot.</p>
        </header>
        <BookingForm />
      </div>
    </section>
  );
}

