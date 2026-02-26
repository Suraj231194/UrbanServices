import type { LucideIcon } from "lucide-react";
import {
  Sparkles,
  ShieldCheck,
  Wrench,
  Leaf,
  Paintbrush,
  Zap,
  Clock3,
  Scissors,
  Bug,
  Car,
  Hammer,
  Settings,
} from "lucide-react";

export const siteConfig = {
  name: "UrbanNest",
  url: "https://urbannest.example.com",
  title: "UrbanNest | Premium Home Booking",
  description:
    "Book trusted home services in minutes with transparent pricing, verified professionals, and smooth checkout.",
  social: {
    twitter: "@urbannest",
  },
};

export type ServiceFAQ = {
  question: string;
  answer: string;
};

export type SubService = {
  slug: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  rating: number;
  features: string[];
};

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  price: number;
  duration: string;
  image: string;
  icon: LucideIcon;
  features: string[];
  faqs: ServiceFAQ[];
  subservices: SubService[];
};

export const services: Service[] = [
  {
    "slug": "home-cleaning",
    "name": "Home Cleaning",
    "tagline": "Deep and regular cleaning packages for every room",
    "description": "Professional home cleaning plans for apartments, villas, and move-in setups.",
    "longDescription": "Our home cleaning team handles complete room-wise cleaning with premium products and a quality checklist. Choose regular upkeep or intensive deep cleaning based on your need.",
    "price": 699,
    "duration": "4-5 hours+",
    "image": "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1400&q=80",
    "icon": Sparkles,
    "features": [
      "Floor scrubbing",
      "Cobweb removal",
      "Window cleaning",
      "Furniture dusting"
    ],
    "faqs": [
      {
        "question": "Can I reschedule after booking?",
        "answer": "Yes. You can reschedule up to 6 hours before your selected slot."
      },
      {
        "question": "Do professionals carry tools and materials?",
        "answer": "Yes. All core tools are included; paid materials are confirmed with you first."
      }
    ],
    "subservices": [
      {
        "slug": "deep-home-cleaning",
        "name": "Deep Home Cleaning",
        "description": "Comprehensive cleaning of entire home including hard-to-reach areas.",
        "price": 2499,
        "duration": "4-5 hours",
        "rating": 4.8,
        "features": [
          "Floor scrubbing",
          "Cobweb removal",
          "Window cleaning",
          "Furniture dusting"
        ]
      },
      {
        "slug": "regular-house-cleaning",
        "name": "Regular House Cleaning",
        "description": "Standard cleaning service for regular maintenance of your home.",
        "price": 1299,
        "duration": "2-3 hours",
        "rating": 4.7,
        "features": [
          "Sweeping & Mopping",
          "Dusting surfaces",
          "Kitchen counter wipe",
          "Bathroom cleaning"
        ]
      },
      {
        "slug": "kitchen-deep-cleaning",
        "name": "Kitchen Deep Cleaning",
        "description": "Thorough kitchen cleaning including appliances, cabinets, and chimney.",
        "price": 1499,
        "duration": "2-3 hours",
        "rating": 4.9,
        "features": [
          "Chimney degreasing",
          "Cabinet interior",
          "Appliance exterior",
          "Sink sanitization"
        ]
      },
      {
        "slug": "bathroom-cleaning",
        "name": "Bathroom Cleaning",
        "description": "Complete bathroom sanitization and deep cleaning service.",
        "price": 899,
        "duration": "1-2 hours",
        "rating": 4.6,
        "features": [
          "Tile scrubbing",
          "Toilet sanitization",
          "Mirror cleaning",
          "Tap polishing"
        ]
      },
      {
        "slug": "sofa-and-carpet-cleaning",
        "name": "Sofa & Carpet Cleaning",
        "description": "Professional steam cleaning for sofas and carpets.",
        "price": 1799,
        "duration": "2-3 hours",
        "rating": 4.8,
        "features": [
          "Vacuuming",
          "Stain removal",
          "Shampooing",
          "Drying"
        ]
      },
      {
        "slug": "move-in-move-out-cleaning",
        "name": "Move-in/Move-out Cleaning",
        "description": "Complete property cleaning before moving in or after moving out.",
        "price": 3499,
        "duration": "5-6 hours",
        "rating": 4.9,
        "features": [
          "Deep cleaning all rooms",
          "Cabinet interiors",
          "Balcony cleaning",
          "Spot removal"
        ]
      },
      {
        "slug": "window-and-glass-cleaning",
        "name": "Window & Glass Cleaning",
        "description": "Sparkling clean windows and glass surfaces throughout your home.",
        "price": 699,
        "duration": "1-2 hours",
        "rating": 4.7,
        "features": [
          "Glass pane cleaning",
          "Track cleaning",
          "Grill dusting",
          "Streak-free finish"
        ]
      },
      {
        "slug": "post-renovation-cleaning",
        "name": "Post-Renovation Cleaning",
        "description": "Thorough cleaning after construction or renovation work.",
        "price": 4999,
        "duration": "6-8 hours",
        "rating": 4.8,
        "features": [
          "Paint spot removal",
          "Dust extraction",
          "Floor polishing",
          "Debris removal"
        ]
      }
    ]
  },
  {
    "slug": "plumbing",
    "name": "Plumbing",
    "tagline": "Leak repairs, fittings, and complete plumbing checks",
    "description": "Certified plumbers for residential repairs and installations.",
    "longDescription": "From urgent leak fixes to preventive checks, our plumbing professionals ensure quick resolution with transparent pricing and safety-first workmanship.",
    "price": 299,
    "duration": "30-45 mins+",
    "image": "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=80",
    "icon": Wrench,
    "features": [
      "Tap repair",
      "Pipe joint sealing",
      "Valve replacement",
      "Leak detection"
    ],
    "faqs": [
      {
        "question": "Can I reschedule after booking?",
        "answer": "Yes. You can reschedule up to 6 hours before your selected slot."
      },
      {
        "question": "Do professionals carry tools and materials?",
        "answer": "Yes. All core tools are included; paid materials are confirmed with you first."
      }
    ],
    "subservices": [
      {
        "slug": "leakage-repair",
        "name": "Leakage Repair",
        "description": "Fixing leaks in taps, pipes, and sanitary ware.",
        "price": 299,
        "duration": "30-45 mins",
        "rating": 4.8,
        "features": [
          "Tap repair",
          "Pipe joint sealing",
          "Valve replacement",
          "Leak detection"
        ]
      },
      {
        "slug": "drain-cleaning",
        "name": "Drain Cleaning",
        "description": "Unclogging drains and pipes for smooth flow.",
        "price": 399,
        "duration": "30-60 mins",
        "rating": 4.7,
        "features": [
          "Sink unclogging",
          "Drain pipe cleaning",
          "Chemical treatment",
          "Blockage removal"
        ]
      },
      {
        "slug": "bathroom-fitting-installation",
        "name": "Bathroom Fitting Installation",
        "description": "Installation of taps, showers, and other bathroom fixtures.",
        "price": 499,
        "duration": "45-60 mins",
        "rating": 4.8,
        "features": [
          "Tap installation",
          "Shower setup",
          "Towel rod fixing",
          "Mirror mounting"
        ]
      },
      {
        "slug": "toilet-repair",
        "name": "Toilet Repair",
        "description": "Repairing flush tanks, seat covers, and leakage.",
        "price": 599,
        "duration": "45-60 mins",
        "rating": 4.6,
        "features": [
          "Flush repair",
          "Seat replacement",
          "Leakage fix",
          "Cistern check"
        ]
      },
      {
        "slug": "water-tank-cleaning",
        "name": "Water Tank Cleaning",
        "description": "Deep cleaning and sanitization of overhead water tanks.",
        "price": 999,
        "duration": "60-90 mins",
        "rating": 4.9,
        "features": [
          "Sludge removal",
          "High-pressure cleaning",
          "Anti-bacterial treatment",
          "Tank inspection"
        ]
      },
      {
        "slug": "full-home-plumbing-check",
        "name": "Full Home Plumbing Check",
        "description": "Comprehensive inspection of all plumbing systems.",
        "price": 799,
        "duration": "60-90 mins",
        "rating": 4.8,
        "features": [
          "Leak check",
          "Pressure test",
          "Fixture inspection",
          "Pipe health check"
        ]
      }
    ]
  },
  {
    "slug": "electrical",
    "name": "Electrical",
    "tagline": "Safe electrical repairs and installations by experts",
    "description": "Licensed electricians for switches, lights, MCB, and wiring checks.",
    "longDescription": "Our electrical services prioritize safety and compliance. From minor repairs to complete diagnostics, every visit includes proper testing before handover.",
    "price": 199,
    "duration": "30 mins+",
    "image": "https://images.unsplash.com/photo-1621905252472-b40f3f6a84e4?auto=format&fit=crop&w=1400&q=80",
    "icon": Zap,
    "features": [
      "Switch replacement",
      "Socket testing",
      "Wiring check",
      "Safety inspection"
    ],
    "faqs": [
      {
        "question": "Can I reschedule after booking?",
        "answer": "Yes. You can reschedule up to 6 hours before your selected slot."
      },
      {
        "question": "Do professionals carry tools and materials?",
        "answer": "Yes. All core tools are included; paid materials are confirmed with you first."
      }
    ],
    "subservices": [
      {
        "slug": "switch-and-socket-repair",
        "name": "Switch & Socket Repair",
        "description": "Repair or replacement of faulty switches and sockets.",
        "price": 199,
        "duration": "30 mins",
        "rating": 4.8,
        "features": [
          "Switch replacement",
          "Socket testing",
          "Wiring check",
          "Safety inspection"
        ]
      },
      {
        "slug": "fan-installation-and-repair",
        "name": "Fan Installation & Repair",
        "description": "Installation and repair of ceiling and exhaust fans.",
        "price": 299,
        "duration": "30-45 mins",
        "rating": 4.7,
        "features": [
          "Fan mounting",
          "Regulator change",
          "Capacitor replacement",
          "Noise reduction"
        ]
      },
      {
        "slug": "light-installation",
        "name": "Light Installation",
        "description": "Installation of tube lights, fancy lights, and chandeliers.",
        "price": 249,
        "duration": "30-45 mins",
        "rating": 4.8,
        "features": [
          "Drilling & mounting",
          "Wiring connection",
          "Bulb replacement",
          "Fixture check"
        ]
      },
      {
        "slug": "mcb-and-fuse-repair",
        "name": "MCB & Fuse Repair",
        "description": "Fixing tripping MCBs and blown fuses.",
        "price": 399,
        "duration": "30-60 mins",
        "rating": 4.9,
        "features": [
          "Load check",
          "MCB replacement",
          "Fuse wire change",
          "Circuit testing"
        ]
      },
      {
        "slug": "inverter-installation",
        "name": "Inverter Installation",
        "description": "Setup and connection of home inverter systems.",
        "price": 599,
        "duration": "60-90 mins",
        "rating": 4.8,
        "features": [
          "Battery connection",
          "Wiring setup",
          "Load testing",
          "Safety check"
        ]
      },
      {
        "slug": "full-home-wiring-check",
        "name": "Full Home Wiring Check",
        "description": "Comprehensive inspection of electrical wiring.",
        "price": 999,
        "duration": "90-120 mins",
        "rating": 4.9,
        "features": [
          "Insulation check",
          "Earthing test",
          "Load distribution",
          "Safety audit"
        ]
      }
    ]
  },
  {
    "slug": "painting-waterproofing",
    "name": "Painting & Waterproofing",
    "tagline": "Interior, exterior, and protective coating solutions",
    "description": "Professional painting with durable finish and neat delivery.",
    "longDescription": "Upgrade your space with color consultations, premium paints, and waterproofing treatments. Ideal for home refresh, rentals, and renovation projects.",
    "price": 8,
    "duration": "Per Sq. Ft.",
    "image": "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1400&q=80",
    "icon": Paintbrush,
    "features": [
      "Wall preparation",
      "Primer application",
      "Two coats of paint",
      "Post-paint cleanup"
    ],
    "faqs": [
      {
        "question": "Can I reschedule after booking?",
        "answer": "Yes. You can reschedule up to 6 hours before your selected slot."
      },
      {
        "question": "Do professionals carry tools and materials?",
        "answer": "Yes. All core tools are included; paid materials are confirmed with you first."
      }
    ],
    "subservices": [
      {
        "slug": "interior-painting",
        "name": "Interior Painting",
        "description": "Professional painting for interior walls and ceilings.",
        "price": 12,
        "duration": "Per Sq. Ft.",
        "rating": 4.8,
        "features": [
          "Wall preparation",
          "Primer application",
          "Two coats of paint",
          "Post-paint cleanup"
        ]
      },
      {
        "slug": "exterior-painting",
        "name": "Exterior Painting",
        "description": "Weather-proof painting for building exteriors.",
        "price": 15,
        "duration": "Per Sq. Ft.",
        "rating": 4.7,
        "features": [
          "Crack filling",
          "Waterproofing",
          "Weather coat",
          "Scaffolding setup"
        ]
      },
      {
        "slug": "texture-painting",
        "name": "Texture Painting",
        "description": "Decorative texture designs for feature walls.",
        "price": 45,
        "duration": "Per Sq. Ft.",
        "rating": 4.9,
        "features": [
          "Design consultation",
          "Base coat",
          "Texture application",
          "Protective finish"
        ]
      },
      {
        "slug": "wood-polishing",
        "name": "Wood Polishing",
        "description": "Polishing and varnishing for doors, windows, and furniture.",
        "price": 35,
        "duration": "Per Sq. Ft.",
        "rating": 4.8,
        "features": [
          "Sanding",
          "Stain application",
          "PU/Melamine polish",
          "Gloss/Matte finish"
        ]
      },
      {
        "slug": "waterproofing",
        "name": "Waterproofing",
        "description": "Solutions for damp walls and leakage issues.",
        "price": 25,
        "duration": "Per Sq. Ft.",
        "rating": 4.7,
        "features": [
          "Leak detection",
          "Chemical treatment",
          "Crack sealing",
          "Warranty provided"
        ]
      },
      {
        "slug": "rental-painting",
        "name": "Rental Painting",
        "description": "Quick and affordable painting for rental properties.",
        "price": 8,
        "duration": "Per Sq. Ft.",
        "rating": 4.6,
        "features": [
          "Basic wall prep",
          "Single/Double coat",
          "Standard colors",
          "Quick turnaround"
        ]
      }
    ]
  },
  {
    "slug": "landscaping-gardening",
    "name": "Landscaping & Gardening",
    "tagline": "Lawn, plants, and outdoor space maintenance",
    "description": "Seasonal and routine garden care for homes and terraces.",
    "longDescription": "Keep your outdoor space healthy and beautiful with pruning, lawn care, and plant health support. Great for balconies, villas, and residential gardens.",
    "price": 499,
    "duration": "45 mins+",
    "image": "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80",
    "icon": Leaf,
    "features": [
      "Grass cutting",
      "Edging along pathways",
      "Clippings removal",
      "Equipment provided"
    ],
    "faqs": [
      {
        "question": "Can I reschedule after booking?",
        "answer": "Yes. You can reschedule up to 6 hours before your selected slot."
      },
      {
        "question": "Do professionals carry tools and materials?",
        "answer": "Yes. All core tools are included; paid materials are confirmed with you first."
      }
    ],
    "subservices": [
      {
        "slug": "lawn-mowing",
        "name": "Lawn Mowing",
        "description": "Professional lawn mowing service to keep your grass healthy and neat.",
        "price": 499,
        "duration": "45 mins",
        "rating": 4.7,
        "features": [
          "Grass cutting",
          "Edging along pathways",
          "Clippings removal",
          "Equipment provided"
        ]
      },
      {
        "slug": "garden-maintenance",
        "name": "Garden Maintenance",
        "description": "Complete care for your garden including weeding and soil health checks.",
        "price": 899,
        "duration": "90 mins",
        "rating": 4.8,
        "features": [
          "Weed removal",
          "Soil aeration",
          "Fertilizer application",
          "General cleanup"
        ]
      },
      {
        "slug": "tree-trimming",
        "name": "Tree Trimming",
        "description": "Expert trimming to maintain tree shape and remove dead branches.",
        "price": 799,
        "duration": "75 mins",
        "rating": 4.6,
        "features": [
          "Branch pruning",
          "Shape maintenance",
          "Safety assessment",
          "Debris disposal"
        ]
      },
      {
        "slug": "plant-care-and-pruning",
        "name": "Plant Care & Pruning",
        "description": "Specialized care for your shrubs and flowering plants.",
        "price": 599,
        "duration": "60 mins",
        "rating": 4.7,
        "features": [
          "Shrub pruning",
          "Deadheading flowers",
          "Pest check",
          "Watering advice"
        ]
      },
      {
        "slug": "landscape-design",
        "name": "Landscape Design",
        "description": "Consultation and design plan to transform your outdoor space.",
        "price": 2999,
        "duration": "180 mins",
        "rating": 4.9,
        "features": [
          "Site analysis",
          "Custom design plan",
          "Plant selection",
          "Layout visualization"
        ]
      },
      {
        "slug": "irrigation-system-setup",
        "name": "Irrigation System Setup",
        "description": "Installation and setup of efficient watering systems.",
        "price": 1999,
        "duration": "120 mins",
        "rating": 4.8,
        "features": [
          "System design",
          "Drip/Sprinkler install",
          "Timer setup",
          "Leak testing"
        ]
      }
    ]
  },
  {
    "slug": "carpentry",
    "name": "Carpentry",
    "tagline": "Furniture assembly, woodwork, and repairs",
    "description": "Skilled carpentry services for home furniture and fixtures.",
    "longDescription": "From quick repairs to custom woodwork, our carpenters deliver precise finishing and stable fittings for modern homes and offices.",
    "price": 499,
    "duration": "60 mins+",
    "image": "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1400&q=80",
    "icon": Hammer,
    "features": [
      "Verified professional support",
      "Transparent pricing and estimates",
      "Quality checklist after service",
      "Priority customer support"
    ],
    "faqs": [
      {
        "question": "Can I reschedule after booking?",
        "answer": "Yes. You can reschedule up to 6 hours before your selected slot."
      },
      {
        "question": "Do professionals carry tools and materials?",
        "answer": "Yes. All core tools are included; paid materials are confirmed with you first."
      }
    ],
    "subservices": [
      {
        "slug": "furniture-assembly",
        "name": "Furniture Assembly",
        "description": "Furniture Assembly service by verified professionals.",
        "price": 499,
        "duration": "60 mins",
        "rating": 4.7,
        "features": [
          "Verified professional support",
          "Transparent pricing and estimates",
          "Quality checklist after service",
          "Priority customer support"
        ]
      },
      {
        "slug": "door-repair-and-installation",
        "name": "Door Repair & Installation",
        "description": "Door Repair & Installation service by verified professionals.",
        "price": 699,
        "duration": "75 mins",
        "rating": 4.8,
        "features": [
          "Verified professional support",
          "Transparent pricing and estimates",
          "Quality checklist after service",
          "Priority customer support"
        ]
      },
      {
        "slug": "cabinet-making",
        "name": "Cabinet Making",
        "description": "Cabinet Making service by verified professionals.",
        "price": 1999,
        "duration": "180 mins",
        "rating": 4.6,
        "features": [
          "Verified professional support",
          "Transparent pricing and estimates",
          "Quality checklist after service",
          "Priority customer support"
        ]
      },
      {
        "slug": "shelving-installation",
        "name": "Shelving Installation",
        "description": "Shelving Installation service by verified professionals.",
        "price": 599,
        "duration": "50 mins",
        "rating": 4.7,
        "features": [
          "Verified professional support",
          "Transparent pricing and estimates",
          "Quality checklist after service",
          "Priority customer support"
        ]
      },
      {
        "slug": "wood-polishing",
        "name": "Wood Polishing",
        "description": "Wood Polishing service by verified professionals.",
        "price": 799,
        "duration": "90 mins",
        "rating": 4.5,
        "features": [
          "Verified professional support",
          "Transparent pricing and estimates",
          "Quality checklist after service",
          "Priority customer support"
        ]
      },
      {
        "slug": "custom-woodwork",
        "name": "Custom Woodwork",
        "description": "Custom Woodwork service by verified professionals.",
        "price": 2499,
        "duration": "240 mins",
        "rating": 4.8,
        "features": [
          "Verified professional support",
          "Transparent pricing and estimates",
          "Quality checklist after service",
          "Priority customer support"
        ]
      }
    ]
  },
  {
    "slug": "pest-control",
    "name": "Pest Control",
    "tagline": "Safe and effective pest elimination treatments",
    "description": "Home-safe pest control plans by certified technicians.",
    "longDescription": "We provide targeted pest treatments for cockroaches, termites, bed bugs, and rodents using approved methods and follow-up guidance.",
    "price": 599,
    "duration": "60 mins+",
    "image": "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1400&q=80",
    "icon": Bug,
    "features": [
      "Verified professional support",
      "Transparent pricing and estimates",
      "Quality checklist after service",
      "Priority customer support"
    ],
    "faqs": [
      {
        "question": "Can I reschedule after booking?",
        "answer": "Yes. You can reschedule up to 6 hours before your selected slot."
      },
      {
        "question": "Do professionals carry tools and materials?",
        "answer": "Yes. All core tools are included; paid materials are confirmed with you first."
      }
    ],
    "subservices": [
      {
        "slug": "cockroach-control",
        "name": "Cockroach Control",
        "description": "Cockroach Control service by verified professionals.",
        "price": 699,
        "duration": "60 mins",
        "rating": 4.7,
        "features": [
          "Verified professional support",
          "Transparent pricing and estimates",
          "Quality checklist after service",
          "Priority customer support"
        ]
      },
      {
        "slug": "termite-treatment",
        "name": "Termite Treatment",
        "description": "Termite Treatment service by verified professionals.",
        "price": 1499,
        "duration": "120 mins",
        "rating": 4.8,
        "features": [
          "Verified professional support",
          "Transparent pricing and estimates",
          "Quality checklist after service",
          "Priority customer support"
        ]
      },
      {
        "slug": "bed-bug-treatment",
        "name": "Bed Bug Treatment",
        "description": "Bed Bug Treatment service by verified professionals.",
        "price": 999,
        "duration": "90 mins",
        "rating": 4.6,
        "features": [
          "Verified professional support",
          "Transparent pricing and estimates",
          "Quality checklist after service",
          "Priority customer support"
        ]
      },
      {
        "slug": "rodent-control",
        "name": "Rodent Control",
        "description": "Rodent Control service by verified professionals.",
        "price": 799,
        "duration": "75 mins",
        "rating": 4.7,
        "features": [
          "Verified professional support",
          "Transparent pricing and estimates",
          "Quality checklist after service",
          "Priority customer support"
        ]
      },
      {
        "slug": "general-pest-control",
        "name": "General Pest Control",
        "description": "General Pest Control service by verified professionals.",
        "price": 899,
        "duration": "80 mins",
        "rating": 4.8,
        "features": [
          "Verified professional support",
          "Transparent pricing and estimates",
          "Quality checklist after service",
          "Priority customer support"
        ]
      },
      {
        "slug": "mosquito-control",
        "name": "Mosquito Control",
        "description": "Mosquito Control service by verified professionals.",
        "price": 599,
        "duration": "50 mins",
        "rating": 4.5,
        "features": [
          "Verified professional support",
          "Transparent pricing and estimates",
          "Quality checklist after service",
          "Priority customer support"
        ]
      }
    ]
  },
  {
    "slug": "appliance-repair",
    "name": "Appliance Repair",
    "tagline": "Repair and maintenance for essential home appliances",
    "description": "Technician visits for AC, refrigerator, washing machine, and more.",
    "longDescription": "Get fast diagnostics and repairs for major home appliances with transparent parts/labor communication and post-service performance checks.",
    "price": 349,
    "duration": "45-60 mins+",
    "image": "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1400&q=80",
    "icon": Settings,
    "features": [
      "Filter cleaning",
      "Gas pressure check",
      "Drain pipe cleaning",
      "Performance test"
    ],
    "faqs": [
      {
        "question": "Can I reschedule after booking?",
        "answer": "Yes. You can reschedule up to 6 hours before your selected slot."
      },
      {
        "question": "Do professionals carry tools and materials?",
        "answer": "Yes. All core tools are included; paid materials are confirmed with you first."
      }
    ],
    "subservices": [
      {
        "slug": "ac-service-and-repair",
        "name": "AC Service & Repair",
        "description": "Complete AC maintenance including filter cleaning and gas check.",
        "price": 599,
        "duration": "45-60 mins",
        "rating": 4.8,
        "features": [
          "Filter cleaning",
          "Gas pressure check",
          "Drain pipe cleaning",
          "Performance test"
        ]
      },
      {
        "slug": "refrigerator-repair",
        "name": "Refrigerator Repair",
        "description": "Expert repair for all refrigerator brands and models.",
        "price": 399,
        "duration": "30-60 mins",
        "rating": 4.7,
        "features": [
          "Cooling issue fix",
          "Gas refilling",
          "Part replacement",
          "Thermostat check"
        ]
      },
      {
        "slug": "washing-machine-repair",
        "name": "Washing Machine Repair",
        "description": "Fixing all types of washing machine issues.",
        "price": 499,
        "duration": "45-60 mins",
        "rating": 4.6,
        "features": [
          "Drum cleaning",
          "Motor repair",
          "Water inlet fix",
          "Spin issue resolution"
        ]
      },
      {
        "slug": "microwave-repair",
        "name": "Microwave Repair",
        "description": "Safety check and repair for microwaves and ovens.",
        "price": 349,
        "duration": "30-45 mins",
        "rating": 4.8,
        "features": [
          "Heating issue fix",
          "Panel repair",
          "Magnetron check",
          "Door latch fix"
        ]
      },
      {
        "slug": "water-purifier-service",
        "name": "Water Purifier Service",
        "description": "Filter change and general service for RO/UV purifiers.",
        "price": 449,
        "duration": "30-45 mins",
        "rating": 4.9,
        "features": [
          "Filter replacement",
          "TDS check",
          "Tank cleaning",
          "Leakage fix"
        ]
      },
      {
        "slug": "geyser-repair",
        "name": "Geyser Repair",
        "description": "Heating element check and tank cleaning for geysers.",
        "price": 399,
        "duration": "45-60 mins",
        "rating": 4.7,
        "features": [
          "Thermostat check",
          "Heating coil change",
          "Tank descaling",
          "Safety valve check"
        ]
      }
    ]
  },
  {
    "slug": "beauty-wellness",
    "name": "Beauty & Wellness",
    "tagline": "Salon and wellness experiences at home",
    "description": "At-home premium beauty treatments by trained professionals.",
    "longDescription": "Book grooming, spa, and skincare services at your convenience with hygienic kits and certified beauty professionals.",
    "price": 499,
    "duration": "60-90 mins+",
    "image": "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1400&q=80",
    "icon": Scissors,
    "features": [
      "Haircut & Styling",
      "Beard Grooming",
      "Head Massage",
      "Clean-up"
    ],
    "faqs": [
      {
        "question": "Can I reschedule after booking?",
        "answer": "Yes. You can reschedule up to 6 hours before your selected slot."
      },
      {
        "question": "Do professionals carry tools and materials?",
        "answer": "Yes. All core tools are included; paid materials are confirmed with you first."
      }
    ],
    "subservices": [
      {
        "slug": "salon-at-home",
        "name": "Salon at Home",
        "description": "Premium salon services including haircut, styling, and grooming.",
        "price": 999,
        "duration": "60-90 mins",
        "rating": 4.8,
        "features": [
          "Haircut & Styling",
          "Beard Grooming",
          "Head Massage",
          "Clean-up"
        ]
      },
      {
        "slug": "spa-therapy",
        "name": "Spa Therapy",
        "description": "Relaxing spa treatments to rejuvenate your body and mind.",
        "price": 1499,
        "duration": "60-90 mins",
        "rating": 4.9,
        "features": [
          "Full Body Massage",
          "Aromatherapy",
          "Foot Reflexology",
          "Steam Bath"
        ]
      },
      {
        "slug": "manicure-and-pedicure",
        "name": "Manicure & Pedicure",
        "description": "Complete hand and foot care with premium products.",
        "price": 799,
        "duration": "45-60 mins",
        "rating": 4.7,
        "features": [
          "Cuticle Care",
          "Scrub & Massage",
          "Nail Paint",
          "Tan Removal"
        ]
      },
      {
        "slug": "facial-and-cleanup",
        "name": "Facial & Cleanup",
        "description": "Skin rejuvenating facials for a glowing complexion.",
        "price": 1299,
        "duration": "60-75 mins",
        "rating": 4.8,
        "features": [
          "Deep Cleansing",
          "Exfoliation",
          "Face Mask",
          "Moisturizing"
        ]
      },
      {
        "slug": "hair-color-and-treatment",
        "name": "Hair Color & Treatment",
        "description": "Professional hair coloring and spa treatments.",
        "price": 1999,
        "duration": "90-120 mins",
        "rating": 4.8,
        "features": [
          "Global Color",
          "Root Touch-up",
          "Hair Spa",
          "Damage Repair"
        ]
      },
      {
        "slug": "waxing-and-threading",
        "name": "Waxing & Threading",
        "description": "Hygienic and painless hair removal services.",
        "price": 499,
        "duration": "30-45 mins",
        "rating": 4.7,
        "features": [
          "Full Arms & Legs",
          "Underarms",
          "Eyebrow Threading",
          "Post-wax Oil"
        ]
      }
    ]
  },
  {
    "slug": "vehicle-care",
    "name": "Vehicle Care",
    "tagline": "Doorstep detailing and quick vehicle support",
    "description": "Car and bike care services at your home location.",
    "longDescription": "Maintain your vehicle with professional doorstep support, including wash, detailing, polishing, and emergency assistance.",
    "price": 199,
    "duration": "60-90 mins+",
    "image": "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1400&q=80",
    "icon": Car,
    "features": [
      "Foam wash",
      "Interior vacuuming",
      "Dashboard polishing",
      "Tyre dressing"
    ],
    "faqs": [
      {
        "question": "Can I reschedule after booking?",
        "answer": "Yes. You can reschedule up to 6 hours before your selected slot."
      },
      {
        "question": "Do professionals carry tools and materials?",
        "answer": "Yes. All core tools are included; paid materials are confirmed with you first."
      }
    ],
    "subservices": [
      {
        "slug": "car-wash-and-detailing",
        "name": "Car Wash & Detailing",
        "description": "Complete exterior and interior cleaning for your car.",
        "price": 699,
        "duration": "60-90 mins",
        "rating": 4.8,
        "features": [
          "Foam wash",
          "Interior vacuuming",
          "Dashboard polishing",
          "Tyre dressing"
        ]
      },
      {
        "slug": "bike-service",
        "name": "Bike Service",
        "description": "General service and checkup for two-wheelers.",
        "price": 399,
        "duration": "45-60 mins",
        "rating": 4.7,
        "features": [
          "Oil change",
          "Brake check",
          "Chain lubrication",
          "Wash & polish"
        ]
      },
      {
        "slug": "car-interior-spa",
        "name": "Car Interior Spa",
        "description": "Deep cleaning and sanitization of car interiors.",
        "price": 1299,
        "duration": "2-3 hours",
        "rating": 4.9,
        "features": [
          "Seat shampooing",
          "Roof cleaning",
          "Carpet extraction",
          "Odor removal"
        ]
      },
      {
        "slug": "car-polish-and-wax",
        "name": "Car Polish & Wax",
        "description": "Restore your car's shine with premium polishing.",
        "price": 999,
        "duration": "90-120 mins",
        "rating": 4.8,
        "features": [
          "Machine polishing",
          "Wax coating",
          "Scratch removal",
          "Paint protection"
        ]
      },
      {
        "slug": "tyre-puncture-repair",
        "name": "Tyre Puncture Repair",
        "description": "On-spot puncture repair for tubeless tyres.",
        "price": 199,
        "duration": "15-30 mins",
        "rating": 4.6,
        "features": [
          "Leak detection",
          "Patch repair",
          "Air filling",
          "Wheel check"
        ]
      },
      {
        "slug": "battery-jumpstart",
        "name": "Battery Jumpstart",
        "description": "Emergency battery jumpstart service.",
        "price": 299,
        "duration": "15-20 mins",
        "rating": 4.9,
        "features": [
          "Battery check",
          "Jumpstart",
          "Alternator check",
          "Terminal cleaning"
        ]
      }
    ]
  }
];

