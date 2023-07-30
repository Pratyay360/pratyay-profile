import React from 'react';
import { useEffect, useState } from 'react';
import { Database } from '../../../utils/database.types';
import Image from 'next/image';
import supabase from '../../../utils/supabase';
import { block } from 'million/react'
const a = block(function Certificates() {
    const [certificate, cert] = useState<Database['public']['Tables']['certificate']['Row'][]>([]);
    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase.from('certificate').select('*');
            if (error) {
                console.error(error);
            } else {
                cert(data);
            }
        }
        fetchData();
    }, []);
    return (
        <>
            <div className="flex flex-column text-center items-center justify-center lg:text-3xl">
                <h1 className="top-36 tracking-[20px] text-gray-500 ml-2 pb-10">CERTIFICATES</h1>
            </div>
            <section className="text-gray-300 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {certificate.map((c, index) => (
                            <div className="p-4 md:w-1/3" key={index}>
                                <a href={c.link || ''} className="block" target="_blank" rel="noopener noreferrer">
                                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden transform transition-all hover:scale-110 ">
                                        <Image
                                            className="lg:h-48 md:h-36 w-full object-cover object-center"
                                            src={c.imageSrc || ''}
                                            alt={c.title || ''}
                                            width={350}
                                            height={250}
                                        />
                                        <div className="p-6">
                                            <h1 className="title-font text-lg font-medium text-gray-300 mb-3">
                                                {c.title}
                                            </h1>
                                            <p className="leading-relaxed mb-3">{c.description}</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
});
export default a;