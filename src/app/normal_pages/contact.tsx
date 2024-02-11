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
    const [social_link, setSocial] = useState<Database['public']['Tables']['social_link']['Row'][]>([]);
    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase.from('social_link').select('*');
            if (error) {
                console.log(error)
            } else {
                setSocial(data);
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    const [darkValue, setDarkValue] = useState(false);
    useEffect(() => {
        try {
            if (sessionStorage.getItem("DARK")) {
                setDarkValue(true);
            } else {
                setDarkValue(false)
            }
        } catch (err) {
            console.log(err);
        }
    }, [darkValue])
    return (
        <>
            <SkeletonTheme baseColor={darkValue ? "#202020" : "#A5A5A5"} highlightColor={darkValue ? "444444" : "#8e8e8e"}>
                <h1 className={darkValue ? "text-center items-center justify-center top-36 tracking-[20px] text-gray-500 text-3xl lg:text-4xl font-bold" : "text-center items-center justify-center top-36 tracking-[20px] text-gray-900 text-3xl lg:text-4xl font-bold"}>CONTACT ME</h1>
                {/*  */}
                {loading &&
                    (
                        (<div className="p-10 mt-10">
                            <Skeleton count={1} height={40} />
                        </div>)
                    )}
                <div className="flex flex-wrap text-center items-center justify-center drop-shadow-2xl">
                    {social_link.map((item, index) => (
                        <div key={index} className="cont mr-5 mb-10 mt-10 transform-gpu mx-2 transition-all hover:scale-125 " style={{ marginRight: "10px" }}>
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
                    <button className="border border-indigo-600 hover:bg-indigo-600 bg-white text-3xl text-black font-bold py-2 px-4 rounded-full">
                        <a href="/message_me">Message Me</a>
                    </button>
                </div>
            </SkeletonTheme>
        </>
    );
};