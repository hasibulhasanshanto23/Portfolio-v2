import { marquee } from "@/content";

export default function TechMarquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <ul key={k}>
            {marquee.map((m) => (
              <li key={m + k}>{m}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
