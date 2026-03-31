import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'safeswap',
    title: 'SafeSwap',
    description:
      'A mobile-first escrow platform eliminating fraud in Nigerian informal online marketplaces. Buyers and sellers on Instagram and WhatsApp transact through a secure hold-and-release flow — money only moves when both parties confirm.',
    tags: ['React Native', 'Django', 'Django REST Framework', 'Escrow', 'FinTech'],
    repo: 'https://github.com',
    featured: true,
    year: 2025,
  },
  {
    id: 'portfolio',
    title: 'Developer Portfolio',
    description:
      'This site. Built with React, TypeScript, Tailwind v4, Three.js, and Framer Motion. Features a custom magnetic cursor, GSAP-driven animations, and a WebGL particle scene.',
    tags: ['React', 'TypeScript', 'Three.js', 'Framer Motion', 'GSAP'],
    repo: 'https://github.com',
    featured: true,
    year: 2025,
  },
  {
    id: 'freelance-connector',
    title: 'Freelance Connector',
    description:
      'Early-stage startup connecting freelancers with local Nigerian businesses through smart web and social media search. First real-world product attempt — learned hard lessons about capital and market timing.',
    tags: ['React', 'Django', 'Python', 'REST API'],
    repo: 'https://github.com',
    featured: false,
    year: 2024,
  },
  {
    id: 'business-sites',
    title: 'Local Business Websites',
    description:
      'A collection of websites built for small Nigerian businesses — restaurants, retail shops, and service providers. Custom-built, responsive, and SEO-optimised for local search.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Freelance'],
    featured: false,
    year: 2023,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)