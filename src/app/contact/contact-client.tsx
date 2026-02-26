'use client';

import { useState } from "react";
import { MapPinned, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FAQ } from "@/components/faq";
import { contactFaqs } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

export function ContactClient() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    toast({
      title: "Message sent",
      description: "Our concierge team will get back to you within 24 hours.",
    });

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <Card className="rounded-3xl border-border/60 bg-card/85 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Send us a message</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">Name</Label>
              <Input id="contact-name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input id="contact-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-message">Message</Label>
              <Textarea
                id="contact-message"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what you need..."
                required
              />
            </div>
            <Button type="submit" className="w-full rounded-xl">
              <Send className="mr-2 h-4 w-4" />
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-8">
        <Card className="rounded-3xl border-border/60 bg-card/80 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl">Office & Coverage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-dashed border-border/70 bg-muted/30 p-6">
              <p className="mb-3 inline-flex items-center gap-2 text-sm font-medium">
                <MapPinned className="h-4 w-4 text-primary" />
                Interactive map placeholder
              </p>
              <div className="h-48 rounded-xl bg-gradient-to-br from-sky-500/20 via-cyan-500/10 to-emerald-500/20" />
            </div>
            <p className="text-sm text-muted-foreground">Serving 42 cities with premium verified professionals.</p>
          </CardContent>
        </Card>

        <FAQ items={contactFaqs} title="Contact FAQs" />
      </div>
    </div>
  );
}

