import { hero } from "@/content";

/** "I'm a ..." with a rotating role (pure CSS). */
export default function Roles() {
  return (
    <p className="roles" aria-label={hero.roles.join(", ")}>
      <span className="roles-static" aria-hidden="true">
        I&apos;m a
      </span>
      <span className="roles-window" aria-hidden="true">
        <span className="roles-track">
          {[...hero.roles, hero.roles[0]].map((r, i) => (
            <span key={r + i}>{r}</span>
          ))}
        </span>
      </span>
    </p>
  );
}
