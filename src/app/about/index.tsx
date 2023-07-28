"use client"
import { motion } from "framer-motion"
import { type } from "os"
import { block } from "million/react"
import Image from "next/image"
import { useEffect, useState, useRef } from 'react';
import { Database } from '../../../utils/database.types';
import supabase from '../../../utils/supabase';
import { Cursor, useTypewriter } from "react-simple-typewriter"
import Backgroundcircles from "../animation/index"
import Typewriter from 'typewriter-effect';
const about = block(function Aboutme() {

    const [wor, setText] = useState<Database['public']['Tables']['description']['Row'][]>([]);
    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase.from('description').select('word');
            if (error) {
                console.error(error);
            } else {
                // console.log(data);
                setText(data);
            }
        }
        fetchData();
    }, []);
    // const wordsArray =   {wor.map((c) => (c.word || ''))};
    // const [text, count] = useTypewriter({
    //     words: wordsArray,
    //     loop: true,
    //     delaySpeed: 2000,
    //     deleteSpeed: 50,
    //     typeSpeed: 100
    // });
    return (
        <div className="h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden">
            <Backgroundcircles />
            <Image className="h-32 w-auto object-cover rounded-full transform-gpu transition-all hover:scale-125"
                src={"https://wekwttnnowtwqzntesch.supabase.co/storage/v1/object/public/images/img.webp"}
                alt={"..."}
                width={350}
                height={350} />
            <div>
                <h1 className="text-4xl lg:text-5xl text-gray-300"> HI, I am Pratyay Mitra Mustafi 👋👋👋👋</h1>
              
                    <h1 className="text-2xl lg:text-3xl font-semibold py-6 px-5 text-gray-400 animate-type group-hover:animate-type-reverse whitespace-nowrap text-brand-accent">
                        <span className="text-gray-400 text-3xl lg:text-4xl">
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
    )
});

export default about;