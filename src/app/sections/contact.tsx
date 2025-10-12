import React from "react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ImageCard } from "@/components/normaluicomponents/generalUiComponent";

export default async function Contact() {
  const supabase = await createClient();
  let loading = false;
  const { data: social_link } = await supabase.from("social_link").select("*");
  if (!social_link) {
    loading = true;
  }
  return (
    <>
      <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
        <h1 className="text-center items-center justify-center top-36 tracking-[20px]  text-3xl lg:text-4xl font-bold">
          CONTACT ME
        </h1>
        {/*  */}
        {loading && (
          <div className="p-10 mt-10">
            <Skeleton count={1} height={40} />
          </div>
        )}
        {/* <div className="flex flex-wrap px-2 sm:px-10 text-center items-center justify-center overflow-auto "> */}
            <div className="p-2 relative flex-auto flex-wrap overflow-auto" >
              <Dock  direction="middle" magnification={60} distance={100}>
            {social_link?.map((item, index) => (
            // <div key={index} className="cont mr-4 mb-10 mt-10 transform-gpu transition-all hover:scale-125" style={{ marginRight: "10px" }}>               
            <DockIcon key={index} className="bg-black/10 dark:bg-white/10 p-3">
            <ImageCard
                  image={item.image}
                  link={item.link}
                  name={item.name}
                  />
            </DockIcon>
            // </div>
        ))}
        </Dock>
        </div>
        <div className="flex fles-wrap text-center items-center justify-center p-10">
          <Link href="/message_me">
            <button className="border border-indigo-600 hover:bg-indigo-600 dark:bg-white text-3xl dark:text-black font-bold py-2 px-4 rounded-full">
              Message Me
            </button>
          </Link>
        </div>
      </SkeletonTheme>
    </>
  );
}
