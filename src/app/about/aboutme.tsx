import { createClient } from '@/../utils/supabase/server';
import React from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
export default async function Aboutme() {
    // const supabase = getSupabaseServerComponentClient()
    const supabase = createClient();
    const { data: about } = await supabase.from('about').select('*');
    let loading = false;
    if(!about){
        loading= true;
    }
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
            <SkeletonTheme baseColor="#202020" highlightColor="444444">
                <h1 className="text-center items-center justify-center top-36 tracking-[20px] dark:text-gray-500 lg:text-5xl font-bold text-3xl ml-3">About Me</h1>
                <section className="dark:text-gray-300 body-font overflow-hidden">
                    <div className="container px-5 py-24 mx-auto">
                        <div className="-my-8 divide-y-2 dark:divide-gray-100 px-0 sm:px-20 text-center items-center justify-center">
                            {loading && (<Skeleton count={7} />)}
                            {about?.map((item, index) => (
                                <div key={index} className="py-8 flex flex-wrap md:flex-nowrap text-left md:text-center">
                                    <p className="leading-relaxed lg:text-2xl text-xl">{item.word || ''} {loading && <Skeleton count={7} />}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </SkeletonTheme>
        </>
    )
};