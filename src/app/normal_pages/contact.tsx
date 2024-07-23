import React from 'react';
import Image from 'next/image';
import { createClient } from '@/../utils/supabase/server';
import Link from 'next/link';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
export default async function Contact() {
    const supabase = createClient();
    let loading = false
    const { data: social_link } = await supabase.from('social_link').select('*');    
    if(!social_link){
        loading= true
    }
    return (
        <>
            <SkeletonTheme baseColor="#202020" highlightColor="#444444">
                <h1 className="text-center items-center justify-center top-36 tracking-[20px] dark:text-gray-500 text-3xl lg:text-4xl font-bold">CONTACT ME</h1>
                {/*  */}
                {loading &&
                    (
                        (<div className="p-10 mt-10">
                            <Skeleton count={1} height={40} />
                        </div>)
                    )}
                <div className="flex flex-wrap text-center items-center justify-center drop-shadow-2xl">
                    {social_link?.map((item, index) => (
                        <div key={index} className="cont mr-5 mb-10 mt-10 transform-gpu mx-2 transition-all hover:scale-125 " style={{ marginRight: "10px" }}>
                            <Link href={item.link || ''} target="_blank">
                                <Image
                                    src={item.image || ''}
                                    alt={item.name || ''}
                                    width={40}
                                    height={40}
                                />
                                {loading && <Skeleton width={40} height={40} />}
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="flex fles-wrap text-center items-center justify-center p-10">
                    <Link href="/message_me"> <button className="border border-indigo-600 hover:bg-indigo-600 dark:bg-white text-3xl dark:text-black font-bold py-2 px-4 rounded-full">
                        Message Me
                    </button></Link>
                </div>
            </SkeletonTheme>
        </>
    );
};