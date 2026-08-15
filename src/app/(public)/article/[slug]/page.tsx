import React from "react";
import { ArticleLayout } from "./ArticleLayout";

// Force static site generation with revalidation every 60 seconds (ISR)
export const revalidate = 60;

async function getArticle(slug: string): Promise<any> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000";
    const res = await fetch(`${backendUrl}/api/posts/slug/${slug}`, {
      next: { revalidate: 60 } // Cache for 60 seconds
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch article details for ${slug}`);
    }
    return res.json();
  } catch (err) {
    console.error(`Error fetching article for ${slug} on server:`, err);
    return null;
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const post = await getArticle(params.slug);
  return <ArticleLayout initialPost={post} />;
}