export const featuredServiceSlugs = [
  "home-cleaning",
  "plumbing",
  "electrical",
  "painting-waterproofing",
];

export const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Product Manager",
    quote:
      "Booking was smooth, pricing was clear, and the professional arrived exactly on time.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Neha Kapoor",
    role: "Interior Designer",
    quote:
      "The service quality is consistent and the category-wise options are very useful for quick booking.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Rohan Sinha",
    role: "Startup Founder",
    quote:
      "I booked plumbing and electrical in the same week and both experiences were reliable and professional.",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
  },
];

export const homeStats = [
  { label: "Verified Pros", value: "2,000+" },
  { label: "Average Rating", value: "4.9/5" },
  { label: "Cities Covered", value: "42" },
  { label: "On-Time Rate", value: "98%" },
];

export const aboutTimeline = [
  {
    year: "2019",
    title: "UrbanNest Started",
    description: "Started with a mission to simplify trusted home services.",
  },
  {
    year: "2021",
    title: "Multi-City Coverage",
    description: "Expanded into major Indian cities with vetted professionals.",
  },
  {
    year: "2024",
    title: "Service Category Expansion",
    description: "Added 10+ home and lifestyle service categories.",
  },
  {
    year: "2026",
    title: "Premium Booking Experience",
    description: "Launched a modern booking platform with smart checkout.",
  },
];

