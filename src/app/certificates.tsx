import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@/utils/db/server";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CertCard from "@/components/normaluicomponents/certificateCard";
import { createServerFn } from "@tanstack/react-start";

const fetchCertificates = createServerFn().handler(async () => {
  const supabase = await createClient();
  const { data } = await supabase.from("certificate").select("*");
  return data ?? [];
});

export const Route = createFileRoute("/certificates")({
  component: CertificatesPage,
  loader: async () => {
    const certificates = await fetchCertificates();
    return { certificates };
  },
});

function CertificatesPage() {
  const { certificates } = Route.useLoaderData();

  return (
    <>
      <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
        <h1 className="text-center items-center justify-center top-36 tracking-[20px] sm:text-xl text-3xl lg:text-4xl font-bold p-3">
          CERTIFICATES
        </h1>
        <section className="body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4 justify-center whitespace-break-spaces">
              {certificates.map((cer: any, index: number) => (
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
  );
}
