'use client';

import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-card border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
                U
              </div>
              <span className="font-bold text-xl">UrbanServices</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted partner for all home services. Professional, reliable, and affordable.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/services/home-cleaning" className="hover:text-primary">Home Cleaning</Link></li>
              <li><Link href="/services/appliance" className="hover:text-primary">Appliance Services</Link></li>
              <li><Link href="/services/vehicle" className="hover:text-primary">Vehicle Care</Link></li>
              <li><Link href="/services/beauty" className="hover:text-primary">Beauty & Wellness</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/how-it-works" className="hover:text-primary">How It Works</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/terms" className="hover:text-primary">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>Â© 2025 UrbanServices. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary">Facebook</a>
            <a href="#" className="hover:text-primary">Twitter</a>
            <a href="#" className="hover:text-primary">Instagram</a>
            <a href="#" className="hover:text-primary">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;





