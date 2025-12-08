import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Shield, Award } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Users,
      title: "10,000+ Professionals",
      description: "Verified and trained service professionals across all categories"
    },
    {
      icon: Shield,
      title: "100% Safe",
      description: "Background verified professionals with insurance coverage"
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "30-day service warranty on all our services"
    },
    {
      icon: CheckCircle,
      title: "5M+ Bookings",
      description: "Trusted by millions of happy customers nationwide"
    }
  ];

  return (
    <div className="min-h-screen">
      <div className="gradient-hero py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-4">About UrbanServices</h1>
          <p className="text-xl text-muted-foreground">
            India's leading home services platform
          </p>
        </div>
      </div>

      <div className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="prose max-w-none mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Founded in 2020, UrbanServices has revolutionized the way people access home services in India. 
              What started as a simple idea to connect homeowners with trusted professionals has grown into 
              a platform serving millions of customers across major cities.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              We understand the challenges of finding reliable, skilled professionals for your home needs. 
              That's why we've built a comprehensive platform that brings verified service providers right to 
              your doorstep, making home maintenance hassle-free and convenient.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, idx) => (
              <Card key={idx} className="text-center">
                <CardContent className="pt-6">
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-muted rounded-lg p-8">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-4">
              To make quality home services accessible, affordable, and reliable for every household in India. 
              We're committed to:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">
                  Providing verified, trained, and skilled professionals
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">
                  Ensuring transparent pricing with no hidden charges
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">
                  Delivering exceptional customer service and support
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">
                  Creating employment opportunities for skilled workers
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;