const links = [
  { id: "about", label: "About" },
  { id: "research", label: "Research" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="topnav">
      <nav aria-label="Sections" data-nav>
        <a className="brand" href="#top" aria-label="Back to top">
          HH
        </a>
        <ul>
          {links.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`}>{n.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
