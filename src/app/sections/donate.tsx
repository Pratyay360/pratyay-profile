"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/db/server";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { DonationCard } from "@/components/normaluicomponents/generalUiComponent";

export default function Donate() {
  const [donation, setDonation] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDonations() {
      try {
        const supabase = await createClient();
        const { data } = await supabase.from("donation").select("*");
        if (data) setDonation(data);
      } catch (err) {
        console.error("Error fetching donations:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDonations();
  }, []);

  return (
    <>
      <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
        <h1 className="text-center items-center justify-center top-36 tracking-[20px] text-3xl lg:text-4xl font-bold">
          Want To Support My Work
        </h1>
        {loading && (
          <div className="p-10 mt-10">
            <Skeleton count={1} height={500} />
          </div>
        )}
        <section className="body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4 justify-center">
              {donation.map((donation, index) => (
                <div className="p-4 md:w-1/3" key={index}>
                  <DonationCard name={donation.name} image={donation.image} link={donation.link} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </SkeletonTheme>
    </>
  );
}
