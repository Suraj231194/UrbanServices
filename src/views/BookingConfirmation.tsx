'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, MapPin, CheckCircle2, Loader2, PartyPopper, Timer, Receipt, Home } from "lucide-react";

const BookingConfirmation = () => {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [booking, setBooking] = useState<any>(null);
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const loadBooking = async () => {
      if (!bookingId) {
        router.push("/bookings");
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        toast({
          title: "Login Required",
          description: "Please login to view your booking",
          variant: "destructive",
        });
        router.push("/auth");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("bookings")
          .select("*, services(name, description, duration, price)")
          .eq("id", bookingId)
          .eq("user_id", session.user.id)
          .single();

        if (error) throw error;
        setBooking(data);
        setService(data.services);
      } catch (error) {
        toast({
          title: "Error",
          description: "Unable to load booking details",
          variant: "destructive",
        });
        router.push("/bookings");
      } finally {
        setLoading(false);
      }
    };

    loadBooking();
  }, [bookingId, router, toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!booking) {
    return null;
  }

  const bookingDate = new Date(booking.booking_date);

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-green-50/50 to-background dark:from-green-950/20">
      <div className="container mx-auto max-w-3xl">
        {/* Success Header */}
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
            <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <PartyPopper className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
            <PartyPopper className="w-6 h-6 text-primary" />
          </div>
          <p className="text-muted-foreground">
            Your payment was successful and your service has been booked.
          </p>
          <Badge variant="outline" className="mt-3">
            <Receipt className="w-3 h-3 mr-1" />
            Booking ID: {booking.id.slice(0, 8).toUpperCase()}
          </Badge>
        </header>

        {/* Service Details */}
        <Card className="mb-6 border-green-200 dark:border-green-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Home className="w-5 h-5 text-primary" />
              Service Booked
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{service?.name || "Home Service"}</h3>
                {service?.description && (
                  <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                )}
                <p className="text-sm mt-2 flex items-center gap-1 text-muted-foreground">
                  <Timer className="w-4 h-4" />
                  Duration: {service?.duration || 60} mins
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Amount Paid</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">â‚¹{booking.total_price}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Details */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-medium">
                    {bookingDate.toLocaleDateString("en-IN", { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Time</p>
                  <p className="font-medium">
                    {bookingDate.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <MapPin className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">Service Address</p>
                <p className="font-medium">{booking.address}</p>
              </div>
            </div>

            {booking.notes && (
              <>
                <Separator />
                <div>
                  <p className="text-sm font-medium mb-1">Special Instructions</p>
                  <p className="text-sm text-muted-foreground">{booking.notes}</p>
                </div>
              </>
            )}

            <Separator />

            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex-1" onClick={() => router.push("/bookings")}>
                View All Bookings
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => router.push("/services")}
              >
                Book Another Service
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingConfirmation;







