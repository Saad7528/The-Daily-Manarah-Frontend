import React from "react";
import { CategoryLayout } from "./CategoryLayout";
import { NewsItem } from "@/components/News/HeroGrid";

// Force static site generation with revalidation every 60 seconds (ISR)
export const revalidate = 60;

async function getCategoryPosts(slug: string): Promise<NewsItem[]> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000";
    const res = await fetch(`${backendUrl}/api/posts?categorySlug=${slug}`, {
      next: { revalidate: 60 } // Cache for 60 seconds
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch category posts for ${slug}`);
    }
    return res.json();
  } catch (err) {
    console.error(`Error fetching category posts for ${slug} on server:`, err);
    return [];
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const posts = await getCategoryPosts(params.slug);
  return <CategoryLayout initialPosts={posts} slug={params.slug} />;
}
