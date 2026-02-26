import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-24">
      <div className="max-w-xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-4 text-muted-foreground">
          The page you are trying to reach does not exist or has been moved.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/services">
              <Search className="mr-2 h-4 w-4" />
              Browse Services
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

