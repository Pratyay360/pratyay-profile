import React from 'react';
import { useEffect, useState } from 'react';
import { Database } from '../../../utils/database.types';
import supabase from '../../../utils/supabase';
import { block } from 'million/react'
const a = block(function Education() {
    const [education, cert] = useState<Database['public']['Tables']['education']['Row'][]>([]);
    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase.from('education').select('*').order('date_from', { ascending: false });
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
        <h1 className="text-center items-center justify-center top-36 tracking-[20px] text-gray-500 lg:text-3xl text-2xl ml-3 pt-30">EDUCATION</h1>
            <section className="text-gray-300 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto items-center justify-center">
                    <div className="-my-8 divide-y-2 divide-gray-100 px-0 sm:px-20 items-center justify-center">
                        {education.map((item, index) => (
                            <div key={index} className="py-8 flex flex-wrap md:flex-nowrap">
                                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                                    <span className="font-semibold title-font text-gray-200">{item.category || ''}</span>
                                    <span className="mt-1 text-gray-500 text-sm">{item.date_from || ''}-{item.date_to || ''}</span>
                                </div>
                                <div className="md:flex-grow">
                                    <h2 className="font-medium text-gray-100 title-font mb-2">{item.title || ''}</h2>
                                    <p className="leading-relaxed">{item.description || ''}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
});
export default a;