import type { ReactNode } from "react";

type Props = {
  /** Section number shown in the eyebrow, e.g. "01". */
  n: string;
  label: string;
  /** id of the <h2>, referenced by the section's aria-labelledby. */
  id: string;
  children: ReactNode;
};

/** Eyebrow label plus the animated section heading. */
export default function SectionHead({ n, label, id, children }: Props) {
  return (
    <>
      <p className="eyebrow">
        {n} / {label}
      </p>
      <h2 id={id} data-reveal>
        {children}
      </h2>
    </>
  );
}
