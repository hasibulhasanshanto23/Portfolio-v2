export default function AwardCard({ title }: { title: string }) {
  return (
    <article className="glass award" data-spot data-reveal>
      <span className="medal" aria-hidden="true" />
      <p className="kind">Award</p>
      <h3>{title}</h3>
    </article>
  );
}
