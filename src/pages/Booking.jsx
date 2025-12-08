import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, Clock, MapPin, Loader2, IndianRupee, Timer, Sparkles } from "lucide-react";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [service, setService] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const serviceId = searchParams.get("service");
  const category = searchParams.get("category");

  useEffect(() => {
    const initPage = async () => {
      // Check auth
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Login Required",
          description: "Please login to book a service",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }
      setUser(session.user);

      // Fetch service details
      let query = supabase.from("services").select("*").eq("is_active", true);

      if (serviceId) {
        query = query.eq("id", serviceId);
      }

      const { data: services, error } = await query.limit(1).single();

      if (error || !services) {
        // Try to get any active service
        const { data: fallbackService } = await supabase
          .from("services")
          .select("*")
          .eq("is_active", true)
          .limit(1)
          .single();

        if (fallbackService) {
          setService(fallbackService);
        } else {
          toast({
            title: "No Services Available",
            description: "Please try again later",
            variant: "destructive",
          });
          navigate("/services");
          return;
        }
      } else {
        setService(services);
      }

      setPageLoading(false);
    };

    initPage();
  }, [navigate, toast, serviceId]);

  const handleBooking = async (e) => {
    e.preventDefault();
    console.log("Booking initiated");

    if (!date || !time || !address.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!service) {
      toast({
        title: "Error",
        description: "No service selected",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const bookingDate = new Date(date);
      const [hours, minutes] = time.split(":");
      bookingDate.setHours(parseInt(hours), parseInt(minutes));

      console.log("Inserting booking:", {
        user_id: user.id,
        service_id: service.id,
        booking_date: bookingDate.toISOString(),
        address: address.trim(),
        total_price: service.price
      });

      const { data, error } = await supabase
        .from("bookings")
        .insert({
          user_id: user.id,
          service_id: service.id,
          booking_date: bookingDate.toISOString(),
          address: address.trim(),
          notes: notes.trim() || null,
          total_price: service.price,
          status: "pending",
        })
        .select()
        .single();

      if (error) {
        console.error("Supabase insert error:", error);
        throw error;
      }

      console.log("Booking successful, redirecting to:", `/payment?bookingId=${data.id}`);

      toast({
        title: "Booking Created!",
        description: "Proceed to payment to complete your order.",
      });

      navigate(`/payment?bookingId=${data.id}`);
    } catch (error) {
      console.error("Booking catch error:", error);
      toast({
        title: "Booking Failed",
        description: error.message || "Unable to complete booking",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00",
    "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-5xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Book Your Service</h1>
          <p className="text-muted-foreground">Complete your booking in just a few steps</p>
        </header>

        {/* Service Details Card */}
        {service && (
          <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Selected Service
                  </Badge>
                  <CardTitle className="text-2xl">{service.name}</CardTitle>
                  <CardDescription className="mt-2">{service.description}</CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-primary">₹{service.price}</p>
                  <p className="text-sm text-muted-foreground flex items-center justify-end gap-1">
                    <Timer className="w-4 h-4" />
                    {service.duration} mins
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Date & Time */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                  Select Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date()}
                  className="rounded-md border w-full"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Select Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant={time === slot ? "default" : "outline"}
                      onClick={() => setTime(slot)}
                      className="w-full"
                      size="sm"
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Address & Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Service Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Full Address *</Label>
                  <Textarea
                    id="address"
                    placeholder="Enter your complete address including landmark"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="min-h-[100px] mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Special Instructions (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any specific requirements or notes for the service provider"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Booking Summary */}
            <Card className="border-2 border-primary/30 bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-primary" />
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service</span>
                    <span className="font-medium">{service?.name || "N/A"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium">
                      {date ? date.toLocaleDateString("en-IN", { weekday: 'short', day: 'numeric', month: 'short' }) : "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium">{time || "Not selected"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{service?.duration || 0} mins</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Amount</span>
                    <span className="text-3xl font-bold text-primary">₹{service?.price || 0}</span>
                  </div>
                </div>

                <Button
                  onClick={handleBooking}
                  className="w-full"
                  size="lg"
                  disabled={loading || !date || !time || !address.trim()}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Proceed to Payment"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;