'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, ArrowLeft, Check } from "lucide-react";

const services = [
  {
    id: "fd8aaf51-5adc-4f01-906c-3ca63e4e727c",
    name: "Lawn Mowing",
    price: 499,
    duration: 45,
    rating: 4.7,
    description: "Professional lawn mowing service to keep your grass healthy and neat.",
    features: ["Grass cutting", "Edging along pathways", "Clippings removal", "Equipment provided"]
  },
  {
    id: "fd8aaf51-5adc-4f01-906c-3ca63e4e727c",
    name: "Garden Maintenance",
    price: 899,
    duration: 90,
    rating: 4.8,
    description: "Complete care for your garden including weeding and soil health checks.",
    features: ["Weed removal", "Soil aeration", "Fertilizer application", "General cleanup"]
  },
  {
    id: "fd8aaf51-5adc-4f01-906c-3ca63e4e727c",
    name: "Tree Trimming",
    price: 799,
    duration: 75,
    rating: 4.6,
    description: "Expert trimming to maintain tree shape and remove dead branches.",
    features: ["Branch pruning", "Shape maintenance", "Safety assessment", "Debris disposal"]
  },
  {
    id: "fd8aaf51-5adc-4f01-906c-3ca63e4e727c",
    name: "Plant Care & Pruning",
    price: 599,
    duration: 60,
    rating: 4.7,
    description: "Specialized care for your shrubs and flowering plants.",
    features: ["Shrub pruning", "Deadheading flowers", "Pest check", "Watering advice"]
  },
  {
    id: "fd8aaf51-5adc-4f01-906c-3ca63e4e727c",
    name: "Landscape Design",
    price: 2999,
    duration: 180,
    rating: 4.9,
    description: "Consultation and design plan to transform your outdoor space.",
    features: ["Site analysis", "Custom design plan", "Plant selection", "Layout visualization"]
  },
  {
    id: "fd8aaf51-5adc-4f01-906c-3ca63e4e727c",
    name: "Irrigation System Setup",
    price: 1999,
    duration: 120,
    rating: 4.8,
    description: "Installation and setup of efficient watering systems.",
    features: ["System design", "Drip/Sprinkler install", "Timer setup", "Leak testing"]
  },
];

const Landscaping = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen py-12 px-4 bg-muted/10">
      <div className="container mx-auto max-w-6xl">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6 hover:bg-transparent hover:text-primary">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Button>

        <div className="mb-12 text-center md:text-left">
          <div className="text-6xl mb-4 animate-bounce">ðŸŒ³</div>
          <h1 className="text-4xl font-bold mb-4 text-primary">Landscaping Services</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Transform your outdoor space with our expert gardening and landscaping services.
            From routine maintenance to complete makeovers, we do it all.
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
                      <span className="text-sm">{service.duration} mins</span>
                    </div>
                    <span className="text-2xl font-bold text-primary">â‚¹{service.price}</span>
                  </div>

                  <Button
                    className="w-full font-semibold shadow-lg shadow-primary/20"
                    size="lg"
                    onClick={() => router.push(`/booking?service=${service.id}&category=landscaping&customName=${encodeURIComponent(service.name)}`)}
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

export default Landscaping;






