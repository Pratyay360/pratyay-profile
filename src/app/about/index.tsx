import Image from "next/image"
import { createClient } from '@/utils/supabase/server';
import Backgroundcircles from "../animation/index"
import WordRotate from "@/components/magicui/word-rotate";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
export default async function Photo() {
    const supabase = await createClient();
    let words: string[] = [];
    let errorOccurred = false;
    try {
      const { data } = await supabase.from('description').select('word');
      if (data) {
        words = data.map((c) => c.word);
      }
    } catch (err) {
      console.error('Supabase fetch error:', err);
      errorOccurred = true;
    }
  
    if (!words.length) {
      words = ['Full-Stack Developer', 'UI/UX Enthusiast'];
    }
  
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
          className="object-cover rounded-full transform-gpu transition-all hover:scale-125" />
      </div>

      <h1 className="z-10 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
        Hi, I’m Pratyay Mitra Mustafi 👋
      </h1>

      <div className="z-10 mt-6 h-14 text-xl font-medium text-muted-foreground md:text-2xl">
        {errorOccurred ? (
          <Skeleton width={260} height={32} />
        ) : (
          <WordRotate words={words} />
        )}
      </div>
    </section>
        </>
    )
};
