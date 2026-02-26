export type ServiceCardItem = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  durationMinutes: number;
  rating: number;
  reviewCount: number;
  popularity: number;
  badge: "Popular" | "Best Value";
  available: boolean;
  subservicesCount: number;
  subservices: Array<{
    slug: string;
    name: string;
    price: number;
    duration: string;
    rating: number;
  }>;
};

export type ServicesStats = {
  bookings: string;
  rating: string;
  professionals: string;
};

export type ServicesTestimonial = {
  name: string;
  role: string;
  quote: string;
  avatar: string;
};

export type WhyChooseItem = {
  title: string;
  description: string;
};
