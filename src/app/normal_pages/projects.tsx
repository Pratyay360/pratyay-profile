import React from 'react';
import { useEffect, useState } from 'react';
import { Database } from '../../../utils/database.types';
import Image from 'next/image';
import supabase from '../../../utils/supabase';
import { block } from 'million/react'
const a = block(function Projects() { 
    const [project, cert] = useState<Database['public']['Tables']['project']['Row'][]>([]);
    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase.from('project').select('*');
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
         <h1 className="text-center items-center justify-center top-36 tracking-[20px] text-gray-500 text-3xl">PROJECTS</h1>
            <section className="text-gray-300 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {project.map((card, index) => (
                            <div className="p-4 md:w-1/3" key={index}>
                                <a href={card.link|| ''} className="block" target="_blank" rel="noopener noreferrer">
                                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden transform transition-all hover:scale-110 ">
                                        <Image
                                            className="lg:h-48 md:h-36 w-full object-cover object-center"
                                            src={card.imageSrc || ''}
                                            alt={card.title || ''}
                                            width={300}
                                            height={200}
                                        />
                                        <div className="p-6">
                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                                {card.category || ''}
                                            </h2>
                                            <h1 className="title-font text-lg font-medium text-gray-300 mb-3">
                                                {card.title || ''}
                                            </h1>
                                            <p className="leading-relaxed mb-3">{card.description || ''}</p>
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