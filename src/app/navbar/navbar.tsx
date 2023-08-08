import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { block } from 'million/react';
const nav =  block(function Navbar() {
    return (
        <div className="sticky top-0 z-50 backdrop-saturate-200 opacity-70">
            <header className="text-white-600 border-gray-200 bg-zinc-950">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center backdrop-filter backdrop-blur-3xl" >
                    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                        <Link href="#aboutme">
                            <span className="mr-5 text-text-white hover:text-gray-500 cursor-pointer">About Me</span>
                        </Link>
                        <Link href="#education">
                            <span className="mr-5 text-white hover:text-gray-500 cursor-pointer">Education</span>
                        </Link>
                        <Link href="#skills">
                            <span className="mr-5 text-white hover:text-gray-500 cursor-pointer">Skills</span>
                        </Link>
                        <Link href="#certificate">
                            <span className="mr-5 text-white hover:text-gray-500 cursor-pointer">Certificates</span>
                        </Link>
                        <Link href="#projects">
                            <span className="mr-5 text-white hover:text-gray-500 cursor-pointer">Projects</span>
                        </Link>
                        <Link href="#resume">
                            <span className="mr-5 text-white hover:text-gray-500 cursor-pointer">Resume</span>
                        </Link>
                        <Link href="#contact">
                            <span className="mr-5 text-white hover:text-gray-500 cursor-pointer">Contact Me</span>
                        </Link>
                    </nav>
                </div>
            </header>
        </div>
    )
});
export default nav;