import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, MapPin, Loader2 } from "lucide-react";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        toast({
          title: "Login Required",
          description: "Please login to view your bookings",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      setUser(session.user);
      fetchBookings(session.user.id);
    };

    checkAuth();
  }, [navigate, toast]);

  const fetchBookings = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*, services(name, price, duration)")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load bookings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const hasPendingPayment = bookings.some((b) => b.status === "pending");

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">My Bookings</h1>
          <Button onClick={() => navigate("/services")}>
            Book New Service
          </Button>
        </div>

        {hasPendingPayment && (
          <Card className="mb-6 border-primary/20 bg-primary/5">
            <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-4">
              <div>
                <p className="font-medium">You have pending payments</p>
                <p className="text-sm text-muted-foreground">
                  Complete payment to confirm your upcoming services.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  const latestPending = bookings.find((b) => b.status === "pending");
                  if (latestPending) navigate(`/payment?bookingId=${latestPending.id}`);
                }}
              >
                Complete Payment
              </Button>
            </CardContent>
          </Card>
        )}

        {bookings.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground mb-4">You haven't made any bookings yet</p>
              <Button onClick={() => navigate("/services")}>
                Browse Services
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Booking #{booking.id.slice(0, 8)}</CardTitle>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-medium">
                          {new Date(booking.booking_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Time</p>
                        <p className="font-medium">
                          {new Date(booking.booking_date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Service</p>
                        <p className="font-medium">
                          {booking.services?.name || "Home Service"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium">Service Address</p>
                        <p className="text-sm font-medium">Amount: ₹{booking.total_price}</p>
                      </div>
                      {booking.address && (
                        <p className="text-sm text-muted-foreground">{booking.address}</p>
                      )}
                    </div>
                    {booking.notes && (
                      <div>
                        <p className="text-sm font-medium mb-1">Notes</p>
                        <p className="text-sm text-muted-foreground">{booking.notes}</p>
                      </div>
                    )}
                    {booking.status === "pending" && (
                      <Button
                        className="mt-2 w-full sm:w-auto"
                        variant="outline"
                        onClick={() => navigate(`/payment?bookingId=${booking.id}`)}
                      >
                        Pay Now
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;