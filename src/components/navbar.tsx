'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65">
      <nav className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-400 text-sm font-bold text-white shadow-lg shadow-sky-500/25">
            UN
          </span>
          <div>
            <p className="text-lg font-semibold tracking-tight">UrbanNest</p>
            <p className="text-xs text-muted-foreground">Premium Booking</p>
          </div>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === link.href ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="outline" className="rounded-full px-6">
            <Link href="/auth">Login / Sign Up</Link>
          </Button>
          <ThemeToggle />
          <Button asChild className="rounded-full px-6">
            <Link href="/checkout?service=home-cleaning">Book Now</Link>
          </Button>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[85vw] border-l border-border/60 bg-background/95 backdrop-blur-xl">
              <SheetHeader>
                <SheetTitle>Explore</SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-3">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-xl border border-transparent px-4 py-3 text-base font-medium transition-all",
                      "hover:border-border/60 hover:bg-muted/60",
                      pathname === link.href && "border-border/60 bg-muted",
                    )}
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button asChild variant="outline" className="mt-4 rounded-xl">
                  <Link href="/auth">Login / Sign Up</Link>
                </Button>
                <Button asChild className="mt-4 rounded-xl">
                  <Link href="/checkout?service=home-cleaning">Book Now</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

