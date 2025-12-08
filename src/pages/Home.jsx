import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Search, Star, Shield, Clock, CheckCircle,
  ArrowRight, Sparkles, User, HelpCircle,
  Wrench, Zap, Droplets, Car, Home as HomeIcon, Scissors
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Home = () => {
  return (
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 -z-10" />
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
              <Sparkles className="mr-2 h-4 w-4" />
              #1 Home Services Platform
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent pb-2">
              Expert Home Services,<br />On Demand
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Book trusted professionals for cleaning, repairs, beauty & wellness.
              Experience the new standard of home care.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mt-8 relative z-10">
              <div className="flex gap-2 bg-card/80 backdrop-blur-sm p-2 rounded-2xl shadow-2xl border border-primary/10">
                <Input
                  placeholder="What service do you need today?"
                  className="border-0 focus-visible:ring-0 text-lg h-12 bg-transparent"
                />
                <Button size="lg" className="h-12 px-8 rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "Verified Experts", desc: "Background checked & trained professionals" },
              { icon: Star, title: "4.8+ Rated", desc: "Millions of happy customers globally" },
              { icon: Clock, title: "On-Time Service", desc: "Punctual service or money back" },
              { icon: CheckCircle, title: "100% Secure", desc: "Insurance coverage for every job" }
            ].map((feature, idx) => (
              <Card key={idx} className="text-center hover:shadow-xl transition-all duration-300 border-none shadow-sm bg-card/50 backdrop-blur-sm group">
                <CardContent className="pt-8 pb-8">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Our Services</h2>
            <p className="text-muted-foreground text-lg">Everything you need for your home</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Cleaning", icon: HomeIcon, color: "text-blue-500", bg: "bg-blue-500/10", link: "/services/home-cleaning" },
              { name: "Plumbing", icon: Droplets, color: "text-cyan-500", bg: "bg-cyan-500/10", link: "/services" },
              { name: "Electrical", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10", link: "/services" },
              { name: "Repairs", icon: Wrench, color: "text-orange-500", bg: "bg-orange-500/10", link: "/services/appliance" },
              { name: "Car Care", icon: Car, color: "text-red-500", bg: "bg-red-500/10", link: "/services/vehicle" },
              { name: "Beauty", icon: Scissors, color: "text-pink-500", bg: "bg-pink-500/10", link: "/services/beauty" }
            ].map((service, idx) => (
              <Link to={service.link} key={idx}>
                <Card className="h-full hover:shadow-lg transition-all cursor-pointer border-muted hover:border-primary/50 group">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full space-y-4">
                    <div className={`w-16 h-16 rounded-full ${service.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className={`w-8 h-8 ${service.color}`} />
                    </div>
                    <span className="font-semibold group-hover:text-primary transition-colors">{service.name}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="rounded-full px-8 border-primary/20 hover:bg-primary/5" asChild>
              <Link to="/services">View All Services <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-primary/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">Get your service done in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            {[
              { step: "01", title: "Choose Service", desc: "Select the service you need from our wide range of options." },
              { step: "02", title: "Book Slot", desc: "Pick a convenient date and time for the professional to visit." },
              { step: "03", title: "Relax", desc: "Our expert arrives at your doorstep and gets the job done." }
            ].map((item, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center space-y-6 z-10">
                <div className="w-24 h-24 rounded-full bg-background border-4 border-primary/20 flex items-center justify-center shadow-xl">
                  <span className="text-3xl font-bold text-primary">{item.step}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground max-w-xs mx-auto">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Johnson", role: "Homeowner", text: "The cleaning service was exceptional. The professional was polite and thorough. Highly recommended!", rating: 5 },
              { name: "Mike Chen", role: "Business Owner", text: "Fixed my AC in under an hour. Very professional and transparent pricing. Will use again.", rating: 5 },
              { name: "Emily Davis", role: "Designer", text: "Love the beauty services at home. So convenient and the quality is salon-grade.", rating: 4 }
            ].map((review, idx) => (
              <Card key={idx} className="bg-card hover:shadow-xl transition-all duration-300 border-primary/10">
                <CardContent className="p-8 space-y-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{review.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                      {review.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold">{review.name}</h4>
                      <p className="text-xs text-muted-foreground">{review.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Find answers to common questions</p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {[
              { q: "How do I book a service?", a: "Simply select a service, choose your preferred time slot, and confirm your booking. It takes less than 2 minutes!" },
              { q: "Are the professionals verified?", a: "Yes, all our professionals undergo rigorous background checks and skill verification before joining the platform." },
              { q: "What if I'm not satisfied?", a: "We have a 100% satisfaction guarantee. If you're not happy, we'll redo the service or offer a refund." },
              { q: "How do I pay?", a: "You can pay online securely using credit/debit cards, UPI, or wallets after the service is completed." }
            ].map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="bg-background border rounded-lg px-4">
                <AccordionTrigger className="text-left hover:no-underline py-4 text-lg font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary -z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581578731117-104f2a41272c?q=80&w=2070')] bg-cover bg-center opacity-10 mix-blend-overlay -z-10" />

        <div className="container mx-auto max-w-4xl text-center space-y-8 text-primary-foreground">
          <h2 className="text-4xl md:text-5xl font-bold">Ready to Transform Your Home?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join thousands of happy customers who trust us with their home service needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" variant="secondary" className="text-primary font-bold text-lg px-8 h-14 rounded-full shadow-xl hover:shadow-2xl transition-all" asChild>
              <Link to="/auth">Get Started Now</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary font-bold text-lg px-8 h-14 rounded-full" asChild>
              <Link to="/services">Explore Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;