import { block } from "million/react"
import Image from "next/image"
import { useEffect, useState, useRef } from 'react';
import { Database } from '../../../utils/database.types';
import supabase from '../../../utils/supabase';
import Backgroundcircles from "../animation/index"
import Typewriter from 'typewriter-effect';
const phot = block(function Photo() {

    const [wor, setText] = useState<Database['public']['Tables']['description']['Row'][]>([]);
    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase.from('description').select('word');
            if (error) {
                console.error(error);
            } else {
                setText(data);
            }
        }
        fetchData();
    }, []);
    return (
        <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden">
            <Backgroundcircles />
            <Image className="h-32 w-auto object-cover rounded-full transform-gpu transition-all hover:scale-125"
                src={"https://wekwttnnowtwqzntesch.supabase.co/storage/v1/object/public/images/img.webp"}
                alt={"..."}
                width={350}
                height={350} />
            <div className="container my-auto ">
                <h1 className="text-4xl md:text-3xl lg:text-5xl text-gray-300 overflow-visible"> HI, I am Pratyay Mitra Mustafi 👋👋👋👋</h1>
              <div className="py-10 flex flex-wrap md:flex-nowrap items-center justify-center text-center overflow-visible">
                    <h1 className="font-semibold text-gray-400 animate-type group-hover:animate-type-reverse whitespace-break-spaces text-brand-accent">
                        <span className="text-gray-400 text-2xl md:text-xl lg:text-4xl">
                        <Typewriter
                            options={{  
                                strings: wor.map((c) => (c.word || '')),
                                autoStart: true,
                                loop: true,
                                deleteSpeed: 50,
                                delay:100,
                            }}
                        />
                        </span>
                    </h1>
                    </div>
            </div>
        </div>
    )
});

export default phot;