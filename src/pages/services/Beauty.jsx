import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, ArrowLeft, Check } from "lucide-react";

const services = [
  {
    id: 1,
    name: "Salon at Home",
    description: "Premium salon services including haircut, styling, and grooming.",
    price: 999,
    duration: "60-90 mins",
    rating: 4.8,
    features: ["Haircut & Styling", "Beard Grooming", "Head Massage", "Clean-up"]
  },
  {
    id: 2,
    name: "Spa Therapy",
    description: "Relaxing spa treatments to rejuvenate your body and mind.",
    price: 1499,
    duration: "60-90 mins",
    rating: 4.9,
    features: ["Full Body Massage", "Aromatherapy", "Foot Reflexology", "Steam Bath"]
  },
  {
    id: 3,
    name: "Manicure & Pedicure",
    description: "Complete hand and foot care with premium products.",
    price: 799,
    duration: "45-60 mins",
    rating: 4.7,
    features: ["Cuticle Care", "Scrub & Massage", "Nail Paint", "Tan Removal"]
  },
  {
    id: 4,
    name: "Facial & Cleanup",
    description: "Skin rejuvenating facials for a glowing complexion.",
    price: 1299,
    duration: "60-75 mins",
    rating: 4.8,
    features: ["Deep Cleansing", "Exfoliation", "Face Mask", "Moisturizing"]
  },
  {
    id: 5,
    name: "Hair Color & Treatment",
    description: "Professional hair coloring and spa treatments.",
    price: 1999,
    duration: "90-120 mins",
    rating: 4.8,
    features: ["Global Color", "Root Touch-up", "Hair Spa", "Damage Repair"]
  },
  {
    id: 6,
    name: "Waxing & Threading",
    description: "Hygienic and painless hair removal services.",
    price: 499,
    duration: "30-45 mins",
    rating: 4.7,
    features: ["Full Arms & Legs", "Underarms", "Eyebrow Threading", "Post-wax Oil"]
  }
];

const Beauty = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-12 px-4 bg-muted/10">
      <div className="container mx-auto max-w-6xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6 hover:bg-transparent hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Button>

        <div className="mb-12 text-center md:text-left">
          <div className="text-6xl mb-4 animate-bounce">💅</div>
          <h1 className="text-4xl font-bold mb-4 text-primary">Beauty & Wellness</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Indulge in luxury beauty and wellness treatments at home.
            Our expert beauticians bring the salon experience to you.
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
                    onClick={() => navigate(`/booking?service=${service.id}&category=beauty`)}
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

export default Beauty;