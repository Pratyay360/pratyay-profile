import React from 'react';
import { useEffect, useState } from 'react';
import { Database } from '../../../utils/database.types';
import Image from 'next/image';
import supabase from '../../../utils/supabase';
import Link from 'next/link';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
export default function Donate() {
    const [donate, setDonate] = useState<Database['public']['Tables']['donation']['Row'][]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase.from('donation').select('*');
            if (error) {
                console.log(error)
            } else {
                setDonate(data);
                setLoading(false);
            }
        }
        fetchData();
    }, []);
    
    return (
        <>
            <SkeletonTheme baseColor="#202020" highlightColor="#444444">
                <h1 className="text-center items-center justify-center top-36 tracking-[20px] dark:text-gray-500 text-3xl lg:text-4xl font-bold">Want To Support My Work</h1>
                {loading && ((<div className="p-10 mt-10">
                    <Skeleton count={1} height={500} />
                </div>))}
                <section className="dark:text-gray-300 body-font">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-wrap -m-4 justify-center">
                            {donate.map((card, index) => (
                                <div className="p-4 md:w-1/3" key={index}>
                                    <Link href={card.link || ''} target="_blank">
                                        <div className="h-full overflow-hidden transform transition-all hover:scale-110">
                                            <Image
                                                className="lg:h-48 md:h-36 w-full object-center"
                                                src={card.image || ''}
                                                alt={card.name || ''}
                                                width={200}
                                                height={45}
                                            />
                                            {loading && <Skeleton width={200} height={50} />}
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section >
            </SkeletonTheme >

        </>
    );
};