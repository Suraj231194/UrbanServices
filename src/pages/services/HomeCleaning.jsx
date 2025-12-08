import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, ArrowLeft, Check } from "lucide-react";

const services = [
  {
    id: 1,
    name: "Deep Home Cleaning",
    description: "Comprehensive cleaning of entire home including hard-to-reach areas.",
    price: 2499,
    duration: "4-5 hours",
    rating: 4.8,
    features: ["Floor scrubbing", "Cobweb removal", "Window cleaning", "Furniture dusting"]
  },
  {
    id: 2,
    name: "Regular House Cleaning",
    description: "Standard cleaning service for regular maintenance of your home.",
    price: 1299,
    duration: "2-3 hours",
    rating: 4.7,
    features: ["Sweeping & Mopping", "Dusting surfaces", "Kitchen counter wipe", "Bathroom cleaning"]
  },
  {
    id: 3,
    name: "Kitchen Deep Cleaning",
    description: "Thorough kitchen cleaning including appliances, cabinets, and chimney.",
    price: 1499,
    duration: "2-3 hours",
    rating: 4.9,
    features: ["Chimney degreasing", "Cabinet interior", "Appliance exterior", "Sink sanitization"]
  },
  {
    id: 4,
    name: "Bathroom Cleaning",
    description: "Complete bathroom sanitization and deep cleaning service.",
    price: 899,
    duration: "1-2 hours",
    rating: 4.6,
    features: ["Tile scrubbing", "Toilet sanitization", "Mirror cleaning", "Tap polishing"]
  },
  {
    id: 5,
    name: "Sofa & Carpet Cleaning",
    description: "Professional steam cleaning for sofas and carpets.",
    price: 1799,
    duration: "2-3 hours",
    rating: 4.8,
    features: ["Vacuuming", "Stain removal", "Shampooing", "Drying"]
  },
  {
    id: 6,
    name: "Move-in/Move-out Cleaning",
    description: "Complete property cleaning before moving in or after moving out.",
    price: 3499,
    duration: "5-6 hours",
    rating: 4.9,
    features: ["Deep cleaning all rooms", "Cabinet interiors", "Balcony cleaning", "Spot removal"]
  },
  {
    id: 7,
    name: "Window & Glass Cleaning",
    description: "Sparkling clean windows and glass surfaces throughout your home.",
    price: 699,
    duration: "1-2 hours",
    rating: 4.7,
    features: ["Glass pane cleaning", "Track cleaning", "Grill dusting", "Streak-free finish"]
  },
  {
    id: 8,
    name: "Post-Renovation Cleaning",
    description: "Thorough cleaning after construction or renovation work.",
    price: 4999,
    duration: "6-8 hours",
    rating: 4.8,
    features: ["Paint spot removal", "Dust extraction", "Floor polishing", "Debris removal"]
  }
];

const HomeCleaning = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-12 px-4 bg-muted/10">
      <div className="container mx-auto max-w-6xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 hover:bg-transparent hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Button>

        <div className="mb-12 text-center md:text-left">
          <div className="text-6xl mb-4 animate-bounce">🧹</div>
          <h1 className="text-4xl font-bold mb-4 text-primary">Home Cleaning Services</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Experience a spotless home with our professional cleaning services.
            We use eco-friendly products and expert techniques.
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
                    onClick={() => navigate(`/booking?service=${service.id}&category=home-cleaning`)}
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

export default HomeCleaning;