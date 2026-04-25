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
  instagram: 'https://www.instagram.com/psalm.webdev?igsh=MTg5YWhhYzEyamh0NA==',
  twitter:  'https://twitter.com',
  whatsapp: 'https://wa.me/+2347026218523',
  // Drop your portrait here — e.g. '/portrait.jpg' (place file in /public)
  portrait: '' as string,
}

