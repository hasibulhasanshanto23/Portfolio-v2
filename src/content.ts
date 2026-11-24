

export const site = {
  name: "Hasan Hasibul",
  role: "Full-Stack Software Engineer & MSc Researcher",
  location: "Japan",
  url: "https://www.imhasibul.com",
  description:
    "Full-stack software engineer (React, Next.js, TypeScript, Node.js) with 4+ years of experience building web products at ShareTrip, now an MSc student in Computer Science and Information Technology at Saga University, Japan, researching health information exchange.",
};

export const hero = {
  roles: ["Full-Stack Engineer", "MSc Researcher","Japanese Learner"],
  eyebrow: "Full-stack engineer · MSc researcher",
  headline:
    "I build fast, accessible full-stack web products. Four years in Dhaka, now studying for my MSc in Japan.",
  intro:
    "For four years I built booking, shopping and payment products at ShareTrip. Now I am a Master's student at Saga University, Japan, where my research focuses on health information exchange (HIE).",
};

export type Tok = { t: "kw" | "var" | "key" | "str" | "p"; v: string };

/** The animated code window in the hero. Each inner array is one line. */
export const codeWindow: { file: string; lines: Tok[][] } = {
  file: "hasibul.ts",
  lines: [
    [{ t: "kw", v: "const " }, { t: "var", v: "hasibul" }, { t: "p", v: " = {" }],
    [{ t: "p", v: "  " }, { t: "key", v: "role" }, { t: "p", v: ": " }, { t: "str", v: '"Full-Stack Engineer"' }, { t: "p", v: "," }],
    [{ t: "p", v: "  " }, { t: "key", v: "frontend" }, { t: "p", v: ": [" }, { t: "str", v: '"React"' }, { t: "p", v: ", " }, { t: "str", v: '"Next.js"' }, { t: "p", v: ", " }, { t: "str", v: '"TypeScript"' }, { t: "p", v: "]," }],
    [{ t: "p", v: "  " }, { t: "key", v: "backend" }, { t: "p", v: ": [" }, { t: "str", v: '"Node.js"' }, { t: "p", v: ", " }, { t: "str", v: '"Express"' }, { t: "p", v: ", " }, { t: "str", v: '"MongoDB"' }, { t: "p", v: "]," }],
    [{ t: "p", v: "  " }, { t: "key", v: "studying" }, { t: "p", v: ": " }, { t: "str", v: '"MSc in CS & IT"' }, { t: "p", v: "," }],
    [{ t: "p", v: "  " }, { t: "key", v: "based" }, { t: "p", v: ": " }, { t: "str", v: '"Japan"' }, { t: "p", v: "," }],
    [{ t: "p", v: "  " }, { t: "key", v: "openTo" }, { t: "p", v: ": [" }, { t: "str", v: '"research"' }, { t: "p", v: ", " }, { t: "str", v: '"engineering roles"' }, { t: "p", v: "]," }],
    [{ t: "p", v: "};" }],
  ],
};

export const terminal = [
  { kind: "cmd", text: "npm i bangla-geo" },
  { kind: "ok", text: "React hook for Bangladesh geo data" },
];

export const disciplines = [
  {
    icon: "front",
    title: "Frontend",
    text: "Fast, accessible interfaces with React, Next.js and TypeScript. State with Redux, MobX or Recoil, components in Storybook, and a steady focus on performance and SEO.",
  },
  {
    icon: "back",
    title: "Backend",
    text: "Working knowledge of Node.js, Express.js and MongoDB, plus daily experience integrating REST APIs into production front-end products.",
  },
  {
    icon: "research",
    title: "Research",
    text: "MSc research on health information exchange at Saga University.",
  },
];

export const stats = [
  { value: 4, suffix: "+", label: "years building web products" },
  { value: 9, suffix: "", label: "products shipped at ShareTrip" },
  { value: 1, suffix: "", label: "published npm package" },
  { value: 1, suffix: "st", label: "Runner Up, programming contest" },
];

export const marquee = [
  "React", "Next.js", "TypeScript", "JavaScript", "Redux", "MobX", "Recoil", "Storybook",
  "Tailwind CSS", "Material UI", "Node.js", "Express", "MongoDB", "REST APIs", "Git", "Figma", "SEO", "Health information exchange",
];

export const about = {
  paragraphs: [
    "I am a full-stack software engineer with more than four years of hands-on experience building high-performance, user-centred web applications, mainly with React, Next.js and TypeScript on the front end and Node.js, Express and MongoDB on the back end. I care about clean code, scalability, and interfaces that are responsive and accessible.",
    "From February 2022 to March 2026 I worked at ShareTrip in Dhaka, where I worked closely with designers, backend engineers and product managers to ship flight, hotel, bus, shopping and payment products. In April 2026 I began my MSc in Computer Science and Information Technology at Saga University.",
  ],
};

export const research = {
  title: "Health Information Exchange (HIE)",
  status: "MSc research · Saga University · 2026 – 2028",
  summary:
    "How health data moves between hospitals, clinics and systems.",
  // Add your research question, title, supervisor lab or any paper here when you are ready.
  details: [] as string[],
  coursework: ["Machine Learning", "Software Architecture", "Advanced AI", "Software Quality Assurance"],
};

