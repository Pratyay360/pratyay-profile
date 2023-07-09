"use client"
import React from 'react';

function Resume() {
    const handleDownload = () => {
        window.open("https://drive.google.com/file/d/1Kb_cOhevNgiif-lV3LPJFPjStCKEd0dt/view?usp=sharing", "_blank");
    };

    return (
        <>
            <h1 className="text-center items-center justify-center top-36 tracking-[20px] text-gray-500 text-3xl">RESUME</h1>
            <div className="text-center items-center justify-center top-36 backdrop-blur-30 py-20 ">
                <button onClick={handleDownload} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                    <span>Download Resume</span>
                </button>
            </div>
        </>
    );
}

export default Resume;