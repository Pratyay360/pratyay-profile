import Image from "next/image"
import { createClient } from '@/../utils/supabase/server';
import Backgroundcircles from "../animation/index"
import WordRotate from "@/components/magicui/word-rotate";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
export default async function Photo() {
    const supabase = createClient()
    let loading = false 
    const { data: description } = await supabase.from('description').select('word');
    if(!description){
        loading = true
    }
    return (
        <>
            <SkeletonTheme baseColor="#202020" highlightColor="444444">
                <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden">
                    <Backgroundcircles />
                    <Image className="object-cover rounded-full transform-gpu transition-all hover:scale-125"
                        src={"https://wekwttnnowtwqzntesch.supabase.co/storage/v1/object/public/images/img.webp"}
                        alt={"..."}
                        width={300}
                        height={300} />
                    <div className="container my-auto ">
                        <h1 className="text-4xl md:text-3xl lg:text-5xl dark:text-gray-300 overflow-visible"> HI, I am Pratyay Mitra Mustafi 👋👋👋👋</h1>
                        <div className="py-10 flex flex-wrap md:flex-nowrap items-center justify-center text-center overflow-visible">
                            <h1 className="font-semibold animate-type group-hover:animate-type-reverse whitespace-break-spaces text-brand-accent">
                                <span className="text-2xl md:text-xl dark:text-gray-400">
                                    {loading && <Skeleton count={1} height={50} />}
                                    <WordRotate 
                                      words={description?.map((c)=>(c.word)) || []}
                                    />
                                </span>
                            </h1>
                        </div>
                    </div>
                </div>
            </SkeletonTheme>
        </>
    )
};
