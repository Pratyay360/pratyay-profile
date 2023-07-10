"use client"
import React from "react";
import data from './technology.json'
export default function Skills() {
    return (
        <>
            <h1 className="text-center items-center justify-center top-36 tracking-[20px] text-gray-500 text-3xl">
                SKILLS
            </h1>
            <div className="flex flex-wrap text-center items-center justify-center ">
                {data.map((item, index) => (
                    <div key={index} className="cont mr-4 mb-10 mt-10 transform-gpu transition-all hover:scale-125" style={{ marginRight: "10px" }}>
                        <a href={item.href} target="_blank" rel="noreferrer">
                            <img
                                src={item.src}
                                alt={item.alt}
                                width={40}
                                height={40}
                            />
                        </a>
                    </div>
                ))}
            </div>
        </>
    );
}
