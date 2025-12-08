import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, Calendar, CheckCircle, Star } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Choose a Service",
      description: "Browse through our wide range of home services and select what you need",
      number: "01"
    },
    {
      icon: Calendar,
      title: "Book Online",
      description: "Pick your preferred date and time slot that works best for you",
      number: "02"
    },
    {
      icon: CheckCircle,
      title: "Get it Done",
      description: "Our verified professional will arrive at your doorstep and complete the job",
      number: "03"
    },
    {
      icon: Star,
      title: "Rate & Review",
      description: "Share your experience and help others make informed decisions",
      number: "04"
    }
  ];

  const benefits = [
    "Verified & trained professionals",
    "Transparent pricing with no hidden charges",
    "30-day service warranty",
    "Safe & secure payment options",
    "Real-time booking confirmations",
    "24/7 customer support"
  ];

  return (
    <div className="min-h-screen">
      <div className="gradient-hero py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-4">How UrbanServices Works</h1>
          <p className="text-xl text-muted-foreground">
            Get professional home services in 4 simple steps
          </p>
        </div>
      </div>

      <div className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {steps.map((step, idx) => (
              <Card key={idx} className="relative overflow-hidden">
                <CardContent className="pt-6">
                  <div className="absolute top-4 right-4 text-6xl font-bold text-primary/10">
                    {step.number}
                  </div>
                  <step.icon className="w-12 h-12 mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-muted rounded-lg p-8 mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">Why Choose UrbanServices?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center gradient-primary rounded-lg p-12 text-primary-foreground">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-6 opacity-90">
              Book your first service today and experience the convenience
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/services">Browse Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;