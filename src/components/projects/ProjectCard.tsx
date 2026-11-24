import type { Project } from "@/content";
import Arrow from "@/components/ui/Arrow";

type Props = {
  project: Project;
  /** True for the duplicated copies that only exist to make the rail loop. */
  hidden?: boolean;
};

export default function ProjectCard({ project: p, hidden = false }: Props) {
  const body = (
    <>
      <div className="pc-shot">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.image} alt={hidden ? "" : `${p.title} screenshot`} width={720} height={540} loading="eager" decoding="async" />
      </div>
      <div className="pc-body">
        <h3>{p.title}</h3>
        <p>{p.summary}</p>
        {p.link ? (
          <span className="live">
            Live <Arrow />
          </span>
        ) : null}
      </div>
    </>
  );

  return p.link ? (
    <a className="pcard" href={p.link} target="_blank" tabIndex={hidden ? -1 : undefined} aria-label={hidden ? undefined : `${p.title} (opens live site)`}>
      {body}
    </a>
  ) : (
    <div className="pcard">{body}</div>
  );
}
