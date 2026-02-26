'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useCallback } from "react";

export type BookingState = {
  serviceSlug: string;
  subServiceSlug: string;
  dateISO: string | null;
  timeSlot: string;
  paymentMethod: "card" | "upi" | "netbanking";
  name: string;
  email: string;
  phone: string;
  notes: string;
  quantity: number;
  addOns: string[];
  urgency: "standard" | "extended" | "express";
};

const BOOKING_STORAGE_KEY = "urbannest-booking";

export const defaultBookingState: BookingState = {
  serviceSlug: "home-cleaning",
  subServiceSlug: "",
  dateISO: null,
  timeSlot: "",
  paymentMethod: "card",
  name: "",
  email: "",
  phone: "",
  notes: "",
  quantity: 1,
  addOns: [],
  urgency: "standard",
};

type BookingContextValue = {
  state: BookingState;
  updateState: (patch: Partial<BookingState>) => void;
  resetState: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingState>(defaultBookingState);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(BOOKING_STORAGE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw) as Partial<BookingState>;
      setState((prev) => ({ ...prev, ...parsed }));
    } catch {
      window.localStorage.removeItem(BOOKING_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateState = useCallback((patch: Partial<BookingState>) => {
    setState((prev) => ({ ...prev, ...patch }));
  }, []);

  const resetState = useCallback(() => {
    setState(defaultBookingState);
  }, []);

  const value = useMemo(
    () => ({
      state,
      updateState,
      resetState,
    }),
    [state, updateState, resetState],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }

  return context;
}
