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
    id: 'Skin care brand',
    title: 'Skin Care Brand Landingpage ',
    description:
      'A complee landing page for a Skin care brand to gain more customers',
    tags: ['React Js', 'Typescript', 'Tailwind'],
    repo: 'https://github.com/The-Psalm/SkinCare-Vendor-landing-page.git',   // ← update with real URL
    url: 'https://skin-care-demo.vercel.app/', // placeholder for live preview
    image: 'https://res.cloudinary.com/dpgi1ujrb/image/upload/v1778783809/Screenshot_2026-05-14_193550_a1a3sb.png',                     // ← e.g. '/images/projects/safeswap.png'
    featured: true,
    year: 2026,
  },
  {
    id: 'Bemo',
    title: 'Bemo---Invoice-Payment-Management-System',
    description:
      'A full-stack web application that lets freelancers and small business owners create professional invoices, send them to clients as shareable links, collect payments via Paystack, and track all revenue from a clean dashboard. Replaces WhatsApp screenshots and Excel chaos..',
    tags: ['React Js', 'Typescript', 'Django', 'Django REST Framework', 'PostgreSQL', 'Paystack'],
    repo: 'https://github.com/The-Psalm/Bemo---Invoice-Payment-Management-System.git',   // ← update with real URL
    url: 'https://bemo-invoice.vercel.app', // placeholder for live preview
    image: 'https://res.cloudinary.com/dpgi1ujrb/image/upload/v1777097932/Screenshot_2026-04-25_071728_xw3krn.png',                     // ← e.g. '/images/projects/safeswap.png'
    featured: true,
    year: 2026,
  },
  {
    id: 'Vesper Restaurant landing page',
    title: 'Vesper Restaurant landing page',
    description:
      'A high-end restaurant landing page built with React, TypeScript, and GSAP. Features smooth animations, cinematic visuals, and a modern, elegant design aesthetic.',
    tags: ['React', 'TypeScript', 'GSAP', 'Tailwind'],
    repo: 'https://github.com/The-Psalm/Vesper-Restaurant-landing-page.git',   // ← update with real URL
    url: 'https://vesper-restaurant.vercel.app/', // placeholder for live preview
    image: 'https://res.cloudinary.com/dpgi1ujrb/image/upload/v1777122211/Screenshot_2026-04-25_140230_ixidms.png',

    featured: true,
    year: 2026,
  },
  {
    id: 'freelance-connector',
    title: 'Freelance Connector',
    description:
      'Platform connecting freelancers with local Nigerian businesses through smart search and social media discovery. First real-world product attempt.',
    tags: ['React', 'Django', 'Python', 'REST API'],
    repo: 'https://github.com',
    url: '#', // placeholder for live preview
    image: 'https://graphicmama.com/blog/website-design-ideas/',
    featured: false,
    year: 2024,
  },
  {
    id: 'business-sites',
    title: 'Local Business Websites',
    description:
      'A collection of websites for small Nigerian businesses — restaurants, retail, and service providers. Custom-built, responsive, and SEO-optimised.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Freelance'],
    url: '#', // placeholder for live preview
    image: '',
    featured: false,
    year: 2023,
  },
]

export const featuredProjects = projects.filter((p) => p.featured)