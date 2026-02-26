'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";

const serviceCategories = [
  {
    id: "home-cleaning",
    name: "Home Cleaning",
    icon: "ðŸ ",
    description: "Professional home cleaning services",
    services: ["Deep Cleaning", "Regular Cleaning", "Kitchen Cleaning", "Bathroom Cleaning", "Move-in/out Cleaning"]
  },
  {
    id: "appliance",
    name: "Appliance Services",
    icon: "ðŸ”§",
    description: "Repair & maintenance for home appliances",
    services: ["AC Repair", "Refrigerator Repair", "Washing Machine", "TV Repair", "Microwave Repair"]
  },
  {
    id: "vehicle",
    name: "Vehicle Care",
    icon: "ðŸš—",
    description: "Complete car and bike care services",
    services: ["Car Washing", "Car Deep Cleaning", "Bike Washing", "Interior Detailing", "Exterior Polish"]
  },
  {
    id: "beauty",
    name: "Beauty & Wellness",
    icon: "ðŸ’†",
    description: "Salon and spa services at home",
    services: ["Haircut & Styling", "Facial", "Massage", "Manicure & Pedicure", "Waxing"]
  },
  {
    id: "plumbing",
    name: "Plumbing",
    icon: "ðŸš°",
    description: "Expert plumbing solutions",
    services: ["Tap Repair", "Pipe Leak Fixing", "Bathroom Fitting", "Drain Cleaning", "Water Tank Cleaning"]
  },
  {
    id: "electrical",
    name: "Electrical",
    icon: "âš¡",
    description: "Licensed electrical services",
    services: ["Wiring", "Switch & Socket Repair", "Fan Installation", "Light Fitting", "MCB Repair"]
  },
  {
    id: "painting",
    name: "Painting",
    icon: "ðŸŽ¨",
    description: "Interior & exterior painting",
    services: ["Wall Painting", "Texture Painting", "Waterproofing", "Wood Polish", "Metal Painting"]
  },
  {
    id: "carpentry",
    name: "Carpentry",
    icon: "ðŸªš",
    description: "Custom woodwork & repairs",
    services: ["Furniture Assembly", "Door Repair", "Cabinet Making", "Shelving", "Wood Polishing"]
  },
  {
    id: "pest-control",
    name: "Pest Control",
    icon: "ðŸ¦Ÿ",
    description: "Complete pest elimination",
    services: ["Cockroach Control", "Termite Treatment", "Bed Bug Treatment", "Rodent Control", "General Pest Control"]
  },
  {
    id: "landscaping",
    name: "Landscaping",
    icon: "ðŸŒ³",
    description: "Garden and outdoor care",
    services: ["Lawn Mowing", "Garden Maintenance", "Tree Trimming", "Plant Care", "Landscape Design"]
  }
];

const Services = () => {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-muted-foreground">Choose from our wide range of professional services</p>
          
          <div className="max-w-xl mx-auto mt-8">
            <div className="flex gap-2 bg-card p-2 rounded-lg shadow-md border">
              <Input 
                placeholder="Search for services..." 
                className="border-0 focus-visible:ring-0"
              />
              <Search className="w-5 h-5 text-muted-foreground self-center mr-2" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCategories.map((category) => (
            <Link key={category.id} href={`/services/${category.id}`}>
              <Card className="hover:shadow-xl transition-all cursor-pointer group h-full">
                <CardContent className="p-6">
                  <div className="text-6xl mb-4">{category.icon}</div>
                  <h3 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  
                  <div className="space-y-2">
                    {category.services.slice(0, 3).map((service, idx) => (
                      <div key={idx} className="text-sm text-muted-foreground flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2 text-primary" />
                        {service}
                      </div>
                    ))}
                    {category.services.length > 3 && (
                      <div className="text-sm text-primary font-medium">
                        +{category.services.length - 3} more services
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;






