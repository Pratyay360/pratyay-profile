import React, { useEffect, useState } from 'react';
import { Database } from '../../../utils/database.types';
import Image from 'next/image';
import supabase from '../../../utils/supabase';
// import { block } from 'million/react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import Link from 'next/link';
import '../stylesheet.css';
export default function Projects() {
    const [project, setProject] = useState<Database['public']['Tables']['project']['Row'][]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase.from('project').select('*');
            if (error) {
                console.log(error)
            } else {
                setProject(data)
                setLoading(false)
            }
        }
        fetchData();
    }, []);
    const [darkValue, setDarkValue] = useState(false);
    useEffect(() => {
        try {
            if (localStorage.getItem("DARK")) {
                setDarkValue(true);
            } else {
                setDarkValue(false)
            }
        } catch (err) {
            console.log(err);
        }
    }, [])
    return (
        <div className={darkValue ? "" : "bg-yellow-100"}>
            <SkeletonTheme baseColor={darkValue ? "#202020" : "#A5A5A5"} highlightColor={darkValue ? "444444" : "#8e8e8e"}>
                <h1 className={darkValue ? "text-center items-center justify-center top-36 tracking-[20px] text-gray-500 text-3xl lg:text-4xl font-bold" : "text-center items-center justify-center top-36 tracking-[20px] text-gray-900 text-3xl lg:text-4xl font-bold"}>PROJECTS</h1>
                {loading && ((<div className="p-10 mt-10">
                    <Skeleton count={1} height={500} />
                </div>))}
                <section className={darkValue ? "text-gray-300 body-font" : "text-gray-900 body-font"}>
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-wrap -m-4 justify-center">
                            {project.slice(0, 3).map((card, index) => (
                                <div className="p-4 md:w-1/3" key={index}>
                                    <Link href={card.link || ''} className="block" target="_blank">
                                        <div className={darkValue ? "h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden transform transition-all hover:scale-110 " : "h-full border-2 border-black border-opacity-60 rounded-lg overflow-hidden transform transition-all hover:scale-110 bg-gray-300"}>
                                            <Image
                                                className="lg:h-48 md:h-36 w-full object-cover object-center"
                                                src={card.imageSrc || ''}
                                                alt={card.title || ''}
                                                width={300}
                                                height={200}
                                            />
                                            {loading && <Skeleton width={300} height={200} />}
                                            <div className="p-6">
                                                <h2 className={darkValue ? "tracking-widest text-xs title-font font-medium text-gray-400 mb-1" : "tracking-widest text-xs title-font font-medium text-gray-800 mb-1"}>
                                                    {card.category || ''}
                                                    {loading && <Skeleton count={1} />}
                                                </h2>
                                                <h1 className={darkValue ? "title-font text-lg font-medium text-gray-300 mb-3" : "title-font text-lg font-medium text-gray-900 mb-3"}>
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
                    {!loading && <center><Link href="/projects"><button className="button-30" role="button">See More</button></Link></center>}
                </section>
            </SkeletonTheme>
        </div>
    )
};