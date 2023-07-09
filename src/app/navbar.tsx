import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import Aboutme from './aboutme';
import Education from './education';
import Projects from './projects';
import Resume from './resume';
import Contact from './contact';
export default function Navbar() {
    return (
        <>
            <header className="text-white-600  body-font sticky top-0 backdrop-filter backdrop-blur-lg border-gray-200 opacity-70 bg-gray-900">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                        <Link href="#aboutme">
                            <span className="mr-5 hover:text-gray-500 cursor-pointer">About Me</span>
                        </Link>
                        <Link href="#education">
                            <span className="mr-5 hover:text-gray-500 cursor-pointer">Education</span>
                        </Link>
                        <Link href="#skills">
                            <span className="mr-5 hover:text-gray-500 cursor-pointer">Skills</span>
                        </Link>
                        <Link href="#projects">
                            <span className="mr-5 hover:text-gray-500 cursor-pointer">Projects</span>
                        </Link>
                        <Link href="#resume">
                            <span className="mr-5 hover:text-gray-500 cursor-pointer">Resume</span>
                        </Link>
                        <Link href="#contact">
                            <span className="mr-5 hover:text-gray-500 cursor-pointer">Contact Me</span>
                        </Link>
                    </nav>
                </div>
            </header>
        </>
    )
};