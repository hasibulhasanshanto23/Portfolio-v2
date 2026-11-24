import { skills } from "@/content";
import { camel } from "@/lib/utils";

/** The skills list, dressed up as a stack.json file. */
export default function StackJson() {
  return (
    <div className="win json" data-reveal>
      <div className="win-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>stack.json</span>
      </div>
      <pre>
        <code>
          <span className="tk-p">{"{"}</span>
          {"\n"}
          {skills.map((g, i) => (
            <span key={g.group} className="jl">
              {"  "}
              <span className="tk-key">{`"${camel(g.group)}"`}</span>
              <span className="tk-p">: [</span>
              {g.items.map((it, j) => (
                <span key={it}>
                  <span className="tk-str">{`"${it}"`}</span>
                  {j < g.items.length - 1 ? <span className="tk-p">, </span> : null}
                </span>
              ))}
              <span className="tk-p">]{i < skills.length - 1 ? "," : ""}</span>
            </span>
          ))}
          <span className="tk-p">{"}"}</span>
        </code>
      </pre>
    </div>
  );
}
