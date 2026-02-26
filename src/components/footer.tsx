import Link from "next/link";
import { siteConfig } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-muted/20">
      <div className="container mx-auto grid gap-12 px-4 py-16 md:grid-cols-2 lg:grid-cols-4">
        <section>
          <h3 className="text-lg font-semibold">UrbanNest</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Premium booking for trusted home services. Fast scheduling, transparent pricing, and quality-first delivery.
          </p>
        </section>

        <section>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/about" className="hover:text-foreground">
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-foreground">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground">Resources</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/dashboard" className="hover:text-foreground">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-foreground">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-foreground">
                Help Center
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground">Legal</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="#" className="hover:text-foreground">
                Privacy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Terms
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-foreground">
                Cookies
              </a>
            </li>
          </ul>
        </section>
      </div>

      <div className="border-t border-border/60">
        <div className="container mx-auto flex flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>Made for modern homes.</p>
        </div>
      </div>
    </footer>
  );
}


