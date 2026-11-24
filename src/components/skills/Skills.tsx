import { openSource, awards } from "@/content";
import SectionHead from "@/components/ui/SectionHead";
import StackJson from "./StackJson";
import OpenSourceCard from "./OpenSourceCard";
import AwardCard from "./AwardCard";

export default function Skills() {
  return (
    <section id="skills" className="wrap sec" aria-labelledby="skills-h">
      <SectionHead n="05" label="Skills" id="skills-h">
        My <span className="grad">toolbox.</span>
      </SectionHead>
      <div className="skills-grid">
        <StackJson />
        <div className="more">
          {openSource.map((o) => (
            <OpenSourceCard key={o.name} {...o} />
          ))}
          {awards.map((a) => (
            <AwardCard key={a} title={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
