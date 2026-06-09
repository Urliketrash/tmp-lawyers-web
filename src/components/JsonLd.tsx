import React from "react";

interface OrganizationJsonLdProps {
  /** Legal Name of the organization */
  name: string;
  /** Website absolute URL */
  url: string;
  /** Logo absolute URL */
  logo: string;
  /** Social profile URLs */
  sameAs: string[];
}

/**
 * Organization structured data component injection for SEO indexing.
 * Renders schema.org type LegalService.
 */
export function OrganizationJsonLd({ name, url, logo, sameAs }: OrganizationJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": name,
    "url": url,
    "logo": logo,
    "sameAs": sameAs,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "The Habibie Center, Lt 1, Jln. Kemang Selatan No. 98, Cilandak Timur",
      "addressLocality": "Jakarta Selatan",
      "postalCode": "12560",
      "addressCountry": "ID"
    },
    "telephone": "+6281210054874"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ArticleJsonLdProps {
  /** Headline / title of article */
  title: string;
  /** Brief description or summary of article */
  description: string;
  /** Featured image URL */
  imageUrl?: string;
  /** Date published ISO string */
  datePublished: string;
  /** Name of the author */
  authorName: string;
  /** Name of the publishing organization */
  publisherName: string;
  /** Logo URL of publishing organization */
  publisherLogo: string;
  /** Absolute URL to web page of article */
  url: string;
}

/**
 * Article structured data injection for NewsArticle SEO indexing.
 */
export function ArticleJsonLd({
  title,
  description,
  imageUrl,
  datePublished,
  authorName,
  publisherName,
  publisherLogo,
  url
}: ArticleJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": title,
    "description": description,
    "image": imageUrl ? [imageUrl] : [],
    "datePublished": datePublished,
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": publisherName,
      "logo": {
        "@type": "ImageObject",
        "url": publisherLogo
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
