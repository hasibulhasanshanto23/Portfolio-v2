import { site, hero, contact } from "@/content";
import Arrow from "@/components/ui/Arrow";
import Roles from "./Roles";

export default function HeroCopy() {
  return (
    <div className="hero-copy" data-parallax="0.1">
      <p className="chip">
        <span className="pulse" aria-hidden="true" />
        {site.location}
      </p>
      <h1 id="hero-title">
        <span className="l1">
          <span>Hasan</span>
        </span>
        <span className="l2">
          <span className="grad">Hasibul</span>
        </span>
      </h1>
      <Roles />
      <p className="lead">{hero.headline}</p>
      <p className="cta">
        <a className="btn primary" href={`mailto:${contact.email}`}>
          Let&apos;s talk <Arrow />
        </a>
        {contact.cv && (
          <a className="btn ghost" href={contact.cv} download>
            Download CV
          </a>
        )}
        <a className="btn ghost" href="#projects">
          See my work
        </a>
      </p>
    </div>
  );
}
