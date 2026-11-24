import { education } from "@/content";
import SectionHead from "@/components/ui/SectionHead";

export default function Education() {
  return (
    <section id="education" className="wrap sec" aria-labelledby="edu-h">
      <SectionHead n="06" label="Education" id="edu-h">
        Where I <span className="grad">studied.</span>
      </SectionHead>
      <ol className="edu">
        {education.map((e, i) => (
          <li key={e.school + e.degree} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }}>
            <span className="edu-dot" aria-hidden="true" />
            <p className="period">{e.period || " "}</p>
            <h3>{e.school}</h3>
            <p className="kind">{e.degree}</p>
            {e.note ? <p className="note">{e.note}</p> : null}
          </li>
        ))}
      </ol>
    </section>
  );
}
