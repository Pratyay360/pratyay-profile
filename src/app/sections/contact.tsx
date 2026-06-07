"use client";

import { useState, useEffect } from "react";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { createClient } from "@/utils/db/server";
import { Link } from "@tanstack/react-router";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ImageCard } from "@/components/normaluicomponents/generalUiComponent";

export default function Contact() {
  const [socialLinks, setSocialLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSocialLinks() {
      try {
        const supabase = await createClient();
        const { data } = await supabase.from("social_link").select("*");
        if (data) setSocialLinks(data);
      } catch (err) {
        console.error("Error fetching social links:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSocialLinks();
  }, []);

  return (
    <>
      <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
        <h1 className="text-center items-center justify-center top-36 tracking-[20px] text-3xl lg:text-4xl font-bold">
          CONTACT ME
        </h1>
        {loading && (
          <div className="p-10 mt-10">
            <Skeleton count={1} height={40} />
          </div>
        )}
        <div className="p-2 relative flex-auto flex-wrap overflow-auto">
          <Dock direction="middle" magnification={60} distance={100}>
            {socialLinks.map((item, index) => (
              <DockIcon key={index} className="bg-black/10 dark:bg-white/10 p-3">
                <ImageCard image={item.image} link={item.link} name={item.name} />
              </DockIcon>
            ))}
          </Dock>
        </div>
        <div className="flex fles-wrap text-center items-center justify-center p-10">
          <Link to="/message_me">
            <button className="border border-indigo-600 hover:bg-indigo-600 dark:bg-white text-3xl dark:text-black font-bold py-2 px-4 rounded-full">
              Message Me
            </button>
          </Link>
        </div>
      </SkeletonTheme>
    </>
  );
}
