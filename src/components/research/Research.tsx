import { research } from "@/content";
import HieDiagram from "./HieDiagram";

/** Deliberately quiet: a short note beside the diagram. */
export default function Research() {
  return (
    <section id="research" className="wrap sec" aria-labelledby="research-h">
      <p className="eyebrow">02 / Research</p>
      <div className="rs" data-reveal>
        <div>
          <h2 id="research-h">{research.title}</h2>
          <p className="kind">{research.status}</p>
          <p className="rs-line">{research.summary}</p>
        </div>
        <HieDiagram />
      </div>
    </section>
  );
}
