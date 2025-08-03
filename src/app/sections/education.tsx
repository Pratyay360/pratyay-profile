import React from "react";
import { createClient } from '@/utils/supabase/server';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { EducationCard } from "@/components/normaluicomponents/generalUiComponent";
export default async function Education() {
  const supabase = await createClient();
  let loading = false;
  const { data: education } = await supabase
    .from("education")
    .select("*")
    .order("date_from", { ascending: false });
  if (!education) {
    loading = true;
  }
  return (
    <>
      <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
        <h1 className="text-center items-center justify-center top-36 tracking-[20px]  text-3xl lg:text-4xl font-bold p-3">
          EDUCATION
        </h1>
        <section className=" body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto items-center justify-center">
            <div className="-my-8 divide-y-2  px-0 sm:px-20 items-center justify-center">
              {loading && <Skeleton count={7} />}
              {education?.map((edu, index) => (
                <div key={index} className="py-8 flex flex-wrap md:flex-nowrap">
                  <EducationCard 
                  title={edu.title}
                  category={edu.category}
                  date_from={edu.date_from}
                  date_to={edu.date_to}
                  description={edu.description}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </SkeletonTheme>
    </>
  );
}
