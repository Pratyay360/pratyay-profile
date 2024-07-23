import React from "react";
import { createClient } from '@/../utils/supabase/server';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { EducationCard } from "./cards";
export default async function Education() {
  const supabase = createClient();
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
      <SkeletonTheme baseColor="#202020" highlightColor="#444444">
        <h1 className="text-center items-center justify-center top-36 tracking-[20px] dark:text-gray-500 text-3xl lg:text-4xl font-bold p-3">
          EDUCATION
        </h1>
        <section className="dark:text-gray-300 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto items-center justify-center">
            <div className="-my-8 divide-y-2 dark:divide-gray-100 px-0 sm:px-20 items-center justify-center">
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
