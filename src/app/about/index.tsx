"use client";

import { useState, useEffect } from "react";
import { Image } from "@unpic/react";
import { createClient } from "@/utils/db/server";
import Backgroundcircles from "../animation/index";
import WordRotate from "@/components/magicui/word-rotate";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Photo() {
  const [words, setWords] = useState<string[]>(["Full-Stack Developer", "UI/UX Enthusiast"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWords() {
      try {
        const supabase = await createClient();
        const { data } = await supabase.from("description").select("word");
        if (data && data.length > 0) {
          setWords(data.map((c) => c.word));
        }
      } catch (err) {
        console.error("Supabase fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchWords();
  }, []);

  return (
    <>
      <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-4">
        <Backgroundcircles />

        <div className="relative z-10 mb-6">
          <Image
            src="https://wekwttnnowtwqzntesch.supabase.co/storage/v1/object/public/images/img.webp"
            alt="Pratyay Mitra Mustafi"
            width={300}
            height={300}
            className="object-cover rounded-full transform-gpu transition-all hover:scale-125"
          />
        </div>

        <h1 className="z-10 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Hi, I'm Pratyay Mitra Mustafi
        </h1>

        <div className="z-10 mt-6 h-14 text-xl font-medium text-muted-foreground md:text-2xl">
          {loading ? <Skeleton width={260} height={32} /> : <WordRotate words={words} />}
        </div>
      </section>
    </>
  );
}
