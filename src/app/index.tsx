import { createFileRoute } from "@tanstack/react-router";
import Photo from "./about/index";
import Aboutme from "./about/aboutme";
import Education from "./sections/education";
import Skills from "./sections/skills";
import Certificates from "./certificates/perview";
import Projects from "./projects/preview";
import BlogsPreview from "./blog/preview";
import Resume from "./sections/resume";
import Donate from "./sections/donate";
import Contact from "./sections/contact";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
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
