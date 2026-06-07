"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/db/server";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function AboutSkeleton() {
  return (
    <div className="max-w-4xl lg:max-w-5xl mx-auto space-y-6">
      <Skeleton count={3} height={24} className="mb-4" />
      <Skeleton count={2} height={24} width="80%" className="mb-4" />
      <Skeleton count={1} height={24} width="60%" />
    </div>
  );
}

export default function AboutMe() {
  const [data, setData] = useState<{ word: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const supabase = await createClient();
        const { data: aboutData } = await supabase.from("about").select("word");
        if (aboutData) setData(aboutData);
      } catch (err) {
        console.error("Error fetching about data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAbout();
  }, []);

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-center text-3xl sm:text-5xl font-bold tracking-widest uppercase mb-16">
          About Me
        </h1>

        {loading ? (
          <AboutSkeleton />
        ) : data.length === 0 ? (
          <p className="text-muted-foreground italic text-lg">Nothing here yet. Check back soon!</p>
        ) : (
          <div className="max-w-4xl lg:max-w-5xl mx-auto space-y-6">
            {data.map(({ word }, i) => (
              <p key={i} className="text-lg md:text-xl leading-relaxed text-foreground">
                {word}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
