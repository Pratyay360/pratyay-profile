"use client"
import React from 'react';
import { useEffect, useState } from 'react';
import { Database } from '../../../utils/database.types';
import Image from 'next/image';
import supabase from '../../../utils/supabase';
import Link from 'next/link';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
export default function Certificates() {
    const [certificate, cert] = useState<Database['public']['Tables']['certificate']['Row'][]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase.from('certificate').select('*');
            if (error) {
                console.log(error)
            } else {
                cert(data);
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    
    return (
        <>
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <div className="flex flex-column text-center items-center justify-center">
                    <h1 className="top-36 p-10 text-center items-center justify-center  tracking-[20px] text-gray-500 lg:text-5xl font-bold text-3xl ml-3">CERTIFICATES</h1>
                </div>
                {loading && (
                    <div className="p-10 mt-10">
                        <Skeleton height={500} count={1} />
                    </div>)}
                <section className=" body-font">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-wrap -m-4 justify-center whitespace-break-spaces">
                            {certificate.map((c, index) => (
                                <div className="p-4 md:w-1/3" key={index}>
                                    <Link href={c.link || ''} className="block" target="_blank">
                                        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden transform transition-all hover:scale-110 ">
                                            <Image
                                                className="lg:h-48 md:h-36 w-full object-cover object-center"
                                                src={c.imageSrc || ''}
                                                alt={c.title || ''}
                                                width={350}
                                                height={250}
                                            />
                                            {loading && <Skeleton width={350} height={250} />}
                                            <div className="p-6">
                                                <h1 className="title-font text-lg font-medium text-gray-300 mb-3">
                                                    {c.title}{loading && <Skeleton count={1} />}
                                                </h1>
                                                <p className="leading-relaxed mb-3">{c.description}
                                                    {loading && <Skeleton count={3} />}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </SkeletonTheme>
        </>
    )
};