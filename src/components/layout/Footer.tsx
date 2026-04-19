import { motion } from 'framer-motion'
import { MagneticWrapper } from '@/components/ui/MagneticWrapper'
import { useCursorContext } from '@/components/cursor/CustomCursor'
import { navLinks, siteConfig } from '@/data/constants'
import { getLenis } from '@/hooks/useSmoothScroll'

export function Footer() {
  const { setVariant } = useCursorContext()
  const year = new Date().getFullYear()

  const handleNavClick = (href: string) => {
    const lenis = getLenis()
    const target = document.querySelector(href)
    if (lenis && target) lenis.scrollTo(target as HTMLElement, { offset: -80, duration: 1.4 })
  }

  const scrollToTop = () => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { duration: 1.6 })
  }

  return (
    <footer style={{ borderTop: '1px solid var(--color-border)' }}>
      <div className="container-wide py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

          {/* Left — name */}
          <MagneticWrapper strength={0.15}>
            <button
              onClick={scrollToTop}
              onMouseEnter={() => setVariant('hover')}
              onMouseLeave={() => setVariant('default')}
              className="cursor-none group flex items-center gap-3"
            >
              <span
                className="group-hover:text-[var(--color-accent)] transition-colors duration-200"
                style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 400, color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}
              >
                Samuel.
              </span>
            </button>
          </MagneticWrapper>

          {/* Centre — nav */}
          <nav className="flex flex-wrap items-center gap-6">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                onMouseEnter={() => setVariant('text')}
                onMouseLeave={() => setVariant('default')}
                className="cursor-none transition-colors duration-200"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}
                onMouseOver={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-primary)')}
                onMouseOut={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-secondary)')}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right — scroll to top */}
          <MagneticWrapper strength={0.2}>
            <button
              onClick={scrollToTop}
              onMouseEnter={() => setVariant('hover')}
              onMouseLeave={() => setVariant('default')}
              className="cursor-none group"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}
            >
              <span className="group-hover:text-[var(--color-text-primary)] transition-colors duration-200">
                Back to top ↑
              </span>
            </button>
          </MagneticWrapper>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-8 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <p className="mono-label" style={{ color: 'rgba(240,237,230,0.2)' }}>
            © {year} {siteConfig.name}. 
          </p>
          <p className="mono-label" style={{ color: 'rgba(240,237,230,0.15)' }}>
            Looking forward to working with you.
          </p>
        </div>
      </div>
    </footer>
  )
}