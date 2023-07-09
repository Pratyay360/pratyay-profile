import Image from 'next/image'
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
    <Certificates  />
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
    </>
  )
}
