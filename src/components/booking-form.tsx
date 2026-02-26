'use client';

import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { z } from "zod";
import {
  CalendarIcon,
  CheckCircle2,
  CreditCard,
  Loader2,
  Lock,
  Sparkles,
  Wallet,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useBooking } from "@/lib/booking-context";
import { cn } from "@/lib/utils";
import { formatINR } from "@/lib/utils";
import { getAllServices, getServiceBySlug } from "@/lib/data";
import { supabase } from "@/integrations/supabase/client";

type Step = "service" | "schedule" | "details" | "review";
type DetailErrors = Partial<Record<"name" | "email" | "phone", string>>;

const stepItems: { key: Step; label: string }[] = [
  { key: "service", label: "Service" },
  { key: "schedule", label: "Date & Time" },
  { key: "details", label: "Details" },
  { key: "review", label: "Review" },
];

const addOnOptions = [
  { key: "materials", label: "Premium Materials", price: 699 },
  { key: "sanitization", label: "Deep Sanitization", price: 499 },
  { key: "weekend", label: "Weekend Priority", price: 399 },
];

const slotOptions = [
  { value: "08:00-10:00", label: "08:00 - 10:00", status: "available", premium: 0 },
  { value: "10:00-12:00", label: "10:00 - 12:00", status: "available", premium: 0 },
  { value: "12:00-14:00", label: "12:00 - 14:00", status: "limited", premium: 149 },
  { value: "14:00-16:00", label: "14:00 - 16:00", status: "available", premium: 99 },
  { value: "16:00-18:00", label: "16:00 - 18:00", status: "limited", premium: 199 },
  { value: "18:00-20:00", label: "18:00 - 20:00", status: "soldOut", premium: 249 },
] as const;

const detailsSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z
    .string()
    .regex(/^(\+91[\s-]?)?[6-9]\d{9}$/, "Enter a valid Indian mobile number"),
});

