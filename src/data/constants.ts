import type { NavLink } from '@/types'

export const navLinks: NavLink[] = [
  { label: 'About',   href: '#about'    },
  { label: 'Work',    href: '#projects' },
  { label: 'Skills',  href: '#skills'   },
  { label: 'Contact', href: '#contact'  },
]

export const siteConfig = {
  name:     'Samuel Adebusuyi',
  short:    'SA',
  title:    'Full-Stack Developer',
  email:    'adebusuyisamuel3@gmail.com',
  github:   'https://github.com/The-Psalm',
  instagram: 'https://www.instagram.com/psalm.web.dev?igsh=MTg5YWhhYzEyamh0NA==',
  twitter:  'https://twitter.com',
  whatsapp: 'https://wa.me/08024617212',
  // Drop your portrait here — e.g. '/portrait.jpg' (place file in /public)
  portrait: '' as string,
}

