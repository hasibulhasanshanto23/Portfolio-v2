import Arrow from "@/components/ui/Arrow";

type Props = { name: string; date: string; href: string; summary: string };

export default function OpenSourceCard({ name, date, href, summary }: Props) {
  return (
    <article className="glass os" data-spot data-reveal>
      <p className="kind">Open source · npm · {date}</p>
      <h3>
        <a href={href}>
          {name} <Arrow />
        </a>
      </h3>
      <p>{summary}</p>
      <div className="code">
        <code>npm i {name}</code>
        <button type="button" data-copy={`npm i ${name}`}>
          Copy
        </button>
      </div>
    </article>
  );
}
