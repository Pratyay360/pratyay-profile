import { createClient } from '@/utils/supabase/server';
import React, { Suspense } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

async function AboutData() {
  const supabase = await createClient();
  const { data } = await supabase.from('about').select('word');

  if (!data || data.length === 0) {
    return (
      <p className="text-muted-foreground italic text-lg">
        Nothing here yet. Check back soon!
      </p>
    );
  }

  return (
    <div className="max-w-4xl lg:max-w-5xl mx-auto space-y-6">
      {data.map(({ word }, i) => (
        <p 
          key={i} 
          className="text-lg md:text-xl leading-relaxed text-foreground"
        >
          {word}
        </p>
      ))}
    </div>
  );
}

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
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <h1 className="text-center text-3xl sm:text-5xl font-bold tracking-widest uppercase mb-16">
          About Me
        </h1>
        
        <Suspense fallback={<AboutSkeleton />}>
          <AboutData />
        </Suspense>
      </div>
    </section>
  );
}