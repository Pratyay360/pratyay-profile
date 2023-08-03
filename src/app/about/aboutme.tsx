import { block } from "million/react";
import { Database } from "../../../utils/database.types";
import supabase from "../../../utils/supabase";
import React from "react";
import { useEffect, useState } from 'react';

const about = block(function Aboutme() {
    const [about, cert] = useState<Database['public']['Tables']['about']['Row'][]>([]);
    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase.from('about').select('*');
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
            <h1 className="text-center items-center justify-center top-36 tracking-[20px] text-gray-500 lg:text-5xl font-bold text-3xl ml-3">About Me</h1>
            <section className="text-gray-300 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="-my-8 divide-y-2 divide-gray-100 px-0 sm:px-20 text-center items-center justify-center">
                       { about.map((item, index) => (
                        <div key={index} className="py-8 flex flex-wrap md:flex-nowrap text-left md:text-center">
                                <p className="leading-relaxed lg:text-2xl text-xl">{item.word || ''}</p> 
                        </div>
                         ))}
                    </div>
                </div>
            </section>
        </>
    )
});
export default about;