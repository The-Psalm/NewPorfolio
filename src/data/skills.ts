import type { Skill } from "../types";

export const skills: Skill[] = [
  // Frontend
  { name: "React", level: 90, category: "frontend" },
  { name: "TypeScript", level: 85, category: "frontend" },
  { name: "HTML & CSS", level: 95, category: "frontend" },
  { name: "Tailwind CSS", level: 88, category: "frontend" },

  // Backend
  { name: "Node.js", level: 80, category: "backend" },
  { name: "Express", level: 75, category: "backend" },
  { name: "Python", level: 70, category: "backend" },

  // Tools
  { name: "Git & GitHub", level: 85, category: "tools" },
  { name: "Vite", level: 80, category: "tools" },
  { name: "Figma", level: 65, category: "tools" },
];

export const skillCategories = ["frontend", "backend", "tools", "other"] as const;

