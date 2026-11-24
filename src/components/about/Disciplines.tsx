import { disciplines } from "@/content";
import { pad } from "@/lib/utils";

export default function Disciplines() {
  return (
    <ul className="do">
      {disciplines.map((d, i) => (
        <li key={d.title} data-reveal style={{ ["--d" as string]: `${i * 90}ms` }}>
          <span className="do-n">{pad(i)}</span>
          <h3>{d.title}</h3>
          <p>{d.text}</p>
        </li>
      ))}
    </ul>
  );
}
