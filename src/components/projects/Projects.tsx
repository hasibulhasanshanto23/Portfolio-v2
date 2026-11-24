import { projects } from "@/content";
import SectionHead from "@/components/ui/SectionHead";
import Rail from "./Rail";

const split = Math.ceil(projects.length / 2);

export default function Projects() {
  return (
    <section id="projects" className="sec projects" aria-labelledby="projects-h">
      <div className="wrap">
        <SectionHead n="04" label="Projects" id="projects-h">
          Things I&apos;ve <span className="grad">built and shipped.</span>
        </SectionHead>
        <p className="sub" data-reveal>
          Products from my time as a frontend engineer at ShareTrip. Hover to pause.
        </p>
      </div>
      <div className="rails">
        <Rail items={projects.slice(0, split)} />
        <Rail items={projects.slice(split)} reverse />
      </div>
    </section>
  );
}
