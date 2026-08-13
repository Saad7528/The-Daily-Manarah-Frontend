import React from "react";
import { LocationLayout } from "./LocationLayout";
import { NewsItem } from "@/components/News/HeroGrid";

// Force static site generation with revalidation every 60 seconds (ISR)
export const revalidate = 60;

async function getLocationPosts(slug?: string[]): Promise<NewsItem[]> {
  try {
    const locationPath = slug || [];
    const divisionId = locationPath[0] ? locationPath[0].toLowerCase() : "";
    if (!divisionId) return [];

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000";
    const res = await fetch(`${backendUrl}/api/posts?division=${divisionId}`, {
      next: { revalidate: 60 } // Cache for 60 seconds
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch location posts for division ${divisionId}`);
    }
    return res.json();
  } catch (err) {
    console.error("Error fetching location posts on server:", err);
    return [];
  }
}

export default async function LocationPage({ params }: { params: { slug?: string[] } }) {
  const posts = await getLocationPosts(params.slug);
  return <LocationLayout initialPosts={posts} params={params} />;
}
