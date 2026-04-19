import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'
import { navLinks } from '@/data/constants'
import type { NavLink } from '@/types'
import { MagneticWrapper } from '@/components/ui/MagneticWrapper'
import { useCursorContext } from '@/components/cursor/CustomCursor'
import { getLenis } from '@/hooks/useSmoothScroll'

export function Navbar() {
  const [hidden, setHidden]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastScrollY             = useRef(0)
  const { setVariant }          = useCursorContext()

  // ── Scroll progress bar ──────────────────────────────────
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })

  // ── Hide/show on scroll direction ───────────────────────
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
    const lenis  = getLenis()
    const target = document.querySelector(href)
    if (lenis && target) lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.4 })
  }

  return (
    <>
      {/* ── Scroll progress bar — very top of viewport ───── */}
      <motion.div
        style={{
          scaleX,
          position:       'fixed',
          top:            0,
          left:           0,
          right:          0,
          height:         '2px',
          backgroundColor: 'var(--color-accent)',
          transformOrigin: 'left center',
          zIndex:         9999,
          pointerEvents:  'none',
        }}
      />

      {/* ── Main header ──────────────────────────────────── */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'py-3' : 'py-5',
        )}
        style={{
          padding:         `${scrolled ? '0.75rem' : '1.25rem'} clamp(1.25rem, 4vw, 3rem)`,
          borderBottom:    scrolled ? '1px solid var(--color-border)' : 'none',
          backgroundColor: scrolled ? 'rgba(12,12,12,0.9)' : 'transparent',
          backdropFilter:  scrolled ? 'blur(12px)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">

          {/* ── Wordmark ────────────────────────────────── */}
          <MagneticWrapper strength={0.2}>
            <button
              onClick={() => handleNavClick('#hero')}
              onMouseEnter={() => setVariant('hover')}
              onMouseLeave={() => setVariant('default')}
              className="cursor-none group shrink-0"
            >
              <span
                className="group-hover:opacity-60 transition-opacity duration-200"
                style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 400, color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}
              >
                Samuel.
              </span>
            </button>
          </MagneticWrapper>

          {/* ── Desktop nav links (centre) ───────────────── */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link: NavLink, i: number) => (
              <NavItem key={link.href} label={link.label} href={link.href} index={i} onClick={() => handleNavClick(link.href)} />
            ))}
          </nav>

          {/* ── Right cluster ────────────────────────────── */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">

            {/* Availability dot + label — hidden on very small screens */}
            <div className="hidden sm:flex items-center gap-2">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
                style={{ backgroundColor: '#6EBF8B' }}
              />
              <span className="mono-label" style={{ color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>
                Available
              </span>
            </div>

            {/* Hire me — hidden on mobile (accessible via mobile menu) */}
            <MagneticWrapper strength={0.3}>
              <button
                onClick={() => handleNavClick('#contact')}
                onMouseEnter={() => setVariant('hover')}
                onMouseLeave={() => setVariant('default')}
                className="hidden sm:block cursor-none transition-colors duration-200"
                style={{
                  fontFamily:      'var(--font-mono)',
                  fontSize:        '0.6875rem',
                  letterSpacing:   '0.12em',
                  textTransform:   'uppercase',
                  border:          '1px solid var(--color-border)',
                  borderRadius:    '2px',
                  padding:         '0.45rem 0.9rem',
                  color:           'var(--color-text-secondary)',
                  whiteSpace:      'nowrap',
                }}
                onMouseOver={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = 'var(--color-accent)'; el.style.color = 'var(--color-accent)' }}
                onMouseOut={e => { const el = e.currentTarget as HTMLButtonElement; el.style.borderColor = 'var(--color-border)'; el.style.color = 'var(--color-text-secondary)' }}
              >
                Hire me
              </button>
            </MagneticWrapper>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              onMouseEnter={() => setVariant('hover')}
              onMouseLeave={() => setVariant('default')}
              className="md:hidden flex flex-col justify-center gap-1.5 p-1 cursor-none"
              aria-label="Toggle menu"
              style={{ width: '1.75rem', height: '1.75rem' }}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block w-full h-px origin-center"
                style={{ backgroundColor: 'var(--color-text-primary)' }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-full h-px"
                style={{ backgroundColor: 'var(--color-text-primary)' }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block w-full h-px origin-center"
                style={{ backgroundColor: 'var(--color-text-primary)' }}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile menu ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] }}
        style={{ pointerEvents: menuOpen ? 'all' : 'none', backgroundColor: 'rgba(12,12,12,0.97)', backdropFilter: 'blur(14px)' }}
        className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
      >
        {/* Availability in mobile menu */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={menuOpen ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.05 }}
          className="flex items-center gap-2 mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#6EBF8B' }} />
          <span className="mono-label" style={{ color: 'var(--color-text-secondary)' }}>Available for hire</span>
        </motion.div>

        {navLinks.map((link: NavLink, i: number) => (
          <motion.button
            key={link.href}
            initial={{ opacity: 0, y: 16 }}
            animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ delay: 0.08 + i * 0.07, duration: 0.4 }}
            onClick={() => handleNavClick(link.href)}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 7vw, 2.75rem)', fontWeight: 400, fontStyle: 'italic', color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}
          >
            {link.label}
          </motion.button>
        ))}

        {/* Hire me in mobile menu */}
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 0.08 + navLinks.length * 0.07 }}
          onClick={() => handleNavClick('#contact')}
          className="mt-4"
          style={{
            fontFamily:      'var(--font-mono)',
            fontSize:        '0.6875rem',
            letterSpacing:   '0.14em',
            textTransform:   'uppercase',
            border:          '1px solid var(--color-border)',
            borderRadius:    '2px',
            padding:         '0.6rem 1.5rem',
            color:           'var(--color-text-secondary)',
          }}
        >
          Hire me
        </motion.button>
      </motion.div>
    </>
  )
}

// ─── Nav item ─────────────────────────────────────────────
interface NavItemProps { label: string; href: string; index: number; onClick: () => void }

function NavItem({ label, onClick }: NavItemProps) {
  const { setVariant } = useCursorContext()

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setVariant('text')}
      onMouseLeave={() => setVariant('default')}
      className="group relative cursor-none py-1"
    >
      <span
        className="transition-colors duration-200 group-hover:text-[var(--color-text-primary)]"
        style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}
      >
        {label}
      </span>
      <span
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-[width] duration-300 origin-left"
        style={{ backgroundColor: 'var(--color-accent)' }}
      />
    </button>
  )
}