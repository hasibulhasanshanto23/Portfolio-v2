const words = ["Full-stack", "Research", "React", "Node.js", "TypeScript", "Next.js"];

/** Big outlined typography band that scrolls sideways. */
export default function OutlineBand() {
  return (
    <div className="bigband" aria-hidden="true">
      <div className="bigband-track">
        {[0, 1].map((k) => (
          <ul key={k}>
            {words.map((w) => (
              <li key={w + k}>{w}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
