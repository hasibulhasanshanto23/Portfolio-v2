import { codeWindow } from "@/content";

/** Editor window whose lines type themselves (CSS only). */
export default function CodeWindow() {
  const { file, lines } = codeWindow;
  return (
    <div className="win editor" role="img" aria-label="Code window summarising my profile">
      <div className="win-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{file}</span>
      </div>
      <pre aria-hidden="true">
        {lines.map((line, i) => {
          const last = i === lines.length - 1;
          const n = line.reduce((a, tk) => a + tk.v.length, 0) + (last ? 1 : 0);
          return (
            <code key={i} className="line" style={{ ["--n" as string]: n, ["--delay" as string]: `${0.5 + i * 0.55}s` }}>
              {line.map((tk, j) => (
                <span key={j} className={`tk-${tk.t}`}>
                  {tk.v}
                </span>
              ))}
              {last ? <span className="caret" /> : null}
            </code>
          );
        })}
      </pre>
    </div>
  );
}
