import React from "react";
import { HomeLayout } from "./HomeLayout";
import { NewsItem } from "@/components/News/HeroGrid";

// Force static site generation with revalidation every 60 seconds (ISR)
export const revalidate = 60;

async function getPosts(): Promise<NewsItem[]> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:5000";
    const res = await fetch(`${backendUrl}/api/posts`, {
      next: { revalidate: 60 } // Cache for 60 seconds
    });
    if (!res.ok) {
      throw new Error("Failed to fetch posts from backend API");
    }
    return res.json();
  } catch (err) {
    console.error("Error fetching posts on server:", err);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();
  return <HomeLayout initialPosts={posts} />;
}
