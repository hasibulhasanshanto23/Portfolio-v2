import { about } from "@/content";
import SectionHead from "@/components/ui/SectionHead";
import CodeWindow from "./CodeWindow";
import Terminal from "./Terminal";
import Stats from "./Stats";
import Disciplines from "./Disciplines";

export default function About() {
  return (
    <section id="about" className="wrap sec" aria-labelledby="about-h">
      <SectionHead n="01" label="About" id="about-h">
        Building for the web, <span className="grad">from Bangladesh to Japan.</span>
      </SectionHead>

      <div className="about-grid">
        <div className="prose" data-reveal>
          {about.paragraphs.map((p, i) => (
            <p key={p} className={i === 0 ? "lede" : undefined}>
              {p}
            </p>
          ))}
        </div>
        <div className="code-wrap" data-reveal>
          <CodeWindow />
          <Terminal />
        </div>
      </div>

      <Stats />
      <Disciplines />
    </section>
  );
}
