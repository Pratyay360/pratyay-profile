"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
// import { block } from 'million/react';
export default function Navbar() {
    const [darkValue, setDarkValue] = useState(false);
    useEffect(() => {
        try {
            if (localStorage.getItem("DARK")) {
                setDarkValue(true);
            } else {
                setDarkValue(false)
            }
        } catch (err) {
            console.log(err);
        }
    }, [])
    return (
        <div className="sticky top-0 z-30">
            <header className={darkValue ? "border-gray-200 backdrop-opacity-10 backdrop-blur-xl bg-slate-900 opacity-80" : "backdrop-opacity-10 backdrop-blur-xl opacity-80 bg-yellow-200 backdrop-brightness-75"}>
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center" >
                    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center justify-center text-xl">
                        <Link href="/#aboutme">
                            <span className={darkValue ? "mr-5 text-white hover:text-gray-500 cursor-pointer" : "mr-5 text-black hover:text-gray-300 cursor-pointer"}>About Me</span>
                        </Link>
                        <Link href="/#education">
                            <span className={darkValue ? "mr-5 text-white hover:text-gray-500 cursor-pointer" : "mr-5 text-black hover:text-gray-300 cursor-pointer"}>Education</span>
                        </Link>
                        <Link href="/#skills">
                            <span className={darkValue ? "mr-5 text-white hover:text-gray-500 cursor-pointer" : "mr-5 text-black hover:text-gray-300 cursor-pointer"}>Skills</span>
                        </Link>
                        <Link href="/#certificate">
                            <span className={darkValue ? "mr-5 text-white hover:text-gray-500 cursor-pointer" : "mr-5 text-black hover:text-gray-300 cursor-pointer"}>Certificates</span>
                        </Link>
                        <Link href="/#projects">
                            <span className={darkValue ? "mr-5 text-white hover:text-gray-500 cursor-pointer" : "mr-5 text-black hover:text-gray-300 cursor-pointer"}>Projects</span>
                        </Link>
                        <Link href="/#blogs">
                            <span className={darkValue ? "mr-5 text-white hover:text-gray-500 cursor-pointer" : "mr-5 text-black hover:text-gray-300 cursor-pointer"}>Blogs</span>
                        </Link>
                        <Link href="/#resume">
                            <span className={darkValue ? "mr-5 text-white hover:text-gray-500 cursor-pointer" : "mr-5 text-black hover:text-gray-300 cursor-pointer"}>Resume</span>
                        </Link>
                        <Link href="/#donate">
                            <span className={darkValue ? "mr-5 text-white hover:text-gray-500 cursor-pointer" : "mr-5 text-black hover:text-gray-300 cursor-pointer"}>Donate</span>
                        </Link>
                        <Link href="/#contact">
                            <span className={darkValue ? "mr-5 text-white hover:text-gray-500 cursor-pointer" : "mr-5 text-black hover:text-gray-300 cursor-pointer"}>Contact Me</span>
                        </Link>
                    </nav>
                </div>
            </header>
        </div>
    )
};