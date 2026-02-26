import type { Metadata } from "next";
import { DashboardClient } from "@/app/dashboard/dashboard-client";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Dashboard",
  description: "Manage your bookings, profile details, and account settings.",
  path: "/dashboard",
  image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1600&q=80",
});

export default function DashboardPage() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h1 className="mb-8 text-5xl font-semibold tracking-tight">Dashboard</h1>
        <DashboardClient />
      </div>
    </section>
  );
}

