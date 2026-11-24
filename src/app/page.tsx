import Effects from "@/components/effects/Effects";
import JsonLd from "@/components/layout/JsonLd";
import Background from "@/components/layout/Background";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/hero/Hero";
import TechMarquee from "@/components/TechMarquee";
import About from "@/components/about/About";
import Research from "@/components/research/Research";
import Experience from "@/components/experience/Experience";
import OutlineBand from "@/components/OutlineBand";
import Projects from "@/components/projects/Projects";
import Skills from "@/components/skills/Skills";
import Education from "@/components/education/Education";
import Contact from "@/components/contact/Contact";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Effects />
      <Background />
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <TechMarquee />
        <About />
        <Research />
        <Experience />
        <OutlineBand />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
