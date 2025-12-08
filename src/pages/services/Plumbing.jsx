import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, ArrowLeft, Check } from "lucide-react";

const services = [
  {
    id: 1,
    name: "Leakage Repair",
    description: "Fixing leaks in taps, pipes, and sanitary ware.",
    price: 299,
    duration: "30-45 mins",
    rating: 4.8,
    features: ["Tap repair", "Pipe joint sealing", "Valve replacement", "Leak detection"]
  },
  {
    id: 2,
    name: "Drain Cleaning",
    description: "Unclogging drains and pipes for smooth flow.",
    price: 399,
    duration: "30-60 mins",
    rating: 4.7,
    features: ["Sink unclogging", "Drain pipe cleaning", "Chemical treatment", "Blockage removal"]
  },
  {
    id: 3,
    name: "Bathroom Fitting Installation",
    description: "Installation of taps, showers, and other bathroom fixtures.",
    price: 499,
    duration: "45-60 mins",
    rating: 4.8,
    features: ["Tap installation", "Shower setup", "Towel rod fixing", "Mirror mounting"]
  },
  {
    id: 4,
    name: "Toilet Repair",
    description: "Repairing flush tanks, seat covers, and leakage.",
    price: 599,
    duration: "45-60 mins",
    rating: 4.6,
    features: ["Flush repair", "Seat replacement", "Leakage fix", "Cistern check"]
  },
  {
    id: 5,
    name: "Water Tank Cleaning",
    description: "Deep cleaning and sanitization of overhead water tanks.",
    price: 999,
    duration: "60-90 mins",
    rating: 4.9,
    features: ["Sludge removal", "High-pressure cleaning", "Anti-bacterial treatment", "Tank inspection"]
  },
  {
    id: 6,
    name: "Full Home Plumbing Check",
    description: "Comprehensive inspection of all plumbing systems.",
    price: 799,
    duration: "60-90 mins",
    rating: 4.8,
    features: ["Leak check", "Pressure test", "Fixture inspection", "Pipe health check"]
  }
];

const Plumbing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-12 px-4 bg-muted/10">
      <div className="container mx-auto max-w-6xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 hover:bg-transparent hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Button>

        <div className="mb-12 text-center md:text-left">
          <div className="text-6xl mb-4 animate-bounce">🚰</div>
          <h1 className="text-4xl font-bold mb-4 text-primary">Plumbing Services</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Expert plumbing solutions for all your needs.
            From minor leaks to major installations, we handle it all.
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
                    onClick={() => navigate(`/booking?service=${service.id}&category=plumbing`)}
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

export default Plumbing;
