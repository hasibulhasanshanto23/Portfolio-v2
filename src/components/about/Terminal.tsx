import { terminal } from "@/content";

export default function Terminal() {
  return (
    <div className="win term" aria-hidden="true">
      <div className="win-bar">
        <i />
        <i />
        <i />
        <span>terminal</span>
      </div>
      <div className="term-body">
        {terminal.map((l, i) => (
          <p key={l.text} style={{ ["--delay" as string]: `${5.4 + i * 0.7}s` }}>
            {l.kind === "cmd" ? <span className="prompt">$ </span> : <span className="okmark">✔ </span>}
            {l.text}
          </p>
        ))}
      </div>
    </div>
  );
}
