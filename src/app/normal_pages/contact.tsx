import React from 'react';
import { useEffect, useState } from 'react';
import { Database } from '../../../utils/database.types';
import Image from 'next/image';
import supabase from '../../../utils/supabase';
// import { block } from 'million/react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
export default function Contact() {
    const [loading, setLoading] = useState(true);
    const [social_link, social] = useState<Database['public']['Tables']['social_link']['Row'][]>([]);
    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase.from('social_link').select('*');
            if (error) {
                sessionStorage.setItem('error', JSON.stringify(error));
                location.href = '/errorpage';        
            } else {
                social(data);
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    return (
        <>
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <h1 className="text-center shrink items-center justify-center top-36 tracking-[20px] text-gray-500 text-3xl lg:text-4xl font-bold mr-2 ml-2 pb-5">CONTACT ME</h1>
                {/*  */}
                {loading &&
                    (
                        (<div className="p-10 mt-10">
                    <Skeleton count={1} height={40}/>
                    </div>)
                    )}
                <div className="flex flex-wrap text-center items-center justify-center ">
                    {social_link.map((item, index) => (
                        <div key={index} className="cont mr-5 mb-10 mt-10 transform-gpu mx-2 transition-all hover:scale-125" style={{ marginRight: "10px" }}>
                            <a href={item.link || ''} target="_blank">
                                <Image
                                    src={item.image || ''}
                                    alt={item.name || ''}
                                    width={40}
                                    height={40}
                                />
                                {loading && <Skeleton width={40} height={40} />}
                            </a>
                        </div>
                    ))}
                </div>
                <div className="flex fles-wrap text-center items-center justify-center p-10">
                        <button className="border border-indigo-600 hover:bg-indigo-600 bg-black text-3xl text-white font-bold py-2 px-4 rounded-full">
                            <a href="/message_me">Message Me</a>
                        </button>
                    </div>
            </SkeletonTheme>
        </>
    );
};