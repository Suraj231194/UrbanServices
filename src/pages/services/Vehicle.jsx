import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, ArrowLeft, Check } from "lucide-react";

const services = [
  {
    id: "0ae64996-a0ed-4851-8f46-eb87e680acfa",
    name: "Car Wash & Detailing",
    description: "Complete exterior and interior cleaning for your car.",
    price: 699,
    duration: "60-90 mins",
    rating: 4.8,
    features: ["Foam wash", "Interior vacuuming", "Dashboard polishing", "Tyre dressing"]
  },
  {
    id: "0ae64996-a0ed-4851-8f46-eb87e680acfa",
    name: "Bike Service",
    description: "General service and checkup for two-wheelers.",
    price: 399,
    duration: "45-60 mins",
    rating: 4.7,
    features: ["Oil change", "Brake check", "Chain lubrication", "Wash & polish"]
  },
  {
    id: "0ae64996-a0ed-4851-8f46-eb87e680acfa",
    name: "Car Interior Spa",
    description: "Deep cleaning and sanitization of car interiors.",
    price: 1299,
    duration: "2-3 hours",
    rating: 4.9,
    features: ["Seat shampooing", "Roof cleaning", "Carpet extraction", "Odor removal"]
  },
  {
    id: "0ae64996-a0ed-4851-8f46-eb87e680acfa",
    name: "Car Polish & Wax",
    description: "Restore your car's shine with premium polishing.",
    price: 999,
    duration: "90-120 mins",
    rating: 4.8,
    features: ["Machine polishing", "Wax coating", "Scratch removal", "Paint protection"]
  },
  {
    id: "0ae64996-a0ed-4851-8f46-eb87e680acfa",
    name: "Tyre Puncture Repair",
    description: "On-spot puncture repair for tubeless tyres.",
    price: 199,
    duration: "15-30 mins",
    rating: 4.6,
    features: ["Leak detection", "Patch repair", "Air filling", "Wheel check"]
  },
  {
    id: "0ae64996-a0ed-4851-8f46-eb87e680acfa",
    name: "Battery Jumpstart",
    description: "Emergency battery jumpstart service.",
    price: 299,
    duration: "15-20 mins",
    rating: 4.9,
    features: ["Battery check", "Jumpstart", "Alternator check", "Terminal cleaning"]
  }
];

const Vehicle = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-12 px-4 bg-muted/10">
      <div className="container mx-auto max-w-6xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 hover:bg-transparent hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Button>

        <div className="mb-12 text-center md:text-left">
          <div className="text-6xl mb-4 animate-bounce">🚗</div>
          <h1 className="text-4xl font-bold mb-4 text-primary">Vehicle Care</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Professional care for your vehicles at your doorstep.
            From washing to maintenance, we keep your ride in top condition.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="hover:shadow-xl transition-all duration-300 border-primary/10 flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl font-bold">{service.name}</CardTitle>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    <Star className="w-3 h-3 fill-primary text-primary mr-1" />
                    {service.rating}
                  </Badge>
                </div>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="mb-6 flex-1">
                  <h4 className="text-sm font-semibold mb-3 text-foreground/80">What's Included:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto space-y-4">
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{service.duration}</span>
                    </div>
                    <span className="text-2xl font-bold text-primary">₹{service.price}</span>
                  </div>

                  <Button
                    className="w-full font-semibold shadow-lg shadow-primary/20"
                    size="lg"
                    onClick={() => navigate(`/booking?service=${service.id}&category=vehicle&customName=${encodeURIComponent(service.name)}`)}
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vehicle;