import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, ArrowLeft, Check } from "lucide-react";

const services = [
  {
    id: 1,
    name: "Interior Painting",
    description: "Professional painting for interior walls and ceilings.",
    price: 12,
    duration: "Per Sq. Ft.",
    rating: 4.8,
    features: ["Wall preparation", "Primer application", "Two coats of paint", "Post-paint cleanup"]
  },
  {
    id: 2,
    name: "Exterior Painting",
    description: "Weather-proof painting for building exteriors.",
    price: 15,
    duration: "Per Sq. Ft.",
    rating: 4.7,
    features: ["Crack filling", "Waterproofing", "Weather coat", "Scaffolding setup"]
  },
  {
    id: 3,
    name: "Texture Painting",
    description: "Decorative texture designs for feature walls.",
    price: 45,
    duration: "Per Sq. Ft.",
    rating: 4.9,
    features: ["Design consultation", "Base coat", "Texture application", "Protective finish"]
  },
  {
    id: 4,
    name: "Wood Polishing",
    description: "Polishing and varnishing for doors, windows, and furniture.",
    price: 35,
    duration: "Per Sq. Ft.",
    rating: 4.8,
    features: ["Sanding", "Stain application", "PU/Melamine polish", "Gloss/Matte finish"]
  },
  {
    id: 5,
    name: "Waterproofing",
    description: "Solutions for damp walls and leakage issues.",
    price: 25,
    duration: "Per Sq. Ft.",
    rating: 4.7,
    features: ["Leak detection", "Chemical treatment", "Crack sealing", "Warranty provided"]
  },
  {
    id: 6,
    name: "Rental Painting",
    description: "Quick and affordable painting for rental properties.",
    price: 8,
    duration: "Per Sq. Ft.",
    rating: 4.6,
    features: ["Basic wall prep", "Single/Double coat", "Standard colors", "Quick turnaround"]
  }
];

const Painting = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-12 px-4 bg-muted/10">
      <div className="container mx-auto max-w-6xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 hover:bg-transparent hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Button>

        <div className="mb-12 text-center md:text-left">
          <div className="text-6xl mb-4 animate-bounce">🎨</div>
          <h1 className="text-4xl font-bold mb-4 text-primary">Painting & Waterproofing</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Transform your home with colors.
            Professional painting services with on-time completion and warranty.
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
                    onClick={() => navigate(`/booking?service=${service.id}&category=painting`)}
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

export default Painting;
