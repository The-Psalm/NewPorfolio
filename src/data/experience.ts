import type { Experience } from "../types";

export const experiences: Experience[] = [
  {
    id: 1,
    role: "Frontend Developer",
    company: "Company Name",
    period: "Jan 2024 – Present",
    current: true,
    description: [
      "Built and maintained responsive UI components using React and Tailwind CSS.",
      "Collaborated with designers to translate Figma mockups into production-ready code.",
      "Improved page load performance by 30% through code splitting and lazy loading.",
    ],
  },
  {
    id: 2,
    role: "Junior Web Developer",
    company: "Another Company",
    period: "Jun 2022 – Dec 2023",
    description: [
      "Developed RESTful APIs using Node.js and Express.",
      "Integrated third-party APIs and payment gateways.",
      "Wrote unit and integration tests to ensure code quality.",
    ],
  },
];

