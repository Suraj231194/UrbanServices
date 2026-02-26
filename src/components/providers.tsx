'use client';

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { BookingProvider } from "@/lib/booking-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <BookingProvider>{children}</BookingProvider>
    </ThemeProvider>
  );
}

