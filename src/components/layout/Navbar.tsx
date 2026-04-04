import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { navLinks } from '@/data/constants'
import type { NavLink } from '@/types'
import { MagneticWrapper } from '@/components/ui/MagneticWrapper'
import { useCursorContext } from '@/components/cursor/CustomCursor'
import { getLenis } from '@/hooks/useSmoothScroll'

export function Navbar() {
  const [hidden, setHidden]       = useState(false)
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const lastScrollY               = useRef(0)
  const { setVariant }            = useCursorContext()

  // Hide on scroll down, reveal on scroll up
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      setScrolled(current > 40)
      setHidden(current > lastScrollY.current && current > 80)
      lastScrollY.current = current
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const lenis = getLenis()
    const target = document.querySelector(href)
    if (lenis && target) {
      lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.4 })
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 relative px-4 sm:px-6 lg:px-12',
          'transition-all duration-500',
          scrolled
            ? 'py-4 border-b border-white/[0.06] backdrop-blur-md'
            : 'py-7'
        )}
        style={{
          backgroundColor: scrolled ? 'rgba(13, 10, 11, 0.85)' : 'transparent',
        }}
      >
        {/* Depth gradient (kept subtle so it doesn't fight content) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: scrolled ? 1 : 0,
            transition: 'opacity 250ms ease',
            background:
              'radial-gradient(900px 250px at 50% 0%, rgba(118,57,72,0.20), rgba(13,10,11,0) 55%)',
          }}
        />
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">

          {/* Logo / Name */}
          <MagneticWrapper strength={0.25}>
            <button
              onClick={() => handleNavClick('#hero')}
              onMouseEnter={() => setVariant('hover')}
              onMouseLeave={() => setVariant('default')}
              className="group flex items-center gap-2"
            >
              {/* Monogram mark */}
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-sans font-bold tracking-[0.14em] transition-colors duration-300"
                style={{
                  backgroundColor: '#763948',
                  color: '#D6CCD0',
                }}
              >
                SA
              </span>
              <span
                className="font-sans text-sm font-medium tracking-[0.14em] uppercase transition-colors duration-300"
                style={{ color: '#D6CCD0' }}
              >
                Samuel
              </span>
            </button>
          </MagneticWrapper>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link: NavLink, i: number) => (
              <NavItem
                key={link.href}
                label={link.label}
                href={link.href}
                index={i}
                onClick={() => handleNavClick(link.href)}
              />
            ))}
          </nav>

          {/* CTA — available for work */}
          <div className="hidden md:block">
            <MagneticWrapper strength={0.35}>
              <button
                onClick={() => handleNavClick('#contact')}
                onMouseEnter={() => setVariant('hover')}
                onMouseLeave={() => setVariant('default')}
                className="relative group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-sans font-medium tracking-[0.12em] overflow-hidden transition-all duration-300"
                style={{
                  border: '1px solid rgba(118, 57, 72, 0.6)',
                  color:  '#D6CCD0',
                }}
              >
                {/* Fill on hover */}
                <span
                  className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded-full"
                  style={{ backgroundColor: '#763948' }}
                  aria-hidden="true"
                />
                {/* Available dot */}
                <span className="relative flex items-center gap-2 z-10">
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ backgroundColor: '#a3e635' }}
                  />
                  Available for work
                </span>
              </button>
            </MagneticWrapper>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            onMouseEnter={() => setVariant('hover')}
            onMouseLeave={() => setVariant('default')}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px"
              style={{ backgroundColor: '#D6CCD0' }}
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-px"
              style={{ backgroundColor: '#D6CCD0' }}
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="block w-6 h-px"
              style={{ backgroundColor: '#D6CCD0' }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
        style={{
          pointerEvents:   menuOpen ? 'all' : 'none',
          background:
            'radial-gradient(900px 420px at 50% -10%, rgba(118,57,72,0.20), rgba(13,10,11,0.97) 60%)',
          backdropFilter:  'blur(12px)',
        }}
        className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 px-6 md:hidden"
      >
        {navLinks.map((link: NavLink, i: number) => (
          <motion.button
            key={link.href}
            initial={{ opacity: 0, y: 20 }}
            animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
            onClick={() => handleNavClick(link.href)}
            className="font-display italic text-3xl sm:text-4xl tracking-[0.01em] leading-none"
            style={{ color: '#D6CCD0' }}
          >
            {link.label}
          </motion.button>
        ))}
      </motion.div>
    </>
  )
}

// ─── Individual nav link with underline animation ─────────
interface NavItemProps {
  label: string
  href:  string
  index: number
  onClick: () => void
}

function NavItem({ label, onClick }: NavItemProps) {
  const { setVariant } = useCursorContext()

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setVariant('text')}
      onMouseLeave={() => setVariant('default')}
      className="group relative font-sans text-xs sm:text-sm tracking-[0.14em] uppercase leading-none px-1 py-2 focus-visible:outline focus-visible:outline-1 focus-visible:outline-[rgba(214,204,208,0.55)]"
      style={{ color: 'rgba(214, 204, 208, 0.65)' }}
    >
      <span className="transition-colors duration-300 group-hover:text-[#D6CCD0]">
        {label}
      </span>
      {/* Underline that grows from left */}
      <span
        className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-[width] duration-300 origin-left"
        style={{ backgroundColor: '#763948' }}
      />
    </button>
  )
}