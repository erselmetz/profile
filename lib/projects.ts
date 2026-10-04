export type Project = {
  name: string;
  description: string;
  repository: string;
  language: string;
  category: string;
  featured: boolean;
  tags: string[];
  demo?: string;
};

export const projects: Project[] = [
  {
    name: "AI Corporation",
    description:
      "A virtual AI organization modeled as software, with a local Python command-line system and a FastAPI interface.",
    repository: "ai-corporation",
    language: "Python",
    category: "AI & Systems",
    featured: true,
    tags: ["Python", "FastAPI", "AI Systems"],
  },
  {
    name: "NetBond Dispatcher",
    description:
      "A Windows network utility that routes traffic across adapters with a local SOCKS5 dispatcher and parallel downloads.",
    repository: "NetBondDispatcher",
    language: "C#",
    category: "Desktop & Networking",
    featured: true,
    tags: [".NET", "Windows", "Networking"],
  },
  {
    name: "PHP Framework",
    description:
      "A lightweight PHP MVC framework focused on clean architecture, strict typing, and practical security.",
    repository: "php-framework",
    language: "PHP",
    category: "Web & Backend",
    featured: true,
    tags: ["PHP 8.2+", "MVC", "PSR-4"],
  },
  {
    name: "MIS for Barangay",
    description:
      "A barangay-level management information system for digitizing resident records, certificates, and local transactions.",
    repository: "mis-for-barangay",
    language: "PHP",
    category: "Web & Backend",
    featured: true,
    tags: ["Laravel", "PHP", "Civic Tech"],
  },
  {
    name: "Intermediate Programming Exam",
    description:
      "A C# programming exam project presented as a creative concept for a futuristic pizza experience.",
    repository: "IntermediateProgrammingExam",
    language: "C#",
    category: "Learning Projects",
    featured: true,
    tags: ["C#", "Coursework"],
  },
  {
    name: "Top 10 Best Inventions",
    description:
      "An early web project exploring linked pages and frames through an interactive list of notable inventions.",
    repository: "top-10-best-invention-of-all-time",
    language: "HTML",
    category: "Learning Projects",
    featured: true,
    tags: ["HTML", "Web Fundamentals"],
  },
  {
    name: "Simple Calculator",
    description:
      "A responsive calculator with a safe expression parser, keyboard support, history, memory, and theme controls.",
    repository: "simple-calculator",
    language: "JavaScript",
    category: "Web & Backend",
    featured: false,
    tags: ["JavaScript", "Accessibility", "UI"],
    demo: "https://erselmetz.github.io/simple-calculator/",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
