import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, MapPin, CreditCard, CheckCircle2, Loader2, Shield, Lock, Sparkles } from "lucide-react";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [booking, setBooking] = useState(null);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadBooking = async () => {
      if (!bookingId) {
        navigate("/bookings");
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        toast({
          title: "Login Required",
          description: "Please login to view your payment details",
          variant: "destructive",
        });
        navigate("/auth");
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
        navigate("/bookings");
      } finally {
        setLoading(false);
      }
    };

    loadBooking();
  }, [bookingId, navigate, toast]);

  const handleCompletePayment = async () => {
    if (!booking) return;
    setProcessing(true);

    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: "confirmed" })
        .eq("id", booking.id);

      if (error) throw error;

      toast({
        title: "Payment Successful!",
        description: "Your booking has been confirmed.",
      });

      navigate(`/booking-confirmation?bookingId=${booking.id}`);
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "Something went wrong while processing payment.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

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
    <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-4xl">
        <header className="mb-8 text-center">
          <Badge variant="secondary" className="mb-4">
            <Lock className="w-3 h-3 mr-1" />
            Secure Checkout
          </Badge>
          <h1 className="text-4xl font-bold mb-2">Complete Your Payment</h1>
          <p className="text-muted-foreground">
            Review your booking details and confirm payment to finalize your order.
          </p>
        </header>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Order Summary - Left Side */}
          <div className="lg:col-span-3 space-y-6">
            {/* Service Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Service Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{service?.name || "Service"}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{service?.description}</p>
                    <p className="text-sm mt-2 flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      Duration: {service?.duration || 60} mins
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-primary">₹{booking.total_price}</p>
                </div>
              </CardContent>
            </Card>

            {/* Booking Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Booking Details
                </CardTitle>
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
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-xs text-muted-foreground mb-1">Special Instructions</p>
                    <p className="text-sm">{booking.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Payment Section - Right Side */}
          <div className="lg:col-span-2">
            <Card className="sticky top-4 border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Payment
                </CardTitle>
                <CardDescription>Secure payment processing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Service Charge</span>
                    <span>₹{booking.total_price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Platform Fee</span>
                    <span>₹0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>Included</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Amount</span>
                    <span className="text-2xl font-bold text-primary">₹{booking.total_price}</span>
                  </div>
                </div>

                {/* Demo Notice */}
                <div className="rounded-lg border border-dashed p-4 bg-muted/30 text-sm space-y-2">
                  <p className="font-medium flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    Demo Payment Mode
                  </p>
                  <p className="text-muted-foreground text-xs">
                    No real transaction will be processed. Click below to simulate a successful payment.
                  </p>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleCompletePayment}
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="mr-2 h-4 w-4" />
                      Pay ₹{booking.total_price}
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3" />
                  Your payment is secured with encryption
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
