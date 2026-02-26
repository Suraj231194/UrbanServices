import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQItem = {
  question: string;
  answer: string;
};

export function FAQ({ items, title }: { items: FAQItem[]; title?: string }) {
  return (
    <section className="rounded-3xl border border-border/60 bg-card/70 p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-semibold tracking-tight">{title ?? "Frequently Asked Questions"}</h2>
      <Accordion type="single" collapsible className="mt-6 space-y-3">
        {items.map((item, index) => (
          <AccordionItem key={item.question} value={`faq-${index}`} className="rounded-xl border border-border/60 px-4">
            <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

