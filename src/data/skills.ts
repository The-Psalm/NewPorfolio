import type { Skill } from '@/types'

export const skills: Skill[] = [
  // Frontend
  { name: 'React',       category: 'frontend', level: 3 },
  { name: 'TypeScript',  category: 'frontend', level: 2 },
  { name: 'JavaScript',  category: 'frontend', level: 3 },
  { name: 'HTML & CSS',  category: 'frontend', level: 3 },
  { name: 'Tailwind CSS',category: 'frontend', level: 3 },
  { name: 'Three.js',    category: 'frontend', level: 2 },
  { name: 'Framer Motion', category: 'frontend', level: 2 },

  // Backend
  { name: 'Python',      category: 'backend', level: 3 },
  { name: 'Django',      category: 'backend', level: 3 },
  { name: 'Django REST Framework', category: 'backend', level: 2 },
  { name: 'REST APIs',   category: 'backend', level: 3 },

  // Tools
  { name: 'Git & GitHub',category: 'tools', level: 3 },
  { name: 'Vite',        category: 'tools', level: 2 },
  { name: 'Figma',       category: 'tools', level: 2 },
  { name: 'VS Code',     category: 'tools', level: 3 },
]

export const skillsByCategory = {
  frontend: skills.filter((s) => s.category === 'frontend'),
  backend:  skills.filter((s) => s.category === 'backend'),
  tools:    skills.filter((s) => s.category === 'tools'),
}

export const levelLabel: Record<Skill['level'], string> = {
  1: 'Familiar',
  2: 'Proficient',
  3: 'Expert',
}