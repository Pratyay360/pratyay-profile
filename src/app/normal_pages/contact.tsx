"use client"
import React from 'react';
import { useEffect, useState } from 'react';
import { Database } from '../../../utils/database.types';
import Image from 'next/image';
import supabase from '../../../utils/supabase';
import { block} from 'million/react'
const a = block(function Contact() {
    const [social_link, social] = useState<Database['public']['Tables']['social_link']['Row'][]>([]);
    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase.from('social_link').select('*');
            if (error) {
                console.error(error);
            } else {
                social(data);
            }
        }
        fetchData();
    }, []);
    return (
        <>
            <h1 className="text-center shrink items-center justify-center top-36 tracking-[20px] text-gray-500 text-3xl mr-2 ml-2 pb-10">CONTACT ME</h1>
            {/*  */}
            <div className="flex flex-wrap text-center items-center justify-center ">
                {social_link.map((item, index) => (
                    <div key={index} className="cont mr-4 mb-10 mt-10 transform-gpu transition-all hover:scale-125" style={{ marginRight: "10px" }}>
                        <a href={item.link || ''} target="_blank" rel="noreferrer">
                            <Image
                                src={item.image || ''}
                                alt={item.name || ''}
                                width={35}
                                height={35}
                            />
                        </a>
                    </div>
                ))}
            </div>
        </>
    );
});
export default a;