import { createClient } from '@/../utils/supabase/server';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import "../stylesheet.css";
import ProjectCards from '../../components/normaluicomponents/projectCard';
export default async function Projects() {
  const supabase = createClient()
  let loading = false;
  const { data: project } = await supabase.from("project").select("*");
  if (!project) {
    loading = true;
  }

  return (
    <>
      <SkeletonTheme baseColor="#202020" highlightColor="#444444">
        <h1 className="text-center items-center justify-center top-36 tracking-[20px] dark:text-gray-500 text-3xl lg:text-4xl font-bold">
          PROJECTS
        </h1>
        {loading && (
          <div className="p-10 mt-10">
            <Skeleton count={1} height={500} />
          </div>
        )}
        <section className="dark:text-gray-300 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4 justify-center">
              {project?.slice(0, 3).map((proj, index) => (
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
              <Link href="/projects">
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
