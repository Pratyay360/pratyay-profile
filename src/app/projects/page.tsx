"use client";
import React from 'react';
import { useEffect, useState } from 'react';
import { Database } from '../../../utils/database.types';
import Image from 'next/image';
import supabase from '../../../utils/supabase';
// import { block } from 'million/react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
export default function Projects() {
    const [project, cert] = useState<Database['public']['Tables']['project']['Row'][]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase.from('project').select('*');
            if (error) {
                console.error(error);
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
                <h1 className="text-center items-center justify-center top-36 tracking-[20px] text-gray-500 text-3xl lg:text-4xl font-bold">Projects By Pratyay Mitra Mustafi</h1>
                        {loading && ((<div className="p-10 mt-10">
                    <Skeleton count={1} height={500}/>
                    </div>))}
                <section className="text-gray-300 body-font">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-wrap -m-4 justify-center">
                            {project.map((card, index) => (
                                <div className="p-4 md:w-1/3" key={index}>
                                    <a href={card.link || ''} className="block" target="_blank">
                                        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden transform transition-all hover:scale-110 ">
                                            <Image
                                                className="lg:h-48 md:h-36 w-full object-cover object-center"
                                                src={card.imageSrc || ''}
                                                alt={card.title || ''}
                                                width={300}
                                                height={200}
                                            />
                                            {loading && <Skeleton width={300} height={200} />}
                                            <div className="p-6">
                                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                                    {card.category || ''}
                                                    {loading && <Skeleton count={1} />}
                                                </h2>
                                                <h1 className="title-font text-lg font-medium text-gray-300 mb-3">
                                                    {card.title || ''}
                                                    {loading && <Skeleton count={1} />}
                                                </h1>
                                                <p className="leading-relaxed mb-3">{card.description || ''}
                                                    {loading && <Skeleton count={3} />}</p>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </SkeletonTheme>
        </>
    )
};