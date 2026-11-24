const HUB = { x: 240, y: 180 };

const nodes = [
  { x: 84, y: 66, label: "Hospital" },
  { x: 396, y: 66, label: "Clinic" },
  { x: 84, y: 294, label: "Laboratory" },
  { x: 396, y: 294, label: "Pharmacy" },
];

/** Animated illustration: four places exchanging data through one hub. */
export default function HieDiagram() {
  return (
    <figure className="hie">
      <svg viewBox="0 0 480 360" role="img" aria-label="Illustration: hospital, clinic, laboratory and pharmacy exchanging data through a central exchange">
        <defs>
          <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5eead4" />
            <stop offset="0.55" stopColor="#38bdf8" />
            <stop offset="1" stopColor="#a78bfa" />
          </linearGradient>
        </defs>

        {nodes.map((n, i) => {
          const to = `M${n.x} ${n.y} L${HUB.x} ${HUB.y}`;
          const from = `M${HUB.x} ${HUB.y} L${n.x} ${n.y}`;
          return (
            <g key={n.label}>
              <path className="wire" d={to} />
              <circle className="pkt" r="4.5" fill="#5eead4">
                <animateMotion dur={`${3 + i * 0.4}s`} repeatCount="indefinite" path={to} begin={`${i * 0.5}s`} />
              </circle>
              <circle className="pkt" r="4.5" fill="#c4b5fd">
                <animateMotion dur={`${3 + i * 0.4}s`} repeatCount="indefinite" path={from} begin={`${i * 0.5 + 1.5}s`} />
              </circle>
            </g>
          );
        })}

        {nodes.map((n) => (
          <g key={n.label}>
            <rect className="node" x={n.x - 56} y={n.y - 22} width="112" height="44" rx="12" />
            <text className="node-t" x={n.x} y={n.y + 5} textAnchor="middle">
              {n.label}
            </text>
          </g>
        ))}

        <circle className="hub-halo" cx={HUB.x} cy={HUB.y} r="50" />
        <circle cx={HUB.x} cy={HUB.y} r="38" fill="url(#hg)" />
        <text className="hub-t" x={HUB.x} y={HUB.y + 6} textAnchor="middle">
          HIE
        </text>
      </svg>
    </figure>
  );
}