export function BookingForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { toast } = useToast();
  const { state, updateState, resetState } = useBooking();

  const [step, setStep] = useState<Step>("service");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [detailErrors, setDetailErrors] = useState<DetailErrors>({});
  const [authChecking, setAuthChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const services = useMemo(() => getAllServices(), []);
  const serviceFromQuery = params.get("service");
  const subServiceFromQuery = params.get("option");

  useEffect(() => {
    let active = true;

    const verifySession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!active) return;
      setIsAuthenticated(Boolean(session));
      setAuthChecking(false);
    };

    verifySession();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const service = serviceFromQuery && getServiceBySlug(serviceFromQuery);
    if (!service) return;

    const patch: {
      serviceSlug?: string;
      subServiceSlug?: string;
    } = {};

    if (serviceFromQuery !== state.serviceSlug) {
      patch.serviceSlug = serviceFromQuery;
      patch.subServiceSlug = "";
    }

    if (subServiceFromQuery && service.subservices.some((item) => item.slug === subServiceFromQuery)) {
      patch.subServiceSlug = subServiceFromQuery;
    }

    if (Object.keys(patch).length > 0) {
      updateState(patch);
    }
  }, [serviceFromQuery, subServiceFromQuery, state.serviceSlug, updateState]);

  const selectedService = useMemo(
    () => getServiceBySlug(state.serviceSlug) ?? getServiceBySlug("home-cleaning"),
    [state.serviceSlug],
  );
  const selectedSubService = useMemo(
    () => selectedService?.subservices.find((item) => item.slug === state.subServiceSlug),
    [selectedService, state.subServiceSlug],
  );
  const checkoutServiceName = selectedSubService
    ? `${selectedService?.name} - ${selectedSubService.name}`
    : selectedService?.name ?? "";
  const checkoutServiceTagline = selectedSubService?.description ?? selectedService?.tagline ?? "";

  const selectedDate = state.dateISO ? new Date(state.dateISO) : undefined;
  const selectedSlot = slotOptions.find((slot) => slot.value === state.timeSlot);

  const baseUnitPrice = selectedSubService?.price ?? selectedService?.price ?? 0;
  const basePrice = useMemo(() => baseUnitPrice * Math.max(1, state.quantity), [baseUnitPrice, state.quantity]);
  const urgencyMultiplier = state.urgency === "extended" ? 1.2 : state.urgency === "express" ? 1.35 : 1;
  const urgencyAmount = Math.round(basePrice * (urgencyMultiplier - 1));
  const addOnAmount = addOnOptions
    .filter((option) => state.addOns.includes(option.key))
    .reduce((sum, option) => sum + option.price, 0);
  const slotPremium = selectedSlot?.premium ?? 0;
  const subtotal = basePrice + urgencyAmount + addOnAmount + slotPremium;
  const taxes = Math.round(subtotal * 0.18);
  const total = subtotal + taxes;

  const stepIndex = stepItems.findIndex((item) => item.key === step);
  const progress = ((stepIndex + 1) / stepItems.length) * 100;
  const redirectPath = `/checkout${params.toString() ? `?${params.toString()}` : ""}`;

  if (authChecking) {
    return (
      <Card className="rounded-3xl border-border/60 bg-card/90 shadow-xl">
        <CardContent className="flex items-center justify-center gap-3 px-6 py-16 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Checking your account session...
        </CardContent>
      </Card>
    );
  }

  if (!isAuthenticated) {
    return (
      <Card className="rounded-3xl border-border/60 bg-card/90 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Login Required</CardTitle>
          <CardDescription>You need an account to continue with booking.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Please login or create an account. After login, you will return to checkout automatically.
          </p>
          <Button onClick={() => router.push(`/auth?redirect=${encodeURIComponent(redirectPath)}`)}>
            Login / Sign Up
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!selectedService) {
    return null;
  }

  const goToStep = (value: string) => {
    const nextStep = value as Step;
    const nextIndex = stepItems.findIndex((item) => item.key === nextStep);
    if (nextIndex <= stepIndex) {
      setStep(nextStep);
    }
  };

  const handleValidateDetails = () => {
    const validation = detailsSchema.safeParse({
      name: state.name,
      email: state.email,
      phone: state.phone,
    });

    if (validation.success) {
      setDetailErrors({});
      return true;
    }

    const errors: DetailErrors = {};
    validation.error.issues.forEach((issue) => {
      if (issue.path[0] === "name") errors.name = issue.message;
      if (issue.path[0] === "email") errors.email = issue.message;
      if (issue.path[0] === "phone") errors.phone = issue.message;
    });
    setDetailErrors(errors);
    return false;
  };

  const handleNext = () => {
    if (step === "service" && selectedService.subservices.length > 0 && !state.subServiceSlug) {
      toast({
        title: "Select a service option",
        description: "Choose one specific service to continue.",
        variant: "destructive",
      });
      return;
    }

    if (step === "schedule") {
      if (!state.dateISO || !state.timeSlot) {
        toast({
          title: "Select date and time",
          description: "Choose an available slot to continue.",
          variant: "destructive",
        });
        return;
      }
      if (selectedSlot?.status === "soldOut") {
        toast({
          title: "Selected slot is unavailable",
          description: "Please choose another time slot.",
          variant: "destructive",
        });
        return;
      }
    }

    if (step === "details" && !handleValidateDetails()) {
      toast({
        title: "Please fix the highlighted fields",
        description: "Name, email, and phone are required to continue.",
        variant: "destructive",
      });
      return;
    }

    const next = stepItems[stepIndex + 1];
    if (next) {
      setStep(next.key);
    }
  };

  const handleBack = () => {
    const previous = stepItems[stepIndex - 1];
    if (previous) {
      setStep(previous.key);
    }
  };

  const handleConfirmBooking = () => {
    setReviewOpen(false);
    setIsSubmitting(true);

    toast({
      title: "Booking placed",
      description: "We are locking your slot now.",
    });

    window.setTimeout(() => {
      setIsSubmitting(false);
      setConfirmed(true);
      toast({
        title: "Booking confirmed",
        description: "Your booking request has been placed successfully.",
      });
    }, 1200);
  };

  if (confirmed) {
    return (
      <Card className="rounded-3xl border-border/60 bg-card/90 shadow-xl">
        <CardContent className="flex flex-col items-center px-6 py-12 text-center sm:px-12">
          <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15">
            <CheckCircle2 className="h-8 w-8 text-emerald-500" />
          </span>
          <h2 className="text-3xl font-semibold tracking-tight">Booking Confirmed</h2>
          <p className="mt-3 max-w-md text-muted-foreground">
            Your slot for {checkoutServiceName} is locked. We have sent confirmation details to {state.email}.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Total paid: <span className="font-semibold text-foreground">{formatINR(total)}</span>
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => router.push("/dashboard")}>View Dashboard</Button>
            <Button
              variant="outline"
              onClick={() => {
                resetState();
                router.push("/services");
              }}
            >
              Book Another Service
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-3xl border-border/60 bg-card/90 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Booking Checkout</CardTitle>
            <CardDescription>Complete your booking in four guided steps.</CardDescription>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs value={step} onValueChange={goToStep}>
              <TabsList className="grid w-full grid-cols-4">
                {stepItems.map((item, index) => (
                  <TabsTrigger key={item.key} value={item.key} disabled={index > stepIndex}>
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="service" className="mt-6 space-y-5 animate-in fade-in-50 duration-300">
                <div className="space-y-2">
                  <Label>Select Service</Label>
                  <Select value={state.serviceSlug} onValueChange={(value) => updateState({ serviceSlug: value, subServiceSlug: "" })}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.slug} value={service.slug}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedService.subservices.length > 0 && (
                  <div className="space-y-2">
                    <Label>Select Service Option</Label>
                    <Select value={state.subServiceSlug} onValueChange={(value) => updateState({ subServiceSlug: value })}>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select one option" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedService.subservices.map((item) => (
                          <SelectItem key={item.slug} value={item.slug}>
                            {item.name} ({formatINR(item.price)})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedSubService && (
                      <p className="text-xs text-muted-foreground">
                        {selectedSubService.description}
                      </p>
                    )}
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Service Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min={1}
                      max={8}
                      value={state.quantity}
                      onChange={(e) =>
                        updateState({
                          quantity: Math.min(8, Math.max(1, Number.parseInt(e.target.value || "1", 10))),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Service Mode</Label>
                    <Select
                      value={state.urgency}
                      onValueChange={(value: "standard" | "extended" | "express") => updateState({ urgency: value })}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="extended">Extended Care</SelectItem>
                        <SelectItem value="express">Express Priority</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Add-ons</Label>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {addOnOptions.map((addOn) => {
                      const active = state.addOns.includes(addOn.key);
                      return (
                        <button
                          key={addOn.key}
                          type="button"
                          className={cn(
                            "rounded-xl border p-3 text-left text-sm transition-all",
                            active
                              ? "border-primary bg-primary/10 shadow-sm"
                              : "border-border/70 bg-background hover:border-border",
                          )}
                          onClick={() =>
                            updateState({
                              addOns: active
                                ? state.addOns.filter((item) => item !== addOn.key)
                                : [...state.addOns, addOn.key],
                            })
                          }
                        >
                          <p className="font-medium">{addOn.label}</p>
                          <p className="mt-1 text-xs text-muted-foreground">+{formatINR(addOn.price)}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="schedule" className="mt-6 space-y-5 animate-in fade-in-50 duration-300">
                <div className="space-y-2">
                  <Label>Preferred Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start rounded-xl text-left font-normal", !selectedDate && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => updateState({ dateISO: date ? date.toISOString() : null })}
                        disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Slot Availability</Label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {slotOptions.map((slot) => {
                      const isSelected = state.timeSlot === slot.value;
                      const isSoldOut = slot.status === "soldOut";
                      return (
                        <Button
                          key={slot.value}
                          type="button"
                          variant="outline"
                          disabled={isSoldOut}
                          onClick={() => updateState({ timeSlot: slot.value })}
                          className={cn(
                            "h-auto justify-between rounded-xl px-4 py-3",
                            isSelected && "border-primary bg-primary/10 text-primary",
                            slot.status === "available" && !isSelected && "border-emerald-200 bg-emerald-50 text-emerald-700",
                            slot.status === "limited" && !isSelected && "border-amber-200 bg-amber-50 text-amber-700",
                            isSoldOut && "cursor-not-allowed border-muted bg-muted/40 text-muted-foreground",
                          )}
                        >
                          <span>{slot.label}</span>
                          <span className="text-xs">
                            {slot.status === "soldOut" ? "Sold out" : slot.status === "limited" ? "Limited" : "Available"}
                          </span>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="details" className="mt-6 space-y-5 animate-in fade-in-50 duration-300">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={state.name}
                      onChange={(e) => updateState({ name: e.target.value })}
                      placeholder="Your full name"
                    />
                    {detailErrors.name && <p className="text-xs text-destructive">{detailErrors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={state.phone}
                      onChange={(e) => updateState({ phone: e.target.value })}
                      placeholder="+91 9876543210"
                    />
                    {detailErrors.phone && <p className="text-xs text-destructive">{detailErrors.phone}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={state.email}
                    onChange={(e) => updateState({ email: e.target.value })}
                    placeholder="you@example.com"
                  />
                  {detailErrors.email && <p className="text-xs text-destructive">{detailErrors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <Select
                    value={state.paymentMethod}
                    onValueChange={(value: "card" | "upi" | "netbanking") => updateState({ paymentMethod: value })}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card">Card ending 1288</SelectItem>
                      <SelectItem value="upi">UPI / Wallet</SelectItem>
                      <SelectItem value="netbanking">Net Banking</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any access details or special instructions"
                    value={state.notes}
                    onChange={(e) => updateState({ notes: e.target.value })}
                  />
                </div>
              </TabsContent>

              <TabsContent value="review" className="mt-6 space-y-4 animate-in fade-in-50 duration-300">
                <div className="rounded-xl border border-border/60 bg-muted/20 p-4 text-sm">
                  <p className="font-semibold">{checkoutServiceName}</p>
                  <p className="mt-1 text-muted-foreground">{checkoutServiceTagline}</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span>{selectedDate ? format(selectedDate, "PPP") : "Not selected"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span>{selectedSlot?.label ?? "Not selected"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contact</span>
                    <span>{state.phone || "Not added"}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatINR(total)}</span>
                  </div>
                </div>
                <Button className="w-full rounded-xl" size="lg" onClick={() => setReviewOpen(true)}>
                  Place Booking
                </Button>
              </TabsContent>
            </Tabs>

            {step !== "review" && (
              <div className="flex items-center justify-between">
                <Button type="button" variant="outline" disabled={step === "service"} onClick={handleBack}>
                  Back
                </Button>
                <Button type="button" onClick={handleNext}>
                  Continue
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="h-fit rounded-3xl border-border/60 bg-card/80 shadow-md">
          <CardHeader>
            <CardTitle>Booking Summary</CardTitle>
            <CardDescription>Live price calculator with transparent breakdown.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
              <p className="font-semibold">{checkoutServiceName}</p>
              <p className="mt-1 text-muted-foreground">{checkoutServiceTagline}</p>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Base ({state.quantity}x)</span>
              <span>{formatINR(basePrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Mode Premium</span>
              <span>{formatINR(urgencyAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Add-ons</span>
              <span>{formatINR(addOnAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Slot Premium</span>
              <span>{formatINR(slotPremium)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">GST (18%)</span>
              <span>{formatINR(taxes)}</span>
            </div>
            <div className="border-t border-border/70 pt-4">
              <div className="flex items-center justify-between text-base font-semibold">
                <span>Total</span>
                <span className="transition-all duration-300">{formatINR(total)}</span>
              </div>
            </div>
            <div className="rounded-xl border border-dashed border-border/70 p-4 text-xs text-muted-foreground">
              <p className="flex items-center gap-2 font-medium text-foreground">
                <Lock className="h-3.5 w-3.5" />
                Secure checkout protected by encryption.
              </p>
            </div>
            <div className="rounded-xl border border-primary/25 bg-primary/5 p-4 text-xs">
              <p className="flex items-center gap-2 font-medium text-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Smart pricing updates instantly as you change options.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
        <DialogContent className="rounded-2xl sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Confirm your booking</DialogTitle>
            <DialogDescription>Review details before placing your order.</DialogDescription>
          </DialogHeader>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Service</span>
              <span>{checkoutServiceName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Date</span>
              <span>{selectedDate ? format(selectedDate, "PPP") : "Not selected"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Payment</span>
              <span className="inline-flex items-center gap-1">
                {state.paymentMethod === "card" ? <CreditCard className="h-3.5 w-3.5" /> : <Wallet className="h-3.5 w-3.5" />}
                {state.paymentMethod}
              </span>
            </div>
            <div className="flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>{formatINR(total)}</span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewOpen(false)}>
              Edit
            </Button>
            <Button onClick={handleConfirmBooking} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Confirming...
                </>
              ) : (
                "Confirm Booking"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

