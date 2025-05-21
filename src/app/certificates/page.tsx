import React from 'react';
import { createClient } from '@/../utils/supabase/server';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import CertCard from '@/components/normaluicomponents/certificateCard';
export default async function Certificates() {
    const supabase = await createClient()
    let loading = false;
    const { data: certificate } = await supabase.from('certificate').select('*');
    if(!certificate){
        loading=true
    }    
    return (
        <>
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                    <h1 className="text-center items-center justify-center top-36 tracking-[20px] dark:text-gray-500 sm:text-xl text-3xl lg:text-4xl font-bold p-3">
                        CERTIFICATES</h1>
                {loading && (
                    <div className="p-10 mt-10">
                        <Skeleton height={500} count={1} />
                    </div>)}
                <section className=" body-font">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="flex flex-wrap -m-4 justify-center whitespace-break-spaces">
                            {certificate?.map((cer, index) => (
                                <div className="p-4 md:w-1/3" key={index}>
                                   <CertCard 
                                    link={cer.link}
                                    imageSrc={cer.imageSrc} 
                                    description={cer.description}
                                    title={cer.title}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </SkeletonTheme>
        </>
    )
};