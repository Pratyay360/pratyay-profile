import React from "react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { createClient } from "@/utils/supabase/server";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ImageCard } from "@/components/normaluicomponents/generalUiComponent";
export default async function Skills() {
  const supabase = await createClient();
  let loading = false;
  let error = null;
  
  const { data: technology, error: fetchError } = await supabase.from("technology").select("*");
  
  if (fetchError) {
    console.error('Error fetching skills:', fetchError);
    error = fetchError;
  }
  
  if (!technology || technology.length === 0) {
    loading = true;
  }
  return (
    <>
      <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
        <h1 className="text-center items-center justify-center top-36 tracking-[20px] text-3xl lg:text-4xl font-bold" role="heading" aria-level={1}>
          SKILLS
        </h1>
        {error && (
          <div className="p-10 mt-10 text-center text-red-500">
            <p>Unable to load skills at the moment. Please try again later.</p>
          </div>
        )}
        {loading && !error && (
          <div className="p-10 mt-10">
            <Skeleton count={1} height={40} />
          </div>
        )}
        {/* <div className="flex flex-wrap text-center px-2 sm:px-10 items-center justify-center overflow-auto"> */}
        <div className="p-2 relative flex-auto flex-wrap overflow-auto">
          <Dock direction="middle" magnification={60} distance={100}>
            {technology?.map((item, index) => (
              //    <div key={index} className="cont mr-4 mb-10 mt-10 transform-gpu transition-all hover:scale-125">
              <DockIcon
                key={index}
                className="bg-black/10 dark:bg-white/10 p-3"
              >
                <ImageCard link={item.href} image={item.src} name={item.name} />
              </DockIcon>
              //      </div>
            ))}
          </Dock>
        </div>
        {/* </div> */}
      </SkeletonTheme>
    </>
  );
}
