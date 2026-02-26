import type { Metadata } from "next";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { aboutTimeline, teamMembers } from "@/lib/data";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About UrbanNest",
  description: "Learn about the team and journey behind UrbanNest's premium home service platform.",
  path: "/about",
  image: "https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=1600&q=80",
});

export default function AboutPage() {
  return (
    <>
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-semibold tracking-tight">About UrbanNest</h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            We build premium booking experiences for modern households by combining verified professionals, clear pricing, and high service standards.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-2">
          <Card className="rounded-3xl border-border/60 bg-card/80 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Our Journey</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {aboutTimeline.map((item) => (
                <div key={item.year} className="rounded-xl border border-border/60 bg-background/60 p-4">
                  <p className="text-sm font-semibold text-primary">{item.year}</p>
                  <h2 className="mt-1 text-lg font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-border/60 bg-card/80 shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                UrbanNest exists to remove booking friction and elevate the quality of home services through better technology and tighter operating standards.
              </p>
              <p>
                Every professional on our platform is vetted, trained, and quality-scored after each booking. This keeps outcomes predictable and premium.
              </p>
              <p>
                Our design philosophy is simple: trust-first workflows, fast scheduling, and clear communication at every step.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-semibold tracking-tight">Leadership Team</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {teamMembers.map((member) => (
              <Card key={member.name} className="rounded-2xl border-border/60 bg-card/80 shadow-sm">
                <div className="relative h-64">
                  <Image src={member.image} alt={member.name} fill className="rounded-t-2xl object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-sm font-medium text-primary">{member.role}</p>
                  <p className="mt-3 text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

