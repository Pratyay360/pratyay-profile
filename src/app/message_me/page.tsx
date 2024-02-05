"use client"
import React from "react";
import { Toaster, toast } from 'sonner'
// import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
// import Image from 'next/image';
// import { hydrateRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
import { FormEvent } from 'react'
// import { buildCustomRoute } from "next/dist/build";
export default function Home() {
    const [isClient, setIsClient] = useState(false);
    async function Submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        if (!formData.get("Name") || !formData.get("Email") || !formData.get("Message")) {
            toast.error("Please fill all the fields");
            return;
        }
        else {
            const res = await fetch(
                "https://script.google.com/macros/s/AKfycbys_96t5r_6CfWDqy82ydUK8EfwJ-x98U6O8C0KELyhgvSumggJi_XdIYyiz8R7Ce8/exec",
                {
                    method: "POST",
                    body: formData
                })
                .then((response) => {
                    if (response.status === 200) {
                        const formElement = document.getElementById("form") as HTMLFormElement;
                        if (formElement) {
                            toast.success("Message Sent");
                            formElement.reset();
                        }
                    }
                    else {
                        toast.error("Something went wrong");
                    }
                })
                .catch((error) => {
                    sessionStorage.setItem('error', JSON.stringify(error));
                    location.href = '/errorpage';
                });
        }
    }
    useEffect(() => {
        setIsClient(true);
    }, []);
    
    // solution for hydration error

/*      const domReact = window.document.getElementById("react-root");
        if (domReact) {
        hydrateRoot(domReact, <Home />);
     }
*/

    // was working properly in dev testing but not working in production    T_T 


    return (
        <>
            <h1 className="text-center items-center justify-center p-5 mt-7 top-36 tracking-[20px] text-gray-500 text-2xl lg:text-4xl font-bold">Message Me</h1>
            <section className="text-gray-300 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-10 justify-center whitespace-break-spaces">
                        {/* Form Start Here  */}
                        <div>
                        {isClient ? (
                            <form id="form" className="flex flex-col space-y-5" onSubmit={(e) => Submit(e)}>
                                <label className="font-bold text-lg text-white " >Name</label>
                                <input type="text" name="Name" placeholder="Enter Name" className="border rounded-lg py-3 px-3 mt-2 bg-black border-indigo-600 placeholder-white-500 text-white" />
                                <label className="font-bold text-lg text-white">Email</label>
                                <input type="email" name="Email" id="email" placeholder="example@email.com" className="border rounded-lg py-3 px-3 mt-2 bg-black border-indigo-600 placeholder-white-500 text-white" />
                                <label className="font-bold text-lg text-white " >Message</label>
                                <textarea rows={5} name="Message" placeholder="Enter Your Message" className="border rounded-lg py-3 px-3 mt-2 bg-black border-indigo-600 placeholder-white-500 text-white" />
                                <button className="border border-indigo-600 hover:bg-indigo-600 bg-black text-white rounded-lg py-3 font-semibold px-2" type="submit">Send Message</button>
                            </form>) :
                            ( 
                                <p>Form not working properly Please report to pratyaymustafi@outlook.com</p>
                            )}
                            <Toaster richColors closeButton position="top-right"  />
                        </div>
                        {/* Form End */}
                    </div>
                </div>
            </section>

        </>
    );
}