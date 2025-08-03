import React from "react";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "@/styles/button.css";
import CertCard from "@/components/normaluicomponents/certificateCard";
export default async function Certificates() {
  const supabase = await createClient();
  let loading = false;
  const { data: certificate } = await supabase.from("certificate").select("*");
  const a = certificate?.length ?? 0;
  if (!certificate) {
    loading = true;
  }
  return (
    <>
      <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
        <div className="flex flex-column text-center items-center justify-center">
          <h1 className="text-center items-center justify-center top-36 tracking-[20px] text-2xl/3 lg:text-4xl font-bold p-3 m-2 overflow-auto">
            CERTIFICATES
          </h1>
        </div>
        {loading && (
          <div className="p-10 mt-10">
            <Skeleton height={500} count={1} />
          </div>
        )}
        <section className="body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4 justify-center whitespace-break-spaces">
              {a <= 3
                ? certificate?.map((cer, index) => (
                    <div className="p-4 md:w-1/3" key={index}>
                      <CertCard
                        link={cer.link}
                        imageSrc={cer.imageSrc}
                        description={cer.description}
                        title={cer.title}
                      />
                    </div>
                  ))
                : certificate?.slice(0, 3).map((cer, index) => (
                    <div className="p-4 md:w-1/3" key={index}>
                      <CertCard
                        link={cer.link}
                        imageSrc={cer.imageSrc}
                        description={cer.description}
                        title={cer.title}
                      />
                      {!loading && (
                        <center>
                          <Link href="/certificates">
                            <button className="button-30" role="button_more_certificate">
                              See More
                            </button>
                          </Link>
                        </center>
                      )}
                    </div>
                  ))}
            </div>
          </div>
        </section>
      </SkeletonTheme>
    </>
  );
}
