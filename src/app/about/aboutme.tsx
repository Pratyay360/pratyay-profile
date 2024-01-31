// import { block } from "million/react";
import { Database } from "../../../utils/database.types";
import supabase from "../../../utils/supabase";
import React from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useEffect, useState } from 'react';
// const about = block(function Aboutme() {
    export default function Aboutme() {    
    const[loading, setLoading] = useState(true);
    const [about, cert] = useState<Database['public']['Tables']['about']['Row'][]>([]);
    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase.from('about').select('*');
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
        <script>
                console.log(`                                                                                       
    \n*@@@***@@m     *@@@***@@m        @@      @@@**@@**@@@     *@@@*   *@@*      @@      *@@@*   *@@*
    \n  @@   *@@      @@   *@@m      m@@m     @*   @@   *@       @@@   m@       m@@m       @@@   m@  
    \n  @@   m@@       @@   m@@      m@*@@!         @@             @@@ m@       m@*@@!       @@@ m@   
    \n  @@@@@@@        !@@@@@@      m@  *@@         !@              @!@@       m@  *@@        @!@@    
    \n  @@             !@  @@m      @@@!@!@@        !@               !@        @@@!@!@@        !@     
    \n  @!             !@   *!@    !*      @@       !@               !@       !*      @@       !@     
    \n  @!             !@  ! !!     !!!!@!!@        !@               !@        !!!!@!!@        !@     
    \n  !!             !!   *!!!   !*      !!       !!               !!       !*      !!       !! 
    `);
        </script>
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <h1 className="text-center items-center justify-center top-36 tracking-[20px] text-gray-500 lg:text-5xl font-bold text-3xl ml-3">About Me</h1>
            <section className="text-gray-300 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="-my-8 divide-y-2 divide-gray-100 px-0 sm:px-20 text-center items-center justify-center">
                       {loading && (<Skeleton count={7}/>)}                      
                       { about.map((item, index) => (
                        <div key={index} className="py-8 flex flex-wrap md:flex-nowrap text-left md:text-center">
                                <p className="leading-relaxed lg:text-2xl text-xl">{item.word || ''} {loading && <Skeleton count={7}/>}</p> 
                        </div>
                         ))}
                    </div>
                </div>
            </section>
            </SkeletonTheme>
        </>
    )
};
// export default about;