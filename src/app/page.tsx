"use client"
import React, { useState, useEffect} from "react"
import Projects from './projects/preview'
import Contact from './normal_pages/contact'
import Education from './normal_pages/education'
import Photo from './about/index'
import Resume from './normal_pages/resume'
import Skills from './normal_pages/skills'
import Aboutme from './about/aboutme'
import Certificates from './certificates/page'
import BlogsPreview from './blog/preview'
import Donate from "./normal_pages/donate"
export default function Home() {
  // let darkThemeBool = false
  const [darkThemeBool, setDarkThemeBool] = useState(false); 
  useEffect(()=>{
      try{
        if(window.matchMedia("(prefers-color-scheme: dark)")?.matches){
          setDarkThemeBool(true)
          sessionStorage.setItem("DARK", '999');
        }else{
          setDarkThemeBool(false)
        }
      }catch(err){
        console.log(err)
      }

  },[darkThemeBool])
  return (
    <>
      <header>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="msvalidate.01" content="C348576BB92261CC55029F04F308DB94" />
        <meta name="description" content="Pratyay Mitra Mustafi's Portfolio" />
        <meta name="author" content="Pratyay Mitra Mustafi" />
      </header>
      <div className={darkThemeBool ? "bg-stone-950" : "bg-yellow-100"}>

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
          <BlogsPreview />
        </section>
        <section id="resume" className="snap-center justify-center pt-20">
          <Resume />
        </section>
        <section id="donate" className="snap-center justify-center pt-20">
          <Donate />
        </section>
        <section id="contact" className="snap-center justify-center pt-20">
          <Contact />
        </section>
      </div>
    </>
  );
};
