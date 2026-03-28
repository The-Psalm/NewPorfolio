export interface NavLink {
  label: string;
  href: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
  image?: string;
}

export interface Skill {
  name: string;
  level: number; // 1–100
  category: "frontend" | "backend" | "tools" | "other";
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
  current?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

