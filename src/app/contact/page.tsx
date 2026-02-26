import type { Metadata } from "next";
import { ContactClient } from "@/app/contact/contact-client";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Concierge",
  description: "Reach the UrbanNest concierge team for booking, support, and custom service requests.",
  path: "/contact",
  image: "https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=1600&q=80",
});

export default function ContactPage() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <header className="mb-10 max-w-3xl">
          <h1 className="text-5xl font-semibold tracking-tight">Contact</h1>
          <p className="mt-4 text-lg text-muted-foreground">Need help with a booking? Our concierge team is here for you.</p>
        </header>
        <ContactClient />
      </div>
    </section>
  );
}