export type Job = {
  org: string;
  orgUrl?: string;
  logo?: string;
  title: string;
  period: string;
  place: string;
  highlights: string[];
  stack: string[];
};

export const experience: Job[] = [
  {
    org: "ShareTrip Ltd",
    orgUrl: "https://sharetrip.net/",
    logo: "/sharetrip.webp",
    title: "Frontend Software Engineer",
    period: "Feb 2022 – Mar 2026",
    place: "Dhaka, Bangladesh",
    highlights: [
      "Built and maintained responsive interfaces for the ShareTrip platform across phones, tablets and desktops.",
      "Worked with backend engineers, designers and product managers to connect front-end components to back-end services.",
      "Applied web accessibility and UI/UX best practices, and delivered pixel-perfect, responsive designs.",
      "Improved page load speed with front-end performance practices, and applied SEO best practices to improve search visibility.",
      "Debugged front-end issues and ran regular code reviews to keep quality and performance high.",
      "Delivered flight, hotel, bus, business-class, e-commerce, e-sim, car transfer, bill payment and voucher products (see Projects).",
    ],
    stack: [
      "JavaScript",
      "React",
      "Next.js",
      "TypeScript",
      "Redux",
      "MobX",
      "Recoil",
      "Context API",
      "Storybook",
      "Material UI",
      "Tailwind CSS",
      "REST APIs",
      "Node.js",
      "Express",
      "Git",
    ],
  },
];

export type Project = {
  title: string;
  summary: string;
  image: string;
  link?: string;
};

export const projects: Project[] = [
  {
    title: "Flight Booking",
    summary: "Flight search and booking platform.",
    image: "/projects/flight.webp",
    link: "https://sharetrip.net/flight",
  },
  {
    title: "Hotel Booking",
    summary: "Hotel search and reservation system.",
    image: "/projects/hotel.webp",
    link: "https://sharetrip.net/hotel",
  },
  {
    title: "Business Class Flights",
    summary: "Business class flight search and request system.",
    image: "/projects/business-class.webp",
    link: "https://sharetrip.net/business-class",
  },
  {
    title: "Shop",
    summary: "Online store for lifestyle products with a smooth checkout.",
    image: "/projects/shop.webp",
    link: "https://sharetrip.net/shop",
  },
  {
    title: "Pay Bill",
    summary: "Utility bill payment, online.",
    image: "/projects/pay-bill.webp",
    link: "https://sharetrip.net/pay-bill",
  },
  {
    title: "Airport Transfer",
    summary: "Book a car for your travel.",
    image: "/projects/car-transfer.webp",
    link: "https://sharetrip.net/airport-transfer",
  },
  {
    title: "Travel eSIM",
    summary: "Purchase a travel eSIM.",
    image: "/projects/esim.webp",
    link: "https://sharetrip.net",
  },
  {
    title: "Gift Card",
    summary: "Gift a travel card to friends and family.",
    image: "/projects/gift-card.webp",
    link: "https://sharetrip.net/gift-card",
  },
  {
    title: "Voucher",
    summary: "Buy and gift vouchers. Not publicly live.",
    image: "/projects/voucher.webp",
  },
];

export const openSource = [
  {
    name: "bangla-geo",
    logo: "/npm.webp",
    date: "Jul 2022",
    href: "https://www.npmjs.com/package/bangla-geo",
    summary:
      "A React hook that gives you detailed geographic data for Bangladesh: divisions, districts and division details.",
  },
];

export const awards = ["1st Runner Up, 32nd Intra Eastern University Programming Contest"];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["JavaScript", "TypeScript"] },
  { group: "Frontend", items: ["React", "Next.js", "HTML", "CSS"] },
  { group: "Backend", items: ["Node.js", "Express.js", "MongoDB", "REST APIs"] },
  { group: "UI libraries", items: ["Material UI", "Tailwind CSS", "Shadcn UI", "Bootstrap"] },
  { group: "State management", items: ["Redux", "MobX", "Recoil"] },
  { group: "Quality and tooling", items: ["Storybook", "SEO", "Git", "Jira", "Figma", "Postman"] },
  { group: "Familiar with", items: ["C", "React Native"] },
];

export const education = [
  {
    school: "Saga University, Japan",
    degree: "MSc in Computer Science and Information Technology",
    period: "Apr 2026 – Mar 2028",
    note: "Research: health information exchange.",
  },
  {
    school: "Eastern University, Bangladesh",
    degree: "BSc in Computer Science and Engineering",
    period: "",
    note: "CGPA 3.61 / 4.00",
  },
  {
    school: "DMRC",
    degree: "Higher Secondary Certificate (HSC)",
    period: "",
    note: "GPA 4.78 / 5.00",
  },
  {
    school: "KOAHS",
    degree: "Secondary School Certificate (SSC)",
    period: "",
    note: "GPA 5.00 / 5.00",
  },
];

export const contact = {
  email: "hasibulhasan23sept@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/hasibulhasanshanto23" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/hasibul-hasan-shanto-b19b41207" },
    { label: "npm", href: "https://www.npmjs.com/package/bangla-geo" },
  ],
  cv: "/Hasibul-Hasan.pdf",
};
