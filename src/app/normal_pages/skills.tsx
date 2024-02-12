import React from 'react';
import { useEffect, useState } from 'react';
import { Database } from '../../../utils/database.types';
import Image from 'next/image';
import supabase from '../../../utils/supabase';
import Link from 'next/link';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
export default function Skills() {
    const [technology, setTechnology] = useState<Database['public']['Tables']['technology']['Row'][]>([]);
    const[loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase.from('technology').select('*');
            if (error) {
                console.log(error)    
            } else {
                setTechnology(data);
                setLoading(false);
            }
        }
        fetchData();
    }, []);
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
    },[])
    return (
        <>
        <SkeletonTheme baseColor={darkValue? "#202020":"#A5A5A5"} highlightColor={darkValue?"444444":"#8e8e8e"}>
                <h1 className={darkValue?"text-center items-center justify-center top-36 tracking-[20px] text-gray-500 text-3xl lg:text-4xl font-bold":"text-center items-center justify-center top-36 tracking-[20px] text-gray-900 text-3xl lg:text-4xl font-bold"}>
                SKILLS
                </h1>
            {loading && (<div className="p-10 mt-10">
                    <Skeleton count={1} height={40}/>
                    </div>)}  
            <div className="flex flex-wrap text-center px-2 sm:px-10 items-center justify-center ">              
                {technology.map((item, index) => (
                    <div key={index} className={darkValue?"cont mr-4 mb-10 mt-10 transform-gpu transition-all hover:scale-125":"cont mr-4 mb-10 mt-10 transform-gpu transition-all hover:scale-125 drop-shadow-2xl"}>
                        <Link href={item.href || ''} target="_blank">
                            <Image
                                src={item.src || ''}
                                alt={item.name || ''}
                                width={40}
                                height={40}
                            />
                            {loading && <Skeleton width={40} height={40} />}
                        </Link>
                    </div>
                ))}
            </div>
            </SkeletonTheme>
        </>
    );
};