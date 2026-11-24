import { education } from "@/content";

/** Top timeline entry: what I am doing right now. */
export default function CurrentStudy() {
  const now = education[0];
  return (
    <li className="tl-node now" data-reveal>
      <p className="period">{now.period}</p>
      <h3>{now.degree}</h3>
      <p className="kind">{now.school}</p>
      <p className="tl-note">Currently studying in Japan.</p>
    </li>
  );
}
