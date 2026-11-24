import type { Project } from "@/content";
import ProjectCard from "./ProjectCard";

type Props = {
  items: Project[];
  /** Scroll the other way. */
  reverse?: boolean;
};

/** One endlessly scrolling row of project cards (3 copies so the loop is seamless). */
export default function Rail({ items, reverse = false }: Props) {
  return (
    <div className={`rail${reverse ? " rev" : ""}`}>
      <div className="rail-track" style={{ ["--dur" as string]: `${items.length * 11}s` }}>
        {[0, 1, 2].map((copy) => (
          <ul key={copy} aria-hidden={copy > 0 ? true : undefined}>
            {items.map((p) => (
              <li key={p.title + copy}>
                <ProjectCard project={p} hidden={copy > 0} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
