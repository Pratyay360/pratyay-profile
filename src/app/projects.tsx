import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@/utils/db/server";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProjectCards from "@/components/normaluicomponents/projectCard";
import { createServerFn } from "@tanstack/react-start";

const fetchProjects = createServerFn().handler(async () => {
  const supabase = await createClient();
  const { data } = await supabase.from("project").select("*");
  return data ?? [];
});

export const Route = createFileRoute("/projects")({
  component: ProjectsPage,
  loader: async () => {
    const projects = await fetchProjects();
    return { projects };
  },
});

function ProjectsPage() {
  const { projects } = Route.useLoaderData();

  return (
    <>
      <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
        <h1 className="top-36 p-10 text-center items-center justify-center tracking-[20px] lg:text-5xl font-bold text-3xl ml-3">
          Projects By Pratyay Mitra Mustafi
        </h1>
        <section className="body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4 justify-center">
              {projects.map((p: any, index: number) => (
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
