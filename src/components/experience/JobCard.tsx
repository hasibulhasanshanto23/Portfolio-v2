import type { Job } from "@/content";

export default function JobCard({ job: j }: { job: Job }) {
  return (
    <li className="tl-node" data-reveal>
      <p className="period">{j.period}</p>
      <article className="tl glass" data-spot>
        <div className="tl-head">
          {j.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="logo" src={j.logo} alt="" width={52} height={52} loading="lazy" decoding="async" />
          ) : null}
          <div>
            <h3>{j.title}</h3>
            <p className="kind">
              {j.orgUrl ? <a href={j.orgUrl}>{j.org}</a> : j.org} · {j.place}
            </p>
          </div>
        </div>
        <ul className="bullets">
          {j.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <ul className="tags">
          {j.stack.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </article>
    </li>
  );
}
