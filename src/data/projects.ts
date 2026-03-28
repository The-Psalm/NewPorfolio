import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: 1,
    title: "Project One",
    description:
      "A brief description of what this project does and the problem it solves.",
    techStack: ["React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/yourusername/project-one",
  },
  {
    id: 2,
    title: "Project Two",
    description:
      "A brief description of what this project does and the problem it solves.",
    techStack: ["Node.js", "Express", "MongoDB"],
    liveUrl: "https://example.com",
    repoUrl: "https://github.com/yourusername/project-two",
  },
  {
    id: 3,
    title: "Project Three",
    description:
      "A brief description of what this project does and the problem it solves.",
    techStack: ["Python", "FastAPI", "PostgreSQL"],
    repoUrl: "https://github.com/yourusername/project-three",
  },
];

