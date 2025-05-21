import Projects from './projects/preview'
import Contact from './normal_pages/contact'
import Education from './normal_pages/education'
import Photo from './about/index'
import Resume from './normal_pages/resume'
import Skills from './normal_pages/skills'
import Aboutme from './about/aboutme'
import Certificates from './certificates/perview'
import BlogsPreview from './blog/preview'
import Donate from "./normal_pages/donate"
import ClarityAnalytics from '@/components/clarity-analytics'

export default function Home() {
  return (
    <>
      <ClarityAnalytics />
      <div>
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
}
