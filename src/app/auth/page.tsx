import type { Metadata } from "next";
import AuthView from "@/views/Auth";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Login & Sign Up",
  description: "Sign in or create your UrbanNest account to manage bookings and profile details.",
  path: "/auth",
});

export default function AuthPage() {
  return <AuthView />;
}
