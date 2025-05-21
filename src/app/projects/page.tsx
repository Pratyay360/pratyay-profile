import React from "react";
import { createClient } from "@/../utils/supabase/server";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProjectCards from "@/components/normaluicomponents/projectCard";
export default async function Projects() {
  let loading = false;
  const supabase = await createClient();
  const { data: project } = await supabase.from("project").select("*");
  if (!project) {
    loading = true;
  }
  return (
    <>
      <SkeletonTheme baseColor="#202020" highlightColor="#444444">
        <h1 className="top-36 p-10 text-center items-center justify-center  tracking-[20px] dark:text-gray-500 lg:text-5xl font-bold text-3xl ml-3">
          Projects By Pratyay Mitra Mustafi
        </h1>
        {loading && (
          <div className="p-10 mt-10">
            <Skeleton count={1} height={500} />
          </div>
        )}
        <section className="dark:text-gray-300 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4 justify-center">
              {project?.map((p, index) => (
                <div className="p-4 md:w-1/3" key={index}>
                  <ProjectCards
                    imageSrc={p.imageSrc}
                    title={p.title}
                    category={p.category}
                    description={p.description}
                    link={p.link}
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
