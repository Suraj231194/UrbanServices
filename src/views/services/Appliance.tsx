'use client';

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, ArrowLeft, Check } from "lucide-react";

const services = [
  {
    id: "0ae64996-a0ed-4851-8f46-eb87e680acfa", // Electrical (Fallback)
    name: "AC Service & Repair",
    description: "Complete AC maintenance including filter cleaning and gas check.",
    price: 599,
    duration: "45-60 mins",
    rating: 4.8,
    features: ["Filter cleaning", "Gas pressure check", "Drain pipe cleaning", "Performance test"]
  },
  {
    id: "0ae64996-a0ed-4851-8f46-eb87e680acfa", // Electrical (Fallback)
    name: "Refrigerator Repair",
    description: "Expert repair for all refrigerator brands and models.",
    price: 399,
    duration: "30-60 mins",
    rating: 4.7,
    features: ["Cooling issue fix", "Gas refilling", "Part replacement", "Thermostat check"]
  },
  {
    id: "0ae64996-a0ed-4851-8f46-eb87e680acfa",
    name: "Washing Machine Repair",
    description: "Fixing all types of washing machine issues.",
    price: 499,
    duration: "45-60 mins",
    rating: 4.6,
    features: ["Drum cleaning", "Motor repair", "Water inlet fix", "Spin issue resolution"]
  },
  {
    id: "0ae64996-a0ed-4851-8f46-eb87e680acfa",
    name: "Microwave Repair",
    description: "Safety check and repair for microwaves and ovens.",
    price: 349,
    duration: "30-45 mins",
    rating: 4.8,
    features: ["Heating issue fix", "Panel repair", "Magnetron check", "Door latch fix"]
  },
  {
    id: "05979ff3-df9c-4038-b5b2-2e67917059d6", // Plumbing
    name: "Water Purifier Service",
    description: "Filter change and general service for RO/UV purifiers.",
    price: 449,
    duration: "30-45 mins",
    rating: 4.9,
    features: ["Filter replacement", "TDS check", "Tank cleaning", "Leakage fix"]
  },
  {
    id: "05979ff3-df9c-4038-b5b2-2e67917059d6", // Plumbing
    name: "Geyser Repair",
    description: "Heating element check and tank cleaning for geysers.",
    price: 399,
    duration: "45-60 mins",
    rating: 4.7,
    features: ["Thermostat check", "Heating coil change", "Tank descaling", "Safety valve check"]
  }
];

const Appliance = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen py-12 px-4 bg-muted/10">
      <div className="container mx-auto max-w-6xl">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6 hover:bg-transparent hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Button>

        <div className="mb-12 text-center md:text-left">
          <div className="text-6xl mb-4 animate-bounce">ðŸ”§</div>
          <h1 className="text-4xl font-bold mb-4 text-primary">Appliance Repair</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Fast and reliable repair services for all your home appliances.
            Our certified technicians ensure your devices run smoothly.
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
                    <span className="text-2xl font-bold text-primary">â‚¹{service.price}</span>
                  </div>

                  <Button
                    className="w-full font-semibold shadow-lg shadow-primary/20"
                    size="lg"
                    onClick={() => router.push(`/booking?service=${service.id}&category=appliance&customName=${encodeURIComponent(service.name)}`)}
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

export default Appliance;





