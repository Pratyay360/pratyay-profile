import dynamic from 'next/dynamic'
import Photo from './about/index'
import Aboutme from './about/aboutme'
import ClarityAnalytics from '@/components/clarity-analytics'

// Dynamic imports for better performance
const Education = dynamic(() => import('./sections/education'), { ssr: true })
const Skills = dynamic(() => import('./sections/skills'), { ssr: true })
const Certificates = dynamic(() => import('./certificates/perview'), { ssr: true })
const Projects = dynamic(() => import('./projects/preview'), { ssr: true })
const BlogsPreview = dynamic(() => import('./blog/preview'), { ssr: true })
const Resume = dynamic(() => import('./sections/resume'), { ssr: true })
const Donate = dynamic(() => import('./sections/donate'), { ssr: true })
const Contact = dynamic(() => import('./sections/contact'), { ssr: true })

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
