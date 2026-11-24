import { contact } from "@/content";
import Arrow from "@/components/ui/Arrow";

export default function Contact() {
  const social = contact.links.filter((l) => l.label !== "npm");
  return (
    <section id="contact" className="wrap sec" aria-labelledby="contact-h">
      <div className="contact gborder" data-reveal>
        <div className="sonar" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <p className="eyebrow">07 / Contact</p>
        <h2 id="contact-h">
          Let&apos;s work <span className="grad">together.</span>
        </h2>
        <p className="sub">I am open to research collaboration and software engineering roles. Email is the quickest way to reach me.</p>
        <a className="mail" href={`mailto:${contact.email}`}>
          {contact.email} <Arrow />
        </a>
        <p className="cta">
          {social.map((l) => (
            <a key={l.href} target="_blank" className="btn ghost" href={l.href} rel="me noopener">
              {l.label} <Arrow />
            </a>
          ))}
          {contact.cv && (
            <a className="btn primary" href={contact.cv} download>
              Download CV
            </a>
          )}
        </p>
      </div>
    </section>
  );
}
