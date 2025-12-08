import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Star, ArrowLeft } from "lucide-react";

const services = [
  { id: 1, name: "Cockroach Control", price: 699, duration: 60, rating: 4.7 },
  { id: 2, name: "Termite Treatment", price: 1499, duration: 120, rating: 4.8 },
  { id: 3, name: "Bed Bug Treatment", price: 999, duration: 90, rating: 4.6 },
  { id: 4, name: "Rodent Control", price: 799, duration: 75, rating: 4.7 },
  { id: 5, name: "General Pest Control", price: 899, duration: 80, rating: 4.8 },
  { id: 6, name: "Mosquito Control", price: 599, duration: 50, rating: 4.5 },
];

const PestControl = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Button>

        <div className="mb-12">
          <div className="text-6xl mb-4">🦟</div>
          <h1 className="text-4xl font-bold mb-4">Pest Control Services</h1>
          <p className="text-xl text-muted-foreground">Complete pest elimination with safe treatments</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{service.name}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {service.duration} mins
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {service.rating}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold">₹{service.price}</span>
                  <Badge>Certified</Badge>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => navigate(`/booking?service=${service.id}&category=pest-control`)}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PestControl;
