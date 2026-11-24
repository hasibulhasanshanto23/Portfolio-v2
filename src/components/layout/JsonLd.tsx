import { site, contact } from "@/content";

/** schema.org Person data for search engines. */
export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: "Full-Stack Software Engineer",
    description: site.description,
    url: site.url,
    email: `mailto:${contact.email}`,
    affiliation: { "@type": "CollegeOrUniversity", name: "Saga University" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Eastern University" },
    knowsAbout: ["React", "Next.js", "TypeScript", "Node.js"],
    sameAs: contact.links.filter((l) => l.label !== "npm").map((l) => l.href),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
