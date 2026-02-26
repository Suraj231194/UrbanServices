'use client';

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

type BookNowButtonProps = {
  slug: string;
  subServiceSlug?: string;
  label?: string;
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "destructive" | "link";
  size?: "default" | "sm" | "lg" | "icon";
};

export function BookNowButton({
  slug,
  subServiceSlug,
  label = "Book Now",
  className,
  variant = "default",
  size = "lg",
}: BookNowButtonProps) {
  const router = useRouter();
  const { toast } = useToast();

  const checkoutPath = `/checkout?service=${slug}${subServiceSlug ? `&option=${subServiceSlug}` : ""}`;

  const handleBookNow = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      toast({
        title: "Login required",
        description: "Please login or sign up to continue booking.",
      });
      router.push(`/auth?redirect=${encodeURIComponent(checkoutPath)}`);
      return;
    }

    router.push(checkoutPath);
  };

  return (
    <Button className={cn("rounded-full px-8", className)} size={size} variant={variant} onClick={handleBookNow}>
      {label}
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  );
}

