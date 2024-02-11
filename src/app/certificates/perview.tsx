import React from 'react';
import { useEffect, useState } from 'react';
import { Database } from '../../../utils/database.types';
import Image from 'next/image';
import supabase from '../../../utils/supabase';
// import { block } from 'million/react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import '../stylesheet.css';
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
    const a = certificate.length;
    const [darkValue, setDarkValue] = useState(false);
    useEffect(()=>{
        try{
            if(sessionStorage.getItem("DARK")){
                        setDarkValue(true);
                }else{
                    setDarkValue(false)
                }
        }catch(err){
            console.log(err);
        }
    },[darkValue])
    return (
        <>
            <SkeletonTheme baseColor={darkValue? "#202020":"#A5A5A5"} highlightColor={darkValue?"444444":"#8e8e8e"}>
                <div className="flex flex-column text-center items-center justify-center">
                    <h1 className={darkValue?"top-36 tracking-[20px] text-gray-500 lg:text-4xl font-bold ml-2 pb-10 whitespace-break-spaces":"top-36 tracking-[20px] text-gray-900 lg:text-4xl font-bold ml-2 pb-10 whitespace-break-spaces"}>CERTIFICATES</h1>
                </div>
                {loading && (
                    <div className="p-10 mt-10">
                        <Skeleton height={500} count={1} />
                    </div>)}
                <section className={darkValue?"text-gray-300 body-font":"text-gray-900 body-font"}>
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-wrap -m-4 justify-center whitespace-break-spaces">
                            {a <= 3 ? certificate.map((c, index) => (
                            <div className="p-4 md:w-1/3" key={index}>
                                <a href={c.link || ''} className="block" target="_blank">
                                    <div className={darkValue?"h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden transform transition-all hover:scale-110 ":"h-full border-2 border-black border-opacity-60 rounded-lg overflow-hidden transform transition-all hover:scale-110 bg-gray-300"}>
                                        <Image
                                            className="lg:h-48 md:h-36 w-full object-cover object-center"
                                            src={c.imageSrc || ''}
                                            alt={c.title || ''}
                                            width={350}
                                            height={250}
                                        />
                                        {loading && <Skeleton width={350} height={250} />}
                                        <div className="p-6">
                                            <h1 className={darkValue?"title-font text-lg font-medium text-gray-300 mb-3":"title-font text-lg font-medium text-gray-900 mb-3"}>
                                                {c.title}{loading && <Skeleton count={1} />}
                                            </h1>
                                            <p className={darkValue?"leading-relaxed mb-3":"leading-relaxed mb-3 text-gray-800"}>{c.description}
                                                {loading && <Skeleton count={3} />}
                                            </p>
                                        </div>
                                    </div>
                                </a>
                            </div>)) : certificate.slice(0, 3).map((c, index) => (
                                <div className="p-4 md:w-1/3" key={index}>
                                    <a href={c.link || ''} className="block" target="_blank">
                                        <div className={darkValue?"h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden transform transition-all hover:scale-110 ":"h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden transform transition-all hover:scale-110 bg-gray-300"}>
                                            <Image
                                                className="lg:h-48 md:h-36 w-full object-cover object-center"
                                                src={c.imageSrc || ''}
                                                alt={c.title || ''}
                                                width={350}
                                                height={250}
                                            />
                                            {loading && <Skeleton width={350} height={250} />}
                                            <div className="p-6">
                                                <h1 className={darkValue?"title-font text-lg font-medium text-gray-300 mb-3":"title-font text-lg font-medium text-gray-900 mb-3"}>
                                                    {c.title}{loading && <Skeleton count={1} />}
                                                </h1>
                                                <p className={darkValue?"leading-relaxed mb-3":"leading-relaxed mb-3 text-gray-800"}>{c.description}
                                                    {loading && <Skeleton count={3} />}
                                                </p>
                                            </div>
                                        </div>
                                    </a>
                                    {!loading && <center><a href="/certificates"><button className="button-30" role="button">See More</button></a></center>}
                                </div>
                                ))}
                        </div>
                    </div>
                </section>
            </SkeletonTheme>
        </>
    )
};