"use client"
import Image from 'next/image'
import React from "react"
import Navbar from './navbar'
import Projects from './projects'
import Contact from './contact'
import Education from './education'
import Aboutme from './aboutme'
import Resume from './resume'
import Skills from './skills'
import Certificates from './certificates'
export default function Home() {
  return (
        <>
        <header>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
          <meta name="description" content="Pratyay Mitra Mustafi's Portfolio" />
          <meta name="author" content="Pratyay Mitra Mustafi" />
        </header>
        <div className="bg-black">
          <Navbar />
          <section id="aboutme" className="snap-center">
            <Aboutme />
          </section>
          <section id="education" className="snap-center">
            <Education />
          </section>
          <section id="skills" className="snap-center">
            <Skills />
          </section>
          <section id="certificate" className="snap-center">
            <Certificates />
          </section>
          <section id="projects" className="snap-center">
            <Projects />
          </section>
          <section id="resume" className="snap-center">
            <Resume />
          </section>
          <section id="contact" className="snap-center">
            <Contact />
          </section>
        </div>
    </>
  );
};