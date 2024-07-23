import React from 'react';
import { createClient } from '@/../utils/supabase/server';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { ImageCard } from './cards';
export default async function Skills() {
    const supabase = createClient()
    let loading = false
    const { data: technology } = await supabase.from('technology').select('*');
    if(!technology){
        loading = true 
    }
    return (
        <>
            <SkeletonTheme baseColor="#202020" highlightColor="#444444">
                <h1 className="text-center items-center justify-center top-36 tracking-[20px] dark:text-gray-500 text-3xl lg:text-4xl font-bold">
                    SKILLS
                </h1>
                {loading && (<div className="p-10 mt-10">
                    <Skeleton count={1} height={40} />
                </div>)}
                <div className="flex flex-wrap text-center px-2 sm:px-10 items-center justify-center overflow-auto">
                    {technology?.map((item, index) => (
                        <div key={index} className="cont mr-4 mb-10 mt-10 transform-gpu transition-all hover:scale-125">
                           <ImageCard link={item.href} image={item.src} name={item.name}/>
                        </div>
                    ))}
                </div>
            </SkeletonTheme>
        </>
    );
};