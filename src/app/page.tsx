"use client"
import React from "react"

import Navbar from './navbar/navbar'
import Projects from './normal_pages/projects'
import Contact from './normal_pages/contact'
import Education from './normal_pages/education'
import Photo from './about/index'
import Resume from './normal_pages/resume'
import Skills from './normal_pages/skills'
import Aboutme from './about/aboutme'
import Certificates from './normal_pages/certificates'
import Blogs from './blogs/index'
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
          <section id="photo" className="snap-center justify-center">
            <Photo />
          </section>
          <section id="aboutme" className="snap-center justify-center pt-20">
            <Aboutme />
          </section>
          <section id="education" className="snap-center justify-center pt-20">
            <Education />
          </section>
          <section id="skills" className="snap-center justify-center pt-20">
            <Skills />
          </section>
          <section id="certificate" className="snap-center justify-center pt-20">
            <Certificates />
          </section>
          <section id="projects" className="snap-center justify-center pt-20">
            <Projects />
          </section>
          <section id="blogs" className="snap-center justify-center pt-20">
            <Blogs />
          </section>
          <section id="resume" className="snap-center justify-center pt-20">
            <Resume />
          </section>
          <section id="contact" className="snap-center justify-center pt-20">
            <Contact />
          </section>
        </div>
    </>
  );
};