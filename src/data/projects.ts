import type { Project } from '@/types'

/**
 * HOW TO ADD A PROJECT SCREENSHOT:
 * 1. Take a screenshot of your project (recommended: 1280×720px or 1920×1080px)
 * 2. Save it to /public/images/projects/  e.g. /public/images/projects/safeswap.png
 * 3. Set the image field to '/images/projects/safeswap.png'
 * 4. The card will automatically show it — no other changes needed.
 *
 * If no image is set, the card shows a styled placeholder until you add one.
 */

export const projects: Project[] = [
  {
    id:          'Bemo',
    title:       'Bemo---Invoice-Payment-Management-System',
    description:
      'A full-stack web application that lets freelancers and small business owners create professional invoices, send them to clients as shareable links, collect payments via Paystack, and track all revenue from a clean dashboard. Replaces WhatsApp screenshots and Excel chaos..',
    tags:        ['React Js', 'Django', 'Django REST Framework', 'PostgreSQL', 'Paystack'],
    repo:        'https://github.com/The-Psalm/Bemo---Invoice-Payment-Management-System.git',   // ← update with real URL
    image:       './src/assets/images/bemo.png',                     // ← e.g. '/images/projects/safeswap.png'
    featured:    true,
    year:        2026,
  },
  {
    id:          'portfolio',
    title:       'Developer Portfolio',
    description:
      'This site. Built with React 19, TypeScript, Tailwind v4, Three.js, and Framer Motion. Features a custom magnetic cursor, Lenis smooth scroll, and a WebGL particle scene.',
    tags:        ['React', 'TypeScript', 'Three.js', 'Framer Motion', 'GSAP'],
    repo:        'https://github.com',   // ← update with real URL
    image:       './src/assets/images/graphic-design-website-templates-featured-image-1000x750.avif',                     // ← e.g. '/images/projects/portfolio.png'
    featured:    true,
    year:        2025,
  },
  {
    id:          'freelance-connector',
    title:       'Freelance Connector',
    description:
      'Platform connecting freelancers with local Nigerian businesses through smart search and social media discovery. First real-world product attempt.',
    tags:        ['React', 'Django', 'Python', 'REST API'],
    repo:        'https://github.com',
    image:       'https://graphicmama.com/blog/website-design-ideas/',
    featured:    false,
    year:        2024,
  },
  {
    id:          'business-sites',
    title:       'Local Business Websites',
    description:
      'A collection of websites for small Nigerian businesses — restaurants, retail, and service providers. Custom-built, responsive, and SEO-optimised.',
    tags:        ['HTML', 'CSS', 'JavaScript', 'Freelance'],
    image:       '',
    featured:    false,
    year:        2023,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)