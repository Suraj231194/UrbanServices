import type { Metadata } from "next";
import { siteConfig } from "@/lib/data";

type SEOInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function createPageMetadata({ title, description, path, image }: SEOInput): Metadata {
  const url = new URL(path, siteConfig.url).toString();
  const ogImage =
    image ??
    "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1600&q=80";

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} preview image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: siteConfig.social.twitter,
      images: [ogImage],
    },
  };
}