export const teamMembers = [
  {
    name: "Mira Kapoor",
    role: "Founder & CEO",
    bio: "Built UrbanNest to make trusted home services easy and dependable.",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Daniel Reed",
    role: "Head of Operations",
    bio: "Leads professional onboarding, quality audits, and service delivery.",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Anika Sharma",
    role: "Design Director",
    bio: "Designs premium customer journeys across all booking touchpoints.",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=500&q=80",
  },
];

export const contactFaqs = [
  {
    question: "How quickly do you confirm bookings?",
    answer: "Most bookings are confirmed instantly. Complex jobs are confirmed within 30 minutes.",
  },
  {
    question: "Can I reschedule after payment?",
    answer: "Yes, rescheduling is available up to 6 hours before your service slot.",
  },
  {
    question: "Do you provide invoices?",
    answer: "Yes, digital GST invoices are sent after service completion.",
  },
];

export const dashboardHistory = [
  {
    id: "BK-9102",
    service: "Deep Home Cleaning",
    date: "2026-02-11",
    status: "Completed",
    amount: 2499,
  },
  {
    id: "BK-8941",
    service: "Switch & Socket Repair",
    date: "2026-01-28",
    status: "Completed",
    amount: 199,
  },
  {
    id: "BK-8774",
    service: "Garden Maintenance",
    date: "2026-01-14",
    status: "Scheduled",
    amount: 899,
  },
];

export const featureHighlights = [
  {
    icon: ShieldCheck,
    title: "Verified Experts",
    description: "Every professional is background-checked and service-trained.",
  },
  {
    icon: Clock3,
    title: "On-Time Arrivals",
    description: "Real-time slot tracking with dependable time windows.",
  },
  {
    icon: Sparkles,
    title: "Premium Outcomes",
    description: "Detailed checklists and quality-first service execution.",
  },
];

export function getAllServices() {
  return services;
}

export function getFeaturedServices() {
  return services.filter((service) => featuredServiceSlugs.includes(service.slug));
}

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug) ?? null;
}
