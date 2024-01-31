import React from 'react';
import { useEffect, useState } from 'react';
import { Database } from '../../../utils/database.types';
import supabase from '../../../utils/supabase';
// import { block } from 'million/react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
export default function Education() {
    const [education, cert] = useState<Database['public']['Tables']['education']['Row'][]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase.from('education').select('*').order('date_from', { ascending: false });
            if (error) {
                sessionStorage.setItem('error', JSON.stringify(error));
                location.href = '/errorpage';    
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
                <h1 className="text-center items-center justify-center top-36 tracking-[20px] text-gray-500 lg:text-4xl font-bold text-2xl ml-3 pt-30">EDUCATION</h1>
                <section className="text-gray-300 body-font overflow-hidden">
                    <div className="container px-5 py-24 mx-auto items-center justify-center">
                        <div className="-my-8 divide-y-2 divide-gray-100 px-0 sm:px-20 items-center justify-center">
                        {loading && <Skeleton count={7}/>}
                            {education.map((item, index) => (
                                <div key={index} className="py-8 flex flex-wrap md:flex-nowrap">
                                    <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                                        <span className="font-semibold title-font text-gray-200 text-2xl">{item.category || ''} {loading && <Skeleton count={1} />}</span>
                                        <span className="mt-1 text-gray-400 text-md">{item.date_from || ''}-{item.date_to || ''}  {loading && <Skeleton count={1} />}</span>
                                    </div>
                                    <div className="md:flex-grow">
                                        <h2 className="font-medium text-gray-100 text-2xl title-font mb-2">{item.title || ''} {loading && <Skeleton count={1} />}</h2>
                                        <p className="leading-relaxed text-xl text-gray-300">{item.description || ''}{loading && <Skeleton count={3} />}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </SkeletonTheme>
        </>
    )
};