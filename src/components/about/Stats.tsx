import { stats } from "@/content";

/** Big numbers that count up when they scroll into view. */
export default function Stats() {
  return (
    <ul className="stats">
      {stats.map((s, i) => (
        <li key={s.label} data-reveal style={{ ["--d" as string]: `${i * 70}ms` }}>
          <strong>
            <span data-count={s.value} data-suffix={s.suffix}>
              {s.value}
              {s.suffix}
            </span>
          </strong>
          <span>{s.label}</span>
        </li>
      ))}
    </ul>
  );
}
