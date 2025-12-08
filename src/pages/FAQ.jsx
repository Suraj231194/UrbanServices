import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

const FAQ = () => {
  const faqs = [
    {
      question: "How do I book a service?",
      answer: "Booking a service is easy! Simply browse our services, select the one you need, choose your preferred date and time, provide your address, and confirm your booking. You'll receive an instant confirmation."
    },
    {
      question: "Are the professionals verified?",
      answer: "Yes, all our service professionals are thoroughly background-verified and trained. We ensure they meet our quality standards before they're allowed to serve customers through our platform."
    },
    {
      question: "What if I need to reschedule my booking?",
      answer: "You can reschedule your booking up to 4 hours before the scheduled time. Simply go to 'My Bookings', select the booking, and choose a new date and time that works for you."
    },
    {
      question: "Is there a cancellation fee?",
      answer: "Cancellations made 4 hours or more before the scheduled time are free. Cancellations made within 4 hours of the service time may incur a small cancellation fee."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major payment methods including credit/debit cards, UPI, net banking, and digital wallets. You can also choose to pay cash after service completion."
    },
    {
      question: "Do you provide warranty on services?",
      answer: "Yes! We provide a 30-day service warranty on most of our services. If you're not satisfied with the service quality, we'll send someone to fix it at no additional cost."
    },
    {
      question: "What areas do you serve?",
      answer: "We currently serve major cities across India including Delhi, Mumbai, Bangalore, Hyderabad, Chennai, and more. Enter your pincode during booking to check if we serve your area."
    },
    {
      question: "How do I track my service professional?",
      answer: "Once your booking is confirmed and a professional is assigned, you'll receive their details via SMS and email. On the day of service, you can track their location in real-time through the app."
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer: "Customer satisfaction is our top priority. If you're not happy with the service, please contact our support team within 24 hours, and we'll resolve the issue or provide a refund."
    },
    {
      question: "Can I request the same professional for future bookings?",
      answer: "Yes! If you're happy with a professional's service, you can mark them as preferred, and we'll try to assign them for your future bookings whenever possible."
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground">
            Find answers to common questions about our services
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="mt-12 text-center p-8 bg-muted rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
          <p className="text-muted-foreground mb-4">
            Can't find the answer you're looking for? Please reach out to our customer support team.
          </p>
          <a
            href="/contact"
            className="text-primary hover:underline font-medium"
          >
            Contact Support →
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;