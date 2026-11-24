import { site } from "@/content";

export default function Footer() {
  return (
    <footer className="wrap">
      <p>
        © {new Date().getFullYear()} {site.name} · {site.location}
      </p>
    </footer>
  );
}
