import Image from "next/image"
import { useEffect, useState } from 'react';
import { Database } from '../../../utils/database.types';
import supabase from '../../../utils/supabase';
import Backgroundcircles from "../animation/index"
import Typewriter from 'typewriter-effect';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
export default function Photo() {
    const [loading, setLoading] = useState(true);
    const [wor, setText] = useState<Database['public']['Tables']['description']['Row'][]>([]);
    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase.from('description').select('word');
            if (error) {
                console.log(error)
            } else {
                setText(data);
                setLoading(false);
            }
        }
        fetchData();
    }, []);      
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
                                <span className="text-2xl md:text-xl lg:text-4xl dark:text-gray-400">
                                    {loading && <Skeleton count={1} height={50} />}
                                    <Typewriter
                                        options={{
                                            strings: wor.map((c) => (c.word || '')),
                                            autoStart: true,
                                            loop: true,
                                            deleteSpeed: 50,
                                            delay: 100,
                                        }}
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
