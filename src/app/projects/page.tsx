"use client";
import React from 'react';
import { useEffect, useState } from 'react';
import { Database } from '../../../utils/database.types';
import Image from 'next/image';
import Link from 'next/link';
import supabase from '../../../utils/supabase';
// import { block } from 'million/react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
export default function Projects() {
    const [project, setProject] = useState<Database['public']['Tables']['project']['Row'][]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase.from('project').select('*');
            if (error) {
                console.log(error)
            } else {
                setProject(data);
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    
    return (
        <>
            <SkeletonTheme baseColor="#202020" highlightColor="#444444">
                <h1 className="top-36 p-10 text-center items-center justify-center  tracking-[20px] dark:text-gray-500 lg:text-5xl font-bold text-3xl ml-3">Projects By Pratyay Mitra Mustafi</h1>
                {loading && ((<div className="p-10 mt-10">
                    <Skeleton count={1} height={500} />
                </div>))}
                <section className="dark:text-gray-300 body-font" >
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-wrap -m-4 justify-center">
                            {project.map((card, index) => (
                                <div className="p-4 md:w-1/3" key={index}>
                                    <Link href={card.link || ''} className="block" target="_blank">
                                        <div className="h-full border-2 dark:border-gray-200 border-gray-900 border-opacity-60 rounded-lg overflow-hidden transform transition-all hover:scale-110">
                                            <Image
                                                className="lg:h-48 md:h-36 w-full object-cover object-center"
                                                src={card.imageSrc || ''}
                                                alt={card.title || ''}
                                                width={300}
                                                height={200}
                                            />
                                            {loading && <Skeleton width={300} height={200} />}
                                            <div className="p-6">
                                                <h2 className="tracking-widest text-xs title-font font-medium dark:text-gray-400 mb-1">
                                                    {card.category || ''}
                                                    {loading && <Skeleton count={1} />}
                                                </h2>
                                                <h1 className="title-font text-lg font-medium dark:text-gray-300 mb-3">
                                                    {card.title || ''}
                                                    {loading && <Skeleton count={1} />}
                                                </h1>
                                                <p className="leading-relaxed mb-3">{card.description || ''}
                                                    {loading && <Skeleton count={3} />}</p>
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