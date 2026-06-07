"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/db/server";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "@tanstack/react-router";
import ProjectCards from "../../components/normaluicomponents/projectCard";

export default function Projects() {
  const [project, setProject] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const supabase = await createClient();
        const { data } = await supabase.from("project").select("*");
        if (data) setProject(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <>
      <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
        <h1 className="text-center items-center justify-center top-36 tracking-[20px] text-3xl lg:text-4xl font-bold">
          PROJECTS
        </h1>
        {loading && (
          <div className="p-10 mt-10">
            <Skeleton count={1} height={500} />
          </div>
        )}
        <section className="body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4 justify-center">
              {project.slice(0, 3).map((proj, index) => (
                <div className="p-4 md:w-1/3" key={index}>
                  <ProjectCards
                    imageSrc={proj.imageSrc}
                    title={proj.title}
                    category={proj.category}
                    description={proj.description}
                    link={proj.link}
                  />
                </div>
              ))}
            </div>
          </div>
          {!loading && (
            <center>
              <Link to="/projects">
                <button className="button-30" role="button_open_projects">
                  See More
                </button>
              </Link>
            </center>
          )}
        </section>
      </SkeletonTheme>
    </>
  );
}
