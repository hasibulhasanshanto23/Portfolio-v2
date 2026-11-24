import { experience } from "@/content";
import SectionHead from "@/components/ui/SectionHead";
import CurrentStudy from "./CurrentStudy";
import JobCard from "./JobCard";

export default function Experience() {
  return (
    <section id="experience" className="wrap sec" aria-labelledby="exp-h">
      <SectionHead n="03" label="Experience" id="exp-h">
        Four years of <span className="grad">shipping products.</span>
      </SectionHead>
      <ol className="timeline">
        <CurrentStudy />
        {experience.map((j) => (
          <JobCard key={j.org + j.period} job={j} />
        ))}
      </ol>
    </section>
  );
}
